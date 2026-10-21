import type { GlobalConfig } from "payload";
import { revalidateSite } from "../lib/revalidate";

/** Voci del menu di navigazione (navbar, menu mobile, footer e pagina 404). La Home c'è sempre. */
export const Menu: GlobalConfig = {
  slug: "menu",
  label: "Menu",
  admin: { group: false },
  access: { read: () => true },
  hooks: { afterChange: [() => revalidateSite()] },
  fields: [
    {
      name: "voci",
      label: "Voci del menu",
      type: "array",
      labels: { singular: "Voce", plural: "Voci" },
      admin: { description: "Trascina per cambiare l'ordine." },
      fields: [
        { name: "etichetta", label: "Testo", type: "text", required: true },
        { name: "indirizzo", label: "Indirizzo", type: "text", required: true, admin: { description: "Una pagina del sito (es. /cucina, /#contatti) o un link completo." } },
      ],
    },
  ],
};
