"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, type ReactNode } from "react";

export type VoceNav = {
  label: string;
  href: string;
  icona: keyof typeof ICONE;
  /** Percorsi che tengono la voce evidenziata. */
  ambito: string[];
  /** Voci della tendina a destra (come in WordPress). */
  sotto: { label: string; href: string }[];
};

const svg = (children: ReactNode) => (
  <svg className="nav-pagine__icona" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {children}
  </svg>
);

const ICONE = {
  bacheca: svg(<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />),
  pagine: svg(
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </>,
  ),
  foto: svg(
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="1.8" />
      <path d="M21 16l-5-5-8 9" />
    </>,
  ),
  richieste: svg(
    <>
      <path d="M3 13h5l1.5 3h5L16 13h5" />
      <path d="M5.5 5h13L21 13v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6z" />
    </>,
  ),
  impostazioni: svg(
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
    </>,
  ),
  utenti: svg(
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.2a6.5 6.5 0 0 1 3.5 5.8" />
    </>,
  ),
} as const;

/**
 * Menu laterale come in WordPress: una voce per sezione, con la sua icona; passandoci sopra (o con la tastiera)
 * si apre a destra la tendina con le azioni, per esempio «Tutte le pagine» e «Aggiungi pagina».
 */
export default function NavLinks({ voci }: { voci: VoceNav[] }) {
  const path = usePathname() ?? "";
  const [aperta, setAperta] = useState<{ i: number; top: number; left: number } | null>(null);
  const radice = useRef<HTMLElement>(null);

  const apri = (i: number, el: HTMLElement) => {
    const nav = radice.current?.closest(".nav")?.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setAperta({ i, top: r.top, left: nav ? nav.right : r.right });
  };

  return (
    <nav
      ref={radice}
      className="nav-pagine"
      aria-label="Sezioni"
      onMouseLeave={() => setAperta(null)}
      onKeyDown={(e) => e.key === "Escape" && setAperta(null)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setAperta(null);
      }}
    >
      {voci.map((v, i) => {
        const attiva = v.ambito.some((a) => path === a || path.startsWith(`${a}/`));
        const sotto = v.sotto.length > 0;
        return (
          <Link
            key={v.href}
            href={v.href}
            className={`nav__link nav-pagine__link${attiva ? " nav-pagine__link--attiva" : ""}`}
            aria-current={attiva ? "page" : undefined}
            aria-haspopup={sotto ? "true" : undefined}
            aria-expanded={sotto ? aperta?.i === i : undefined}
            onMouseEnter={(e) => (sotto ? apri(i, e.currentTarget) : setAperta(null))}
            onFocus={(e) => (sotto ? apri(i, e.currentTarget) : setAperta(null))}
          >
            {ICONE[v.icona]}
            <span className="nav__link-label">{v.label}</span>
          </Link>
        );
      })}

      {aperta && voci[aperta.i].sotto.length > 0 && (
        <div className="nav-pagine__tendina" role="group" aria-label={voci[aperta.i].label} style={{ top: aperta.top, left: aperta.left }}>
          <p className="nav-pagine__tendina-titolo">{voci[aperta.i].label}</p>
          {voci[aperta.i].sotto.map((s) => (
            <Link key={s.href} href={s.href} className="nav-pagine__tendina-voce" onClick={() => setAperta(null)}>
              {s.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
