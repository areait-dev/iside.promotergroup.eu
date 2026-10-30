import { revalidateTag } from "next/cache";

/** Tag della cache: impostazioni e menu (SITE_TAG), testi delle pagine (PAGES_TAG). Le pagine si aggiornano appena si salva nel pannello. */
export const SITE_TAG = "impostazioni";
export const PAGES_TAG = "pagine";

/** Fuori da Next (es. durante l'avvio del pannello) non c'è cache da svuotare: l'errore si ignora. */
const expire = (tag: string) => {
  try {
    revalidateTag(tag, { expire: 0 });
  } catch {
    /* nessuna cache attiva */
  }
};

/**
 * Rete di sicurezza: anche se l'ordine di svuotare la cache non arriva (per esempio salvando dal pannello in locale,
 * che ha una cache sua e non può svuotare quella di Vercel), il sito rilegge i contenuti al massimo dopo questo tempo.
 */
export const SCADENZA_CACHE = 60;

export const revalidateSite = () => expire(SITE_TAG);
export const revalidatePages = () => expire(PAGES_TAG);

/** Un global senza `createdAt` non è ancora stato salvato né caricato: si usano i valori di partenza e non si mette in cache. */
export class NotSeededError extends Error {
  constructor(slug: string) {
    super(`il global «${slug}» non è ancora compilato`);
    this.name = "NotSeededError";
  }
}
