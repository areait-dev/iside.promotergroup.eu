import config from "@payload-config";
import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import { HOME_DEFAULTS, type HomeContent } from "@/content/home";
import { TESTI } from "@/content/testi";
import { NotSeededError, PAGES_TAG } from "./revalidate";

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

type Doc = Record<string, unknown> & { createdAt?: string };
type MediaDoc = { url?: string; alt?: string } | number | null | undefined;

/** Legge un global già "piatto" (JSON) e lo tiene in cache fino al prossimo salvataggio nel pannello. */
const loadGlobal = (slug: string) =>
  unstable_cache(
    async (): Promise<Doc> => {
      const payload = await getPayload({ config });
      const doc: Doc = JSON.parse(JSON.stringify(await payload.findGlobal({ slug: slug as "home", depth: 1 })));
      if (!doc.createdAt) throw new NotSeededError(slug);
      return doc;
    },
    ["pagina", slug],
    { tags: [PAGES_TAG] },
  )();

const media = (m: MediaDoc) => (m && typeof m === "object" && m.url ? { image: m.url, alt: str(m.alt) } : null);

/** Home: i testi del pannello, campo per campo; dove manca qualcosa valgono quelli di partenza. */
export async function getHome(): Promise<HomeContent> {
  const d = HOME_DEFAULTS;
  try {
    const cms = await loadGlobal("home");
    const lines = ((cms.titolo as { testo?: string }[]) ?? []).map((l) => str(l.testo)).filter(Boolean);
    const cta = (v: unknown, fallback: { label: string; href: string }) => {
      const o = (v ?? {}) as { testo?: string; link?: string };
      return { label: str(o.testo) || fallback.label, href: str(o.link) || fallback.href };
    };
    const cards = ((cms.schede as Record<string, unknown>[]) ?? [])
      .map((s) => {
        const m = media(s.foto as MediaDoc);
        return m && str(s.titolo) && str(s.link) ? { href: str(s.link), title: str(s.titolo), text: str(s.testo), ...m } : null;
      })
      .filter((c): c is NonNullable<typeof c> => c !== null);
    return {
      hero: {
        titleLines: lines.length ? lines : d.hero.titleLines,
        brandLine: str(cms.rigaMarchio) || d.hero.brandLine,
        intro: str(cms.introduzione) || d.hero.intro,
        ctaPrivate: cta(cms.ctaPrivati, d.hero.ctaPrivate),
        ctaBusiness: cta(cms.ctaAziende, d.hero.ctaBusiness),
      },
      spaces: { title: str(cms.titoloSpazi) || d.spaces.title, cards: cards.length ? cards : d.spaces.cards },
      seo: { title: str(cms.seoTitolo), description: str(cms.seoDescrizione) },
    };
  } catch (err) {
    if (err instanceof NotSeededError) return d;
    console.error("[iside] impossibile leggere la Home dal pannello, uso i testi predefiniti", err);
    return d;
  }
}

/* ---- Testi delle altre pagine: stessa logica per tutte ---- */

type FotoT = { src: string; alt: string; w?: number; h?: number };
const isFoto = (v: unknown): v is FotoT => !!v && typeof v === "object" && Object.keys(v).sort().join() === "alt,src";
const fotoFrom = (m: unknown): FotoT | null =>
  m && typeof m === "object" && typeof (m as { url?: unknown }).url === "string"
    ? {
        src: (m as { url: string }).url,
        alt: str((m as { alt?: unknown }).alt),
        ...(typeof (m as { width?: unknown }).width === "number" && { w: (m as { width: number }).width }),
        ...(typeof (m as { height?: unknown }).height === "number" && { h: (m as { height: number }).height }),
      }
    : null;

