import { CAPACITY } from "@/config/site";

/** Testi della Home: sono anche i valori di partenza nel pannello e quelli usati se un campo resta vuoto. */
export type HomeContent = {
  hero: {
    titleLines: string[];
    brandLine: string;
    intro: string;
    ctaPrivate: { label: string; href: string };
    ctaBusiness: { label: string; href: string };
  };
  spaces: {
    title: string;
    cards: { href: string; title: string; text: string; image: string; alt: string }[];
  };
  seo: { title: string; description: string };
};

export const HOME_DEFAULTS: HomeContent = {
  hero: {
    titleLines: ["Lo spazio ideale", "per i tuoi eventi", "business & privati"],
    /** `{societa}` diventa la ragione sociale delle Impostazioni del sito. */
    brandLine: "Iside è il nuovo brand di {societa}",
    intro:
      "Situata al centro della Valle dell’Ippari, a due passi dall’aeroporto di Comiso e da Vittoria, la struttura è composta da un Centro Congressi e da un’ampia area living con piscina, giardino e gazebi.",
    ctaPrivate: { label: "Organizza la tua festa", href: "/eventi-privati#richiesta-privati" },
    ctaBusiness: { label: "Organizza un evento aziendale", href: "/eventi-aziendali#richiesta-aziendali" },
  },
  spaces: {
    title: "Scegli lo spazio per il tuo evento",
    cards: [
      {
        href: "/area-living",
        title: "Area living",
        text: "Piscina, giardino e gazebi.",
        image: "/images/al-pxl.jpg",
        alt: "La piscina di Iside con i gazebi bianchi, i lettini e le palme sullo sfondo",
      },
      {
        href: "/centro-congressi",
        title: "Centro congressi",
        text: `Convegni, seminari e conferenze stampa, fino a ${CAPACITY.centroCongressi} invitati.`,
        image: "/images/cc-6362.jpg",
        alt: "La sala del Centro congressi con le sedie in file e lo schermo sul fondo",
      },
    ],
  },
  seo: { title: "", description: "" },
};
