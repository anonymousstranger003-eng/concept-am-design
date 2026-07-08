import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function HeroSlider({
  images,
  interval = 5000,
}: {
  images: { src: string; alt: string }[];
  interval?: number;
}) {
  const [i, setI] = useState(0);

  // Preload all hero images upfront so transitions feel instant on desktop.
  useEffect(() => {
    images.forEach((im) => {
      const img = new Image();
      img.src = im.src;
    });
  }, [images]);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % images.length), interval);
    return () => clearInterval(t);
  }, [images.length, interval]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      <AnimatePresence mode="sync">
        <motion.img
          key={i}
          src={images[i].src}
          alt={images[i].alt}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={i === 0 ? "high" : "auto"}
          sizes="100vw"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 0.9, scale: 1.01 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 6, ease: "linear" },
          }}
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/15 to-transparent" />
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-20 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Slide ${idx + 1}`}
            className="h-px w-8 md:w-12 bg-white/30 relative overflow-hidden"
          >
            <motion.span
              key={`${idx}-${i}`}
              className="absolute inset-0 bg-white origin-left"
              initial={{ scaleX: idx < i ? 1 : 0 }}
              animate={{ scaleX: idx === i ? 1 : idx < i ? 1 : 0 }}
              transition={{
                duration: idx === i ? interval / 1000 : 0.4,
                ease: "linear",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
