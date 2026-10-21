import type { GlobalConfig } from "payload";
import { revalidateSite } from "../lib/revalidate";

const GIORNI = [
  { label: "Lunedì", value: "Monday" },
  { label: "Martedì", value: "Tuesday" },
  { label: "Mercoledì", value: "Wednesday" },
  { label: "Giovedì", value: "Thursday" },
  { label: "Venerdì", value: "Friday" },
  { label: "Sabato", value: "Saturday" },
  { label: "Domenica", value: "Sunday" },
];

/**
 * Dati del sito in un solo posto (contatti, dove siamo, social, dati societari).
 * Un campo lasciato vuoto vuol dire "non mostrare": il sito nasconde da solo ciò che manca.
 */
export const SiteSettings: GlobalConfig = {
  slug: "impostazioni",
  label: "Impostazioni del sito",
  admin: { group: false },
  access: { read: () => true },
  hooks: { afterChange: [() => revalidateSite()] },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Contatti",
          fields: [
            { name: "telefono", label: "Telefono", type: "text", admin: { description: "Come lo vuoi mostrare (es. 0932 1618964). Il link «Chiama» si ricava da solo." } },
            { name: "email", label: "Email", type: "email" },
            {
              name: "whatsapp",
              label: "Numero WhatsApp",
              type: "text",
              admin: { description: "Con il prefisso (es. +39 392 070 2561). Se lo lasci vuoto il pulsante WhatsApp scompare dal sito." },
            },
            { name: "tempiRisposta", label: "Tempi di risposta alle richieste", type: "text" },
            {
              name: "emailRichieste",
              label: "Email che ricevono le richieste di preventivo",
              type: "text",
              admin: { description: "Uno o più indirizzi separati da virgola. Se lo lasci vuoto vale l'email dei contatti." },
            },
          ],
        },
        {
          label: "Dove siamo",
          fields: [
            { name: "via", label: "Via e civico", type: "text" },
            {
              type: "row",
              fields: [
                { name: "cap", label: "CAP", type: "text" },
                { name: "comune", label: "Comune", type: "text" },
                { name: "provincia", label: "Provincia (sigla)", type: "text", maxLength: 2 },
              ],
            },
            { name: "orari", label: "Orari (testo)", type: "text", admin: { description: "Come compare nei contatti (es. «Lun–Ven 9–18»)." } },
            {
              name: "orariStrutturati",
              label: "Orari di apertura (per Google)",
              type: "array",
              labels: { singular: "Fascia oraria", plural: "Fasce orarie" },
              fields: [
                { name: "giorni", label: "Giorni", type: "select", hasMany: true, options: GIORNI, required: true },
                {
                  type: "row",
                  fields: [
                    { name: "apre", label: "Apre (HH:MM)", type: "text", required: true },
                    { name: "chiude", label: "Chiude (HH:MM)", type: "text", required: true },
                  ],
                },
              ],
            },
            { name: "mapsLink", label: "Link di Google Maps", type: "text" },
            { name: "mapsEmbed", label: "Link per incorporare la mappa", type: "text", admin: { description: "Da «Condividi → Incorpora una mappa» (inizia con https://www.google.com/maps/embed… o https://maps.google.com/maps?…)." } },
            {
              type: "row",
              fields: [
                { name: "latitudine", label: "Latitudine", type: "text" },
                { name: "longitudine", label: "Longitudine", type: "text" },
              ],
            },
          ],
        },
        {
          label: "Social",
          fields: [
            { name: "instagram", label: "Instagram (indirizzo della pagina)", type: "text" },
            { name: "facebook", label: "Facebook (indirizzo della pagina)", type: "text" },
            { name: "linkedin", label: "LinkedIn (indirizzo della pagina)", type: "text" },
          ],
        },
        {
          label: "Privacy e cookie",
          fields: [
            { name: "titolare", label: "Titolare del trattamento", type: "text" },
            { name: "indirizzoTitolare", label: "Indirizzo del titolare", type: "text" },
            { name: "emailPrivacy", label: "Email per la privacy", type: "email" },
            { name: "telefonoPrivacy", label: "Telefono per la privacy", type: "text" },
            { name: "conservazione", label: "Periodo di conservazione dei dati", type: "textarea" },
            { name: "destinatari", label: "Destinatari dei dati", type: "textarea" },
            { name: "aggiornatoIl", label: "Testi aggiornati il", type: "text", admin: { description: "Es. 20 ottobre 2026: compare in cima a Privacy e Cookie." } },
          ],
        },
        {
          label: "Dati societari e SEO",
          fields: [
            { name: "tagline", label: "Sottotitolo del marchio", type: "text" },
            { name: "descrizione", label: "Descrizione per i motori di ricerca", type: "textarea" },
            { name: "ragioneSociale", label: "Ragione sociale", type: "text" },
            { name: "gestore", label: "Società che gestisce", type: "text" },
            { name: "partitaIva", label: "Partita IVA", type: "text" },
          ],
        },
      ],
    },
  ],
};
