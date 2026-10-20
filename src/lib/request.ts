export type Kind = "privati" | "aziendali";

export type RequestData = {
  kind: Kind;
  data: string;
  ospiti: string;
  nome: string;
  telefono: string;
  email: string;
  messaggio: string;
  consenso: boolean;
  /** solo eventi privati */
  occasione: string;
  /** solo eventi aziendali */
  formato: string;
  tecniche: string;
  /** honeypot: deve restare vuoto */
  sito: string;
};

/** `contatto`: errore di gruppo per telefono ed email (serve almeno uno dei due). */
export type Errors = Partial<Record<keyof RequestData | "contatto", string>>;

export const OCCASIONI = ["Compleanno", "Laurea", "Battesimo", "Anniversario", "Altro"] as const;
export const FORMATI = ["Convegno", "Cena aziendale", "Team building", "Altro"] as const;


export function emptyRequest(kind: Kind): RequestData {
  return {
    kind,
    data: "",
    ospiti: "",
    nome: "",
    telefono: "",
    email: "",
    messaggio: "",
    consenso: false,
    occasione: "",
    formato: "",
    tecniche: "",
    sito: "",
  };
}

export function validate(d: RequestData): Errors {
  const e: Errors = {};
  if (!d.data) e.data = "Indica la data dell’evento, anche indicativa.";
  const n = Number(d.ospiti);
  if (!d.ospiti.trim()) e.ospiti = "Indica quanti ospiti pensi di avere.";
  else if (!Number.isInteger(n) || n < 1) e.ospiti = "Scrivi un numero di ospiti, ad esempio 40.";
  if (!d.nome.trim()) e.nome = "Scrivi il tuo nome.";
  const tel = d.telefono.trim();
  const mail = d.email.trim();
  if (!tel && !mail) e.contatto = "Lasciaci almeno un telefono o un’email per ricontattarti.";
  else {
    if (tel && !/^\+?[\d\s().-]{6,}$/.test(tel)) e.telefono = "Scrivi un numero di telefono valido, ad esempio 333 1234567.";
    if (mail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) e.email = "Scrivi un indirizzo email valido, ad esempio nome@email.it.";
  }
  if (d.kind === "aziendali" && !d.formato) e.formato = "Scegli il formato dell’evento.";
  if (d.consenso !== true) e.consenso = "Per inviare la richiesta devi accettare l’informativa privacy.";
  return e;
}
