import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal, Stagger, item } from "@/components/site/Reveal";
import { Mail, Phone, MapPin, MessageCircle, Instagram, Facebook, Linkedin, Youtube, ArrowUpRight } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useSupabase } from "@/components/admin/SupabaseProvider";

export const Route = createFileRoute("/contact")({ component: Contact });

function Contact() {
  const s = useSiteSettings();
  const { client } = useSupabase();
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
              onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const payload = {
                  name: String(fd.get("name") || "").trim(),
                  email: String(fd.get("email") || "").trim(),
                  phone: String(fd.get("phone") || "").trim(),
                  location: String(fd.get("location") || "").trim(),
                  projectType: String(fd.get("projectType") || "").trim(),
                  message: String(fd.get("message") || "").trim(),
                };
                // Fire-and-forget persist to CMS (admin sees it in /admin/submissions).
                if (client) {
                  client.from("form_submissions").insert({ form_type: "contact", payload }).then(() => {});
                }
                const text =
                  `*New Enquiry — ${s.siteName ?? "AM Concepts"}*%0A` +
                  `Name: ${payload.name}%0A` +
                  `Email: ${payload.email}%0A` +
                  `Phone: ${payload.phone}%0A` +
                  `Location: ${payload.location}%0A` +
                  `Project Type: ${payload.projectType}%0A` +
                  `Message: ${payload.message}`;
                const wa = s.whatsapp || "919539458218";
                window.open(`https://wa.me/${wa}?text=${text}`, "_blank", "noopener");
                setSent(true);
              }}
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
                <select name="projectType" className="w-full bg-transparent border-b border-black/20 py-3 focus:outline-none focus:border-brand transition-colors">
                  {["Residential Architecture", "Commercial Design", "Interior Design", "Renovation", "Landscape", "Consultation"].map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Tell us about the project</label>
                <textarea name="message" rows={5} className="w-full bg-transparent border-b border-black/20 py-3 focus:outline-none focus:border-brand transition-colors resize-none" placeholder="Site, brief, timelines, anything we should know..." />
              </div>
              <button type="submit" className="inline-flex items-center gap-2 px-7 py-4 bg-ink text-white text-xs uppercase tracking-[0.2em] rounded-full hover:bg-brand transition-colors">
                {sent ? "Opened WhatsApp — send to complete" : "Send Enquiry via WhatsApp"} <ArrowUpRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-muted-foreground">Your enquiry opens in WhatsApp and is delivered directly to our team at {s.phone}.</p>
            </form>
          </Reveal>
        </div>

        <div className="md:col-span-5 space-y-8">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">Direct</div>
            <ul className="space-y-3">
              <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-brand" /> {s.phone}</li>
              <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-brand" /> {s.email}</li>
              <li className="flex items-center gap-3"><MessageCircle className="w-4 h-4 text-brand" /> <a href={`https://wa.me/${s.whatsapp}`} className="hover:text-brand">WhatsApp us</a></li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">Follow</div>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: s.instagram },
                { Icon: Facebook, href: s.facebook },
                { Icon: Linkedin, href: s.linkedin },
                { Icon: Youtube, href: s.youtube },
              ].filter((x) => !!x.href).map(({ Icon, href }, i) => (
                <a key={i} href={href} aria-label={href} className="w-10 h-10 rounded-full border border-black/15 grid place-items-center hover:bg-ink hover:text-white transition-colors"><Icon className="w-4 h-4" /></a>
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
            { city: "Calicut", role: "Corporate Head Office", addr: s.addressCalicut ?? "", lat: 11.284812, lng: 75.7939884, map: s.mapCalicut },
            { city: "Kasaragod", role: "Branch Office", addr: s.addressKasaragod ?? "", lat: 12.493856, lng: 75.0020172, map: s.mapKasaragod },
          ].map((o) => {
            const d = 0.004;
            const bbox = `${o.lng - d}%2C${o.lat - d / 2}%2C${o.lng + d}%2C${o.lat + d / 2}`;
            const src = o.map || `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${o.lat}%2C${o.lng}`;
            const directions = `https://www.google.com/maps/dir/?api=1&destination=${o.lat},${o.lng}`;
            return (
              <motion.div key={o.city} variants={item} className="bg-background border border-black/10 overflow-hidden">
                <div className="aspect-[16/10] bg-secondary">
                  <iframe
                    src={src}
                    title={`${o.city} office location map`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
                <div className="p-8">
                  <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{o.role}</div>
                  <div className="font-display text-2xl mt-2">{o.city}, Kerala</div>
                  <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="w-4 h-4" /> {o.addr}</div>
                  <a
                    href={directions}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-brand hover:underline"
                  >
                    Get directions <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
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
