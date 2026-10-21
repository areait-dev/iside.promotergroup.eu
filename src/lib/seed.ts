import path from "path";
import type { Payload } from "payload";
import { TESTI } from "../content/testi";
import { HOME_DEFAULTS } from "../content/home";
import {
  AREA_LIVING_PAGINA,
  CENTRO_CONGRESSI_PAGINA,
  CUCINA_PAGINA,
  EVENTI_AZIENDALI,
  EVENTI_PRIVATI,
  FASCIA_FINALE,
} from "../content/pages";
import { LEGAL, MENU_LINKS, SITE, isTodo } from "../config/site";

const val = (v: string) => (isTodo(v) ? undefined : v);

/** "393920702561" → "+39 392 070 2561". */
const prettyPhone = (n: string) => (isTodo(n) ? undefined : (/^(\d{2})(\d{3})(\d{3})(\d{4})$/.exec(n)?.slice(1).join(" ").replace(/^/, "+") ?? `+${n}`));

/**
 * Prima volta: porta nel pannello i valori che oggi stanno in config/site.ts, così chi apre
 * «Impostazioni del sito» trova i dati reali. Se le impostazioni esistono già non tocca nulla.
 */
export async function seedSiteSettings(payload: Payload) {
  await seedMenu(payload);
  await seedLegal(payload);
  await seedHome(payload);
  await seedContent(payload, "eventi-privati", EVENTI_PRIVATI);
  await seedContent(payload, "eventi-aziendali", EVENTI_AZIENDALI);
  await seedContent(payload, "cucina", CUCINA_PAGINA);
  await seedContent(payload, "area-living", AREA_LIVING_PAGINA);
  await seedContent(payload, "centro-congressi", CENTRO_CONGRESSI_PAGINA);
  await seedContent(payload, "fascia-finale", FASCIA_FINALE);
  await seedContent(payload, "testi", TESTI);
  await seedPerPagina(payload);
  // Le gallerie sono arrivate dopo i testi: le pagine già caricate le ricevono qui, una sola volta.
  await seedGalleria(payload, "eventi-privati", EVENTI_PRIVATI.galleria);
  await seedGalleria(payload, "eventi-aziendali", EVENTI_AZIENDALI.galleria);
  await seedGalleria(payload, "area-living", AREA_LIVING_PAGINA.galleria);
  await seedGalleria(payload, "centro-congressi", CENTRO_CONGRESSI_PAGINA.galleria);
  try {
    const current = await payload.findGlobal({ slug: "impostazioni", depth: 0 });
    if ((current as { createdAt?: string }).createdAt) return;
    const hours = SITE.openingHours.filter((h) => !h.days.some(isTodo) && !isTodo(h.opens) && !isTodo(h.closes));
    await payload.updateGlobal({
      slug: "impostazioni",
      data: {
        telefono: SITE.phone.display,
        email: SITE.email,
        whatsapp: prettyPhone(SITE.whatsappNumber),
        tempiRisposta: val(SITE.responseTime),
        via: val(SITE.addressParts.street),
        cap: val(SITE.addressParts.postalCode),
        comune: val(SITE.addressParts.city),
        provincia: val(SITE.addressParts.province),
        orari: val(SITE.hours),
        orariStrutturati: hours.map((h) => ({ giorni: [...h.days], apre: h.opens, chiude: h.closes })),
        mapsLink: SITE.mapsLink,
        mapsEmbed: SITE.mapsEmbed,
        latitudine: SITE.geo.latitude,
        longitudine: SITE.geo.longitude,
        instagram: val(SITE.social.instagram),
        facebook: val(SITE.social.facebook),
        linkedin: val(SITE.social.linkedin),
        tagline: SITE.tagline,
        descrizione: SITE.description,
        ragioneSociale: SITE.legalName,
        gestore: SITE.operatorName,
        partitaIva: SITE.vatId,
      } as never,
    });
    payload.logger.info("Impostazioni del sito: valori iniziali caricati da config/site.ts");
  } catch (err) {
    payload.logger.error({ err, msg: "Impostazioni del sito: seed non riuscito" });
  }
}

/** Come sopra, per il menu: parte dalle voci di config/site.ts. */
async function seedMenu(payload: Payload) {
  try {
    const current = await payload.findGlobal({ slug: "menu", depth: 0 });
    if ((current as { createdAt?: string }).createdAt) return;
    await payload.updateGlobal({
      slug: "menu",
      data: { voci: MENU_LINKS.map((l) => ({ etichetta: l.label, indirizzo: l.href })) } as never,
    });
    payload.logger.info("Menu: voci iniziali caricate da config/site.ts");
  } catch (err) {
    payload.logger.error({ err, msg: "Menu: seed non riuscito" });
  }
}

