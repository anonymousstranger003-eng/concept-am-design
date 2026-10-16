import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Youtube,
} from "lucide-react";
import logo from "@/assets/logo.jpeg";
import { useSection } from "@/hooks/useContent";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import type { FooterContent } from "@/lib/cms-defaults";
import { cmsClass } from "@/lib/cms-style";

export function Footer() {
  const s = useSiteSettings();
  const f = useSection<FooterContent>("footer");

  const socials = [
    { Icon: Instagram, href: s.instagram },
    { Icon: Facebook, href: s.facebook },
    { Icon: Linkedin, href: s.linkedin },
    { Icon: Youtube, href: s.youtube },
    {
      Icon: MessageCircle,
      href: s.whatsapp ? `https://wa.me/${s.whatsapp}` : undefined,
    },
  ].filter((item): item is { Icon: typeof Instagram; href: string } => !!item.href);

  return (
    <footer className="mt-32 bg-ink text-white/80">
      <div className="container-x mx-auto grid max-w-7xl grid-cols-1 gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-full bg-white ring-1 ring-white/10">
              <img
                src={logo}
                alt={s.siteName ?? "AM Concepts"}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg text-white">{s.siteName}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                {s.tagline?.toUpperCase()}&nbsp;
              </div>
            </div>
          </div>

          <p
            className={`${cmsClass("footer", "tagline")} mt-6 max-w-md text-sm leading-relaxed text-white/60`}
          >
            {f.tagline}
          </p>

          <div className="mt-6 flex items-center gap-3">
            {socials.map(({ Icon, href }) => (
              <a
                key={href}
                href={href}
                aria-label={href}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 transition-colors hover:border-brand hover:bg-brand"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-3">
          {(f.columns ?? []).map((col, ci) => (
            <div key={col.title} className="mb-8 last:mb-0">
              <div
                className={`${cmsClass("footer", `columns.${ci}.title`)} mb-5 text-xs uppercase tracking-[0.2em] text-white/40`}
              >
                {col.title}
              </div>
              <ul className="space-y-3 text-sm">
                {(col.links ?? []).map((link, li) => (
                  <li key={`${col.title}-${link.href}`}>
                    <Link
                      to={link.href as "/"}
                      className={`${cmsClass("footer", `columns.${ci}.links.${li}.label`)} transition-colors hover:text-white`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="md:col-span-4">
          <div className="mb-5 text-xs uppercase tracking-[0.2em] text-white/40">
            Studios
          </div>
          <div className="space-y-5 text-sm">
            <div>
              <div className="font-medium text-white">Corporate Head Office</div>
              <div className="mt-1 flex items-start gap-2 text-white/60">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                {s.addressCalicut}
              </div>
            </div>
            <div>
              <div className="font-medium text-white">Branch Office</div>
              <div className="mt-1 flex items-start gap-2 text-white/60">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                {s.addressKasaragod}
              </div>
            </div>
            <a
              href={s.phone ? `tel:${s.phone}` : undefined}
              className="flex items-center gap-2 text-white/60 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4 shrink-0" />
              <span>{s.phone}</span>
            </a>
            <a
              href="https://wa.me/919074458218"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/60 transition-colors hover:text-white"
              aria-label="Contact us on WhatsApp at +91 90744 58218"
            >
              <MessageCircle className="h-4 w-4 shrink-0" />
              <span>+91 90744 58218 (WhatsApp)</span>
            </a>
            <a
              href={s.email ? `mailto:${s.email}` : undefined}
              className="flex items-center gap-2 text-white/60 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4 shrink-0" />
              <span>{s.email}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 py-6 text-xs text-white/40 md:flex-row">
          <div>
            © {new Date().getFullYear()} {s.siteName}. All rights reserved.
          </div>
          <div className={`${cmsClass("footer", "credits")} font-display tracking-wide`}>
            {f.credits}
          </div>
        </div>
      </div>
    </footer>
  );
}
