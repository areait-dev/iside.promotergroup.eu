/**
 * Controlli SEO in stile «semaforo» (verde = ok, arancione = migliorabile, rosso = da correggere).
 * Usato sia dal pannello (anteprima mentre si scrive) sia dall'elenco «Pagine».
 */
export type Livello = 0 | 1 | 2; // 0 rosso, 1 arancione, 2 verde
export type Controllo = { livello: Livello; titolo: string; dettaglio: string };

export type DatiSeo = { titolo: string; descrizione: string; parolaChiave: string; titoloPagina: string };

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
const contiene = (testo: string, chiave: string) => norm(testo).includes(norm(chiave));

export function controlli(d: DatiSeo): Controllo[] {
  const out: Controllo[] = [];
  const t = d.titolo.trim();
  const ds = d.descrizione.trim();
  const k = d.parolaChiave.trim();

  if (!t) out.push({ livello: 1, titolo: "Titolo per Google", dettaglio: "Non c'è: Google userà il titolo di partenza della pagina. Scrivine uno tuo (30–60 caratteri)." });
  else if (t.length >= 30 && t.length <= 60) out.push({ livello: 2, titolo: "Titolo per Google", dettaglio: `Lunghezza giusta (${t.length} caratteri).` });
  else if (t.length < 30) out.push({ livello: t.length >= 20 ? 1 : 0, titolo: "Titolo per Google", dettaglio: `Un po' corto (${t.length} caratteri): meglio 30–60.` });
  else out.push({ livello: t.length <= 70 ? 1 : 0, titolo: "Titolo per Google", dettaglio: `Troppo lungo (${t.length} caratteri): Google lo taglia, meglio 30–60.` });

  if (!ds) out.push({ livello: 0, titolo: "Descrizione per Google", dettaglio: "Manca: scrivi una frase di 120–160 caratteri che invogli a cliccare." });
  else if (ds.length >= 120 && ds.length <= 160) out.push({ livello: 2, titolo: "Descrizione per Google", dettaglio: `Lunghezza giusta (${ds.length} caratteri).` });
  else if (ds.length < 120) out.push({ livello: ds.length >= 70 ? 1 : 0, titolo: "Descrizione per Google", dettaglio: `Un po' corta (${ds.length} caratteri): meglio 120–160.` });
  else out.push({ livello: ds.length <= 170 ? 1 : 0, titolo: "Descrizione per Google", dettaglio: `Troppo lunga (${ds.length} caratteri): Google la taglia, meglio 120–160.` });

  if (!k) {
    out.push({ livello: 1, titolo: "Parola chiave", dettaglio: "Scegli la frase con cui vuoi essere trovato (es. «feste private Vittoria»): così controlliamo dove compare." });
  } else {
    out.push(
      contiene(t, k)
        ? { livello: 2, titolo: "Parola chiave nel titolo", dettaglio: "Compare nel titolo." }
        : { livello: 0, titolo: "Parola chiave nel titolo", dettaglio: `«${k}» non compare nel titolo.` },
    );
    out.push(
      contiene(ds, k)
        ? { livello: 2, titolo: "Parola chiave nella descrizione", dettaglio: "Compare nella descrizione." }
        : { livello: 1, titolo: "Parola chiave nella descrizione", dettaglio: `«${k}» non compare nella descrizione.` },
    );
    out.push(
      d.titoloPagina && contiene(d.titoloPagina, k)
        ? { livello: 2, titolo: "Parola chiave nel titolo della pagina", dettaglio: "Compare nel titolo grande in cima alla pagina." }
        : { livello: 1, titolo: "Parola chiave nel titolo della pagina", dettaglio: "Non compare nel titolo grande in cima alla pagina." },
    );
  }
  return out;
}

/** Il livello complessivo è quello del controllo peggiore, ma un solo arancione non basta a far scendere un verde. */
export function livelloGlobale(c: Controllo[]): Livello {
  if (c.some((x) => x.livello === 0)) return 0;
  const arancioni = c.filter((x) => x.livello === 1).length;
  return arancioni >= 2 ? 1 : 2;
}