/** Ripulisce un valore del pannello: toglie gli id, sistema gli spazi e trasforma le foto della libreria in { src, alt }. */
function clean(v: unknown): unknown {
  if (typeof v === "string") return v.trim();
  if (Array.isArray(v)) return v.map(clean);
  if (v && typeof v === "object") {
    const f = fotoFrom(v);
    if (f) return f;
    return Object.fromEntries(Object.entries(v).filter(([k]) => k !== "id").map(([k, x]) => [k, clean(x)]));
  }
  return v;
}

/** Valori del pannello sopra quelli di partenza: un testo vuoto, una foto mancante o un elenco vuoto lasciano il valore di partenza. */
function merge(def: unknown, cms: unknown): unknown {
  if (isFoto(def)) return fotoFrom(cms) ?? def;
  if (typeof def === "string") return str(cms) || def;
  if (Array.isArray(def)) return Array.isArray(cms) && cms.length ? cms.map(clean) : def;
  if (def && typeof def === "object") {
    const o = (cms && typeof cms === "object" ? cms : {}) as Record<string, unknown>;
    return Object.fromEntries(Object.entries(def).map(([k, v]) => [k, merge(v, o[k])]));
  }
  return def;
}

/** Testi di una pagina: dal pannello, campo per campo; dove manca qualcosa valgono quelli di `defaults`. */
export async function getContent<T>(slug: string, defaults: T): Promise<T> {
  try {
    return merge(defaults, await loadGlobal(slug)) as T;
  } catch (err) {
    if (!(err instanceof NotSeededError)) console.error(`[iside] impossibile leggere «${slug}» dal pannello, uso i testi predefiniti`, err);
    return defaults;
  }
}

/** Testi ricorrenti del sito (pulsanti, footer, contatti, 404, Preventivo, modulo). */
export const getTesti = () => getContent("testi", TESTI);

/* ---- Pagine create dal pannello («Aggiungi pagina») ---- */

export type PaginaNuova = {
  titolo: string;
  slug: string;
  introduzione: string;
  foto: FotoT | null;
  blocchi: ({ id?: string; blockType: string } & Record<string, unknown>)[];
  seo: { titolo: string; descrizione: string };
};

const loadPagina = (slug: string) =>
  unstable_cache(
    async () => {
      const payload = await getPayload({ config });
      const r = await payload.find({
        collection: "pagine" as "users",
        where: { and: [{ slug: { equals: slug } }, { stato: { equals: "pubblicata" } }] },
        depth: 2,
        limit: 1,
        overrideAccess: true,
      });
      return JSON.parse(JSON.stringify(r.docs[0] ?? null)) as Record<string, unknown> | null;
    },
    ["pagina-nuova", slug],
    { tags: [PAGES_TAG] },
  )();

/** Una pagina pubblicata, o null se non esiste (o è ancora una bozza). */
export async function getPagina(slug: string): Promise<PaginaNuova | null> {
  try {
    const d = await loadPagina(slug);
    if (!d) return null;
    const seo = (d.seo ?? {}) as { titolo?: string; descrizione?: string };
    return {
      titolo: str(d.titolo),
      slug: str(d.slug),
      introduzione: str(d.introduzione),
      foto: fotoFrom(d.foto),
      blocchi: Array.isArray(d.blocchi) ? (d.blocchi as PaginaNuova["blocchi"]) : [],
      seo: { titolo: str(seo.titolo), descrizione: str(seo.descrizione) },
    };
  } catch (err) {
    console.error(`[iside] impossibile leggere la pagina «${slug}» dal pannello`, err);
    return null;
  }
}

/** Gli indirizzi delle pagine pubblicate (per la mappa del sito e la generazione in anticipo). */
export async function getSlugsPagine(): Promise<string[]> {
  try {
    const payload = await getPayload({ config });
    const r = await payload.find({
      collection: "pagine" as "users",
      where: { stato: { equals: "pubblicata" } },
      depth: 0,
      limit: 200,
      pagination: false,
      overrideAccess: true,
    });
    return r.docs.map((d) => String((d as unknown as { slug: string }).slug)).filter(Boolean);
  } catch {
    return [];
  }
}
