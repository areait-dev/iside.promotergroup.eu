import { useId } from "react";
import Image from "next/image";
import Link from "next/link";
import HeroMedia from "./HeroMedia";
import { SITE } from "@/config/site";

export default function Hero() {
  const titleId = useId();
  return (
    <section
      id="hero"
      aria-labelledby={titleId}
      className="on-dark relative flex min-h-[max(560px,min(88svh,720px))] items-end overflow-hidden bg-night text-inverse"
    >
      <div className="absolute inset-0 z-0">
        <HeroMedia />
      </div>
      <Image
        src="/images/dea-iside-white.png"
        alt=""
        aria-hidden="true"
        priority
        width={1717}
        height={915}
        sizes="(min-width: 1024px) 900px, 150vw"
        className="pointer-events-none absolute right-[-48vw] top-[48%] w-[150vw] max-w-none opacity-90 md:right-[-14vw] md:top-[40%] md:w-[min(80vw,1120px)]"
      />
      {/* Velo per il contrasto del testo: ≥ 80% dietro al paragrafo (bianco su pixel bianchi del video ≥ 5:1) + sfumatura laterale a sinistra */}
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_79_113/0.86)_0%,rgb(0_79_113/0.8)_45%,rgb(0_79_113/0.3)_75%,rgb(0_79_113/0)_100%)]" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_right,rgb(0_79_113/0.45)_0%,rgb(0_79_113/0.2)_55%,rgb(0_79_113/0)_100%)]" />
      <div className="page-container relative pb-s8 pt-header md:pb-s9">
        <h1 id={titleId} className="max-w-[16ch] font-display text-3xl font-bold leading-[1.05] tracking-tight text-balance">
          <span className="block">Lo spazio ideale</span>
          <span className="block">per i tuoi eventi</span>
          <span className="block">business &amp; privati</span>
        </h1>
        <p className="mt-s4 text-md font-semibold text-white">Iside è il nuovo brand di {SITE.legalName}</p>
        <p className="mt-s2 max-w-[60ch] text-md text-white md:text-lg">
          Situata al centro della Valle dell’Ippari, a due passi dall’aeroporto di Comiso e da Vittoria, la struttura è composta da un
          Centro Congressi e da un’ampia area living con piscina, giardino e gazebi.
        </p>
        <div className="mt-s6 flex flex-col gap-s3 sm:flex-row">
          <Link
            href="/eventi-privati#richiesta-privati"
            className="inline-flex min-h-12 items-center justify-center rounded-pill bg-sun px-s6 text-md font-semibold text-night transition-[filter] duration-(--duration-fast) ease-standard hover:brightness-105 active:brightness-95"
          >
            Organizza la tua festa
          </Link>
          <Link
            href="/eventi-aziendali#richiesta-aziendali"
            className="inline-flex min-h-12 items-center justify-center rounded-pill border border-white px-s6 text-md font-semibold text-inverse transition-colors duration-(--duration-fast) ease-standard hover:bg-white/15 active:bg-white/25"
          >
            Organizza un evento aziendale
          </Link>
        </div>
      </div>
    </section>
  );
}
