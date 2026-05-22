import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { ArrowUpRight } from "lucide-react";
import villa from "@/assets/exterior-villa.jpeg";
import living from "@/assets/living-room.jpeg";
import loft from "@/assets/loft-interior.jpeg";
import dining from "@/assets/dining-table.jpeg";
import kitchen from "@/assets/kitchen.jpeg";
import office from "@/assets/office.jpeg";
import hero from "@/assets/hero-architecture.jpg";
import commercial from "@/assets/portfolio-commercial.jpg";
import bedroom from "@/assets/portfolio-bedroom.jpg";

export const Route = createFileRoute("/portfolio")({ component: Portfolio });

const projects = [
  { title: "Hillside Villa", category: "Residential", year: "2024", img: villa, span: "md:col-span-7 aspect-[4/3]" },
  { title: "Linear Living", category: "Interior", year: "2023", img: living, span: "md:col-span-5 aspect-[4/5]" },
  { title: "Brick Loft", category: "Residential", year: "2023", img: loft, span: "md:col-span-4 aspect-[4/5]" },
  { title: "Walnut Dining", category: "Interior", year: "2024", img: dining, span: "md:col-span-4 aspect-[4/5]" },
  { title: "Marble Kitchen", category: "Interior", year: "2022", img: kitchen, span: "md:col-span-4 aspect-[4/5]" },
  { title: "Corporate Workspace", category: "Commercial", year: "2024", img: office, span: "md:col-span-7 aspect-[16/10]" },
  { title: "Pavilion House", category: "Residential", year: "2024", img: hero, span: "md:col-span-5 aspect-[4/4]" },
  { title: "Sandstone Tower", category: "Commercial", year: "2023", img: commercial, span: "md:col-span-5 aspect-[4/5]" },
  { title: "Arched Suite", category: "Interior", year: "2024", img: bedroom, span: "md:col-span-7 aspect-[16/10]" },
];

const filters = ["All", "Residential", "Commercial", "Interior"];

function Portfolio() {
  const [filter, setFilter] = useState("All");
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <section className="container-x mx-auto max-w-7xl pt-40 pb-16">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.3em] text-brand mb-6">
            <span className="inline-block w-8 h-px bg-brand align-middle mr-3" />Portfolio
          </div>
          <h1 className="font-display text-5xl md:text-7xl leading-[1] max-w-5xl">
            Buildings, rooms and quiet moments we're proud of.
          </h1>
        </Reveal>

        <Reveal delay={0.15} className="mt-12 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`relative px-5 py-2.5 text-xs uppercase tracking-[0.2em] rounded-full border transition-colors ${
                filter === f ? "bg-ink text-white border-ink" : "bg-transparent border-black/15 hover:border-ink"
              }`}
            >
              {f}
            </button>
          ))}
        </Reveal>
      </section>

      <section className="container-x mx-auto max-w-7xl pb-28">
        <motion.div layout className="grid grid-cols-12 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.div
                layout
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className={`col-span-12 ${p.span}`}
              >
                <div className="group relative h-full w-full overflow-hidden bg-secondary">
                  <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
                  <div className="absolute left-5 bottom-5 right-5 text-white flex items-end justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.25em] text-white/70">{p.category} · {p.year}</div>
                      <div className="font-display text-2xl md:text-3xl mt-1">{p.title}</div>
                    </div>
                    <div className="w-10 h-10 rounded-full glass-dark grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
