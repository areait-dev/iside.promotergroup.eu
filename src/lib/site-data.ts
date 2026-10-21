import config from "@payload-config";
import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import { LEGAL, MENU_LINKS, SITE, isTodo, todo } from "@/config/site";
import { NotSeededError, SITE_TAG } from "./revalidate";

type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? Widen<U>[]
    : T extends object
      ? { -readonly [K in keyof T]: Widen<T[K]> }
      : T;

/** Stessa forma di `SITE` in config/site.ts, ma con i valori del pannello. */
export type Site = Widen<typeof SITE>;

type Cms = Record<string, unknown> & { createdAt?: string };
const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

const loadCms = unstable_cache(
  async (): Promise<Cms> => {
    const payload = await getPayload({ config });
    const doc: Cms = JSON.parse(JSON.stringify(await payload.findGlobal({ slug: "impostazioni", depth: 0 })));
    if (!doc.createdAt) throw new NotSeededError("impostazioni");
    return doc;
  },
  ["impostazioni"],
  { tags: [SITE_TAG] },
);

/** "+39 392 070 2561" → "393920702561". Senza prefisso si assume l'Italia. */
const digits = (v: string) => {
  const d = v.replace(/\D/g, "");
  return v.trim().startsWith("+") || d.startsWith("39") ? d : `39${d}`;
};

function fromCms(cms: Cms): Site {
  const pick = (v: unknown, what: string) => str(v) || todo(what);
  const phoneDisplay = pick(cms.telefono, "telefono");
  const wa = str(cms.whatsapp);
  const parts = {
    street: pick(cms.via, "via e civico"),
    postalCode: pick(cms.cap, "CAP"),
    city: pick(cms.comune, "comune"),
    province: pick(cms.provincia, "sigla provincia (es. RG)"),
    country: "IT",
  };
  const address = [parts.street, parts.postalCode, parts.city, parts.province].some(isTodo)
    ? todo("indirizzo completo (via, civico, CAP, comune, provincia)")
    : `${parts.street}, ${parts.postalCode} ${parts.city} (${parts.province})`;
  const hours = Array.isArray(cms.orariStrutturati)
    ? (cms.orariStrutturati as { giorni?: string[]; apre?: string; chiude?: string }[]).map((h) => ({
        days: h.giorni ?? [],
        opens: str(h.apre),
        closes: str(h.chiude),
      }))
    : [];
  return {
    ...(SITE as unknown as Site),
    tagline: pick(cms.tagline, "sottotitolo"),
    description: pick(cms.descrizione, "descrizione"),
    legalName: pick(cms.ragioneSociale, "ragione sociale"),
    operatorName: pick(cms.gestore, "società che gestisce"),
    vatId: pick(cms.partitaIva, "partita IVA"),
    phone: { display: phoneDisplay, e164: isTodo(phoneDisplay) ? "" : `+${digits(phoneDisplay)}` },
    email: pick(cms.email, "email"),
    whatsappNumber: wa ? digits(wa) : todo("numero WhatsApp"),
    address,
    addressParts: parts,
    hours: pick(cms.orari, "orari di apertura / ricevimento"),
    openingHours: hours.length ? hours : [{ days: [todo("giorni di apertura")], opens: todo("ora di apertura"), closes: todo("ora di chiusura") }],
    responseTime: pick(cms.tempiRisposta, "tempi di risposta alle richieste"),
    mapsLink: pick(cms.mapsLink, "link Google Maps"),
    mapsEmbed: pick(cms.mapsEmbed, "link mappa incorporata"),
    geo: { latitude: pick(cms.latitudine, "latitudine"), longitude: pick(cms.longitudine, "longitudine") },
    social: {
      instagram: pick(cms.instagram, "URL Instagram"),
      facebook: pick(cms.facebook, "URL pagina Facebook"),
      linkedin: pick(cms.linkedin, "URL pagina LinkedIn"),
    },
  };
}

/**
 * Dati del sito: dal pannello se è stato compilato; altrimenti (database vuoto o non raggiungibile)
 * i valori predefiniti di config/site.ts, così il sito non si rompe mai.
 */
export async function getSite(): Promise<Site> {
  try {
    const cms = await loadCms();
    if (cms.createdAt) return fromCms(cms);
  } catch (err) {
    if (!(err instanceof NotSeededError)) console.error("[iside] impossibile leggere le impostazioni dal pannello, uso i valori predefiniti", err);
  }
  return SITE as unknown as Site;
}

export const phoneHref = (s: Site) => (isTodo(s.phone.e164) ? "" : `tel:${s.phone.e164}`);
export const whatsappHref = (s: Site) => (isTodo(s.whatsappNumber) ? null : `https://wa.me/${s.whatsappNumber}`);

export type MenuLink = { href: string; label: string };

const loadMenu = unstable_cache(
  async (): Promise<{ createdAt?: string; voci?: { etichetta?: string; indirizzo?: string }[] }> => {
    const payload = await getPayload({ config });
    const doc = JSON.parse(JSON.stringify(await payload.findGlobal({ slug: "menu", depth: 0 })));
    if (!doc.createdAt) throw new NotSeededError("menu");
    return doc;
  },
  ["menu"],
  { tags: [SITE_TAG] },
);

/** Voci del menu (senza la Home, che c'è sempre): dal pannello se compilato, altrimenti quelle di config/site.ts. */
export async function getMenu(): Promise<MenuLink[]> {
  try {
    const m = await loadMenu();
    if (m.createdAt) {
      return (m.voci ?? []).filter((v) => str(v.etichetta) && str(v.indirizzo)).map((v) => ({ label: str(v.etichetta), href: str(v.indirizzo) }));
    }
  } catch (err) {
    if (!(err instanceof NotSeededError)) console.error("[iside] impossibile leggere il menu dal pannello, uso le voci predefinite", err);
  }
  return MENU_LINKS.map((l) => ({ ...l }));
}

export type Legal = Widen<typeof LEGAL>;

/** Dati per Privacy e Cookie: dal pannello, campo per campo; dove manca qualcosa valgono quelli di config/site.ts. */
export async function getLegal(): Promise<Legal> {
  const d = LEGAL as unknown as Legal;
  try {
    const cms = await loadCms();
    const tel = str(cms.telefonoPrivacy);
    return {
      ...d,
      controller: str(cms.titolare) || d.controller,
      controllerAddress: str(cms.indirizzoTitolare) || d.controllerAddress,
      privacyEmail: str(cms.emailPrivacy) || d.privacyEmail,
      phone: tel ? { display: tel, e164: `+${digits(tel)}` } : d.phone,
      retention: str(cms.conservazione) || d.retention,
      recipients: str(cms.destinatari) || d.recipients,
      updatedAt: str(cms.aggiornatoIl) || d.updatedAt,
    };
  } catch (err) {
    if (!(err instanceof NotSeededError)) console.error("[iside] impossibile leggere i dati legali dal pannello, uso quelli predefiniti", err);
    return d;
  }
}
