import type { Field, GlobalConfig, Tab } from "payload";
import { revalidatePages } from "../lib/revalidate";

/* Piccoli mattoni per descrivere i campi: i nomi coincidono con le chiavi di src/content/pages.ts. */
type Extra = Record<string, unknown>;
const testo = (name: string, label: string, extra: Extra = {}) => ({ name, label, type: "text", ...extra }) as Field;
const area = (name: string, label: string, extra: Extra = {}) => ({ name, label, type: "textarea", ...extra }) as Field;
const foto = (name: string, label: string) => ({ name, label, type: "upload", relationTo: "media" }) as Field;
const gruppo = (name: string, label: string, fields: Field[]) => ({ name, label, type: "group", fields }) as Field;
const elenco = (name: string, label: string, singolare: string, plurale: string, fields: Field[], extra: Extra = {}) =>
  ({
    name,
    label,
    type: "array",
    labels: { singular: singolare, plural: plurale },
    admin: { description: "Trascina per cambiare l'ordine." },
    fields,
    ...extra,
  }) as Field;
const obbligatorio = { required: true };

/** Righe di testo: ognuna è un a capo del titolo. */
const righe = (name: string, label: string) => elenco(name, label, "Riga", "Righe", [testo("testo", "Testo", obbligatorio)], { minRows: 1, maxRows: 4 });

/** Gallerie: una foto della libreria per voce; nelle griglie si sceglie anche il formato. */
const galleriaTab = (formato: boolean, descrizione: string): Tab => ({
  label: "Foto",
  fields: [
    elenco(
      "galleria",
      "Galleria",
      "Foto",
      "Foto",
      [
        { name: "foto", label: "Foto", type: "upload", relationTo: "media", required: true } as Field,
        ...(formato
          ? [
              {
                name: "formato",
                label: "Formato",
                type: "select",
                defaultValue: "meta",
                options: [
                  { label: "Largo (due terzi della riga)", value: "largo" },
                  { label: "Alto (un terzo, verticale)", value: "alto" },
                  { label: "Metà riga", value: "meta" },
                  { label: "Tutta la riga", value: "intera" },
                ],
              } as Field,
            ]
          : []),
      ],
      { admin: { description: descrizione } },
    ),
  ],
});

const heroTab = (extra: Field[] = []): Tab => ({
  label: "In cima alla pagina",
  fields: [gruppo("hero", "Titolo e foto", [testo("titolo", "Titolo della pagina"), foto("foto", "Foto di sfondo"), ...extra])],
});

/** Semaforo SEO: anteprima di Google e controlli in tempo reale. I percorsi dicono dove leggere i valori nel modulo. */
const semaforo = (percorsi: { titolo: string; descrizione: string; parolaChiave: string; titoloPagina: string[]; url: string }): Field =>
  ({
    type: "ui",
    name: "semaforo",
    admin: { components: { Field: { path: "/components/admin/SeoSemaforo#default", clientProps: percorsi } } },
  }) as Field;

const seoTab = (url: string, titoloPagina: string[] = ["hero.titolo"]): Tab => ({
  label: "Google",
  fields: [
    gruppo("seo", "Risultati di ricerca", [
      testo("parolaChiave", "Parola chiave principale", { admin: { description: "La frase con cui vuoi essere trovato su Google, es. «feste private Vittoria»." } }),
      testo("titolo", "Titolo", { maxLength: 70, admin: { description: "Se lo lasci vuoto vale quello di partenza." } }),
      area("descrizione", "Descrizione", { maxLength: 170 }),
      semaforo({ titolo: "seo.titolo", descrizione: "seo.descrizione", parolaChiave: "seo.parolaChiave", titoloPagina, url }),
    ]),
  ],
});

const pagina = (slug: string, label: string, description: string, tabs: Tab[], url: string): GlobalConfig => ({
  slug,
  label,
  admin: { group: false, description },
  access: { read: () => true },
  versions: { max: 20 },
  hooks: { afterChange: [() => revalidatePages()] },
  fields: [{ type: "tabs", tabs: [...tabs, seoTab(url)] }],
});

