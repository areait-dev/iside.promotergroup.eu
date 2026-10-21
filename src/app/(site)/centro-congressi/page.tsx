import type { Metadata } from "next";
import ContactAside from "@/components/ContactAside";
import PageHero from "@/components/PageHero";
import PhotoGrid from "@/components/PhotoGrid";
import RequestFormBlock from "@/components/RequestFormBlock";
import { toPhotos } from "@/content/gallerie";
import { CENTRO_CONGRESSI_PAGINA } from "@/content/pages";
import { getContent } from "@/lib/page-data";

const DESCRIPTION =
  "Scheda tecnica del Centro congressi Davide Failla di Iside: capienze, attrezzature, accessibilità e parcheggio, per eventi fino a 200 invitati.";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getContent("centro-congressi", CENTRO_CONGRESSI_PAGINA);
  const title = seo.titolo || "Centro congressi Davide Failla — Iside";
  const description = seo.descrizione || DESCRIPTION;
  return {
    title,
    description,
    alternates: { canonical: "/centro-congressi" },
    openGraph: {
      title,
      description,
      url: "/centro-congressi",
      images: [{ url: "/images/cc-6362.jpg", width: 2000, height: 1333, alt: "La sala del Centro congressi con le sedie in file e lo schermo sul fondo" }],
    },
  };
}

const th = "border-b border-ink/40 px-s3 py-s2 text-left font-display text-md font-bold text-ink";
const td = "border-b border-line px-s3 py-s3 text-md text-ink-secondary";

export default async function CentroCongressi() {
  const c = await getContent("centro-congressi", CENTRO_CONGRESSI_PAGINA);
  const { allestimenti, attrezzature, accessibilita, parcheggio, pdf } = c.scheda;
  /* La scheda tecnica compare solo se c'è almeno un dato. */
  const hasSheet = allestimenti.length > 0 || attrezzature.length > 0 || !!accessibilita || !!parcheggio || !!pdf;
  return (
    <>
      <PageHero image={c.hero.foto.src} alt={c.hero.foto.alt} title={c.hero.titolo} />

      <section className="page-container py-s8 md:py-s9">
        <h2 className="font-display text-xl font-bold leading-snug text-ink md:leading-snug lg:text-2xl">
          {c.intro.titolo.map((r) => (
            <span key={r.testo} className="block">
              {r.testo}
            </span>
          ))}
        </h2>
        <p className="mt-s4 max-w-[60ch] text-lg text-ink-secondary">{c.intro.testo}</p>
      </section>

      {hasSheet && (
        <section id="scheda-tecnica" aria-labelledby="scheda-title" className="bg-raised py-s8 md:py-s9">
          <div className="page-container grid gap-s7 md:gap-s8">
            <h2 id="scheda-title" className="font-display text-2xl font-bold text-ink">
              Scheda tecnica
            </h2>

            <div className="grid gap-s7 md:grid-cols-2 md:gap-s9">
              {allestimenti.length > 0 && (
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
                      {allestimenti.map((l) => (
                        <tr key={l.nome}>
                          <th scope="row" className={`${td} text-left font-semibold text-ink`}>
                            {l.nome}
                          </th>
                          <td className={td}>{l.posti}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {attrezzature.length > 0 && (
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
                      {attrezzature.map((e) => (
                        <tr key={e.nome}>
                          <th scope="row" className={`${td} text-left font-semibold text-ink`}>
                            {e.nome}
                          </th>
                          <td className={td}>{e.dettaglio}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <dl className="grid gap-s5 md:grid-cols-2 md:gap-s9">
              {accessibilita && (
                <div className="border-t border-ink/40 pt-s3">
                  <dt className="font-display text-lg font-bold text-ink">Accessibilità</dt>
                  <dd className="mt-s1 text-md text-ink-secondary">{accessibilita}</dd>
                </div>
              )}
              {parcheggio && (
                <div className="border-t border-ink/40 pt-s3">
                  <dt className="font-display text-lg font-bold text-ink">Parcheggio</dt>
                  <dd className="mt-s1 text-md text-ink-secondary">{parcheggio}</dd>
                </div>
              )}
            </dl>

            {pdf && (
              <p className="text-md text-ink-secondary">
                <a
                  href={pdf}
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

      {c.galleria.length > 0 && (
        <div className="pt-s8 md:pt-s9">
          <PhotoGrid photos={toPhotos(c.galleria, true)} label="Foto del Centro congressi" />
        </div>
      )}
      <section id="richiesta-aziendali" aria-labelledby="richiesta-aziendali-title" className="bg-raised py-s8 md:py-s9">
        <div className="page-container grid gap-s7 lg:grid-cols-[1fr_1.4fr] lg:gap-s9">
          <div>
            <h2 id="richiesta-aziendali-title" className="font-display text-2xl font-bold text-ink">
              {c.richiesta.titolo}
            </h2>
            <p className="mt-s3 max-w-[40ch] text-md text-ink-secondary">{c.richiesta.testo}</p>
            <ContactAside />
          </div>
          <RequestFormBlock kind="aziendali" />
        </div>
      </section>
    </>
  );
}
