import type { Metadata } from "next";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { ArrowRightIcon } from "@/components/icons";
import PageHero from "@/components/PageHero";
import { CUCINA_PAGINA } from "@/content/pages";
import { getContent } from "@/lib/page-data";
import { getSite, phoneHref } from "@/lib/site-data";

const DESCRIPTION =
  "La cucina di Iside, a due passi da Vittoria e dall'aeroporto di Comiso: colazione al mattino e pranzo all'aperto, aperti al pubblico.";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getContent("cucina", CUCINA_PAGINA);
  const title = seo.titolo || "Cucina — Iside";
  const description = seo.descrizione || DESCRIPTION;
  return {
    title,
    description,
    alternates: { canonical: "/cucina" },
    openGraph: {
      title,
      description,
      url: "/cucina",
      images: [{ url: "/images/cucina-pizza-2.jpg", width: 2400, height: 1597, alt: "Le mani di un cuoco posano il prosciutto su una pizza condita con insalatina verde" }],
    },
  };
}

const button =
  "inline-flex min-h-12 items-center justify-center rounded-pill px-s6 text-md font-semibold transition-[filter] duration-(--duration-fast) ease-standard";

/** «Colazione» → «colazione»: serve come àncora (#colazione, #pranzo) per i link dai social. */
const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export default async function Cucina() {
  const c = await getContent("cucina", CUCINA_PAGINA);
  const SITE = await getSite();
  const PHONE_HREF = phoneHref(SITE);
  /* Foto dell'hero in dissolvenza (la prima si vede subito). */
  const slides = [c.hero.foto, { ...c.hero.foto2, position: "50% 75%" }];
  return (
    <>
      <PageHero image={c.hero.foto.src} alt={c.hero.foto.alt} slides={slides} title={c.hero.titolo} />

      <section aria-labelledby="cucina-title" className="page-container py-s8 md:py-s9">
        <h2 id="cucina-title" className="font-display text-xl font-bold leading-snug text-ink md:leading-snug lg:text-2xl">
          {c.intro.titolo.map((r) => (
            <span key={r.testo} className="block">
              {r.testo}
            </span>
          ))}
        </h2>
        <p className="mt-s4 max-w-[60ch] text-lg text-ink-secondary">{c.intro.testo}</p>

        {/* Lavagna del bistrot: i momenti della giornata in fila, come su un menu */}
        <ul className="on-dark mt-s7 grid overflow-hidden rounded-md bg-night text-inverse shadow-card md:grid-cols-2">
          {c.momenti.map((m) => (
            <li
              key={m.titolo}
              id={slug(m.titolo)}
              className="flex flex-col p-s6 not-first:border-t not-first:border-white/20 md:p-s7 md:not-first:border-l md:not-first:border-t-0"
            >
              <h3 className="font-display text-2xl font-bold">{m.titolo}</h3>
              <p className="mt-s2 font-display text-lg text-white">{m.lead}</p>
              <p className="mt-s2 text-md text-white/90">{m.testo}</p>
              {m.orari && (
                <p className="mt-s4 border-t border-dashed border-white/30 pt-s4 text-md text-white">
                  <span className="font-semibold">Orari:</span> {m.orari}
                </p>
              )}
              {m.menuLink && (
                <a
                  href={m.menuLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex min-h-11 items-center gap-s2 pt-s5 text-md font-semibold text-white underline underline-offset-4 hover:text-white/80"
                >
                  {m.menuTesto}
                  <ArrowRightIcon className="size-5" />
                  <span className="sr-only-text"> (si apre in una nuova scheda)</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="tavolo-title" className="on-dark bg-water py-s8 text-inverse md:py-s9">
        <div className="page-container">
          <h2 id="tavolo-title" className="font-display text-xl font-bold md:text-2xl">
            {c.tavolo.titolo}
          </h2>
          <p className="mt-s3 max-w-[50ch] text-md text-white">{c.tavolo.testo}</p>
          <div className="mt-s6 flex flex-col gap-s3 md:flex-row">
            {PHONE_HREF && (
              <a href={PHONE_HREF} className={`${button} bg-white text-night hover:brightness-95 active:brightness-90`}>
                {c.tavolo.etichettaChiama} {SITE.phone.display}
              </a>
            )}
            <Link
              href="/preventivo"
              className={`${button} border border-white text-inverse transition-colors hover:bg-white/15 active:bg-white/25`}
            >
              {c.tavolo.etichettaPreventivo}
            </Link>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
