import Link from "next/link";

const SEZIONI = [
  { titolo: "Pagine", testo: "Tutte le pagine del sito, con il semaforo SEO.", href: "/admin/pagine" },
  { titolo: "Foto", testo: "La libreria delle foto.", href: "/admin/collections/media" },
  { titolo: "Richieste", testo: "I preventivi arrivati dai moduli.", href: "/admin/collections/richieste" },
  { titolo: "Impostazioni", testo: "Contatti, menu, testi ricorrenti e privacy.", href: "/admin/impostazioni" },
];

/** Prima schermata del pannello: le sezioni come grandi pulsanti. */
export default function DashboardSezioni() {
  return (
    <div className="dashboard-sezioni">
      {SEZIONI.map((s) => (
        <Link key={s.href} href={s.href}>
          <strong>{s.titolo}</strong>
          <span>{s.testo}</span>
        </Link>
      ))}
    </div>
  );
}
