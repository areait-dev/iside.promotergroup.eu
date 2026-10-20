"use client";

import { useState, useSyncExternalStore } from "react";

const REDUCED = "(prefers-reduced-motion: reduce)";

function subscribeMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function motionAllowed() {
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  return !window.matchMedia(REDUCED).matches && !saveData;
}

/** Sfondo video dell'hero: muto, in loop, parte da solo. Con "riduci movimento" o risparmio dati resta il fermo immagine. */
export default function HeroMedia() {
  const [ready, setReady] = useState(false);
  const allowed = useSyncExternalStore(subscribeMotion, motionAllowed, () => false);

  return (
    <>
      <picture>
        <source media="(min-width: 768px)" srcSet="/video/hero-16x9.jpg" />
        <img
          src="/video/hero-9x16.jpg"
          alt=""
          fetchPriority="high"
          className="absolute inset-0 size-full object-cover"
        />
      </picture>
      {allowed && (
        <video
          poster={window.matchMedia("(min-width: 768px)").matches ? "/video/hero-16x9.jpg" : "/video/hero-9x16.jpg"}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={() => setReady(true)}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-(--duration-slower) ease-standard ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <source media="(min-width: 768px)" src="/video/hero-16x9.mp4" type="video/mp4" />
          <source src="/video/hero-9x16.mp4" type="video/mp4" />
        </video>
      )}
    </>
  );
}
