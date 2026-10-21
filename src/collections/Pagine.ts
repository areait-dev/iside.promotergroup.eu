import type { Block, CollectionConfig, Field } from "payload";
import { revalidatePages } from "../lib/revalidate";

/** Indirizzi già usati dal sito: una pagina nuova non può prenderli. */
export const SLUG_RISERVATI = [
  "admin",
  "api",
  "area-living",
  "centro-congressi",
  "cookie",
  "cucina",
  "eventi-aziendali",
  "eventi-privati",
  "preventivo",
  "prenota",
  "privacy",
  "robots.txt",
  "sitemap.xml",
  "favicon.ico",
];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const loggato = ({ req }: { req: { user?: unknown } }) => Boolean(req.user);
const testo = (name: string, label: string, extra: Record<string, unknown> = {}) => ({ name, label, type: "text", ...extra }) as Field;
const area = (name: string, label: string, extra: Record<string, unknown> = {}) => ({ name, label, type: "textarea", ...extra }) as Field;

/* ---- Blocchi: i «pezzi» con cui si compone una pagina nuova ---- */

const Testo: Block = {
  slug: "testo",
  labels: { singular: "Testo", plural: "Testi" },
  fields: [
    testo("titolo", "Titolo (facoltativo)"),
    { name: "contenuto", label: "Testo", type: "richText", required: true },
  ],
};

const FotoETesto: Block = {
  slug: "fotoTesto",
  labels: { singular: "Foto e testo", plural: "Foto e testo" },
  fields: [
    testo("titolo", "Titolo"),
    area("testo", "Testo"),
    { name: "foto", label: "Foto", type: "upload", relationTo: "media", required: true },
    {
      name: "lato",
      label: "Dove sta la foto",
      type: "select",
      defaultValue: "destra",
      options: [
        { label: "A destra", value: "destra" },
        { label: "A sinistra", value: "sinistra" },
      ],
    },
    testo("linkTesto", "Testo del link (facoltativo)"),
    testo("linkHref", "Dove porta il link"),
  ],
};

const Schede: Block = {
  slug: "schede",
  labels: { singular: "Elenco di punti", plural: "Elenchi di punti" },
  fields: [
    testo("titolo", "Titolo (facoltativo)"),
    {
      name: "voci",
      label: "Punti",
      type: "array",
      labels: { singular: "Punto", plural: "Punti" },
      minRows: 1,
      fields: [testo("titolo", "Titolo", { required: true }), area("testo", "Testo")],
    },
  ],
};

const Galleria: Block = {
  slug: "galleria",
  labels: { singular: "Galleria di foto", plural: "Gallerie di foto" },
  fields: [
    testo("titolo", "Titolo (facoltativo)"),
    {
      name: "immagini",
      label: "Foto",
      type: "array",
      labels: { singular: "Foto", plural: "Foto" },
      minRows: 1,
      admin: { description: "Scorrono in una fila; toccandole si ingrandiscono." },
      fields: [{ name: "foto", label: "Foto", type: "upload", relationTo: "media", required: true }],
    },
  ],
};

const Fascia: Block = {
  slug: "fascia",
  labels: { singular: "Fascia con pulsanti", plural: "Fasce con pulsanti" },
  fields: [
    testo("titolo", "Titolo", { required: true }),
    area("testo", "Testo"),
    {
      type: "row",
      fields: [testo("pulsante", "Testo del pulsante"), testo("href", "Dove porta (es. /preventivo)")],
    },
  ],
};

/**
 * Pagine nuove, create dal pannello («Aggiungi pagina»). Le pagine del sito già esistenti (Home, Eventi privati…)
 * hanno la loro scheda in «Pagine»; queste si compongono con i blocchi qui sotto e vivono su un loro indirizzo.
 */
export const Pagine: CollectionConfig = {
  slug: "pagine",
  labels: { singular: "Pagina", plural: "Pagine" },
  admin: {
    group: false,
    useAsTitle: "titolo",
    defaultColumns: ["titolo", "slug", "stato", "updatedAt"],
    listSearchableFields: ["titolo", "slug"],
  },
  defaultSort: "-updatedAt",
  access: {
    // Il pubblico vede solo le pagine pubblicate; chi è nel pannello vede anche le bozze.
    read: ({ req }) => (req.user ? true : { stato: { equals: "pubblicata" } }),
    create: loggato,
    update: loggato,
    delete: loggato,
  },
  hooks: {
    // L'indirizzo: quello scritto, ripulito; se manca si ricava dal titolo.
    beforeValidate: [({ data }) => (data ? { ...data, slug: slugify(String(data.slug || data.titolo || "")) } : data)],
    afterChange: [() => revalidatePages()],
    afterDelete: [() => revalidatePages()],
  },
  fields: [
    {
      name: "stato",
      label: "Stato",
      type: "select",
      required: true,
      defaultValue: "bozza",
      index: true,
      options: [
        { label: "Bozza (non visibile sul sito)", value: "bozza" },
        { label: "Pubblicata", value: "pubblicata" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "slug",
      label: "Indirizzo",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { position: "sidebar", description: "La parte dopo il dominio, solo lettere minuscole, numeri e trattini (es. matrimoni)." },
      validate: (value: string | null | undefined) => {
        const v = String(value ?? "");
        if (!v) return "Scrivi l'indirizzo della pagina.";
        if (SLUG_RISERVATI.includes(v)) return `«${v}» è già usato dal sito: scegli un altro indirizzo.`;
        return true;
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Contenuto",
          fields: [
            testo("titolo", "Titolo della pagina", { required: true }),
            { name: "foto", label: "Foto di sfondo in cima (facoltativa)", type: "upload", relationTo: "media" },
            area("introduzione", "Frase di apertura (facoltativa)"),
            {
              name: "blocchi",
              label: "Contenuto della pagina",
              type: "blocks",
              labels: { singular: "Blocco", plural: "Blocchi" },
              blocks: [Testo, FotoETesto, Schede, Galleria, Fascia],
              admin: { description: "Aggiungi i blocchi uno dopo l'altro e trascinali per cambiare l'ordine." },
            },
          ],
        },
        {
          label: "Google",
          fields: [
            {
              name: "seo",
              label: "Risultati di ricerca",
              type: "group",
              fields: [
                testo("parolaChiave", "Parola chiave principale", { admin: { description: "La frase con cui vuoi essere trovato su Google." } }),
                testo("titolo", "Titolo", { maxLength: 70, admin: { description: "Se lo lasci vuoto vale il titolo della pagina." } }),
                area("descrizione", "Descrizione", { maxLength: 170 }),
                {
                  type: "ui",
                  name: "semaforo",
                  admin: {
                    components: {
                      Field: {
                        path: "/components/admin/SeoSemaforo#default",
                        clientProps: {
                          titolo: "seo.titolo",
                          descrizione: "seo.descrizione",
                          parolaChiave: "seo.parolaChiave",
                          titoloPagina: ["titolo"],
                          url: "/",
                          slug: "slug",
                        },
                      },
                    },
                  },
                } as Field,
              ],
            },
          ],
        },
      ],
    },
  ],
};
