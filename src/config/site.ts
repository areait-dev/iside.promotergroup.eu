/**
 * Dati del sito in un solo posto.
 * Dove un dato non è confermato il valore è `TODO: …` (vedi `todo()`): compare così nelle pagine,
 * in modo evidente, e `isTodo()` permette ai componenti di nascondere ciò che non è configurato.
 * Per trovarli tutti: cerca "TODO:" in src/.
 */
export const todo = (what: string) => `TODO: ${what}`;
export const isTodo = (v: string | null | undefined): boolean => !v || v.startsWith("TODO:");
/** Frase di capienza da accodare a un testo: vuota finché la capienza non è confermata. */
export const capacityNote = (v: string) => (isTodo(v) ? "" : ` Capienza: ${v}`);

const ADDRESS_PARTS = {
  street: todo("via e civico"),
  postalCode: todo("CAP"),
  city: todo("comune"),
  province: todo("sigla provincia (es. RG)"),
  country: "IT",
};
const ADDRESS_FULL =
  [ADDRESS_PARTS.street, ADDRESS_PARTS.postalCode, ADDRESS_PARTS.city, ADDRESS_PARTS.province].some(isTodo)
    ? todo("indirizzo completo (via, civico, CAP, comune, provincia)")
    : `${ADDRESS_PARTS.street}, ${ADDRESS_PARTS.postalCode} ${ADDRESS_PARTS.city} (${ADDRESS_PARTS.province})`;

export const SITE = {
  url: "https://iside.promotergroup.eu",
  name: "Iside",
  tagline: "Events | Lounge | Living",
  description:
    "Feste private ed eventi aziendali a bordo piscina e nel Centro congressi, nella Valle dell'Ippari, vicino a Vittoria e Comiso.",

  /**
   * Ragione sociale e partita IVA: footer, privacy e JSON-LD leggono da qui.
   * TODO: verificare con il titolare. Oggi il sito dice "Iside è il nuovo brand di Promotergroup S.p.A." (hero),
   * "Un servizio di Promotergroup S.p.A." (footer) e associa la P.IVA a "Promoter srl": non è chiaro quale società
   * sia titolare della P.IVA 01376750889 né se Iside sia un "brand" o un "servizio".
   */
  legalName: "Promotergroup S.p.A.",
  operatorName: "Promoter srl",
  vatId: "01376750889",

  phone: { display: "0932 1618964", e164: "+3909321618964" },
  email: "iside@promotergroup.eu",
  /** Numero WhatsApp in formato internazionale senza "+" (es. "393331234567"). Se è TODO il pulsante non compare. */
  whatsappNumber: todo("numero WhatsApp (formato 39333…)"),

  /** Indirizzo completo: compilare le parti in ADDRESS_PARTS; `address` (footer, contatti) si compone da sé. */
  address: ADDRESS_FULL,
  addressParts: ADDRESS_PARTS,
  hours: todo("orari di apertura / ricevimento"),
  /** Orari in forma strutturata per i dati strutturati (JSON-LD). Giorni: "Monday"…"Sunday"; orari "HH:MM". */
  openingHours: [{ days: [todo("giorni di apertura (es. Monday, Tuesday)")], opens: todo("ora di apertura HH:MM"), closes: todo("ora di chiusura HH:MM") }],
  responseTime: todo("tempi di risposta alle richieste"),
  /** Link di condivisione di Google Maps (https://maps.app.goo.gl/… o https://www.google.com/maps/place/…) */
  mapsLink: "https://maps.app.goo.gl/TXiPFVDsNLtFWrHB6",
  /** URL dell'iframe di "Condividi → Incorpora una mappa" (https://www.google.com/maps/embed?pb=…) */
  mapsEmbed: "https://maps.google.com/maps?q=36.9676339,14.5580416&z=16&output=embed",
  geo: { latitude: "36.9676339", longitude: "14.5580416" },

  social: {
    instagram: "https://www.instagram.com/iside_events/",
    facebook: "https://www.facebook.com/isideevents",
    linkedin: "https://www.linkedin.com/showcase/isideevents/",
  },
} as const;

export const PHONE_HREF = `tel:${SITE.phone.e164}`;
export const WHATSAPP_HREF = isTodo(SITE.whatsappNumber) ? null : `https://wa.me/${SITE.whatsappNumber}`;

/**
 * Testo di conferma dopo l'invio del modulo. Segnaposto facilmente modificabile:
 * [DA CONFERMARE] il tempo di risposta reale prima della pubblicazione.
 */
export const REQUEST_CONFIRMATION = "Ti ricontattiamo entro 24 ore lavorative.";

/** Un'unica etichetta per la CTA principale; dove lo spazio è poco si mostra la forma breve (il nome accessibile resta quello esteso). */
export const CTA = { label: "Richiedi un preventivo", short: "Preventivo", href: "/preventivo" } as const;

/** Voce Home: nel menu mobile e nel footer (in navbar desktop basta il logo). */
export const HOME_LINK = { href: "/", label: "Home" } as const;

export const MENU_LINKS = [
  { href: "/eventi-privati", label: "Eventi privati" },
  { href: "/eventi-aziendali", label: "Eventi aziendali" },
  { href: "/cucina", label: "Cucina" },
  { href: "/#contatti", label: "Contatti" },
] as const;

