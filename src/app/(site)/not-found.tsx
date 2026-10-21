import type { Metadata } from "next";
import Link from "next/link";
import { CTA, HOME_LINK } from "@/config/site";
import { getTesti } from "@/lib/page-data";
import { getMenu } from "@/lib/site-data";

export const metadata: Metadata = { title: "Pagina non trovata — Iside", robots: { index: false } };

export default async function NotFound() {
  const MENU_LINKS = await getMenu();
  const T = await getTesti();
  return (
    <section className="page-container pt-[calc(var(--header-height)+var(--space-8))] pb-s9">
      <p className="text-md font-semibold text-ink-secondary">{T.pagina404.errore}</p>
      <h1 className="mt-s2 max-w-[20ch] font-display text-2xl font-bold text-ink md:text-3xl">{T.pagina404.titolo}</h1>
      <p className="mt-s4 max-w-[50ch] text-lg text-ink-secondary">
        {T.pagina404.testo}
      </p>
      <ul className="mt-s7 grid max-w-[480px] border-t border-ink/40">
        {[{ ...HOME_LINK, label: T.navigazione.home }, ...MENU_LINKS].map((l) => (
          <li key={l.href} className="border-b border-ink/20">
            <Link href={l.href} className="flex min-h-12 items-center font-display text-lg font-bold text-ink hover:text-water">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href={CTA.href}
        className="mt-s7 inline-flex min-h-12 items-center justify-center rounded-pill bg-water px-s6 text-md font-semibold text-inverse transition-[filter] duration-(--duration-fast) hover:brightness-110"
      >
        {T.pulsanti.preventivo}
      </Link>
    </section>
  );
}
