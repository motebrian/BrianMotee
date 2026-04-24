import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════════════ */
const C = {
  bg:         "#07080E",
  surface:    "#0C0E1C",
  card:       "#101422",
  cardHov:    "#141828",
  border:     "#1A2040",
  borderHov:  "#2A3460",
  gold:       "#C49A3C",
  goldLt:     "#DCBA5E",
  goldBt:     "#F2D080",
  goldDim:    "rgba(196,154,60,.09)",
  goldBdr:    "rgba(196,154,60,.22)",
  goldGlow:   "rgba(196,154,60,.05)",
  text:       "#ECE8E0",
  dim:        "#B2AEA6",
  muted:      "#5A596A",
  mid:        "#8A8A9C",
  white:      "#FFFFFF",
  blue:       "#4B78F5",
  teal:       "#2DD8C3",
  green:      "#34D399",
  serif:      `'Playfair Display', Georgia, serif`,
  sans:       `'Inter', system-ui, sans-serif`,
  mono:       `'Space Mono', 'Courier New', monospace`,
};

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const NAV = [
  { id: "about",    label: "Meet Brian"    },
  { id: "toolkit",  label: "The Toolkit"   },
  { id: "projects", label: "Case Files"    },
  { id: "journey",  label: "The Chronicle" },
  { id: "articles", label: "The Feed"      },
  { id: "channel",  label: "The Channel"   },
  { id: "services", label: "The Offer"     },
  { id: "booking",  label: "Let's Talk"    },
];

const STATS = [
  { value: "5+",   label: "Years Experience"      },
  { value: "20+",  label: "Projects Delivered"    },
  { value: "4",    label: "Organizations Served"  },
  { value: "12K+", label: "Records Processed"     },
];

const SKILLS = [
  {
    label: "Statistical Analysis",
    color: C.gold,
    items: ["R / R Studio", "Python", "STATA", "SPSS", "Excel (Power Query)"],
  },
  {
    label: "Machine Learning",
    color: C.teal,
    items: ["scikit-learn", "XGBoost / LightGBM", "NLP & Transformers", "Prophet / N-BEATS", "SHAP Explainability"],
  },
  {
    label: "Visualization & BI",
    color: C.blue,
    items: ["Power BI", "Tableau", "Plotly / Dash", "ggplot2", "IBM Cognos / Looker"],
  },
  {
    label: "Geospatial",
    color: C.green,
    items: ["GeoPandas", "QGIS", "Folium / Leaflet", "PostGIS", "Spatial Analysis"],
  },
  {
    label: "Data Engineering",
    color: "#C084FC",
    items: ["PostgreSQL", "ETL Pipelines", "Google App Script", "SurveyCTO / REDCap", "Data Pipelines"],
  },
  {
    label: "Research Methods",
    color: "#FB923C",
    items: ["Mixed Methods", "Survey Design", "Impact Evaluation", "KPI Monitoring", "Research Ethics"],
  },
];

const PROJECTS = {
  ml: [
    {
      title: "Customer Churn Intelligence Engine",
      description: "Gradient-boosted ensemble predicting subscription cancellation 30 days ahead. SHAP-powered explainability layer translates model outputs into business-ready narratives for non-technical stakeholders.",
      tech: ["Python", "XGBoost", "SHAP", "Streamlit", "FastAPI"],
      metric: "AUC 0.91",
      github: "https://github.com/motebrian",
      demo: null,
    },
    {
      title: "NLP Survey Response Classifier",
      description: "End-to-end NLP pipeline classifying open-ended survey responses at scale. Trained on multilingual East African research datasets with Swahili / English support for public health research.",
      tech: ["Python", "HuggingFace", "Transformers", "PostgreSQL", "Streamlit"],
      metric: "F1 Score 0.87",
      github: "https://github.com/motebrian",
      demo: null,
    },
    {
      title: "Population Health Outcome Predictor",
      description: "Random forest classifier predicting health outcomes from demographic and behavioral survey data. Integrated with REDCap data exports for automated model retraining on fresh field data.",
      tech: ["Python", "scikit-learn", "pandas", "REDCap API", "Power BI"],
      metric: "Precision 0.89",
      github: "https://github.com/motebrian",
      demo: null,
    },
  ],
  r: [
    {
      title: "Population Health Statistical Study",
      description: "Comprehensive statistical analysis of population health survey data — survival analysis, logistic regression, and multivariate modeling with publication-ready ggplot2 visualizations for APHRC.",
      tech: ["R", "ggplot2", "survival", "tidyverse", "R Markdown"],
      metric: "n = 12,000 records",
      github: "https://github.com/motebrian",
      demo: null,
    },
    {
      title: "Public Health Monitoring Dashboard",
      description: "R Shiny application enabling real-time exploration of health KPIs across geographies. Used by APHRC program teams to monitor field data quality and intervention coverage in real-time.",
      tech: ["R Shiny", "tidyverse", "plotly", "DT", "flexdashboard"],
      metric: "Live Dashboard",
      github: "https://github.com/motebrian",
      demo: null,
    },
    {
      title: "FamilEA Reproducible Analysis Pipeline",
      description: "Automated R pipeline for the FamilEA population study — data cleaning, validation, and analysis of SurveyCTO exports with fully reproducible R Markdown reports for field teams.",
      tech: ["R", "tidyverse", "haven", "janitor", "knitr"],
      metric: "Reproducible Pipeline",
      github: "https://github.com/motebrian",
      demo: null,
    },
  ],
  geo: [
    {
      title: "Nairobi Health Facility Access Atlas",
      description: "Spatial accessibility analysis mapping walking-distance corridors to health facilities across Nairobi's informal settlements — informing county health teams on optimal new facility placement.",
      tech: ["Python", "GeoPandas", "Folium", "QGIS", "Streamlit"],
      metric: "2.3M Residents",
      github: "https://github.com/motebrian",
      demo: null,
    },
    {
      title: "East Africa NGO Impact Footprint",
      description: "Choropleth mapping platform visualizing NGO program coverage and impact metrics across 6 East African countries. Enables donor reporting and strategic gap analysis in underserved regions.",
      tech: ["Python", "GeoPandas", "Plotly", "PostGIS", "Dash"],
      metric: "6 Countries",
      github: "https://github.com/motebrian",
      demo: null,
    },
    {
      title: "Market Expansion Intelligence Map",
      description: "Geo-spatial market analysis identifying optimal expansion corridors using population density, competitor proximity, and socioeconomic indicators. Deployed for a retail sector client.",
      tech: ["Python", "GeoPandas", "scikit-learn", "Tableau", "PostGIS"],
      metric: "ROI +34%",
      github: "https://github.com/motebrian",
      demo: null,
    },
  ],
};

