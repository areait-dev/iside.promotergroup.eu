import RequestForm from "./RequestForm";
import { CAPIENZE } from "@/content/testi";
import { getTesti } from "@/lib/page-data";
import type { Kind } from "@/lib/request";

/** Modulo di richiesta con i testi presi dal pannello (il modulo vero è un componente client). */
export default async function RequestFormBlock({ kind }: { kind: Kind }) {
  const T = await getTesti();
  return <RequestForm kind={kind} t={T.modulo} capienze={CAPIENZE} />;
}
