import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Leaf, Sparkles, Compass, ShieldCheck } from "lucide-react";
import hero from "@/assets/hero-architecture.jpg";
import villa from "@/assets/exterior-villa.jpeg";
import living from "@/assets/living-room.jpeg";
import loft from "@/assets/loft-interior.jpeg";
import dining from "@/assets/dining-table.jpeg";
import kitchen from "@/assets/kitchen.jpeg";
import office from "@/assets/office.jpeg";
import founder from "@/assets/founder.jpg";
import { Reveal, Stagger, SlideIn, Marquee, item, itemLeft, itemRight } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { services, stats } from "@/lib/site-data";

export const Route = createFileRoute("/")({ component: Home });

const portfolioPreview = [
  { title: "Hillside Villa", category: "Residential · Calicut", img: villa },
  { title: "Linear Living", category: "Interior · Kochi", img: living },
  { title: "Brick Loft", category: "Residential · Wayanad", img: loft },
  { title: "Walnut Dining", category: "Interior · Kasaragod", img: dining },
  { title: "Marble Kitchen", category: "Interior · Calicut", img: kitchen },
  { title: "Corporate Office", category: "Commercial · Kannur", img: office },
];

function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div className="overflow-clip">
      {/* HERO */}
      <section ref={heroRef} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <motion.div style={{ y, scale }} className="absolute inset-0">
          <img src={hero} alt="Modern architecture" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        </motion.div>

        <div className="relative z-10 h-full container-x mx-auto max-w-7xl flex flex-col justify-end pb-20 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex items-center gap-3 text-white/70 text-[11px] uppercase tracking-[0.3em] mb-8"
          >
            <span className="w-8 h-px bg-white/50" />
            Est. 2014 · Kerala, India
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-white text-5xl md:text-7xl xl:text-[7.5rem] leading-[0.95] max-w-5xl"
          >
            Architecture that <em className="italic text-white/85">listens</em>.
            <br />
            Interiors that <span className="text-brand">last</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.9 }}
            className="mt-8 max-w-xl text-white/80 text-base md:text-lg leading-relaxed"
          >
            AM Concepts & Architects — a Kerala-based studio founded by
            Manoj AM, designing residential, commercial and eco-conscious
            spaces with honesty, restraint and craft.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.9 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Link to="/contact" className="group inline-flex items-center gap-3 px-7 py-4 bg-brand text-white text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-ink transition-colors">
              Book Consultation
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link to="/portfolio" className="group inline-flex items-center gap-3 px-7 py-4 glass-dark text-white text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white/15 transition-colors">
              View Projects
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* Floating side label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="hidden md:flex absolute left-6 bottom-10 -rotate-90 origin-bottom-left text-white/50 text-[10px] uppercase tracking-[0.4em]"
        >
          Scroll to explore
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col gap-4 text-white/40 text-[10px] uppercase tracking-[0.3em] writing-vertical"
        >
          <span>11+ yrs</span>
          <span className="w-px h-10 bg-white/30 mx-auto" />
          <span>150+ projects</span>
        </motion.div>
      </section>

      {/* INTRO */}
      <section className="container-x mx-auto max-w-7xl py-28 md:py-40 grid md:grid-cols-12 gap-12 items-end">
        <Reveal className="md:col-span-7">
          <div className="text-xs uppercase tracking-[0.3em] text-brand mb-6">
            <span className="inline-block w-8 h-px bg-brand align-middle mr-3" />The Studio
          </div>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05]">
            A professional architecture and interior design firm — built on honesty, integrity and craft.
          </h2>
        </Reveal>
        <Reveal delay={0.15} className="md:col-span-5 md:pl-10">
          <p className="text-muted-foreground text-lg leading-relaxed">
            From compact homes to large commercial campuses, every AM Concept project
            begins the same way — listening. We believe great buildings are not
            decorated, they're considered. Each space is shaped by site, climate,
            client and the quiet discipline of good detailing.
          </p>
          <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-brand transition-colors">
            About the studio <ArrowUpRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </section>

      {/* STATS */}
      <section className="border-y border-black/5 bg-secondary/60">
        <div className="container-x mx-auto max-w-7xl py-16 md:py-20 grid grid-cols-2 md:grid-cols-5 gap-y-10">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center md:border-r last:border-r-0 border-black/10">
              <div className="font-display text-5xl md:text-6xl text-ink">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="container-x mx-auto max-w-7xl py-28 md:py-40">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.3em] text-brand mb-6">
              <span className="inline-block w-8 h-px bg-brand align-middle mr-3" />What we do
            </div>
            <h2 className="font-display text-4xl md:text-6xl max-w-2xl leading-[1.05]">
              Twelve disciplines, one design language.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <Link to="/services" className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-brand">
              All services <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/5 border border-black/5">
          {services.slice(0, 6).map((s, i) => (
            <motion.div
              key={s.title}
              variants={item}
              className="group bg-background p-8 md:p-10 hover:bg-ink hover:text-white transition-colors duration-500 relative overflow-hidden"
            >
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground group-hover:text-white/50">
                0{i + 1} / Service
              </div>
              <h3 className="font-display text-2xl md:text-3xl mt-6 leading-tight group-hover:text-white">
                {s.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed group-hover:text-white/70">{s.desc}</p>
              <ArrowUpRight className="absolute top-8 right-8 w-5 h-5 text-foreground/30 group-hover:text-brand transition-transform group-hover:rotate-12" />
            </motion.div>
          ))}
        </Stagger>
      </section>

      {/* PORTFOLIO */}
      <section className="container-x mx-auto max-w-7xl pb-28 md:pb-40">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.3em] text-brand mb-6">
              <span className="inline-block w-8 h-px bg-brand align-middle mr-3" />Selected works
            </div>
            <h2 className="font-display text-4xl md:text-6xl max-w-2xl leading-[1.05]">
              Spaces designed to be lived in, not photographed.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-brand">
              Full portfolio <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {portfolioPreview.map((p, i) => {
            const spans = ["col-span-12 md:col-span-7 aspect-[4/3]", "col-span-12 md:col-span-5 aspect-[4/5]", "col-span-6 md:col-span-4 aspect-[4/5]", "col-span-6 md:col-span-4 aspect-[4/5]", "col-span-12 md:col-span-4 aspect-[4/5]", "col-span-12 aspect-[16/7]"];
            return (
              <Reveal key={p.title} delay={i * 0.05} className={spans[i]}>
                <a href="/portfolio" className="group relative block w-full h-full overflow-hidden bg-secondary">
                  <motion.img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-90" />
                  <div className="absolute left-5 bottom-5 right-5 text-white flex items-end justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.25em] text-white/70">{p.category}</div>
                      <div className="font-display text-2xl mt-1">{p.title}</div>
                    </div>
                    <div className="w-10 h-10 rounded-full glass-dark grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* FOUNDER */}
      <section className="bg-secondary/50 border-y border-black/5">
        <div className="container-x mx-auto max-w-7xl py-28 md:py-40 grid md:grid-cols-12 gap-12 items-center">
          <Reveal className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={founder} alt="Manoj AM, Founder" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute bottom-0 left-0 right-0 glass p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Founder & Managing Director</div>
                <div className="font-display text-2xl mt-1">Manoj AM</div>
              </div>
            </div>
          </Reveal>
          <div className="md:col-span-7 md:pl-10">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.3em] text-brand mb-6">
                <span className="inline-block w-8 h-px bg-brand align-middle mr-3" />Philosophy
              </div>
              <h2 className="font-display text-4xl md:text-5xl leading-[1.1] max-w-xl">
                "Design should feel inevitable — like it could not have been any other way."
              </h2>
            </Reveal>
            <Stagger className="grid sm:grid-cols-2 gap-6 mt-12">
              {[
                { Icon: Compass, t: "Site-led design", d: "Every project starts with the land, light and life around it." },
                { Icon: Leaf, t: "Eco-conscious", d: "Climate-responsive buildings using regional, low-impact materials." },
                { Icon: Sparkles, t: "Crafted detail", d: "Joinery, materiality and lighting resolved to the millimetre." },
                { Icon: ShieldCheck, t: "Integrity", d: "Transparent fees, honest timelines, full documentation." },
              ].map(({ Icon, t, d }) => (
                <motion.div key={t} variants={item} className="p-6 bg-background border border-black/5">
                  <Icon className="w-5 h-5 text-brand" />
                  <div className="font-display text-xl mt-4">{t}</div>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{d}</p>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* OFFICES */}
      <section className="container-x mx-auto max-w-7xl py-28 md:py-40">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.3em] text-brand mb-6">
            <span className="inline-block w-8 h-px bg-brand align-middle mr-3" />Studios
          </div>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] max-w-3xl">Two studios. One coastline.</h2>
        </Reveal>
        <Stagger className="grid md:grid-cols-2 gap-6 mt-14">
          {[
            { city: "Calicut", role: "Corporate Head Office", map: "https://www.google.com/maps?q=Calicut,Kerala&output=embed" },
            { city: "Kasaragod", role: "Branch Office", map: "https://www.google.com/maps?q=Kasaragod,Kerala&output=embed" },
          ].map((o) => (
            <motion.div key={o.city} variants={item} className="group bg-background border border-black/5 overflow-hidden">
              <div className="aspect-[16/10] overflow-hidden bg-secondary">
                <iframe src={o.map} title={o.city} loading="lazy" className="w-full h-full grayscale-[40%] group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="p-8 flex items-end justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{o.role}</div>
                  <div className="font-display text-3xl mt-2">{o.city}, Kerala</div>
                </div>
                <Link to="/contact" className="text-xs uppercase tracking-[0.2em] text-ink hover:text-brand inline-flex items-center gap-2">
                  Visit <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </Stagger>
      </section>

      {/* CTA */}
      <section className="container-x mx-auto max-w-7xl pb-28">
        <Reveal className="relative overflow-hidden bg-ink text-white p-12 md:p-20">
          <div className="absolute -right-20 -top-20 w-[420px] h-[420px] rounded-full bg-brand/30 blur-3xl" />
          <div className="relative max-w-3xl">
            <div className="text-xs uppercase tracking-[0.3em] text-white/50 mb-6">Start a project</div>
            <h2 className="font-display text-4xl md:text-6xl text-white leading-[1.05]">
              Have a site, a brief, or just an instinct? Let's talk.
            </h2>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-4 bg-brand text-white text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-ink transition-colors">
                Book a Consultation <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a href="https://wa.me/919539458218" className="inline-flex items-center gap-2 px-7 py-4 border border-white/30 text-white text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white/10 transition-colors">
                Message on WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
