// ---------------------------------------------------------------------------
// Per-field style engine.
//
// Every editable text field and image in the CMS can carry its own style
// object. Styles live INSIDE the same `content_blocks.data` jsonb row, under a
// reserved `__styles` map keyed by field path:
//
//   data.__styles = {
//     "heading":            { fontFamily: "Poppins", sizeDesktop: "72px", ... }
//     "slides.0.subheading":{ color: "#ffffff", align: "center" }
//     "items.2.img":        { widthDesktop: "480px", objectFit: "contain" }
//   }
//
// Nothing is emitted when a field has no style, so the existing design is
// preserved byte-for-byte until an editor explicitly changes something.
// ---------------------------------------------------------------------------

export type TextStyle = {
  fontFamily?: string;
  fontWeight?: string;
  color?: string;
  lineHeight?: string;
  letterSpacing?: string;
  align?: string;
  transform?: string;
  italic?: boolean;
  underline?: boolean;
  bold?: boolean;
  sizeDesktop?: string;
  sizeTablet?: string;
  sizeMobile?: string;
};

export type ImageStyle = {
  widthDesktop?: string;
  heightDesktop?: string;
  widthTablet?: string;
  heightTablet?: string;
  widthMobile?: string;
  heightMobile?: string;
  maxWidth?: string;
  maxHeight?: string;
  objectFit?: string;
  objectPosition?: string;
  radius?: string;
  align?: string;
  alt?: string;
};

export type AnyStyle = TextStyle & ImageStyle;
export type StyleMap = Record<string, AnyStyle>;

export const STYLES_KEY = "__styles";

export const FONT_FAMILY_OPTIONS = [
  { value: "", label: "Inherit (site default)" },
  { value: "Inter", label: "Inter" },
  { value: "Poppins", label: "Poppins" },
  { value: "Montserrat", label: "Montserrat" },
  { value: "Manrope", label: "Manrope" },
  { value: "DM Sans", label: "DM Sans" },
  { value: "Plus Jakarta Sans", label: "Plus Jakarta Sans" },
  { value: "Roboto", label: "Roboto" },
  { value: "Fraunces", label: "Fraunces (serif)" },
  { value: "Playfair Display", label: "Playfair Display (serif)" },
];

export const WEIGHT_CHOICES = ["", "300", "400", "500", "600", "700", "800"];
export const ALIGN_CHOICES = ["", "left", "center", "right", "justify"];
export const TRANSFORM_CHOICES = ["", "none", "uppercase", "lowercase", "capitalize"];
export const FIT_CHOICES = ["", "cover", "contain", "fill", "none", "scale-down"];
export const IMAGE_ALIGN_CHOICES = ["", "left", "center", "right"];

const SERIF = new Set(["Fraunces", "Playfair Display"]);
export const fontStack = (family: string) =>
  SERIF.has(family) ? `"${family}", Georgia, serif` : `"${family}", system-ui, -apple-system, sans-serif`;

/** Deterministic, collision-free CSS class for a section + field path. */
export function cmsClass(sectionKey: string, path: string): string {
  return `cms-${slug(sectionKey)}--${slug(path)}`;
}

function slug(s: string) {
  return s.replace(/[^a-zA-Z0-9]+/g, "_").toLowerCase();
}

function isSet(v: unknown): v is string {
  return typeof v === "string" && v.trim() !== "";
}

/** Inline style object — used by the admin live preview. */
export function textStyleToCss(s: AnyStyle | undefined, device: "desktop" | "tablet" | "mobile" = "desktop") {
  if (!s) return {};
  const size = device === "mobile" ? s.sizeMobile || s.sizeTablet || s.sizeDesktop : device === "tablet" ? s.sizeTablet || s.sizeDesktop : s.sizeDesktop;
  const css: Record<string, string> = {};
  if (isSet(s.fontFamily)) css.fontFamily = fontStack(s.fontFamily.trim());
  if (isSet(size)) css.fontSize = size!.trim();
  if (s.bold) css.fontWeight = "700";
  else if (isSet(s.fontWeight)) css.fontWeight = s.fontWeight.trim();
  if (isSet(s.color)) css.color = s.color.trim();
  if (isSet(s.lineHeight)) css.lineHeight = s.lineHeight.trim();
  if (isSet(s.letterSpacing)) css.letterSpacing = s.letterSpacing.trim();
  if (isSet(s.align)) css.textAlign = s.align.trim();
  if (isSet(s.transform)) css.textTransform = s.transform.trim();
  if (s.italic) css.fontStyle = "italic";
  if (s.underline) css.textDecoration = "underline";
  return css;
}

