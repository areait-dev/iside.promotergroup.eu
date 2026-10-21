import type { CollectionConfig } from "payload";
import { revalidatePages } from "../lib/revalidate";

/** Foto del sito. Il testo alternativo è obbligatorio: serve a chi usa uno screen reader e a Google. */
export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Foto", plural: "Foto" },
  admin: { useAsTitle: "alt", group: false },
  access: { read: () => true },
  hooks: { afterChange: [() => revalidatePages()] },
  upload: {
    mimeTypes: ["image/*"],
    imageSizes: [
      { name: "miniatura", width: 480 },
      { name: "grande", width: 1600 },
    ],
    adminThumbnail: "miniatura",
  },
  fields: [
    {
      name: "alt",
      label: "Descrizione della foto",
      type: "text",
      required: true,
      admin: { description: "Cosa si vede, in una frase (es. «Il cortile di sera con i tavoli del buffet sotto i lampadari»)." },
    },
  ],
};
