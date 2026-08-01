/** Renders CMS rich text (TipTap HTML) or plain text safely-ish inside the site styles. */
export function RichText({ html, className }: { html?: string; className?: string }) {
  if (!html) return null;
  const looksHtml = /<\/?[a-z][\s\S]*>/i.test(html);
  if (!looksHtml) return <p className={className}>{html}</p>;
  return (
    <div
      className={`rich-text ${className ?? ""}`}
      // Content is authored by the site owner in the admin panel.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/** Strips tags for places that need plain text (meta descriptions, alt text). */
export function toPlainText(html?: string): string {
  if (!html) return "";
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}
