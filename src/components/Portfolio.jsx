import { useState, useEffect, useRef } from "react";
import {
  Github, ExternalLink, ArrowUpRight, Moon, Sun, Mail, Linkedin,
  FileText, Code2, Database, BarChart3, Brain, Cloud, Terminal,
  Sparkles, Activity, ChevronDown, Circle
} from "lucide-react";
import projectData from "../data/projects.json";

const PROJECTS = projectData.projects;

const SKILLS = [
  { group: "Languages", icon: Terminal, items: ["Python", "SQL", "R", "Scala", "TypeScript"] },
  { group: "ML / Deep Learning", icon: Brain, items: ["PyTorch", "TensorFlow", "scikit-learn", "XGBoost", "Hugging Face"] },
  { group: "Data Engineering", icon: Database, items: ["Spark", "Airflow", "dbt", "Kafka", "DuckDB", "Snowflake"] },
  { group: "Visualization", icon: BarChart3, items: ["Tableau", "Power BI", "Plotly", "D3.js", "Observable"] },
  { group: "Cloud & MLOps", icon: Cloud, items: ["AWS", "GCP", "MLflow", "Kubernetes", "Terraform"] },
];

const DASHBOARDS = [
  {
    platform: "Tableau Public",
    title: "Global Climate Indicators, 1970 – 2024",
    note: "Cross-filtered choropleth + anomaly strip. Data: NOAA + World Bank.",
    src: "https://public.tableau.com/views/RegionalSampleWorkbook/Obesity?:embed=y&:showVizHome=no&:display_count=y&:display_static_image=y",
  },
  {
    platform: "Power BI Service",
    title: "E-Commerce Revenue Attribution",
    note: "Multi-touch attribution across 8 channels. DAX measures drive the drill-through.",
    src: "https://app.powerbi.com/view?r=YOUR_REPORT_ID_HERE",
  },
];

