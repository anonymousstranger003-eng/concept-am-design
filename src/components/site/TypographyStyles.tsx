import { useSiteSettings } from "@/hooks/useSiteSettings";
import { FONT_STACKS, GOOGLE_FONT_WEIGHTS } from "@/lib/typography";

/**
 * Applies the typography chosen in Admin → Settings → Typography.
 * When no values are stored, nothing is emitted and the site keeps its
 * original Fraunces / Inter Tight typography exactly as designed.
 */
export function TypographyStyles() {
  const s = useSiteSettings();
  const headingFont = s.headingFont?.trim();
  const bodyFont = s.bodyFont?.trim();
  const headingWeight = s.headingWeight?.trim();
  const bodyWeight = s.bodyWeight?.trim();

  if (!headingFont && !bodyFont && !headingWeight && !bodyWeight) return null;

  const families = Array.from(new Set([headingFont, bodyFont].filter(Boolean) as string[]));
  const href =
    families.length > 0
      ? `https://fonts.googleapis.com/css2?${families
          .map((f) => `family=${f.replace(/ /g, "+")}:wght@${GOOGLE_FONT_WEIGHTS}`)
          .join("&")}&display=swap`
      : null;

  const css = [
    ":root{",
    headingFont ? `--font-display:${FONT_STACKS(headingFont)};` : "",
    bodyFont ? `--font-sans:${FONT_STACKS(bodyFont)};` : "",
    "}",
    bodyFont || bodyWeight
      ? `body{${bodyFont ? `font-family:var(--font-sans);` : ""}${bodyWeight ? `font-weight:${bodyWeight};` : ""}}`
      : "",
    headingFont || headingWeight
      ? `h1,h2,h3,h4,.font-display{${headingFont ? `font-family:var(--font-display);font-variation-settings:normal;` : ""}${
          headingWeight ? `font-weight:${headingWeight};` : ""
        }}`
      : "",
  ].join("");

  return (
    <>
      {href && <link rel="stylesheet" href={href} />}
      <style dangerouslySetInnerHTML={{ __html: css }} />
    </>
  );
}
