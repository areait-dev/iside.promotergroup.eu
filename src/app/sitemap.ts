import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";
import { getSlugsPagine } from "@/lib/page-data";

const PAGES = [
  { path: "/", priority: 1 },
  { path: "/area-living", priority: 0.8 },
  { path: "/centro-congressi", priority: 0.8 },
  { path: "/cucina", priority: 0.8 },
  { path: "/eventi-privati", priority: 0.8 },
  { path: "/eventi-aziendali", priority: 0.8 },
  { path: "/preventivo", priority: 0.7 },
  { path: "/privacy", priority: 0.2 },
  { path: "/cookie", priority: 0.2 },
];

/** Le pagine fisse più quelle create dal pannello e pubblicate. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const nuove = (await getSlugsPagine()).map((slug) => ({ path: `/${slug}`, priority: 0.6 }));
  return [...PAGES, ...nuove].map((p) => ({ url: `${SITE.url}${p.path === "/" ? "" : p.path}`, priority: p.priority }));
}
