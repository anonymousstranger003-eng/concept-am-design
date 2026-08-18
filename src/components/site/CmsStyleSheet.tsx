import { useMemo } from "react";
import { useContentBlocks } from "@/hooks/useContent";
import { buildStylesheet, fontsHref } from "@/lib/cms-style";

/**
 * Emits the per-field typography / image CSS saved in the CMS.
 * Nothing is rendered until an editor customises a specific field, so the
 * original design stays exactly as built.
 */
export function CmsStyleSheet() {
  const { data } = useContentBlocks();
  const { css, href } = useMemo(() => {
    const built = buildStylesheet((data ?? {}) as Record<string, unknown>);
    return { css: built.css, href: fontsHref(built.families) };
  }, [data]);

  if (!css) return null;
  return (
    <>
      {href && <link rel="stylesheet" href={href} />}
      <style dangerouslySetInnerHTML={{ __html: css }} />
    </>
  );
}
