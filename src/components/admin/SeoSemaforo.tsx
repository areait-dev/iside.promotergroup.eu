"use client";

import { useAllFormFields } from "@payloadcms/ui";
import { controlli, livelloGlobale } from "@/lib/seo-check";

const NOMI = ["Da migliorare", "Si può migliorare", "Buono"] as const;

type Props = {
  /** Percorsi dei campi nel modulo. */
  titolo: string;
  descrizione: string;
  parolaChiave: string;
  /** Campi che compongono il titolo grande della pagina (uno o più). */
  titoloPagina: string[];
  /** Indirizzo della pagina, per l'anteprima di Google. */
  url: string;
  /** Se c'è, l'indirizzo è `/` + il valore di questo campo (pagine nuove). */
  slug?: string;
};

/** Semaforo SEO in stile Yoast: anteprima di Google e controlli in tempo reale mentre si scrive. */
export default function SeoSemaforo({ titolo, descrizione, parolaChiave, titoloPagina, url, slug }: Props) {
  const [fields] = useAllFormFields();
  const val = (path: string) => {
    const v = fields[path]?.value;
    return typeof v === "string" ? v : "";
  };
  const dati = {
    titolo: val(titolo),
    descrizione: val(descrizione),
    parolaChiave: val(parolaChiave),
    titoloPagina: titoloPagina.map(val).filter(Boolean).join(" "),
  };
  const c = controlli(dati);
  const globale = livelloGlobale(c);
  const anteprimaTitolo = dati.titolo || "(titolo di partenza della pagina)";
  const anteprimaDescrizione = dati.descrizione || "Nessuna descrizione: Google ne sceglierà una dal testo della pagina.";

  return (
    <div className="seo-semaforo">
      <div className="seo-semaforo__head">
        <span className={`semaforo-dot semaforo-dot--${globale} semaforo-dot--grande`} aria-hidden="true" />
        <strong>SEO: {NOMI[globale]}</strong>
      </div>

      <div className="seo-semaforo__anteprima" aria-label="Anteprima nei risultati di Google">
        <span className="seo-semaforo__url">iside.promotergroup.eu{slug ? `/${val(slug)}` : url}</span>
        <span className="seo-semaforo__titolo">{anteprimaTitolo.slice(0, 60)}</span>
        <span className="seo-semaforo__descrizione">{anteprimaDescrizione.slice(0, 160)}</span>
      </div>

      <ul className="seo-semaforo__lista">
        {c.map((x) => (
          <li key={x.titolo}>
            <span className={`semaforo-dot semaforo-dot--${x.livello}`} aria-hidden="true" />
            <span>
              <strong>{x.titolo}.</strong> {x.dettaglio}
              <span className="sr-only"> ({NOMI[x.livello]})</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
