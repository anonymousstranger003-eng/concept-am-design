import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal, Stagger, SlideIn, item } from "@/components/site/Reveal";
import { motion } from "framer-motion";
import { ArrowUpRight, Award, Leaf, Users, Building2 } from "lucide-react";
import founderManoj from "@/assets/founder-manoj.jpg.asset.json";
import founderAswini from "@/assets/founder-aswini.jpg.asset.json";
import aboutBlueprints from "@/assets/about-blueprints.jpg.asset.json";
import aboutLounge from "@/assets/about-lounge.jpg.asset.json";
import villa from "@/assets/exterior-villa.jpeg";

export const Route = createFileRoute("/about")({ component: About });

function PageHeader({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <section className="container-x mx-auto max-w-7xl pt-40 pb-20">
      <Reveal>
        <div className="text-xs uppercase tracking-[0.3em] text-brand mb-6">
          <span className="inline-block w-8 h-px bg-brand align-middle mr-3" />{kicker}
        </div>
        <h1 className="font-display text-5xl md:text-7xl leading-[1] max-w-5xl">{title}</h1>
        {sub && <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">{sub}</p>}
      </Reveal>
    </section>
  );
}

function About() {
  return (
    <div>
      <PageHeader
        kicker="About the studio"
        title="A Kerala studio designing buildings that feel honest, calm and built to last."
        sub="AM Concepts & Architects has been quietly shaping homes, workplaces and public buildings across Kerala since 2020 — led by founder Manoj S Sunder & Ar Aswini Manoj."
      />

      <section className="container-x mx-auto max-w-7xl pb-28 grid md:grid-cols-12 gap-10">
        <Reveal className="md:col-span-7">
          <img src={aboutLounge.url} alt="AM Concepts outdoor lounge with stone walls and warm timber" className="w-full aspect-[4/3] object-cover" loading="lazy" />
        </Reveal>
        <div className="md:col-span-5 md:pt-10 space-y-8">
          <Reveal>
            <h3 className="font-display text-3xl">Our mission</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              To deliver architecture and interiors of high quality with honesty and
              integrity — buildings that perform, weather and age beautifully.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="font-display text-3xl">Our vision</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              To be Kerala's most trusted architecture and engineering studio — known
              for restraint, craft and a deeply personal client relationship.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <h3 className="font-display text-3xl">Design philosophy</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Site first. Material truth. Quiet detailing. We design slow,
              build precisely, and avoid trends that won't survive a decade.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-secondary/50 border-y border-black/5">
        <div className="container-x mx-auto max-w-7xl py-28">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.3em] text-brand mb-6">Founders</div>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05] max-w-3xl">
              The minds behind AM Concepts.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-10 md:gap-14 mt-16">
            {[
              { src: founderManoj.url, name: "Manoj S Sunder", role: "Chief Interior Designer · Founder", quote: "", bio: "Interior design is more than arranging furniture and selecting finishes — it is about creating spaces that enhance the way people live, work, and experience their surroundings. A B.Sc. Interior Designing graduate from Alagappa University with over 15 years of experience in interior design and execution, Manoj believes every project is unique and every client has a distinct vision. His approach is to understand those aspirations and transform them into thoughtfully designed spaces that are functional, comfortable, and visually appealing — through a balance of creativity, practicality, quality, and attention to detail. From concept development and space planning to custom furniture design and project execution, he is committed to delivering interiors that reflect each client's personality and lifestyle.", pillars: [] as { t: string; d: string }[] },
              { src: founderAswini.url, name: "Ar. Aswini Manoj", role: "Principal Architect & Co-Founder", quote: "Architecture, to me, is the art of creating spaces that quietly shape the way people live, work, and feel. I believe good design is not just seen — it is experienced through light, proportion, detail, and emotion.", bio: "Graduated with a strong passion for architecture and design thinking, inspired by the academic foundation of Srinivas School of Architecture and enriched through years of experience in residential and commercial projects.", pillars: [
                { t: "Vision", d: "Designing timeless spaces rooted in simplicity, context, and human connection." },
                { t: "Detail", d: "A thoughtful focus on planning, materials, natural light, and refined architectural detailing." },
                { t: "Care", d: "Creating client-centric, sustainable, and meaningful spaces with care at every scale." },
              ] },
            ].map((f, idx) => (
              <SlideIn key={f.name} from={idx === 0 ? "left" : "right"}>
                <img src={f.src} alt={f.name} loading="lazy" className="w-full aspect-[4/5] object-cover" />
                <div className="mt-6">
                  <div className="text-xs uppercase tracking-[0.25em] text-brand">{f.role}</div>
                  <h3 className="font-display text-3xl md:text-4xl mt-2">{f.name}</h3>
                  {f.quote && (
                    <blockquote className="mt-4 border-l-2 border-brand pl-4 italic text-foreground/85 leading-relaxed">
                      "{f.quote}"
                    </blockquote>
                  )}
                  <p className="mt-4 text-muted-foreground leading-relaxed">{f.bio}</p>
                  {f.pillars.length > 0 && (
                    <dl className="mt-6 grid gap-3">
                      {f.pillars.map((p) => (
                        <div key={p.t} className="flex gap-3">
                          <dt className="shrink-0 text-[10px] uppercase tracking-[0.25em] text-brand font-semibold pt-1 w-16">{p.t}</dt>
                          <dd className="text-sm text-muted-foreground leading-relaxed">{p.d}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              </SlideIn>
            ))}
          </div>

          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {[
              { Icon: Award, t: "15+ years", d: "Designing across Kerala" },
              { Icon: Building2, t: "150+ projects", d: "Residential & commercial" },
              { Icon: Users, t: "Multidisciplinary", d: "Architecture, interiors, engineering" },
              { Icon: Leaf, t: "Eco-committed", d: "Climate-responsive design" },
            ].map(({ Icon, t, d }) => (
              <motion.div key={t} variants={item} className="p-6 bg-background border border-black/5">
                <Icon className="w-5 h-5 text-brand" />
                <div className="font-display text-xl mt-3">{t}</div>
                <div className="text-sm text-muted-foreground mt-1">{d}</div>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="container-x mx-auto max-w-7xl py-28">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.3em] text-brand mb-6">Eco-conscious</div>
          <h2 className="font-display text-4xl md:text-5xl max-w-3xl leading-[1.05]">
            Sustainability isn't a feature we add. It's the discipline we design from.
          </h2>
        </Reveal>
        <Stagger className="grid md:grid-cols-3 gap-px bg-black/5 border border-black/5 mt-14">
          {[
            { t: "Passive design", d: "Orientation, cross-ventilation and shading before mechanical cooling." },
            { t: "Regional materials", d: "Laterite, terracotta, regional hardwoods sourced and crafted locally." },
            { t: "Low-VOC interiors", d: "Healthier indoor air through careful material specification." },
          ].map((s) => (
            <motion.div key={s.t} variants={item} className="bg-background p-10">
              <div className="font-display text-2xl">{s.t}</div>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{s.d}</p>
            </motion.div>
          ))}
        </Stagger>
        <Reveal delay={0.2} className="mt-16">
          <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-4 bg-ink text-white text-xs uppercase tracking-[0.2em] rounded-full hover:bg-brand transition-colors">
            Start a project <ArrowUpRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </section>

      <section className="container-x mx-auto max-w-7xl pb-28">
        <Reveal>
          <img src={aboutBlueprints.url} alt="Architectural blueprints and construction drawings by AM Concepts" className="w-full aspect-[16/8] object-cover" loading="lazy" />
        </Reveal>
      </section>
    </div>
  );
}
