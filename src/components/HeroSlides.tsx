"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";

const REDUCED = "(prefers-reduced-motion: reduce)";
const INTERVAL_MS = 5000;

/** `position`: object-position CSS per scegliere quale parte della foto resta visibile nel ritaglio (es. "50% 75%"). */
export type Slide = { src: string; alt: string; position?: string };

function subscribeMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** Sfondo dell'hero: foto a rotazione: la nuova appare sopra la precedente, che resta piena finché non è coperta (niente buco sul fondo). Con "riduci movimento" resta ferma sulla prima. */
export default function HeroSlides({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const prev = (index + slides.length - 1) % slides.length;
  const reduced = useSyncExternalStore(subscribeMotion, () => window.matchMedia(REDUCED).matches, () => false);

  useEffect(() => {
    if (reduced || slides.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduced, slides.length]);

  return (
    <div className="absolute inset-0 z-0">
      {slides.map((s, i) => (
        <Image
          key={s.src}
          src={s.src}
          alt={s.alt}
          aria-hidden={i !== index}
          fill
          priority={i === 0}
          sizes="100vw"
          style={s.position ? { objectPosition: s.position } : undefined}
          className={`object-cover transition-opacity duration-[1200ms] ease-standard ${
            i === index ? "z-20 opacity-100" : i === prev ? "z-10 opacity-100" : "z-0 opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
