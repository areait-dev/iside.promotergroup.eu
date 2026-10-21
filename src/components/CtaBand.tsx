import Link from "next/link";
import { useId } from "react";
import { CTA, PHONE_HREF } from "@/config/site";

export default function CtaBand() {
  const titleId = useId();
  return (
    <section aria-labelledby={titleId} className="on-dark bg-night py-s8 text-inverse md:py-s9">
      <div className="page-container">
        <h2 id={titleId} className="font-display text-xl font-bold md:text-2xl">
          Organizza il tuo evento
        </h2>
        <p className="mt-s3 max-w-[50ch] text-md text-white">
          Scrivici la data e il numero di ospiti: ti ricontattiamo noi.
        </p>
        <div className="mt-s6 flex flex-col gap-s3 md:flex-row">
          <Link
            href={CTA.href}
            className="inline-flex min-h-12 items-center justify-center rounded-pill bg-white px-s6 text-md font-semibold text-night transition-[filter] duration-(--duration-fast) ease-standard hover:brightness-95 active:brightness-90"
          >
            {CTA.label}
          </Link>
          <a
            href={PHONE_HREF}
            className="inline-flex min-h-12 items-center justify-center rounded-pill border-2 border-white px-s6 text-md font-semibold text-inverse transition-colors duration-(--duration-fast) ease-standard hover:bg-white/15 active:bg-white/25"
          >
            Chiama
          </a>
        </div>
      </div>
    </section>
  );
}
