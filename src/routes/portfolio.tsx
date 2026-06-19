import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { ArrowUpRight, Eye } from "lucide-react";
import plan1 from "@/assets/plan-exterior-1.jpg.asset.json";
import plan2 from "@/assets/plan-exterior-2.jpg.asset.json";
import plan3 from "@/assets/plan-exterior-3.jpg.asset.json";
import plan4 from "@/assets/plan-exterior-4.jpg.asset.json";
import plan5 from "@/assets/plan-exterior-5.jpg.asset.json";
import plan6 from "@/assets/plan-exterior-6.jpg.asset.json";
import interiorLuxe from "@/assets/interior-living-luxe.png.asset.json";

export const Route = createFileRoute("/portfolio")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Portfolio | AM Concepts Architects & Interiors — Kerala 2026" },
      { name: "description", content: "Explore residential plans & exteriors, bespoke interior design, and immersive 360° VR experiences by AM Concepts Architects, Kerala." },
    ],
  }),
});

type Category = "Plan & Exterior" | "Interior Design" | "360° Virtual Experience";

const planExteriorProjects = [
  { title: "Hillside Residence", location: "Calicut", img: plan1.url },
  { title: "Modern Twin Block", location: "Kasaragod", img: plan2.url },
  { title: "Kerala Contemporary", location: "Wayanad", img: plan3.url },
  { title: "Gable Roof Villa", location: "Kannur", img: plan4.url },
  { title: "Courtyard Residence", location: "Malappuram", img: plan5.url },
  { title: "Two-Storey Contemporary", location: "Kasaragod", img: plan6.url },
];

const interiorProjects = [
  { title: "Luxe Living Room", location: "Calicut", img: interiorLuxe.url },
];

const vrProjects = [
  { title: "Mr. Abdul Salam Residence", location: "360° Virtual Tour", img: plan1.url, href: "https://www.coohom.com/pub/tool/panorama/show?obsPlanId=3FO3B0Q4EKOS&utm_source=pano_share&uri=%2Fpub%2Ftool%2Fbim%2Fcloud%3Fdesignid%3D3FO3B0Q4EKOS%26redirecturl%3D%2Fpub%2Fsaas%2Fapps%2Fproject%2Flist%26em%3D0%26locale%3Den_IN&utm_content=3FO3B0Q4EKOS&utm_medium=linkcopy" },
  { title: "Mr. Rakesh Pakkam", location: "360° Virtual Tour", img: plan2.url, href: "https://www.coohom.com/pub/tool/panorama/show?obsPlanId=3FO3B672D0PT&utm_source=light720_share&uri=%2Fpub%2Fsaas%2Fapps%2Fproject%2Fdetail%2F3FO3B672D0PT%3Fuid%3D3FO4L61D95FY&utm_content=3FO3B672D0PT&utm_medium=linkcopy" },
  { title: "Mr. Giri Nilambur Residence", location: "360° Virtual Tour", img: plan3.url, href: "https://www.coohom.com/pub/tool/panorama/show?obsPlanId=3FO3MTIBJE13&locale=en_US&utm_source=light720_share&utm_medium=linkcopy&utm_content=3FO3MTIBJE13" },
  { title: "Mr. Sunil Residence", location: "360° Virtual Tour", img: plan4.url, href: "https://www.coohom.com/pub/tool/panorama/show?obsPlanId=3FO3H0NQKIVO&locale=en_US&utm_source=light720_share&utm_medium=linkcopy&utm_content=3FO3H0NQKIVO" },
  { title: "Mr. Mustafa Residence", location: "360° Virtual Tour", img: plan5.url, href: "https://www.coohom.com/pub/tool/panorama/show?obsPlanId=3FO3IDHK6845&utm_source=pano_share&uri=%2Fpub%2Ftool%2Fbim%2Fcloud%3Fdesignid%3D3FO3IDHK6845%26redirecturl%3D%2Fpub%2Fsaas%2Fworkbench%26em%3D0%26locale%3Den_IN&utm_content=3FO3IDHK6845&utm_medium=linkcopy" },
];

const filters: Category[] = ["Plan & Exterior", "Interior Design", "360° Virtual Experience"];

function Portfolio() {
  const [filter, setFilter] = useState<Category>("Plan & Exterior");

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
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`relative px-4 sm:px-5 py-2.5 text-[10px] sm:text-xs uppercase tracking-[0.2em] rounded-full border transition-colors ${
                filter === f ? "bg-ink text-white border-ink" : "bg-transparent border-black/15 hover:border-ink"
              }`}
            >
              {f}
            </button>
          ))}
        </Reveal>
      </section>

      <section className="container-x mx-auto max-w-7xl pb-24 md:pb-28">
        <AnimatePresence mode="wait">
          {filter === "Plan & Exterior" && (
            <motion.div key="plan" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {planExteriorProjects.map((p) => (
                <div key={p.title} className="group relative overflow-hidden bg-secondary aspect-[3/4]">
                  <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/0" />
                  <div className="absolute left-4 bottom-4 right-4 text-white">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-white/70">{p.location}</div>
                    <div className="font-display text-xl md:text-2xl mt-1">{p.title}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {filter === "Interior Design" && (
            <motion.div key="interior" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {interiorProjects.map((p) => (
                <div key={p.title} className="group relative overflow-hidden bg-secondary aspect-[16/10] md:aspect-[4/3]">
                  <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/0" />
                  <div className="absolute left-5 bottom-5 right-5 text-white">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-white/70">{p.location}</div>
                    <div className="font-display text-2xl md:text-3xl mt-1">{p.title}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {filter === "360° Virtual Experience" && (
            <motion.div key="vr" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {vrProjects.map((p) => (
                <a
                  key={p.title}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block overflow-hidden bg-secondary aspect-[4/5]"
                >
                  <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full glass-dark grid place-items-center border border-white/30 group-hover:scale-110 transition-transform">
                      <Eye className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>
                  </div>
                  <div className="absolute left-4 bottom-4 right-4 text-white flex items-end justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.25em] text-brand">{p.location}</div>
                      <div className="font-display text-lg md:text-xl mt-1">{p.title}</div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
