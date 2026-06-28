import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const DURATION = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DURATION);
      // ease-out cubic for buttery feel
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setShow(false), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[100] bg-ink text-white grid place-items-center"
        >
          <div className="text-center w-[min(420px,80vw)]">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-3xl md:text-4xl tracking-tight"
            >
              AM Concepts
            </motion.div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.35em] text-white/60">
              Architecture · Interiors
            </div>
            <div className="mt-8 h-px w-full bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-brand"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <div className="mt-3 text-[10px] tabular-nums text-white/40 tracking-[0.25em]">
              {String(Math.round(progress * 100)).padStart(3, "0")}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
