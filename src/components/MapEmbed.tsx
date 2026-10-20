import { SITE, isTodo } from "@/config/site";

/**
 * Mappa Google incorporata. Si carica da sola: l'iframe è `lazy`, quindi parte quando si scorre fino ai contatti.
 * Google può impostare propri cookie: la cookie policy (/cookie) lo dichiara.
 */
export default function MapEmbed() {
  const hasEmbed = !isTodo(SITE.mapsEmbed);
  const hasLink = !isTodo(SITE.mapsLink);

  return (
    <div className="grid gap-s3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-line md:aspect-[16/10]">
        {hasEmbed && (
          <iframe
            src={SITE.mapsEmbed}
            title="Mappa della posizione di Iside"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full border-0"
          />
        )}
      </div>
      {hasLink && (
        <a
          href={SITE.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-self-start text-md font-semibold text-water underline underline-offset-4 decoration-from-font hover:text-night"
        >
          Apri su Google Maps (si apre in una nuova scheda)
        </a>
      )}
    </div>
  );
}
