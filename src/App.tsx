import { useEffect, useRef, useState, type CSSProperties } from "react";
import Circuit from "./components/Circuit";
import { Icon, TechIcon } from "./icons";

const NAV_ITEMS = [
  { id: "projects", label: "Projects", code: "01", href: "#projects" },
  { id: "about", label: "About", code: "02", href: "#about" },
  { id: "skills", label: "Skills", code: "03", href: "#skills" },
  { id: "contact", label: "Contact", code: "04", href: "#contact" },
] as const;

const LINKS = {
  github: "https://github.com/sarawagh27",
  linkedin: "https://www.linkedin.com/in/sara-wagh/",
  email: "sarawagh9@gmail.com",
  resume: "/resume/Sara_Wagh_Resume.pdf",
  clarioLive: "https://clario-theta-ebon.vercel.app/",
  clarioAnnouncement: "https://www.linkedin.com/feed/update/urn:li:activity:7455988081213530112/",
  axiomRepo: "https://github.com/sarawagh27/axiom-bot-python",
  fileOrganizerDemo: "https://smart-ai-file-organizer.streamlit.app/",
  fileOrganizerRepo: "https://github.com/sarawagh27/smart-ai-file-organizer",
  gitagotchiRepo: "https://github.com/sarawagh27/gitagotchi",
};

const PHRASES = [
  "Build real things.",
  "Learn by shipping.",
  "Keep moving.",
];

const CAPABILITIES = [
  {
    name: "Interface",
    description: "Building responsive interfaces with React, Next.js, TypeScript, and Tailwind.",
    items: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "next.js" },
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Tailwind CSS", icon: "tailwind css" },
      { name: "Framer Motion", icon: "framer motion" },
    ],
  },
  {
    name: "Systems",
    description: "Backend logic, APIs, real-time features, and data.",
    items: [
      { name: "Node.js", icon: "node.js" },
      { name: "Express", icon: "express" },
      { name: "tRPC", icon: "trpc" },
      { name: "REST APIs", icon: "code" },
      { name: "Socket.io", icon: "socket.io" },
      { name: "WebRTC", icon: "webrtc" },
      { name: "asyncio", icon: "asyncio" },
      { name: "discord.py", icon: "discord.py" },
    ],
  },
  {
    name: "Automation",
    description: "Automating repetitive workflows, testing, and developer tasks.",
    items: [
      { name: "GitHub Actions", icon: "github actions" },
      { name: "pytest", icon: "pytest" },
      { name: "Vitest", icon: "vitest" },
      { name: "Python", icon: "python" },
      { name: "Git", icon: "git" },
    ],
  },
  {
    name: "Delivery",
    description: "Git, CI, deployment, and the tools that ship products.",
    items: [
      { name: "Git", icon: "git" },
      { name: "GitHub Actions", icon: "github actions" },
      { name: "Vercel", icon: "vercel" },
      { name: "Streamlit", icon: "streamlit" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Prisma", icon: "prisma" },
      { name: "SQLite", icon: "sqlite" },
      { name: "Firebase", icon: "firebase" },
    ],
  },
];

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof document !== "undefined" && document.documentElement.dataset.theme) {
      return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem("av0-portfolio-theme") || localStorage.getItem("sw-portfolio-theme")) return;
      } catch {}
      const next = e.matches ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      setTheme(next);
      try {
        localStorage.setItem("av0-portfolio-theme", next);
        localStorage.setItem("sw-portfolio-theme", next);
      } catch {}
      window.dispatchEvent(new Event("themechange"));
    };

    if (
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      "startViewTransition" in document &&
      typeof (document as unknown as { startViewTransition?: (cb: () => void) => void }).startViewTransition === "function"
    ) {
      (document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(apply);
    } else {
      apply();
    }
  };

  return { theme, toggleTheme };
}

function WindowChrome({ title, status }: { title: string; status?: string }) {
  return (
    <div className="window-chrome">
      <span className="window-title">{title}</span>
      {status && (
        <span className="window-status">
          <i aria-hidden="true" />
          {status}
        </span>
      )}
    </div>
  );
}