const richiestaTab: Tab = {
  label: "Richiesta di preventivo",
  fields: [gruppo("richiesta", "Sopra il modulo", [testo("titolo", "Titolo"), area("testo", "Testo")])],
};

export const EventiPrivati = pagina("eventi-privati", "Eventi privati", "Feste, compleanni, lauree, battesimi e anniversari.", [
  heroTab(),
  {
    label: "Contenuti",
    fields: [
      gruppo("intro", "Introduzione", [righe("titolo", "Titolo (una riga per ogni a capo)")]),
      elenco("punti", "Punti di forza", "Punto", "Punti", [testo("titolo", "Titolo", obbligatorio), area("testo", "Testo")]),
      gruppo("linkArea", "Link sotto i punti di forza", [testo("testo", "Testo del link"), testo("href", "Dove porta")]),
      gruppo("serate", "Sezione «Le nostre serate»", [testo("titolo", "Titolo"), area("testo", "Testo")]),
      gruppo("servizi", "Servizi", [
        testo("titolo", "Titolo della sezione"),
        elenco("voci", "Servizi", "Servizio", "Servizi", [testo("titolo", "Titolo", obbligatorio), area("testo", "Testo")], {
          admin: { description: "Se non c'è nessun servizio la sezione non compare." },
        }),
      ]),
    ],
  },
  galleriaTab(false, "Le foto scorrono in una fila, nell'ordine che vedi qui. Trascina per spostarle; toccandole si ingrandiscono."),
  richiestaTab,
], "/eventi-privati");

export const EventiAziendali = pagina("eventi-aziendali", "Eventi aziendali", "Convegni, coffee break, cene aziendali e team building.", [
  heroTab(),
  {
    label: "Contenuti",
    fields: [
      gruppo("intro", "Introduzione", [righe("titolo", "Titolo (una riga per ogni a capo)")]),
      elenco("offerte", "Cosa offriamo", "Voce", "Voci", [
        testo("titolo", "Titolo", obbligatorio),
        area("testo", "Testo"),
        testo("linkTesto", "Testo del link (facoltativo)"),
        testo("linkHref", "Dove porta il link"),
      ]),
      gruppo("eventi", "Sezione «Dai nostri eventi»", [testo("titolo", "Titolo"), area("testo", "Testo")]),
    ],
  },
  galleriaTab(false, "Le foto scorrono in una fila, nell'ordine che vedi qui. Trascina per spostarle; toccandole si ingrandiscono."),
  richiestaTab,
], "/eventi-aziendali");

export const Cucina = pagina("cucina", "Cucina", "Colazione e pranzo, aperti al pubblico.", [
  heroTab([foto("foto2", "Seconda foto (alterna con la prima)")]),
  {
    label: "Contenuti",
    fields: [
      gruppo("intro", "Introduzione", [righe("titolo", "Titolo (una riga per ogni a capo)"), area("testo", "Testo")]),
      elenco("momenti", "Momenti della giornata", "Momento", "Momenti", [
        testo("titolo", "Titolo (es. Colazione)", obbligatorio),
        testo("lead", "Frase d'apertura"),
        area("testo", "Testo"),
        testo("orari", "Orari", { admin: { description: "Se lo lasci vuoto gli orari non compaiono." } }),
        testo("menuLink", "Indirizzo del menu"),
        testo("menuTesto", "Testo del link al menu"),
      ]),
    ],
  },
  {
    label: "Prenota un tavolo",
    fields: [
      gruppo("tavolo", "Fascia in fondo alla pagina", [
        testo("titolo", "Titolo"),
        area("testo", "Testo"),
        testo("etichettaChiama", "Pulsante telefono", { admin: { description: "Il numero si aggiunge da solo." } }),
        testo("etichettaPreventivo", "Pulsante preventivo"),
      ]),
    ],
  },
], "/cucina");

export const AreaLiving = pagina("area-living", "Area living", "Piscina, giardino e gazebi.", [
  heroTab(),
  {
    label: "Contenuti",
    fields: [
      gruppo("intro", "Introduzione", [righe("titolo", "Titolo (una riga per ogni a capo)"), area("testo", "Testo")]),
      elenco("spazi", "Gli spazi", "Spazio", "Spazi", [testo("titolo", "Titolo", obbligatorio), area("testo", "Testo")]),
      gruppo("servizi", "Servizi inclusi", [area("testo", "Testo", { admin: { description: "Se lo lasci vuoto il paragrafo non compare." } })]),
    ],
  },
  galleriaTab(true, "Le foto stanno in una griglia: scegli per ognuna il formato. Trascina per cambiare l'ordine."),
], "/area-living");

