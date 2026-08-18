import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal, Stagger, item } from "@/components/site/Reveal";
import { ArrowUpRight } from "lucide-react";
import { useSection } from "@/hooks/useContent";
import type { ServiceItem } from "@/lib/cms-defaults";
import { cmsClass } from "@/lib/cms-style";

export const Route = createFileRoute("/services")({ component: Services });

function Services() {
  const data = useSection<{ items: ServiceItem[] }>("services");
  const services = data.items ?? [];
  return (
    <div>
      <section className="container-x mx-auto max-w-7xl pt-40 pb-20">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.3em] text-brand mb-6">
            <span className="inline-block w-8 h-px bg-brand align-middle mr-3" />Services
          </div>
          <h1 className="font-display text-5xl md:text-7xl leading-[1] max-w-5xl">
            Twelve disciplines. One studio. End-to-end delivery.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            From the first site visit to the final accessory, every stage of your
            project is handled by a coordinated in-house team — no handoffs,
            no missed details.
          </p>
        </Reveal>
      </section>

      <section className="container-x mx-auto max-w-7xl pb-28">
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              variants={item}
              className="group bg-background border border-black/5 overflow-hidden flex flex-col"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  decoding="async"
                  className={`${cmsClass("services", `items.${i}.img`)} absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.3em] text-white/85">
                  {String(i + 1).padStart(2, "0")} / Service
                </div>
                <ArrowUpRight className="absolute top-4 right-4 w-5 h-5 text-white/80 transition-transform group-hover:rotate-12" />
              </div>
              <div className="p-6 md:p-8 relative">
                <h3 className={`${cmsClass("services", `items.${i}.title`)} font-display text-xl md:text-2xl leading-tight`}>{s.title}</h3>
                <p className={`${cmsClass("services", `items.${i}.desc`)} text-sm text-muted-foreground mt-3 leading-relaxed`}>{s.desc}</p>
                <span className="absolute left-0 bottom-0 h-px w-0 bg-brand group-hover:w-full transition-all duration-700" />
              </div>
            </motion.article>
          ))}
        </Stagger>
      </section>

      <section className="container-x mx-auto max-w-7xl pb-28">
        <Reveal className="relative overflow-hidden bg-ink text-white p-12 md:p-20">
          <div className="absolute -right-20 -top-20 w-[420px] h-[420px] rounded-full bg-brand/30 blur-3xl" />
          <div className="relative max-w-3xl">
            <div className="text-xs uppercase tracking-[0.3em] text-white/50 mb-6">Have a brief?</div>
            <h2 className="font-display text-4xl md:text-5xl text-white leading-[1.05]">
              Tell us about the site and we'll come back with a clear scope and timeline.
            </h2>
            <Link to="/contact" className="mt-10 inline-flex items-center gap-2 px-7 py-4 bg-brand text-white text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-ink transition-colors">
              Book a Consultation <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
