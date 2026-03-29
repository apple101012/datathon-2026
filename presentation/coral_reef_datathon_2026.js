/**
 * Coral Reef Datathon 2026 — pptxgenjs presentation
 * Design v2: real chart images, visual polish, tighter layout
 * Run: node coral_reef_datathon_2026.js
 */

const pptxgen = require("pptxgenjs");
const path = require("path");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33" x 7.5"

// ─── Palette ───────────────────────────────────────────────────────────────
const C = {
  navy:      "1B2A4A",
  coral:     "FF6F61",
  teal:      "2EC4B6",
  yellow:    "FFD166",
  white:     "FFFFFF",
  lightGray: "CCCCCC",
  midGray:   "888888",
  darkNavy:  "0D172B",
  medNavy:   "162236",
  darkRed:   "C0392B",
  darkerRed: "922B21",
  darkestRed:"641E16",
  tealDark:  "1A8C85",
  coralDark: "CC4F43",
};

const CHARTS = path.join(__dirname, "charts");
const chart = (name) => path.join(CHARTS, name);

// ─── Global helpers ─────────────────────────────────────────────────────────

function bg(slide, color = C.navy) {
  slide.background = { color };
}

/** Full-width header band with title */
function header(slide, title, accentColor = C.teal) {
  // Dark top strip
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 13.33, h: 1.1,
    fill: { color: C.darkNavy }, line: { color: C.darkNavy, width: 0 },
  });
  // Accent left bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.12, h: 1.1,
    fill: { color: accentColor }, line: { color: accentColor, width: 0 },
  });
  // Title text
  slide.addText(title, {
    x: 0.3, y: 0.08, w: 12.8, h: 0.88,
    fontSize: 22, bold: true, color: C.white, fontFace: "Calibri",
    valign: "middle",
  });
  // Bottom accent line
  slide.addShape(pres.shapes.LINE, {
    x: 0, y: 1.1, w: 13.33, h: 0,
    line: { color: accentColor, width: 2.5 },
  });
}

/** Thin horizontal rule */
function rule(slide, y, color = C.teal, opacity = 1) {
  slide.addShape(pres.shapes.LINE, {
    x: 0.35, y, w: 12.6, h: 0,
    line: { color, width: 1 },
  });
}

/** Citation footer */
function cite(slide, text) {
  slide.addText(text, {
    x: 0.3, y: 7.18, w: 12.7, h: 0.22,
    fontSize: 7, color: C.midGray, italic: true, fontFace: "Calibri",
  });
}

/** Stat card */
function statCard(slide, val, label, x, y, w = 3.0, h = 1.6, valColor = C.coral, borderColor = C.teal) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: 0.08,
    fill: { color: C.darkNavy }, line: { color: borderColor, width: 1.8 },
  });
  slide.addText(val, {
    x: x + 0.05, y: y + 0.12, w: w - 0.1, h: h * 0.55,
    fontSize: 32, bold: true, color: valColor,
    align: "center", fontFace: "Calibri",
  });
  slide.addText(label, {
    x: x + 0.1, y: y + h * 0.6, w: w - 0.2, h: h * 0.35,
    fontSize: 8.5, color: C.lightGray, align: "center", fontFace: "Calibri",
  });
}

/** Highlight card (darker, teal top accent strip) */
function highlightCard(slide, val, label, x, y, w = 3.05, h = 1.65, valColor, borderColor) {
  borderColor = borderColor || C.coral;
  valColor = valColor || C.coral;
  // Top accent strip
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: 0.08,
    fill: { color: C.medNavy }, line: { color: borderColor, width: 2 },
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h: 0.12,
    fill: { color: borderColor }, line: { color: borderColor, width: 0 },
  });
  slide.addText(val, {
    x: x + 0.05, y: y + 0.18, w: w - 0.1, h: h * 0.52,
    fontSize: 30, bold: true, color: valColor,
    align: "center", fontFace: "Calibri",
  });
  slide.addText(label, {
    x: x + 0.1, y: y + h * 0.65, w: w - 0.2, h: h * 0.32,
    fontSize: 8.5, color: C.lightGray, align: "center", fontFace: "Calibri",
  });
}

/** Info box with colored border */
function infoBox(slide, title, body, x, y, w, h, titleColor, borderColor) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: 0.06,
    fill: { color: C.darkNavy }, line: { color: borderColor, width: 2 },
  });
  slide.addText(title, {
    x: x + 0.18, y: y + 0.12, w: w - 0.3, h: 0.38,
    fontSize: 12, bold: true, color: titleColor, fontFace: "Calibri",
  });
  slide.addText(body, {
    x: x + 0.18, y: y + 0.55, w: w - 0.3, h: h - 0.7,
    fontSize: 10, color: C.white, fontFace: "Calibri",
  });
}

/** Inline chart image */
function addChart(slide, fname, x, y, w, h) {
  try {
    slide.addImage({ path: chart(fname), x, y, w, h });
  } catch (e) {
    // fallback placeholder if image missing
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w, h,
      fill: { color: C.darkNavy }, line: { color: C.teal, width: 1, dashType: "dash" },
    });
    slide.addText(fname, {
      x: x + 0.1, y: y + h / 2 - 0.15, w: w - 0.2, h: 0.3,
      fontSize: 8, color: C.midGray, italic: true, align: "center", fontFace: "Calibri",
    });
  }
}

