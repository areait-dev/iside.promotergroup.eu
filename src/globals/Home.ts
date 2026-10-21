import type { GlobalConfig } from "payload";
import { revalidatePages } from "../lib/revalidate";

/** Home: i testi, i pulsanti e le schede degli spazi. Un campo lasciato vuoto usa il testo di partenza. */
export const Home: GlobalConfig = {
  slug: "home",
  label: "Home",
  admin: { group: false, description: "La pagina principale del sito." },
  access: { read: () => true },
  versions: { max: 20 },
  hooks: { afterChange: [() => revalidatePages()] },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "In cima alla pagina",
          fields: [
            {
              name: "titolo",
              label: "Titolo (una riga per ogni a capo)",
              type: "array",
              labels: { singular: "Riga", plural: "Righe" },
              minRows: 1,
              maxRows: 4,
              fields: [{ name: "testo", label: "Testo", type: "text", required: true }],
            },
            {
              name: "rigaMarchio",
              label: "Riga sotto il titolo",
              type: "text",
              admin: { description: "Scrivi {societa} per inserire la ragione sociale delle Impostazioni del sito." },
            },
            { name: "introduzione", label: "Testo di presentazione", type: "textarea" },
            {
              name: "ctaPrivati",
              label: "Primo pulsante",
              type: "group",
              fields: [
                { name: "testo", label: "Testo del pulsante", type: "text" },
                { name: "link", label: "Dove porta", type: "text" },
              ],
            },
            {
              name: "ctaAziende",
              label: "Secondo pulsante",
              type: "group",
              fields: [
                { name: "testo", label: "Testo del pulsante", type: "text" },
                { name: "link", label: "Dove porta", type: "text" },
              ],
            },
          ],
        },
        {
          label: "Gli spazi",
          fields: [
            { name: "titoloSpazi", label: "Titolo della sezione", type: "text" },
            {
              name: "schede",
              label: "Schede degli spazi",
              type: "array",
              labels: { singular: "Scheda", plural: "Schede" },
              admin: { description: "Trascina per cambiare l'ordine." },
              fields: [
                { name: "titolo", label: "Titolo", type: "text", required: true },
                { name: "testo", label: "Descrizione breve", type: "textarea" },
                { name: "link", label: "Dove porta", type: "text", required: true },
                { name: "foto", label: "Foto", type: "upload", relationTo: "media", required: true },
              ],
            },
          ],
        },
        {
          label: "Google",
          fields: [
            { name: "seoParolaChiave", label: "Parola chiave principale", type: "text", admin: { description: "La frase con cui vuoi essere trovato su Google, es. «sala eventi Vittoria»." } },
            { name: "seoTitolo", label: "Titolo nei risultati di ricerca", type: "text", maxLength: 70 },
            { name: "seoDescrizione", label: "Descrizione nei risultati di ricerca", type: "textarea", maxLength: 170 },
            {
              type: "ui",
              name: "semaforo",
              admin: {
                components: {
                  Field: {
                    path: "/components/admin/SeoSemaforo#default",
                    clientProps: {
                      titolo: "seoTitolo",
                      descrizione: "seoDescrizione",
                      parolaChiave: "seoParolaChiave",
                      titoloPagina: ["titolo.0.testo", "titolo.1.testo", "titolo.2.testo", "titolo.3.testo"],
                      url: "/",
                    },
                  },
                },
              },
            },
          ],
        },
      ],
    },
  ],
};
