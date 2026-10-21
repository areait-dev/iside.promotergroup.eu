import type { Metadata, Viewport } from "next";
import { Karla, Merriweather } from "next/font/google";
import ActionBar from "@/components/ActionBar";
import SocialRail from "@/components/SocialRail";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { CAPACITY, SITE as DEFAULTS, isTodo } from "@/config/site";
import { getTesti } from "@/lib/page-data";
import { getMenu, getSite, phoneHref, whatsappHref, type Site } from "@/lib/site-data";
import "./globals.css";

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const SITE = await getSite();
  const TITLE = `${SITE.name} — ${SITE.tagline}`;
  const DESCRIPTION = SITE.description;
  return {
  metadataBase: new URL(DEFAULTS.url),
  alternates: { canonical: "/" },
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "Iside",
    locale: "it_IT",
    type: "website",
    images: [{ url: "/images/DJI_0099.jpg", width: 1620, height: 1080, alt: "Veduta aerea della piscina e del giardino di Iside" }],
  },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#004f71",
};

/** Dati strutturati: solo i campi realmente configurati (niente segnaposto TODO). */
function venueJsonLd(SITE: Site) {
  const sameAs = Object.values(SITE.social).filter((v) => !isTodo(v));
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["EventVenue", "LocalBusiness"],
    name: `${SITE.name} — ${SITE.tagline}`,
    url: SITE.url,
    description: SITE.description,
    image: `${SITE.url}/images/DJI_0099.jpg`,
    telephone: SITE.phone.e164,
    email: SITE.email,
    maximumAttendeeCapacity: CAPACITY.centroCongressi,
    parentOrganization: { "@type": "Organization", name: SITE.legalName },
  };
  const a = SITE.addressParts;
  if (!isTodo(a.street) || !isTodo(a.city)) {
    data.address = {
      "@type": "PostalAddress",
      ...(!isTodo(a.street) && { streetAddress: a.street }),
      ...(!isTodo(a.postalCode) && { postalCode: a.postalCode }),
      ...(!isTodo(a.city) && { addressLocality: a.city }),
      ...(!isTodo(a.province) && { addressRegion: a.province }),
      addressCountry: a.country,
    };
  }
  const hours = SITE.openingHours
    .filter((h) => !isTodo(h.opens) && !isTodo(h.closes) && h.days.every((d) => !isTodo(d)))
    .map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.days, opens: h.opens, closes: h.closes }));
  if (hours.length) data.openingHoursSpecification = hours;
  if (!isTodo(SITE.geo.latitude) && !isTodo(SITE.geo.longitude)) {
    data.geo = { "@type": "GeoCoordinates", latitude: SITE.geo.latitude, longitude: SITE.geo.longitude };
  }
  if (sameAs.length) data.sameAs = sameAs;
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getSite();
  const menu = await getMenu();
  const T = await getTesti();
  return (
    <html lang="it" data-scroll-behavior="smooth" suppressHydrationWarning className={`${merriweather.variable} ${karla.variable}`}>
      <body className="min-h-dvh">
        <Header phoneHref={phoneHref(site)} whatsappHref={whatsappHref(site)} social={site.social}
          menu={menu}
          labels={{ home: T.navigazione.home, preventivo: T.pulsanti.preventivo, chiama: T.pulsanti.chiama, whatsapp: T.pulsanti.whatsapp }}
        />
        <main>{children}</main>
        <Footer />
        <ActionBar
          phoneHref={phoneHref(site)}
          whatsappHref={whatsappHref(site)}
          labels={{ chiama: T.pulsanti.chiama, whatsapp: T.pulsanti.whatsapp, preventivo: T.pulsanti.preventivoBreve }}
          perPagina={T.perPagina}
        />
        <SocialRail social={site.social} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: venueJsonLd(site) }} />
      </body>
    </html>
  );
}
