import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
interface CircuitProject {
  id: string;
  name: string;
  accent: string;
}

const PROJECTS: CircuitProject[] = [
  { id: "clario", name: "Clario", accent: "#22c55e" },
  { id: "gitagotchi", name: "Gitagotchi", accent: "#a855f7" },
  { id: "file-organizer", name: "Smart AI File Organizer", accent: "#f59e0b" },
  { id: "axiom", name: "Axiom", accent: "#38bdf8" },
];

/** Original procedural race circuit. A car laps the track; each project is a clickable sector marker. */
export default function Circuit() {
  const host = useRef<HTMLDivElement>(null);
  const ctl = useRef({ paused: false, reset: () => {} });
  const [paused, setPaused] = useState(false);
  const [sector, setSector] = useState(0);
  const [lap, setLap] = useState(1);

  useEffect(() => {
    const el = host.current!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); } catch { el.textContent = "3D is unavailable in this browser."; return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 9.5, 12.5);
    camera.lookAt(0, 0.2, 0);
    const css = (v: string) => getComputedStyle(document.documentElement).getPropertyValue(v).trim() || "#888";
    const isDark = () => document.documentElement.dataset.theme === "dark";
    const getTrackColor = () => (isDark() ? "#454b43" : "#5a6058");
    const getTrackOpacity = () => (isDark() ? 0.4 : 0.22);
    const getEdgeColor = () => (isDark() ? "#888d84" : "#555a52");

    const pts = [[-5, 0, -1.5], [-3.2, 0.2, -3.6], [0.2, 0.5, -3.1], [2.8, 0.2, -4], [5.2, 0, -1.6], [3.6, -0.2, 0.4], [4.6, 0, 2.8], [1.4, 0.3, 3.6], [-1.4, 0.5, 1.6], [-3.6, 0.1, 3.3], [-5.6, 0, 1.4]].map(([x, y, z]) => new THREE.Vector3(x, y, z));
    const curve = new THREE.CatmullRomCurve3(pts, true, "catmullrom", 0.4);

    const group = new THREE.Group();
    scene.add(group);
    const trackMat = new THREE.MeshBasicMaterial({ color: getTrackColor(), transparent: true, opacity: getTrackOpacity() });
    const edgeMat = new THREE.LineBasicMaterial({ color: getEdgeColor(), transparent: true, opacity: 0.85 });
    group.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 240, 0.34, 6, true), trackMat));
    const edge = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(400)), edgeMat);
    edge.position.y = 0.36;
    group.add(edge);

    const spots = PROJECTS.map((_: CircuitProject, i: number) => ((i + 0.35) / PROJECTS.length) % 1);
    const markers = PROJECTS.map((p: CircuitProject, i: number) => {
      const base = curve.getPointAt(spots[i]);
      const m = new THREE.Mesh(new THREE.OctahedronGeometry(0.34), new THREE.MeshBasicMaterial({ color: p.accent }));
      m.position.copy(base).add(new THREE.Vector3(0, 1, 0));
      m.userData = { id: p.id, baseY: base.y };
      group.add(m, new THREE.Line(new THREE.BufferGeometry().setFromPoints([base, m.position.clone()]), new THREE.LineBasicMaterial({ color: p.accent })));
      return m;
    });

    const accent = () => css("--acc");
    const car = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), new THREE.MeshBasicMaterial({ color: accent() }));
    const trail = Array.from({ length: 16 }, (_, i) => new THREE.Mesh(new THREE.SphereGeometry(0.17 * (1 - i / 17), 8, 8), new THREE.MeshBasicMaterial({ color: accent(), transparent: true, opacity: 0.6 * (1 - i / 16) })));
    group.add(car, ...trail);

    const baseRot = -0.5;
    let rot = baseRot, drag: number | null = null, moved = false, t = 0, lastSector = -1, laps = 1, visible = true;
    ctl.current.reset = () => { rot = baseRot; };

    const resize = () => { const w = el.clientWidth, h = el.clientHeight; renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); };
    const ro = new ResizeObserver(resize); ro.observe(el); resize();
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }); io.observe(el);

    const recolor = () => {
      trackMat.color.set(getTrackColor());
      trackMat.opacity = getTrackOpacity();
      edgeMat.color.set(getEdgeColor());
      (car.material as THREE.MeshBasicMaterial).color.set(accent());
      trail.forEach((s) => (s.material as THREE.MeshBasicMaterial).color.set(accent()));
    };
    window.addEventListener("themechange", recolor);

    const ray = new THREE.Raycaster(), mouse = new THREE.Vector2();
    const down = (e: PointerEvent) => { drag = e.clientX; moved = false; el.setPointerCapture(e.pointerId); };
    const move = (e: PointerEvent) => { if (drag !== null) { const d = e.clientX - drag; if (Math.abs(d) > 2) moved = true; rot += d * 0.008; drag = e.clientX; } };
    const up = (e: PointerEvent) => {
      drag = null;
      if (moved) return;
      const r = el.getBoundingClientRect();
      mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(mouse, camera);
      const hit = ray.intersectObjects(markers)[0];
      if (hit) document.getElementById(hit.object.userData.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const cancel = () => { drag = null; };
    const key = (e: KeyboardEvent) => { if (e.key === "ArrowLeft") rot -= 0.15; if (e.key === "ArrowRight") rot += 0.15; if (e.key === "Home") rot = baseRot; };
    el.addEventListener("pointerdown", down); el.addEventListener("pointermove", move); el.addEventListener("pointerup", up); el.addEventListener("pointercancel", cancel); el.addEventListener("keydown", key);

    let raf = 0;
    const lift = new THREE.Vector3(0, 0.36, 0);
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      const run = !ctl.current.paused && !reduce;
      if (run) { t = (t + 0.0011) % 1; if (drag === null) rot += 0.0016; if (t < 0.0011) { laps += 1; setLap(laps); } }
      car.position.copy(curve.getPointAt(t)).add(lift);
      trail.forEach((s, i) => s.position.copy(curve.getPointAt((t - (i + 1) * 0.0075 + 1) % 1)).add(lift));
      markers.forEach((m: THREE.Mesh, i: number) => { m.rotation.y += 0.02; m.position.y = m.userData.baseY + 1 + Math.sin(performance.now() / 600 + i) * 0.08; });
      const s = Math.min(PROJECTS.length - 1, Math.floor(t * PROJECTS.length));
      if (s !== lastSector) { lastSector = s; setSector(s); }
      group.rotation.y = rot;
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); window.removeEventListener("themechange", recolor);
      el.removeEventListener("pointerdown", down); el.removeEventListener("pointermove", move); el.removeEventListener("pointerup", up); el.removeEventListener("pointercancel", cancel); el.removeEventListener("keydown", key);
      scene.traverse((o) => { const m = o as THREE.Mesh; m.geometry?.dispose?.(); });
      renderer.dispose(); renderer.domElement.remove();
    };
  }, []);

  const toggle = () => { ctl.current.paused = !ctl.current.paused; setPaused(ctl.current.paused); };
  const cur = PROJECTS[sector] || PROJECTS[0];

  return (
    <>
      <div className="lab" aria-hidden="true">
        <span>sw / CIRCUIT (01)</span>
        <span>LAP {String(lap).padStart(2, "0")} · S{sector + 1} · <b style={{ color: cur.accent }}>{cur.name.toUpperCase()}</b></span>
      </div>
      <div ref={host} className="scene" tabIndex={0} role="img" aria-label={`Interactive 3D race circuit. Each marker is a project: ${PROJECTS.map((p: CircuitProject) => p.name).join(", ")}. Drag or use arrow keys to rotate, click a marker to jump to that project.`} />
      <div className="ctl">
        <button type="button" aria-pressed={paused} onClick={toggle}>{paused ? "Resume lap" : "Pause lap"}</button>
        <button type="button" onClick={() => ctl.current.reset()}>Reset view</button>
        <small>DRAG TO ORBIT · CLICK A MARKER</small>
      </div>
    </>
  );
}
