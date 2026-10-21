import Link from "next/link";
import { CTA } from "@/config/site";
import { FASCIA_FINALE } from "@/content/pages";
import { getContent, getTesti } from "@/lib/page-data";
import { getSite, phoneHref } from "@/lib/site-data";

/** Fascia blu in fondo alla pagina: titolo, testo e pulsante «Chiama» si modificano da «Fascia finale» nel pannello. */
export default async function CtaBand({ percorso }: { percorso?: string }) {
  const titleId = "cta-title";
  const PHONE_HREF = phoneHref(await getSite());
  const c = await getContent("fascia-finale", FASCIA_FINALE);
  const T = await getTesti();
  const cta = percorso ? T.perPagina.find((p) => p.percorso === percorso) : undefined;
  return (
    <section aria-labelledby={titleId} className="on-dark bg-night py-s8 text-inverse md:py-s9">
      <div className="page-container">
        <h2 id={titleId} className="font-display text-xl font-bold md:text-2xl">
          {c.titolo}
        </h2>
        <p className="mt-s3 max-w-[50ch] text-md text-white">{c.testo}</p>
        <div className="mt-s6 flex flex-col gap-s3 md:flex-row">
          <Link
            href={cta?.link || CTA.href}
            className="inline-flex min-h-12 items-center justify-center rounded-pill bg-white px-s6 text-md font-semibold text-night transition-[filter] duration-(--duration-fast) ease-standard hover:brightness-95 active:brightness-90"
          >
            {cta?.testo || T.pulsanti.preventivo}
          </Link>
          {PHONE_HREF && (
            <a
              href={PHONE_HREF}
              className="inline-flex min-h-12 items-center justify-center rounded-pill border-2 border-white px-s6 text-md font-semibold text-inverse transition-colors duration-(--duration-fast) ease-standard hover:bg-white/15 active:bg-white/25"
            >
              {c.etichettaChiama}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
