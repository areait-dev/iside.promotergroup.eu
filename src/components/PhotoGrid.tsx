"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon, CloseIcon } from "./icons";

export type Photo = { src: string; w: number; h: number; alt: string; cls: string };

const PAGE_MAX = 1200;

const step = (i: number | null, delta: number, count: number) => (i === null ? i : (i + delta + count) % count);

/**
 * `sizes` dal layout reale: 2 colonne su mobile (col-span-2 = tutta la riga), 6 colonne da 768px
 * con lo span indicato in `cls` (md:col-span-N), contenuto largo al massimo 1200px.
 */
function sizesFor(cls: string) {
  const span = Number(/md:col-span-(\d)/.exec(cls)?.[1] ?? 6);
  const mobile = /(^|\s)col-span-2(\s|$)/.test(cls) ? "100vw" : "50vw";
  const wide = Math.round((span / 6) * PAGE_MAX);
  return `(min-width: 1280px) ${wide}px, (min-width: 768px) ${Math.round((span / 6) * 100)}vw, ${mobile}`;
}

/**
 * Galleria con lightbox accessibile su `<dialog>`.
 * - `grid` (default): a righe, 2 colonne su mobile e 6 da 768px; `cls` porta span e aspect.
 * - `strip`: una sola riga che scorre in orizzontale (per molte foto: la pagina non si allunga); `cls` non serve.
 */
export default function PhotoGrid({
  photos,
  label,
  className = "",
  layout = "grid",
}: {
  photos: Photo[];
  label: string;
  className?: string;
  layout?: "grid" | "strip";
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;
  const count = photos.length;

  const [edge, setEdge] = useState({ start: true, end: false });

  // Le frecce compaiono solo se c'è altro da vedere da quel lato.
  const measureStrip = () => {
    const el = stripRef.current;
    if (!el) return;
    const start = el.scrollLeft <= 4;
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    setEdge((e) => (e.start === start && e.end === end ? e : { start, end }));
  };
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const ro = new ResizeObserver(measureStrip);
    ro.observe(el);
    return () => ro.disconnect();
  });

  const scrollStrip = (dir: 1 | -1) => {
    const el = stripRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * (el.clientWidth + 16), behavior: reduce ? "auto" : "smooth" });
  };

  const show = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const go = (delta: number) => setIndex((i) => step(i, delta, count));

  // Frecce da tastiera; Esc è gestito dal <dialog>. Il focus torna al pulsante della foto alla chiusura.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIndex((i) => step(i, 1, count));
      else if (e.key === "ArrowLeft") setIndex((i) => step(i, -1, count));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, count]);

  // Swipe orizzontale nel lightbox (telefono e tablet): oltre 50px cambia foto, i movimenti verticali vengono ignorati.
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || count < 2) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
  };

  const current = index === null ? null : photos[index];
  const nav =
    "absolute top-1/2 z-10 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-pill bg-night/70 text-inverse hover:bg-night focus-visible:outline-white";

  const strip = layout === "strip";
  const arrow =
    "absolute top-1/2 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-pill bg-night/70 text-inverse transition-colors duration-(--duration-fast) hover:bg-night focus-visible:outline-white md:inline-flex";

  const items = photos.map((p, i) => (
    <li
      key={p.src}
      className={
        strip
          ? "relative aspect-[4/5] w-[72vw] max-w-[320px] shrink-0 snap-start overflow-hidden rounded-xs bg-line md:w-[calc((100%-2*var(--space-4))/3)] md:max-w-none"
          : `relative overflow-hidden rounded-xs bg-line md:aspect-auto md:h-[420px] ${p.cls}`
      }
    >
      <button
        type="button"
        onClick={() => show(i)}
        aria-haspopup="dialog"
        aria-label={`Ingrandisci la foto: ${p.alt}`}
        className="group block size-full cursor-zoom-in"
      >
        <Image
          src={p.src}
          alt={p.alt}
          width={p.w}
          height={p.h}
          sizes={strip ? `(min-width: 1280px) ${Math.round((PAGE_MAX - 32) / 3)}px, (min-width: 768px) 30vw, 72vw` : sizesFor(p.cls)}
          priority={!strip && i < 2}
          className="size-full object-cover transition-transform duration-(--duration-fast) ease-standard group-hover:scale-[1.03]"
        />
      </button>
    </li>
  ));

  return (
    <section aria-label={label} className={`page-container pb-s8 md:pb-s9 ${className}`}>
      {strip ? (
        // Una riga che scorre, larga come il contenuto e allineata ai titoli: da tablet 3 foto per volta (le frecce avanzano di una "pagina"), su mobile una con la successiva che spunta; niente barra di scorrimento
        <div className="on-dark relative">
          <div
            ref={stripRef}
            tabIndex={0}
            role="region"
            aria-label={`${label}: scorri per vedere le altre`}
            onScroll={measureStrip}
            className="snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <ul className="flex gap-s3 md:gap-s4">{items}</ul>
          </div>
          {!edge.start && (
            <button type="button" onClick={() => scrollStrip(-1)} aria-label="Foto precedenti" className={`${arrow} left-s3`}>
              <ArrowRightIcon className="rotate-180" />
            </button>
          )}
          {!edge.end && (
            <button type="button" onClick={() => scrollStrip(1)} aria-label="Foto successive" className={`${arrow} right-s3`}>
              <ArrowRightIcon />
            </button>
          )}
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-s3 md:grid-cols-6 md:gap-s4">{items}</ul>
      )}

      <dialog
        ref={dialogRef}
        aria-label={`${label}: foto ingrandita`}
        onClose={() => setIndex(null)}
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
        className="on-dark m-0 size-full max-h-none max-w-none bg-night p-0 text-inverse backdrop:bg-night/80"
      >
        {current && (
          <figure className="relative flex size-full touch-pan-y flex-col" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <div className="relative min-h-0 flex-1" onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}>
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                quality={85}
                className="object-contain p-s4 md:p-s7"
              />
            </div>
            <figcaption className="px-s4 pb-s5 pt-s2 text-center text-md text-white md:px-s7">
              <span className="block text-sm text-white/80" aria-live="polite">
                {(index ?? 0) + 1} / {count}
              </span>
            </figcaption>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Chiudi la foto"
              className="absolute right-s4 top-s4 z-10 inline-flex size-12 items-center justify-center rounded-pill bg-night/70 text-inverse hover:bg-night focus-visible:outline-white"
            >
              <CloseIcon />
            </button>
            {count > 1 && (
              <>
                <button type="button" onClick={() => go(-1)} aria-label="Foto precedente" className={`${nav} left-s4`}>
                  <ArrowRightIcon className="rotate-180" />
                </button>
                <button type="button" onClick={() => go(1)} aria-label="Foto successiva" className={`${nav} right-s4`}>
                  <ArrowRightIcon />
                </button>
              </>
            )}
          </figure>
        )}
      </dialog>
    </section>
  );
}
