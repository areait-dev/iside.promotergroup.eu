import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

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

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((p) => ({ url: `${SITE.url}${p.path === "/" ? "" : p.path}`, priority: p.priority }));
}
