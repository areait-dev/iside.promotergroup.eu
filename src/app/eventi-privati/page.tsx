import type { Metadata } from "next";
import Link from "next/link";
import ContactAside from "@/components/ContactAside";
import PageHero from "@/components/PageHero";
import PhotoGrid, { type Photo } from "@/components/PhotoGrid";
import RequestForm from "@/components/RequestForm";
import { CAPACITY, PRIVATE_SERVICES, capacityNote, isTodo } from "@/config/site";

const DESCRIPTION =
  "Compleanni, lauree, battesimi e anniversari a bordo piscina e in giardino, a Iside. Richiedi un preventivo.";

export const metadata: Metadata = {
  title: "Eventi privati — Iside",
  description: DESCRIPTION,
  alternates: { canonical: "/eventi-privati" },
  openGraph: {
    title: "Eventi privati — Iside",
    description: DESCRIPTION,
    url: "/eventi-privati",
    images: [{ url: "/images/ep-6794.jpg", width: 2000, height: 1335, alt: "Il giardino di Iside al tramonto, con arredi bianchi luminosi sul prato" }],
  },
};

const STRENGTHS: [string, string][] = [
  ["Piscina", `A bordo vasca, con lettini e arredi bianchi.${capacityNote(CAPACITY.piscina)}`],
  ["Giardino e gazebi", `Prato, ulivi e gazebi con sedute, per aperitivi e momenti all’aperto.${capacityNote(CAPACITY.giardino)}`],
  ["Bordo piscina coperto", `Circa ${CAPACITY.bordoPiscinaCoperto} ospiti.`],
];

/* span/aspect mobile (2 colonne) → md (6 colonne, righe da 420px) */
const PHOTOS: Photo[] = [
  { src: "/images/ep-6786.jpg", w: 1335, h: 2000, cls: "col-span-2 aspect-[16/10] md:col-span-2", alt: "Un ramo d'ulivo in primo piano, con i gazebi e le sedute illuminate sullo sfondo, di sera" },
  { src: "/images/ep-6869.jpg", w: 2000, h: 1335, cls: "aspect-[3/4] md:col-span-2", alt: "File di calici capovolti sul bancone, pronti per il brindisi" },
  { src: "/images/ep-7009.jpg", w: 2000, h: 1335, cls: "aspect-[3/4] md:col-span-2", alt: "Vino bianco versato in un calice" },
];

const SERVICES = PRIVATE_SERVICES.filter((s) => !isTodo(s.text));

export default function EventiPrivati() {
  return (
    <>
      <PageHero
        image="/images/ep-6794.jpg"
        alt="Il giardino al tramonto, con arredi bianchi luminosi sul prato e il cielo rosa"
        title="Eventi privati"
      />

      <section aria-labelledby="ep-forza-title" className="page-container py-s8 md:py-s9">
        <h2 id="ep-forza-title" className="font-display text-xl font-bold leading-snug text-ink md:leading-snug lg:text-2xl">
          <span className="block">Compleanni, lauree, battesimi e anniversari,</span>
          <span className="block">a bordo piscina e in giardino.</span>
        </h2>
        <dl className="mt-s7 grid gap-s5 md:grid-cols-3 md:gap-s7">
          {STRENGTHS.map(([title, text]) => (
            <div key={title} className="border-t border-ink/40 pt-s3">
              <dt className="font-display text-lg font-bold text-ink">{title}</dt>
              <dd className="mt-s1 text-md text-ink-secondary">{text}</dd>
            </div>
          ))}
        </dl>
        <Link
          href="/area-living"
          className="mt-s6 inline-flex min-h-11 items-center text-md font-semibold text-water underline underline-offset-4 decoration-from-font hover:text-night"
        >
          Scopri l’area living
        </Link>
      </section>

      <PhotoGrid photos={PHOTOS} label="Foto di una serata a Iside" />

      {SERVICES.length > 0 && (
        <section aria-labelledby="servizi-title" className="page-container pb-s8 md:pb-s9">
          <h2 id="servizi-title" className="font-display text-xl font-bold text-ink md:text-2xl">
            Servizi per la tua festa
          </h2>
          <dl className="mt-s6 grid gap-s5 md:grid-cols-4 md:gap-s7">
            {SERVICES.map((s) => (
              <div key={s.title} className="border-t border-ink/40 pt-s3">
                <dt className="font-display text-lg font-bold text-ink">{s.title}</dt>
                <dd className="mt-s1 text-md text-ink-secondary">{s.text}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section id="richiesta-privati" aria-labelledby="richiesta-privati-title" className="bg-raised py-s8 md:py-s9">
        <div className="page-container grid gap-s7 md:grid-cols-[1fr_1.4fr] md:gap-s9">
          <div>
            <h2 id="richiesta-privati-title" className="font-display text-2xl font-bold text-ink">
              Richiedi un preventivo
            </h2>
            <p className="mt-s3 max-w-[40ch] text-md text-ink-secondary">Dicci data e numero di ospiti: ti ricontattiamo noi.</p>
            <ContactAside />
          </div>
          <RequestForm kind="privati" />
        </div>
      </section>
    </>
  );
}
