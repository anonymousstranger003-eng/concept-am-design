import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Leaf, Sparkles, Compass, ShieldCheck } from "lucide-react";

import heroWarm from "@/assets/hero-interior-warm.jpg.asset.json";
import coverGreenSofa from "@/assets/cover-green-sofa.jpg.asset.json";
import coverGallery from "@/assets/cover-gallery.jpg.asset.json";
import coverMinimal from "@/assets/cover-minimal.jpg.asset.json";
import founderManoj from "@/assets/founder-manoj.jpg.asset.json";
import founderAswini from "@/assets/founder-aswini.jpg.asset.json";
import plan1 from "@/assets/plan-exterior-1.jpg.asset.json";
import plan2 from "@/assets/plan-exterior-2.jpg.asset.json";
import plan3 from "@/assets/plan-exterior-3.jpg.asset.json";
import plan4 from "@/assets/plan-exterior-4.jpg.asset.json";
import plan5 from "@/assets/plan-exterior-5.jpg.asset.json";
import plan6 from "@/assets/plan-exterior-6.jpg.asset.json";
import interiorLuxe from "@/assets/interior-living-luxe.png.asset.json";
import { Reveal, Stagger, SlideIn, Marquee, WordsReveal, ImageReveal, Parallax, Magnetic, item, itemLeft, itemRight } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { HeroSlider } from "@/components/site/HeroSlider";
import { Testimonials } from "@/components/site/Testimonials";
import { services as staticServices, stats as staticStats } from "@/lib/site-data";
import { useContent, useSection } from "@/hooks/useContent";
import { RichText, toPlainText } from "@/components/site/RichText";
import type { HeroContent, PortfolioItem, TeamMember } from "@/lib/cms-defaults";


export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "AM Concepts Architects & Interiors | Best Architects in Kerala 2026" },
      { name: "description", content: "Award-winning architecture and interior design studio in Kerala. AM Concepts — led by Manoj S Sunder & Ar. Aswini Manoj — designs timeless homes, villas, offices and eco-conscious spaces across Calicut, Kasaragod and India. Book a free 2026 consultation." },
      { name: "keywords", content: "architects in Kerala, interior designers Kerala 2026, best architecture firm Calicut, Kasaragod architects, luxury villa design Kerala, modern home design India, sustainable architecture Kerala, AM Concepts Architects" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: "AM Concepts Architects & Interiors | Kerala's Trusted Design Studio" },
      { property: "og:description", content: "Timeless architecture, bespoke interiors and turnkey execution across Kerala. Founded by Manoj S Sunder & Ar. Aswini Manoj." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: heroWarm.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroWarm.url },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: coverGreenSofa.url, fetchpriority: "high" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ArchitecturalService",
          name: "AM Concepts Architects & Interiors",
          image: heroWarm.url,
          founder: [
            { "@type": "Person", name: "Manoj S Sunder", jobTitle: "Founder & Managing Director" },
            { "@type": "Person", name: "Ar. Aswini Manoj", jobTitle: "Principal Architect & Co-Founder" },
          ],
          areaServed: "Kerala, India",
          telephone: "+91 95394 58218",
          address: [
            { "@type": "PostalAddress", streetAddress: "PRAGATHI, 13/1640, Madhuravanam Road, Civil Station", addressLocality: "Kozhikode", addressRegion: "Kerala", postalCode: "673020", addressCountry: "IN" },
            { "@type": "PostalAddress", streetAddress: "Ali & Son's Complex, 1/136, Chemnad", addressLocality: "Kasaragod", addressRegion: "Kerala", postalCode: "671317", addressCountry: "IN" },
          ],
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "127" },
          sameAs: ["https://wa.me/919539458218"],
        }),
      },
    ],
  }),
});

