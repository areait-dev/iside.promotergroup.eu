import type { AdminViewServerProps } from "payload";
import { controlli, livelloGlobale } from "@/lib/seo-check";
import ElencoView, { type Riga } from "./ElencoView";

type Pagina = Riga & { home?: boolean; conSeo?: boolean };

/** Le pagine del sito, nell'ordine in cui le vorrebbe vedere chi arriva da WordPress. */
const PAGINE: Pagina[] = [
  { titolo: "Home", url: "/", modifica: "/admin/globals/home", slug: "home", nota: "Titolo, presentazione, pulsanti e schede degli spazi.", home: true, conSeo: true },
  { titolo: "Eventi privati", url: "/eventi-privati", modifica: "/admin/globals/eventi-privati", slug: "eventi-privati", nota: "Testi, foto, serate, servizi e richiesta.", conSeo: true },
  { titolo: "Eventi aziendali", url: "/eventi-aziendali", modifica: "/admin/globals/eventi-aziendali", slug: "eventi-aziendali", nota: "Testi, offerta, foto degli eventi e richiesta.", conSeo: true },
  { titolo: "Cucina", url: "/cucina", modifica: "/admin/globals/cucina", slug: "cucina", nota: "Colazione, pranzo, orari e menu.", conSeo: true },
  { titolo: "Area living", url: "/area-living", modifica: "/admin/globals/area-living", slug: "area-living", nota: "Piscina, giardino, gazebi e galleria.", conSeo: true },
  { titolo: "Centro congressi", url: "/centro-congressi", modifica: "/admin/globals/centro-congressi", slug: "centro-congressi", nota: "Scheda tecnica, galleria e richiesta.", conSeo: true },
  { titolo: "Preventivo", url: "/preventivo", modifica: "/admin/globals/testi", slug: "testi", nota: "I testi stanno in «Testi del sito → Pagina Preventivo» e «Modulo di richiesta»." },
  { titolo: "Privacy", url: "/privacy", modifica: "/admin/globals/impostazioni", slug: "impostazioni", nota: "I dati del titolare stanno in «Impostazioni del sito → Privacy e cookie»." },
  { titolo: "Cookie", url: "/cookie", modifica: "/admin/globals/impostazioni", slug: "impostazioni", nota: "I dati del titolare stanno in «Impostazioni del sito → Privacy e cookie»." },
];

const s = (v: unknown) => (typeof v === "string" ? v : "");

/** «Pagine»: tutte le pagine del sito in un elenco, come in WordPress, con modifica, anteprima e semaforo SEO. */
export default async function PagineView(props: AdminViewServerProps) {
  const { payload } = props.initPageResult.req;
  const righe: Riga[] = await Promise.all(
    PAGINE.map(async (p) => {
      if (!p.conSeo) return p;
      try {
        const d = (await payload.findGlobal({ slug: p.slug as "home", depth: 0 })) as Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
        const dati = p.home
          ? {
              titolo: s(d.seoTitolo),
              descrizione: s(d.seoDescrizione),
              parolaChiave: s(d.seoParolaChiave),
              titoloPagina: ((d.titolo as { testo?: string }[]) ?? []).map((r) => s(r.testo)).join(" "),
            }
          : { titolo: s(d.seo?.titolo), descrizione: s(d.seo?.descrizione), parolaChiave: s(d.seo?.parolaChiave), titoloPagina: s(d.hero?.titolo) };
        return { ...p, seo: livelloGlobale(controlli(dati)) };
      } catch {
        return { ...p, seo: 0 as const };
      }
    }),
  );
  // Pagine create dal pannello («Aggiungi pagina»): in coda a quelle del sito
  let nuove: Riga[] = [];
  try {
    const r = await payload.find({ collection: "pagine" as "users", limit: 100, depth: 0, sort: "-updatedAt" });
    nuove = (r.docs as unknown as Record<string, any>[]).map((d) => { // eslint-disable-line @typescript-eslint/no-explicit-any
      const pubblicata = d.stato === "pubblicata";
      const seo = d.seo ?? {};
      return {
        titolo: s(d.titolo) || "(senza titolo)",
        nota: pubblicata ? "Pagina creata dal pannello · Pubblicata" : "Pagina creata dal pannello · Bozza (non visibile sul sito)",
        modifica: `/admin/collections/pagine/${d.id}`,
        url: pubblicata ? `/${s(d.slug)}` : undefined,
        aggiornata: s(d.updatedAt),
        seo: livelloGlobale(controlli({ titolo: s(seo.titolo), descrizione: s(seo.descrizione), parolaChiave: s(seo.parolaChiave), titoloPagina: s(d.titolo) })),
      };
    });
  } catch {
    nuove = [];
  }
  return (
    <ElencoView
      titolo="Pagine"
      intro="Tutte le pagine del sito. Clicca sul titolo per modificarla, su «Visualizza» per vederla online. Il semaforo dice come va la SEO di ogni pagina."
      righe={[...righe, ...nuove]}
      azione={{ testo: "Aggiungi pagina", href: "/admin/collections/pagine/create" }}
      colonnaUrl
      conSeo
      view={props}
    />
  );
}