export const CentroCongressi = pagina("centro-congressi", "Centro congressi", "Il Centro congressi Davide Failla.", [
  heroTab(),
  {
    label: "Contenuti",
    fields: [gruppo("intro", "Introduzione", [righe("titolo", "Titolo (una riga per ogni a capo)"), area("testo", "Testo")])],
  },
  {
    label: "Scheda tecnica",
    fields: [
      gruppo("scheda", "Scheda tecnica", [
        elenco("allestimenti", "Capienza per allestimento", "Allestimento", "Allestimenti", [
          testo("nome", "Allestimento (es. Platea)", obbligatorio),
          testo("posti", "Posti", obbligatorio),
        ]),
        elenco("attrezzature", "Attrezzature", "Dotazione", "Dotazioni", [
          testo("nome", "Dotazione (es. Proiettore e schermo)", obbligatorio),
          testo("dettaglio", "Dettagli", obbligatorio),
        ]),
        area("accessibilita", "Accessibilità"),
        area("parcheggio", "Parcheggio"),
        testo("pdf", "Indirizzo del PDF da scaricare", { admin: { description: "Es. /documenti/scheda-tecnica.pdf. Vuoto = nessun link." } }),
      ]),
    ],
  },
  galleriaTab(true, "Le foto stanno in una griglia: scegli per ognuna il formato. Trascina per cambiare l'ordine."),
  richiestaTab,
], "/centro-congressi");

export const FasciaFinale: GlobalConfig = {
  slug: "fascia-finale",
  label: "Fascia finale (Organizza il tuo evento)",
  admin: { group: false, description: "La fascia blu con i pulsanti, in fondo a Home e Area living." },
  access: { read: () => true },
  versions: { max: 20 },
  hooks: { afterChange: [() => revalidatePages()] },
  fields: [testo("titolo", "Titolo"), area("testo", "Testo"), testo("etichettaChiama", "Pulsante telefono")],
};

/* ---- «Testi del sito»: pulsanti, footer, contatti, 404, pagina Preventivo e modulo ---- */

const campi = (...coppie: [string, string][]) => coppie.map(([nome, etichetta]) => testo(nome, etichetta));
const lunghi = (...coppie: [string, string][]) => coppie.map(([nome, etichetta]) => area(nome, etichetta));