/** Capienze. Quelle numeriche vengono da DESIGN.md (sito attuale); le altre sono da confermare. */
export const CAPACITY = {
  bordoPiscinaCoperto: 70,
  centroCongressi: 200,
  giardino: todo("capienza del giardino"),
  piscina: todo("capienza dell'area piscina"),
} as const;

/** Servizi per gli eventi privati: voci e valori da confermare. */
export const PRIVATE_SERVICES: { title: string; text: string }[] = [
  { title: "Catering", text: todo("servizio di catering: interno o a scelta") },
  { title: "Musica", text: todo("musica / DJ / impianto audio") },
  { title: "Allestimenti", text: todo("allestimenti e arredi disponibili") },
  { title: "Orari", text: todo("orari massimi di chiusura degli eventi") },
];

/** Scheda tecnica del Centro congressi: tutti i valori da confermare. */
export const CONGRESS_SHEET = {
  layouts: [
    { name: "Platea", capacity: todo("posti in platea") },
    { name: "Banchi di scuola", capacity: todo("posti a banchi") },
    { name: "Ferro di cavallo", capacity: todo("posti a ferro di cavallo") },
  ],
  equipment: [
    { name: "Proiettore e schermo", detail: todo("modello e dotazione") },
    { name: "Microfoni", detail: todo("numero e tipologia") },
    { name: "Wi-Fi", detail: todo("rete e banda disponibili") },
    { name: "Regia audio e video", detail: todo("tecnico incluso o a richiesta") },
  ],
  accessibility: todo("accessibilità (ingresso, servizi, ascensore)"),
  parking: todo("parcheggio (posti, gratuito o a pagamento)"),
  pdf: todo("percorso del PDF della scheda tecnica"),
} as const;

/** Vero se almeno un dato della scheda tecnica è confermato; altrimenti la sezione non compare. */
export const CONGRESS_HAS_SHEET =
  CONGRESS_SHEET.layouts.some((l) => !isTodo(l.capacity)) ||
  CONGRESS_SHEET.equipment.some((e) => !isTodo(e.detail)) ||
  [CONGRESS_SHEET.accessibility, CONGRESS_SHEET.parking, CONGRESS_SHEET.pdf].some((v) => !isTodo(v));

/** Testimonianze e loghi clienti: le sezioni restano nascoste finché questi elenchi sono vuoti. */
export const TESTIMONIALS: { quote: string; author: string; role?: string }[] = [];
export const CLIENT_LOGOS: { name: string; src: string }[] = [];

/**
 * Dati del titolare per le pagine Privacy e Cookie.
 * Fonte: privacy e cookie policy del sito attuale (iside.promotergroup.eu/dichiarazione-sulla-privacy-ue e /cookie-policy-ue).
 * TODO: far verificare al titolare — l'indirizzo è incompleto (manca CAP e comune) e il telefono è diverso da quello del sito.
 */
export const LEGAL = {
  controller: "Promotergroup SpA",
  controllerAddress: "Via del Carrubo sn, Italia",
  privacyEmail: "comunicazione@promotergroup.eu",
  phone: { display: "0932862613", e164: "+390932862613" },
  retention: "Conserviamo questi dati fino al termine del servizio.",
  recipients: "Abbiamo concluso un accordo di elaborazione dei dati con Google.",
  /** Data di questa versione dei testi (il sito attuale riporta il 5 marzo 2025: i testi nuovi sono adattati al nuovo sito). */
  updatedAt: "20 ottobre 2026",
} as const;

/**
 * Cucina (colazioni al mattino e pranzi aperti al pubblico).
 * Gli orari restano da confermare: finché sono "TODO:", la pagina /cucina non li mostra.
 * I menu sono sul sito dedicato menu-iside.promotergroup.eu.
 */
export const CUCINA = {
  breakfastHours: todo("orari della colazione (giorni e fascia oraria)"),
  lunchHours: todo("orari del pranzo (giorni e fascia oraria)"),
  menuBreakfastUrl: "https://menu-iside.promotergroup.eu/menu/bar",
  menuLunchUrl: "https://menu-iside.promotergroup.eu/menuristorante",
} as const;

/** Servizi inclusi nell'area living (voci e condizioni da confermare). */
export const AREA_LIVING_SERVICES = todo("servizi inclusi nell'area living (lettini, arredi, bagni, illuminazione…)");

/** Servizi di ristorazione per gli eventi aziendali (coffee break, cene). */
export const BUSINESS_CATERING = todo("coffee break e cene aziendali: servizio interno o catering a scelta");

/** Percorsi di tutti i valori ancora "TODO:" nel config: usato da next.config.ts per avvisare (o bloccare) la build. */
export function findTodos(): string[] {
  const found: string[] = [];
  const walk = (v: unknown, path: string) => {
    if (typeof v === "string") {
      if (v.startsWith("TODO:")) found.push(`${path} → ${v.slice(5).trim()}`);
    } else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${path}[${i}]`));
    else if (v && typeof v === "object") Object.entries(v).forEach(([k, x]) => walk(x, path ? `${path}.${k}` : k));
  };
  walk({ SITE, CUCINA, CAPACITY, PRIVATE_SERVICES, CONGRESS_SHEET, LEGAL, AREA_LIVING_SERVICES, BUSINESS_CATERING }, "");
  return found;
}
