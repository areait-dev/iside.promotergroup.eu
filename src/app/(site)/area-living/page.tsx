import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import PhotoGrid from "@/components/PhotoGrid";
import { toPhotos } from "@/content/gallerie";
import { AREA_LIVING_PAGINA } from "@/content/pages";
import { getContent } from "@/lib/page-data";

const DESCRIPTION =
  "L'area living di Iside riunisce piscina, giardino con gazebi e bordo piscina coperto per feste private e incontri aziendali.";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getContent("area-living", AREA_LIVING_PAGINA);
  const title = seo.titolo || "Area living con piscina — Iside";
  const description = seo.descrizione || DESCRIPTION;
  return {
    title,
    description,
    alternates: { canonical: "/area-living" },
    openGraph: {
      title,
      description,
      url: "/area-living",
      images: [{ url: "/images/al-pxl.jpg", width: 2000, height: 1506, alt: "La piscina di Iside con i gazebi bianchi, i lettini e le palme sullo sfondo" }],
    },
  };
}

export default async function AreaLiving() {
  const c = await getContent("area-living", AREA_LIVING_PAGINA);
  return (
    <>
      <PageHero image={c.hero.foto.src} alt={c.hero.foto.alt} title={c.hero.titolo} />

      <section aria-labelledby="spazi-title" className="page-container py-s8 md:py-s9">
        <h2 id="spazi-title" className="font-display text-xl font-bold leading-snug text-ink md:leading-snug lg:text-2xl">
          {c.intro.titolo.map((r) => (
            <span key={r.testo} className="block">
              {r.testo}
            </span>
          ))}
        </h2>
        <p className="mt-s4 max-w-[60ch] text-lg text-ink-secondary">{c.intro.testo}</p>
        <dl className="mt-s7 grid gap-s5 md:grid-cols-3 md:gap-s7">
          {c.spazi.map((s) => (
            <div key={s.titolo} className="border-t border-ink/40 pt-s3">
              <dt className="font-display text-lg font-bold text-ink">{s.titolo}</dt>
              <dd className="mt-s1 text-md text-ink-secondary">{s.testo}</dd>
            </div>
          ))}
        </dl>
        {c.servizi.testo && <p className="mt-s6 max-w-[60ch] text-md text-ink-secondary">Servizi inclusi: {c.servizi.testo}</p>}
      </section>

      {c.galleria.length > 0 && <PhotoGrid photos={toPhotos(c.galleria, true)} label="Foto dell'area living" />}
      <CtaBand percorso="/area-living" />
    </>
  );
}
