import { useState } from "react";

export const PALETTES = {
  gold: {
    name: "Executive Gold",
    desc: "Classic prestige — current look",
    bg:        "#07080E",
    surface:   "#0C0E1C",
    card:      "#101422",
    cardHov:   "#141828",
    border:    "#1A2040",
    borderHov: "#2A3460",
    accent:    "#C49A3C",
    accentLt:  "#DCBA5E",
    accentBt:  "#F2D080",
    accentDim: "rgba(196,154,60,.09)",
    accentBdr: "rgba(196,154,60,.22)",
    accentGlow:"rgba(196,154,60,.05)",
    teal:      "#2DD8C3",
    blue:      "#4B78F5",
    green:     "#34D399",
  },
  sapphire: {
    name: "Sapphire Blueprint",
    desc: "Trusted, tech-forward consulting",
    bg:        "#060A14",
    surface:   "#08101E",
    card:      "#0C1428",
    cardHov:   "#101830",
    border:    "#162240",
    borderHov: "#243660",
    accent:    "#4B78F5",
    accentLt:  "#7099F7",
    accentBt:  "#99BCF9",
    accentDim: "rgba(75,120,245,.09)",
    accentBdr: "rgba(75,120,245,.25)",
    accentGlow:"rgba(75,120,245,.06)",
    teal:      "#2DD8C3",
    blue:      "#818CF8",
    green:     "#34D399",
  },
  crimson: {
    name: "Crimson Authority",
    desc: "Bold, decisive, commands attention",
    bg:        "#0D0708",
    surface:   "#130C0D",
    card:      "#180F10",
    cardHov:   "#1E1214",
    border:    "#361820",
    borderHov: "#4E2430",
    accent:    "#E05252",
    accentLt:  "#EE7575",
    accentBt:  "#F79898",
    accentDim: "rgba(224,82,82,.09)",
    accentBdr: "rgba(224,82,82,.24)",
    accentGlow:"rgba(224,82,82,.05)",
    teal:      "#2DD8C3",
    blue:      "#60A5FA",
    green:     "#34D399",
  },
  emerald: {
    name: "Emerald Intelligence",
    desc: "Growth, NGO & sustainability work",
    bg:        "#060D09",
    surface:   "#08120C",
    card:      "#0C1810",
    cardHov:   "#101E14",
    border:    "#163825",
    borderHov: "#225038",
    accent:    "#10A878",
    accentLt:  "#2EC99A",
    accentBt:  "#5EDDB8",
    accentDim: "rgba(16,168,120,.09)",
    accentBdr: "rgba(16,168,120,.24)",
    accentGlow:"rgba(16,168,120,.05)",
    teal:      "#3B82F6",
    blue:      "#818CF8",
    green:     "#F59E0B",
  },
  violet: {
    name: "Violet Frontier",
    desc: "Modern AI & analytics premium",
    bg:        "#080714",
    surface:   "#0C0A1C",
    card:      "#100E24",
    cardHov:   "#14122C",
    border:    "#1E1844",
    borderHov: "#2C2860",
    accent:    "#8B5CF6",
    accentLt:  "#A78BFA",
    accentBt:  "#C4B5FD",
    accentDim: "rgba(139,92,246,.09)",
    accentBdr: "rgba(139,92,246,.24)",
    accentGlow:"rgba(139,92,246,.05)",
    teal:      "#2DD8C3",
    blue:      "#60A5FA",
    green:     "#34D399",
  },
};

const mono  = `'Space Mono', 'Courier New', monospace`;
const serif = `'Playfair Display', Georgia, serif`;
const sans  = `'Inter', system-ui, sans-serif`;

