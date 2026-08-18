import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal, Stagger, item } from "@/components/site/Reveal";
import { motion } from "framer-motion";
import { useSection } from "@/hooks/useContent";
import { RichText } from "@/components/site/RichText";
import type { GalleryContent } from "@/lib/cms-defaults";
import { ArrowUpRight } from "lucide-react";
import { cmsClass } from "@/lib/cms-style";

export const Route = createFileRoute("/gallery")({
  component: Gallery,
  head: () => ({
    meta: [
      { title: "Gallery | Built Work by AM Concepts Architects & Interiors" },
      {
        name: "description",
        content:
          "A closer look at completed homes, interiors and exteriors designed by AM Concepts Architects & Interiors across Kerala.",
      },
      { property: "og:title", content: "Gallery | AM Concepts Architects & Interiors" },
      {
        property: "og:description",
        content: "Completed homes, interiors and exteriors by AM Concepts Architects & Interiors, Kerala.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Gallery() {
  const gallery = useSection<GalleryContent>("gallery");
  const items = gallery.items ?? [];

  return (
    <div>
      <section className="container-x mx-auto max-w-7xl pt-32 md:pt-40 pb-12 md:pb-16">
        <Reveal>
          <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-brand mb-5 md:mb-6">
            <span className="inline-block w-6 md:w-8 h-px bg-brand align-middle mr-3" />Gallery
          </div>
          <h1 className={`${cmsClass("gallery", "heading")} font-display text-4xl sm:text-5xl md:text-7xl leading-[1.05] md:leading-[1] max-w-5xl tracking-[-0.02em]`}>
            {gallery.heading}
          </h1>
        </Reveal>
      </section>

      <section className="container-x mx-auto max-w-7xl pb-24 md:pb-28">
        <Stagger className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {items.map((g, i) => (
            <motion.figure
              key={`${g.src}-${i}`}
              variants={item}
              className={`group relative overflow-hidden bg-secondary ${i % 5 === 0 ? "aspect-[4/5]" : "aspect-[4/3]"}`}
            >
              <img
                src={g.src}
                alt={g.caption || "AM Concepts project photograph"}
                loading="lazy"
                decoding="async"
                className={`${cmsClass("gallery", `items.${i}.src`)} w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105`}
              />
              {g.caption && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <figcaption className={`${cmsClass("gallery", `items.${i}.caption`)} absolute left-4 bottom-4 right-4 text-white text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity`}>
                    {g.caption}
                  </figcaption>
                </>
              )}
            </motion.figure>
          ))}
        </Stagger>

        {items.length === 0 && (
          <RichText html="<p>Gallery images are being curated — please check back shortly.</p>" className="text-muted-foreground" />
        )}

        <Reveal delay={0.2} className="mt-16">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-4 bg-ink text-white text-xs uppercase tracking-[0.2em] rounded-full hover:bg-brand transition-colors"
          >
            Start a project <ArrowUpRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
