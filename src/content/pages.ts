import {
  AREA_LIVING_SERVICES,
  BUSINESS_CATERING,
  CAPACITY,
  CONGRESS_HAS_SHEET,
  CONGRESS_SHEET,
  CUCINA,
  PRIVATE_SERVICES,
  capacityNote,
  isTodo,
} from "@/config/site";
import { GALLERIA_AREA_LIVING, GALLERIA_AZIENDALI, GALLERIA_CENTRO_CONGRESSI, GALLERIA_PRIVATI } from "./gallerie";

/**
 * Testi di partenza delle pagine. Le chiavi sono le stesse dei campi nel pannello: sono i valori
 * che il pannello trova al primo avvio e quelli usati se un campo resta vuoto.
 * `{ src, alt }` è una foto (nel pannello va nella libreria); `{ testo }[]` è un elenco di righe.
 */
export type Foto = { src: string; alt: string };
export type Riga = { testo: string };
export type Seo = { titolo: string; descrizione: string };

const righe = (...t: string[]): Riga[] => t.map((testo) => ({ testo }));
const noTodo = (v: string) => (isTodo(v) ? "" : v);
const seo: Seo = { titolo: "", descrizione: "" };

export const EVENTI_PRIVATI = {
  hero: {
    titolo: "Eventi privati",
    foto: { src: "/images/ep-6794.jpg", alt: "Il giardino al tramonto, con arredi bianchi luminosi sul prato e il cielo rosa" } as Foto,
  },
  intro: { titolo: righe("Compleanni, lauree, battesimi e anniversari,", "a bordo piscina e in giardino.") },
  punti: [
    { titolo: "Piscina", testo: `A bordo vasca, con lettini e arredi bianchi.${capacityNote(CAPACITY.piscina)}` },
    { titolo: "Giardino e gazebi", testo: `Prato, ulivi e gazebi con sedute, per aperitivi e momenti all’aperto.${capacityNote(CAPACITY.giardino)}` },
    { titolo: "Bordo piscina coperto", testo: `Circa ${CAPACITY.bordoPiscinaCoperto} ospiti.` },
  ],
  linkArea: { testo: "Scopri l’area living", href: "/area-living" },
  serate: { titolo: "Le nostre serate", testo: "Allestimenti, buffet e piatti di alcuni degli eventi fatti da Iside." },
  galleria: GALLERIA_PRIVATI,
  servizi: {
    titolo: "Servizi per la tua festa",
    voci: PRIVATE_SERVICES.filter((s) => !isTodo(s.text)).map((s) => ({ titolo: s.title, testo: s.text })),
  },
  richiesta: { titolo: "Richiedi un preventivo", testo: "Dicci data e numero di ospiti: ti ricontattiamo noi." },
  seo,
};

export const EVENTI_AZIENDALI = {
  hero: {
    titolo: "Eventi aziendali",
    foto: { src: "/images/cc-6372.jpg", alt: "La sala del Centro congressi con la pedana e il tavolo dei relatori" } as Foto,
  },
  intro: { titolo: righe("Convegni, coffee break, cene aziendali", "e team building, in un solo posto.") },
  offerte: [
    {
      titolo: "Convegni e seminari",
      testo: `Nel Centro congressi Davide Failla, fino a ${CAPACITY.centroCongressi} invitati.`,
      linkTesto: CONGRESS_HAS_SHEET ? "Vedi la scheda tecnica" : "",
      linkHref: CONGRESS_HAS_SHEET ? "/centro-congressi#scheda-tecnica" : "",
    },
    {
      titolo: "Coffee break e cene aziendali",
      testo: `Nel bordo piscina coperto, circa ${CAPACITY.bordoPiscinaCoperto} ospiti.${isTodo(BUSINESS_CATERING) ? "" : ` Servizio: ${BUSINESS_CATERING}`}`,
      linkTesto: "",
      linkHref: "",
    },
    {
      titolo: "Team building e networking",
      testo: `Nell’area living, con piscina, giardino e gazebi.${capacityNote(CAPACITY.giardino)}`,
      linkTesto: "Scopri l’area living",
      linkHref: "/area-living",
    },
  ],
  eventi: { titolo: "Dai nostri eventi", testo: "Sale, spazi all’aperto e buffet di alcuni degli eventi aziendali fatti da Iside." },
  galleria: GALLERIA_AZIENDALI,
  richiesta: { titolo: "Richiedi un preventivo", testo: "Dicci formato, data e numero di ospiti: ti ricontattiamo noi." },
  seo,
};