function ClarioArtifact() {
  return (
    <div className="clario-artifact" aria-hidden="true">
      {/* Primary Product Canvas: Authentic Clario Warm-White Interface */}
      <div className="clario-board">
        {/* Navigation Bar */}
        <header className="clario-nav">
          <div className="clario-brand">
            <span className="clario-brand__icon">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M 10 2 L 10 18 M 4 6 L 16 14 M 4 14 L 16 6" />
              </svg>
            </span>
            <span className="clario-brand__name">Clario</span>
          </div>
          <div className="clario-nav__links">
            <span className="clario-nav__link">For teachers</span>
            <span className="clario-nav__link">Sign in</span>
            <span className="clario-nav__cta">Get started</span>
          </div>
        </header>

        {/* Hero Section */}
        <div className="clario-hero">
          <div className="clario-hero__content">
            <h4 className="clario-hero__title">
              Learn from<br />
              <span className="clario-hero__hand">
                real people
                <svg className="clario-hero__underline" viewBox="0 0 100 24" preserveAspectRatio="none">
                  <path d="M 4 14 Q 30 6 52 14 T 96 14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span><br />
              in real time.
            </h4>
            <p className="clario-hero__desc">
              A calm, premium live learning platform. Connect directly with people who have the skills you want.
            </p>
            <div className="clario-hero__actions">
              <span className="clario-btn clario-btn--primary">Start learning</span>
              <span className="clario-btn clario-btn--outline">Become a teacher</span>
            </div>
          </div>

          <div className="clario-hero__art">
            {/* Clario's authentic line illustration */}
            <svg className="clario-character" viewBox="30 15 345 385" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 40 370 Q 200 365 360 370" strokeWidth="4" />
              <path d="M 60 370 L 55 400 M 340 370 L 345 400" strokeWidth="4" />
              <path d="M 120 370 C 110 240, 160 210, 200 210 C 240 210, 290 240, 280 370" strokeWidth="5" />
              <path d="M 275 300 Q 330 290, 310 360" strokeWidth="4" strokeDasharray="8 8" opacity="0.45" />
              <path d="M 320 280 C 330 270, 340 290, 330 300" strokeWidth="3" />
              <path d="M 330 285 C 340 280, 350 300, 335 305" strokeWidth="3" />
              <circle cx="200" cy="140" r="45" strokeWidth="6" fill="#FAF9F5" />
              <path d="M 185 140 Q 190 135 195 140" strokeWidth="4" />
              <path d="M 215 140 Q 210 135 205 140" strokeWidth="4" />
              <path d="M 195 155 Q 200 160 205 155" strokeWidth="4" />
              <path d="M 160 120 C 140 80, 180 70, 200 70 C 230 70, 260 90, 240 130 C 235 140, 245 140, 248 135" strokeWidth="5" />
              <path d="M 230 80 C 270 20, 370 30, 350 110 C 340 140, 300 150, 270 120 L 245 135 L 250 105 Z" strokeWidth="4" fill="#FAF9F5" />
              <path d="M 295 70 L 305 90 L 325 90 L 310 105 L 315 125 L 295 110 L 275 125 L 280 105 L 265 90 L 285 90 Z" strokeWidth="3" strokeLinejoin="miter" />
              <circle cx="90" cy="90" r="4" fill="currentColor" />
              <path d="M 70 120 Q 50 140 70 160" strokeWidth="3" />
              <path d="M 80 140 L 50 140" strokeWidth="3" />
              <path d="M 100 280 L 80 270" strokeWidth="3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Layered Interface Fragment: Authentic 1:1 Live Mentorship Session */}
      <div className="clario-card clario-card--session">
        <div className="clario-session__header">
          <span className="clario-session__status">
            <i aria-hidden="true" />
            Live 1:1 Session
          </span>
          <span className="clario-session__latency">12ms · WebSockets</span>
        </div>
        <div className="clario-session__body">
          <div className="clario-session__mentor">
            <div className="clario-session__avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="5" />
                <path d="M 4 20 C 4 15, 8 13, 12 13 C 16 13, 20 15, 20 20" />
              </svg>
            </div>
            <div>
              <div className="clario-session__name">David Chen</div>
              <div className="clario-session__role">Full-Stack Engineering</div>
            </div>
          </div>
          <div className="clario-session__tags">
            <span>React</span>
            <span>Node.js</span>
            <span>WebSockets</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AxiomArtifact() {
  return (
    <div className="axiom-artifact" aria-hidden="true">
      {/* Secondary Top Fragment: /ping Latency Probe */}
      <div className="axiom-card axiom-card--latency">
        <div className="axiom-card__trigger">
          <span className="discord-user">Sara</span>
          <span className="discord-cmd">used <b>/ping</b></span>
          <span className="axiom-status-chip axiom-status-chip--ok">
            <i aria-hidden="true" />
            Heartbeat OK
          </span>
        </div>
        <div className="axiom-msg">
          <div className="axiom-avatar">
            <svg viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="15" fill="#111214" stroke="#00d4d8" strokeWidth="1.5" />
              <path d="M16 6 L23 24 L19.5 24 L17.5 19 L14.5 19 L12.5 24 L9 24 Z M16 11 L15 16 L17 16 Z" fill="#00d4d8" />
              <circle cx="21" cy="7" r="1.5" fill="#38bdf8" />
            </svg>
          </div>
          <div className="axiom-msg__content">
            <div className="axiom-msg__meta">
              <span className="axiom-bot-name">Axiom</span>
              <span className="discord-app-tag">APP</span>
              <span className="discord-timestamp">07:48 PM</span>
            </div>
            <div className="discord-embed discord-embed--cyan">
              <div className="discord-embed__title">
                <span>🏓</span>
                <strong>Pong!</strong>
              </div>
              <div className="discord-embed__field">
                <span className="field-label">WebSocket latency:</span>
                <span className="field-value">24ms · Shard 0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Interaction Board: /pingbomb Managed Session */}
      <div className="axiom-card axiom-card--session">
        <div className="axiom-card__trigger">
          <span className="discord-user">Sara</span>
          <span className="discord-cmd">used <b>/pingbomb</b></span>
          <span className="axiom-status-chip axiom-status-chip--active">
            <i aria-hidden="true" />
            Session #8F21A · Active
          </span>
        </div>

        <div className="axiom-msg">
          <div className="axiom-avatar">
            <svg viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="15" fill="#111214" stroke="#00d4d8" strokeWidth="1.5" />
              <path d="M16 6 L23 24 L19.5 24 L17.5 19 L14.5 19 L12.5 24 L9 24 Z M16 11 L15 16 L17 16 Z" fill="#00d4d8" />
              <circle cx="21" cy="7" r="1.5" fill="#38bdf8" />
            </svg>
          </div>
          <div className="axiom-msg__content">
            <div className="axiom-msg__meta">
              <span className="axiom-bot-name">Axiom</span>
              <span className="discord-app-tag">APP</span>
              <span className="discord-timestamp">07:50 PM</span>
            </div>

            <div className="discord-embed discord-embed--orange">
              <div className="discord-embed__title">
                <span>💣</span>
                <strong>Pingbomb Launched</strong>
              </div>
              <p className="discord-embed__body">
                Pinging <code>@axiom_test_user</code> 10 time(s) every 1.0s.
              </p>
              <span className="discord-embed__hint">
                Use the buttons below to pause or stop.
              </span>
              <span className="discord-embed__author">Started by Sara</span>
            </div>

            <div className="discord-actions">
              <span className="discord-btn discord-btn--pause">
                <svg viewBox="0 0 16 16" fill="currentColor">
                  <rect x="3" y="2" width="3.5" height="12" rx="1" />
                  <rect x="9.5" y="2" width="3.5" height="12" rx="1" />
                </svg>
                Pause
              </span>
              <span className="discord-btn discord-btn--resume">
                <svg viewBox="0 0 16 16" fill="currentColor">
                  <polygon points="4,2 14,8 4,14" />
                </svg>
                Resume
              </span>
              <span className="discord-btn discord-btn--stop">
                <svg viewBox="0 0 16 16" fill="currentColor">
                  <rect x="3" y="3" width="10" height="10" rx="1" />
                </svg>
                Stop
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tertiary Bottom Fragment: Operational Telemetry & State */}
      <div className="axiom-card axiom-card--telemetry">
        <div className="axiom-telemetry__header">
          <span className="axiom-telemetry__label">
            <i aria-hidden="true" />
            ORCHESTRATION PIPELINE
          </span>
          <span className="axiom-telemetry__rate">TokenBucket 50/min</span>
        </div>
        <div className="axiom-telemetry__grid">
          <div className="axiom-stat">
            <span className="axiom-stat__num">10/10</span>
            <span className="axiom-stat__key">Dispatched</span>
          </div>
          <div className="axiom-stat">
            <span className="axiom-stat__num">1.0s</span>
            <span className="axiom-stat__key">Interval</span>
          </div>
          <div className="axiom-stat">
            <span className="axiom-stat__num">0 err</span>
            <span className="axiom-stat__key">Anomalies</span>
          </div>
          <div className="axiom-stat">
            <span className="axiom-stat__num">Async</span>
            <span className="axiom-stat__key">Loop State</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrganizerArtifact() {
  return (
    <div className="organizer-artifact" aria-hidden="true">
      {/* Layer 1: Inference Engine State */}
      <div className="organizer-card organizer-card--status">
        <div className="organizer-status__engine">
          <span className="organizer-status__indicator">
            <i aria-hidden="true" />
            SEMANTIC INFERENCE
          </span>
          <span className="organizer-status__model">all-MiniLM-L6-v2 · TF-IDF Fallback</span>
        </div>
        <div className="organizer-status__pills">
          <span className="organizer-pill organizer-pill--accent">Live Analysis</span>
          <span className="organizer-pill">Deduplication</span>
        </div>
      </div>

      {/* Layer 2 (Primary): Real Document Analysis & Streamlit Live Preview */}
      <div className="organizer-card organizer-card--hero">
        <div className="organizer-file-header">
          <div className="organizer-file-badge">
            <svg viewBox="0 0 16 16" fill="currentColor" width="13" height="13">
              <path d="M4 0h5.5v4H14v10.5A1.5 1.5 0 0112.5 16h-7A1.5 1.5 0 014 14.5V0zm6 0v3.5h3.5L10 0z" />
            </svg>
            <span className="organizer-filename">scan_0023.pdf</span>
          </div>
          <span className="organizer-stage-tag">Content Extracted</span>
        </div>

        {/* Live Streamlit Application Preview (Dark Mode) */}
        <div className="organizer-stream-preview">
          <img
            src="projects/Animation-final-dark-mode.gif"
            alt="Smart AI File Organizer dark mode demonstration"
            width="954"
            height="453"
            loading="lazy"
          />
        </div>

        {/* Semantic Classification & Decision */}
        <div className="organizer-decision">
          <div className="organizer-classification">
            <span className="organizer-cat-badge organizer-cat-badge--finance">
              [FIN] Finance
            </span>
            <span className="organizer-model-note">Semantic Match</span>
          </div>
          <div className="organizer-confidence">
            <div className="organizer-confidence__bar">
              <div className="organizer-confidence__fill" style={{ width: "95%" }} />
            </div>
            <span className="organizer-confidence__pct">Confident</span>
          </div>
        </div>

        {/* Organized Route */}
        <div className="organizer-route">
          <span className="organizer-route__label">Routed:</span>
          <code className="organizer-route__path">
            Downloads/<b>Finance</b>/Invoice_2024_03.pdf
          </code>
        </div>
      </div>

      {/* Layer 3 (Tertiary): Duplicate Detection & Rollback Safety */}
      <div className="organizer-grid-sub">
        <div className="organizer-card organizer-card--sub organizer-card--dedup">
          <div className="organizer-sub__top">
            <span className="organizer-sub__filename">budget_copy(1).xlsx</span>
            <span className="organizer-sub__badge organizer-sub__badge--dedup">SHA-256 Match</span>
          </div>
          <p className="organizer-sub__detail">
            Exact hash match with <code>budget_march.xlsx</code>
          </p>
          <div className="organizer-sub__footer">
            <span className="organizer-sub__tag">Content Hash</span>
            <span className="organizer-sub__status">Deduplicated</span>
          </div>
        </div>

        <div className="organizer-card organizer-card--sub organizer-card--audit-sub">
          <div className="organizer-sub__top">
            <span className="organizer-sub__filename">.smart-organizer/</span>
            <span className="organizer-audit__chip">Rollback Safe</span>
          </div>
          <p className="organizer-sub__detail">
            Structured history log · Reversible via <code>--undo</code>
          </p>
          <div className="organizer-sub__footer">
            <span className="organizer-sub__tag">Dry-run Verified</span>
            <span className="organizer-sub__status organizer-sub__status--undo">Reversible</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroStage() {
  return (
    <figure className="hero-stage" aria-labelledby="hero-stage-caption">
      <Circuit />
      <figcaption id="hero-stage-caption" className="sr-only">
        An interactive 3D race circuit showcasing projects as sector markers.
      </figcaption>
    </figure>
  );
}

function TextLink({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <a
      className={`text-link${primary ? " text-link--primary" : ""}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <Icon name="arrow" />
    </a>
  );
}

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [philosophyIndex, setPhilosophyIndex] = useState(0);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    e.preventDefault();

    const mailtoUrl = `mailto:${LINKS.email}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(LINKS.email)}`;

    let clientResponded = false;
    const blurHandler = () => {
      clientResponded = true;
    };
    window.addEventListener("blur", blurHandler, { once: true });

    window.location.href = mailtoUrl;

    setTimeout(() => {
      window.removeEventListener("blur", blurHandler);
      if (!clientResponded && document.hasFocus()) {
        const newTab = window.open(gmailUrl, "_blank", "noopener,noreferrer");
        if (!newTab || newTab.closed || typeof newTab.closed === "undefined") {
          window.location.href = gmailUrl;
        }
      }
    }, 500);
  };

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const modalCloseBtnRef = useRef<HTMLButtonElement>(null);

  useReveal();

  // Desktop media query listener: auto-close mobile drawer on larger screens
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 761px)");
    const handler = () => {
      if (mq.matches) setIsMobileOpen(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Scroll listener for sticky header and active section tracking
  useEffect(() => {
    let ticking = false;
    const checkScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 24);

      const scrollBottom = scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Bottom of page check: Contact section is always active at the bottom
      if (scrollBottom >= docHeight - 80) {
        setActiveSection("contact");
        ticking = false;
        return;
      }

      // Top of page check: In hero area, no section is active
      if (scrollY < window.innerHeight * 0.35) {
        setActiveSection("");
        ticking = false;
        return;
      }

      // Check section positions relative to viewport
      const sections = NAV_ITEMS.map(({ id }) => {
        const el = document.getElementById(id);
        return el ? { id, rectTop: el.getBoundingClientRect().top } : null;
      }).filter(Boolean) as { id: string; rectTop: number }[];

      let current = "";
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].rectTop <= 240) {
          current = sections[i].id;
        }
      }
      setActiveSection(current);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("hashchange", onScroll, { passive: true });
    checkScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", onScroll);
    };
  }, []);

  // Mobile menu focus trap and escape key
  useEffect(() => {
    if (!isMobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflowY = "hidden";
    mobileNavRef.current?.querySelector("a")?.focus({ preventScroll: true });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileOpen(false);
      }
      if (e.key !== "Tab") return;

      const focusable = [
        menuButtonRef.current,
        ...Array.from(mobileNavRef.current?.querySelectorAll("a") ?? []),
      ].filter(Boolean) as HTMLElement[];

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      menuButtonRef.current?.focus({ preventScroll: true });
    };
  }, [isMobileOpen]);

  // Case study modal escape key & overflow lock
  useEffect(() => {
    if (!isCaseStudyOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflowY = "hidden";
    modalCloseBtnRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsCaseStudyOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCaseStudyOpen]);

  // Philosophy auto-rotation
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = setInterval(() => {
      if (!document.hidden) {
        setPhilosophyIndex((curr) => (curr + 1) % PHRASES.length);
      }
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const year = new Date().getFullYear();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {/* Header */}
      <header className={`site-nav${isScrolled ? " is-scrolled" : ""}`} data-active={activeSection || undefined}>
        <div className="site-nav__bar">
          <a className="brand" href="#top" aria-label="SW, back to top" onClick={() => setActiveSection("")}>
            <span>SW</span>
            <span className="brand__suffix" aria-hidden="true">
              ( )
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) =>
              item.id === "contact" ? (
                <span key="resume-contact-group" style={{ display: "contents" }}>
                  <a
                    href={LINKS.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Resume (opens in new tab)"
                  >
                    Resume
                  </a>
                  <a
                    href={item.href}
                    className={activeSection === item.id ? "is-active" : undefined}
                    aria-current={activeSection === item.id ? "location" : undefined}
                    onClick={() => setActiveSection(item.id)}
                  >
                    {item.label}
                  </a>
                </span>
              ) : (
                <a
                  key={item.id}
                  href={item.href}
                  className={activeSection === item.id ? "is-active" : undefined}
                  aria-current={activeSection === item.id ? "location" : undefined}
                  onClick={() => setActiveSection(item.id)}
                >
                  {item.label}
                </a>
              )
            )}
          </nav>

          <div className="nav-actions">
            <button
              className="icon-button"
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              aria-pressed={theme === "dark"}
              style={{ fontSize: "1.15rem", lineHeight: 1 }}
            >
              ◐
            </button>

            <button
              ref={menuButtonRef}
              className="icon-button menu-button"
              type="button"
              onClick={() => setIsMobileOpen((open) => !open)}
              aria-label={isMobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-navigation"
            >
              <Icon name={isMobileOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Scrim & Drawer */}
        <button
          className={`mobile-nav__scrim${isMobileOpen ? " is-open" : ""}`}
          type="button"
          onClick={() => setIsMobileOpen(false)}
          aria-label="Close navigation"
          tabIndex={-1}
        />

        <nav
          ref={mobileNavRef}
          id="mobile-navigation"
          className={`mobile-nav${isMobileOpen ? " is-open" : ""}`}
          aria-label="Mobile navigation"
          aria-hidden={!isMobileOpen}
        >
          <p>Navigate</p>
          {NAV_ITEMS.map((item, idx) =>
            item.id === "contact" ? (
              <span key="mobile-resume-contact" style={{ display: "contents" }}>
                <a
                  href={LINKS.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileOpen(false)}
                  tabIndex={isMobileOpen ? 0 : -1}
                >
                  Resume
                  <Icon name="arrow" />
                </a>
                <a
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  tabIndex={isMobileOpen ? 0 : -1}
                >
                  {item.label}
                  <span>0{idx + 1}</span>
                </a>
              </span>
            ) : (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                tabIndex={isMobileOpen ? 0 : -1}
              >
                {item.label}
                <span>0{idx + 1}</span>
              </a>
            )
          )}
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileOpen(false)}
            tabIndex={isMobileOpen ? 0 : -1}
          >
            GitHub
            <Icon name="arrow" />
          </a>
        </nav>
      </header>

      <main id="main">
        {/* Hero Section */}
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero__copy page-shell">
            <div className="hero__identity">
              <span className="hero__name">SARA WAGH</span>
              <p className="hero__status">
                <i aria-hidden="true" />
                Open to software engineering roles
              </p>
            </div>
            <h1 id="hero-title">
              I turn<br />
              ideas into<br />
              things worth<br />
              shipping.
            </h1>
            <p className="hero__intro">
              Computer engineering student building real-time web products, developer tools, and applied AI systems. Mumbai, India.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="#projects">
                <span>See the work</span>
                <span aria-hidden="true" style={{ fontSize: "1.1rem" }}>↓</span>
              </a>
              <a className="button button--quiet" href="#contact">
                <span>Get in touch</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <HeroStage />
        </section>

        {/* Work Section */}
        <section className="work" id="projects" aria-labelledby="projects-title">
          <header className="section-intro" data-reveal>
            <h2 id="projects-title">
              Selected work <span>(04)</span>
            </h2>
            <p>Different problems. The same attention to detail.</p>
          </header>

          {/* FLAGSHIP PROJECT: 01 — CLARIO */}
          <article className="project project--flagship project--clario" id="clario" aria-labelledby="clario-title">
            <div className="project-stage project-stage--clario" data-reveal>
              <div className="stage-caption">
                <span>CLARIO / PEER-TO-PEER LIVE LEARNING</span>
                <span>(01)</span>
              </div>
              <ClarioArtifact />
              <span className="visualization-note">
                PEER-TO-PEER LIVE LEARNING PLATFORM
              </span>
            </div>

            <div className="project-meta" data-reveal>
              <div className="project-meta__title">
                <p>01 / Flagship project</p>
                <h3 id="clario-title">Clario</h3>
                <strong>Learn from real people, in real time.</strong>
              </div>

              <div className="project-meta__body">
                <p>
                  A calm live learning platform connecting learners with skilled mentors for real-time 1:1 sessions — peer-to-peer connection without algorithmic feeds or gamified noise.
                </p>

                <div className="project-achievements" aria-label="Clario achievements">
                  <span className="achievement-pill">
                    <i aria-hidden="true" />
                    Top 5 / 1,495 teams · FixForward 2026
                  </span>
                  <span className="achievement-pill">
                    <i aria-hidden="true" />
                    RTIH Future Founders 3.0 · Incubation Support
                  </span>
                </div>

                <ul className="tag-list" aria-label="Clario technologies">
                  <li>React</li>
                  <li>Node.js</li>
                  <li>WebSockets</li>
                  <li>AI</li>
                  <li>Tailwind CSS</li>
                </ul>

                <div className="project-links project-links--clario">
                  <a
                    className="clario-action"
                    href={LINKS.clarioLive}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Launch live app</span>
                    <Icon name="arrow" />
                  </a>
                  <button
                    type="button"
                    className="clario-action"
                    onClick={() => setIsCaseStudyOpen(true)}
                  >
                    <span>Case study</span>
                    <Icon name="arrow" />
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* PROJECT 02 — AXIOM (Alternating: Meta Left, Stage Right) */}
          <article className="project project--alt project--axiom" id="axiom" aria-labelledby="axiom-title">
            <div className="project-meta" data-reveal>
              <div className="project-meta__title">
                <p>02 / Systems &amp; observability</p>
                <h3 id="axiom-title">Axiom</h3>
                <strong>Operational intelligence and telemetry for Discord.</strong>
              </div>

              <div className="project-meta__body">
                <p>
                  Models bot activity as structured telemetry sessions: operational events feed real-time health scoring, statistical anomaly detection, and automated incident management surfaced via /ops slash commands.
                </p>

                <ul className="tag-list" aria-label="Axiom technologies">
                  <li>Python</li>
                  <li>discord.py</li>
                  <li>SQLite</li>
                  <li>asyncio</li>
                  <li>Telemetry</li>
                </ul>

                <div className="project-links">
                  <TextLink href={LINKS.axiomRepo} primary>
                    View repository
                  </TextLink>
                </div>

                <p className="project-note">
                  Open source, CI-tested, and built with modular asyncio session orchestration.
                </p>
              </div>
            </div>

            <div className="project-stage project-stage--axiom" data-reveal>
              <div className="stage-caption">
                <span>AXIOM / TELEMETRY &amp; OPERATIONS</span>
                <span>(02)</span>
              </div>
              <AxiomArtifact />
              <div className="deployment-rail" aria-label="Axiom telemetry stack">
                <span>Python</span>
                <i aria-hidden="true" />
                <span>discord.py</span>
                <i aria-hidden="true" />
                <span>SQLite</span>
                <i aria-hidden="true" />
                <span>asyncio</span>
              </div>
            </div>
          </article>

          {/* PROJECT 03 — SMART AI FILE ORGANIZER (Stage Left, Meta Right) */}
          <article className="project project--organizer" id="file-organizer" aria-labelledby="organizer-title">
            <div className="project-stage project-stage--organizer" data-reveal>
              <div className="stage-caption">
                <span>SMART AI FILE ORGANIZER / APPLIED AI</span>
                <span>(03)</span>
              </div>
              <OrganizerArtifact />
              <div className="deployment-rail" aria-label="File organizer interfaces">
                <span>CLI Tool</span>
                <i aria-hidden="true" />
                <span>Desktop GUI</span>
                <i aria-hidden="true" />
                <span>Watch Mode</span>
                <i aria-hidden="true" />
                <span>Streamlit App</span>
              </div>
            </div>

            <div className="project-meta" data-reveal>
              <div className="project-meta__title">
                <p>03 / Applied AI tool</p>
                <h3 id="organizer-title">Smart AI File Organizer</h3>
                <strong>Files organized by what they contain, not what they're called.</strong>
              </div>

              <div className="project-meta__body">
                <p>
                  Extracts and semantically classifies documents using transformer embeddings with offline TF-IDF fallback, detecting content duplicates and intelligently renaming files.
                </p>

                <ul className="tag-list" aria-label="Smart AI File Organizer technologies">
                  <li>Python</li>
                  <li>Transformers</li>
                  <li>Streamlit</li>
                  <li>TF-IDF</li>
                </ul>

                <div className="project-links project-links--organizer">
                  <TextLink href={LINKS.fileOrganizerDemo} primary>
                    Live Streamlit demo
                  </TextLink>
                  <TextLink href={LINKS.fileOrganizerRepo}>
                    GitHub repository
                  </TextLink>
                </div>
              </div>
            </div>
          </article>

          {/* PROJECT 04 — GITAGOTCHI (Alternating: Meta Left, Stage Right) */}
          <article className="project project--alt project--gitagotchi" id="gitagotchi" aria-labelledby="gitagotchi-title">
            <div className="project-meta" data-reveal>
              <div className="project-meta__title">
                <p>04 / Developer tool &amp; gamification</p>
                <h3 id="gitagotchi-title">Gitagotchi</h3>
                <strong>GitHub activity → evolving virtual pet.</strong>
              </div>

              <div className="project-meta__body">
                <p>
                  A zero-maintenance GitHub companion that turns real developer activity into an evolving SVG pet, updated automatically through GitHub Actions.
                </p>

                <ul className="tag-list" aria-label="Gitagotchi technologies">
                  <li>TypeScript</li>
                  <li>GitHub Actions</li>
                  <li>SVG</li>
                </ul>

                <div className="project-links project-links--gitagotchi">
                  <TextLink href={LINKS.gitagotchiRepo} primary>
                    View repository
                  </TextLink>
                  <TextLink href="https://raw.githubusercontent.com/sarawagh27/gitagotchi/main/assets/pet.svg">
                    Live SVG card
                  </TextLink>
                </div>
              </div>
            </div>

            <div className="project-stage project-stage--gitagotchi" data-reveal>
              <div className="stage-caption">
                <span>GITAGOTCHI / GITHUB DEVELOPER TOOL</span>
                <span>(04)</span>
              </div>
              <div className="gitagotchi-container">
                <div className="excrow-browser gitagotchi-frame">
                  <img
                    src="projects/gitagotchi.svg?v=2"
                    width="540"
                    height="300"
                    alt="Gitagotchi developer tool SVG card showing Nova at Level 1"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="deployment-rail" aria-label="Gitagotchi architecture">
                <span>TypeScript</span>
                <i aria-hidden="true" />
                <span>GitHub Actions</span>
                <i aria-hidden="true" />
                <span>Deterministic Engine</span>
                <i aria-hidden="true" />
                <span>Dynamic SVG</span>
              </div>
            </div>
          </article>
        </section>

        {/* About Section */}
        <section className="about" id="about" aria-labelledby="about-title">
          <div className="page-shell">
            <div className="about__heading">
              <h2 id="about-title">
                Curiosity.
                <br />
                Then code.
              </h2>

              <span className="about__signature" aria-hidden="true">
                SW ( )
              </span>
            </div>

            <div className="about__details">
              <p className="about__lead">
                I like figuring out how things work and then building something with&nbsp;it.
              </p>
              <p>
                As a Computer Engineering student, that curiosity drives what I build: full-stack web platforms, developer tools, automations, and applied AI experiments. That includes co-founding Clario, where our peer-to-peer live learning architecture placed in the Top 5 out of 1,495 teams across India at FixForward 2026.
              </p>
              <p>
                I learn best with an empty editor, breaking things, and tracing unexpected behavior down to the wire. For me, good engineering comes down to solid fundamentals, fast feedback loops, and software that stays dependable when real people use it.
              </p>
            </div>

            <div className="about__meta">
              <span>
                <small>Working across</small>
                Full-stack · AI · Developer Tools
              </span>
              <span>
                <small>Education</small>
                Computer Engineering
              </span>
              <span>
                <small>Location</small>
                Mumbai, India
              </span>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="skills page-shell" id="skills" aria-labelledby="skills-title">
          <header className="section-intro section-intro--skills" data-reveal>
            <h2 id="skills-title">Behind the build.</h2>
            <p>From the first interaction to the final deployment.</p>
          </header>

          <div className="capability-rack">
            {CAPABILITIES.map((cap, idx) => (
              <section
                key={cap.name}
                className="capability-row"
                aria-labelledby={`capability-${idx}`}
                data-reveal
              >
                <div className="capability-row__intro">
                  <span>0{idx + 1}</span>
                  <div>
                    <h3 id={`capability-${idx}`}>{cap.name}</h3>
                    <p>{cap.description}</p>
                  </div>
                </div>

                <ul className="capability-row__tools">
                  {cap.items.map((tool) => (
                    <li key={tool.name}>
                      <span aria-hidden="true">
                        {tool.icon === "lock" || tool.icon === "code" ? (
                          <Icon name={tool.icon} />
                        ) : (
                          <TechIcon name={tool.name} />
                        )}
                      </span>
                      {tool.name}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="philosophy" aria-label="Build philosophy" data-reveal>
          <div className="page-shell philosophy__inner">
            <span className="philosophy__label">A SIMPLE APPROACH</span>
            <div className="philosophy__phrases" aria-live="off">
              {PHRASES.map((phrase, idx) => (
                <p
                  key={phrase}
                  className={philosophyIndex === idx ? "is-active" : undefined}
                  aria-hidden={philosophyIndex !== idx}
                >
                  {phrase}
                </p>
              ))}
            </div>
            <p className="philosophy__aside">
              Make technology useful.
              <br />
              Explore what is possible.
            </p>
            <div className="philosophy__controls" aria-label="Working principles">
              {PHRASES.map((phrase, idx) => (
                <button
                  key={phrase}
                  type="button"
                  aria-label={phrase}
                  aria-pressed={philosophyIndex === idx}
                  onClick={() => setPhilosophyIndex(idx)}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Contact & Footer Section */}
      <footer className="contact" id="contact" aria-labelledby="contact-title">
        <div className="page-shell contact__inner">
          <div className="contact__direct">
            <span className="contact__label">06 / CONTACT</span>
            <h2 id="contact-title">Something in mind?</h2>
            <p className="contact__copy">
              I’m always open to collaborate on interesting ideas and challenges.
            </p>
            <a
              className="contact__email"
              href={`mailto:${LINKS.email}`}
              onClick={handleEmailClick}
              aria-label="Email Sara at sarawagh9@gmail.com"
            >
              <svg
                className="contact__email-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>{LINKS.email}</span>
              <Icon name="arrow" />
            </a>
          </div>

          <div className="contact__actions">
            <a
              className="button button--light"
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TechIcon name="github" />
              Find me on GitHub
              <Icon name="arrow" />
            </a>
            <a
              className="button button--dark"
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TechIcon name="linkedin" />
              Connect on LinkedIn
              <Icon name="arrow" />
            </a>
            <a
              className="button button--dark"
              href={LINKS.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TechIcon name="resume" />
              View Resume
              <Icon name="arrow" />
            </a>
          </div>

          <div className="contact__footer">
            <a href="#top" aria-label="SW, back to top">
              <span>SW</span>
              <span className="footer__suffix">( )</span>
            </a>
            <span>Sara Wagh · Full-Stack Developer · Mumbai, India</span>
            <span>© {year}</span>
          </div>
        </div>
      </footer>

      {/* CLARIO DETAILED CASE STUDY MODAL */}
      {isCaseStudyOpen && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsCaseStudyOpen(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
        >
          <div className="modal-window">
            <div className="modal-header">
              <div>
                <p className="modal-header__title">01 / Flagship Case Study</p>
                <h2 id="case-study-title">Clario</h2>
              </div>
              <button
                ref={modalCloseBtnRef}
                type="button"
                className="icon-button"
                onClick={() => setIsCaseStudyOpen(false)}
                aria-label="Close case study"
              >
                <Icon name="close" />
              </button>
            </div>

            <div className="modal-body">
              {/* 01 — Overview */}
              <section className="case-section">
                <div>
                  <span className="case-section__label">01 — Context</span>
                  <h3>Overview</h3>
                </div>
                <div>
                  <p>
                    Clario is a peer-to-peer live learning platform designed to make it easier to find someone with the exact skill you need and connect with them in real time.
                  </p>
                </div>
              </section>

              {/* 02 — The Problem */}
              <section className="case-section">
                <div>
                  <span className="case-section__label">02 — Friction</span>
                  <h3>The Problem</h3>
                </div>
                <div>
                  <p>
                    The internet is saturated with pre-recorded courses, but finding someone with the exact skill you need and connecting with them live is fragmented and slow.
                  </p>
                </div>
              </section>

              {/* 03 — The Solution */}
              <section className="case-section">
                <div>
                  <span className="case-section__label">03 — Approach</span>
                  <h3>The Solution</h3>
                </div>
                <div>
                  <p>
                    A calm live-learning platform connecting learners with skilled mentors for real-time 1:1 sessions — without algorithmic feeds or gamified noise.
                  </p>
                </div>
              </section>

              {/* 04 — Building It */}
              <section className="case-section">
                <div>
                  <span className="case-section__label">04 — Execution</span>
                  <h3>Building It</h3>
                </div>
                <div>
                  <p style={{ marginBottom: "1rem" }}>
                    The team took Clario from concept to a functional product during the FixForward ideathon:
                  </p>
                  <ul>
                    <li><strong>Real-time communication:</strong> Low-latency bidirectional session orchestration and state synchronization.</li>
                    <li><strong>Frontend development:</strong> Clean, responsive interaction surfaces built with React and Tailwind CSS.</li>
                    <li><strong>Backend/API development:</strong> Dependable Node.js services for booking, user rooms, and skill matching.</li>
                    <li><strong>WebSocket interactions:</strong> Direct socket feeds providing live status and instant messaging.</li>
                    <li><strong>AI components:</strong> Applied matching logic to connect learners with the right skill sets quickly.</li>
                    <li><strong>Rapid iteration:</strong> Working under tight competition constraints to test, iterate, and refine flows.</li>
                    <li><strong>Production-minded delivery:</strong> Building a usable product ready for hands-on evaluation rather than just a concept mockup.</li>
                  </ul>
                </div>
              </section>

              {/* 05 — Outcome */}
              <section className="case-section">
                <div>
                  <span className="case-section__label">05 — Validation</span>
                  <h3>Outcome</h3>
                </div>
                <div>
                  <p style={{ marginBottom: "0.6rem" }}>
                    <strong>Top 5 out of 1,495 teams at FixForward 2026.</strong>
                  </p>
                  <p>
                    Selected for <strong>RTIH Future Founders 3.0 incubation support</strong> for mentorship, ecosystem access, and scaling.
                  </p>
                </div>
              </section>

              {/* 06 — Team & Links */}
              <section className="case-section">
                <div>
                  <span className="case-section__label">06 — Collaboration</span>
                  <h3>Team &amp; Links</h3>
                </div>
                <div>
                  <p style={{ marginBottom: "0.8rem" }}>Built with:</p>
                  <ul className="case-team-list">
                    <li>Sara Wagh</li>
                    <li>Aayush Patil</li>
                    <li>Viraj Thukrul</li>
                    <li>Arnav Yadav</li>
                    <li>Aditya Aher</li>
                  </ul>

                  <div className="case-links">
                    <TextLink href={LINKS.clarioLive} primary>
                      Live Demo
                    </TextLink>
                    <TextLink href={LINKS.clarioAnnouncement}>
                      LinkedIn announcement
                    </TextLink>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
