import { useState } from "react";

// ─── Image paths (files live in /public/images/) ────────────────────────────
const HUB_LOGO  = "/images/hub-logo.png";
const ICON_VENT = "/images/icon-vent.png";
const ICON_HEMO = "/images/icon-hemo.png";
const ICON_ABG  = "/images/icon-abg.png";
const ICON_DIAL = "/images/icon-dial.png";

// ─── Translations ────────────────────────────────────────────────────────────
const T = {
  pt: {
    langPrompt: "Selecione o idioma",
    consentTitle: "Aviso de Utilização",
    consentP1: "Estas ferramentas destinam-se a ",
    consentBold: "apoio à decisão clínica",
    consentP2: " e uso educacional por profissionais de saúde. Não substituem o julgamento clínico, as normas institucionais nem a avaliação individualizada do doente.",
    consentP3: "O autor não assume responsabilidade por decisões clínicas tomadas com base nestes recursos. O uso é da inteira responsabilidade do profissional de saúde.",
    consentBtn: "Compreendo e aceito",
    backBtn: "← Voltar",
    eyebrow: "Apoio à Decisão Clínica",
    tagline: "Ferramentas para cuidados intensivos",
    sectionLabel: "Selecione uma aplicação",
    openApp: "Abrir aplicação →",
    apps: {
      vent: { sub: "Decisão Ventilatória", desc: "Prescrição e ajuste de ventilação mecânica invasiva. Modos ventilatórios Servo-i, estratégias protetoras no ARDS, desmame e mecânica respiratória.", tags: ["VMI","ARDS","Desmame"] },
      hemo: { sub: "Avaliação Hemodinâmica", desc: "Algoritmos de Vallet, Pinsky e Cecconi para caracterização do choque. Integração com PiCCO, pressões de enchimento e parâmetros dinâmicos.", tags: ["Choque","PiCCO","Sépsis"] },
      abg:  { sub: "Gasimetria Arterial",   desc: "Interpretação sistemática ácido-base com compensações esperadas, distúrbios mistos e correlação clínica.", tags: ["ABG","Ácido-base","Gasimetria"] },
      dial: { sub: "Substituição Renal",    desc: "Prescrição de CVVHDF, CVVH, CVVHD, SLED e IHD. Anticoagulação com citrato (RICH 2020). Triagem emergente por indicação.", tags: ["TSFR","Citrato","KDIGO"] },
    },
  },
  en: {
    langPrompt: "Select your language",
    consentTitle: "Usage Disclaimer",
    consentP1: "These tools are designed for ",
    consentBold: "clinical decision support",
    consentP2: " and educational use by healthcare professionals. They do not replace clinical judgment, institutional guidelines, or individualised patient assessment.",
    consentP3: "The author assumes no responsibility for clinical decisions made using these resources. Use is entirely at the healthcare professional's own discretion.",
    consentBtn: "I understand and accept",
    backBtn: "← Back",
    eyebrow: "Clinical Decision Support",
    tagline: "Tools for intensive care medicine",
    sectionLabel: "Select an application",
    openApp: "Open application →",
    apps: {
      vent: { sub: "Ventilatory Decision",    desc: "Invasive mechanical ventilation prescription and adjustment. Servo-i modes, ARDS protective strategies, weaning and respiratory mechanics.", tags: ["IMV","ARDS","Weaning"] },
      hemo: { sub: "Haemodynamic Assessment", desc: "Vallet, Pinsky and Cecconi shock characterisation algorithms. Integration with PiCCO, filling pressures and dynamic parameters.", tags: ["Shock","PiCCO","Sepsis"] },
      abg:  { sub: "Arterial Blood Gas",      desc: "Systematic acid-base interpretation with expected compensations, mixed disorders and clinical correlation.", tags: ["ABG","Acid-base","Blood gas"] },
      dial: { sub: "Renal Replacement",       desc: "CVVHDF, CVVH, CVVHD, SLED and IHD prescription. Citrate anticoagulation (RICH 2020). Emergent triage by indication.", tags: ["RRT","Citrate","KDIGO"] },
    },
  },
  es: {
    langPrompt: "Seleccione el idioma",
    consentTitle: "Aviso de Uso",
    consentP1: "Estas herramientas están diseñadas para el ",
    consentBold: "apoyo a la decisión clínica",
    consentP2: " y uso educativo por profesionales sanitarios. No sustituyen al juicio clínico, las normas institucionales ni la evaluación individualizada del paciente.",
    consentP3: "El autor no asume responsabilidad por decisiones clínicas tomadas con estos recursos. Su uso es responsabilidad exclusiva del profesional sanitario.",
    consentBtn: "Entiendo y acepto",
    backBtn: "← Volver",
    eyebrow: "Apoyo a la Decisión Clínica",
    tagline: "Herramientas para cuidados intensivos",
    sectionLabel: "Seleccione una aplicación",
    openApp: "Abrir aplicación →",
    apps: {
      vent: { sub: "Decisión Ventilatoria",   desc: "Prescripción y ajuste de ventilación mecánica invasiva. Modos Servo-i, estrategias protectoras en SDRA, destete y mecánica respiratoria.", tags: ["VMI","SDRA","Destete"] },
      hemo: { sub: "Evaluación Hemodinámica", desc: "Algoritmos de Vallet, Pinsky y Cecconi para caracterización del shock. Integración con PiCCO, presiones de llenado y parámetros dinámicos.", tags: ["Shock","PiCCO","Sepsis"] },
      abg:  { sub: "Gasometría Arterial",     desc: "Interpretación ácido-base sistemática con compensaciones esperadas, trastornos mixtos y correlación clínica.", tags: ["ABG","Ácido-base","Gasometría"] },
      dial: { sub: "Sustitución Renal",       desc: "Prescripción de CVVHDF, CVVH, CVVHD, SLED e IHD. Anticoagulación con citrato (RICH 2020). Triaje emergente por indicación.", tags: ["TSR","Citrato","KDIGO"] },
    },
  },
};

