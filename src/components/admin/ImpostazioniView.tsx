import type { AdminViewServerProps } from "payload";
import ElencoView, { type Riga } from "./ElencoView";

const VOCI: Riga[] = [
  { titolo: "Impostazioni del sito", modifica: "/admin/globals/impostazioni", slug: "impostazioni", nota: "Contatti, dove siamo, social, privacy e dati societari." },
  { titolo: "Testi del sito", modifica: "/admin/globals/testi", slug: "testi", nota: "Pulsanti, footer, contatti, pagina 404, Preventivo e modulo di richiesta." },
  { titolo: "Menu", modifica: "/admin/globals/menu", slug: "menu", nota: "Le voci di navigazione di navbar, menu mobile e footer." },
  { titolo: "Fascia finale", modifica: "/admin/globals/fascia-finale", slug: "fascia-finale", nota: "La fascia blu «Organizza il tuo evento» in fondo alle pagine." },
];

/** «Impostazioni»: tutto ciò che non è una singola pagina, in un unico elenco. */
export default function ImpostazioniView(props: AdminViewServerProps) {
  return <ElencoView titolo="Impostazioni" intro="Dati e testi che valgono per tutto il sito." righe={VOCI} view={props} />;
}
