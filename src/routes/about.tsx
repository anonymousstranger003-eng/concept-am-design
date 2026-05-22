import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal, Stagger, item } from "@/components/site/Reveal";
import { motion } from "framer-motion";
import { ArrowUpRight, Award, Leaf, Users, Building2 } from "lucide-react";
import founder from "@/assets/founder.jpg";
import blueprints from "@/assets/blueprints.jpg";
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
        sub="AM Concept & India Concepts Architects and Engineers has been quietly shaping homes, workplaces and public buildings across Kerala since 2014 — led by founder Manuji M."
      />

      <section className="container-x mx-auto max-w-7xl pb-28 grid md:grid-cols-12 gap-10">
        <Reveal className="md:col-span-7">
          <img src={blueprints} alt="Working drawings" className="w-full aspect-[4/3] object-cover" loading="lazy" />
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
        <div className="container-x mx-auto max-w-7xl py-28 grid md:grid-cols-12 gap-12 items-center">
          <Reveal className="md:col-span-5">
            <img src={founder} alt="Manuji M" className="w-full aspect-[4/5] object-cover" loading="lazy" />
          </Reveal>
          <div className="md:col-span-7">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.3em] text-brand mb-6">Founder</div>
              <h2 className="font-display text-5xl md:text-6xl leading-[1.05]">Manuji M</h2>
              <div className="mt-2 text-muted-foreground">Founder & Managing Director</div>
              <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-xl">
                With over a decade of design and execution experience across Kerala,
                Manuji leads the studio with a quiet conviction — that good
                architecture should serve, not perform. Under his direction, AM
                Concept has grown into a multidisciplinary practice working on
                residential, commercial and eco-conscious projects.
              </p>
            </Reveal>
            <Stagger className="grid sm:grid-cols-2 gap-6 mt-12">
              {[
                { Icon: Award, t: "11+ years", d: "Designing across Kerala" },
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
          <img src={villa} alt="Hillside villa" className="w-full aspect-[16/8] object-cover" loading="lazy" />
        </Reveal>
      </section>
    </div>
  );
}
