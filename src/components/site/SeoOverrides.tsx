import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useSection } from "@/hooks/useContent";
import type { SeoContent } from "@/lib/cms-defaults";

function setMeta(attr: "name" | "property", key: string, content: string) {
  if (!content) return;
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Applies per-page SEO overrides authored in the admin panel (Content → SEO).
 * Route `head()` still provides the SSR defaults; this layers the CMS values on top.
 */
export function SeoOverrides() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const seo = useSection<SeoContent>("seo");

  useEffect(() => {
    const page = seo.pages?.find((p) => p.path?.replace(/\/$/, "") === (pathname.replace(/\/$/, "") || ""));
    if (!page) return;
    if (page.title) {
      document.title = page.title;
      setMeta("property", "og:title", page.title);
      setMeta("name", "twitter:title", page.title);
    }
    if (page.description) {
      setMeta("name", "description", page.description);
      setMeta("property", "og:description", page.description);
      setMeta("name", "twitter:description", page.description);
    }
    if (page.ogImage) {
      setMeta("property", "og:image", page.ogImage);
      setMeta("name", "twitter:image", page.ogImage);
    }
  }, [pathname, seo]);

  return null;
}
