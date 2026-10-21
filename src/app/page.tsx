import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import ContactSection from "@/components/ContactSection";
import CtaBand from "@/components/CtaBand";
import Hero from "@/components/Hero";
import { CAPACITY, CLIENT_LOGOS, TESTIMONIALS } from "@/config/site";

const CARDS = [
  {
    href: "/area-living",
    title: "Area living",
    text: "Piscina, giardino e gazebi.",
    image: "/images/al-pxl.jpg",
    alt: "La piscina di Iside con i gazebi bianchi, i lettini e le palme sullo sfondo",
  },
  {
    href: "/centro-congressi",
    title: "Centro congressi",
    text: `Convegni, seminari e conferenze stampa, fino a ${CAPACITY.centroCongressi} invitati.`,
    image: "/images/cc-6362.jpg",
    alt: "La sala del Centro congressi con le sedie in file e lo schermo sul fondo",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section id="spazi" aria-labelledby="spazi-title" className="page-container py-s8 md:py-s9">
        <h2 id="spazi-title" className="font-display text-xl font-bold text-ink md:text-2xl">
          Scegli lo spazio per il tuo evento
        </h2>
        <ul className="mt-s6 grid gap-s3 md:grid-cols-2 md:gap-s4">
          {CARDS.map((c) => (
            <li key={c.href} className="min-w-0">
              <Link
                href={c.href}
                className="on-dark group relative flex aspect-[4/3] w-full items-end overflow-hidden rounded-md bg-night text-inverse"
              >
                <Image
                  src={c.image}
                  alt={c.alt}
                  fill
                  sizes="(min-width: 1280px) 590px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-(--duration-slower) ease-standard group-hover:scale-[1.04]"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_79_113/0.88)_0%,rgb(0_79_113/0.55)_38%,rgb(0_79_113/0)_75%)]" />
                <span className="relative flex w-full items-end justify-between gap-s4 p-s5 md:p-s6">
                  <span className="block">
                    <span className="block font-display text-xl font-bold lg:text-2xl">{c.title}</span>
                    {/* altezza riservata per 2 righe: i titoli restano alla stessa altezza anche con descrizioni di lunghezza diversa */}
                    <span className="mt-s1 block min-h-12 max-w-[34ch] text-md text-white md:min-h-[4.5rem] lg:min-h-12">{c.text}</span>
                  </span>
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-pill bg-white text-night transition-transform duration-(--duration-fast) ease-standard group-hover:translate-x-1">
                    <ArrowRightIcon />
                    <span className="sr-only-text">Vai a {c.title}</span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {TESTIMONIALS.length > 0 && (
        <section aria-labelledby="testimonianze-title" className="page-container py-s8 md:py-s9">
          <h2 id="testimonianze-title" className="font-display text-xl font-bold text-ink md:text-2xl">
            Dicono di noi
          </h2>
          <ul className="mt-s6 grid gap-s6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <li key={t.author}>
                <blockquote className="font-display text-lg text-ink">“{t.quote}”</blockquote>
                <p className="mt-s2 text-md text-ink-secondary">
                  {t.author}
                  {t.role ? `, ${t.role}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {CLIENT_LOGOS.length > 0 && (
        <section aria-labelledby="clienti-title" className="page-container py-s8 md:py-s9">
          <h2 id="clienti-title" className="font-display text-xl font-bold text-ink md:text-2xl">
            Hanno scelto Iside
          </h2>
          <ul className="mt-s6 flex flex-wrap items-center gap-s7">
            {CLIENT_LOGOS.map((l) => (
              <li key={l.name}>
                <Image src={l.src} alt={l.name} width={160} height={64} className="h-12 w-auto" />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ContactSection />
      <CtaBand />
    </>
  );
}