const EXPERIENCE = [
  {
    role: "Research Coordinator",
    org: "Africa Population Health Research Centre (APHRC)",
    period: "Nov 2025 – Jan 2026",
    type: "Research",
    typeColor: C.teal,
    highlights: [
      "Led daily data quality checks across SurveyCTO data collection pipelines",
      "Coordinated stakeholder engagement for access to high-income areas and government approvals",
      "Monitored and reported KPIs for field data collection operations",
      "Resolved SurveyCTO technical issues ensuring zero data loss across field teams",
    ],
  },
  {
    role: "Program Associate",
    org: "Africa Population Health Research Centre (APHRC)",
    period: "Nov 2024 – Aug 2025",
    type: "Analytics",
    typeColor: C.gold,
    highlights: [
      "Built and optimized partnerships database supporting program-wide analytics and reporting",
      "Designed executive dashboards and reports tracking program performance indicators",
      "Automated data workflows (Google App Script → PostgreSQL), cutting turnaround time by 60%",
      "Created and deployed questionnaires in REDCap and Google Forms at scale",
      "Conducted mixed-methods analysis informing organizational strategic decisions",
    ],
  },
  {
    role: "Statistician — Project FamilEA",
    org: "Africa Population Health Research Centre (APHRC)",
    period: "May 2024 – Nov 2024",
    type: "Research",
    typeColor: C.teal,
    highlights: [
      "Designed, tested, and optimized the population survey questionnaire in SurveyCTO",
      "Conducted data cleaning, validation, and quality assurance on 12,000+ records",
      "Performed quantitative and qualitative analyses on population-level datasets",
      "Oversaw field operations and compliance with research ethics protocols",
    ],
  },
  {
    role: "Data Analyst",
    org: "Ground View Analytics",
    period: "May 2023 – Jan 2024",
    type: "Analytics",
    typeColor: C.gold,
    highlights: [
      "Delivered actionable insights from complex datasets informing pricing and market entry decisions",
      "Developed Tableau and Power BI dashboards for client business intelligence",
      "Deployed predictive ML models for clients using Python",
      "Built and maintained the organization's PostgreSQL database infrastructure",
      "Automated data cleaning workflows using Power Query and Python",
    ],
  },
  {
    role: "Data Analyst / Research Assistant",
    org: "Niusline Media Ltd",
    period: "Mar 2021 – Apr 2023",
    type: "Analytics",
    typeColor: C.blue,
    highlights: [
      "Built market research dashboards improving strategic planning and editorial decisions",
      "Conducted data modeling, cleaning, and visualization in Excel and Python",
      "Designed automated online questionnaires with integrated reporting workflows",
    ],
  },
];

const EDUCATION = {
  degree: "Bachelor of Arts — Economics & Sociology",
  institution: "Laikipia University",
  period: "2016 – 2021",
  location: "Nyahururu, Kenya",
};

const CERTS = [
  { name: "Applied Data Science Lab",                    issuer: "Worldquant University",       year: "2026" },
  { name: "Statistical Analysis with R — Public Health", issuer: "Imperial College London",     year: "2025" },
  { name: "Business Intelligence & Data Analyst",        issuer: "Corporate Finance Institute", year: "2023" },
  { name: "SQL Fundamentals",                            issuer: "Corporate Finance Institute", year: "2023" },
  { name: "Python Fundamentals",                         issuer: "Corporate Finance Institute", year: "2023" },
  { name: "Tableau Fundamentals",                        issuer: "Corporate Finance Institute", year: "2022" },
  { name: "Advanced Excel Formulas & Functions",         issuer: "Corporate Finance Institute", year: "2022" },
  { name: "Fundamental Power BI",                        issuer: "Corporate Finance Institute", year: "2022" },
];

const SERVICES = [
  {
    title: "Machine Learning Solutions",
    tagline: "Predictive Intelligence for Real Decisions",
    desc: "Custom ML models — churn prediction, classification, NLP, time-series forecasting — built for the scale and nuance of your business or program data. From prototype to deployed API.",
    items: ["Predictive Model Development", "Model Explainability (SHAP/LIME)", "Streamlit & API Deployment", "Performance Monitoring"],
    for: "Businesses & NGOs",
    color: C.teal,
  },
  {
    title: "Geospatial Intelligence",
    tagline: "Where Your Data Lives on the Map",
    desc: "Spatial analysis, interactive maps, and GIS-powered insights that reveal the geographic dimension of your problem — from facility planning to market expansion strategy.",
    items: ["Spatial Data Analysis", "Interactive Map Dashboards", "Accessibility & Proximity Modeling", "GIS-Powered Reporting"],
    for: "NGOs, Government & Retail",
    color: C.green,
  },
  {
    title: "R Statistical Analysis",
    tagline: "Rigorous Stats for Evidence-Based Work",
    desc: "End-to-end statistical analysis in R — survey design through regression modeling, survival analysis, and publication-ready visualizations for academic or executive audiences.",
    items: ["Descriptive & Inferential Stats", "Regression & Survival Analysis", "R Shiny Interactive Dashboards", "R Markdown Reports"],
    for: "Researchers & Public Health Teams",
    color: C.gold,
  },
  {
    title: "BI Dashboard Design",
    tagline: "Insights Your Leadership Will Actually Use",
    desc: "Executive-grade Power BI and Tableau dashboards that transform raw data into clear, actionable narratives — designed for decision-makers, not data scientists.",
    items: ["Power BI & Tableau Development", "KPI Framework Design", "Automated Data Refresh", "Executive Reporting Packs"],
    for: "Leadership Teams & Donors",
    color: C.blue,
  },
  {
    title: "Research & Survey Analytics",
    tagline: "From Field to Finding",
    desc: "Full-cycle research support — questionnaire design in SurveyCTO/REDCap, field data management, mixed-methods analysis, and stakeholder-ready evidence reports.",
    items: ["Survey Design & Scripting", "Data Management Plans", "Mixed-Methods Analysis", "Impact & Evidence Reports"],
    for: "NGOs & Research Institutions",
    color: "#C084FC",
  },
  {
    title: "Data Engineering & Automation",
    tagline: "Reliable Pipelines. Trustworthy Data.",
    desc: "PostgreSQL database design, automated data pipelines, and workflow automation that eliminates manual data work and gives your team back hours every week.",
    items: ["Database Design (PostgreSQL)", "ETL Pipeline Development", "Workflow Automation", "Data Quality Frameworks"],
    for: "Organizations Scaling Data Ops",
    color: "#FB923C",
  },
];

