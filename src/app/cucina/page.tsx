import type { Metadata } from "next";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import PageHero from "@/components/PageHero";
import { CUCINA, PHONE_HREF, SITE, isTodo } from "@/config/site";

const DESCRIPTION =
  "La cucina di Iside, a due passi da Vittoria e dall'aeroporto di Comiso: colazione al mattino e pranzo all'aperto, aperti al pubblico.";

export const metadata: Metadata = {
  title: "Cucina — Iside",
  description: DESCRIPTION,
  alternates: { canonical: "/cucina" },
  openGraph: {
    title: "Cucina — Iside",
    description: DESCRIPTION,
    url: "/cucina",
    images: [{ url: "/images/cucina-pizza-2.jpg", width: 2400, height: 1597, alt: "Le mani di un cuoco posano il prosciutto su una pizza condita con insalatina verde" }],
  },
};

/** Foto dell'hero in dissolvenza (la prima si vede subito). */
const HERO_SLIDES = [
  { src: "/images/cucina-pizza.jpg", alt: "Un mucchio di farina sul piano di lavoro, con la spatola per l'impasto e le ciotole degli ingredienti sullo sfondo" },
  { src: "/images/cucina-pizza-2.jpg", alt: "Le mani di un cuoco posano il prosciutto su una pizza condita con insalatina verde", position: "50% 75%" },
];

const MOMENTS = [
  {
    id: "colazione",
    title: "Colazione",
    lead: "Si comincia al mattino.",
    text: "Una colazione al banco o seduti, prima di andare al lavoro o di partire. Aperta a tutti, non serve essere ospiti di un evento.",
    hours: CUCINA.breakfastHours,
    menuHref: CUCINA.menuBreakfastUrl,
    menuLabel: "Vedi il menu della colazione",
  },
  {
    id: "pranzo",
    title: "Pranzo",
    lead: "Pranzo all’aperto, a due passi da Vittoria.",
    text: "A mezzogiorno la cucina è aperta al pubblico: un pranzo con il giardino e la piscina intorno, per chi lavora o passa in zona.",
    hours: CUCINA.lunchHours,
    menuHref: CUCINA.menuLunchUrl,
    menuLabel: "Vedi il menu del pranzo",
  },
];

const button =
  "inline-flex min-h-12 items-center justify-center rounded-pill px-s6 text-md font-semibold transition-[filter] duration-(--duration-fast) ease-standard";

export default function Cucina() {
  return (
    <>
      <PageHero
        image={HERO_SLIDES[0].src}
        alt={HERO_SLIDES[0].alt}
        slides={HERO_SLIDES}
        title="Cucina"
      />

      <section aria-labelledby="cucina-title" className="page-container py-s8 md:py-s9">
        <h2 id="cucina-title" className="font-display text-xl font-bold leading-snug text-ink md:leading-snug lg:text-2xl">
          <span className="block">Colazione al mattino,</span>
          <span className="block">pranzo all’aperto.</span>
        </h2>
        <p className="mt-s4 max-w-[60ch] text-lg text-ink-secondary">
          La cucina di Iside è aperta al pubblico: passa per una colazione o fermati a pranzo, nella Valle dell’Ippari, vicino a Vittoria e
          all’aeroporto di Comiso.
        </p>

        <ul className="mt-s7 grid gap-s5 md:grid-cols-2 md:gap-s7">
          {MOMENTS.map((m) => (
            <li key={m.id} id={m.id} className="rounded-md bg-raised p-s6 shadow-card">
              <h3 className="font-display text-xl font-bold text-ink">{m.title}</h3>
              <p className="mt-s2 font-display text-lg text-ink">{m.lead}</p>
              <p className="mt-s2 text-md text-ink-secondary">{m.text}</p>
              {!isTodo(m.hours) && (
                <p className="mt-s4 text-md text-ink">
                  <span className="font-semibold">Orari:</span> {m.hours}
                </p>
              )}
              <a
                href={m.menuHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`${button} mt-s5 bg-water text-inverse hover:brightness-110 active:brightness-95`}
              >
                {m.menuLabel}
                <span className="sr-only-text"> (si apre in una nuova scheda)</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="tavolo-title" className="on-dark bg-water py-s8 text-inverse md:py-s9">
        <div className="page-container">
          <h2 id="tavolo-title" className="font-display text-xl font-bold md:text-2xl">
            Prenota un tavolo
          </h2>
          <p className="mt-s3 max-w-[50ch] text-md text-white">
            Chiamaci per prenotare. Se stai organizzando una festa o una cena aziendale, richiedi un preventivo.
          </p>
          <div className="mt-s6 flex flex-col gap-s3 md:flex-row">
            <a href={PHONE_HREF} className={`${button} bg-white text-night hover:brightness-95 active:brightness-90`}>
              Chiama {SITE.phone.display}
            </a>
            <Link
              href="/preventivo"
              className={`${button} border border-white text-inverse transition-colors hover:bg-white/15 active:bg-white/25`}
            >
              Richiedi un preventivo
            </Link>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
