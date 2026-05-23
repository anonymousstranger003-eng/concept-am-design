import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Linkedin, Youtube, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.jpeg";

export function Footer() {
  return (
    <footer className="bg-ink text-white/80 mt-32">
      <div className="container-x mx-auto max-w-7xl py-20 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-1 ring-white/10 bg-white">
              <img src={logo} alt="AM Concept" className="w-full h-full object-cover" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-white text-lg">AM Concept</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">India Concepts · Architects & Engineers</div>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/60">
            A professional architecture and interior designing firm providing high-quality
            design services with honesty and integrity. Crafting spaces with character
            across Kerala and beyond.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {[
              { Icon: Instagram, href: "https://instagram.com" },
              { Icon: Facebook, href: "https://facebook.com" },
              { Icon: Linkedin, href: "https://linkedin.com" },
              { Icon: Youtube, href: "https://youtube.com" },
              { Icon: MessageCircle, href: "https://wa.me/919539458218" },
            ].map(({ Icon, href }) => (
              <a key={href} href={href} aria-label={href} className="w-9 h-9 rounded-full border border-white/15 grid place-items-center hover:bg-brand hover:border-brand transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-5">Navigate</div>
          <ul className="space-y-3 text-sm">
            {["About", "Services", "Portfolio", "FAQ", "Contact"].map((l) => (
              <li key={l}>
                <Link to={`/${l.toLowerCase()}`} className="hover:text-white transition-colors">{l}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-5">Studios</div>
          <div className="space-y-5 text-sm">
            <div>
              <div className="text-white font-medium">Corporate Head Office</div>
              <div className="flex items-start gap-2 mt-1 text-white/60"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /> Calicut, Kerala, India</div>
            </div>
            <div>
              <div className="text-white font-medium">Branch Office</div>
              <div className="flex items-start gap-2 mt-1 text-white/60"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /> Kasaragod, Kerala, India</div>
            </div>
            <div className="flex items-center gap-2 text-white/60"><Phone className="w-4 h-4" /> +91 95394 58218</div>
            <div className="flex items-center gap-2 text-white/60"><Mail className="w-4 h-4" /> hello@amconcept.in</div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x mx-auto max-w-7xl py-6 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-white/40">
          <div>© {new Date().getFullYear()} AM Concept & India Concepts Architects and Engineers. All rights reserved.</div>
          <div className="font-display tracking-wide">Designed with intent.</div>
        </div>
      </div>
    </footer>
  );
}
