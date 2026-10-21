import type { Metadata } from "next";
import Link from "next/link";
import ContactAside from "@/components/ContactAside";
import PageHero from "@/components/PageHero";
import PhotoGrid from "@/components/PhotoGrid";
import RequestFormBlock from "@/components/RequestFormBlock";
import { toPhotos } from "@/content/gallerie";
import { EVENTI_PRIVATI } from "@/content/pages";
import { getContent } from "@/lib/page-data";

const DESCRIPTION =
  "Compleanni, lauree, battesimi e anniversari a bordo piscina e in giardino, a Iside. Richiedi un preventivo.";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getContent("eventi-privati", EVENTI_PRIVATI);
  const title = seo.titolo || "Eventi privati — Iside";
  const description = seo.descrizione || DESCRIPTION;
  return {
    title,
    description,
    alternates: { canonical: "/eventi-privati" },
    openGraph: {
      title,
      description,
      url: "/eventi-privati",
      images: [{ url: "/images/ep-6794.jpg", width: 2000, height: 1335, alt: "Il giardino di Iside al tramonto, con arredi bianchi luminosi sul prato" }],
    },
  };
}

export default async function EventiPrivati() {
  const c = await getContent("eventi-privati", EVENTI_PRIVATI);
  return (
    <>
      <PageHero image={c.hero.foto.src} alt={c.hero.foto.alt} title={c.hero.titolo} />

      <section aria-labelledby="ep-forza-title" className="page-container py-s8 md:py-s9">
        <h2 id="ep-forza-title" className="font-display text-xl font-bold leading-snug text-ink md:leading-snug lg:text-2xl">
          {c.intro.titolo.map((r) => (
            <span key={r.testo} className="block">
              {r.testo}
            </span>
          ))}
        </h2>
        <dl className="mt-s7 grid gap-s5 md:grid-cols-3 md:gap-s7">
          {c.punti.map((p) => (
            <div key={p.titolo} className="border-t border-ink/40 pt-s3">
              <dt className="font-display text-lg font-bold text-ink">{p.titolo}</dt>
              <dd className="mt-s1 text-md text-ink-secondary">{p.testo}</dd>
            </div>
          ))}
        </dl>
        {c.linkArea.testo && c.linkArea.href && (
          <Link
            href={c.linkArea.href}
            className="mt-s6 inline-flex min-h-11 items-center text-md font-semibold text-water underline underline-offset-4 decoration-from-font hover:text-night"
          >
            {c.linkArea.testo}
          </Link>
        )}
      </section>

      {c.galleria.length > 0 && (
      <section aria-labelledby="serate-title">
        <div className="page-container">
          <h2 id="serate-title" className="font-display text-xl font-bold text-ink md:text-2xl">
            {c.serate.titolo}
          </h2>
          <p className="mt-s3 max-w-[50ch] text-md text-ink-secondary">{c.serate.testo}</p>
        </div>
        <div className="mt-s6">
          <PhotoGrid photos={toPhotos(c.galleria, false)} label="Foto delle serate a Iside" layout="strip" />
        </div>
      </section>
      )}

      {c.servizi.voci.length > 0 && (
        <section aria-labelledby="servizi-title" className="page-container pb-s8 md:pb-s9">
          <h2 id="servizi-title" className="font-display text-xl font-bold text-ink md:text-2xl">
            {c.servizi.titolo}
          </h2>
          <dl className="mt-s6 grid gap-s5 md:grid-cols-4 md:gap-s7">
            {c.servizi.voci.map((s) => (
              <div key={s.titolo} className="border-t border-ink/40 pt-s3">
                <dt className="font-display text-lg font-bold text-ink">{s.titolo}</dt>
                <dd className="mt-s1 text-md text-ink-secondary">{s.testo}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section id="richiesta-privati" aria-labelledby="richiesta-privati-title" className="bg-raised py-s8 md:py-s9">
        <div className="page-container grid gap-s7 lg:grid-cols-[1fr_1.4fr] lg:gap-s9">
          <div>
            <h2 id="richiesta-privati-title" className="font-display text-2xl font-bold text-ink">
              {c.richiesta.titolo}
            </h2>
            <p className="mt-s3 max-w-[40ch] text-md text-ink-secondary">{c.richiesta.testo}</p>
            <ContactAside />
          </div>
          <RequestFormBlock kind="privati" />
        </div>
      </section>
    </>
  );
}