// ─── App definitions ─────────────────────────────────────────────────────────
const APPS = [
  { key:"vent", name:"VentRx",     url:"https://ventrx.vercel.app",     icon:ICON_VENT, accent:"#39C6D6", accentDark:"#0B3C49", accentBg:"#EBF8FA", accentBorder:"#A5E8F0" },
  { key:"hemo", name:"HemoAssess", url:"https://hemoassess.vercel.app", icon:ICON_HEMO, accent:"#155E75", accentDark:"#0B3C49", accentBg:"#E0F2F1", accentBorder:"#8ECFCA" },
  { key:"abg",  name:"ABGRx",      url:"https://abgrx.vercel.app",      icon:ICON_ABG,  accent:"#175CD3", accentDark:"#0C3A80", accentBg:"#EFF8FF", accentBorder:"#A3C7F8" },
  { key:"dial", name:"DialysisRx", url:"https://dialysisrx.vercel.app", icon:ICON_DIAL, accent:"#7C3AED", accentDark:"#4C1D8F", accentBg:"#F3F0FF", accentBorder:"#C4B5FD" },
];

// ─── Colour tokens ────────────────────────────────────────────────────────────
const C = {
  bg:        "#F3F5F7",
  surface:   "#FFFFFF",
  border:    "#D9E2EC",
  borderMd:  "#BCCCDC",
  dark:      "#102A43",
  mid:       "#486581",
  muted:     "#829AB1",
  teal:      "#155E75",
  tealLight: "#E0F2F1",
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconLinkedIn = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const IconORCID = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 01-.947-.947c0-.516.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.435h2.297c3.272 0 3.972-2.466 3.972-3.722 0-2.016-1.284-3.713-3.972-3.713h-2.297z"/>
  </svg>
);
const IconGitHub = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

// ─── Share labels per language ────────────────────────────────────────────────
const SHARE = {
  pt: { btn:"Partilhar", title:"ICU Tools Hub", text:"Ferramentas clínicas para cuidados intensivos — VentRx, HemoAssess, ABGRx, DialysisRx", copied:"Link copiado!" },
  en: { btn:"Share",     title:"ICU Tools Hub", text:"Clinical decision support tools for intensive care — VentRx, HemoAssess, ABGRx, DialysisRx", copied:"Link copied!" },
  es: { btn:"Compartir", title:"ICU Tools Hub", text:"Herramientas de apoyo clínico para cuidados intensivos — VentRx, HemoAssess, ABGRx, DialysisRx", copied:"¡Enlace copiado!" },
};