export const Testi: GlobalConfig = {
  slug: "testi",
  label: "Testi del sito",
  admin: { group: false, description: "Pulsanti, footer, contatti, pagina 404, pagina Preventivo e modulo di richiesta." },
  access: { read: () => true },
  versions: { max: 20 },
  hooks: { afterChange: [() => revalidatePages()] },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Pulsanti",
          fields: [
            gruppo("pulsanti", "Pulsanti ricorrenti", campi(
              ["preventivo", "Pulsante preventivo (testo esteso)"],
              ["preventivoBreve", "Pulsante preventivo (testo breve, barra in basso)"],
              ["chiama", "Chiama"],
              ["whatsapp", "WhatsApp"],
            )),
          ],
        },
        {
          label: "Pulsante per pagina",
          description: "Il pulsante principale (barra in basso su telefono e fascia finale) può cambiare da una pagina all'altra. Dove una pagina non è in elenco vale «Pulsante preventivo» della scheda Pulsanti.",
          fields: [
            elenco("perPagina", "Pulsanti per pagina", "Pagina", "Pagine", [
              testo("percorso", "Indirizzo della pagina", { required: true, admin: { description: "Per esempio /eventi-privati. La Home è /." } }),
              testo("testo", "Testo del pulsante", obbligatorio),
              testo("breve", "Testo breve (barra in basso)", obbligatorio),
              testo("link", "Dove porta", { required: true, admin: { description: "Per esempio /preventivo?tipo=privati oppure /preventivo?tipo=aziendali." } }),
            ]),
          ],
        },
        {
          label: "Menu e footer",
          fields: [
            gruppo("navigazione", "Menu", campi(["home", "Voce «Home»"])),
            gruppo("footer", "Footer", campi(
              ["titoloSito", "Titolo dell'elenco delle pagine"],
              ["titoloSocial", "Titolo dei social"],
              ["servizioDi", "«Un servizio di…»"],
              ["etichettaPartitaIva", "Etichetta della partita IVA"],
              ["privacy", "Link Privacy"],
              ["cookie", "Link Cookie"],
            )),
          ],
        },
        {
          label: "Contatti",
          fields: [
            gruppo("contatti", "Sezione Contatti", [
              ...campi(["titolo", "Titolo"], ["telefono", "Etichetta telefono"], ["email", "Etichetta email"], ["doveSiamo", "Titolo «Dove siamo»"]),
              area("zona", "Frase sulla zona"),
              ...campi(["orari", "Etichetta orari"], ["apriMappa", "Link alla mappa"], ["preferisci", "«Preferisci parlarci?» (accanto ai moduli)"]),
            ]),
          ],
        },
        {
          label: "Pagina 404",
          fields: [gruppo("pagina404", "Pagina non trovata", [...campi(["errore", "Etichetta"], ["titolo", "Titolo"]), area("testo", "Testo")])],
        },
        {
          label: "Pagina Preventivo",
          fields: [
            gruppo("preventivo", "Pagina Preventivo", [
              area("testo", "Testo sotto il titolo"),
              ...campi(["scegli", "Domanda sul tipo di evento"], ["privato", "Scelta «evento privato»"], ["aziendale", "Scelta «evento aziendale»"]),
              area("vuoto", "Messaggio prima di scegliere"),
            ]),
          ],
        },
        {
          label: "Modulo di richiesta",
          fields: [
            gruppo("modulo", "Modulo", [
              elenco("occasioni", "Occasioni (eventi privati)", "Occasione", "Occasioni", [testo("testo", "Testo", obbligatorio)], { minRows: 1, maxRows: 12 }),
              elenco("formati", "Formati (eventi aziendali)", "Formato", "Formati", [testo("testo", "Testo", obbligatorio)], { minRows: 1, maxRows: 12 }),
              ...campi(
                ["legendOccasione", "Titolo delle occasioni"],
                ["legendFormato", "Titolo dei formati"],
                ["facoltativo", "«(facoltativo)»"],
                ["data", "Data"],
                ["ospiti", "Numero di ospiti"],
                ["nome", "Nome"],
                ["contatti", "Titolo dei recapiti"],
                ["contattiNota", "Nota sui recapiti"],
                ["telefono", "Telefono"],
                ["email", "Email"],
                ["tecniche", "Necessità tecniche"],
                ["messaggio", "Messaggio"],
                ["consensoInizio", "Consenso: inizio frase"],
                ["consensoLink", "Consenso: testo del link alla privacy"],
              ),
              area("consensoFine", "Consenso: fine frase"),
              ...campi(["invia", "Pulsante di invio"], ["invio", "Pulsante durante l'invio"], ["grazie", "Titolo di conferma"]),
              ...lunghi(
                ["ricevuta", "Conferma: prima frase"],
                ["conferma", "Conferma: tempi di risposta"],
                ["erroreInvio", "Messaggio se l'invio non riesce"],
                ["avvisoPrivati", "Avviso oltre la capienza (privati) — {n} diventa il numero"],
                ["avvisoAziendali", "Avviso oltre la capienza (aziendali) — {n} diventa il numero"],
              ),
              ...campi(
                ["riepilogoData", "Riepilogo: data"],
                ["riepilogoOspiti", "Riepilogo: ospiti"],
                ["riepilogoOccasione", "Riepilogo: occasione"],
                ["riepilogoFormato", "Riepilogo: formato"],
                ["riepilogoNome", "Riepilogo: nome"],
                ["riepilogoTelefono", "Riepilogo: telefono"],
                ["riepilogoEmail", "Riepilogo: email"],
              ),
            ]),
          ],
        },
      ],
    },
  ],
};
