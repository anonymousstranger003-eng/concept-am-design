import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import logo from "@/assets/logo.jpeg";

const MIN_DISPLAY_MS = 2100;
const READY_FALLBACK_MS = 5000;

export function PageLoader() {
  const [show, setShow] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [minimumElapsed, setMinimumElapsed] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const markReady = () => setIsReady(true);
    const minimumTimer = setTimeout(() => setMinimumElapsed(true), MIN_DISPLAY_MS);
    const fallbackTimer = setTimeout(markReady, READY_FALLBACK_MS);

    if (document.readyState === "complete") {
      markReady();
    } else {
      window.addEventListener("load", markReady, { once: true });
    }

    return () => {
      clearTimeout(minimumTimer);
      clearTimeout(fallbackTimer);
      window.removeEventListener("load", markReady);
    };
  }, []);

  useEffect(() => {
    if (isReady && minimumElapsed) setShow(false);
  }, [isReady, minimumElapsed]);

  const reduced = reduceMotion === true;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 0 }}
          exit={{
            y: reduced ? 0 : "-100%",
            opacity: reduced ? 0 : 1,
            transition: {
              duration: reduced ? 0.2 : 0.9,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-[100] overflow-hidden bg-white text-ink"
          role="status"
          aria-label="Loading AM Concepts Architects and Interiors"
          aria-live="polite"
        >
          <div className="grid h-full place-items-center px-6">
            <motion.div
              initial={{ y: reduced ? 0 : "75vh" }}
              animate={{ y: 0 }}
              transition={{ duration: reduced ? 0 : 1.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                animate={reduced ? { scale: 1 } : { scale: [1, 1.018, 1] }}
                transition={{ duration: 2.8, delay: 1.15, repeat: Infinity, ease: "easeInOut" }}
                className="h-28 w-28 overflow-hidden rounded-full md:h-32 md:w-32"
              >
                <img src={logo} alt="AM Concepts logo" className="h-full w-full object-cover" />
              </motion.div>

              <div className="mt-7 font-sans text-2xl font-semibold text-ink md:text-3xl">
                AM Concepts
              </div>
              <div className="mt-2 font-sans text-[10px] uppercase tracking-[0.22em] text-ink/55 md:text-xs">
                Architects · Interiors
              </div>

            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
