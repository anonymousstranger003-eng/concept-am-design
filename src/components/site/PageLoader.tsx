```tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.jpeg";

export function PageLoader() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    let hideTimer: ReturnType<typeof setTimeout>;

    const start = performance.now();
    const DURATION = 1800;

    const tick = (time: number) => {
      const elapsed = Math.min(1, (time - start) / DURATION);
      const eased = 1 - Math.pow(1 - elapsed, 3);

      setProgress(eased);

      if (elapsed < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        hideTimer = setTimeout(() => setShow(false), 400);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-[100] overflow-hidden bg-white text-ink"
          role="status"
          aria-label="Loading AM Concepts Architects and Interiors"
        >
          {/* Minimal architectural background grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />

          {/* Fine red line at the bottom */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress }}
            transition={{ duration: 0.15, ease: "linear" }}
          />

          {/* Centred splash */}
          <div className="relative z-10 grid h-full place-items-center px-6">
            <div className="flex flex-col items-center text-center">
              {/* Existing logo image — preserved */}
              <motion.div
                initial={{
                  y: 100,
                  opacity: 0,
                  scale: 0.88,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                  scale: [0.96, 1.025, 0.99, 1],
                }}
                transition={{
                  y: {
                    duration: 0.95,
                    delay: 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  },
                  opacity: {
                    duration: 0.7,
                    delay: 0.1,
                  },
                  scale: {
                    duration: 1.6,
                    delay: 0.65,
                    ease: "easeInOut",
                  },
                }}
                className="relative h-20 w-20 md:h-24 md:w-24"
              >
                {/* Soft surrounding ring */}
                <motion.div
                  className="absolute -inset-3 rounded-full border border-black/[0.08]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: [0.2, 0.55, 0.2],
                    scale: [0.96, 1.04, 0.96],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Logo container */}
                <div className="relative h-full w-full overflow-hidden rounded-full bg-white ring-1 ring-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.07)]">
                  <img
                    src={logo}
                    alt="AM Concepts logo"
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Wordmark rises into view */}
              <div className="mt-8 overflow-hidden">
                <motion.div
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.85,
                    delay: 0.35,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-display text-3xl tracking-tight text-ink md:text-4xl"
                >
                  AM Concepts
                </motion.div>
              </div>

              {/* Subtle descriptor */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.65,
                  delay: 0.65,
                  ease: "easeOut",
                }}
                className="mt-3 text-[10px] uppercase tracking-[0.35em] text-ink/50 md:text-[11px]"
              >
                Architects · Interiors
              </motion.div>

              {/* Restrained loading indicator */}
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 100 }}
                transition={{
                  duration: 0.6,
                  delay: 0.65,
                  ease: "easeOut",
                }}
                className="mt-9 h-px bg-black/10"
              >
                <motion.div
                  className="h-full origin-left bg-brand"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: progress }}
                  transition={{ duration: 0.12, ease: "linear" }}
                />
              </motion.div>
            </div>
          </div>

          {/* Red curtain sweeps upward as the splash exits */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "100%" }}
            exit={{
              y: "0%",
              transition: {
                duration: 0.85,
                ease: [0.76, 0, 0.24, 1],
              },
            }}
            className="absolute inset-0 z-20 bg-brand pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```
