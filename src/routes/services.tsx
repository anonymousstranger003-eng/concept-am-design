import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal, Stagger, item } from "@/components/site/Reveal";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/site-data";

export const Route = createFileRoute("/services")({ component: Services });

function Services() {
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
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/5 border border-black/5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              variants={item}
              className="group bg-background p-8 md:p-10 hover:bg-ink hover:text-white transition-colors duration-500 relative"
            >
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground group-hover:text-white/50">
                {String(i + 1).padStart(2, "0")} / Service
              </div>
              <h3 className="font-display text-2xl md:text-3xl mt-6 leading-tight group-hover:text-white">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed group-hover:text-white/70">{s.desc}</p>
              <ArrowUpRight className="absolute top-8 right-8 w-5 h-5 text-foreground/30 group-hover:text-brand transition-transform group-hover:rotate-12" />
            </motion.div>
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
