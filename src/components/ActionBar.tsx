"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CalendarIcon, PhoneIcon, WhatsappIcon } from "./icons";
import { CTA } from "@/config/site";
import { visibleById } from "@/lib/dom";

/** Altezza della navbar fissa (--header-height): la barra compare quando l'hero è uscito sotto di essa. */
const HEADER_HEIGHT = 64;

const item =
  "flex min-h-11 flex-1 flex-col items-center justify-center gap-0.5 rounded-xs text-xs font-semibold text-inverse transition-colors duration-(--duration-fast) hover:bg-white/10 active:bg-white/20";

export default function ActionBar({
  phoneHref,
  whatsappHref,
  labels,
  perPagina = [],
}: {
  phoneHref: string;
  whatsappHref: string | null;
  labels: { chiama: string; whatsapp: string; preventivo: string };
  /** Pulsante diverso per pagina (dal pannello); dove manca vale quello generico. */
  perPagina?: { percorso: string; breve: string; testo: string; link: string }[];
}) {
  const pathname = usePathname();
  const cta = perPagina.find((p) => p.percorso.replace(/\/$/, "") === pathname.replace(/\/$/, ""));
  const [afterHero, setAfterHero] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const hero = visibleById("hero");
    const update = () => setAfterHero(hero ? hero.getBoundingClientRect().bottom <= HEADER_HEIGHT : true);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const footer = document.querySelector("footer");
    const io = footer ? new IntersectionObserver(([e]) => setFooterVisible(e.isIntersecting)) : null;
    if (footer) io?.observe(footer);

    const vv = window.visualViewport;
    const onVV = () => vv && setKeyboardOpen(window.innerHeight - vv.height > 150);
    vv?.addEventListener("resize", onVV);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      io?.disconnect();
      vv?.removeEventListener("resize", onVV);
    };
  }, [pathname]);

  const visible = afterHero && !footerVisible && !keyboardOpen;

  return (
    <nav
      aria-label="Azioni rapide"
      inert={!visible}
      className={`on-dark fixed inset-x-0 bottom-0 z-40 bg-night pb-[env(safe-area-inset-bottom)] transition-transform duration-(--duration-normal) ease-standard md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex h-bar items-center gap-s1 px-s3">
        <a href={phoneHref} className={item}>
          <PhoneIcon className="size-5" />
          {labels.chiama}
        </a>
        {whatsappHref && (
          <a href={whatsappHref} className={item}>
            <WhatsappIcon className="size-5" />
            {labels.whatsapp}
          </a>
        )}
        <Link
          href={cta?.link || CTA.href}
          aria-label={cta?.testo}
          className="flex min-h-11 flex-[1.3] items-center justify-center gap-s1 rounded-pill bg-white px-s4 text-md font-semibold text-night transition-[filter] duration-(--duration-fast) hover:brightness-95 active:brightness-90"
        >
          <CalendarIcon className="size-5" />
          {cta?.breve || labels.preventivo}
        </Link>
      </div>
    </nav>
  );
}
