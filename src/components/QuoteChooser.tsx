"use client";

import Link from "next/link";
import { useState } from "react";
import ContactAside from "./ContactAside";
import RequestForm from "./RequestForm";
import type { Kind } from "@/lib/request";

const TYPES: { kind: Kind; label: string }[] = [
  { kind: "privati", label: "Evento privato" },
  { kind: "aziendali", label: "Evento aziendale" },
];

/**
 * Pagina /preventivo: scelta del tipo di evento e modulo corrispondente (un solo modulo nel DOM alla volta).
 * Il tipo iniziale arriva dal server (da ?tipo=…), quindi il modulo è già nell'HTML al primo render.
 * Le scelte sono link veri a /preventivo?tipo=…: senza JS ricaricano la pagina, con JS cambiano subito senza navigare.
 */
export default function QuoteChooser({ initialKind }: { initialKind: Kind | "" }) {
  const [kind, setKind] = useState<Kind | "">(initialKind);

  const choose = (e: React.MouseEvent<HTMLAnchorElement>, next: Kind) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return; // apri in nuova scheda: comportamento normale
    e.preventDefault();
    setKind(next);
    window.history.replaceState(null, "", `/preventivo?tipo=${next}`);
  };

  return (
    <div className="page-container grid gap-s7 pb-s8 md:grid-cols-[1fr_1.4fr] md:gap-s9 md:pb-s9">
      <div>
        <div role="group" aria-labelledby="tipo-legend">
          <p id="tipo-legend" className="font-display text-xl font-bold text-ink">
            Che evento vuoi organizzare?
          </p>
          <div className="mt-s4 flex flex-wrap gap-s2">
            {TYPES.map((t) => {
              const selected = kind === t.kind;
              return (
                <Link
                  key={t.kind}
                  href={`/preventivo?tipo=${t.kind}`}
                  replace
                  scroll={false}
                  onClick={(e) => choose(e, t.kind)}
                  aria-current={selected ? "true" : undefined}
                  className={`inline-flex min-h-12 items-center rounded-pill border px-s5 text-md font-semibold transition-colors duration-(--duration-fast) ${
                    selected ? "border-water bg-water text-inverse" : "border-line bg-raised text-ink hover:border-water"
                  }`}
                >
                  {t.label}
                </Link>
              );
            })}
          </div>
        </div>
        <ContactAside />
      </div>
      <div>
        {kind ? (
          <RequestForm key={kind} kind={kind} />
        ) : (
          <p className="rounded-md bg-raised p-s5 text-md text-ink-secondary">Scegli il tipo di evento: ti mostriamo il modulo giusto.</p>
        )}
      </div>
    </div>
  );
}
