import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal, Stagger, item } from "@/components/site/Reveal";
import { Mail, Phone, MapPin, MessageCircle, Instagram, Facebook, Linkedin, Youtube, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/contact")({ component: Contact });

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div>
      <section className="container-x mx-auto max-w-7xl pt-40 pb-16">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.3em] text-brand mb-6">
            <span className="inline-block w-8 h-px bg-brand align-middle mr-3" />Contact
          </div>
          <h1 className="font-display text-5xl md:text-7xl leading-[1] max-w-5xl">
            Let's design something worth living in.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Tell us about your project and we'll get back to you within one
            working day to schedule a discovery call.
          </p>
        </Reveal>
      </section>

      <section className="container-x mx-auto max-w-7xl pb-28 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-7">
          <Reveal>
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="bg-background border border-black/10 p-8 md:p-12 space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Full Name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone / WhatsApp" name="phone" />
                <Field label="Location" name="location" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Project Type</label>
                <select className="w-full bg-transparent border-b border-black/20 py-3 focus:outline-none focus:border-brand transition-colors">
                  {["Residential Architecture", "Commercial Design", "Interior Design", "Renovation", "Landscape", "Consultation"].map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Tell us about the project</label>
                <textarea rows={5} className="w-full bg-transparent border-b border-black/20 py-3 focus:outline-none focus:border-brand transition-colors resize-none" placeholder="Site, brief, timelines, anything we should know..." />
              </div>
              <button type="submit" className="inline-flex items-center gap-2 px-7 py-4 bg-ink text-white text-xs uppercase tracking-[0.2em] rounded-full hover:bg-brand transition-colors">
                {sent ? "Thanks — we'll be in touch" : "Send Inquiry"} <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          </Reveal>
        </div>

        <div className="md:col-span-5 space-y-8">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">Direct</div>
            <ul className="space-y-3">
              <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-brand" /> +91 95394 58218</li>
              <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-brand" /> amconcepts.architects20@gmail.com</li>
              <li className="flex items-center gap-3"><MessageCircle className="w-4 h-4 text-brand" /> <a href="https://wa.me/919539458218" className="hover:text-brand">WhatsApp us</a></li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">Follow</div>
            <div className="flex gap-3">
              {[Instagram, Facebook, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-black/15 grid place-items-center hover:bg-ink hover:text-white transition-colors"><Icon className="w-4 h-4" /></a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x mx-auto max-w-7xl pb-28">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.3em] text-brand mb-6">Studios</div>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.05]">Visit us in Kerala.</h2>
        </Reveal>
        <Stagger className="grid md:grid-cols-2 gap-6 mt-10">
          {[
            { city: "Calicut", role: "Corporate Head Office", addr: "PRAGATHI, 13/1640, Madhuravanam Road, Civil Station, Kozhikode, Kerala 673020", map: "https://www.google.com/maps?q=11.284812,75.7939884&hl=en&z=17&output=embed" },
            { city: "Kasaragod", role: "Branch Office", addr: "Ali & Son's Complex, 1/136, Chemnad, Kerala 671317", map: "https://www.google.com/maps?q=12.493856,75.0020172&hl=en&z=17&output=embed" },
          ].map((o) => (
            <motion.div key={o.city} variants={item} className="bg-background border border-black/10 overflow-hidden">
              <div className="aspect-[16/10] bg-secondary">
                <iframe src={o.map} title={o.city} loading="lazy" className="w-full h-full grayscale-[40%] hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="p-8">
                <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{o.role}</div>
                <div className="font-display text-2xl mt-2">{o.city}, Kerala</div>
                <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="w-4 h-4" /> {o.addr}</div>
              </div>
            </motion.div>
          ))}
        </Stagger>
      </section>
    </div>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">{label}</label>
      <input name={name} type={type} required={required} className="w-full bg-transparent border-b border-black/20 py-3 focus:outline-none focus:border-brand transition-colors" />
    </div>
  );
}