const MEDIUM_TOPICS = [
  { title: "Using SHAP to Make Machine Learning Explainable to Business Stakeholders", tag: "Machine Learning", read: "7 min" },
  { title: "Mapping Health Equity: A GIS Approach to Facility Access in Urban Kenya",  tag: "Geospatial",      read: "9 min" },
  { title: "Automating Survey Data Pipelines with Google Apps Script and PostgreSQL",   tag: "Data Engineering", read: "6 min" },
  { title: "R Shiny for Public Health: Building Real-Time Monitoring Dashboards",        tag: "R / Statistics",  read: "8 min" },
];

/* ═══════════════════════════════════════════════════════════════
   UTILITIES
═══════════════════════════════════════════════════════════════ */
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function Reveal({ children, delay = 0, y = 28, className = "" }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : `translateY(${y}px)`,
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PRIMITIVES
═══════════════════════════════════════════════════════════════ */
function Eyebrow({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
      <span style={{ display: "block", width: 28, height: 2, background: C.gold, borderRadius: 2, flexShrink: 0 }} />
      <span style={{ color: C.gold, fontFamily: C.mono, fontSize: 10, letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700 }}>
        {children}
      </span>
    </div>
  );
}

function Headline({ children, size = "lg", as: Tag = "h2", style: ex = {} }) {
  const sz = {
    xl: "clamp(2.8rem,6vw,4.5rem)",
    lg: "clamp(1.9rem,3.5vw,2.8rem)",
    md: "clamp(1.3rem,2.2vw,1.8rem)",
    sm: "clamp(1.1rem,1.8vw,1.4rem)",
  };
  return (
    <Tag style={{ fontFamily: C.serif, fontSize: sz[size], fontWeight: 700, color: C.text, lineHeight: 1.18, margin: 0, ...ex }}>
      {children}
    </Tag>
  );
}

function Btn({ href, onClick, children, variant = "solid", size = "md", style: ex = {} }) {
  const pad = { lg: "14px 32px", md: "11px 24px", sm: "8px 18px" }[size];
  const fz  = { lg: 13, md: 12, sm: 11 }[size];
  const base = {
    display: "inline-flex", alignItems: "center", gap: 8,
    fontFamily: C.mono, fontSize: fz, fontWeight: 700,
    letterSpacing: "1.5px", textTransform: "uppercase",
    textDecoration: "none", borderRadius: 4, cursor: "pointer",
    padding: pad, transition: "all 0.2s ease", whiteSpace: "nowrap",
    ...ex,
  };
  const styles = {
    solid:   { ...base, background: C.gold,        color: "#07080E", border: "none"                   },
    outline: { ...base, background: "transparent", color: C.goldLt,  border: `1px solid ${C.goldBdr}` },
    ghost:   { ...base, background: C.goldDim,     color: C.goldLt,  border: `1px solid ${C.goldBdr}` },
    muted:   { ...base, background: "transparent", color: C.mid,     border: `1px solid ${C.border}`  },
  }[variant];
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" style={styles}>{children}</a>;
  return <button onClick={onClick} style={styles}>{children}</button>;
}

function Chip({ children, color }) {
  const col = color || C.gold;
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px", borderRadius: 3,
      fontSize: 11, fontFamily: C.mono, fontWeight: 600, letterSpacing: 0.4,
      background: `${col}18`, color: col, border: `1px solid ${col}28`,
    }}>
      {children}
    </span>
  );
}

function Section({ id, children, style: ex = {} }) {
  return <section id={id} style={{ padding: "96px 0", ...ex }}>{children}</section>;
}

function Container({ children, narrow = false }) {
  return (
    <div style={{ maxWidth: narrow ? 800 : 1160, margin: "0 auto", padding: "0 24px" }}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════════ */
function Navbar({ active }) {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(7,8,14,0.93)" : "transparent",
      backdropFilter: scrolled ? "blur(18px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "none",
      transition: "all 0.3s ease",
    }}>
      <div style={{
        maxWidth: 1160, margin: "0 auto", padding: "0 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 66,
      }}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left" }}>
          <div style={{ fontFamily: C.serif, fontSize: 18, fontWeight: 700, color: C.text, lineHeight: 1.1 }}>Brian Motee</div>
          <div style={{ fontFamily: C.mono, fontSize: 9, color: C.gold, letterSpacing: "3px", textTransform: "uppercase" }}>Data Scientist</div>
        </button>

        {/* Desktop */}
        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => scrollTo(n.id)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: C.mono, fontSize: 10, fontWeight: 700,
              letterSpacing: "1px", textTransform: "uppercase",
              color: active === n.id ? C.gold : C.mid,
              padding: "8px 10px", transition: "color 0.2s", borderRadius: 4,
            }}>
              {n.label}
            </button>
          ))}
          <div style={{ marginLeft: 8 }}>
            <Btn onClick={() => scrollTo("booking")} size="sm">Book a Call</Btn>
          </div>
        </div>

        {/* Mobile burger */}
        <button className="show-mobile" onClick={() => setOpen(!open)} style={{
          background: "none", border: `1px solid ${C.border}`, borderRadius: 4,
          padding: "8px 12px", cursor: "pointer", color: C.text, fontSize: 16, display: "none",
        }}>
          {open ? "✕" : "≡"}
        </button>
      </div>

      {open && (
        <div style={{ background: C.surface, borderTop: `1px solid ${C.border}`, padding: "12px 24px 20px" }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => scrollTo(n.id)} style={{
              display: "block", width: "100%", background: "none", border: "none",
              cursor: "pointer", fontFamily: C.mono, fontSize: 11, color: C.dim,
              textAlign: "left", padding: "11px 0", borderBottom: `1px solid ${C.border}`,
              textTransform: "uppercase", letterSpacing: 1,
            }}>
              {n.label}
            </button>
          ))}
          <div style={{ marginTop: 16 }}>
            <Btn onClick={() => scrollTo("booking")} style={{ width: "100%", justifyContent: "center" }}>
              Book a Call
            </Btn>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════ */
