import type { Metadata } from "next";
import Link from "next/link";
import ContactAside from "@/components/ContactAside";
import PageHero from "@/components/PageHero";
import PhotoGrid from "@/components/PhotoGrid";
import RequestFormBlock from "@/components/RequestFormBlock";
import { toPhotos } from "@/content/gallerie";
import { EVENTI_AZIENDALI } from "@/content/pages";
import { getContent } from "@/lib/page-data";

const DESCRIPTION =
  "Convegni, seminari, coffee break, cene aziendali e team building a Iside, fino a 200 invitati. Richiedi un preventivo.";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getContent("eventi-aziendali", EVENTI_AZIENDALI);
  const title = seo.titolo || "Eventi aziendali — Iside";
  const description = seo.descrizione || DESCRIPTION;
  return {
    title,
    description,
    alternates: { canonical: "/eventi-aziendali" },
    openGraph: {
      title,
      description,
      url: "/eventi-aziendali",
      images: [{ url: "/images/cc-6372.jpg", width: 2000, height: 1333, alt: "La sala del Centro congressi con la pedana e il tavolo dei relatori" }],
    },
  };
}

const link =
  "mt-s2 inline-flex min-h-11 items-center text-md font-semibold text-water underline underline-offset-4 decoration-from-font hover:text-night";

export default async function EventiAziendali() {
  const c = await getContent("eventi-aziendali", EVENTI_AZIENDALI);
  return (
    <>
      <PageHero image={c.hero.foto.src} alt={c.hero.foto.alt} title={c.hero.titolo} />

      <section aria-labelledby="offerta-title" className="page-container py-s8 md:py-s9">
        <h2 id="offerta-title" className="font-display text-xl font-bold leading-snug text-ink md:leading-snug lg:text-2xl">
          {c.intro.titolo.map((r) => (
            <span key={r.testo} className="block">
              {r.testo}
            </span>
          ))}
        </h2>
        <dl className="mt-s7 grid gap-s5 md:grid-cols-3 md:gap-s7">
          {c.offerte.map((o) => (
            <div key={o.titolo} className="border-t border-ink/40 pt-s3">
              <dt className="font-display text-lg font-bold text-ink">{o.titolo}</dt>
              <dd className="mt-s1 text-md text-ink-secondary">
                {o.testo}
                {o.linkTesto && o.linkHref && (
                  <>
                    <br />
                    <Link href={o.linkHref} className={link}>
                      {o.linkTesto}
                    </Link>
                  </>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {c.galleria.length > 0 && (
      <section aria-labelledby="eventi-title">
        <div className="page-container">
          <h2 id="eventi-title" className="font-display text-xl font-bold text-ink md:text-2xl">
            {c.eventi.titolo}
          </h2>
          <p className="mt-s3 max-w-[50ch] text-md text-ink-secondary">{c.eventi.testo}</p>
        </div>
        <div className="mt-s6">
          <PhotoGrid photos={toPhotos(c.galleria, false)} label="Foto degli eventi aziendali" layout="strip" />
        </div>
      </section>
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
