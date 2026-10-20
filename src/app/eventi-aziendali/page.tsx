import type { Metadata } from "next";
import Link from "next/link";
import ContactAside from "@/components/ContactAside";
import PageHero from "@/components/PageHero";
import PhotoGrid, { type Photo } from "@/components/PhotoGrid";
import RequestForm from "@/components/RequestForm";
import { BUSINESS_CATERING, CAPACITY, CONGRESS_HAS_SHEET, capacityNote, isTodo } from "@/config/site";

const DESCRIPTION =
  "Convegni, seminari, coffee break, cene aziendali e team building a Iside, fino a 200 invitati. Richiedi un preventivo.";

export const metadata: Metadata = {
  title: "Eventi aziendali — Iside",
  description: DESCRIPTION,
  alternates: { canonical: "/eventi-aziendali" },
  openGraph: {
    title: "Eventi aziendali — Iside",
    description: DESCRIPTION,
    url: "/eventi-aziendali",
    images: [{ url: "/images/cc-6372.jpg", width: 2000, height: 1333, alt: "La sala del Centro congressi con la pedana e il tavolo dei relatori" }],
  },
};

const link =
  "mt-s2 inline-flex min-h-11 items-center text-md font-semibold text-water underline underline-offset-4 decoration-from-font hover:text-night";

/* Una foto per ogni uso descritto sopra: convegni (sala e tavolo dei relatori), cene e networking all'aperto. Sorgenti da almeno 2000px. */
const PHOTOS: Photo[] = [
  { src: "/images/cc-6365.jpg", w: 2000, h: 1333, cls: "col-span-2 aspect-[4/3] md:col-span-3", alt: "La sala del Centro congressi con le sedie in file e lo schermo di proiezione" },
  { src: "/images/cc-6368.jpg", w: 2000, h: 1333, cls: "col-span-2 aspect-[4/3] md:col-span-3", alt: "Il tavolo dei relatori sulla pedana, con microfoni e schermo alle spalle" },
  { src: "/images/hero/hero-5.jpg", w: 2400, h: 1602, cls: "col-span-2 aspect-[4/3] md:col-span-3", alt: "Ospiti e buffet a bordo piscina di sera, tra i gazebi e gli ulivi" },
  { src: "/images/hero/hero-4.jpg", w: 2400, h: 1602, cls: "col-span-2 aspect-[4/3] md:col-span-3", alt: "Ospiti in piedi sul prato di sera, davanti ai gazebi bianchi, durante un evento aziendale" },
];

export default function EventiAziendali() {
  return (
    <>
      <PageHero
        image="/images/cc-6372.jpg"
        alt="La sala del Centro congressi con la pedana e il tavolo dei relatori"
        title="Eventi aziendali"
      />

      <section aria-labelledby="offerta-title" className="page-container py-s8 md:py-s9">
        <h2 id="offerta-title" className="font-display text-xl font-bold leading-snug text-ink md:leading-snug lg:text-2xl">
          <span className="block">Convegni, coffee break, cene aziendali</span>
          <span className="block">e team building, in un solo posto.</span>
        </h2>
        <dl className="mt-s7 grid gap-s5 md:grid-cols-3 md:gap-s7">
          <div className="border-t border-ink/40 pt-s3">
            <dt className="font-display text-lg font-bold text-ink">Convegni e seminari</dt>
            <dd className="mt-s1 text-md text-ink-secondary">
              Nel Centro congressi Davide Failla, fino a {CAPACITY.centroCongressi} invitati.
              {CONGRESS_HAS_SHEET && (
                <>
                  <br />
                  <Link href="/centro-congressi#scheda-tecnica" className={link}>
                    Vedi la scheda tecnica
                  </Link>
                </>
              )}
            </dd>
          </div>
          <div className="border-t border-ink/40 pt-s3">
            <dt className="font-display text-lg font-bold text-ink">Coffee break e cene aziendali</dt>
            <dd className="mt-s1 text-md text-ink-secondary">
              Nel bordo piscina coperto, circa {CAPACITY.bordoPiscinaCoperto} ospiti.{!isTodo(BUSINESS_CATERING) && ` Servizio: ${BUSINESS_CATERING}`}
            </dd>
          </div>
          <div className="border-t border-ink/40 pt-s3">
            <dt className="font-display text-lg font-bold text-ink">Team building e networking</dt>
            <dd className="mt-s1 text-md text-ink-secondary">
              Nell’area living, con piscina, giardino e gazebi.{capacityNote(CAPACITY.giardino)}
              <br />
              <Link href="/area-living" className={link}>
                Scopri l’area living
              </Link>
            </dd>
          </div>
        </dl>
      </section>

      <PhotoGrid photos={PHOTOS} label="Foto per gli eventi aziendali" />

      <section id="richiesta-aziendali" aria-labelledby="richiesta-aziendali-title" className="bg-raised py-s8 md:py-s9">
        <div className="page-container grid gap-s7 md:grid-cols-[1fr_1.4fr] md:gap-s9">
          <div>
            <h2 id="richiesta-aziendali-title" className="font-display text-2xl font-bold text-ink">
              Richiedi un preventivo
            </h2>
            <p className="mt-s3 max-w-[40ch] text-md text-ink-secondary">Dicci formato, data e numero di ospiti: ti ricontattiamo noi.</p>
            <ContactAside />
          </div>
          <RequestForm kind="aziendali" />
        </div>
      </section>
    </>
  );
}
