import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Blocchi from "@/components/Blocchi";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { getPagina, getSlugsPagine } from "@/lib/page-data";

/** Le pagine create dal pannello: nuove pagine compaiono alla prima visita, poi restano in cache fino alla prossima modifica. */
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getSlugsPagine()).map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPagina(slug);
  if (!p) return { title: "Pagina non trovata — Iside", robots: { index: false } };
  const title = p.seo.titolo || `${p.titolo} — Iside`;
  const description = p.seo.descrizione || p.introduzione || undefined;
  return {
    title,
    description,
    alternates: { canonical: `/${slug}` },
    openGraph: { title, description, url: `/${slug}`, ...(p.foto && { images: [{ url: p.foto.src, alt: p.foto.alt }] }) },
  };
}

export default async function PaginaNuova({ params }: Props) {
  const { slug } = await params;
  const p = await getPagina(slug);
  if (!p) notFound();
  return (
    <>
      {p.foto ? (
        <PageHero image={p.foto.src} alt={p.foto.alt} title={p.titolo} />
      ) : (
        <section className="page-container pt-[calc(var(--header-height)+var(--space-8))] pb-s6">
          <h1 className="font-display text-2xl font-bold text-ink md:text-3xl">{p.titolo}</h1>
        </section>
      )}
      {p.introduzione && (
        <section className="page-container py-s7 md:py-s8">
          <p className="max-w-[60ch] text-lg text-ink-secondary">{p.introduzione}</p>
        </section>
      )}
      <div className={p.introduzione ? "" : "pt-s7 md:pt-s8"}>
        <Blocchi blocchi={p.blocchi} />
      </div>
      <CtaBand percorso={`/${slug}`} />
    </>
  );
}
