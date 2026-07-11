import { motion, type Variants, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export function Reveal({
  children, delay = 0, className, as: As = "div",
}: { children: ReactNode; delay?: number; className?: string; as?: any }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      <As>{children}</As>
    </motion.div>
  );
}

type Dir = "left" | "right" | "up" | "down";
const offsets: Record<Dir, { x?: number; y?: number }> = {
  left:  { x: -80 },
  right: { x: 80 },
  up:    { y: 60 },
  down:  { y: -60 },
};

export function SlideIn({
  children, from = "left", delay = 0, className, distance,
}: { children: ReactNode; from?: Dir; delay?: number; className?: string; distance?: number }) {
  const base = offsets[from];
  const scaled = distance
    ? { x: base.x ? Math.sign(base.x) * distance : 0, y: base.y ? Math.sign(base.y) * distance : 0 }
    : base;
  return (
    <motion.div
      initial={{ opacity: 0, ...scaled }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export const itemLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export const itemRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const loop = [...items, ...items, ...items];
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="flex gap-10 md:gap-16 whitespace-nowrap"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {loop.map((t, i) => (
          <span key={i} className="font-display italic text-2xl md:text-5xl text-ink/80 flex items-center gap-10 md:gap-16">
            {t} <span className="w-1.5 h-1.5 rounded-full bg-brand inline-block" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/** Word-by-word mask reveal — premium editorial feel without flashy colours. */
export function WordsReveal({
  text, className, delay = 0, as: As = "h2",
}: { text: string; className?: string; delay?: number; as?: any }) {
  const words = text.split(" ");
  return (
    <As className={className}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.045, delayChildren: delay }}
        className="inline"
      >
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "110%", opacity: 0 },
                visible: { y: "0%", opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              {w}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </As>
  );
}

/** Clip-path reveal for images — cinematic curtain entrance with reliable fallback. */
export function ImageReveal({
  src, alt, className, imgClassName, from = "bottom", eager = false,
}: { src: string; alt: string; className?: string; imgClassName?: string; from?: "bottom" | "left" | "right"; eager?: boolean }) {
  const clip = {
    bottom: { hidden: "inset(0 0 100% 0)", visible: "inset(0 0 0% 0)" },
    left:   { hidden: "inset(0 100% 0 0)", visible: "inset(0 0% 0 0)" },
    right:  { hidden: "inset(0 0 0 100%)", visible: "inset(0 0 0 0%)" },
  }[from];
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      {/* Base image — always rendered so it never stays hidden if the observer misses */}
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover ${imgClassName ?? ""}`}
      />
      {/* Overlay curtain that wipes away on scroll */}
      <motion.div
        aria-hidden
        initial={{ clipPath: clip.visible === "inset(0 0 0% 0)" ? "inset(0 0 0 0)" : clip.visible }}
        whileInView={{ clipPath: "inset(100% 0 0 0)" }}
        viewport={{ once: true, amount: 0.01, margin: "0px 0px 5% 0px" }}
        transition={{ duration: 1, ease: [0.77, 0, 0.18, 1], delay: 0.05 }}
        className="absolute inset-0 bg-secondary"
        style={{
          clipPath: from === "left" ? "inset(0 0 0 0)" : from === "right" ? "inset(0 0 0 0)" : "inset(0 0 0 0)",
        }}
      />
    </div>
  );
}


/** Subtle scroll-driven parallax wrapper. */
export function Parallax({
  children, range = 60, className,
}: { children: ReactNode; range?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [range, -range]), { stiffness: 80, damping: 20, mass: 0.4 });
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/** Magnetic hover — subtle attractor for buttons / icons. */
export function Magnetic({ children, className, strength = 18 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={`inline-block ${className ?? ""}`}
      onMouseMove={(e) => {
        const el = ref.current; if (!el) return;
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${(x / r.width) * strength}px, ${(y / r.height) * strength}px)`;
      }}
      onMouseLeave={() => { if (ref.current) ref.current.style.transform = "translate(0,0)"; }}
      style={{ transition: "transform 400ms cubic-bezier(0.22,1,0.36,1)" }}
    >
      {children}
    </div>
  );
}

