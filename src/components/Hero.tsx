import Image from "next/image";
import Link from "next/link";
import HeroMedia from "./HeroMedia";
import type { HomeContent } from "@/content/home";
import { getSite } from "@/lib/site-data";

export default async function Hero({ content }: { content: HomeContent["hero"] }) {
  const titleId = "hero-title";
  const SITE = await getSite();
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
        <h1 id={titleId} className="max-w-[16ch] font-display text-3xl font-bold leading-[1.2] tracking-tight text-balance">
          {content.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-s4 text-md font-semibold text-white">{content.brandLine.replace("{societa}", SITE.legalName)}</p>
        <p className="mt-s2 max-w-[60ch] text-md text-white md:text-lg">
          {content.intro}
        </p>
        <div className="mt-s6 flex flex-col gap-s3 md:flex-row">
          <Link
            href={content.ctaPrivate.href}
            className="inline-flex min-h-12 items-center justify-center rounded-pill bg-white px-s6 text-md font-semibold text-night transition-[filter] duration-(--duration-fast) ease-standard hover:brightness-95 active:brightness-90"
          >
            {content.ctaPrivate.label}
          </Link>
          <Link
            href={content.ctaBusiness.href}
            className="inline-flex min-h-12 items-center justify-center rounded-pill border border-white px-s6 text-md font-semibold text-inverse transition-colors duration-(--duration-fast) ease-standard hover:bg-white/15 active:bg-white/25"
          >
            {content.ctaBusiness.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