function HeroSection() {
  const [tick, setTick] = useState(0);
  const titles = ["Data Scientist", "Research Analyst", "ML Engineer", "GIS Specialist", "BI Architect"];

  useEffect(() => {
    const id = setInterval(() => setTick(t => (t + 1) % titles.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", position: "relative", overflow: "hidden",
      backgroundImage: `
        linear-gradient(rgba(7,8,14,0.97), rgba(7,8,14,0.97)),
        repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(26,32,64,0.35) 59px, rgba(26,32,64,0.35) 60px),
        repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(26,32,64,0.35) 59px, rgba(26,32,64,0.35) 60px)
      `,
    }}>
      {/* Gold orb */}
      <div style={{
        position: "absolute", top: "15%", right: "8%", width: 600, height: 600,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(196,154,60,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <Container>
        <div style={{ paddingTop: 100, paddingBottom: 80 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <span style={{ display: "block", width: 28, height: 2, background: C.gold, borderRadius: 2 }} />
            <span style={{ fontFamily: C.mono, fontSize: 10, color: C.gold, letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700 }}>
              Based in Nairobi, Kenya
            </span>
          </div>

          <h1 style={{
            fontFamily: C.serif, fontWeight: 900,
            fontSize: "clamp(3.2rem, 7vw, 6.5rem)",
            color: C.text, lineHeight: 1.05, marginBottom: 16,
          }}>
            Brian<br />
            <span style={{ color: C.gold }}>Motee.</span>
          </h1>

          {/* Rotating title */}
          <div style={{ height: 40, marginBottom: 28, overflow: "hidden" }}>
            <div style={{
              fontFamily: C.mono, fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
              color: C.mid, letterSpacing: 2, textTransform: "uppercase",
              transform: `translateY(${tick * -40}px)`,
              transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
            }}>
              {titles.map((t, i) => (
                <div key={i} style={{ height: 40, display: "flex", alignItems: "center" }}>
                  <span style={{ color: C.goldLt, marginRight: 10 }}>◈</span> {t}
                </div>
              ))}
            </div>
          </div>

          <p style={{
            fontFamily: C.serif, fontStyle: "italic",
            fontSize: "clamp(1.05rem, 2.5vw, 1.45rem)",
            color: C.dim, maxWidth: 540, lineHeight: 1.6, marginBottom: 40,
          }}>
            "Turning data into decisions. Evidence into action."
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 56 }}>
            <Btn size="lg" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
              View Case Files
            </Btn>
            <Btn size="lg" variant="outline" onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}>
              Book a Session
            </Btn>
            <Btn size="lg" variant="muted" href="https://github.com/motebrian">
              ↗ GitHub
            </Btn>
          </div>

          <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
            {STATS.map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: C.serif, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: C.gold, lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ fontFamily: C.mono, fontSize: 10, color: C.muted, letterSpacing: "1.5px", textTransform: "uppercase", marginTop: 4 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
      }}>
        <span style={{ fontFamily: C.mono, fontSize: 9, color: C.muted, letterSpacing: 2, textTransform: "uppercase" }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, ${C.gold}, transparent)` }} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ABOUT — MEET BRIAN
═══════════════════════════════════════════════════════════════ */
function AboutSection() {
  return (
    <Section id="about" style={{ background: C.surface }}>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}
          className="responsive-grid-2">
          <Reveal>
            <Eyebrow>Meet Brian</Eyebrow>
            <Headline size="lg">The Analyst<br /><em style={{ color: C.gold, fontStyle: "italic" }}>Behind the Numbers</em></Headline>
            <div style={{ width: 48, height: 2, background: C.gold, borderRadius: 2, margin: "24px 0" }} />
            <p style={{ fontFamily: C.sans, fontSize: "1rem", color: C.dim, lineHeight: 1.8, marginBottom: 20 }}>
              I'm a data scientist and research analyst with 5+ years transforming complex, messy datasets into strategic clarity for businesses and NGOs across East Africa.
            </p>
            <p style={{ fontFamily: C.sans, fontSize: "1rem", color: C.dim, lineHeight: 1.8, marginBottom: 20 }}>
              My work spans the full data spectrum — from designing field surveys in SurveyCTO and REDCap, to building predictive ML models, crafting geospatial intelligence maps, and translating findings into executive dashboards that actually get used.
            </p>
            <p style={{ fontFamily: C.sans, fontSize: "1rem", color: C.dim, lineHeight: 1.8, marginBottom: 32 }}>
              I hold a degree in Economics & Sociology from Laikipia University, which means I never lose sight of the human behind every data point.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Btn href="https://github.com/motebrian"                    variant="outline" size="sm">↗ GitHub</Btn>
              <Btn href="https://www.linkedin.com/in/brian-motee/"        variant="outline" size="sm">↗ LinkedIn</Btn>
              <Btn href="https://medium.com/@bmote78"                     variant="outline" size="sm">↗ Medium</Btn>
              <Btn href="https://www.youtube.com/@MotetheAnalyst"         variant="outline" size="sm">↗ YouTube</Btn>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            {/* Profile card */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "28px", marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 20 }}>
                <div style={{
                  width: 72, height: 72, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${C.gold}44, ${C.teal}44)`,
                  border: `2px solid ${C.goldBdr}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: C.serif, fontSize: 26, fontWeight: 700, color: C.gold, flexShrink: 0,
                }}>
                  BM
                </div>
                <div>
                  <div style={{ fontFamily: C.serif, fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 2 }}>Brian Motee</div>
                  <div style={{ fontFamily: C.mono, fontSize: 10, color: C.gold, letterSpacing: 2, textTransform: "uppercase" }}>Data Scientist</div>
                  <div style={{ fontFamily: C.mono, fontSize: 10, color: C.muted, letterSpacing: 1, marginTop: 2 }}>Nairobi, Kenya · +254 708 956 371</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {["Machine Learning", "Geospatial", "R Stats", "Power BI", "PostgreSQL"].map(t => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            </div>

            {/* Philosophy card */}
            <div style={{
              background: `linear-gradient(135deg, ${C.goldDim}, rgba(7,8,14,0))`,
              border: `1px solid ${C.goldBdr}`, borderRadius: 8, padding: "28px", position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: -20, right: -10, fontSize: 100, opacity: 0.03,
                fontFamily: C.serif, fontWeight: 900, color: C.gold, userSelect: "none",
              }}>IA</div>
              <div style={{ fontFamily: C.mono, fontSize: 9, color: C.gold, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 10 }}>
                Personal Philosophy
              </div>
              <div style={{ fontFamily: C.serif, fontSize: "1.3rem", fontWeight: 700, color: C.goldLt, marginBottom: 14 }}>
                Inclusive Altruism
              </div>
              <p style={{ fontFamily: C.sans, fontSize: "0.9rem", color: C.dim, lineHeight: 1.8, marginBottom: 16 }}>
                <strong style={{ color: C.text }}>Inclusive Altruism</strong> is the belief that care and opportunity should not depend on who you are, where you come from, or what you have. It is grounded in a simple idea: <em style={{ color: C.goldLt }}>human dignity is universal, and so should be our willingness to act in support of one another.</em>
              </p>
              <p style={{ fontFamily: C.sans, fontSize: "0.9rem", color: C.dim, lineHeight: 1.8 }}>
                In my work, this philosophy means building bridges across differences, using data to uncover who is being left out, and contributing to solutions that expand access, agency, and opportunity. It is a commitment to act where I can, learn where I must, and always center people in the process.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TOOLKIT
═══════════════════════════════════════════════════════════════ */
function ToolkitSection() {
  return (
    <Section id="toolkit">
      <Container>
        <Reveal>
          <Eyebrow>The Toolkit</Eyebrow>
          <Headline size="lg">Skills &<br /><em style={{ color: C.gold, fontStyle: "italic" }}>Instruments</em></Headline>
          <div style={{ width: 48, height: 2, background: C.gold, borderRadius: 2, margin: "24px 0 48px" }} />
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
          className="responsive-grid-3">
          {SKILLS.map((sk, i) => (
            <Reveal key={sk.label} delay={i * 0.07}>
              <div style={{
                background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "24px",
                transition: "border-color 0.2s, background 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${sk.color}44`; e.currentTarget.style.background = C.cardHov; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.card; }}
              >
                <div style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 36, height: 36, borderRadius: 6,
                  background: `${sk.color}18`, border: `1px solid ${sk.color}28`, marginBottom: 14, color: sk.color,
                }}>
                  ◈
                </div>
                <div style={{ fontFamily: C.mono, fontSize: 11, fontWeight: 700, color: sk.color, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 14 }}>
                  {sk.label}
                </div>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 7 }}>
                  {sk.items.map(item => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: sk.color, flexShrink: 0, opacity: 0.7 }} />
                      <span style={{ fontFamily: C.sans, fontSize: "0.85rem", color: C.dim }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROJECTS — CASE FILES
═══════════════════════════════════════════════════════════════ */
const PROJECT_TABS = [
  { key: "ml",  label: "Machine Learning", color: C.teal  },
  { key: "r",   label: "R Projects",       color: C.gold  },
  { key: "geo", label: "Geo Projects",     color: C.green },
];

function ProjectCard({ project, color }) {
  return (
    <div style={{
      background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "24px",
      display: "flex", flexDirection: "column",
      transition: "border-color 0.2s, box-shadow 0.2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}44`; e.currentTarget.style.boxShadow = `0 4px 32px ${color}0A`; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ marginBottom: 14 }}>
        <span style={{
          fontFamily: C.mono, fontSize: 10, fontWeight: 700, letterSpacing: "1px",
          textTransform: "uppercase", color: color,
          background: `${color}14`, border: `1px solid ${color}2A`, borderRadius: 3, padding: "3px 10px",
        }}>
          {project.metric}
        </span>
      </div>
      <h3 style={{ fontFamily: C.serif, fontSize: "1.1rem", fontWeight: 700, color: C.text, lineHeight: 1.3, marginBottom: 12 }}>
        {project.title}
      </h3>
      <p style={{ fontFamily: C.sans, fontSize: "0.88rem", color: C.dim, lineHeight: 1.7, marginBottom: 18, flexGrow: 1 }}>
        {project.description}
      </p>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        {project.tech.map(t => <Chip key={t} color={color}>{t}</Chip>)}
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Btn href={project.github} variant="ghost" size="sm">↗ View Code</Btn>
        {project.demo
          ? <Btn href={project.demo} variant="solid" size="sm">▶ Live Demo</Btn>
          : (
            <span style={{
              display: "inline-flex", alignItems: "center",
              fontFamily: C.mono, fontSize: 10, color: C.muted,
              padding: "8px 14px", border: `1px dashed ${C.border}`, borderRadius: 4,
            }}>
              Demo Coming Soon
            </span>
          )
        }
      </div>
    </div>
  );
}

function ProjectsSection() {
  const [active, setActive] = useState("ml");
  const tab = PROJECT_TABS.find(t => t.key === active);

  return (
    <Section id="projects" style={{ background: C.surface }}>
      <Container>
        <Reveal>
          <Eyebrow>Case Files</Eyebrow>
          <Headline size="lg">Selected<br /><em style={{ color: C.gold, fontStyle: "italic" }}>Project Work</em></Headline>
          <div style={{ width: 48, height: 2, background: C.gold, borderRadius: 2, margin: "24px 0 40px" }} />
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{
            display: "inline-flex", gap: 4, marginBottom: 40,
            background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: 6,
          }}>
            {PROJECT_TABS.map(t => (
              <button key={t.key} onClick={() => setActive(t.key)} style={{
                background: active === t.key ? `${t.color}18` : "transparent",
                border: active === t.key ? `1px solid ${t.color}30` : "1px solid transparent",
                color: active === t.key ? t.color : C.mid,
                borderRadius: 6, padding: "9px 20px", cursor: "pointer",
                fontFamily: C.mono, fontSize: 11, fontWeight: 700,
                letterSpacing: "1px", textTransform: "uppercase", transition: "all 0.2s",
              }}>
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
          className="responsive-grid-3">
          {PROJECTS[active].map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <ProjectCard project={p} color={tab.color} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div style={{
            marginTop: 48, padding: "28px 32px",
            background: C.goldDim, border: `1px solid ${C.goldBdr}`, borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap",
          }}>
            <div>
              <div style={{ fontFamily: C.serif, fontSize: "1.2rem", fontWeight: 700, color: C.text, marginBottom: 4 }}>
                See All Projects on GitHub
              </div>
              <div style={{ fontFamily: C.sans, fontSize: "0.88rem", color: C.dim }}>
                ML notebooks, R scripts, geospatial analyses, and more.
              </div>
            </div>
            <Btn href="https://github.com/motebrian">↗ github.com/motebrian</Btn>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   RESUME — THE CHRONICLE
═══════════════════════════════════════════════════════════════ */
function JourneySection() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <Section id="journey">
      <Container>
        <Reveal>
          <Eyebrow>The Chronicle</Eyebrow>
          <Headline size="lg">Career &<br /><em style={{ color: C.gold, fontStyle: "italic" }}>Education</em></Headline>
          <div style={{ width: 48, height: 2, background: C.gold, borderRadius: 2, margin: "24px 0 48px" }} />
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 48, alignItems: "start" }}
          className="responsive-grid-2">
          {/* Experience timeline */}
          <div>
            <div style={{ fontFamily: C.mono, fontSize: 10, color: C.gold, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 28 }}>
              Work Experience
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {EXPERIENCE.map((exp, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div style={{
                    borderLeft: `2px solid ${i === openIdx ? exp.typeColor : C.border}`,
                    paddingLeft: 24, paddingBottom: i < EXPERIENCE.length - 1 ? 32 : 0,
                    position: "relative", cursor: "pointer", transition: "all 0.2s",
                  }}
                    onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                  >
                    <div style={{
                      position: "absolute", left: -7, top: 5, width: 12, height: 12, borderRadius: "50%",
                      background: i === openIdx ? exp.typeColor : C.surface,
                      border: `2px solid ${i === openIdx ? exp.typeColor : C.border}`,
                      transition: "all 0.2s",
                    }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, flexWrap: "wrap" }}>
                      <div>
                        <div style={{ fontFamily: C.serif, fontSize: "1.05rem", fontWeight: 700, color: C.text, marginBottom: 4 }}>{exp.role}</div>
                        <div style={{ fontFamily: C.sans, fontSize: "0.85rem", color: C.gold, marginBottom: 4 }}>{exp.org}</div>
                        <div style={{ fontFamily: C.mono, fontSize: 10, color: C.muted, letterSpacing: 1 }}>{exp.period}</div>
                      </div>
                      <Chip color={exp.typeColor}>{exp.type}</Chip>
                    </div>
                    {openIdx === i && (
                      <ul style={{ marginTop: 14, listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                        {exp.highlights.map((h, j) => (
                          <li key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                            <span style={{ color: exp.typeColor, fontFamily: C.mono, fontSize: 12, flexShrink: 0, marginTop: 2 }}>›</span>
                            <span style={{ fontFamily: C.sans, fontSize: "0.86rem", color: C.dim, lineHeight: 1.6 }}>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Education + Certs */}
          <div>
            <Reveal>
              <div style={{ fontFamily: C.mono, fontSize: 10, color: C.gold, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 20 }}>
                Education
              </div>
              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "22px", marginBottom: 32 }}>
                <div style={{ fontFamily: C.serif, fontSize: "1rem", fontWeight: 700, color: C.text, marginBottom: 6 }}>{EDUCATION.degree}</div>
                <div style={{ fontFamily: C.sans, fontSize: "0.88rem", color: C.gold, marginBottom: 4 }}>{EDUCATION.institution}</div>
                <div style={{ fontFamily: C.mono, fontSize: 10, color: C.muted, letterSpacing: 1 }}>{EDUCATION.period} · {EDUCATION.location}</div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div style={{ fontFamily: C.mono, fontSize: 10, color: C.gold, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>
                Certifications
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {CERTS.map((c, i) => (
                  <div key={i} style={{
                    background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: "13px 16px",
                    display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12,
                  }}>
                    <div>
                      <div style={{ fontFamily: C.sans, fontSize: "0.83rem", color: C.text, marginBottom: 3, lineHeight: 1.4 }}>{c.name}</div>
                      <div style={{ fontFamily: C.mono, fontSize: 9, color: C.muted, letterSpacing: 1 }}>{c.issuer}</div>
                    </div>
                    <span style={{ fontFamily: C.mono, fontSize: 10, color: C.gold, fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0 }}>{c.year}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ARTICLES — THE FEED
═══════════════════════════════════════════════════════════════ */
function ArticlesSection() {
  return (
    <Section id="articles" style={{ background: C.surface }}>
      <Container>
        <Reveal>
          <Eyebrow>The Feed</Eyebrow>
          <Headline size="lg">Insights &<br /><em style={{ color: C.gold, fontStyle: "italic" }}>Published Work</em></Headline>
          <div style={{ width: 48, height: 2, background: C.gold, borderRadius: 2, margin: "24px 0 16px" }} />
          <p style={{ fontFamily: C.sans, fontSize: "1rem", color: C.dim, maxWidth: 560, lineHeight: 1.7, marginBottom: 48 }}>
            Long-form data science articles, methodology breakdowns, and analytical perspectives — published on Medium.
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginBottom: 40 }}
          className="responsive-grid-2">
          {MEDIUM_TOPICS.map((a, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <a href="https://medium.com/@bmote78" target="_blank" rel="noopener noreferrer"
                style={{
                  display: "block", textDecoration: "none",
                  background: C.card, border: `1px solid ${C.border}`,
                  borderRadius: 8, padding: "24px",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldBdr; e.currentTarget.style.background = C.cardHov; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.card; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <Chip>{a.tag}</Chip>
                  <span style={{ fontFamily: C.mono, fontSize: 10, color: C.muted }}>{a.read} read</span>
                </div>
                <h3 style={{ fontFamily: C.serif, fontSize: "1.05rem", fontWeight: 700, color: C.text, lineHeight: 1.45, marginBottom: 16 }}>
                  {a.title}
                </h3>
                <div style={{ fontFamily: C.mono, fontSize: 10, color: C.gold, letterSpacing: 1, textTransform: "uppercase" }}>
                  Read on Medium →
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div style={{ textAlign: "center" }}>
            <Btn href="https://medium.com/@bmote78" size="lg">↗ All Articles on Medium</Btn>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   YOUTUBE — THE CHANNEL
═══════════════════════════════════════════════════════════════ */
function ChannelSection() {
  const topics = [
    { title: "Data Science Walkthroughs",  desc: "Step-by-step ML model builds, from data cleaning to deployment." },
    { title: "R & Python Tutorials",       desc: "Practical statistical analysis techniques for real-world datasets." },
    { title: "Geospatial Analysis Demos",  desc: "Mapping, spatial analytics, and GIS workflows made accessible." },
    { title: "BI Dashboard Design",        desc: "Power BI and Tableau build-alongs for data professionals." },
  ];

  return (
    <Section id="channel">
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}
          className="responsive-grid-2">
          <Reveal>
            <Eyebrow>The Channel</Eyebrow>
            <Headline size="lg">Watch Me<br /><em style={{ color: C.gold, fontStyle: "italic" }}>Work</em></Headline>
            <div style={{ width: 48, height: 2, background: C.gold, borderRadius: 2, margin: "24px 0 20px" }} />
            <p style={{ fontFamily: C.sans, fontSize: "1rem", color: C.dim, lineHeight: 1.75, marginBottom: 28 }}>
              I bring the analytical process to life on YouTube — from raw CSV to production-ready insights. Tutorials, case studies, and methodology breakdowns for data professionals at every level.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Btn href="https://www.youtube.com/@MotetheAnalyst" size="lg">↗ Visit the Channel</Btn>
              <Btn href="https://www.youtube.com/@MotetheAnalyst" variant="outline">Subscribe</Btn>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
              <div style={{
                height: 100,
                background: `linear-gradient(135deg, #0D0F1E 0%, #1A0A30 50%, #0A1A20 100%)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                borderBottom: `1px solid ${C.border}`,
              }}>
                <span style={{
                  fontFamily: C.serif, fontSize: "2rem", fontWeight: 900,
                  background: `linear-gradient(135deg, ${C.gold}, ${C.teal})`,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  Mote The Analyst
                </span>
              </div>
              <div style={{ padding: "20px 20px 16px" }}>
                <div style={{ fontFamily: C.mono, fontSize: 9, color: C.muted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>
                  Content You'll Find
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {topics.map((t, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ color: C.gold, fontFamily: C.mono, fontSize: 11, flexShrink: 0, marginTop: 2 }}>▶</span>
                      <div>
                        <div style={{ fontFamily: C.sans, fontSize: "0.85rem", fontWeight: 600, color: C.text, marginBottom: 2 }}>{t.title}</div>
                        <div style={{ fontFamily: C.sans, fontSize: "0.8rem", color: C.muted }}>{t.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SERVICES — THE OFFER
═══════════════════════════════════════════════════════════════ */
function ServicesSection() {
  return (
    <Section id="services" style={{ background: C.surface }}>
      <Container>
        <Reveal>
          <Eyebrow>The Offer</Eyebrow>
          <Headline size="lg">How I<br /><em style={{ color: C.gold, fontStyle: "italic" }}>Help</em></Headline>
          <div style={{ width: 48, height: 2, background: C.gold, borderRadius: 2, margin: "24px 0 16px" }} />
          <p style={{ fontFamily: C.sans, fontSize: "1rem", color: C.dim, maxWidth: 560, lineHeight: 1.7, marginBottom: 48 }}>
            Freelance data science services tailored for businesses and NGOs solving problems that matter — in East Africa and beyond.
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
          className="responsive-grid-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div style={{
                background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "26px",
                transition: "border-color 0.2s, box-shadow 0.2s",
                height: "100%", display: "flex", flexDirection: "column",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${s.color}44`; e.currentTarget.style.boxShadow = `0 4px 30px ${s.color}08`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 8,
                  background: `${s.color}14`, border: `1px solid ${s.color}28`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, marginBottom: 16, color: s.color,
                }}>
                  ◈
                </div>
                <div style={{ fontFamily: C.serif, fontSize: "1.1rem", fontWeight: 700, color: C.text, marginBottom: 6 }}>{s.title}</div>
                <div style={{ fontFamily: C.mono, fontSize: 10, color: s.color, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 14 }}>{s.tagline}</div>
                <p style={{ fontFamily: C.sans, fontSize: "0.86rem", color: C.dim, lineHeight: 1.7, marginBottom: 16, flexGrow: 1 }}>{s.desc}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px", display: "flex", flexDirection: "column", gap: 6 }}>
                  {s.items.map(item => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: s.color, flexShrink: 0, opacity: 0.8 }} />
                      <span style={{ fontFamily: C.sans, fontSize: "0.82rem", color: C.dim }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <Chip color={s.color}>{s.for}</Chip>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div style={{
            marginTop: 48, textAlign: "center", padding: "40px 32px",
            background: `linear-gradient(135deg, ${C.goldDim}, rgba(12,14,28,0))`,
            border: `1px solid ${C.goldBdr}`, borderRadius: 12,
          }}>
            <Headline size="md" style={{ marginBottom: 12 }}>Have a specific problem in mind?</Headline>
            <p style={{ fontFamily: C.sans, fontSize: "1rem", color: C.dim, maxWidth: 480, margin: "0 auto 28px", lineHeight: 1.7 }}>
              Every engagement starts with a conversation. Book a free discovery call and let's figure out if we're a fit.
            </p>
            <Btn size="lg" onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}>
              Book a Discovery Call
            </Btn>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BOOKING — LET'S TALK
═══════════════════════════════════════════════════════════════ */
function BookingSection() {
  const openCalendly = () => {
    if (typeof window !== "undefined" && window.Calendly) {
      window.Calendly.initPopupWidget({ url: "https://calendly.com/motebrian926/30min?back=1&month=2026-04" });
    } else {
      window.open("https://calendly.com/motebrian926//30min?back=1&month=2026-04", "_blank");
    }
  };

  const channels = [
    { icon: "✉",  label: "Email",    value: "motebrian926@gmail.com",           href: "mailto:motebrian926@gmail.com"                  },
    { icon: "in", label: "LinkedIn", value: "linkedin.com/in/brian-motee",      href: "https://www.linkedin.com/in/brian-motee/"        },
    { icon: "gh", label: "GitHub",   value: "github.com/motebrian",             href: "https://github.com/motebrian"                   },
    { icon: "yt", label: "YouTube",  value: "youtube.com/@MotetheAnalyst",      href: "https://www.youtube.com/@MotetheAnalyst"         },
  ];

  return (
    <Section id="booking" style={{ background: `linear-gradient(180deg, ${C.bg} 0%, #0C0A18 100%)` }}>
      <Container narrow>
        <Reveal>
          <div style={{ textAlign: "center" }}>
            <Eyebrow>Let's Talk</Eyebrow>
            <Headline size="xl" style={{ textAlign: "center", marginBottom: 20 }}>
              Ready to Turn<br />
              <em style={{ color: C.gold, fontStyle: "italic" }}>Data Into Impact?</em>
            </Headline>
            <p style={{ fontFamily: C.sans, fontSize: "1.05rem", color: C.dim, maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.75 }}>
              Whether you have a project in mind, want to discuss a challenge, or just want to connect — my calendar is open. Pick a time that works for you.
            </p>

            {/* Calendly CTA */}
            <div style={{
              background: C.card, border: `1px solid ${C.goldBdr}`, borderRadius: 12, padding: "40px 32px",
              marginBottom: 40, boxShadow: `0 0 80px ${C.goldGlow}`,
            }}>
              <div style={{ fontFamily: C.mono, fontSize: 11, color: C.gold, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
                ◈ Book a 30-min Discovery Call
              </div>
              <div style={{ fontFamily: C.serif, fontSize: "1.4rem", fontWeight: 700, color: C.text, marginBottom: 12 }}>
                Schedule Directly on My Calendar
              </div>
              <p style={{ fontFamily: C.sans, fontSize: "0.9rem", color: C.dim, marginBottom: 28, lineHeight: 1.6 }}>
                Free 30-minute session — we'll explore your data challenge, discuss how I can help, and outline a clear plan of action.
              </p>
              <button onClick={openCalendly}
                style={{
                  background: C.gold, color: "#07080E",
                  border: "none", borderRadius: 4, cursor: "pointer",
                  fontFamily: C.mono, fontSize: 13, fontWeight: 700,
                  letterSpacing: "1.5px", textTransform: "uppercase",
                  padding: "16px 40px", transition: "background 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = C.goldLt}
                onMouseLeave={e => e.currentTarget.style.background = C.gold}
              >
                Open My Calendar →
              </button>
            </div>

            <div style={{ fontFamily: C.mono, fontSize: 10, color: C.muted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>
              Or Reach Out Directly
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
              className="responsive-grid-2">
              {channels.map(ch => (
                <a key={ch.label} href={ch.href}
                  target={ch.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    background: C.card, border: `1px solid ${C.border}`,
                    borderRadius: 8, padding: "14px 18px", textDecoration: "none",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = C.goldBdr}
                  onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
                >
                  <div style={{
                    width: 34, height: 34, borderRadius: 6,
                    background: C.goldDim, border: `1px solid ${C.goldBdr}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: C.mono, fontSize: 10, fontWeight: 700, color: C.gold, flexShrink: 0,
                  }}>
                    {ch.icon}
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontFamily: C.mono, fontSize: 9, color: C.muted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>{ch.label}</div>
                    <div style={{ fontFamily: C.sans, fontSize: "0.82rem", color: C.dim }}>{ch.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════ */
function Footer() {
  const links = [
    { label: "GitHub",   href: "https://github.com/motebrian"                  },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/brian-motee/"       },
    { label: "Medium",   href: "https://medium.com/@bmote78"                    },
    { label: "YouTube",  href: "https://www.youtube.com/@MotetheAnalyst"        },
  ];
  return (
    <footer style={{ background: C.surface, borderTop: `1px solid ${C.border}`, padding: "40px 0" }}>
      <Container>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontFamily: C.serif, fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 3 }}>Brian Motee</div>
            <div style={{ fontFamily: C.mono, fontSize: 9, color: C.gold, letterSpacing: "2px", textTransform: "uppercase" }}>
              Data Scientist · Nairobi, Kenya
            </div>
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {links.map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: C.mono, fontSize: 10, color: C.muted, textDecoration: "none", letterSpacing: 1, textTransform: "uppercase", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = C.gold}
                onMouseLeave={e => e.currentTarget.style.color = C.muted}
              >
                {l.label}
              </a>
            ))}
          </div>
          <div style={{ fontFamily: C.mono, fontSize: 9, color: C.muted, letterSpacing: 1 }}>
            © {new Date().getFullYear()} Brian Motee. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL SPY
═══════════════════════════════════════════════════════════════ */
function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return active;
}

/* ═══════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════ */
export default function Portfolio() {
  const active = useScrollSpy(NAV.map(n => n.id));

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: "100vh" }}>
      <style>{`
        @media (max-width: 900px) {
          .responsive-grid-3 { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .responsive-grid-3 { grid-template-columns: 1fr !important; }
          .responsive-grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Navbar active={active} />
      <HeroSection />
      <AboutSection />
      <ToolkitSection />
      <ProjectsSection />
      <JourneySection />
      <ArticlesSection />
      <ChannelSection />
      <ServicesSection />
      <BookingSection />
      <Footer />
    </div>
  );
}
