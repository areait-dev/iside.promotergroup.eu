import MapEmbed from "./MapEmbed";
import { PHONE_HREF, SITE, isTodo } from "@/config/site";

const link =
  "inline-flex min-h-11 items-center font-semibold text-water underline underline-offset-4 decoration-from-font hover:text-night";

/** Sezione Contatti della home (id="contatti"). */
export default function ContactSection() {
  return (
    <section id="contatti" aria-labelledby="contatti-title" className="page-container py-s8 md:py-s9">
      <h2 id="contatti-title" className="font-display text-2xl font-bold text-ink">
        Contatti
      </h2>
      <div className="mt-s6 grid gap-s7 md:grid-cols-2 md:gap-s9">
        <dl className="grid content-start gap-s5 text-md">
          <div>
            <dt className="font-display text-lg font-bold text-ink">Telefono</dt>
            <dd>
              <a href={PHONE_HREF} className={link}>
                {SITE.phone.display}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-display text-lg font-bold text-ink">Email</dt>
            <dd>
              <a href={`mailto:${SITE.email}`} className={link}>
                {SITE.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-display text-lg font-bold text-ink">Dove siamo</dt>
            {!isTodo(SITE.address) && <dd className="text-ink-secondary">{SITE.address}</dd>}
            <dd className="mt-s1 text-ink-secondary">Nella Valle dell’Ippari, vicino a Vittoria e all’aeroporto di Comiso.</dd>
          </div>
          {!isTodo(SITE.hours) && (
            <div>
              <dt className="font-display text-lg font-bold text-ink">Orari</dt>
              <dd className="text-ink-secondary">{SITE.hours}</dd>
            </div>
          )}
        </dl>
        <MapEmbed />
      </div>

    </section>
  );
}
