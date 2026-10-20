"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CalendarIcon, ChatIcon, PhoneIcon } from "./icons";
import { CTA, PHONE_HREF, WHATSAPP_HREF } from "@/config/site";
import { visibleById } from "@/lib/dom";

/** Altezza della navbar fissa (--header-height): la barra compare quando l'hero è uscito sotto di essa. */
const HEADER_HEIGHT = 64;

const item =
  "flex min-h-11 flex-1 flex-col items-center justify-center gap-0.5 rounded-xs text-xs font-semibold text-inverse transition-colors duration-(--duration-fast) hover:bg-white/10 active:bg-white/20";

export default function ActionBar() {
  const pathname = usePathname();
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
        <a href={PHONE_HREF} className={item}>
          <PhoneIcon className="size-5" />
          Chiama
        </a>
        {WHATSAPP_HREF && (
          <a href={WHATSAPP_HREF} className={item}>
            <ChatIcon className="size-5" />
            WhatsApp
          </a>
        )}
        <Link
          href={CTA.href}
          className="flex min-h-11 flex-[1.3] items-center justify-center gap-s1 rounded-pill bg-sun px-s4 text-md font-semibold text-night transition-[filter] duration-(--duration-fast) hover:brightness-105 active:brightness-95"
        >
          <CalendarIcon className="size-5" />
          {CTA.short}
        </Link>
      </div>
    </nav>
  );
}
