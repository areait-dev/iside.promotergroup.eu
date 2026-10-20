import { emptyRequest, validate, type RequestData } from "@/lib/request";

/**
 * Riceve le richieste dei moduli (eventi privati e aziendali).
 * [DA DECIDERE] Per ora valida soltanto: la richiesta NON viene inoltrata a nessuna casella email o gestionale.
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
  return Response.json({ ok: true });
}