const SHARE_URL = "https://icutoolshub.vercel.app";

// ─── Share button component ───────────────────────────────────────────────────
function ShareButton({ lang }) {
  const [feedback, setFeedback] = useState(false);
  const s = SHARE[lang] || SHARE.en;

  const handleShare = async () => {
    // Web Share API — native sheet on mobile
    if (navigator.share) {
      try {
        await navigator.share({ title: s.title, text: s.text, url: SHARE_URL });
        return;
      } catch {
        // user cancelled — do nothing
        return;
      }
    }
    // Fallback — copy to clipboard
    try {
      await navigator.clipboard.writeText(SHARE_URL);
    } catch {
      // last resort for old browsers
      const el = document.createElement("textarea");
      el.value = SHARE_URL;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setFeedback(true);
    setTimeout(() => setFeedback(false), 2000);
  };

  return (
    <button
      onClick={handleShare}
      title={s.btn}
      style={{
        display:"flex", alignItems:"center", gap:6,
        padding:"5px 12px",
        borderRadius:8,
        border:`1px solid ${feedback ? C.teal : C.border}`,
        background: feedback ? C.tealLight : "transparent",
        color: feedback ? C.teal : C.muted,
        fontSize:"0.72rem", fontWeight:700,
        cursor:"pointer",
        transition:"all 0.2s",
        whiteSpace:"nowrap",
      }}
      onMouseEnter={e => { if (!feedback) { e.currentTarget.style.borderColor=C.teal; e.currentTarget.style.color=C.teal; e.currentTarget.style.background=C.tealLight; }}}
      onMouseLeave={e => { if (!feedback) { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.muted; e.currentTarget.style.background="transparent"; }}}
    >
      {feedback ? (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          {s.copied}
        </>
      ) : (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
          {s.btn}
        </>
      )}
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ICUToolsHub() {
  const [screen, setScreen]   = useState("lang");
  const [lang, setLang]       = useState(null);
  const [hovered, setHovered] = useState(null);

  const t = T[lang] || T.pt;

  // ── Language screen ──────────────────────────────────────────────────────
  if (screen === "lang") return (
    <div style={{ minHeight:"100vh", background:C.bg, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"2rem", fontFamily:"system-ui,-apple-system,sans-serif" }}>
      <img
        src={HUB_LOGO}
        alt="ICU Tools Hub"
        style={{ width:160, height:160, objectFit:"contain", marginBottom:"1.5rem", borderRadius:24 }}
        onError={e => { e.target.style.display="none"; }}
      />
      <h1 style={{ fontSize:"2.2rem", fontWeight:800, color:C.dark, letterSpacing:"-0.03em", margin:"0 0 0.3rem" }}>ICU Tools Hub</h1>
      <p style={{ fontSize:"0.85rem", color:C.muted, marginBottom:"2.5rem", letterSpacing:"0.06em", textTransform:"uppercase", margin:"0 0 2.5rem" }}>Clinical Decision Support</p>
      <p style={{ fontSize:"0.85rem", color:C.mid, marginBottom:"1.2rem" }}>{t.langPrompt}</p>
      <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap", justifyContent:"center" }}>
        {[["pt","🇵🇹 Português"],["en","🇬🇧 English"],["es","🇪🇸 Español"]].map(([code, label]) => (
          <button key={code}
            onClick={() => { setLang(code); setScreen("consent"); }}
            style={{ padding:"0.85rem 2.2rem", background:C.surface, border:`1.5px solid ${C.border}`, borderRadius:12, fontSize:"1rem", fontWeight:600, color:C.dark, cursor:"pointer", transition:"all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=C.teal; e.currentTarget.style.background=C.tealLight; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.background=C.surface; }}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );

  // ── Consent screen ───────────────────────────────────────────────────────
  if (screen === "consent") return (
    <div style={{ minHeight:"100vh", background:C.bg, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"1.5rem", fontFamily:"system-ui,-apple-system,sans-serif" }}>
      <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:"2.5rem", maxWidth:480, width:"100%", boxShadow:"0 4px 24px rgba(16,42,67,0.08)" }}>
        <div style={{ width:48, height:48, borderRadius:12, background:C.tealLight, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"1.2rem" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="2" strokeLinecap="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <h2 style={{ fontSize:"1.35rem", fontWeight:800, color:C.dark, marginBottom:"1rem" }}>{t.consentTitle}</h2>
        <p style={{ fontSize:"0.875rem", color:C.mid, lineHeight:1.75, marginBottom:"0.85rem" }}>
          {t.consentP1}<strong style={{ color:C.dark }}>{t.consentBold}</strong>{t.consentP2}
        </p>
        <p style={{ fontSize:"0.875rem", color:C.mid, lineHeight:1.75, marginBottom:"2rem" }}>{t.consentP3}</p>
        <button onClick={() => setScreen("main")}
          style={{ width:"100%", padding:"0.9rem", background:C.teal, color:"#fff", border:"none", borderRadius:10, fontSize:"1rem", fontWeight:700, cursor:"pointer", marginBottom:"0.75rem" }}>
          {t.consentBtn}
        </button>
        <button onClick={() => setScreen("lang")}
          style={{ width:"100%", padding:"0.65rem", background:"transparent", color:C.muted, border:`1px solid ${C.border}`, borderRadius:10, fontSize:"0.875rem", fontWeight:500, cursor:"pointer" }}>
          {t.backBtn}
        </button>
      </div>
    </div>
  );

  // ── Main hub ─────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"system-ui,-apple-system,sans-serif", display:"flex", flexDirection:"column" }}>

      {/* Header */}
      <header style={{ background:C.surface, borderBottom:`1px solid ${C.border}`, padding:"1rem 1.25rem" }}>
        {/* Row 1 — logo + title */}
        <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"0.75rem" }}>
          <img src={HUB_LOGO} alt="ICU Tools Hub"
            style={{ width:44, height:44, objectFit:"contain", borderRadius:10, flexShrink:0 }}
            onError={e => { e.target.style.display="none"; }}
          />
          <div style={{ minWidth:0 }}>
            <div style={{ fontSize:"0.6rem", color:C.muted, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"0.1rem", whiteSpace:"nowrap" }}>{t.eyebrow}</div>
            <h1 style={{ fontSize:"1.3rem", fontWeight:800, color:C.dark, letterSpacing:"-0.025em", margin:0, whiteSpace:"nowrap" }}>ICU Tools Hub</h1>
            <div style={{ fontSize:"0.72rem", color:C.muted, marginTop:"0.1rem", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{t.tagline}</div>
          </div>
        </div>
        {/* Row 2 — language switcher + share */}
        <div style={{ display:"flex", alignItems:"center", gap:"0.35rem", flexWrap:"nowrap" }}>
          {["pt","en","es"].map(code => (
            <button key={code} onClick={() => setLang(code)}
              style={{ padding:"5px 10px", borderRadius:8, border:`1px solid ${lang===code ? C.teal : C.border}`, background: lang===code ? C.tealLight : "transparent", color: lang===code ? C.teal : C.muted, fontSize:"0.72rem", fontWeight:700, cursor:"pointer", textTransform:"uppercase", flexShrink:0 }}>
              {code}
            </button>
          ))}
          <div style={{ width:1, height:18, background:C.border, margin:"0 2px", flexShrink:0 }}/>
          <ShareButton lang={lang} />
        </div>
      </header>

      {/* Cards */}
      <main style={{ flex:1, padding:"2rem", maxWidth:980, margin:"0 auto", width:"100%" }}>
        <p style={{ fontSize:"0.72rem", color:C.muted, letterSpacing:"0.22em", textTransform:"uppercase", marginBottom:"1.5rem" }}>{t.sectionLabel}</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(340px, 1fr))", gap:"1rem" }}>
          {APPS.map(app => {
            const at  = t.apps[app.key];
            const isH = hovered === app.key;
            return (
              <a key={app.key} href={app.url} target="_blank" rel="noreferrer"
                style={{ textDecoration:"none", display:"block" }}
                onMouseEnter={() => setHovered(app.key)}
                onMouseLeave={() => setHovered(null)}>
                <div style={{
                  background:   isH ? app.accentBg : C.surface,
                  border:       `1.5px solid ${isH ? app.accentBorder : C.border}`,
                  borderLeft:   `5px solid ${isH ? app.accent : C.borderMd}`,
                  borderRadius: 16,
                  padding:      "1.75rem 1.75rem 1.5rem",
                  transition:   "all 0.18s ease",
                  transform:    isH ? "translateY(-3px)" : "none",
                  boxShadow:    isH ? `0 8px 32px ${app.accent}28` : "0 1px 4px rgba(16,42,67,0.05)",
                  cursor:       "pointer",
                }}>
                  {/* Icon + name row */}
                  <div style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"1rem" }}>
                    <div style={{ width:56, height:56, flexShrink:0, transition:"transform 0.2s", transform: isH ? "scale(1.1)" : "scale(1)" }}>
                      <img src={app.icon} alt={app.name}
                        style={{ width:"100%", height:"100%", objectFit:"contain", borderRadius:10 }}
                        onError={e => { e.target.style.display="none"; }}
                      />
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:"1.55rem", fontWeight:800, color: isH ? app.accentDark : C.dark, letterSpacing:"-0.025em", lineHeight:1.1 }}>{app.name}</div>
                      <div style={{ fontSize:"0.82rem", color: isH ? app.accent : C.muted, fontWeight:600, marginTop:"0.2rem" }}>{at.sub}</div>
                    </div>
                    <div style={{ width:34, height:34, borderRadius:"50%", background: isH ? app.accent : C.border, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.18s" }}>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path d="M3 7.5h9M8 3l4.5 4.5L8 12" stroke={isH ? "#fff" : C.mid} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  {/* Description */}
                  <p style={{ fontSize:"0.875rem", color:C.mid, lineHeight:1.65, margin:"0 0 1rem" }}>{at.desc}</p>
                  {/* Tags */}
                  <div style={{ display:"flex", gap:"0.4rem", flexWrap:"wrap", marginBottom:"1rem" }}>
                    {at.tags.map(tag => (
                      <span key={tag} style={{ fontSize:"0.7rem", fontWeight:600, padding:"3px 10px", borderRadius:20, background: isH ? app.accent+"18" : "#F0F4F8", color: isH ? app.accentDark : C.mid, border:`1px solid ${isH ? app.accentBorder : C.border}` }}>{tag}</span>
                    ))}
                  </div>
                  {/* CTA */}
                  <div style={{ fontSize:"0.82rem", fontWeight:700, color: isH ? app.accent : C.muted, transition:"color 0.15s" }}>
                    {t.openApp}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ background:C.surface, borderTop:`1px solid ${C.border}`, padding:"1.2rem 2rem", display:"flex", alignItems:"center", justifyContent:"center", gap:"0.75rem", flexWrap:"wrap" }}>
        <span style={{ fontSize:"0.82rem", color:C.mid, fontWeight:600 }}>João Frutuoso</span>
        <span style={{ color:C.border, fontSize:"1.2rem" }}>·</span>
        {[
          { href:"https://www.linkedin.com/in/jo%C3%A3o-frutuoso-a505b32/", label:"LinkedIn",  Icon:IconLinkedIn },
          { href:"https://orcid.org/0000-0002-1536-6676",                   label:"ORCID",     Icon:IconORCID },
          { href:"https://github.com/JoFrutas",                              label:"GitHub",    Icon:IconGitHub },
        ].map(({href, label, Icon}) => (
          <a key={label} href={href} target="_blank" rel="noreferrer"
            style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 13px", border:`1px solid ${C.border}`, borderRadius:8, color:C.mid, textDecoration:"none", fontSize:"0.82rem", fontWeight:500, transition:"all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=C.teal; e.currentTarget.style.color=C.teal; e.currentTarget.style.background=C.tealLight; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.mid; e.currentTarget.style.background="transparent"; }}>
            <Icon/>{label}
          </a>
        ))}
      </footer>
    </div>
  );
}
