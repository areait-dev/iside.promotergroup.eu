import type { Access, CollectionConfig } from "payload";

const loggato: Access = ({ req }) => Boolean(req.user);

/**
 * Richieste di preventivo arrivate dai moduli del sito. Le crea il sito (via /api/richiesta), non si creano dal pannello:
 * i dati inviati sono in sola lettura; si cambiano solo lo stato e le note interne.
 */
export const Richieste: CollectionConfig = {
  slug: "richieste",
  labels: { singular: "Richiesta", plural: "Richieste di preventivo" },
  admin: {
    group: false,
    useAsTitle: "nome",
    defaultColumns: ["nome", "tipo", "dataEvento", "ospiti", "stato", "createdAt"],
    listSearchableFields: ["nome", "email", "telefono"],
    description: "Le richieste inviate dai moduli del sito. Cambia lo stato man mano che le lavori.",
  },
  defaultSort: "-createdAt",
  access: { read: loggato, update: loggato, delete: loggato, create: () => false },
  fields: [
    {
      name: "stato",
      label: "Stato",
      type: "select",
      required: true,
      defaultValue: "nuova",
      index: true,
      options: [
        { label: "Nuova", value: "nuova" },
        { label: "In lavorazione", value: "lavorazione" },
        { label: "Preventivo inviato", value: "inviato" },
        { label: "Confermata", value: "confermata" },
        { label: "Chiusa", value: "chiusa" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "noteInterne", label: "Note interne (non visibili ai clienti)", type: "textarea", admin: { position: "sidebar" } },
    {
      type: "row",
      fields: [
        {
          name: "tipo",
          label: "Tipo di evento",
          type: "select",
          options: [
            { label: "Evento privato", value: "privati" },
            { label: "Evento aziendale", value: "aziendali" },
          ],
          admin: { readOnly: true },
        },
        { name: "dataEvento", label: "Data dell'evento", type: "text", admin: { readOnly: true } },
        { name: "ospiti", label: "Ospiti", type: "number", admin: { readOnly: true } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "occasione", label: "Occasione", type: "text", admin: { readOnly: true } },
        { name: "formato", label: "Formato", type: "text", admin: { readOnly: true } },
      ],
    },
    { name: "nome", label: "Nome e cognome", type: "text", required: true, admin: { readOnly: true } },
    {
      type: "row",
      fields: [
        { name: "telefono", label: "Telefono", type: "text", admin: { readOnly: true } },
        { name: "email", label: "Email", type: "text", admin: { readOnly: true } },
      ],
    },
    { name: "tecniche", label: "Necessità tecniche", type: "textarea", admin: { readOnly: true } },
    { name: "messaggio", label: "Messaggio", type: "textarea", admin: { readOnly: true } },
    {
      type: "row",
      fields: [
        { name: "consenso", label: "Consenso alla privacy", type: "checkbox", admin: { readOnly: true } },
        { name: "consensoIl", label: "Consenso dato il", type: "date", admin: { readOnly: true, date: { pickerAppearance: "dayAndTime" } } },
      ],
    },
  ],
};
