import { useEffect, useRef, useState } from "react";

/**
 * TableauEmbed.jsx
 *
 * Mobile-safe Tableau Public embed. Uses the Tableau Embedding API v3
 * (<tableau-viz> custom element) instead of a raw iframe — it handles
 * resize events, exposes filter state, and respects device-specific
 * dashboards if you've published them.
 *
 * Usage:
 *   <TableauEmbed
 *     src="https://public.tableau.com/views/YourWorkbook/YourSheet"
 *     title="Global Climate Indicators"
 *     aspectRatio={16 / 10}
 *   />
 *
 * The share URL from Tableau Public works as-is; you don't need the
 * `:embed=y` query param when using the custom element.
 */

const EMBED_SCRIPT =
  "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js";

// Load the embedding API once per page, even if multiple embeds render.
let scriptPromise = null;
function loadTableauScript() {
  if (typeof window === "undefined") return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    if (customElements.get("tableau-viz")) return resolve();
    const existing = document.querySelector(`script[src="${EMBED_SCRIPT}"]`);
    if (existing) {
      existing.addEventListener("load", resolve);
      existing.addEventListener("error", reject);
      return;
    }
    const s = document.createElement("script");
    s.type = "module";
    s.src = EMBED_SCRIPT;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
  return scriptPromise;
}

// Strip share-link noise so the viz URL is clean for the custom element.
function normalizeTableauUrl(url) {
  try {
    const u = new URL(url);
    // Drop params the API doesn't need and some that cause double-loads.
    ["?:embed", ":embed", ":display_count", ":origin", ":language"].forEach(
      (p) => u.searchParams.delete(p.replace(/^:/, ""))
    );
    return u.toString();
  } catch {
    return url;
  }
}

export default function TableauEmbed({
  src,
  title = "Tableau visualization",
  aspectRatio = 16 / 10,
  minHeight = 420,
  hideTabs = true,
  toolbar = "bottom", // "top" | "bottom" | "hidden"
  device, // "default" | "desktop" | "tablet" | "phone"
  className = "",
}) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const containerRef = useRef(null);
  const cleanSrc = normalizeTableauUrl(src);

  useEffect(() => {
    let cancelled = false;
    loadTableauScript()
      .then(() => !cancelled && setReady(true))
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`tableau-embed-wrapper ${className}`}
      // Aspect-ratio on wide screens, flexible min-height on narrow ones.
      // overflow-x-auto is the safety net: if a desktop-only dashboard
      // can't shrink below 800px, the user gets scrollable panning
      // instead of a broken layout.
      style={{
        width: "100%",
        aspectRatio: String(aspectRatio),
        minHeight,
        overflowX: "auto",
        overflowY: "hidden",
        WebkitOverflowScrolling: "touch",
        position: "relative",
      }}
    >
      {failed ? (
        // Fallback: plain iframe with embed params, if the API script
        // is blocked (ad blockers, strict CSP, etc.).
        <iframe
          title={title}
          src={`${cleanSrc}${cleanSrc.includes("?") ? "&" : "?"}:embed=y&:showVizHome=no&:toolbar=${toolbar === "hidden" ? "no" : "yes"}`}
          loading="lazy"
          allowFullScreen
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: 0,
            background: "#fff",
          }}
        />
      ) : ready ? (
        // React accepts custom elements; kebab-case attributes map directly.
        <tableau-viz
          src={cleanSrc}
          toolbar={toolbar}
          {...(hideTabs ? { "hide-tabs": true } : {})}
          {...(device ? { device } : {})}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
          }}
        />
      ) : (
        <TableauSkeleton title={title} />
      )}
    </div>
  );
}

function TableauSkeleton({ title }) {
  return (
    <div
      aria-busy="true"
      aria-label={`${title} loading`}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
        backgroundSize: "200% 100%",
        animation: "tableau-shimmer 1.6s linear infinite",
        fontFamily: "monospace",
        fontSize: 11,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.5)",
      }}
    >
      <style>{`
        @keyframes tableau-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      Loading viz…
    </div>
  );
}
