import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import logo from "@/assets/logo.jpeg";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const s = useSiteSettings();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-[0_1px_0_rgba(0,0,0,0.04)]" : "bg-transparent"
      }`}
    >
      <nav className="container-x mx-auto max-w-7xl flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-full overflow-hidden ring-1 ring-black/10 bg-white">
            <img src={logo} alt={`${s.siteName} logo`} className="w-full h-full object-cover" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-[17px] font-semibold tracking-tight text-ink">
              {s.siteName}
            </div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mt-0.5">
              {s.tagline}
            </div>
          </div>
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => {
            const active = location.pathname === l.to;
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="relative px-4 py-2 text-sm tracking-wide text-foreground/80 hover:text-foreground transition-colors"
                >
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-3 right-3 -bottom-0.5 h-px bg-brand"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 text-foreground/60">
            <a href="https://www.instagram.com/am_concepts_architects?utm_source=qr" aria-label="Instagram" className="hover:text-brand transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="https://www.facebook.com/share/1EjoTL5Ueh/?mibextid=wwXIfr" aria-label="Facebook" className="hover:text-brand transition-colors"><Facebook className="w-4 h-4" /></a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-brand transition-colors"><Linkedin className="w-4 h-4" /></a>
            <a href="https://youtube.com/@amconceptsarchitects?si=x6iK5KQd9sNDdj63" aria-label="YouTube" className="hover:text-brand transition-colors"><Youtube className="w-4 h-4" /></a>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center px-5 py-2.5 text-xs uppercase tracking-[0.18em] bg-ink text-white hover:bg-brand transition-colors rounded-full"
          >
            Book Consultation
          </Link>
        </div>

        <button
          aria-label="Open menu"
          className="lg:hidden p-2 -mr-2 text-foreground"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden glass border-t border-black/5"
          >
            <ul className="container-x mx-auto max-w-7xl py-6 flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link to={l.to} className="block py-3 text-xl font-display border-b border-black/5">
                    {l.label}
                  </Link>
                </motion.li>
              ))}
              <li className="pt-4">
                <Link to="/contact" className="inline-flex w-full justify-center items-center px-5 py-3 text-xs uppercase tracking-[0.18em] bg-ink text-white rounded-full">
                  Book Consultation
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