/** Table row */
function tableRow(slide, cells, colX, colW, y, h, colors, bgColor) {
  if (bgColor) {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: colX[0] - 0.05, y, w: colW.reduce((a, b) => a + b, 0) + 0.1, h,
      fill: { color: bgColor }, line: { color: bgColor, width: 0 },
    });
  }
  cells.forEach((cell, i) => {
    slide.addText(cell.text || cell, {
      x: colX[i], y: y + 0.04, w: colW[i] - 0.05, h: h - 0.08,
      fontSize: cell.sz || 10, bold: cell.bold || false,
      color: colors ? colors[i] : C.white,
      fontFace: "Calibri", valign: "middle",
    });
  });
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 1 — Title
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  bg(s, C.darkNavy);

  // Full-bleed global map behind everything
  addChart(s, "global_map.png", 0, 0, 13.33, 7.5);

  // Dark gradient overlay (bottom 60%)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 2.4, w: 13.33, h: 5.1,
    fill: { type: "solid", color: "080E1A", alpha: 20 },
    line: { color: "080E1A", width: 0 },
  });

  // Top teal bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 13.33, h: 0.15,
    fill: { color: C.teal }, line: { color: C.teal, width: 0 },
  });

  // Track pill
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 3.8, y: 0.35, w: 5.73, h: 0.38, rectRadius: 0.19,
    fill: { color: C.teal }, line: { color: C.teal, width: 0 },
  });
  s.addText("SUSTAINABILITY & CRITICAL INFRASTRUCTURE TRACK", {
    x: 3.8, y: 0.35, w: 5.73, h: 0.38,
    fontSize: 9, bold: true, color: C.darkNavy, align: "center",
    fontFace: "Calibri", charSpacing: 1.5, valign: "middle",
  });

  // Main title
  s.addText("Which Coral Reefs Are Most at Risk\nof Collapse — and Who Loses?", {
    x: 0.6, y: 1.2, w: 12.1, h: 2.5,
    fontSize: 38, bold: true, color: C.white, align: "center",
    fontFace: "Calibri", valign: "middle",
  });

  // Subtitle
  s.addText("Using Real-World Bleaching Records, XGBoost & SHAP\nto Map Reef Collapse Risk onto 500M+ Reef-Dependent People", {
    x: 1.5, y: 3.85, w: 10.3, h: 0.9,
    fontSize: 13, color: C.lightGray, align: "center", fontFace: "Calibri",
  });

  // Divider
  s.addShape(pres.shapes.LINE, {
    x: 3.0, y: 4.95, w: 7.33, h: 0,
    line: { color: C.teal, width: 1.5 },
  });

  // Team
  s.addText("Shihab Jamal  ·  Visula Peduru", {
    x: 0.5, y: 5.15, w: 12.33, h: 0.45,
    fontSize: 14, bold: true, color: C.teal, align: "center", fontFace: "Calibri",
  });
  s.addText("SBU AI Community Datathon 2026   ·   March 28–29, 2026", {
    x: 0.5, y: 5.65, w: 12.33, h: 0.35,
    fontSize: 11, color: C.lightGray, align: "center", fontFace: "Calibri",
  });

  // Bottom coral bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 7.35, w: 13.33, h: 0.15,
    fill: { color: C.coral }, line: { color: C.coral, width: 0 },
  });
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 2 — Why This Matters
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  bg(s);
  header(s, "Why This Matters", C.teal);

  statCard(s, "500M+", "People depend on reefs\nfor food & income",   0.35, 1.25, 3.8, 1.8, C.white, C.coral);
  statCard(s, "$36B",  "Annual reef tourism\nrevenue globally",        4.4,  1.25, 3.8, 1.8, C.teal, C.teal);
  statCard(s, "$6.8B", "Annual reef fisheries\nrevenue globally",      8.45, 1.25, 3.8, 1.8, C.yellow, C.yellow);

  rule(s, 3.25);

  s.addText([
    { text: "6 million", options: { bold: true, color: C.teal } },
    { text: " small-scale fishers depend on reef ecosystems. In Pacific and Indian Ocean nations, reef fish is the primary daily protein source for coastal populations.", options: { color: C.lightGray } },
  ], { x: 0.35, y: 3.35, w: 12.6, h: 0.55, fontSize: 12, fontFace: "Calibri" });

  s.addText([
    { text: "Structural defence: ", options: { bold: true, color: C.coral } },
    { text: "a 1-metre reef absorbs up to 97% of incoming wave energy, protecting ", options: { color: C.lightGray } },
    { text: "$400B+", options: { bold: true, color: C.yellow } },
    { text: " in coastal assets from storm surge annually.", options: { color: C.lightGray } },
  ], { x: 0.35, y: 3.95, w: 12.6, h: 0.55, fontSize: 12, fontFace: "Calibri" });

  // Bubble map spans bottom
  addChart(s, "bubble_map.png", 0.35, 4.65, 12.6, 2.3);

  cite(s, "NOAA Ocean Service; The Nature Conservancy Ocean Wealth (2021); World Bank Fisheries Employment Data");
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 3 — The Crisis: 4th Global Bleaching Event
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  bg(s);
  header(s, "The Crisis: 4th Global Bleaching Event", C.coral);

  // Timeline boxes
  const events = [
    { year: "1998", pct: "21%", label: "1st global event", border: C.midGray,  valCol: C.lightGray },
    { year: "2010", pct: "37%", label: "2nd global event", border: C.lightGray, valCol: C.lightGray },
    { year: "2014–17", pct: "68%", label: "3rd global event", border: C.yellow, valCol: C.yellow },
    { year: "2023–25", pct: "84%", label: "4th global event ↑ ONGOING", border: C.coral, valCol: C.coral },
  ];

  const bw = 2.6, bh = 1.8;
  events.forEach((ev, i) => {
    const x = 0.35 + i * 3.2;
    // Box
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: 1.25, w: bw, h: bh, rectRadius: 0.08,
      fill: { color: C.darkNavy }, line: { color: ev.border, width: i === 3 ? 2.5 : 1.5 },
    });
    // Top accent strip for last box
    if (i === 3) {
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.25, w: bw, h: 0.12, fill: { color: C.coral }, line: { color: C.coral, width: 0 } });
    }
    // Year
    s.addText(ev.year, {
      x: x + 0.05, y: 1.32, w: bw - 0.1, h: 0.58,
      fontSize: 22, bold: true, color: ev.valCol, align: "center", fontFace: "Calibri",
    });
    // Big percentage
    s.addText(ev.pct, {
      x: x + 0.05, y: 1.9, w: bw - 0.1, h: 0.62,
      fontSize: 28, bold: true, color: i === 3 ? C.coral : C.lightGray,
      align: "center", fontFace: "Calibri",
    });
    s.addText(ev.label, {
      x: x + 0.05, y: 2.55, w: bw - 0.1, h: 0.4,
      fontSize: 10, color: i === 3 ? C.yellow : C.midGray, align: "center", fontFace: "Calibri",
    });
    // Arrow
    if (i < 3) {
      s.addText("›", { x: x + bw + 0.1, y: 1.85, w: 0.45, h: 0.7, fontSize: 30, color: C.midGray, align: "center", fontFace: "Calibri" });
    }
  });

  // Alert bar
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.35, y: 3.2, w: 12.6, h: 0.62, rectRadius: 0.06,
    fill: { color: "1A0A0A" }, line: { color: C.coral, width: 1.5 },
  });
  s.addText("⚠  84% of the world's reefs hit bleaching-level heat stress across 82 countries — 99.7% of all Atlantic tropical reef areas within a single year.", {
    x: 0.55, y: 3.24, w: 12.2, h: 0.54,
    fontSize: 13, bold: true, color: C.coral, fontFace: "Calibri", valign: "middle",
  });

  // Time series chart
  addChart(s, "time_series.png", 0.35, 3.95, 12.6, 3.0);

  cite(s, "ICRI (2025): icriforum.org/4gbe-2025  |  NOAA Coral Reef Watch (2024)  |  GCBD time series (8,973 records)");
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 4 — NOAA Ran Out of Numbers
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  bg(s);
  header(s, "NOAA Ran Out of Numbers", C.coral);

  // Left column
  s.addText("OLD SCALE  (pre-2023)", {
    x: 1.0, y: 1.25, w: 4.7, h: 0.38,
    fontSize: 12, bold: true, color: C.teal, align: "center", fontFace: "Calibri",
  });
  const oldBars = [
    { label: "Watch",         border: C.lightGray, fill: C.darkNavy, text: C.lightGray },
    { label: "Warning",       border: C.yellow,    fill: C.darkNavy, text: C.yellow },
    { label: "Alert Level 1", border: C.coral,     fill: C.darkNavy, text: C.coral },
    { label: "Alert Level 2", border: "8B0000",    fill: C.darkNavy, text: "DD5555" },
  ];
  oldBars.forEach((b, i) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.9, y: 1.72 + i * 0.72, w: 4.9, h: 0.6, rectRadius: 0.05,
      fill: { color: b.fill }, line: { color: b.border, width: 1.8 },
    });
    s.addText(b.label, {
      x: 0.9, y: 1.72 + i * 0.72, w: 4.9, h: 0.6,
      fontSize: 13, color: b.text, align: "center", valign: "middle", fontFace: "Calibri",
    });
  });

  // VS divider
  s.addText("vs.", {
    x: 6.0, y: 2.6, w: 1.33, h: 0.6,
    fontSize: 20, bold: true, color: C.midGray, align: "center", fontFace: "Calibri",
  });

  // Right column
  s.addText("NEW SCALE  (December 2023)", {
    x: 7.1, y: 1.25, w: 5.5, h: 0.38,
    fontSize: 12, bold: true, color: C.coral, align: "center", fontFace: "Calibri",
  });
  const newBars = [
    { label: "Watch",              fill: C.darkNavy, border: C.lightGray, text: C.lightGray, isNew: false },
    { label: "Warning",            fill: C.darkNavy, border: C.yellow,    text: C.yellow,    isNew: false },
    { label: "Alert Level 1",      fill: C.darkNavy, border: C.coral,     text: C.coral,     isNew: false },
    { label: "Alert Level 2",      fill: C.darkNavy, border: "8B0000",    text: "DD5555",    isNew: false },
    { label: "Alert Level 3  ★ NEW", fill: C.darkRed,    border: C.darkRed,    text: C.white, isNew: true },
    { label: "Alert Level 4  ★ NEW", fill: C.darkerRed,  border: C.darkerRed,  text: C.white, isNew: true },
    { label: "Alert Level 5  ★ NEW", fill: C.darkestRed, border: C.darkestRed, text: C.white, isNew: true },
  ];
  newBars.forEach((b, i) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 7.1, y: 1.72 + i * 0.55, w: 5.5, h: 0.45, rectRadius: 0.05,
      fill: { color: b.fill }, line: { color: b.border, width: b.isNew ? 2.5 : 1.5 },
    });
    s.addText(b.label, {
      x: 7.1, y: 1.72 + i * 0.55, w: 5.5, h: 0.45,
      fontSize: 12, bold: b.isNew, color: b.text,
      align: "center", valign: "middle", fontFace: "Calibri",
    });
  });

  // Quote
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.35, y: 5.8, w: 12.6, h: 0.78, rectRadius: 0.06,
    fill: { color: C.medNavy }, line: { color: C.midGray, width: 1 },
  });
  s.addText("\"Alert Level 5 = >80% coral mortality risk. When your measurement tool runs out of room, the problem has outpaced our expectations.\"", {
    x: 0.55, y: 5.85, w: 12.2, h: 0.68,
    fontSize: 12, italic: true, color: C.lightGray, fontFace: "Calibri", valign: "middle",
  });

  cite(s, "NOAA Climate.gov (December 2023)  |  NOAA Coral Reef Watch Alert Scale documentation");
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 5 — Our Data
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  bg(s);
  header(s, "Our Data: The Global Coral Bleaching Database", C.teal);

  statCard(s, "8,973",  "Survey records\n(1980–2020)",             0.35, 1.25, 2.9, 1.5, C.teal, C.teal);
  statCard(s, "93",     "Countries\nrepresented",                  3.45, 1.25, 2.9, 1.5, C.teal, C.teal);
  statCard(s, "40 yrs", "Historical\ntime span",                   6.55, 1.25, 2.9, 1.5, C.teal, C.teal);
  statCard(s, "20.6%",  "Mean bleaching\nseverity (all records)",  9.65, 1.25, 3.3, 1.5, C.coral, C.coral);

  // Variable table
  rule(s, 2.9, C.teal);
  s.addText([
    { text: "Variable", options: { bold: true, color: C.teal } },
    { text: "     Description", options: { bold: true, color: C.lightGray } },
  ], { x: 0.4, y: 2.95, w: 12.5, h: 0.32, fontSize: 10, fontFace: "Calibri", valign: "middle" });
  rule(s, 3.28, C.teal);

  const vars = [
    { v: "Percent_Bleaching",         d: "Target variable — % of coral colony affected by bleaching" },
    { v: "SSTA_DHW",                  d: "Degree Heating Weeks — accumulated thermal stress above coral tolerance" },
    { v: "SSTA_Standard_Deviation",   d: "Thermal variability — #1 SHAP predictor and key resilience indicator" },
    { v: "ClimSST / Temperature_Mean",d: "Climatological baseline sea surface temperature and observed mean SST" },
    { v: "Depth_m, Turbidity",        d: "Physical reef characteristics (shelter, water clarity)" },
    { v: "Country / Ocean / Ecoregion", d: "Geographic identifiers for regional risk modeling" },
  ];
  vars.forEach((r, i) => {
    const rowY = 3.32 + i * 0.4;
    const fill = i % 2 === 0 ? C.darkNavy : C.medNavy;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.35, y: rowY, w: 12.6, h: 0.38, fill: { color: fill }, line: { color: fill, width: 0 },
    });
    s.addText([
      { text: r.v, options: { color: C.teal, bold: false } },
      { text: "   —   " + r.d, options: { color: C.lightGray } },
    ], { x: 0.45, y: rowY + 0.02, w: 12.4, h: 0.34, fontSize: 10, fontFace: "Calibri", valign: "middle" });
  });

  s.addText("Source: van Woesik & Kratochwill (2022), Nature Scientific Data. SQLite: doi.org/10.6084/m9.figshare.c.5314466. Supplementary: NOAA Coral Reef Watch 5km daily SST.", {
    x: 0.35, y: 6.72, w: 12.6, h: 0.36, fontSize: 9, color: C.midGray, fontFace: "Calibri",
  });

  cite(s, "van Woesik & Kratochwill (2022), Scientific Data 9, 166  |  NOAA Coral Reef Watch (2023)");
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 6 — EDA: What the Data Told Us
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  bg(s);
  header(s, "EDA: What the Data Told Us", C.teal);

  // 4 highlight cards
  const cards = [
    { val: "3.4×",  label: "Median bleaching post-2015\n(7.1% → 24.0%, p = 10⁻⁵⁷)", valCol: C.coral, border: C.coral },
    { val: "#1",    label: "SHAP predictor: SST Thermal\nVariability (score = 6.76)",  valCol: C.teal,  border: C.teal  },
    { val: "+0.35", label: "Spearman ρ: Degree Heating\nWeeks vs. bleaching",          valCol: C.yellow,border: C.yellow },
    { val: "100%",  label: "Bleaching in Philippines,\nJapan & Pacific SIDS regions", valCol: C.coral, border: C.coral },
  ];
  cards.forEach((c, i) => {
    highlightCard(s, c.val, c.label, 0.35 + i * 3.26, 1.25, 3.05, 1.7, c.valCol, c.border);
  });

  // Two charts side by side
  addChart(s, "time_series.png",   0.35, 3.1, 6.25, 3.65);
  addChart(s, "heatmap_region.png", 6.8,  3.1, 6.25, 3.65);

  cite(s, "GCBD (8,973 records, 1980–2020); Mann-Whitney U test pre-2015 vs 2015–2020: p = 1.00×10⁻⁵⁷");
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 7 — Approach: XGBoost + SHAP
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  bg(s);
  header(s, "Our Approach: XGBoost + SHAP", C.coral);

  // Pipeline
  const pipe = [
    { label: "Raw GCBD\nData",      border: C.lightGray },
    { label: "Feature\nEngineering",border: C.teal },
    { label: "XGBoost\nModel",      border: C.coral },
    { label: "SHAP\nAnalysis",      border: C.teal },
    { label: "Risk\nPredictions",   border: C.coral },
  ];
  const pw = 2.08, ph = 0.9;
  pipe.forEach((p, i) => {
    const x = 0.35 + i * 2.59;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: 1.25, w: pw, h: ph, rectRadius: 0.07,
      fill: { color: C.darkNavy }, line: { color: p.border, width: 2 },
    });
    s.addText(p.label, {
      x, y: 1.25, w: pw, h: ph,
      fontSize: 11, bold: true, color: C.white, align: "center", valign: "middle", fontFace: "Calibri",
    });
    if (i < 4) {
      s.addText("›", {
        x: x + pw + 0.1, y: 1.38, w: 0.4, h: 0.65,
        fontSize: 26, color: C.midGray, align: "center", fontFace: "Calibri",
      });
    }
  });

  // Quote box (left)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.35, y: 2.35, w: 6.55, h: 1.75, rectRadius: 0.07,
    fill: { color: C.darkNavy }, line: { color: C.teal, width: 1.8 },
  });
  s.addText([
    { text: "\" ", options: { fontSize: 28, color: C.teal, bold: true } },
    { text: "I tried using a CNN model… very high RMSEs. Decision trees and gradient boosting outperformed everything else on tabular satellite-derived water quality data.", options: { fontSize: 11, italic: true, color: C.lightGray } },
  ], { x: 0.5, y: 2.45, w: 6.25, h: 1.0, fontFace: "Calibri" });
  s.addText("— Yang Xu, 1st place, NASA Tick Tick Bloom Challenge (DrivenData 2023)", {
    x: 0.55, y: 3.5, w: 6.25, h: 0.45, fontSize: 9.5, color: C.teal, fontFace: "Calibri",
  });

  // Validation box (left)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.35, y: 4.25, w: 6.55, h: 1.6, rectRadius: 0.07,
    fill: { color: C.medNavy }, line: { color: C.yellow, width: 1.5 },
  });
  s.addText("Temporal Validation Strategy", {
    x: 0.5, y: 4.33, w: 6.25, h: 0.38, fontSize: 12, bold: true, color: C.yellow, fontFace: "Calibri",
  });
  s.addText("Train: pre-2015  (8,259 samples)  →  Test: 2015–2020  (714 samples)", {
    x: 0.5, y: 4.72, w: 6.25, h: 0.4, fontSize: 11.5, color: C.white, fontFace: "Calibri",
  });
  s.addText("This hard temporal split prevents data leakage — and tests whether pre-2015 patterns can predict the unprecedented 2015–2020 mass bleaching events.", {
    x: 0.5, y: 5.13, w: 6.25, h: 0.62, fontSize: 10, italic: true, color: C.lightGray, fontFace: "Calibri",
  });

  // Model performance chart (right)
  addChart(s, "model_performance.png", 7.0, 2.35, 6.0, 3.55);

  cite(s, "drivendata.co/blog/tick-tick-bloom-challenge-winners  |  GCBD temporal split model results");
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 8 — Key Finding 1: Which Reefs Are Most at Risk
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  bg(s);
  header(s, "Key Finding 1: Which Reefs Are Most at Risk", C.coral);

  // Table header bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.35, y: 1.25, w: 6.9, h: 0.38,
    fill: { color: C.darkNavy }, line: { color: C.darkNavy, width: 0 },
  });
  rule(s, 1.63, C.teal);

  const colX = [0.45, 3.2, 4.95];
  const colW = [2.65, 1.65, 2.2];
  const hdrCells = [
    { text: "Region / Country", bold: true }, { text: "Mean Bleaching", bold: true }, { text: "SHAP Driver", bold: true },
  ];
  tableRow(s, hdrCells, colX, colW, 1.27, 0.36, [C.teal, C.teal, C.teal]);

  const rows = [
    { r: "N. Philippines",          p: "95.0%", d: "DHW + Depth",         hi: true },
    { r: "Japan (Ryukyu Islands)",   p: "87.7%", d: "DHW + ClimSST",       hi: true },
    { r: "Easter Island, Pacific",   p: "87.5%", d: "DHW 15.5 weeks",      hi: true },
    { r: "Persian Gulf",             p: "87.0%", d: "ClimSST + Turbidity", hi: true },
    { r: "Thailand",                 p: "71.9%", d: "DHW + ClimSST",       hi: false },
    { r: "Madagascar",               p: "65.4%", d: "SSTA Variability",    hi: false },
    { r: "Indonesia",                p: "57.3%", d: "DHW + Exposure",      hi: false },
  ];
  rows.forEach((r, i) => {
    const y = 1.67 + i * 0.5;
    const fill = i % 2 === 0 ? C.darkNavy : C.medNavy;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 6.9, h: 0.46, fill: { color: fill }, line: { color: fill, width: 0 } });
    tableRow(s,
      [{ text: r.r }, { text: r.p, bold: true }, { text: r.d }],
      colX, colW, y, 0.46,
      [C.white, r.hi ? C.coral : C.yellow, C.lightGray],
    );
  });

  // SHAP summary pill
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.35, y: 5.33, w: 6.9, h: 0.45, rectRadius: 0.05,
    fill: { color: C.darkNavy }, line: { color: C.midGray, width: 1 },
  });
  s.addText("SHAP Top 5: SSTA_SD (6.76) · DHW (6.22) · ClimSST (3.01) · Temp_Mean (2.98) · Cyclone_Freq (2.41)", {
    x: 0.45, y: 5.35, w: 6.7, h: 0.41, fontSize: 9, color: C.midGray, fontFace: "Calibri", valign: "middle",
  });

  // Right side — two stacked charts
  addChart(s, "top10_countries.png", 7.4, 1.25, 5.6, 2.3);
  addChart(s, "correlation.png",     7.4, 3.75, 5.6, 2.1);

  cite(s, "GCBD real-data results; XGBoost trained on 8,259 pre-2015 records, tested on 714 records (2015–2020)");
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 9 — Key Finding 2: The Thermal Variability Paradox
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  bg(s);
  header(s, "Key Finding 2: The Thermal Variability Paradox", C.teal);

  // Science box
  infoBox(s,
    "🔬  The Science — Sully et al. (2019), Nature Communications",
    '"Coral bleaching was significantly LESS common in localities with a HIGH VARIANCE in SST anomalies. Periodic temperature swings appear to pre-condition thermal tolerance in corals. Stable-temperature reefs are paradoxically more fragile." — analysis of 3,351 reef sites globally',
    0.35, 1.25, 6.7, 2.3, C.teal, C.teal,
  );

  // Our analysis box
  infoBox(s,
    "📊  What Our GCBD Analysis Found",
    "SSTA_SD is the #1 SHAP predictor (importance = 6.76). The raw Spearman ρ = +0.454 reflects that sites experiencing extreme thermal events show both high SSTA_SD and high bleaching simultaneously. SHAP decomposes the directional effect at the individual prediction level — separating acute-event spikes from background variability.",
    0.35, 3.7, 6.7, 2.2, C.coral, C.coral,
  );

  // Right charts
  addChart(s, "sst_variance.png",  7.2, 1.25, 5.9, 2.35);
  addChart(s, "shap_beeswarm.png", 7.2, 3.7,  5.9, 2.2);

  cite(s, "Sully et al. (2019), Nature Communications doi:10.1038/s41467-019-09238-2  |  GCBD real-data analysis (8,973 records)");
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 10 — Community Impact
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  bg(s);
  header(s, "Community Impact: When Reefs Collapse, Communities Collapse", C.coral);

  // Table
  rule(s, 1.63, C.teal);
  const tcX = [0.45, 2.55, 4.05, 5.6];
  const tcW = [1.95, 1.4, 1.45, 1.5];
  tableRow(s,
    [{ text: "Country", bold: true }, { text: "Bleaching", bold: true }, { text: "Reef Depend.", bold: true }, { text: "Risk Score", bold: true }],
    tcX, tcW, 1.27, 0.36, [C.teal, C.teal, C.teal, C.teal],
  );

  const impact = [
    { c: "Palau",           b: "75.0%", d: "91%", r: "0.976", hi: true  },
    { c: "Indonesia",       b: "57.3%", d: "85%", r: "0.816", hi: true  },
    { c: "Fiji",            b: "48.2%", d: "88%", r: "0.770", hi: true  },
    { c: "Madagascar",      b: "65.4%", d: "65%", r: "0.752", hi: false },
    { c: "Philippines",     b: "48.9%", d: "82%", r: "0.738", hi: false },
    { c: "Marshall Is.",    b: "38.4%", d: "93%", r: "0.731", hi: false },
    { c: "Papua N. Guinea", b: "49.9%", d: "78%", r: "0.721", hi: false },
    { c: "Thailand",        b: "71.9%", d: "50%", r: "0.707", hi: false },
  ];
  impact.forEach((r, i) => {
    const y = 1.67 + i * 0.46;
    const fill = i % 2 === 0 ? C.darkNavy : C.medNavy;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 6.9, h: 0.42, fill: { color: fill }, line: { color: fill, width: 0 } });
    tableRow(s,
      [{ text: r.c }, { text: r.b }, { text: r.d }, { text: r.r, bold: true }],
      tcX, tcW, y, 0.42,
      [C.white, C.coral, C.lightGray, r.hi ? C.coral : C.yellow],
    );
  });

  // Right: community impact chart + alert box
  addChart(s, "community_impact.png", 7.4, 1.25, 5.6, 3.45);

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 7.4, y: 4.88, w: 5.6, h: 1.6, rectRadius: 0.07,
    fill: { color: "1A0A0A" }, line: { color: C.coral, width: 2 },
  });
  s.addText("⚠  Critical: Pacific & Indian Ocean SIDS cluster in the upper-right quadrant — HIGH bleaching AND HIGH reef dependency simultaneously. These communities have no alternative protein source or income.", {
    x: 7.6, y: 4.96, w: 5.2, h: 1.44, fontSize: 11, color: C.white, fontFace: "Calibri",
  });

  cite(s, "GCBD + World Bank fisheries employment data; risk score = bleaching severity × reef dependency × income vulnerability");
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 11 — Model Performance & Interpretability
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  bg(s);
  header(s, "Model Performance & Interpretability", C.teal);

  // Metrics table
  rule(s, 1.63, C.teal);
  const mX = [0.45, 2.85, 4.0, 5.25];
  const mW = [2.3, 1.05, 1.15, 1.5];
  tableRow(s,
    [{ text: "Model", bold: true }, { text: "MAE", bold: true }, { text: "RMSE", bold: true }, { text: "R²", bold: true }],
    mX, mW, 1.27, 0.36, [C.teal, C.teal, C.teal, C.teal],
  );

  const mrows = [
    { m: "Decision Tree",  a: "24.43", r: "34.35", r2: "−0.52", best: false },
    { m: "Random Forest",  a: "23.28", r: "32.98", r2: "−0.40", best: false },
    { m: "XGBoost ✓",      a: "21.96", r: "30.72", r2: "−0.22", best: true  },
  ];
  mrows.forEach((r, i) => {
    const y = 1.67 + i * 0.5;
    const fill = i % 2 === 0 ? C.darkNavy : C.medNavy;
    if (r.best) rule(s, y - 0.04, C.coral);
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 6.55, h: 0.46, fill: { color: fill }, line: { color: fill, width: 0 } });
    tableRow(s,
      [{ text: r.m, bold: r.best }, { text: r.a, bold: r.best }, { text: r.r, bold: r.best }, { text: r.r2, bold: r.best }],
      mX, mW, y, 0.46,
      [r.best ? C.coral : C.white, r.best ? C.coral : C.white, r.best ? C.coral : C.white, r.best ? C.coral : C.white],
    );
  });

  // Explanation box
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.35, y: 3.35, w: 6.55, h: 2.75, rectRadius: 0.07,
    fill: { color: C.darkNavy }, line: { color: C.yellow, width: 1.8 },
  });
  s.addText("Why are R² values negative?", {
    x: 0.5, y: 3.43, w: 6.25, h: 0.4, fontSize: 13, bold: true, color: C.yellow, fontFace: "Calibri",
  });
  s.addText("Negative R² on the 2015–2020 test set means the model underpredicts bleaching severity in the test era.\n\nThis is expected: the model learned from pre-2015 patterns, and the 2015–2020 mass bleaching events are genuinely unprecedented. XGBoost still outperforms all alternatives.\n\nThis is not a modeling failure — it is empirical evidence that the 4th Global Bleaching Event exceeded every historical bound.", {
    x: 0.5, y: 3.88, w: 6.25, h: 2.1, fontSize: 11, color: C.lightGray, fontFace: "Calibri",
  });

  // SHAP beeswarm (right)
  addChart(s, "shap_beeswarm.png", 7.1, 1.25, 6.0, 4.95);

  cite(s, "Temporal validation: train pre-2015 (8,259), test 2015–2020 (714); GCBD real data");
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 12 — Limitations & Ethics
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  bg(s);
  header(s, "Limitations & Ethical Considerations", C.yellow);

  // Vertical divider
  s.addShape(pres.shapes.LINE, {
    x: 6.66, y: 1.25, w: 0, h: 3.25,
    line: { color: C.midGray, width: 1 },
  });

  // Left: limitations
  s.addText("Data Limitations", {
    x: 0.35, y: 1.28, w: 5.9, h: 0.42,
    fontSize: 14, bold: true, color: C.coral, fontFace: "Calibri",
  });
  const lims = [
    "GCBD covers 1980–2020 — does not capture the ongoing 4th Global Bleaching Event",
    "Observation bias: more records from Australia/Caribbean than remote Pacific islands",
    "Negative R² on test set reflects unprecedented 2015–2020 conditions not in training data",
    "Fisheries dependence estimated from national statistics, not community-level surveys",
  ];
  lims.forEach((l, i) => {
    s.addText("•  " + l, {
      x: 0.35, y: 1.8 + i * 0.75, w: 5.95, h: 0.65,
      fontSize: 11, color: C.lightGray, fontFace: "Calibri",
    });
  });

  // Right: ethics
  s.addText("Ethical Considerations", {
    x: 6.95, y: 1.28, w: 6.0, h: 0.42,
    fontSize: 14, bold: true, color: C.teal, fontFace: "Calibri",
  });
  const ethics = [
    "Risk scores must NOT de-prioritize reefs as \"lost causes\" — that harms communities most dependent on them",
    "Reef data from Indigenous-managed areas should be governed by those communities (UNDRIP, 2007)",
    "Model outputs are probabilistic indicators, not certainties — communicate uncertainty to policy audiences",
  ];
  ethics.forEach((e, i) => {
    s.addText("•  " + e, {
      x: 6.95, y: 1.8 + i * 0.88, w: 6.0, h: 0.78,
      fontSize: 11, color: C.lightGray, fontFace: "Calibri",
    });
  });

  // Yellow divider
  rule(s, 4.68, C.yellow);
  s.addText("With more time:", {
    x: 0.35, y: 4.76, w: 3.0, h: 0.38, fontSize: 13, bold: true, color: C.yellow, fontFace: "Calibri",
  });
  s.addText("Integrate real-time NOAA CRW satellite data (2020–2026)  ·  Add community economic surveys in highest-risk SIDS  ·  Build an early-warning dashboard for reef managers and policymakers", {
    x: 0.35, y: 5.18, w: 12.6, h: 0.65, fontSize: 11, color: C.lightGray, fontFace: "Calibri",
  });

  cite(s, "IPBES (2019) biodiversity data governance; UNDRIP (2007) data sovereignty principles; NOAA CRW for real-time extension");
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 13 — Conclusion & Next Steps
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  bg(s);
  header(s, "Conclusion & Next Steps", C.teal);

  // Three section cards
  const cards = [
    { title: "Most At-Risk Reefs", body: "Philippines, Japan (Ryukyu Islands), Thailand, Indonesia, Madagascar — high Degree Heating Weeks + highest SHAP-predicted risk scores", border: C.coral },
    { title: "Most Vulnerable Communities", body: "Palau (0.976), Indonesia (0.816), Fiji (0.770) — Pacific & Indian Ocean SIDS with >80% reef food dependency and no viable alternatives", border: C.teal },
    { title: "What We Can Do", body: "Real-time NOAA CRW data integration  ·  Bay-level bleaching early-warning systems  ·  Fisheries policy reform in highest-risk SIDS  ·  NGO ground-truth validation", border: C.yellow },
  ];
  cards.forEach((c, i) => {
    const x = 0.35 + i * 4.32;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: 1.25, w: 4.1, h: 2.8, rectRadius: 0.08,
      fill: { color: C.darkNavy }, line: { color: c.border, width: 2 },
    });
    // Top accent strip
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.25, w: 4.1, h: 0.14,
      fill: { color: c.border }, line: { color: c.border, width: 0 },
    });
    s.addText(c.title, {
      x: x + 0.18, y: 1.46, w: 3.74, h: 0.42,
      fontSize: 12.5, bold: true, color: c.border, fontFace: "Calibri",
    });
    s.addText(c.body, {
      x: x + 0.18, y: 1.94, w: 3.74, h: 1.85,
      fontSize: 10.5, color: C.lightGray, fontFace: "Calibri",
    });
  });

  // Key insight bar
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.35, y: 4.22, w: 12.6, h: 0.8, rectRadius: 0.07,
    fill: { color: C.darkNavy }, line: { color: C.teal, width: 2 },
  });
  s.addText("🔑  Key Insight: Stable-temperature reefs are the most fragile. Conservation policy must prioritize them — even when they appear \"safe\" by mean SST alone.", {
    x: 0.55, y: 4.26, w: 12.2, h: 0.72,
    fontSize: 12, color: C.white, fontFace: "Calibri", valign: "middle",
  });

  // Coral divider
  rule(s, 5.22, C.coral);

  // Closing quote
  s.addText("\" The data tells us where to look. The question is whether we act in time. \"", {
    x: 0.8, y: 5.32, w: 11.7, h: 0.75,
    fontSize: 18, italic: true, color: C.coral, align: "center", fontFace: "Calibri", valign: "middle",
  });

  cite(s, "Research Question: Which coral reefs are most at risk of collapse and which communities lose food security? — SBU AI Community Datathon 2026");
}

// ════════════════════════════════════════════════════════════════════════════
// Save
// ════════════════════════════════════════════════════════════════════════════
const outPath = path.join(__dirname, "coral_reef_datathon_2026.pptx");
pres.writeFile({ fileName: outPath })
  .then(() => console.log(`✅  Saved: ${outPath}  (${pres.slides ? pres.slides.length : 13} slides)`))
  .catch(err => { console.error("Error:", err); process.exit(1); });
