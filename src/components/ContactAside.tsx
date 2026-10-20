import { PHONE_HREF, SITE, isTodo } from "@/config/site";

/** Contatti diretti e tempi di risposta, accanto ai moduli. */
export default function ContactAside() {
  return (
    <div className="mt-s6 border-t border-ink/40 pt-s4">
      <p className="font-display text-lg font-bold text-ink">Preferisci parlarci?</p>
      <ul className="mt-s2 grid gap-s1 text-md">
        <li>
          <a href={PHONE_HREF} className="inline-flex min-h-11 items-center font-semibold text-water underline underline-offset-4 decoration-from-font hover:text-night">
            {SITE.phone.display}
          </a>
        </li>
        <li>
          <a href={`mailto:${SITE.email}`} className="inline-flex min-h-11 items-center font-semibold text-water underline underline-offset-4 decoration-from-font hover:text-night">
            {SITE.email}
          </a>
        </li>
      </ul>
      {!isTodo(SITE.responseTime) && <p className="mt-s2 text-md text-ink-secondary">{SITE.responseTime}</p>}
    </div>
  );
}