const portfolioFallback = [
  { title: "Hillside Residence", category: "Plan & Exterior · Calicut", img: plan1.url },
  { title: "Modern Twin Block", category: "Plan & Exterior · Kasaragod", img: plan2.url },
  { title: "Kerala Contemporary", category: "Plan & Exterior · Wayanad", img: plan3.url },
  { title: "Gable Roof Villa", category: "Plan & Exterior · Kannur", img: plan4.url },
  { title: "Luxe Living Interior", category: "Interior Design · Calicut", img: interiorLuxe.url },
  { title: "Courtyard Residence", category: "Plan & Exterior · Malappuram", img: plan5.url },
];

/**
 * Renders an editable hero heading. Authors can use *italic* and **accent**
 * inside the CMS field, and a newline to break the line.
 */
function HeroHeading({ heading }: { heading: string }) {
  const lines = heading.split("\n").filter(Boolean);
  return (
    <h1 className="font-display text-white text-[1.85rem] sm:text-5xl md:text-6xl xl:text-8xl leading-[1.05] md:leading-[1] max-w-5xl tracking-[-0.02em]">
      {lines.map((line, li) => (
        <span key={li} className="block overflow-hidden">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5 + li * 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            {line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, pi) => {
              if (part.startsWith("**") && part.endsWith("**"))
                return (
                  <span key={pi} className="text-brand">
                    {part.slice(2, -2)}
                  </span>
                );
              if (part.startsWith("*") && part.endsWith("*"))
                return (
                  <em key={pi} className="italic text-white/85">
                    {part.slice(1, -1)}
                  </em>
                );
              return <span key={pi}>{part}</span>;
            })}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}


function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const servicesData = useContent<{ items?: typeof staticServices } | typeof staticServices>("services", { items: staticServices });
  const servicesList = Array.isArray(servicesData) ? servicesData : (servicesData?.items ?? staticServices);
  const statsData = useContent<{ items?: typeof staticStats } | typeof staticStats>("stats", { items: staticStats });
  const statsList = Array.isArray(statsData) ? statsData : (statsData?.items ?? staticStats);
  const hero = useSection<HeroContent>("home_hero");
  const team = useSection<{ items: TeamMember[] }>("team");
  const portfolio = useSection<{ items: PortfolioItem[] }>("portfolio");
  const portfolioPreview =
    portfolio.items && portfolio.items.length > 0
      ? portfolio.items.slice(0, 6).map((p) => ({
          title: p.title,
          category: [p.category, p.location].filter(Boolean).join(" · "),
          img: p.img,
        }))
      : portfolioFallback;


  return (
    <div className="overflow-clip">
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[640px] h-[92svh] md:h-[100svh] md:min-h-[720px] w-full overflow-hidden">
        <motion.div style={{ y, scale }} className="absolute inset-0">
          <HeroSlider
            images={[
              { src: coverGreenSofa.url, alt: "Sculptural olive velvet sofa in a wainscoted living room — signature AM Concepts interior" },
              { src: coverGallery.url, alt: "Warm tan leather sofa with curated gallery wall and biophilic accents" },
              { src: coverMinimal.url, alt: "Minimalist Scandinavian living room with sage sofa and walnut coffee table" },
            ]}
            interval={5000}
          />
        </motion.div>

        <div className="relative z-10 h-full container-x mx-auto max-w-7xl flex flex-col justify-center pt-28 sm:pt-32 md:pt-40 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex items-center gap-3 text-white/70 text-[10px] md:text-[11px] uppercase tracking-[0.3em] mb-5 md:mb-6"
          >
            <span className="w-6 md:w-8 h-px bg-white/50" />
            EST. 2020 · KERALA, INDIA
          </motion.div>

          <h1 className="font-display text-white text-[1.85rem] sm:text-5xl md:text-6xl xl:text-8xl leading-[1.05] md:leading-[1] max-w-5xl tracking-[-0.02em]">
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
            className="mt-5 md:mt-7 max-w-xl text-white/85 text-sm md:text-base leading-relaxed"
          >
            At AM Concepts Architects & Interiors, we create timeless architecture and bespoke interiors that combine elegance, functionality, and exceptional craftsmanship.
          </motion.p>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9 }}
            className="mt-8 md:mt-10 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <Link to="/contact" className="group inline-flex items-center gap-3 px-6 md:px-7 py-3.5 md:py-4 bg-brand text-white text-[11px] md:text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-ink transition-colors">
                BOOK  FREE CONSULTATION
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
          <span>15+ yrs</span>
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
          {statsList.map((s, i) => (
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
              text="Our Expertise,"
              className="font-display text-3xl sm:text-4xl md:text-6xl max-w-2xl leading-[1.05] tracking-[-0.02em]"
            />
          </Reveal>
          <Reveal delay={0.15} className="md:max-w-md">
            <p className="text-sm text-muted-foreground mb-6">
              From Concept to completion, AM Concepts Architecture delivers architecture and interior solutions that balance functionality, aesthetics and timeless designs.
            </p>
            <Link to="/services" className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-brand group">
              All services <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {servicesList.slice(0, 6).map((s, i) => (
            <motion.article
              key={s.title}
              variants={i % 2 === 0 ? itemLeft : itemRight}
              className="group bg-background border border-black/5 overflow-hidden flex flex-col"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.3em] text-white/85">
                  0{i + 1} / Service
                </div>
                <ArrowUpRight className="absolute top-4 right-4 w-5 h-5 text-white/80 transition-transform group-hover:rotate-12 group-hover:translate-x-0.5" />
              </div>
              <div className="p-6 md:p-7 relative">
                <h3 className="font-display text-xl md:text-2xl leading-tight">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{s.desc}</p>
                <span className="absolute left-0 bottom-0 h-px w-0 bg-brand group-hover:w-full transition-all duration-700" />
              </div>
            </motion.article>
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

      {/* FOUNDERS */}
      <section className="bg-secondary/50 border-y border-black/5">
        <div className="container-x mx-auto max-w-7xl py-20 md:py-32">
          <div className="max-w-3xl">
            <Reveal>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-brand mb-5 md:mb-6">
                <span className="inline-block w-6 md:w-8 h-px bg-brand align-middle mr-3" />Founders
              </div>
              <WordsReveal
                text="A husband-and-wife studio shaping homes with conviction and craft."
                className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em]"
              />
              <p className="mt-6 text-muted-foreground leading-relaxed max-w-2xl">
                AM Concepts is led by <strong className="text-ink">Manoj S Sunder</strong> and <strong className="text-ink">Ar. Aswini Manoj</strong> — a multidisciplinary duo balancing engineering rigour with design sensitivity. Their shared vision: architecture that is honest to its site, restrained in detail, and built to age beautifully.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-10 mt-12 md:mt-20">
            {[
              { src: founderManoj.url, name: "Manoj S Sunder", role: "Founder & Managing Director", bio: "An engineer-builder at heart, Manoj leads execution, planning and client relationships — ensuring every detail drawn is detail built." },
              { src: founderAswini.url, name: "Ar. Aswini Manoj", role: "Principal Architect & Co-Founder", bio: "Aswini drives the studio's design language — site-led architecture, material honesty, and interiors that feel calm, considered and personal." },
            ].map((f, idx) => (
              <SlideIn key={f.name} from={idx === 0 ? "left" : "right"} delay={idx * 0.1}>
                <div className="group bg-background border border-black/5 overflow-hidden">
                  <div className="overflow-hidden aspect-[4/5]">
                    <Parallax range={20}>
                      <img src={f.src} alt={f.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
                    </Parallax>
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-brand">{f.role}</div>
                    <div className="font-display text-2xl md:text-3xl mt-2 text-ink">{f.name}</div>
                    <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{f.bio}</p>
                  </div>
                </div>
              </SlideIn>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-16 md:mt-20">
            <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-brand mb-5 md:mb-6">
              <span className="inline-block w-6 md:w-8 h-px bg-brand align-middle mr-3" />Our Vision
            </div>
            <WordsReveal
              text={`"Design should feel inevitable — calm, considered, built to outlast trend."`}
              className="font-display italic text-2xl sm:text-3xl md:text-5xl leading-[1.15] max-w-4xl tracking-[-0.015em]"
            />
          </Reveal>

          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-10 md:mt-14">
            {[
              { Icon: Compass, t: "Site-led design", d: "Every project starts with land, light and life around it." },
              { Icon: Leaf, t: "Eco-conscious", d: "Climate-responsive buildings using regional, low-impact materials." },
              { Icon: Sparkles, t: "Crafted detail", d: "Joinery, materiality and lighting resolved to the millimetre." },
              { Icon: ShieldCheck, t: "Integrity", d: "Transparent fees, honest timelines, full documentation." },
            ].map(({ Icon, t, d }) => (
              <motion.div key={t} variants={item} className="p-5 md:p-6 bg-background border border-black/5 group hover:border-brand/40 transition-colors">
                <Icon className="w-5 h-5 text-brand transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110" />
                <div className="font-display text-lg md:text-xl mt-3 md:mt-4">{t}</div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{d}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* OFFICES */}
      <section className="container-x mx-auto max-w-7xl py-20 md:py-40">
        <Reveal>
          <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-brand mb-5 md:mb-6">
            <span className="inline-block w-6 md:w-8 h-px bg-brand align-middle mr-3" />Studios
          </div>
          <WordsReveal
            text="Two studios. One coastline."
            className="font-display text-3xl sm:text-4xl md:text-6xl leading-[1.05] max-w-3xl tracking-[-0.02em]"
          />
        </Reveal>
        <Stagger className="grid md:grid-cols-2 gap-5 md:gap-6 mt-10 md:mt-14">
          {[
            { city: "Calicut", role: "PRAGATHI, 13/1640, Madhuravanam Road, Civil Station, Kozhikode, Kerala 673020", map: "https://www.google.com/maps?q=11.284812,75.7939884&hl=en&z=17&output=embed" },
            { city: "Kasaragod", role: "Ali & Son's Complex, 1/136, Chemnad, Kerala 671317", map: "https://www.google.com/maps?q=12.493856,75.0020172&hl=en&z=17&output=embed" },
          ].map((o) => (
            <motion.div key={o.city} variants={item} className="group bg-background border border-black/5 overflow-hidden">
              <div className="aspect-[16/10] overflow-hidden bg-secondary">
                <iframe src={o.map} title={o.city} loading="lazy" className="w-full h-full grayscale-[40%] group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="p-6 md:p-8 flex items-end justify-between gap-4">
                <div>
                  <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-muted-foreground">{o.role}</div>
                  <div className="font-display text-2xl md:text-3xl mt-2">{o.city}, Kerala</div>
                </div>
                <Link to="/contact" className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-ink hover:text-brand inline-flex items-center gap-2 group/v whitespace-nowrap">
                  Visit <ArrowUpRight className="w-4 h-4 transition-transform group-hover/v:translate-x-0.5 group-hover/v:-translate-y-0.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </Stagger>
      </section>

      {/* CTA */}
      <section className="container-x mx-auto max-w-7xl pb-20 md:pb-28">
        <Reveal className="relative overflow-hidden bg-ink text-white p-8 md:p-20">
          <div className="absolute -right-20 -top-20 w-[320px] md:w-[420px] h-[320px] md:h-[420px] rounded-full bg-brand/30 blur-3xl" />
          <div className="relative max-w-3xl">
            <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/50 mb-5 md:mb-6">Start a project</div>
            <WordsReveal
              text="Have a site, a brief, or just an instinct? Let's talk."
              className="font-display text-3xl sm:text-4xl md:text-6xl text-white leading-[1.05] tracking-[-0.02em]"
            />
            <div className="mt-8 md:mt-10 flex flex-wrap gap-3">
              <Magnetic>
                <Link to="/contact" className="inline-flex items-center gap-2 px-6 md:px-7 py-3.5 md:py-4 bg-brand text-white text-[11px] md:text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-ink transition-colors">
                  Book a Consultation <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Magnetic>
              <a href="https://wa.me/919539458218" className="inline-flex items-center gap-2 px-6 md:px-7 py-3.5 md:py-4 border border-white/30 text-white text-[11px] md:text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white/10 transition-colors">
                Message on WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
