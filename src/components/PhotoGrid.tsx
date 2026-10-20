"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRightIcon, CloseIcon } from "./icons";

export type Photo = { src: string; w: number; h: number; alt: string; cls: string };

const PAGE_MAX = 1200;

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

/** Galleria a righe (2 colonne su mobile, 6 da 768px) con lightbox accessibile su `<dialog>`. `cls` porta span e aspect. */
export default function PhotoGrid({ photos, label, className = "" }: { photos: Photo[]; label: string; className?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;
  const count = photos.length;

  const show = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const go = useCallback((delta: number) => setIndex((i) => (i === null ? i : (i + delta + count) % count)), [count]);

  // Frecce da tastiera; Esc è gestito dal <dialog>. Il focus torna al pulsante della foto alla chiusura.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, go]);

  const current = index === null ? null : photos[index];
  const nav =
    "absolute top-1/2 z-10 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-pill bg-night/70 text-inverse hover:bg-night focus-visible:outline-white";

  return (
    <section aria-label={label} className={`page-container pb-s8 md:pb-s9 ${className}`}>
      <ul className="grid grid-cols-2 gap-s3 md:grid-cols-6 md:gap-s4">
        {photos.map((p, i) => (
          <li key={p.src} className={`relative overflow-hidden rounded-xs bg-line md:aspect-auto md:h-[420px] ${p.cls}`}>
            <button
              type="button"
              onClick={() => show(i)}
              aria-haspopup="dialog"
              aria-label={`Ingrandisci la foto: ${p.alt}`}
              className="group block size-full cursor-zoom-in"
            >
              <Image
                src={p.src}
                alt=""
                width={p.w}
                height={p.h}
                sizes={sizesFor(p.cls)}
                priority={i < 2}
                className="size-full object-cover transition-transform duration-(--duration-fast) ease-standard group-hover:scale-[1.03]"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={`${label}: foto ingrandita`}
        onClose={() => setIndex(null)}
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
        className="on-dark m-0 size-full max-h-none max-w-none bg-night/95 p-0 text-inverse backdrop:bg-night/80"
      >
        {current && (
          <figure className="relative flex size-full flex-col">
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
              <span className="block">{current.alt}</span>
              <span className="mt-s1 block text-sm text-white/80" aria-live="polite">
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
