export const FONT_OPTIONS = [
  { value: "", label: "Default (site original)" },
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

export const WEIGHT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "300", label: "300 — Light" },
  { value: "400", label: "400 — Regular" },
  { value: "500", label: "500 — Medium" },
  { value: "600", label: "600 — Semibold" },
  { value: "700", label: "700 — Bold" },
];

export const GOOGLE_FONT_WEIGHTS = "300;400;500;600;700";

const SERIF = new Set(["Fraunces", "Playfair Display"]);

export const FONT_STACKS = (family: string) =>
  SERIF.has(family)
    ? `"${family}", Georgia, serif`
    : `"${family}", system-ui, -apple-system, sans-serif`;
