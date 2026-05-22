import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { faqs } from "@/lib/site-data";

export const Route = createFileRoute("/faq")({ component: FAQ });

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      <section className="container-x mx-auto max-w-7xl pt-40 pb-16">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.3em] text-brand mb-6">
            <span className="inline-block w-8 h-px bg-brand align-middle mr-3" />Frequently asked
          </div>
          <h1 className="font-display text-5xl md:text-7xl leading-[1] max-w-5xl">
            Everything you might want to know before reaching out.
          </h1>
        </Reveal>
      </section>

      <section className="container-x mx-auto max-w-4xl pb-32">
        <div className="border-t border-black/10">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.02}>
                <div className="border-b border-black/10">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-start justify-between gap-6 py-6 text-left group"
                  >
                    <div className="flex gap-6 items-start">
                      <div className="text-xs text-muted-foreground pt-1 tabular-nums">{String(i + 1).padStart(2, "0")}</div>
                      <div className="font-display text-xl md:text-2xl group-hover:text-brand transition-colors">{f.q}</div>
                    </div>
                    <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }} className="shrink-0 mt-1">
                      <Plus className="w-5 h-5" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pl-12 pb-6 pr-10 text-muted-foreground leading-relaxed">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
