import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { ArrowUpRight, Eye } from "lucide-react";
import { useSection } from "@/hooks/useContent";
import { PORTFOLIO_CATEGORIES, type PortfolioItem } from "@/lib/cms-defaults";
import { cmsClass } from "@/lib/cms-style";

export const Route = createFileRoute("/portfolio")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Portfolio | AM Concepts Architects & Interiors — Kerala 2026" },
      { name: "description", content: "Explore residential plans & exteriors, bespoke interior design, and immersive 360° VR experiences by AM Concepts Architects, Kerala." },
      { property: "og:title", content: "Portfolio | AM Concepts Architects & Interiors" },
      { property: "og:description", content: "Plans, interiors and immersive 360° experiences from across Kerala." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Portfolio() {
  const { items } = useSection<{ items: PortfolioItem[] }>("portfolio");
  const projects = items ?? [];
  const categories = Array.from(
    new Set([
      ...projects.map((p) => p.category).filter(Boolean),
      ...PORTFOLIO_CATEGORIES,
    ]),
  ).filter((c) => projects.some((p) => p.category === c));
  const [filter, setFilter] = useState<string>(categories[0] ?? PORTFOLIO_CATEGORIES[0]);
  const active = categories.includes(filter) ? filter : (categories[0] ?? "");
  const visible = projects.filter((p) => p.category === active);
  const isVr = /360/.test(active);

  return (
    <div>
      <section className="container-x mx-auto max-w-7xl pt-32 md:pt-40 pb-12 md:pb-16">
        <Reveal>
          <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-brand mb-5 md:mb-6">
            <span className="inline-block w-6 md:w-8 h-px bg-brand align-middle mr-3" />Portfolio
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[1.05] md:leading-[1] max-w-5xl tracking-[-0.02em]">
            Plans, interiors and immersive 360° experiences from across Kerala.
          </h1>
        </Reveal>

        <Reveal delay={0.15} className="mt-8 md:mt-12 flex flex-wrap gap-2">
          {categories.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`relative px-4 sm:px-5 py-2.5 text-[10px] sm:text-xs uppercase tracking-[0.2em] rounded-full border transition-colors ${
                active === f ? "bg-ink text-white border-ink" : "bg-transparent border-black/15 hover:border-ink"
              }`}
            >
              {f}
            </button>
          ))}
        </Reveal>
      </section>

      <section className="container-x mx-auto max-w-7xl pb-24 md:pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={
              isVr
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            }
          >
            {visible.map((p, i) =>
              p.link ? (
                <a
                  key={p.title}
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block overflow-hidden bg-secondary aspect-[4/5]"
                >
                  <img src={p.img} alt={p.title} loading="lazy" className={`${cmsClass("portfolio", `items.${i}.img`)} w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full glass-dark grid place-items-center border border-white/30 group-hover:scale-110 transition-transform">
                      <Eye className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>
                  </div>
                  <div className="absolute left-4 bottom-4 right-4 text-white flex items-end justify-between">
                    <div>
                      <div className={`${cmsClass("portfolio", `items.${i}.location`)} text-[10px] uppercase tracking-[0.25em] text-brand`}>{p.location}</div>
                      <div className={`${cmsClass("portfolio", `items.${i}.title`)} font-display text-lg md:text-xl mt-1`}>{p.title}</div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </a>
              ) : (
                <div key={p.title} className="group relative overflow-hidden bg-secondary aspect-[3/4]">
                  <img src={p.img} alt={p.title} loading="lazy" className={`${cmsClass("portfolio", `items.${i}.img`)} w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/0" />
                  <div className="absolute left-4 bottom-4 right-4 text-white">
                    <div className={`${cmsClass("portfolio", `items.${i}.location`)} text-[10px] uppercase tracking-[0.25em] text-white/70`}>{p.location}</div>
                    <div className={`${cmsClass("portfolio", `items.${i}.title`)} font-display text-xl md:text-2xl mt-1`}>{p.title}</div>
                    {p.description && (
                      <div className={`${cmsClass("portfolio", `items.${i}.description`)} text-xs text-white/70 mt-1 line-clamp-2`}>{p.description}</div>
                    )}
                  </div>
                </div>
              ),
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}
