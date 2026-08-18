import { Quote, Star } from "lucide-react";
import { Reveal, Stagger, item, WordsReveal } from "@/components/site/Reveal";
import { motion } from "framer-motion";
import { useSection } from "@/hooks/useContent";
import type { TestimonialItem } from "@/lib/cms-defaults";
import { cmsClass } from "@/lib/cms-style";



export function Testimonials() {
  const data = useSection<{ heading: string; items: TestimonialItem[] }>("testimonials");
  const list = data.items ?? [];
  return (
    <section className="container-x mx-auto max-w-7xl py-20 md:py-40">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8 mb-12 md:mb-16">
        <Reveal>
          <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-brand mb-5 md:mb-6">
            <span className="inline-block w-6 md:w-8 h-px bg-brand align-middle mr-3" />Client Stories
          </div>
          <WordsReveal
            text={data.heading}
            className="font-display text-3xl sm:text-4xl md:text-6xl max-w-3xl leading-[1.05] tracking-[-0.02em]"
          />
        </Reveal>
        <Reveal delay={0.15} className="md:max-w-sm">
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-brand text-brand" />
            ))}
            <span className="text-sm font-medium text-ink ml-1">4.9 / 5</span>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Real reviews from homeowners and commercial clients we've served since 2020.
          </p>
        </Reveal>
      </div>

      <Stagger className="grid md:grid-cols-3 gap-4 md:gap-6">
        {list.map((r, i) => (
          <motion.figure
            key={r.name}
            variants={item}
            className="group bg-background border border-black/5 p-7 md:p-9 flex flex-col hover:border-brand/40 transition-colors relative overflow-hidden"
          >
            <Quote className="absolute top-6 right-6 w-8 h-8 text-brand/15 group-hover:text-brand/30 transition-colors" />
            <div className="flex gap-0.5">
              {[...Array(r.rating ?? 5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-brand text-brand" />
              ))}
            </div>
            <blockquote className={`${cmsClass("testimonials", `items.${i}.quote`)} mt-5 text-[15px] leading-relaxed text-foreground/90 flex-1`}>
              "{r.quote}"
            </blockquote>
            <figcaption className="mt-6 pt-6 border-t border-black/5 flex items-center gap-5">
              {r.photo ? (
                <img
                  src={r.photo}
                  alt={r.name}
                  loading="lazy"
                  decoding="async"
                  className={`${cmsClass("testimonials", `items.${i}.photo`)} w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border border-black/10 shrink-0`}
                />
              ) : (
                <div
                  aria-hidden
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-secondary border border-black/10 shrink-0 grid place-items-center font-display text-xl md:text-2xl text-ink/70"
                >
                  {r.name.trim().charAt(0)}
                </div>
              )}
              <div className="min-w-0">
                <div className={`${cmsClass("testimonials", `items.${i}.name`)} font-display text-xl md:text-2xl text-ink truncate`}>{r.name}</div>
                <div className={`${cmsClass("testimonials", `items.${i}.role`)} text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1`}>
                  {r.role ? `${r.role} · ` : ""}{r.when ?? "Verified Google Review"}
                </div>
              </div>
            </figcaption>

            <span className="absolute left-0 bottom-0 h-px w-0 bg-brand group-hover:w-full transition-all duration-700" />
          </motion.figure>
        ))}
      </Stagger>
    </section>
  );
}
