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
        className="flex gap-16 whitespace-nowrap"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {loop.map((t, i) => (
          <span key={i} className="font-display text-3xl md:text-5xl text-ink/80 flex items-center gap-16">
            {t} <span className="w-2 h-2 rounded-full bg-brand inline-block" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