export const CUCINA_PAGINA = {
  hero: {
    titolo: "Cucina",
    foto: { src: "/images/cucina-pizza.jpg", alt: "Un mucchio di farina sul piano di lavoro, con la spatola per l'impasto e le ciotole degli ingredienti sullo sfondo" } as Foto,
    foto2: { src: "/images/cucina-pizza-2.jpg", alt: "Le mani di un cuoco posano il prosciutto su una pizza condita con insalatina verde" } as Foto,
  },
  intro: {
    titolo: righe("Colazione al mattino,", "pranzo all’aperto."),
    testo:
      "La cucina di Iside è aperta al pubblico: passa per una colazione o fermati a pranzo, nella Valle dell’Ippari, vicino a Vittoria e all’aeroporto di Comiso.",
  },
  momenti: [
    {
      titolo: "Colazione",
      lead: "Si comincia al mattino.",
      testo: "Una colazione al banco o seduti, prima di andare al lavoro o di partire. Aperta a tutti, non serve essere ospiti di un evento.",
      orari: noTodo(CUCINA.breakfastHours),
      menuLink: CUCINA.menuBreakfastUrl,
      menuTesto: "Vedi il menu della colazione",
    },
    {
      titolo: "Pranzo",
      lead: "Pranzo all’aperto, a due passi da Vittoria.",
      testo: "A mezzogiorno la cucina è aperta al pubblico: un pranzo con il giardino e la piscina intorno, per chi lavora o passa in zona.",
      orari: noTodo(CUCINA.lunchHours),
      menuLink: CUCINA.menuLunchUrl,
      menuTesto: "Vedi il menu del pranzo",
    },
  ],
  tavolo: {
    titolo: "Prenota un tavolo",
    testo: "Chiamaci per prenotare. Se stai organizzando una festa o una cena aziendale, richiedi un preventivo.",
    etichettaChiama: "Chiama",
    etichettaPreventivo: "Richiedi un preventivo",
  },
  seo,
};

export const AREA_LIVING_PAGINA = {
  hero: {
    titolo: "Area living",
    foto: { src: "/images/al-pxl.jpg", alt: "La piscina di Iside con i gazebi bianchi, i lettini e le palme sullo sfondo" } as Foto,
  },
  intro: {
    titolo: righe("Piscina, giardino e gazebi", "per feste private e incontri aziendali."),
    testo:
      "L’area living riunisce la piscina, il prato con gli ulivi e i gazebi con sedute, e il bordo piscina coperto. Un unico spazio all’aperto, per lavorare, festeggiare e stare insieme.",
  },
  spazi: [
    { titolo: "Piscina", testo: `Con lettini e arredi bianchi a bordo vasca.${capacityNote(CAPACITY.piscina)}` },
    { titolo: "Giardino e gazebi", testo: `Prato, ulivi e gazebi con sedute.${capacityNote(CAPACITY.giardino)}` },
    { titolo: "Bordo piscina coperto", testo: `Circa ${CAPACITY.bordoPiscinaCoperto} ospiti.` },
  ],
  servizi: { testo: noTodo(AREA_LIVING_SERVICES) },
  galleria: GALLERIA_AREA_LIVING,
  seo,
};

export const CENTRO_CONGRESSI_PAGINA = {
  hero: {
    titolo: "Centro congressi Davide Failla",
    foto: { src: "/images/cc-6362.jpg", alt: "La sala del Centro congressi con le sedie in file, il tavolo dei relatori e lo schermo sul fondo" } as Foto,
  },
  intro: {
    titolo: righe("Stai organizzando un evento per la tua azienda?", `Qui c’è posto fino a ${CAPACITY.centroCongressi} invitati.`),
    testo:
      "Il Centro congressi ha già ospitato numerosi congressi e convegni di piccole e medie imprese e multinazionali, seminari e conferenze stampa.",
  },
  scheda: {
    allestimenti: CONGRESS_SHEET.layouts.filter((l) => !isTodo(l.capacity)).map((l) => ({ nome: l.name, posti: l.capacity })),
    attrezzature: CONGRESS_SHEET.equipment.filter((e) => !isTodo(e.detail)).map((e) => ({ nome: e.name, dettaglio: e.detail })),
    accessibilita: noTodo(CONGRESS_SHEET.accessibility),
    parcheggio: noTodo(CONGRESS_SHEET.parking),
    pdf: noTodo(CONGRESS_SHEET.pdf),
  },
  galleria: GALLERIA_CENTRO_CONGRESSI,
  richiesta: { titolo: "Richiedi un preventivo", testo: "Dicci formato, data e numero di ospiti: ti ricontattiamo noi." },
  seo,
};

export const FASCIA_FINALE = {
  titolo: "Organizza il tuo evento",
  testo: "Scrivici la data e il numero di ospiti: ti ricontattiamo noi.",
  etichettaChiama: "Chiama",
};
