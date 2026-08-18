import { cmsClass } from "@/lib/cms-style";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function HeroSlider({
  images,
  interval = 5000,
  onIndexChange,
}: {
  images: { src: string; alt: string; position?: string }[];
  interval?: number;
  onIndexChange?: (i: number) => void;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    onIndexChange?.(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);

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
          style={{ objectPosition: images[i].position?.trim() || "center" }}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1.01 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 7, ease: "linear" },
          }}
          className={`${cmsClass("home_hero", `slides.${i}.src`)} absolute inset-0 w-full h-full object-cover will-change-transform`}
        />
      </AnimatePresence>
      {/* Subtle vignette — keeps the image bright and highlighted while text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-transparent" />

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
