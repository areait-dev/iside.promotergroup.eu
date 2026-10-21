// Carica testi e foto iniziali nel database (anche quello remoto, es. Turso). È idempotente:
// ogni sezione viene scritta solo se nel pannello non esiste ancora, quindi si può rilanciare senza rischi.
// Prima servono le tabelle: `npm run db:migrate`. Uso: npm run seed
import config from "@payload-config";
import { getPayload } from "payload";
import { seedSiteSettings } from "@/lib/seed";

async function main() {
  // In modalità production init non fa il push dello schema e applica le migrazioni mancanti.
  (process.env as Record<string, string>).NODE_ENV = "production";
  const payload = await getPayload({ config });
  // onInit ha già lanciato il seed; richiamarlo è innocuo e rende lo script esplicito.
  await seedSiteSettings(payload);
  payload.logger.info("Seed completato");
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