function MiniPreview({ p }) {
  return (
    <div style={{ background: p.bg, borderRadius: 8, overflow: "hidden", border: `1px solid ${p.border}` }}>
      {/* Mini nav */}
      <div style={{
        background: p.surface, borderBottom: `1px solid ${p.border}`,
        padding: "8px 14px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <div style={{ fontFamily: serif, fontSize: 11, fontWeight: 700, color: "#ECE8E0" }}>Brian Motee</div>
          <div style={{ fontFamily: mono, fontSize: 7, color: p.accent, letterSpacing: 2 }}>DATA SCIENTIST</div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ width: 22, height: 4, borderRadius: 2, background: i === 0 ? p.accent : p.border }} />
          ))}
        </div>
      </div>

      {/* Hero snippet */}
      <div style={{ padding: "16px 14px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <span style={{ display: "block", width: 16, height: 1.5, background: p.accent, borderRadius: 2 }} />
          <span style={{ fontFamily: mono, fontSize: 7, color: p.accent, letterSpacing: 2, textTransform: "uppercase" }}>
            Based in Nairobi
          </span>
        </div>
        <div style={{ fontFamily: serif, fontSize: 22, fontWeight: 900, color: "#ECE8E0", lineHeight: 1.1, marginBottom: 2 }}>
          Brian<br />
          <span style={{ color: p.accent }}>Motee.</span>
        </div>
        <div style={{ fontFamily: mono, fontSize: 7, color: "#8A8A9C", letterSpacing: 2, marginBottom: 10 }}>
          ◈ DATA SCIENTIST
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
          <div style={{
            background: p.accent, color: p.bg,
            fontFamily: mono, fontSize: 8, fontWeight: 700, letterSpacing: 1,
            padding: "5px 10px", borderRadius: 3,
          }}>
            VIEW WORK
          </div>
          <div style={{
            background: "transparent", color: p.accentLt,
            fontFamily: mono, fontSize: 8, fontWeight: 700, letterSpacing: 1,
            padding: "5px 10px", borderRadius: 3,
            border: `1px solid ${p.accentBdr}`,
          }}>
            BOOK CALL
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 14, marginBottom: 12 }}>
          {["5+", "20+", "4"].map((v, i) => (
            <div key={i}>
              <div style={{ fontFamily: serif, fontSize: 13, fontWeight: 700, color: p.accent }}>{v}</div>
              <div style={{ fontFamily: mono, fontSize: 6, color: "#5A596A", letterSpacing: 1 }}>YRS / PROJECTS</div>
            </div>
          ))}
        </div>

        {/* Mini skill card */}
        <div style={{
          background: p.card, border: `1px solid ${p.border}`,
          borderRadius: 6, padding: "8px 10px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
            <div style={{ fontFamily: mono, fontSize: 7, fontWeight: 700, color: p.accent, letterSpacing: 1, textTransform: "uppercase" }}>
              Machine Learning
            </div>
            <span style={{ fontFamily: mono, fontSize: 7, color: p.accent }}>88%</span>
          </div>
          <div style={{ height: 2, background: `${p.accent}20`, borderRadius: 2 }}>
            <div style={{ width: "88%", height: "100%", background: `linear-gradient(90deg, ${p.accent}80, ${p.accent})`, borderRadius: 2 }} />
          </div>
          <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
            {["Python", "XGBoost", "SHAP"].map(t => (
              <span key={t} style={{
                fontFamily: mono, fontSize: 6.5, padding: "2px 6px", borderRadius: 2,
                background: `${p.accent}18`, color: p.accent, border: `1px solid ${p.accentBdr}`,
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Color swatch strip */}
        <div style={{ display: "flex", gap: 4, marginTop: 10 }}>
          {[p.accent, p.teal, p.blue, p.green, p.border].map((col, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: col }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PaletteShowcase({ current, onSelect, onClose }) {
  const [hovered, setHovered] = useState(null);
  const keys = Object.keys(PALETTES);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(4,5,10,0.92)", backdropFilter: "blur(18px)",
      display: "flex", flexDirection: "column", overflowY: "auto",
    }}>
      {/* Header */}
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "rgba(4,5,10,0.96)", borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <div style={{ fontFamily: mono, fontSize: 9, color: "#C49A3C", letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>
            — Portfolio Designer
          </div>
          <div style={{ fontFamily: serif, fontSize: 24, fontWeight: 700, color: "#ECE8E0" }}>
            Choose a Color Palette
          </div>
          <div style={{ fontFamily: sans, fontSize: 13, color: "#5A596A", marginTop: 4 }}>
            Each preview shows your actual portfolio UI in that color scheme.
          </div>
        </div>
        <button onClick={onClose} style={{
          background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 8, padding: "10px 18px", cursor: "pointer",
          fontFamily: mono, fontSize: 11, color: "#8A8A9C", letterSpacing: 1,
          transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.color = "#ECE8E0"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "#8A8A9C"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
        >
          ✕ Close
        </button>
      </div>

      {/* Palette grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 20, padding: "32px",
        maxWidth: 1300, margin: "0 auto", width: "100%",
      }}>
        {keys.map((key) => {
          const p = PALETTES[key];
          const isActive = current === key;
          const isHov = hovered === key;
          return (
            <div key={key}
              onMouseEnter={() => setHovered(key)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelect(key)}
              style={{
                cursor: "pointer",
                border: isActive
                  ? `2px solid ${p.accent}`
                  : isHov
                    ? `2px solid ${p.accentBdr}`
                    : "2px solid rgba(255,255,255,0.06)",
                borderRadius: 12,
                overflow: "hidden",
                transform: isHov && !isActive ? "translateY(-4px)" : "none",
                boxShadow: isActive ? `0 0 40px ${p.accentGlow}, 0 0 0 1px ${p.accent}30` : "none",
                transition: "all 0.2s ease",
              }}
            >
              <MiniPreview p={p} />

              {/* Label strip */}
              <div style={{
                padding: "14px 16px",
                background: isActive ? `${p.accentDim}` : "rgba(10,11,18,0.9)",
                borderTop: `1px solid ${isActive ? p.accentBdr : "rgba(255,255,255,0.05)"}`,
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <div>
                  <div style={{ fontFamily: serif, fontSize: 14, fontWeight: 700, color: isActive ? p.accent : "#ECE8E0", marginBottom: 2 }}>
                    {p.name}
                  </div>
                  <div style={{ fontFamily: sans, fontSize: 11, color: "#5A596A" }}>{p.desc}</div>
                </div>
                {isActive && (
                  <span style={{
                    fontFamily: mono, fontSize: 8, fontWeight: 700,
                    color: p.bg, background: p.accent,
                    padding: "3px 8px", borderRadius: 20, letterSpacing: 1, whiteSpace: "nowrap",
                  }}>
                    ACTIVE
                  </span>
                )}
                {!isActive && isHov && (
                  <span style={{
                    fontFamily: mono, fontSize: 8, fontWeight: 700,
                    color: p.accentLt, border: `1px solid ${p.accentBdr}`,
                    padding: "3px 8px", borderRadius: 20, letterSpacing: 1, whiteSpace: "nowrap",
                  }}>
                    APPLY →
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: "center", padding: "0 32px 40px" }}>
        <div style={{ fontFamily: sans, fontSize: 12, color: "#5A596A" }}>
          Click a palette to apply it instantly · Your selection updates the live portfolio below
        </div>
      </div>
    </div>
  );
}
