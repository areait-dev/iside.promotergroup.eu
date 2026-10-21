import config from "@payload-config";
import { getPayload } from "payload";
import { SITE } from "@/config/site";
import { emptyRequest, validate, type RequestData } from "@/lib/request";

const etichette = { privati: "Evento privato", aziendali: "Evento aziendale" } as const;

const riga = (k: string, v: string) => (v.trim() ? `${k}: ${v.trim()}\n` : "");

/** Testo dell'email di notifica: una riga per ogni dato compilato. */
function corpo(d: RequestData) {
  return (
    `Nuova richiesta di preventivo dal sito.\n\n` +
    riga("Tipo", etichette[d.kind]) +
    riga("Data dell'evento", d.data) +
    riga("Ospiti", d.ospiti) +
    riga("Occasione", d.occasione) +
    riga("Formato", d.formato) +
    riga("Nome", d.nome) +
    riga("Telefono", d.telefono) +
    riga("Email", d.email) +
    riga("Necessità tecniche", d.tecniche) +
    riga("Messaggio", d.messaggio) +
    `\nLa trovi nel pannello, in «Richieste di preventivo».\n`
  );
}

/**
 * Riceve le richieste dei moduli (eventi privati e aziendali): le valida, le salva nel pannello
 * («Richieste di preventivo») e manda una email di notifica agli indirizzi indicati nelle Impostazioni del sito.
 */
export async function POST(request: Request) {
  let body: RequestData;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Richiesta non valida." }, { status: 400 });
  }
  if (body.kind !== "privati" && body.kind !== "aziendali") {
    return Response.json({ ok: false, error: "Tipo di richiesta non valido." }, { status: 400 });
  }
  if (typeof body.sito === "string" && body.sito) return Response.json({ ok: true }); // honeypot: ignora in silenzio
  const full: RequestData = { ...emptyRequest(body.kind), ...body };
  let invalid = false;
  try {
    invalid = Object.keys(validate(full)).length > 0;
  } catch {
    invalid = true;
  }
  if (invalid) {
    return Response.json({ ok: false, error: "Controlla i campi del modulo." }, { status: 422 });
  }

  try {
    const payload = await getPayload({ config });
    await payload.create({
      collection: "richieste" as "users",
      data: {
        stato: "nuova",
        tipo: full.kind,
        dataEvento: full.data,
        ospiti: Number(full.ospiti),
        occasione: full.occasione,
        formato: full.formato,
        nome: full.nome.trim(),
        telefono: full.telefono.trim(),
        email: full.email.trim(),
        tecniche: full.tecniche.trim(),
        messaggio: full.messaggio.trim(),
        consenso: full.consenso === true,
        consensoIl: new Date().toISOString(),
      } as never,
    });

    // L'email è un di più: se non parte, la richiesta è comunque salvata e il cliente vede la conferma.
    try {
      const settings = (await payload.findGlobal({ slug: "impostazioni", depth: 0 })) as { emailRichieste?: string; email?: string };
      const to = (settings.emailRichieste || settings.email || SITE.email)
        .split(/[,;\s]+/)
        .map((a) => a.trim())
        .filter(Boolean);
      if (to.length) {
        await payload.sendEmail({
          to,
          ...(full.email.trim() && { replyTo: full.email.trim() }),
          subject: `Nuova richiesta di preventivo — ${full.nome.trim()} (${etichette[full.kind]})`,
          text: corpo(full),
        });
      }
    } catch (err) {
      console.error("[iside] richiesta salvata ma email di notifica non inviata", err);
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[iside] richiesta non salvata", err);
    return Response.json({ ok: false, error: "Non siamo riusciti a registrare la richiesta." }, { status: 500 });
  }
}