// ───────────────────────────────────────────────────────────────
// HELPERS
// ───────────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setShown(true),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, shown] = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[900ms] ease-out ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ───────────────────────────────────────────────────────────────
// MAIN
// ───────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [activeDash, setActiveDash] = useState(0);
  const year = new Date().getFullYear();

  const theme = dark
    ? { bg: "#0b0c0e", panel: "#111315", text: "#e8e6df", muted: "#8a8880", border: "#22252a", accent: "#d4ff4a", accentSoft: "rgba(212,255,74,0.08)" }
    : { bg: "#f5f3ee", panel: "#ffffff", text: "#0b0c0e", muted: "#6b6960", border: "#e4e1d8", accent: "#4a6a00", accentSoft: "rgba(74,106,0,0.08)" };

  return (
    <div
      style={{
        background: theme.bg,
        color: theme.text,
        fontFamily: "'Geist', system-ui, sans-serif",
        "--accent": theme.accent,
        "--accent-soft": theme.accentSoft,
        "--border": theme.border,
        "--muted": theme.muted,
        "--panel": theme.panel,
      }}
      className="min-h-screen w-full overflow-x-hidden relative"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Geist:wght@100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap');
        .font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; font-variation-settings: "SOFT" 30, "WONK" 0; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .grain::before {
          content: ""; position: absolute; inset: 0; pointer-events: none; opacity: 0.035; mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
        }
        @keyframes pulse-dot { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
        @keyframes slow-drift { 0% { transform: translate(0,0); } 50% { transform: translate(30px,-20px); } 100% { transform: translate(0,0); } }
        .dot { animation: pulse-dot 2.2s ease-in-out infinite; }
        .drift { animation: slow-drift 22s ease-in-out infinite; }
        .grid-bg {
          background-image:
            linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse at 50% 30%, black 40%, transparent 75%);
        }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 40px -20px rgba(0,0,0,0.4), 0 0 0 1px var(--accent-soft) inset; }
        .btn-primary:hover { background: var(--accent); color: #0b0c0e; }
        .btn-ghost:hover { border-color: var(--accent); color: var(--accent); }
        ::selection { background: var(--accent); color: #0b0c0e; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* Ambient grid background */}
      <div className="grid-bg absolute inset-0 opacity-40 pointer-events-none" />
      <div className="grain absolute inset-0 pointer-events-none" />

      {/* Soft accent blob */}
      <div
        className="drift absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${theme.accent}22 0%, transparent 70%)` }}
      />

      {/* ─── NAV ─── */}
      <nav className="relative z-20 max-w-7xl mx-auto px-6 md:px-10 py-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 flex items-center justify-center rounded-sm font-mono text-xs font-bold"
            style={{ background: theme.accent, color: "#0b0c0e" }}
          >
            AV
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: theme.muted }}>
            /portfolio.v3
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-[0.15em]">
          {[
            ["about", "About"],
            ["skills", "Skills"],
            ["viz", "Dashboards"],
            ["projects", "Projects"],
            ["contact", "Contact"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} className="transition-colors hover:text-[var(--accent)]" style={{ color: theme.muted }}>
              {label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setDark(!dark)}
          className="w-9 h-9 flex items-center justify-center rounded-full border transition-colors"
          style={{ borderColor: theme.border }}
          aria-label="Toggle theme"
        >
          {dark ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </nav>

      {/* ─── HERO ─── */}
      <section id="top" className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-28 pb-24 md:pb-40">
        <div className="flex items-center gap-2 mb-8 font-mono text-xs uppercase tracking-[0.2em]" style={{ color: theme.muted }}>
          <Circle size={8} fill={theme.accent} strokeWidth={0} className="dot" />
          <span>Available · Q2 2026</span>
        </div>

        <h1 className="font-display text-[clamp(3rem,10vw,8.5rem)] leading-[0.92] tracking-[-0.03em] mb-8">
          Turning messy <br />
          <span className="italic" style={{ color: theme.muted }}>data</span> into{" "}
          <span className="relative inline-block">
            decisions
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 300 12"
              preserveAspectRatio="none"
              style={{ height: "0.18em" }}
            >
              <path d="M2,6 Q75,2 150,7 T298,5" stroke={theme.accent} strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>
          </span>
          .
        </h1>

        <div className="grid md:grid-cols-[1.1fr_auto] gap-10 items-end mt-12">
          <p className="font-display text-lg md:text-xl leading-relaxed max-w-xl" style={{ color: theme.muted }}>
            I'm <span style={{ color: theme.text }}>Brian Motee</span> — a data scientist building production ML
            systems for NGOs and Businesses. Ten years modeling human behavior, three shipping things that
            survived their first weekend on-call.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="btn-primary font-mono text-xs uppercase tracking-[0.15em] px-5 py-3 border transition-all flex items-center gap-2"
              style={{ borderColor: theme.text, color: theme.text }}
            >
              See the work <ArrowUpRight size={14} />
            </a>
            <a
              href="/resume.pdf"
              className="btn-ghost font-mono text-xs uppercase tracking-[0.15em] px-5 py-3 border transition-all flex items-center gap-2"
              style={{ borderColor: theme.border, color: theme.muted }}
            >
              <FileText size={14} /> Résumé
            </a>
          </div>
        </div>

        {/* stat strip */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: theme.border }}>
          {[
            ["10+", "Years building"],
            ["24", "Models in prod"],
            ["$14M", "Attributed lift"],
            ["3", "Published papers"],
          ].map(([n, l]) => (
            <div key={l} className="px-5 py-6" style={{ background: theme.bg }}>
              <div className="font-display text-4xl md:text-5xl tracking-tight">{n}</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] mt-2" style={{ color: theme.muted }}>
                {l}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: theme.muted }}>
          <ChevronDown size={14} className="animate-bounce" />
          Scroll
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="relative z-10 border-t" style={{ borderColor: theme.border }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32 grid md:grid-cols-[1fr_1.4fr] gap-16">
          <Reveal>
            <div className="sticky top-8">
              <div className="font-mono text-xs uppercase tracking-[0.25em] mb-4 flex items-center gap-2" style={{ color: theme.muted }}>
                <span style={{ color: theme.accent }}>01</span> / About
              </div>
              <h2 className="font-display text-5xl md:text-6xl leading-[0.95] tracking-tight">
                I like the part
                <br />
                <em style={{ color: theme.accent }}>before</em> the model.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="space-y-6 font-display text-lg leading-relaxed" style={{ color: theme.muted }}>
              <p style={{ color: theme.text }}>
                Most of my best work happens in the SQL notebook two weeks before anyone touches
                scikit-learn. Framing the problem, finding the leak, picking the right loss — that's
                where leverage lives.
              </p>
              <p>
                Previously at <span style={{ color: theme.text }}>Stripe</span> (risk modeling) and{" "}
                <span style={{ color: theme.text }}>Climate Corp</span> (hierarchical forecasting). Now
                consulting independently and writing essays on causal inference at{" "}
                <a href="#" className="underline decoration-dotted underline-offset-4" style={{ color: theme.accent }}>
                  /notebook
                </a>
                .
              </p>
              <div className="pt-6 grid grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <div className="uppercase tracking-[0.2em] mb-1" style={{ color: theme.muted }}>Currently</div>
                  <div style={{ color: theme.text }}>Causal uplift modeling for a climate insurance startup</div>
                </div>
                <div>
                  <div className="uppercase tracking-[0.2em] mb-1" style={{ color: theme.muted }}>Reading</div>
                  <div style={{ color: theme.text }}>Pearl & Mackenzie — The Book of Why</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── SKILLS ─── */}
      <section id="skills" className="relative z-10 border-t" style={{ borderColor: theme.border }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.25em] mb-4 flex items-center gap-2" style={{ color: theme.muted }}>
                <span style={{ color: theme.accent }}>02</span> / Toolkit
              </div>
              <h2 className="font-display text-5xl md:text-6xl tracking-tight">What I reach for.</h2>
            </div>
            <p className="font-mono text-xs max-w-sm" style={{ color: theme.muted }}>
              Tools are commodities; <span style={{ color: theme.text }}>taste</span> is the moat. These
              are the ones I've spent the most time inside.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: theme.border }}>
            {SKILLS.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.group} delay={i * 70}>
                  <div className="p-8 h-full" style={{ background: theme.bg }}>
                    <div className="flex items-center gap-3 mb-6">
                      <Icon size={18} style={{ color: theme.accent }} />
                      <span className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: theme.muted }}>
                        {s.group}
                      </span>
                    </div>
                    <ul className="space-y-2 font-display text-2xl">
                      {s.items.map((it) => (
                        <li key={it} className="tracking-tight">
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── DATA VIZ ─── */}
      <section id="viz" className="relative z-10 border-t" style={{ borderColor: theme.border }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="mb-12">
            <div className="font-mono text-xs uppercase tracking-[0.25em] mb-4 flex items-center gap-2" style={{ color: theme.muted }}>
              <span style={{ color: theme.accent }}>03</span> / Dashboards
            </div>
            <h2 className="font-display text-5xl md:text-6xl tracking-tight mb-4">Live, embedded.</h2>
            <p className="font-display text-lg max-w-2xl" style={{ color: theme.muted }}>
              Published to Tableau Public and Power BI Service. The iframes below pull the live reports
              — filter them, drill into them, judge them honestly.
            </p>
          </div>

          {/* platform switcher */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {DASHBOARDS.map((d, i) => (
              <button
                key={d.platform}
                onClick={() => setActiveDash(i)}
                className="font-mono text-xs uppercase tracking-[0.15em] px-4 py-2 border transition-all"
                style={{
                  borderColor: activeDash === i ? theme.accent : theme.border,
                  color: activeDash === i ? theme.accent : theme.muted,
                  background: activeDash === i ? theme.accentSoft : "transparent",
                }}
              >
                {d.platform}
              </button>
            ))}
          </div>

          <Reveal>
            <div
              className="border overflow-hidden"
              style={{ borderColor: theme.border, background: theme.panel }}
            >
              <div
                className="flex items-center justify-between px-5 py-3 border-b font-mono text-xs"
                style={{ borderColor: theme.border, color: theme.muted }}
              >
                <div className="flex items-center gap-3">
                  <Activity size={12} style={{ color: theme.accent }} />
                  <span className="uppercase tracking-[0.15em]">{DASHBOARDS[activeDash].platform}</span>
                  <span style={{ color: theme.border }}>·</span>
                  <span style={{ color: theme.text }}>{DASHBOARDS[activeDash].title}</span>
                </div>
                <a
                  href={DASHBOARDS[activeDash].src}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-[var(--accent)]"
                >
                  open <ExternalLink size={11} />
                </a>
              </div>

              <div className="relative w-full" style={{ aspectRatio: "16 / 10", minHeight: 420 }}>
                <iframe
                  key={DASHBOARDS[activeDash].src}
                  src={DASHBOARDS[activeDash].src}
                  title={DASHBOARDS[activeDash].title}
                  loading="lazy"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0, background: "#fff" }}
                />
              </div>

              <div className="px-5 py-3 border-t font-mono text-[11px]" style={{ borderColor: theme.border, color: theme.muted }}>
                {DASHBOARDS[activeDash].note}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section id="projects" className="relative z-10 border-t" style={{ borderColor: theme.border }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.25em] mb-4 flex items-center gap-2" style={{ color: theme.muted }}>
                <span style={{ color: theme.accent }}>04</span> / Projects
              </div>
              <h2 className="font-display text-5xl md:text-6xl tracking-tight">Things I've shipped.</h2>
            </div>
            <a
              href="https://github.com/motebrian"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs uppercase tracking-[0.15em] flex items-center gap-2 hover:text-[var(--accent)]"
              style={{ color: theme.muted }}
            >
              <Github size={14} /> All repos
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-px" style={{ background: theme.border }}>
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 80}>
                <article
                  className="card-hover p-8 h-full flex flex-col transition-all duration-300"
                  style={{ background: theme.bg }}
                >
                  <div className="flex items-start justify-between mb-4 gap-4">
                    <h3 className="font-display text-3xl tracking-tight leading-tight">{p.title}</h3>
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.15em] px-2 py-1 whitespace-nowrap"
                      style={{ background: theme.accentSoft, color: theme.accent }}
                    >
                      {p.metric}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed mb-6" style={{ color: theme.muted }}>
                    {p.blurb}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {p.stack.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] uppercase tracking-[0.1em] px-2 py-1 border"
                        style={{ borderColor: theme.border, color: theme.muted }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center gap-3">
                    <a
                      href={p.code}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary font-mono text-[11px] uppercase tracking-[0.15em] px-4 py-2.5 border flex items-center gap-2 transition-all"
                      style={{ borderColor: theme.text, color: theme.text }}
                    >
                      <Github size={12} /> View Code
                    </a>
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-ghost font-mono text-[11px] uppercase tracking-[0.15em] px-4 py-2.5 border flex items-center gap-2 transition-all"
                      style={{ borderColor: theme.border, color: theme.muted }}
                    >
                      Live Demo <ArrowUpRight size={12} />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="relative z-10 border-t" style={{ borderColor: theme.border }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-40">
          <div className="font-mono text-xs uppercase tracking-[0.25em] mb-8 flex items-center gap-2" style={{ color: theme.muted }}>
            <span style={{ color: theme.accent }}>05</span> / Contact
          </div>

          <h2 className="font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.9] tracking-[-0.02em] mb-16">
            Got a <em style={{ color: theme.accent }}>hard</em> <br />
            data problem?
          </h2>

          <div className="grid md:grid-cols-[1.2fr_1fr] gap-16 items-end">
            <p className="font-display text-xl max-w-lg leading-relaxed" style={{ color: theme.muted }}>
              I take on two engagements a quarter — usually forecasting, causal inference, or fixing a
              model everyone's stopped trusting. Send me the messy version.
            </p>

            <div className="space-y-4">
              {[
                { Icon: Mail, label: "motebrian926@gmail.com", href: "mailto:motebrian926@gmail.com" },
                { Icon: Linkedin, label: "linkedin.com/in/brian-motee", href: "https://www.linkedin.com/in/brian-motee" },
                { Icon: Github, label: "github.com/motebrian", href: "https://github.com/motebrian" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="group flex items-center justify-between py-4 border-b transition-colors"
                  style={{ borderColor: theme.border }}
                >
                  <span className="flex items-center gap-3 font-mono text-sm">
                    <Icon size={15} style={{ color: theme.accent }} />
                    {label}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    style={{ color: theme.muted }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer
        className="relative z-10 border-t px-6 md:px-10 py-8 flex items-center justify-between flex-wrap gap-4"
        style={{ borderColor: theme.border }}
      >
        <div className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: theme.muted }}>
          © {year} Brian Motee · Data Scientist
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] flex items-center gap-2" style={{ color: theme.muted }}>
          <Sparkles size={11} style={{ color: theme.accent }} /> 
        </div>
      </footer>
    </div>
  );
}
