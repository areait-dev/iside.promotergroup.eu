import { Gutter } from "@payloadcms/ui";
import type { AdminViewServerProps } from "payload";

const STATI: Record<string, string> = {
  nuova: "Nuova",
  lavorazione: "In lavorazione",
  inviato: "Preventivo inviato",
  confermata: "Confermata",
  chiusa: "Chiusa",
};

const TIPI: Record<string, string> = { privati: "Evento privato", aziendali: "Evento aziendale" };

/** Le pagine e le impostazioni modificabili, per «Modificato di recente». */
const GLOBALI = [
  { slug: "home", titolo: "Home", href: "/admin/globals/home" },
  { slug: "eventi-privati", titolo: "Eventi privati", href: "/admin/globals/eventi-privati" },
  { slug: "eventi-aziendali", titolo: "Eventi aziendali", href: "/admin/globals/eventi-aziendali" },
  { slug: "cucina", titolo: "Cucina", href: "/admin/globals/cucina" },
  { slug: "area-living", titolo: "Area living", href: "/admin/globals/area-living" },
  { slug: "centro-congressi", titolo: "Centro congressi", href: "/admin/globals/centro-congressi" },
  { slug: "impostazioni", titolo: "Impostazioni del sito", href: "/admin/globals/impostazioni" },
  { slug: "testi", titolo: "Testi del sito", href: "/admin/globals/testi" },
  { slug: "menu", titolo: "Menu", href: "/admin/globals/menu" },
  { slug: "fascia-finale", titolo: "Fascia finale", href: "/admin/globals/fascia-finale" },
];

const AZIONI = [
  { testo: "Modifica la Home", href: "/admin/globals/home" },
  { testo: "Aggiungi una pagina", href: "/admin/collections/pagine/create" },
  { testo: "Carica una foto", href: "/admin/collections/media/create" },
  { testo: "Cambia il menu del sito", href: "/admin/globals/menu" },
  { testo: "Aggiorna contatti e orari", href: "/admin/globals/impostazioni" },
];

const RUOLI: Record<string, string> = { amministratore: "Amministratore", editor: "Editor" };

const s = (v: unknown) => (typeof v === "string" ? v : "");

