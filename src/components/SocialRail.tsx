"use client";

import { useEffect, useRef, useState } from "react";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "./icons";
import { SITE, isTodo } from "@/config/site";

const NETWORKS = [
  { label: "Instagram", href: SITE.social.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: SITE.social.facebook, Icon: FacebookIcon },
  { label: "LinkedIn", href: SITE.social.linkedin, Icon: LinkedinIcon },
].filter((n) => !isTodo(n.href));

/** Vero se ciò che sta sotto il punto è uno sfondo scuro: un'area `.on-dark` oppure una foto/un video. */
function darkAt(x: number, y: number, rail: HTMLElement): boolean {
  const under = document.elementsFromPoint(x, y).find((el) => !rail.contains(el));
  if (!under) return false;
  return under.closest(".on-dark") !== null || /^(IMG|VIDEO|PICTURE|CANVAS)$/.test(under.tagName);
}

/**
 * Icone social fisse sul bordo sinistro, senza sfondo: seguono lo scroll, sono bianche sulle aree scure
 * e blu Iside su quelle chiare, e lasciano il posto al footer, che ha già i link.
 */
export default function SocialRail() {
  const railRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [footerVisible, setFooterVisible] = useState(false);
  const [dark, setDark] = useState<boolean[]>(() => NETWORKS.map(() => false));

  useEffect(() => {
    const footer = document.querySelector("footer");
    const io = footer ? new IntersectionObserver(([e]) => setFooterVisible(e.isIntersecting)) : null;
    if (footer) io?.observe(footer);

    let frame = 0;
    const measure = () => {
      frame = 0;
      const rail = railRef.current;
      if (!rail) return;
      const next = itemRefs.current.map((a) => {
        if (!a) return false;
        const r = a.getBoundingClientRect();
        return darkAt(r.left + r.width / 2, r.top + r.height / 2, rail);
      });
      setDark((prev) => (prev.length === next.length && prev.every((v, i) => v === next[i]) ? prev : next));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  if (NETWORKS.length === 0) return null;

  return (
    <nav
      ref={railRef}
      aria-label="Social"
      inert={footerVisible}
      className={`fixed left-0 top-1/2 z-30 flex -translate-y-1/2 flex-col transition-opacity duration-(--duration-normal) ease-standard ${
        footerVisible ? "opacity-0" : "opacity-100"
      }`}
    >
      {NETWORKS.map(({ label, href, Icon }, i) => (
        <a
          key={label}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex size-11 items-center justify-center rounded-xs transition-[color,opacity] duration-(--duration-fast) hover:opacity-70 ${
            dark[i] ? "on-dark text-white [filter:drop-shadow(0_1px_2px_rgb(0_0_0/0.35))]" : "text-ink"
          }`}
        >
          <Icon className="size-6" />
          <span className="sr-only-text">{label} (si apre in una nuova scheda)</span>
        </a>
      ))}
    </nav>
  );
}
