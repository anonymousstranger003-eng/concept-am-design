import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function HeroSlider({ images, interval = 5500 }: { images: { src: string; alt: string }[]; interval?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % images.length), interval);
    return () => clearInterval(t);
  }, [images.length, interval]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.img
          key={i}
          src={images[i].src}
          alt={images[i].alt}
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1.04 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.4, ease: [0.22, 1, 0.36, 1] }, scale: { duration: 8, ease: "linear" } }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/80" />
      {/* Slide indicators */}
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-20 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Slide ${idx + 1}`}
            className="h-px w-8 md:w-12 bg-white/30 relative overflow-hidden"
          >
            <motion.span
              className="absolute inset-0 bg-white origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: idx === i ? 1 : idx < i ? 1 : 0 }}
              transition={{ duration: idx === i ? interval / 1000 : 0.3, ease: "linear" }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
