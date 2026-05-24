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
import { Reveal, Stagger, SlideIn, Marquee, WordsReveal, ImageReveal, Parallax, Magnetic, item, itemLeft, itemRight } from "@/components/site/Reveal";
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
      <section ref={heroRef} className="relative h-[92svh] min-h-[560px] md:h-[100svh] md:min-h-[640px] w-full overflow-hidden">
        <motion.div style={{ y, scale }} className="absolute inset-0">
          <img src={hero} alt="Modern architecture" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/75" />
        </motion.div>

        <div className="relative z-10 h-full container-x mx-auto max-w-7xl flex flex-col justify-end pb-16 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex items-center gap-3 text-white/70 text-[10px] md:text-[11px] uppercase tracking-[0.3em] mb-5 md:mb-8"
          >
            <span className="w-6 md:w-8 h-px bg-white/50" />
            Est. 2014 · Kerala, India
          </motion.div>

          <h1 className="font-display text-white text-[2.5rem] sm:text-5xl md:text-7xl xl:text-[7.5rem] leading-[0.95] max-w-5xl tracking-[-0.02em]">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }} animate={{ y: 0 }}
                transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                Architecture that <em className="italic text-white/85">listens</em>.
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }} animate={{ y: 0 }}
                transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                Interiors that <span className="text-brand">last</span>.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.9 }}
            className="mt-6 md:mt-8 max-w-xl text-white/80 text-sm md:text-lg leading-relaxed"
          >
            AM Concepts & Architects — a Kerala-based studio founded by
            Manoj AM, designing residential, commercial and eco-conscious
            spaces with honesty, restraint and craft.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9 }}
            className="mt-8 md:mt-10 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <Link to="/contact" className="group inline-flex items-center gap-3 px-6 md:px-7 py-3.5 md:py-4 bg-brand text-white text-[11px] md:text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-ink transition-colors">
                Book Consultation
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link to="/portfolio" className="group inline-flex items-center gap-3 px-6 md:px-7 py-3.5 md:py-4 glass-dark text-white text-[11px] md:text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white/15 transition-colors">
                View Projects
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Magnetic>
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
      <section className="container-x mx-auto max-w-7xl py-20 md:py-40 grid md:grid-cols-12 gap-8 md:gap-12 items-end">
        <SlideIn from="left" className="md:col-span-7">
          <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-brand mb-5 md:mb-6">
            <span className="inline-block w-6 md:w-8 h-px bg-brand align-middle mr-3" />The Studio
          </div>
          <WordsReveal
            text="A professional architecture and interior design firm — built on honesty, integrity and craft."
            className="font-display text-3xl sm:text-4xl md:text-6xl leading-[1.05] tracking-[-0.02em]"
          />
        </SlideIn>
        <SlideIn from="right" delay={0.15} className="md:col-span-5 md:pl-10">
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            From compact homes to large commercial campuses, every AM Concepts
            project begins the same way — listening. We believe great buildings
            are not decorated, they're considered. Each space is shaped by site,
            climate, client and the quiet discipline of good detailing.
          </p>
          <Link to="/about" className="mt-6 md:mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-brand transition-colors group">
            About the studio <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </SlideIn>
      </section>

      {/* STATS */}
      <section className="border-y border-black/5 bg-secondary/60">
        <div className="container-x mx-auto max-w-7xl py-14 md:py-20 grid grid-cols-2 md:grid-cols-5 gap-y-10">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center md:border-r last:border-r-0 border-black/10">
              <div className="font-display text-4xl md:text-6xl text-ink">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground px-2">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MARQUEE BAND */}
      <section className="py-10 md:py-14 border-b border-black/5 bg-background">
        <Marquee items={["Residential Architecture", "Commercial Design", "Interior Design", "Landscape", "Renovation", "Engineering", "Consultation", "Eco-Conscious Build"]} />
      </section>

      {/* SERVICES */}
      <section className="container-x mx-auto max-w-7xl py-20 md:py-40">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8 mb-12 md:mb-16">
          <Reveal>
            <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-brand mb-5 md:mb-6">
              <span className="inline-block w-6 md:w-8 h-px bg-brand align-middle mr-3" />What we do
            </div>
            <WordsReveal
              text="Twelve disciplines, one design language."
              className="font-display text-3xl sm:text-4xl md:text-6xl max-w-2xl leading-[1.05] tracking-[-0.02em]"
            />
          </Reveal>
          <Reveal delay={0.15}>
            <Link to="/services" className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-brand group">
              All services <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/5 border border-black/5">
          {services.slice(0, 6).map((s, i) => (
            <motion.div
              key={s.title}
              variants={i % 2 === 0 ? itemLeft : itemRight}
              className="group bg-background p-7 md:p-10 hover:bg-ink hover:text-white transition-colors duration-500 relative overflow-hidden"
            >
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground group-hover:text-white/50">
                0{i + 1} / Service
              </div>
              <h3 className="font-display text-xl md:text-3xl mt-5 md:mt-6 leading-tight group-hover:text-white">
                {s.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed group-hover:text-white/70">{s.desc}</p>
              <ArrowUpRight className="absolute top-7 right-7 md:top-8 md:right-8 w-5 h-5 text-foreground/30 group-hover:text-brand transition-transform group-hover:rotate-12" />
              <span className="absolute left-0 bottom-0 h-px w-0 bg-brand group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </Stagger>
      </section>

      {/* PORTFOLIO */}
      <section className="container-x mx-auto max-w-7xl pb-20 md:pb-40">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8 mb-10 md:mb-12">
          <Reveal>
            <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-brand mb-5 md:mb-6">
              <span className="inline-block w-6 md:w-8 h-px bg-brand align-middle mr-3" />Selected works
            </div>
            <WordsReveal
              text="Spaces designed to be lived in, not photographed."
              className="font-display text-3xl sm:text-4xl md:text-6xl max-w-2xl leading-[1.05] tracking-[-0.02em]"
            />
          </Reveal>
          <Reveal delay={0.15}>
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-brand group">
              Full portfolio <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-12 gap-3 md:gap-6">
          {portfolioPreview.map((p, i) => {
            const spans = [
              "col-span-12 md:col-span-7 aspect-[4/3]",
              "col-span-12 md:col-span-5 aspect-[4/3] md:aspect-[4/5]",
              "col-span-6 md:col-span-4 aspect-[3/4]",
              "col-span-6 md:col-span-4 aspect-[3/4]",
              "col-span-12 md:col-span-4 aspect-[4/3] md:aspect-[3/4]",
              "col-span-12 aspect-[16/9] md:aspect-[16/7]",
            ];
            const dir: ("bottom" | "left" | "right")[] = ["bottom", "right", "left", "right", "left", "bottom"];
            return (
              <div key={p.title} className={spans[i]}>
                <a href="/portfolio" className="group relative block w-full h-full overflow-hidden bg-secondary">
                  <ImageReveal
                    src={p.img}
                    alt={p.title}
                    from={dir[i]}
                    className="w-full h-full"
                    imgClassName="transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/0 opacity-90 pointer-events-none" />
                  <div className="absolute left-4 md:left-5 bottom-4 md:bottom-5 right-4 md:right-5 text-white flex items-end justify-between pointer-events-none">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.25em] text-white/70">{p.category}</div>
                      <div className="font-display text-xl md:text-2xl mt-1">{p.title}</div>
                    </div>
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full glass-dark grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* FOUNDER */}
      <section className="bg-secondary/50 border-y border-black/5">
        <div className="container-x mx-auto max-w-7xl py-28 md:py-40 grid md:grid-cols-12 gap-12 items-center">
          <SlideIn from="left" className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={founder} alt="Manoj AM, Founder" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute bottom-0 left-0 right-0 glass p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Founder & Managing Director</div>
                <div className="font-display text-2xl mt-1">Manoj AM</div>
              </div>
            </div>
          </SlideIn>
          <div className="md:col-span-7 md:pl-10">
            <SlideIn from="right">
              <div className="text-xs uppercase tracking-[0.3em] text-brand mb-6">
                <span className="inline-block w-8 h-px bg-brand align-middle mr-3" />Philosophy
              </div>
              <h2 className="font-display text-4xl md:text-5xl leading-[1.1] max-w-xl">
                "Design should feel inevitable — like it could not have been any other way."
              </h2>
            </SlideIn>
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
