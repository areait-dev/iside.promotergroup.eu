import type { Photo } from "@/components/PhotoGrid";
import { EVENTI } from "./gallerie/aziendali";
import { SERATE } from "./gallerie/privati";

/**
 * Gallerie delle pagine. Nel pannello ogni voce è una foto della libreria; nelle gallerie a griglia
 * si sceglie anche il formato (quanto spazio occupa la foto nella riga).
 */
export type Formato = "largo" | "alto" | "meta" | "intera";
export type VoceGalleria = {
  foto: { src: string; alt: string; w?: number; h?: number };
  /** Misure di partenza: servono finché la foto non viene presa dalla libreria, che le conosce già. */
  w?: number;
  h?: number;
  formato?: Formato;
};

export const FORMATI: Record<Formato, string> = {
  largo: "col-span-2 aspect-[16/10] md:col-span-4",
  alto: "aspect-[3/4] md:col-span-2",
  meta: "col-span-2 aspect-[16/10] md:col-span-3",
  intera: "col-span-2 aspect-[16/10] md:col-span-6",
};

/** Da voci della galleria a foto per `PhotoGrid`. In una fila che scorre (`strip`) il formato non conta. */
export function toPhotos(voci: VoceGalleria[], grid: boolean): Photo[] {
  return voci.map((v) => ({
    src: v.foto.src,
    alt: v.foto.alt,
    w: v.foto.w ?? v.w ?? 1600,
    h: v.foto.h ?? v.h ?? 1067,
    cls: grid ? FORMATI[v.formato ?? "meta"] : "",
  }));
}

const daFoto = (p: Photo[], formati?: Formato[]): VoceGalleria[] =>
  p.map((x, i) => ({ foto: { src: x.src, alt: x.alt }, w: x.w, h: x.h, ...(formati && { formato: formati[i] }) }));

export const GALLERIA_PRIVATI = daFoto(SERATE);
export const GALLERIA_AZIENDALI = daFoto(EVENTI);

export const GALLERIA_AREA_LIVING = daFoto(
  [
    { src: "/images/al-165000.jpg", w: 1059, h: 621, cls: "", alt: "Veduta dall'alto della piscina con i lettini, i gazebi bianchi e il prato" },
    { src: "/images/al-1559.jpg", w: 1500, h: 2000, cls: "", alt: "La piscina vista dal bordo vasca, con palme, lampade bianche e lettini sullo sfondo" },
    { src: "/images/al-1552.jpg", w: 1500, h: 2000, cls: "", alt: "L'acqua della piscina con i gazebi, l'ulivo e la sala vetrata sullo sfondo" },
    { src: "/images/al-sdraio.jpg", w: 1391, h: 879, cls: "", alt: "Lettini a bordo piscina, con il bancone bianco e un gazebo nel giardino" },
    { src: "/images/al-164220.jpg", w: 1457, h: 874, cls: "", alt: "La piscina vista dall'alto, con il trampolino e la fila di lettini" },
    { src: "/images/al-165248.jpg", w: 1058, h: 817, cls: "", alt: "Due gazebi bianchi con pouf sul prato, visti dall'alto" },
  ],
  ["largo", "alto", "alto", "largo", "meta", "meta"],
);

export const GALLERIA_CENTRO_CONGRESSI = daFoto(
  [
    { src: "/images/cc-6365.jpg", w: 2000, h: 1333, cls: "", alt: "La sala vista di lato, con le sedie in file e lo schermo di proiezione" },
    { src: "/images/cc-6368.jpg", w: 2000, h: 1333, cls: "", alt: "Il tavolo dei relatori sulla pedana, con microfoni e schermo alle spalle" },
    { src: "/images/cc-6380.jpg", w: 2000, h: 1333, cls: "", alt: "Le file di sedie in primo piano, con il pannello divisorio sullo sfondo" },
    { src: "/images/cc-6367.jpg", w: 2000, h: 1333, cls: "", alt: "La sala con due blocchi di sedie separati da un corridoio, pedana sulla destra" },
    { src: "/images/cc-6379.jpg", w: 2000, h: 1333, cls: "", alt: "Le sedute disposte ad arco davanti alla pedana, con le piante ai lati" },
  ],
  ["largo", "alto", "alto", "largo", "intera"],
);