/** Home: carica le foto delle schede nella libreria e i testi di partenza (da content/home.ts). */
async function seedHome(payload: Payload) {
  try {
    const current = await payload.findGlobal({ slug: "home", depth: 0 });
    if ((current as { createdAt?: string }).createdAt) return;
    const d = HOME_DEFAULTS;
    const schede = [];
    for (const c of d.spaces.cards) {
      const foto = await payload.create({
        collection: "media",
        data: { alt: c.alt },
        filePath: path.resolve(process.cwd(), "public", c.image.replace(/^\//, "")),
      });
      schede.push({ titolo: c.title, testo: c.text, link: c.href, foto: foto.id });
    }
    await payload.updateGlobal({
      slug: "home",
      data: {
        titolo: d.hero.titleLines.map((testo) => ({ testo })),
        rigaMarchio: d.hero.brandLine,
        introduzione: d.hero.intro,
        ctaPrivati: { testo: d.hero.ctaPrivate.label, link: d.hero.ctaPrivate.href },
        ctaAziende: { testo: d.hero.ctaBusiness.label, link: d.hero.ctaBusiness.href },
        titoloSpazi: d.spaces.title,
        schede,
      } as never,
    });
    payload.logger.info("Home: testi e foto iniziali caricati");
  } catch (err) {
    payload.logger.error({ err, msg: "Home: seed non riuscito" });
  }
}

/* ---- Pagine: carica i testi di partenza (e le loro foto nella libreria) la prima volta ---- */

type FotoT = { src: string; alt: string };
const isFoto = (v: unknown): v is FotoT => !!v && typeof v === "object" && Object.keys(v).sort().join() === "alt,src";

async function uploadFoto(payload: Payload, f: FotoT): Promise<number> {
  const filename = path.basename(f.src);
  const found = await payload.find({ collection: "media", where: { filename: { equals: filename } }, limit: 1, depth: 0 });
  if (found.docs[0]) return found.docs[0].id as number;
  const created = await payload.create({
    collection: "media",
    data: { alt: f.alt },
    filePath: path.resolve(process.cwd(), "public", f.src.replace(/^\//, "")),
  });
  return created.id as number;
}

async function toCms(payload: Payload, v: unknown): Promise<unknown> {
  if (isFoto(v)) return uploadFoto(payload, v);
  if (Array.isArray(v)) {
    const out = [];
    for (const x of v) out.push(await toCms(payload, x));
    return out;
  }
  if (v && typeof v === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, x] of Object.entries(v)) out[k] = await toCms(payload, x);
    return out;
  }
  return v;
}

export async function seedContent(payload: Payload, slug: string, defaults: unknown) {
  try {
    const current = await payload.findGlobal({ slug: slug as "home", depth: 0 });
    if ((current as { createdAt?: string }).createdAt) return;
    await payload.updateGlobal({ slug: slug as "home", data: (await toCms(payload, defaults)) as never });
    payload.logger.info(`${slug}: testi e foto iniziali caricati`);
  } catch (err) {
    payload.logger.error({ err, msg: `${slug}: seed non riuscito` });
  }
}

/** Carica la galleria di una pagina già esistente, se nel pannello è ancora vuota. */
async function seedGalleria(payload: Payload, slug: string, galleria: unknown[]) {
  try {
    const current = (await payload.findGlobal({ slug: slug as "home", depth: 0 })) as { createdAt?: string; galleria?: unknown[] };
    if (!current.createdAt || (current.galleria?.length ?? 0) > 0) return;
    await payload.updateGlobal({ slug: slug as "home", data: { galleria: await toCms(payload, galleria) } as never });
    payload.logger.info(`${slug}: galleria caricata (${galleria.length} foto)`);
  } catch (err) {
    payload.logger.error({ err, msg: `${slug}: galleria non caricata` });
  }
}

/** I pulsanti per pagina sono arrivati dopo i testi: chi ha già i Testi caricati li riceve qui, una sola volta. */
async function seedPerPagina(payload: Payload) {
  try {
    const current = (await payload.findGlobal({ slug: "testi" as "home", depth: 0 })) as { createdAt?: string; perPagina?: unknown[] };
    if (!current.createdAt || (current.perPagina?.length ?? 0) > 0) return;
    await payload.updateGlobal({ slug: "testi" as "home", data: { perPagina: TESTI.perPagina } as never });
    payload.logger.info("Testi: pulsanti per pagina caricati");
  } catch (err) {
    payload.logger.error({ err, msg: "Testi: pulsanti per pagina non caricati" });
  }
}

/** I dati legali sono arrivati dopo le impostazioni: se nel pannello sono vuoti ci metto quelli di config/site.ts. */
async function seedLegal(payload: Payload) {
  try {
    const current = (await payload.findGlobal({ slug: "impostazioni", depth: 0 })) as { createdAt?: string; titolare?: string };
    if (!current.createdAt || current.titolare) return;
    await payload.updateGlobal({
      slug: "impostazioni",
      data: {
        titolare: LEGAL.controller,
        indirizzoTitolare: LEGAL.controllerAddress,
        emailPrivacy: LEGAL.privacyEmail,
        telefonoPrivacy: LEGAL.phone.display,
        conservazione: LEGAL.retention,
        destinatari: LEGAL.recipients,
        aggiornatoIl: LEGAL.updatedAt,
      } as never,
    });
    payload.logger.info("Impostazioni: dati per privacy e cookie caricati");
  } catch (err) {
    payload.logger.error({ err, msg: "Impostazioni: dati legali non caricati" });
  }
}
