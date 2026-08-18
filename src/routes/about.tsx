import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal, Stagger, SlideIn, item } from "@/components/site/Reveal";
import { motion } from "framer-motion";
import { ArrowUpRight, Award, Leaf, Users, Building2 } from "lucide-react";
import { useSection } from "@/hooks/useContent";
import { RichText, toPlainText } from "@/components/site/RichText";
import type { AboutContent, TeamMember } from "@/lib/cms-defaults";
import { cmsClass } from "@/lib/cms-style";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About AM Concepts | Architecture & Interior Studio in Kerala" },
      {
        name: "description",
        content:
          "Meet the studio behind AM Concepts — founders Manoj S Sunder and Ar. Aswini Manoj, our mission, vision and eco-conscious design philosophy.",
      },
      { property: "og:title", content: "About AM Concepts | Architecture & Interior Studio in Kerala" },
      {
        property: "og:description",
        content: "Our mission, vision and the founders behind AM Concepts Architects & Interiors, Kerala.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function PageHeader({ kicker, title, sub, section = "about" }: { kicker: string; title: string; sub?: string; section?: string }) {
  return (
    <section className="container-x mx-auto max-w-7xl pt-40 pb-20">
      <Reveal>
        <div className={`${cmsClass(section, "eyebrow")} text-xs uppercase tracking-[0.3em] text-brand mb-6`}>
          <span className="inline-block w-8 h-px bg-brand align-middle mr-3" />{kicker}
        </div>
        <h1 className={`${cmsClass(section, "heading")} font-display text-5xl md:text-7xl leading-[1] max-w-5xl`}>{title}</h1>
        {sub && <p className={`${cmsClass(section, "intro")} mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed`}>{sub}</p>}
      </Reveal>
    </section>
  );
}

function About() {
  const about = useSection<AboutContent>("about");
  const team = useSection<{ items: TeamMember[] }>("team");

  return (
    <div>
      <PageHeader kicker={about.eyebrow} title={about.heading} sub={toPlainText(about.intro)} />

      <section className="container-x mx-auto max-w-7xl pb-28 grid md:grid-cols-12 gap-10">
        <Reveal className="md:col-span-7">
          <img
            src={about.image1}
            alt="AM Concepts studio work"
            className={`${cmsClass("about", "image1")} w-full aspect-[4/3] object-cover`}
            loading="lazy"
          />
        </Reveal>
        <div className="md:col-span-5 md:pt-10 space-y-8">
          <Reveal>
            <h3 className="font-display text-3xl">Our mission</h3>
            <RichText html={about.mission} className={`${cmsClass("about", "mission")} mt-3 text-muted-foreground leading-relaxed`} />
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="font-display text-3xl">Our vision</h3>
            <RichText html={about.vision} className={`${cmsClass("about", "vision")} mt-3 text-muted-foreground leading-relaxed`} />
          </Reveal>
          <Reveal delay={0.2}>
            <h3 className="font-display text-3xl">Design philosophy</h3>
            <RichText html={about.philosophy} className={`${cmsClass("about", "philosophy")} mt-3 text-muted-foreground leading-relaxed`} />
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
            {(team.items ?? []).map((f, idx) => (
              <SlideIn key={f.name} from={idx === 0 ? "left" : "right"}>
                <img src={f.photo} alt={f.name} loading="lazy" className={`${cmsClass("team", `items.${idx}.photo`)} w-full aspect-[4/5] object-cover`} />
                <div className="mt-6">
                  <div className={`${cmsClass("team", `items.${idx}.role`)} text-xs uppercase tracking-[0.25em] text-brand`}>{f.role}</div>
                  <h3 className={`${cmsClass("team", `items.${idx}.name`)} font-display text-3xl md:text-4xl mt-2 ${idx === 0 ? "italic tracking-tight" : ""}`}>
                    {f.name}
                  </h3>
                  {f.quote && (
                    <blockquote className={`${cmsClass("team", `items.${idx}.quote`)} mt-4 border-l-2 border-brand pl-4 italic text-foreground/85 leading-relaxed`}>
                      "{f.quote}"
                    </blockquote>
                  )}
                  <RichText
                    html={f.bio}
                    className={`${cmsClass("team", `items.${idx}.bio`)} mt-4 text-muted-foreground leading-relaxed ${
                      idx === 0 ? "first-line:italic first-line:text-foreground/90" : ""
                    }`}
                  />
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
          <img
            src={about.image2}
            alt="Architectural blueprints and construction drawings by AM Concepts"
            className={`${cmsClass("about", "image2")} w-full aspect-[16/8] object-cover`}
            loading="lazy"
          />
        </Reveal>
      </section>
    </div>
  );
}
