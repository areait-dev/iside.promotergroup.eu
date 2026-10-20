import type { ReactNode } from "react";

/** Struttura comune delle pagine legali (Privacy, Cookie). */
export default function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: ReactNode;
  sections: { heading: string; body: ReactNode }[];
}) {
  return (
    <article className="page-container pt-[calc(var(--header-height)+var(--space-8))] pb-s9">
      <h1 className="font-display text-2xl font-bold text-ink md:text-3xl">{title}</h1>
      <div className="mt-s4 max-w-[65ch] text-lg text-ink-secondary">{intro}</div>
      <div className="mt-s7 grid max-w-[65ch] gap-s7">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="font-display text-xl font-bold text-ink">{s.heading}</h2>
            <div className="mt-s2 grid gap-s3 text-md text-ink-secondary">{s.body}</div>
          </section>
        ))}
      </div>
    </article>
  );
}
