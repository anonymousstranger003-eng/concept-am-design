import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { useSection } from "@/hooks/useContent";
import type { BlogPost } from "@/lib/cms-defaults";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
  head: () => ({
    meta: [
      { title: "Journal | Architecture & Interior Insights — AM Concepts" },
      {
        name: "description",
        content:
          "Practical guides on building in Kerala: choosing an architect, climate-responsive design, approvals and turnkey interiors — from AM Concepts Architects.",
      },
      { property: "og:title", content: "Journal | AM Concepts Architects & Interiors" },
      { property: "og:description", content: "Guides on architecture, interiors and building in Kerala." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function formatDate(d?: string) {
  if (!d) return "";
  const parsed = new Date(d);
  if (Number.isNaN(parsed.getTime())) return d;
  return parsed.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function BlogIndex() {
  const blog = useSection<{ items: BlogPost[] }>("blog");
  const posts = (blog.items ?? []).slice().sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  return (
    <div>
      <section className="container-x mx-auto max-w-7xl pt-32 md:pt-40 pb-12 md:pb-16">
        <Reveal>
          <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-brand mb-5 md:mb-6">
            <span className="inline-block w-6 md:w-8 h-px bg-brand align-middle mr-3" />Journal
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[1.05] md:leading-[1] max-w-4xl tracking-[-0.02em]">
            Notes on architecture, interiors and building well.
          </h1>
        </Reveal>
      </section>

      <section className="container-x mx-auto max-w-7xl pb-28">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group block bg-background border border-black/5 overflow-hidden h-full"
              >
                {p.cover && (
                  <div className="aspect-[16/10] overflow-hidden bg-secondary">
                    <img
                      src={p.cover}
                      alt={p.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6 md:p-7">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-brand">
                    {formatDate(p.publishedAt)}
                  </div>
                  <h2 className="font-display text-xl md:text-2xl mt-3 leading-tight group-hover:text-brand transition-colors">
                    {p.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{p.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium">
                    Read article
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        {posts.length === 0 && (
          <p className="text-muted-foreground">New articles are on the way — check back soon.</p>
        )}
      </section>
    </div>
  );
}