const data = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString("it-IT", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "—";

type Utente = { id: string | number; nome?: string; email: string; ruolo?: string };

type Richiesta = { id: string | number; nome: string; tipo: string; dataEvento: string; ospiti?: number; stato: string; createdAt: string };

/** Bacheca: il punto di partenza del pannello, a riquadri come quella di WordPress. Menu e barra li aggiunge già Payload. */
export default async function BachecaView(props: AdminViewServerProps) {
  const { payload, user } = props.initPageResult.req;
  const admin = (user as { ruolo?: string } | null)?.ruolo === "amministratore";
  const nomeUtente = s((user as { nome?: string } | null)?.nome) || s((user as { email?: string } | null)?.email);

  const conta = async (collection: "richieste" | "media" | "pagine", where?: Record<string, unknown>) => {
    try {
      return (await payload.count({ collection: collection as "users", where: where as never })).totalDocs;
    } catch {
      return undefined;
    }
  };

  const [nuove, inCorso, foto, paginePannello] = await Promise.all([
    conta("richieste", { stato: { equals: "nuova" } }),
    conta("richieste", { stato: { in: ["lavorazione", "inviato"] } }),
    conta("media"),
    conta("pagine", { stato: { equals: "pubblicata" } }),
  ]);

  let ultime: Richiesta[] = [];
  try {
    const r = await payload.find({ collection: "richieste" as "users", sort: "-createdAt", limit: 6, depth: 0 });
    ultime = r.docs as unknown as Richiesta[];
  } catch {
    ultime = [];
  }

  // Gli utenti li gestisce solo l'amministratore
  let utenti: Utente[] = [];
  if (admin) {
    try {
      const r = await payload.find({ collection: "users", sort: "email", limit: 8, depth: 0 });
      utenti = r.docs as unknown as Utente[];
    } catch {
      utenti = [];
    }
  }

  const recenti = (
    await Promise.all(
      GLOBALI.map(async (g) => {
        try {
          const d = (await payload.findGlobal({ slug: g.slug as "home", depth: 0 })) as { updatedAt?: string; createdAt?: string };
          // Un global mai salvato ha solo i valori predefiniti: non ha una data di modifica vera.
          return d.createdAt && d.updatedAt ? { ...g, quando: d.updatedAt } : null;
        } catch {
          return null;
        }
      }),
    )
  )
    .filter((g): g is (typeof GLOBALI)[number] & { quando: string } => g !== null)
    .sort((a, b) => b.quando.localeCompare(a.quando))
    .slice(0, 5);

  const numero = (n: number | undefined) => (n === undefined ? "—" : n);
  const tessere = [
    { valore: nuove, etichetta: "Richieste nuove", href: "/admin/collections/richieste?where[stato][equals]=nuova", evidenza: (nuove ?? 0) > 0 },
    { valore: inCorso, etichetta: "Richieste in corso", href: "/admin/collections/richieste?where[stato][in]=lavorazione,inviato" },
    { valore: foto, etichetta: "Foto in libreria", href: "/admin/collections/media" },
    { valore: paginePannello, etichetta: "Pagine aggiunte dal pannello", href: "/admin/collections/pagine" },
  ];

  return (
      <Gutter>
        <div className="bacheca">
          <h1>Bacheca</h1>

          <section className="bacheca__benvenuto" aria-labelledby="bacheca-benvenuto">
            <h2 id="bacheca-benvenuto">Ciao{nomeUtente ? `, ${nomeUtente}` : ""}</h2>
            <p>Da qui gestisci il sito di Iside: testi, foto, menu e le richieste di preventivo che arrivano dai moduli.</p>
            <div className="bacheca__benvenuto-azioni">
              <a className="bacheca__bottone bacheca__bottone--primario" href="/admin/globals/home">
                Modifica la Home
              </a>
              <a className="bacheca__bottone" href="/" target="_blank" rel="noopener noreferrer">
                Visualizza il sito ↗
              </a>
            </div>
          </section>

          <ul className="bacheca__tessere" aria-label="A colpo d'occhio">
            {tessere.map((t) => (
              <li key={t.etichetta}>
                <a href={t.href} className={`bacheca__tessera${t.evidenza ? " bacheca__tessera--evidenza" : ""}`}>
                  <strong>{numero(t.valore)}</strong>
                  <span>{t.etichetta}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="bacheca__colonne">
            <section className="bacheca__box bacheca__box--largo" aria-labelledby="bacheca-richieste">
              <h2 id="bacheca-richieste">Ultime richieste</h2>
              {ultime.length === 0 ? (
                <p className="bacheca__vuoto">Nessuna richiesta ancora. Quando qualcuno compila il modulo del sito, la vedrai qui.</p>
              ) : (
                <table className="bacheca__tabella">
                  <thead>
                    <tr>
                      <th scope="col">Nome</th>
                      <th scope="col">Evento</th>
                      <th scope="col">Stato</th>
                      <th scope="col">Ricevuta il</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ultime.map((r) => (
                      <tr key={r.id}>
                        <td>
                          <a href={`/admin/collections/richieste/${r.id}`}>{r.nome}</a>
                        </td>
                        <td>
                          {TIPI[r.tipo] ?? "—"}
                          {(r.dataEvento || r.ospiti) && (
                            <span className="bacheca__nota">
                              {[r.dataEvento, r.ospiti ? `${r.ospiti} ospiti` : ""].filter(Boolean).join(" · ")}
                            </span>
                          )}
                        </td>
                        <td>
                          <span className={`stato-badge stato-badge--${r.stato}`}>{STATI[r.stato] ?? r.stato}</span>
                        </td>
                        <td>{data(r.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <p className="bacheca__piede">
                <a href="/admin/collections/richieste">Vedi tutte le richieste</a>
              </p>
            </section>

            <div className="bacheca__laterale">
              <section className="bacheca__box" aria-labelledby="bacheca-azioni">
                <h2 id="bacheca-azioni">Azioni rapide</h2>
                <ul className="bacheca__elenco">
                  {(admin ? [...AZIONI, { testo: "Aggiungi un utente", href: "/admin/collections/users/create" }] : AZIONI).map((a) => (
                    <li key={a.href}>
                      <a href={a.href}>{a.testo}</a>
                    </li>
                  ))}
                </ul>
              </section>

              {admin && (
                <section className="bacheca__box" aria-labelledby="bacheca-utenti">
                  <h2 id="bacheca-utenti">Utenti</h2>
                  <ul className="bacheca__elenco bacheca__utenti">
                    {utenti.map((u) => (
                      <li key={u.id}>
                        <a href={`/admin/collections/users/${u.id}`}>
                          {u.nome || u.email}
                          {u.nome && <span className="bacheca__nota"> {u.email}</span>}
                        </a>
                        <span className="stato-badge">{RUOLI[u.ruolo ?? ""] ?? "Editor"}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="bacheca__piede bacheca__piede--azioni">
                    <a className="bacheca__bottone bacheca__bottone--primario" href="/admin/collections/users/create">
                      Aggiungi utente
                    </a>
                    <a href="/admin/collections/users">Gestisci utenti</a>
                  </p>
                </section>
              )}

              <section className="bacheca__box" aria-labelledby="bacheca-recenti">
                <h2 id="bacheca-recenti">Modificato di recente</h2>
                {recenti.length === 0 ? (
                  <p className="bacheca__vuoto">Ancora nessuna modifica.</p>
                ) : (
                  <ul className="bacheca__elenco">
                    {recenti.map((g) => (
                      <li key={g.slug}>
                        <a href={g.href}>{g.titolo}</a>
                        <span className="bacheca__nota">{data(g.quando)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          </div>
        </div>
      </Gutter>
  );
}
