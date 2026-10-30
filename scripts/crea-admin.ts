// Crea (o reimposta) un utente amministratore direttamente sul database.
// Uso (PowerShell): $env:ADMIN_EMAIL="tu@dominio.it"; $env:ADMIN_PASSWORD="..."; npm run admin:crea
// Usa lo stesso DATABASE_URL del sito: così l'utente nasce nel database che il pannello legge davvero.
import config from "@payload-config";
import { getPayload } from "payload";

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password || password.length < 8) {
    throw new Error("Imposta ADMIN_EMAIL e ADMIN_PASSWORD (almeno 8 caratteri).");
  }

  (process.env as Record<string, string>).NODE_ENV = "production";
  const payload = await getPayload({ config });

  const { totalDocs: totale } = await payload.count({ collection: "users", overrideAccess: true });
  const { docs } = await payload.find({ collection: "users", where: { email: { equals: email } }, limit: 1, overrideAccess: true });
  payload.logger.info(`Utenti nel database: ${totale}`);

  if (docs[0]) {
    await payload.update({ collection: "users", id: docs[0].id, data: { password, ruolo: "amministratore" } as never, overrideAccess: true });
    payload.logger.info(`Password reimpostata per ${email}`);
  } else {
    await payload.create({ collection: "users", data: { email, password, ruolo: "amministratore" } as never, overrideAccess: true });
    payload.logger.info(`Amministratore creato: ${email}`);
  }
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
