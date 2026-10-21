import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import Image from "next/image";
import Link from "next/link";
import PhotoGrid, { type Photo } from "./PhotoGrid";

type Media = { url?: string; alt?: string; width?: number; height?: number } | number | null | undefined;
type Blocco = { id?: string; blockType: string } & Record<string, unknown>;

const m = (v: unknown): { src: string; alt: string; w: number; h: number } | null => {
  const x = v as Media;
  return x && typeof x === "object" && x.url ? { src: x.url, alt: x.alt ?? "", w: x.width ?? 1600, h: x.height ?? 1067 } : null;
};
const s = (v: unknown) => (typeof v === "string" ? v : "");

const titoloH2 = "font-display text-xl font-bold text-ink md:text-2xl";
const linkClass =
  "mt-s4 inline-flex min-h-11 items-center text-md font-semibold text-water underline underline-offset-4 decoration-from-font hover:text-night";

/** I blocchi di una pagina creata dal pannello, nell'ordine scelto. */
export default function Blocchi({ blocchi }: { blocchi: Blocco[] }) {
  return (
    <>
      {blocchi.map((b, i) => {
        const key = b.id ?? `${b.blockType}-${i}`;
        switch (b.blockType) {
          case "testo":
            return (
              <section key={key} className="page-container pb-s8 md:pb-s9">
                {s(b.titolo) && <h2 className={`${titoloH2} mb-s4`}>{s(b.titolo)}</h2>}
                <div className="contenuto-ricco max-w-[65ch]">
                  <RichText data={b.contenuto as SerializedEditorState} />
                </div>
              </section>
            );

          case "fotoTesto": {
            const foto = m(b.foto);
            const sinistra = b.lato === "sinistra";
            return (
              <section key={key} className="page-container pb-s8 md:pb-s9">
                <div className="grid items-center gap-s6 md:grid-cols-2 md:gap-s9">
                  {foto && (
                    <div className={`relative aspect-[4/3] overflow-hidden rounded-md bg-line ${sinistra ? "" : "md:order-2"}`}>
                      <Image src={foto.src} alt={foto.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                    </div>
                  )}
                  <div className={sinistra ? "" : "md:order-1"}>
                    {s(b.titolo) && <h2 className={titoloH2}>{s(b.titolo)}</h2>}
                    {s(b.testo) && <p className="mt-s3 max-w-[50ch] text-lg text-ink-secondary">{s(b.testo)}</p>}
                    {s(b.linkTesto) && s(b.linkHref) && (
                      <Link href={s(b.linkHref)} className={linkClass}>
                        {s(b.linkTesto)}
                      </Link>
                    )}
                  </div>
                </div>
              </section>
            );
          }

          case "schede": {
            const voci = (b.voci as { titolo?: string; testo?: string }[]) ?? [];
            return (
              <section key={key} className="page-container pb-s8 md:pb-s9">
                {s(b.titolo) && <h2 className={`${titoloH2} mb-s6`}>{s(b.titolo)}</h2>}
                <dl className="grid gap-s5 md:grid-cols-3 md:gap-s7">
                  {voci.map((v, j) => (
                    <div key={`${s(v.titolo)}-${j}`} className="border-t border-ink/40 pt-s3">
                      <dt className="font-display text-lg font-bold text-ink">{s(v.titolo)}</dt>
                      <dd className="mt-s1 text-md text-ink-secondary">{s(v.testo)}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            );
          }

          case "galleria": {
            const photos: Photo[] = ((b.immagini as { foto?: unknown }[]) ?? [])
              .map((r) => m(r.foto))
              .filter((x): x is NonNullable<typeof x> => x !== null)
              .map((x) => ({ ...x, cls: "" }));
            if (photos.length === 0) return null;
            return (
              <section key={key} aria-label={s(b.titolo) || "Foto"}>
                {s(b.titolo) && (
                  <div className="page-container">
                    <h2 className={`${titoloH2} mb-s6`}>{s(b.titolo)}</h2>
                  </div>
                )}
                <PhotoGrid photos={photos} label={s(b.titolo) || "Foto"} layout="strip" />
              </section>
            );
          }

          case "fascia":
            return (
              <section key={key} className="on-dark mb-s8 bg-night py-s8 text-inverse md:mb-s9 md:py-s9">
                <div className="page-container">
                  <h2 className="font-display text-xl font-bold md:text-2xl">{s(b.titolo)}</h2>
                  {s(b.testo) && <p className="mt-s3 max-w-[50ch] text-md text-white">{s(b.testo)}</p>}
                  {s(b.pulsante) && s(b.href) && (
                    <Link
                      href={s(b.href)}
                      className="mt-s6 inline-flex min-h-12 items-center justify-center rounded-pill bg-white px-s6 text-md font-semibold text-night transition-[filter] duration-(--duration-fast) ease-standard hover:brightness-95 active:brightness-90"
                    >
                      {s(b.pulsante)}
                    </Link>
                  )}
                </div>
              </section>
            );

          default:
            return null;
        }
      })}
    </>
  );
}
