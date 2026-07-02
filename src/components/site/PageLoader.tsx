import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.jpeg";

export function PageLoader() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const DURATION = 1500;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DURATION);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setShow(false), 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            filter: "blur(6px)",
            transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[100] bg-white text-ink overflow-hidden"
          aria-hidden={!show}
          role="status"
          aria-label="Loading AM Concepts Architects & Interiors"
        >
          {/* subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />

          {/* red curtain rises up at exit */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "100%" }}
            exit={{ y: "0%", transition: { duration: 0.9, ease: [0.77, 0, 0.18, 1] } }}
            className="absolute inset-0 bg-brand"
          />

          <div className="relative h-full grid place-items-center">
            <div className="text-center w-[min(460px,84vw)]">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto relative w-20 h-20 md:w-24 md:h-24"
              >
                <motion.div
                  className="absolute inset-0 rounded-full border border-black/10"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: [0.6, 1.35, 1], opacity: [0, 0.4, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                />
                <div className="absolute inset-0 rounded-full overflow-hidden ring-1 ring-black/10 bg-white">
                  <img
                    src={logo}
                    alt="AM Concepts logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Wordmark */}
              <div className="mt-7 overflow-hidden">
                <motion.div
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-3xl md:text-4xl tracking-tight text-ink"
                >
                  AM Concepts
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-2 text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-ink/55"
              >
                Architects &nbsp;·&nbsp; Interiors
              </motion.div>

              {/* progress line */}
              <div className="mt-10 h-px w-full bg-black/10 relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-brand"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px] tabular-nums text-ink/40 tracking-[0.25em] uppercase">
                <span>Loading</span>
                <span>{String(Math.round(progress * 100)).padStart(3, "0")}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
