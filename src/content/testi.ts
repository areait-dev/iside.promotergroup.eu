import { CAPACITY, CTA, HOME_LINK, PHONE_HREF, REQUEST_CONFIRMATION } from "@/config/site";
import { OCCASIONI, FORMATI } from "@/lib/request";

/**
 * Testi che ricorrono in tutto il sito (pulsanti, footer, contatti, 404, pagina Preventivo, modulo).
 * Le chiavi sono quelle dei campi in «Testi del sito» nel pannello.
 */
type Riga = { testo: string };
const righe = (t: readonly string[]): Riga[] => t.map((testo) => ({ testo }));

export const TESTI = {
  pulsanti: {
    preventivo: CTA.label,
    preventivoBreve: CTA.short,
    chiama: "Chiama",
    whatsapp: "WhatsApp",
  },
  /** Pulsante principale diverso per pagina; dove una pagina non c'è vale quello generico. */
  perPagina: [
    { percorso: "/eventi-privati", testo: "Organizza la tua festa", breve: "Festa", link: "/preventivo?tipo=privati" },
    { percorso: "/eventi-aziendali", testo: "Richiedi un preventivo aziendale", breve: "Preventivo", link: "/preventivo?tipo=aziendali" },
    // I tavoli si prenotano solo per telefono, per ora.
    { percorso: "/cucina", testo: "Prenota un tavolo", breve: "Prenota", link: PHONE_HREF },
    { percorso: "/centro-congressi", testo: "Verifica la disponibilità della sala", breve: "Disponibilità", link: "/preventivo?tipo=aziendali" },
  ] as { percorso: string; testo: string; breve: string; link: string }[],
  navigazione: { home: HOME_LINK.label },
  footer: {
    titoloSito: "Il sito",
    titoloSocial: "Seguici",
    servizioDi: "Un servizio di",
    etichettaPartitaIva: "P.IVA",
    privacy: "Privacy",
    cookie: "Cookie",
  },
  contatti: {
    titolo: "Contatti",
    telefono: "Telefono",
    email: "Email",
    doveSiamo: "Dove siamo",
    zona: "Nella Valle dell’Ippari, vicino a Vittoria e all’aeroporto di Comiso.",
    orari: "Orari",
    apriMappa: "Apri su Google Maps",
    preferisci: "Preferisci parlarci?",
  },
  pagina404: {
    errore: "Errore 404",
    titolo: "Questa pagina non esiste.",
    testo: "L’indirizzo potrebbe essere sbagliato o la pagina spostata. Da qui puoi andare alle sezioni del sito.",
  },
  preventivo: {
    testo: "Dicci che evento hai in mente, la data e il numero di ospiti: ti ricontattiamo noi.",
    scegli: "Che evento vuoi organizzare?",
    privato: "Evento privato",
    aziendale: "Evento aziendale",
    vuoto: "Scegli il tipo di evento: ti mostriamo il modulo giusto.",
  },
  modulo: {
    occasioni: righe(OCCASIONI),
    formati: righe(FORMATI),
    legendOccasione: "Occasione",
    legendFormato: "Formato",
    facoltativo: "(facoltativo)",
    data: "Data dell’evento",
    ospiti: "Numero di ospiti",
    nome: "Nome e cognome",
    contatti: "Come ti ricontattiamo",
    contattiNota: "(almeno uno tra telefono ed email)",
    telefono: "Telefono",
    email: "Email",
    tecniche: "Necessità tecniche",
    messaggio: "Messaggio",
    consensoInizio: "Ho letto l’",
    consensoLink: "informativa privacy",
    consensoFine: "e accetto che i miei dati siano usati per rispondere alla richiesta.",
    invia: "Invia la richiesta",
    invio: "Invio in corso…",
    grazie: "Grazie!",
    ricevuta: "Abbiamo ricevuto la tua richiesta.",
    conferma: REQUEST_CONFIRMATION,
    erroreInvio: "Non siamo riusciti a inviare la richiesta. Riprova tra poco o chiamaci.",
    /** `{n}` diventa la capienza. */
    avvisoPrivati: "Oltre {n} ospiti usiamo anche il giardino: ti ricontattiamo per i dettagli.",
    avvisoAziendali: "Il Centro congressi accoglie fino a {n} persone: ti ricontattiamo per valutare insieme la soluzione.",
    riepilogoData: "Data",
    riepilogoOspiti: "Ospiti",
    riepilogoOccasione: "Occasione",
    riepilogoFormato: "Formato",
    riepilogoNome: "Nome",
    riepilogoTelefono: "Telefono",
    riepilogoEmail: "Email",
  },
};

export type Testi = typeof TESTI;
export type TestiModulo = Testi["modulo"];
export const CAPIENZE = { privati: CAPACITY.bordoPiscinaCoperto, aziendali: CAPACITY.centroCongressi };