export function imageStyleToCss(s: AnyStyle | undefined, device: "desktop" | "tablet" | "mobile" = "desktop") {
  if (!s) return {};
  const w = device === "mobile" ? s.widthMobile || s.widthTablet || s.widthDesktop : device === "tablet" ? s.widthTablet || s.widthDesktop : s.widthDesktop;
  const h = device === "mobile" ? s.heightMobile || s.heightTablet || s.heightDesktop : device === "tablet" ? s.heightTablet || s.heightDesktop : s.heightDesktop;
  const css: Record<string, string> = {};
  if (isSet(w)) css.width = w!.trim();
  if (isSet(h)) css.height = h!.trim();
  if (isSet(s.maxWidth)) css.maxWidth = s.maxWidth.trim();
  if (isSet(s.maxHeight)) css.maxHeight = s.maxHeight.trim();
  if (isSet(s.objectFit)) css.objectFit = s.objectFit.trim();
  if (isSet(s.objectPosition)) css.objectPosition = s.objectPosition.trim();
  if (isSet(s.radius)) css.borderRadius = s.radius.trim();
  return css;
}

function declarations(css: Record<string, string>): string {
  return Object.entries(css)
    .map(([k, v]) => `${k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}:${v} !important;`)
    .join("");
}

/**
 * Builds the responsive CSS for one field. Desktop values are the base rule,
 * tablet/mobile override them inside media queries.
 */
export function styleRules(sectionKey: string, path: string, s: AnyStyle): string {
  const cls = `.${cmsClass(sectionKey, path)}`;
  const out: string[] = [];

  const base = { ...textStyleToCss(s, "desktop"), ...imageStyleToCss(s, "desktop") };
  if (Object.keys(base).length) out.push(`${cls}{${declarations(base)}}`);

  const tabletOnly: Record<string, string> = {};
  if (isSet(s.sizeTablet)) tabletOnly.fontSize = s.sizeTablet.trim();
  if (isSet(s.widthTablet)) tabletOnly.width = s.widthTablet.trim();
  if (isSet(s.heightTablet)) tabletOnly.height = s.heightTablet.trim();
  if (Object.keys(tabletOnly).length)
    out.push(`@media (max-width:1023px){${cls}{${declarations(tabletOnly)}}}`);

  const mobileOnly: Record<string, string> = {};
  const mSize = s.sizeMobile || s.sizeTablet;
  const mW = s.widthMobile || s.widthTablet;
  const mH = s.heightMobile || s.heightTablet;
  if (isSet(mSize)) mobileOnly.fontSize = mSize!.trim();
  if (isSet(mW)) mobileOnly.width = mW!.trim();
  if (isSet(mH)) mobileOnly.height = mH!.trim();
  if (Object.keys(mobileOnly).length)
    out.push(`@media (max-width:639px){${cls}{${declarations(mobileOnly)}}}`);

  // Image alignment is applied to the element's own box.
  if (isSet(s.align) && (isSet(s.widthDesktop) || isSet(s.widthTablet) || isSet(s.widthMobile))) {
    const a = s.align.trim();
    if (a === "center") out.push(`${cls}{margin-left:auto !important;margin-right:auto !important;}`);
    if (a === "right") out.push(`${cls}{margin-left:auto !important;margin-right:0 !important;}`);
    if (a === "left") out.push(`${cls}{margin-left:0 !important;margin-right:auto !important;}`);
  }
  return out.join("");
}

/** Google Fonts href for every family used by any per-field style. */
export function fontsHref(families: string[]): string | null {
  const unique = Array.from(new Set(families.filter((f) => f && f.trim()))).map((f) => f.trim());
  if (unique.length === 0) return null;
  return `https://fonts.googleapis.com/css2?${unique
    .map((f) => `family=${f.replace(/ /g, "+")}:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400`)
    .join("&")}&display=swap`;
}

export function readStyleMap(data: unknown): StyleMap {
  if (!data || typeof data !== "object") return {};
  const m = (data as Record<string, unknown>)[STYLES_KEY];
  if (!m || typeof m !== "object" || Array.isArray(m)) return {};
  return m as StyleMap;
}

/** Full stylesheet for all blocks. Empty string when nothing is customised. */
export function buildStylesheet(blocks: Record<string, unknown>): { css: string; families: string[] } {
  const out: string[] = [];
  const families: string[] = [];
  for (const [sectionKey, data] of Object.entries(blocks ?? {})) {
    const map = readStyleMap(data);
    for (const [path, style] of Object.entries(map)) {
      if (!style || typeof style !== "object") continue;
      if (style.fontFamily) families.push(style.fontFamily);
      out.push(styleRules(sectionKey, path, style));
    }
  }
  return { css: out.join(""), families };
}
