import Image from "next/image";
import Link from "next/link";
import { CTA, HOME_LINK, MENU_LINKS, PHONE_HREF, SITE, isTodo } from "@/config/site";

const link = "inline-flex min-h-11 items-center text-md text-white/90 underline-offset-4 hover:text-white hover:underline";

export default function Footer() {
  const social = [
    { label: "Instagram", href: SITE.social.instagram },
    { label: "Facebook", href: SITE.social.facebook },
    { label: "LinkedIn", href: SITE.social.linkedin },
  ].filter((s) => !isTodo(s.href));

  return (
    <footer className="on-dark bg-night text-inverse">
      <div className="page-container grid gap-s7 py-s8 md:grid-cols-[1.2fr_1fr_1fr] md:gap-s8 md:py-s9">
        <div>
          <Link href="/" aria-label="Iside — Events | Lounge | Living, vai alla home" className="inline-block rounded-xs">
            <Image src="/images/iside-testo-bianco.png" alt="" width={1305} height={526} className="h-20 w-auto" />
          </Link>
          <address className="mt-s5 grid gap-s1 text-md not-italic text-white/90">
            {!isTodo(SITE.address) && <span>{SITE.address}</span>}
            <a href={PHONE_HREF} className={link}>
              {SITE.phone.display}
            </a>
            <a href={`mailto:${SITE.email}`} className={link}>
              {SITE.email}
            </a>
          </address>
        </div>

        <nav aria-label="Pagine del sito">
          <p className="font-display text-lg font-bold">Il sito</p>
          <ul className="mt-s2 grid">
            {[HOME_LINK, ...MENU_LINKS].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={CTA.href} className={link}>
                Richiedi un preventivo
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="font-display text-lg font-bold">Seguici</p>
          <ul className="mt-s2 grid">
            {social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className={link}>
                  {s.label}
                  <span className="sr-only-text"> (si apre in una nuova scheda)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="page-container flex flex-col gap-s2 py-s5 text-sm text-white/80 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-white">
              {SITE.name} - {SITE.tagline}
            </p>
            <p>Un servizio di {SITE.legalName}</p>
            <p>
              {SITE.operatorName} - P.IVA: {SITE.vatId}
            </p>
          </div>
          <p className="flex gap-s5">
            <Link href="/privacy" className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-white">
              Privacy
            </Link>
            <Link href="/cookie" className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-white">
              Cookie
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
