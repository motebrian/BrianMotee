import { useState, useRef, useEffect } from "react";
import { Activity, ExternalLink, Maximize2 } from "lucide-react";

/**
 * DashboardShowcase.jsx
 *
 * Tabbed Power BI report viewer. Switching tabs does NOT reload the
 * report — we lazy-mount each iframe on first visit, then keep it
 * mounted and toggle visibility. Filters, drill-state, and zoom
 * survive tab switches.
 *
 * Usage:
 *   const REPORTS = [
 *     {
 *       id: "revenue",
 *       title: "Revenue Attribution",
 *       platform: "Power BI",
 *       note: "Multi-touch across 8 channels.",
 *       src: "https://app.powerbi.com/view?r=eyJr...", // publish-to-web URL
 *     },
 *     ...
 *   ];
 *   <DashboardShowcase reports={REPORTS} />
 *
 * Upgrade path: if you have Power BI Pro and want row-level security
 * or programmatic filters, replace the <iframe> inside renderPanel()
 * with <PowerBIEmbed /> from the `powerbi-client-react` package. The
 * tab shell stays identical.
 */

export default function DashboardShowcase({
  reports,
  theme = "dark",
  initialIndex = 0,
}) {
  const [active, setActive] = useState(initialIndex);
  // Track which tabs have been opened at least once. Once in the set,
  // the iframe stays mounted so state is preserved across switches.
  const [mounted, setMounted] = useState(new Set([initialIndex]));
  const tabRefs = useRef([]);
  const panelRef = useRef(null);

  function select(i) {
    setActive(i);
    setMounted((prev) => {
      if (prev.has(i)) return prev;
      const next = new Set(prev);
      next.add(i);
      return next;
    });
  }

  // Arrow-key navigation between tabs (WAI-ARIA Tabs pattern).
  function onTabKey(e, i) {
    const count = reports.length;
    let target = null;
    if (e.key === "ArrowRight") target = (i + 1) % count;
    else if (e.key === "ArrowLeft") target = (i - 1 + count) % count;
    else if (e.key === "Home") target = 0;
    else if (e.key === "End") target = count - 1;
    if (target !== null) {
      e.preventDefault();
      select(target);
      tabRefs.current[target]?.focus();
    }
  }

  function openFullscreen() {
    const el = panelRef.current;
    if (!el) return;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  }

  const t = theme === "dark" ? darkTokens : lightTokens;
  const current = reports[active];

  return (
    <div
      className="w-full"
      style={{ "--db-border": t.border, "--db-accent": t.accent, "--db-muted": t.muted, "--db-text": t.text, "--db-panel": t.panel, "--db-soft": t.accentSoft }}
    >
      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Dashboard selector"
        className="flex flex-wrap gap-1 mb-3"
      >
        {reports.map((r, i) => {
          const isActive = i === active;
          return (
            <button
              key={r.id ?? r.src}
              ref={(el) => (tabRefs.current[i] = el)}
              role="tab"
              id={`db-tab-${i}`}
              aria-selected={isActive}
              aria-controls={`db-panel-${i}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => onTabKey(e, i)}
              className="group font-mono text-[11px] uppercase tracking-[0.15em] px-4 py-2.5 border transition-all flex items-center gap-2"
              style={{
                borderColor: isActive ? t.accent : t.border,
                color: isActive ? t.accent : t.muted,
                background: isActive ? t.accentSoft : "transparent",
              }}
            >
              {r.platform && (
                <span
                  className="text-[9px] opacity-60"
                  style={{ letterSpacing: "0.2em" }}
                >
                  {r.platform}
                </span>
              )}
              <span>{r.title}</span>
            </button>
          );
        })}
      </div>

      {/* Panel frame */}
      <div
        ref={panelRef}
        className="border overflow-hidden"
        style={{ borderColor: t.border, background: t.panel }}
      >
        {/* Header bar */}
        <div
          className="flex items-center justify-between px-5 py-3 border-b font-mono text-xs"
          style={{ borderColor: t.border, color: t.muted }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <Activity size={12} style={{ color: t.accent, flexShrink: 0 }} />
            <span
              className="uppercase tracking-[0.15em] flex-shrink-0"
              style={{ color: t.muted }}
            >
              {current.platform ?? "Power BI"}
            </span>
            <span style={{ color: t.border, flexShrink: 0 }}>·</span>
            <span className="truncate" style={{ color: t.text }}>
              {current.title}
            </span>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={openFullscreen}
              className="flex items-center gap-1 hover:text-[color:var(--db-accent)] transition-colors"
              aria-label="Fullscreen"
              title="Fullscreen"
            >
              <Maximize2 size={11} />
            </button>
            <a
              href={current.src}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-[color:var(--db-accent)] transition-colors"
            >
              open <ExternalLink size={11} />
            </a>
          </div>
        </div>

        {/* Panels: all mounted iframes live here, only the active one is visible. */}
        <div
          className="relative w-full bg-white"
          style={{
            aspectRatio: "16 / 10",
            minHeight: 420,
          }}
        >
          {reports.map((r, i) => {
            const isMounted = mounted.has(i);
            const isActive = i === active;
            return (
              <div
                key={r.id ?? r.src}
                role="tabpanel"
                id={`db-panel-${i}`}
                aria-labelledby={`db-tab-${i}`}
                hidden={!isActive}
                className="absolute inset-0"
                style={{
                  // `hidden` attribute handles a11y; these styles let
                  // inactive iframes keep running in the background
                  // without being painted.
                  visibility: isActive ? "visible" : "hidden",
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                {isMounted ? (
                  <iframe
                    title={r.title}
                    src={r.src}
                    loading={i === initialIndex ? "eager" : "lazy"}
                    allowFullScreen
                    style={{
                      width: "100%",
                      height: "100%",
                      border: 0,
                      background: "#fff",
                    }}
                  />
                ) : null}
              </div>
            );
          })}
        </div>

        {/* Optional footer with the note */}
        {current.note && (
          <div
            className="px-5 py-3 border-t font-mono text-[11px]"
            style={{ borderColor: t.border, color: t.muted }}
          >
            {current.note}
          </div>
        )}
      </div>
    </div>
  );
}

const darkTokens = {
  panel: "#111315",
  text: "#e8e6df",
  muted: "#8a8880",
  border: "#22252a",
  accent: "#d4ff4a",
  accentSoft: "rgba(212,255,74,0.08)",
};

const lightTokens = {
  panel: "#ffffff",
  text: "#0b0c0e",
  muted: "#6b6960",
  border: "#e4e1d8",
  accent: "#4a6a00",
  accentSoft: "rgba(74,106,0,0.08)",
};
