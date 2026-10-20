import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import PhotoGrid, { type Photo } from "@/components/PhotoGrid";
import { AREA_LIVING_SERVICES, CAPACITY, capacityNote, isTodo } from "@/config/site";

const DESCRIPTION =
  "L'area living di Iside riunisce piscina, giardino con gazebi e bordo piscina coperto per feste private e incontri aziendali.";

export const metadata: Metadata = {
  title: "Area living con piscina — Iside",
  description: DESCRIPTION,
  alternates: { canonical: "/area-living" },
  openGraph: {
    title: "Area living con piscina — Iside",
    description: DESCRIPTION,
    url: "/area-living",
    images: [{ url: "/images/al-pxl.jpg", width: 2000, height: 1506, alt: "La piscina di Iside con i gazebi bianchi, i lettini e le palme sullo sfondo" }],
  },
};

const SPACES: [string, string][] = [
  ["Piscina", `Con lettini e arredi bianchi a bordo vasca.${capacityNote(CAPACITY.piscina)}`],
  ["Giardino e gazebi", `Prato, ulivi e gazebi con sedute.${capacityNote(CAPACITY.giardino)}`],
  ["Bordo piscina coperto", `Circa ${CAPACITY.bordoPiscinaCoperto} ospiti.`],
];

/* span/aspect mobile (2 colonne) → md (6 colonne, righe da 420px) */
const PHOTOS: Photo[] = [
  { src: "/images/al-165000.jpg", w: 1059, h: 621, cls: "col-span-2 aspect-[16/10] md:col-span-4", alt: "Veduta dall'alto della piscina con i lettini, i gazebi bianchi e il prato" },
  { src: "/images/al-1559.jpg", w: 1500, h: 2000, cls: "aspect-[3/4] md:col-span-2", alt: "La piscina vista dal bordo vasca, con palme, lampade bianche e lettini sullo sfondo" },
  { src: "/images/al-1552.jpg", w: 1500, h: 2000, cls: "aspect-[3/4] md:col-span-2", alt: "L'acqua della piscina con i gazebi, l'ulivo e la sala vetrata sullo sfondo" },
  { src: "/images/al-sdraio.jpg", w: 1391, h: 879, cls: "col-span-2 aspect-[16/10] md:col-span-4", alt: "Lettini a bordo piscina, con il bancone bianco e un gazebo nel giardino" },
  { src: "/images/al-164220.jpg", w: 1457, h: 874, cls: "col-span-2 aspect-[16/9] md:col-span-3", alt: "La piscina vista dall'alto, con il trampolino e la fila di lettini" },
  { src: "/images/al-165248.jpg", w: 1058, h: 817, cls: "col-span-2 aspect-[16/10] md:col-span-3", alt: "Due gazebi bianchi con pouf sul prato, visti dall'alto" },
];

export default function AreaLiving() {
  return (
    <>
      <PageHero
        image="/images/al-pxl.jpg"
        alt="La piscina di Iside con i gazebi bianchi, i lettini e le palme sullo sfondo"
        title="Area living"
      />

      <section aria-labelledby="spazi-title" className="page-container py-s8 md:py-s9">
        <h2 id="spazi-title" className="font-display text-xl font-bold leading-snug text-ink md:leading-snug lg:text-2xl">
          <span className="block">Piscina, giardino e gazebi</span>
          <span className="block">per feste private e incontri aziendali.</span>
        </h2>
        <p className="mt-s4 max-w-[60ch] text-lg text-ink-secondary">
          L’area living riunisce la piscina, il prato con gli ulivi e i gazebi con sedute, e il bordo piscina coperto. Un unico spazio
          all’aperto, per lavorare, festeggiare e stare insieme.
        </p>
        <dl className="mt-s7 grid gap-s5 md:grid-cols-3 md:gap-s7">
          {SPACES.map(([title, text]) => (
            <div key={title} className="border-t border-ink/40 pt-s3">
              <dt className="font-display text-lg font-bold text-ink">{title}</dt>
              <dd className="mt-s1 text-md text-ink-secondary">{text}</dd>
            </div>
          ))}
        </dl>
        {!isTodo(AREA_LIVING_SERVICES) && (
          <p className="mt-s6 max-w-[60ch] text-md text-ink-secondary">Servizi inclusi: {AREA_LIVING_SERVICES}</p>
        )}
      </section>

      <PhotoGrid photos={PHOTOS} label="Foto dell'area living" />
      <CtaBand />
    </>
  );
}
