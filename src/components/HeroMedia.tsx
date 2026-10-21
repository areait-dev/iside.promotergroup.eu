"use client";

import { useState } from "react";

/**
 * Sfondo video dell'hero: muto, in loop, parte sempre da solo su ogni dispositivo
 * (anche con "riduci movimento" o risparmio dati attivi, per scelta del cliente).
 * Sotto c'è il fermo immagine, visibile finché il video non è pronto.
 */
export default function HeroMedia() {
  const [ready, setReady] = useState(false);

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
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        onCanPlay={(e) => {
          setReady(true);
          // Alcuni browser non avviano l'autoplay se la pagina è già idratata: lo forziamo.
          e.currentTarget.play().catch(() => {});
        }}
        className={`absolute inset-0 size-full object-cover transition-opacity duration-(--duration-slower) ease-standard ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        <source media="(min-width: 768px)" src="/video/hero-16x9.mp4" type="video/mp4" />
        <source src="/video/hero-9x16.mp4" type="video/mp4" />
      </video>
    </>
  );
}
