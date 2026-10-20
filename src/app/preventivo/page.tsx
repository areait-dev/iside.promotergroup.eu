import type { Metadata } from "next";
import { Suspense } from "react";
import QuoteChooser from "@/components/QuoteChooser";
import { CTA } from "@/config/site";
import type { Kind } from "@/lib/request";

const DESCRIPTION = "Richiedi un preventivo per un evento privato o aziendale a Iside: dicci data, ospiti e tipo di evento.";

export const metadata: Metadata = {
  title: `${CTA.label} — Iside`,
  description: DESCRIPTION,
  alternates: { canonical: "/preventivo" },
  openGraph: { title: `${CTA.label} — Iside`, description: DESCRIPTION, url: "/preventivo" },
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

/** Legge ?tipo=privati|aziendali lato server: il modulo è già nell'HTML, senza attendere l'idratazione. */
async function QuoteFromQuery({ searchParams }: { searchParams: SearchParams }) {
  const { tipo } = await searchParams;
  const initialKind: Kind | "" = tipo === "aziendali" ? "aziendali" : tipo === "privati" ? "privati" : "";
  return <QuoteChooser initialKind={initialKind} />;
}

export default function Preventivo({ searchParams }: { searchParams: SearchParams }) {
  return (
    <>
      <section className="page-container pt-[calc(var(--header-height)+var(--space-8))] pb-s7 md:pb-s8">
        <h1 className="font-display text-2xl font-bold text-ink md:text-3xl">{CTA.label}</h1>
        <p className="mt-s3 max-w-[50ch] text-lg text-ink-secondary">
          Dicci che evento hai in mente, la data e il numero di ospiti: ti ricontattiamo noi.
        </p>
      </section>
      {/* cacheComponents: searchParams è dato di richiesta, va letto dentro <Suspense>. Il fallback è già la scelta completa. */}
      <Suspense fallback={<QuoteChooser initialKind="" />}>
        <QuoteFromQuery searchParams={searchParams} />
      </Suspense>
    </>
  );
}
