import { DefaultTemplate } from "@payloadcms/next/templates";
import { Gutter } from "@payloadcms/ui";
import type { AdminViewServerProps } from "payload";

export type Riga = {
  titolo: string;
  nota: string;
  /** Dove si modifica (una pagina del pannello). */
  modifica: string;
  /** Indirizzo sul sito: se c'è compare «Visualizza». */
  url?: string;
  /** Global da cui leggere l'ultima modifica. */
  slug?: string;
  /** Valutazione SEO (0 rosso, 1 arancione, 2 verde), solo per le pagine. */
  seo?: 0 | 1 | 2;
  /** Ultima modifica già nota (le pagine create dal pannello); altrimenti si legge dal global. */
  aggiornata?: string;
};

const data = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";

const SEMAFORO = ["Da migliorare", "Si può migliorare", "Buono"] as const;

/** Elenco di voci del pannello, in stile WordPress: titolo, ultima modifica e azioni. Usato da «Pagine» e «Impostazioni». */
export default async function ElencoView({
  titolo,
  intro,
  righe,
  colonnaUrl,
  conSeo,
  azione,
  view,
}: {
  titolo: string;
  intro: string;
  righe: Riga[];
  colonnaUrl?: boolean;
  conSeo?: boolean;
  /** Pulsante accanto al titolo (es. «Aggiungi pagina»). */
  azione?: { testo: string; href: string };
  view: AdminViewServerProps;
}) {
  const { initPageResult, params, searchParams } = view;
  const { req, locale, permissions, visibleEntities } = initPageResult;
  const aggiornate = await Promise.all(
    righe.map(async (r) => {
      if (r.aggiornata) return r.aggiornata;
      if (!r.slug) return undefined;
      try {
        const doc = (await req.payload.findGlobal({ slug: r.slug as "home", depth: 0 })) as { updatedAt?: string; createdAt?: string };
        return doc.createdAt ? doc.updatedAt : undefined;
      } catch {
        return undefined;
      }
    }),
  );

  return (
    <DefaultTemplate
      i18n={req.i18n}
      locale={locale}
      params={params}
      payload={req.payload}
      permissions={permissions}
      searchParams={searchParams}
      user={req.user || undefined}
      visibleEntities={visibleEntities}
    >
      <Gutter>
        <div className="pagine-view">
          <div className="pagine-view__testa">
            <h1>{titolo}</h1>
            {azione && (
              <a href={azione.href} className="pagine-view__aggiungi">
                {azione.testo}
              </a>
            )}
          </div>
          <p className="pagine-view__intro">{intro}</p>
          <table className="pagine-view__table">
            <thead>
              <tr>
                <th scope="col">Titolo</th>
                {colonnaUrl && <th scope="col">Indirizzo</th>}
                {conSeo && <th scope="col">SEO</th>}
                <th scope="col">Ultima modifica</th>
                <th scope="col">
                  <span className="pagine-view__sr">Azioni</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {righe.map((r, i) => (
                <tr key={`${r.modifica}-${r.titolo}`}>
                  <td>
                    <a href={r.modifica} className="pagine-view__title">
                      {r.titolo}
                    </a>
                    <span className="pagine-view__note">{r.nota}</span>
                  </td>
                  {colonnaUrl && (
                    <td>
                      <code>{r.url}</code>
                    </td>
                  )}
                  {conSeo && (
                    <td>
                      {r.seo !== undefined ? (
                        <span className="semaforo-chip">
                          <span className={`semaforo-dot semaforo-dot--${r.seo}`} aria-hidden="true" />
                          {SEMAFORO[r.seo]}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                  )}
                  <td>{data(aggiornate[i])}</td>
                  <td className="pagine-view__actions">
                    <a href={r.modifica}>Modifica</a>
                    {r.url && (
                      <a href={r.url} target="_blank" rel="noopener noreferrer">
                        Visualizza ↗
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Gutter>
    </DefaultTemplate>
  );
}
