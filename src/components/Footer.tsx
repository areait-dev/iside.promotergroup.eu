import Image from "next/image";
import Link from "next/link";
import { WhatsappIcon } from "./icons";
import { socialNetworks } from "./social";
import { CTA, HOME_LINK, isTodo } from "@/config/site";
import { getTesti } from "@/lib/page-data";
import { getMenu, getSite, phoneHref, whatsappHref } from "@/lib/site-data";

const link = "inline-flex min-h-11 min-w-11 items-center text-md text-ink underline-offset-4 hover:underline";

export default async function Footer() {
  const SITE = await getSite();
  const MENU_LINKS = await getMenu();
  const T = await getTesti();
  const PHONE_HREF = phoneHref(SITE);
  const wa = whatsappHref(SITE);
  const social = [
    ...socialNetworks(SITE.social),
    ...(wa ? [{ label: T.pulsanti.whatsapp, href: wa, Icon: WhatsappIcon }] : []),
  ];

  return (
    <footer className="border-t border-line bg-base text-ink">
      <div className="page-container grid grid-cols-2 gap-x-s5 gap-y-s7 py-s8 md:grid-cols-[1.2fr_1fr_1fr] md:gap-s8 md:py-s9">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" aria-label="Iside — Events | Lounge | Living, vai alla home" className="inline-block rounded-xs">
            <Image src="/images/iside-logo-blu.svg" alt="" width={346} height={98} unoptimized className="h-16 w-auto" />
          </Link>
          <address className="mt-s5 grid gap-s1 text-md not-italic text-ink">
            {!isTodo(SITE.address) && <span>{SITE.address}</span>}
            <a href={PHONE_HREF} className={link}>
              {SITE.phone.display}
            </a>
            <a href={`mailto:${SITE.email}`} className={link}>
              {SITE.email}
            </a>
          </address>
        </div>

        <nav aria-label="Pagine del sito" className="min-w-0">
          <p className="font-display text-lg font-bold">{T.footer.titoloSito}</p>
          <ul className="mt-s2 grid">
            {[{ ...HOME_LINK, label: T.navigazione.home }, ...MENU_LINKS].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={CTA.href} className={link}>
                {T.pulsanti.preventivo}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="min-w-0">
          <p className="font-display text-lg font-bold">{T.footer.titoloSocial}</p>
          <ul className="mt-s2 grid justify-start">
            {social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-11 items-center justify-center rounded-xs text-ink transition-colors duration-(--duration-fast) hover:text-water"
                >
                  <s.Icon className="size-6" />
                  <span className="sr-only-text">{s.label} (si apre in una nuova scheda)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="page-container flex flex-col gap-s2 py-s5 text-sm text-ink-secondary md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-ink">
              {SITE.name} - {SITE.tagline}
            </p>
            <p>
              {T.footer.servizioDi} {SITE.legalName}
            </p>
            <p>
              {SITE.operatorName} - {T.footer.etichettaPartitaIva}: {SITE.vatId}
            </p>
          </div>
          <p className="flex gap-s5">
            <Link href="/privacy" className="inline-flex min-h-11 min-w-11 items-center underline underline-offset-4 hover:text-water">
              {T.footer.privacy}
            </Link>
            <Link href="/cookie" className="inline-flex min-h-11 min-w-11 items-center underline underline-offset-4 hover:text-water">
              {T.footer.cookie}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
