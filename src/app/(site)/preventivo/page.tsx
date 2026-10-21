import type { Metadata } from "next";
import { Suspense } from "react";
import ContactAside from "@/components/ContactAside";
import QuoteChooser from "@/components/QuoteChooser";
import { CAPIENZE } from "@/content/testi";
import { getTesti } from "@/lib/page-data";
import type { Kind } from "@/lib/request";

const DESCRIPTION = "Richiedi un preventivo per un evento privato o aziendale a Iside: dicci data, ospiti e tipo di evento.";

export async function generateMetadata(): Promise<Metadata> {
  const T = await getTesti();
  const title = `${T.pulsanti.preventivo} — Iside`;
  return {
    title,
    description: DESCRIPTION,
    alternates: { canonical: "/preventivo" },
    openGraph: { title, description: DESCRIPTION, url: "/preventivo" },
  };
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

/** Legge ?tipo=privati|aziendali lato server: il modulo è già nell'HTML, senza attendere l'idratazione. */
async function QuoteFromQuery({ searchParams }: { searchParams: SearchParams }) {
  const { tipo } = await searchParams;
  const T = await getTesti();
  const initialKind: Kind | "" = tipo === "aziendali" ? "aziendali" : tipo === "privati" ? "privati" : "";
  return <QuoteChooser initialKind={initialKind} aside={<ContactAside />} t={T} capienze={CAPIENZE} />;
}

async function QuoteFallback() {
  const T = await getTesti();
  return <QuoteChooser initialKind="" aside={<ContactAside />} t={T} capienze={CAPIENZE} />;
}

export default async function Preventivo({ searchParams }: { searchParams: SearchParams }) {
  const T = await getTesti();
  return (
    <>
      <section className="page-container pt-[calc(var(--header-height)+var(--space-8))] pb-s7 md:pb-s8">
        <h1 className="font-display text-2xl font-bold text-ink md:text-3xl">{T.pulsanti.preventivo}</h1>
        <p className="mt-s3 max-w-[50ch] text-lg text-ink-secondary">{T.preventivo.testo}</p>
      </section>
      {/* searchParams è dato di richiesta: va letto dentro <Suspense>. Il fallback è già la scelta completa. */}
      <Suspense fallback={<QuoteFallback />}>
        <QuoteFromQuery searchParams={searchParams} />
      </Suspense>
    </>
  );
}
