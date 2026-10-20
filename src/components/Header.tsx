"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { CloseIcon, MenuIcon, PhoneIcon } from "./icons";
import { CTA, HOME_LINK, MENU_LINKS, PHONE_HREF } from "@/config/site";
import { visibleById } from "@/lib/dom";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
const HEADER_HEIGHT = 64;
/** Pagine con un hero a tutta larghezza (id="hero") sotto l'header: lì l'header parte trasparente. */
const HERO_PATHS = new Set(["/", "/area-living", "/centro-congressi", "/cucina", "/eventi-privati", "/eventi-aziendali"]);

const iconBtn =
  "inline-flex size-11 items-center justify-center rounded-pill text-inverse hover:bg-white/15 active:bg-white/25";

export default function Header() {
  const pathname = usePathname();
  const hasHero = HERO_PATHS.has(pathname);
  const [heroGone, setHeroGone] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  // Header solido appena l'hero finisce sotto l'header (nessun ritardo, nessuna soglia in pixel).
  useEffect(() => {
    if (!hasHero) return;
    const hero = visibleById("hero");
    if (!hero) return;
    const io = new IntersectionObserver(([entry]) => setHeroGone(!entry.isIntersecting), {
      rootMargin: `-${HEADER_HEIGHT}px 0px 0px 0px`,
      threshold: 0,
    });
    io.observe(hero);
    return () => io.disconnect();
  }, [hasHero, pathname]);

  // Il menu mobile si chiude se la finestra passa alla navbar desktop.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    menuBtnRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const header = headerRef.current!;
    document.body.style.overflow = "hidden";
    header.querySelector<HTMLElement>("#menu-panel a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const items = Array.from(header.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const solid = !hasHero || heroGone || open;

  return (
    <header
      ref={headerRef}
      className={`on-dark fixed inset-x-0 top-0 z-50 h-header ${solid ? "bg-night" : "bg-transparent"}`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-[linear-gradient(to_bottom,rgb(0_79_113/0.85)_0%,rgb(0_79_113/0.6)_45%,rgb(0_79_113/0)_100%)] transition-opacity duration-(--duration-fast) ${solid ? "opacity-0" : "opacity-100"}`}
      />
      <div className="page-container flex h-full items-center justify-between">
        <Link href="/" aria-label="Iside — Events | Lounge | Living, vai alla home" className="flex h-11 shrink-0 items-center rounded-xs">
          <Image src="/images/iside-logo-white.svg" alt="" width={346} height={98} unoptimized priority className="h-11 w-auto md:h-12" />
        </Link>
        <nav aria-label="Principale" className="ml-auto mr-s6 hidden items-center gap-s1 lg:flex">
          {MENU_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex min-h-11 items-center whitespace-nowrap rounded-pill px-s4 text-md font-medium text-inverse hover:bg-white/15 active:bg-white/25"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-s1">
          <a href={PHONE_HREF} className={iconBtn}>
            <PhoneIcon />
            <span className="sr-only-text">Chiama</span>
          </a>
          <button
            ref={menuBtnRef}
            type="button"
            className={`${iconBtn} lg:hidden`}
            aria-expanded={open}
            aria-controls="menu-panel"
            aria-label={open ? "Chiudi il menu" : "Apri il menu"}
            onClick={() => (open ? close() : setOpen(true))}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div
        id="menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Menu principale"
        hidden={!open}
        className="fixed inset-0 -z-10 overflow-y-auto bg-night pt-header lg:hidden"
      >
        <nav aria-label="Menu mobile" className="page-container flex min-h-full flex-col justify-between gap-s7 py-s7">
          <Image src="/images/logo-stacked-white.png" alt="" width={1717} height={1468} className="mx-auto mb-s4 h-auto w-40" />
          <ul className="flex flex-col">
            {[HOME_LINK, ...MENU_LINKS].map((l) => (
              <li key={l.href} className="border-b border-white/15">
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-s4 font-display text-2xl font-semibold text-inverse hover:text-white/70"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={CTA.href}
            onClick={() => setOpen(false)}
            className="inline-flex min-h-12 items-center justify-center rounded-pill bg-sun px-s6 text-md font-semibold text-night transition-[filter] duration-(--duration-fast) hover:brightness-105"
          >
            {CTA.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}
