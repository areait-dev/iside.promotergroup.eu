import type { Metadata } from "next";
import ContactAside from "@/components/ContactAside";
import PageHero from "@/components/PageHero";
import PhotoGrid, { type Photo } from "@/components/PhotoGrid";
import RequestForm from "@/components/RequestForm";
import { CAPACITY, CONGRESS_HAS_SHEET, CONGRESS_SHEET, isTodo } from "@/config/site";

const DESCRIPTION =
  "Scheda tecnica del Centro congressi Davide Failla di Iside: capienze, attrezzature, accessibilità e parcheggio, per eventi fino a 200 invitati.";

export const metadata: Metadata = {
  title: "Centro congressi Davide Failla — Iside",
  description: DESCRIPTION,
  alternates: { canonical: "/centro-congressi" },
  openGraph: {
    title: "Centro congressi Davide Failla — Iside",
    description: DESCRIPTION,
    url: "/centro-congressi",
    images: [{ url: "/images/cc-6362.jpg", width: 2000, height: 1333, alt: "La sala del Centro congressi con le sedie in file e lo schermo sul fondo" }],
  },
};

/* span/aspect mobile (2 colonne) → md (6 colonne, righe da 420px) */
const PHOTOS: Photo[] = [
  { src: "/images/cc-6365.jpg", w: 2000, h: 1333, cls: "col-span-2 aspect-[16/10] md:col-span-4", alt: "La sala vista di lato, con le sedie in file e lo schermo di proiezione" },
  { src: "/images/cc-6368.jpg", w: 2000, h: 1333, cls: "aspect-[3/4] md:col-span-2", alt: "Il tavolo dei relatori sulla pedana, con microfoni e schermo alle spalle" },
  { src: "/images/cc-6380.jpg", w: 2000, h: 1333, cls: "aspect-[3/4] md:col-span-2", alt: "Le file di sedie in primo piano, con il pannello divisorio sullo sfondo" },
  { src: "/images/cc-6367.jpg", w: 2000, h: 1333, cls: "col-span-2 aspect-[16/10] md:col-span-4", alt: "La sala con due blocchi di sedie separati da un corridoio, pedana sulla destra" },
  { src: "/images/cc-6379.jpg", w: 2000, h: 1333, cls: "col-span-2 aspect-[16/10] md:col-span-6", alt: "Le sedute disposte ad arco davanti alla pedana, con le piante ai lati" },
];

const th = "border-b border-ink/40 px-s3 py-s2 text-left font-display text-md font-bold text-ink";
const td = "border-b border-line px-s3 py-s3 text-md text-ink-secondary";

const LAYOUTS = CONGRESS_SHEET.layouts.filter((l) => !isTodo(l.capacity));
const EQUIPMENT = CONGRESS_SHEET.equipment.filter((e) => !isTodo(e.detail));

export default function CentroCongressi() {
  return (
    <>
      <PageHero
        image="/images/cc-6362.jpg"
        alt="La sala del Centro congressi con le sedie in file, il tavolo dei relatori e lo schermo sul fondo"
        title="Centro congressi Davide Failla"
      />

      <section className="page-container py-s8 md:py-s9">
        <h2 className="font-display text-xl font-bold leading-snug text-ink md:leading-snug lg:text-2xl">
          <span className="block">Stai organizzando un evento per la tua azienda?</span>
          <span className="block">Qui c’è posto fino a {CAPACITY.centroCongressi} invitati.</span>
        </h2>
        <p className="mt-s4 max-w-[60ch] text-lg text-ink-secondary">
          Il Centro congressi ha già ospitato numerosi congressi e convegni di piccole e medie imprese e multinazionali, seminari e
          conferenze stampa.
        </p>
      </section>

      {CONGRESS_HAS_SHEET && (
        <section id="scheda-tecnica" aria-labelledby="scheda-title" className="bg-raised py-s8 md:py-s9">
          <div className="page-container grid gap-s7 md:gap-s8">
            <h2 id="scheda-title" className="font-display text-2xl font-bold text-ink">
              Scheda tecnica
            </h2>

            <div className="grid gap-s7 md:grid-cols-2 md:gap-s9">
              {LAYOUTS.length > 0 && (
                <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Capienza per allestimento">
                  <table className="w-full min-w-[320px] border-collapse">
                    <caption className="pb-s2 text-left font-display text-xl font-bold text-ink">Capienza per allestimento</caption>
                    <thead>
                      <tr>
                        <th scope="col" className={th}>
                          Allestimento
                        </th>
                        <th scope="col" className={th}>
                          Posti
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {LAYOUTS.map((l) => (
                        <tr key={l.name}>
                          <th scope="row" className={`${td} text-left font-semibold text-ink`}>
                            {l.name}
                          </th>
                          <td className={td}>{l.capacity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {EQUIPMENT.length > 0 && (
                <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Attrezzature">
                  <table className="w-full min-w-[320px] border-collapse">
                    <caption className="pb-s2 text-left font-display text-xl font-bold text-ink">Attrezzature</caption>
                    <thead>
                      <tr>
                        <th scope="col" className={th}>
                          Dotazione
                        </th>
                        <th scope="col" className={th}>
                          Dettagli
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {EQUIPMENT.map((e) => (
                        <tr key={e.name}>
                          <th scope="row" className={`${td} text-left font-semibold text-ink`}>
                            {e.name}
                          </th>
                          <td className={td}>{e.detail}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <dl className="grid gap-s5 md:grid-cols-2 md:gap-s9">
              {!isTodo(CONGRESS_SHEET.accessibility) && (
                <div className="border-t border-ink/40 pt-s3">
                  <dt className="font-display text-lg font-bold text-ink">Accessibilità</dt>
                  <dd className="mt-s1 text-md text-ink-secondary">{CONGRESS_SHEET.accessibility}</dd>
                </div>
              )}
              {!isTodo(CONGRESS_SHEET.parking) && (
                <div className="border-t border-ink/40 pt-s3">
                  <dt className="font-display text-lg font-bold text-ink">Parcheggio</dt>
                  <dd className="mt-s1 text-md text-ink-secondary">{CONGRESS_SHEET.parking}</dd>
                </div>
              )}
            </dl>

            {!isTodo(CONGRESS_SHEET.pdf) && (
              <p className="text-md text-ink-secondary">
                <a
                  href={CONGRESS_SHEET.pdf}
                  download
                  className="inline-flex min-h-11 items-center font-semibold text-water underline underline-offset-4 decoration-from-font hover:text-night"
                >
                  Scarica la scheda tecnica in PDF
                </a>
              </p>
            )}
          </div>
        </section>
      )}

      <div className="pt-s8 md:pt-s9">
        <PhotoGrid photos={PHOTOS} label="Foto del Centro congressi" />
      </div>
      <section id="richiesta-aziendali" aria-labelledby="richiesta-aziendali-title" className="bg-raised py-s8 md:py-s9">
        <div className="page-container grid gap-s7 md:grid-cols-[1fr_1.4fr] md:gap-s9">
          <div>
            <h2 id="richiesta-aziendali-title" className="font-display text-2xl font-bold text-ink">
              Richiedi un preventivo
            </h2>
            <p className="mt-s3 max-w-[40ch] text-md text-ink-secondary">
              Dicci formato, data e numero di ospiti: ti ricontattiamo noi.
            </p>
            <ContactAside />
          </div>
          <RequestForm kind="aziendali" />
        </div>
      </section>
    </>
  );
}
