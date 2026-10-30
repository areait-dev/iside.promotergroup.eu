// Migrazioni del database (equivale a `payload migrate` e `payload migrate:create`).
// Uso: npm run db:migrate · npm run db:migrate:create -- nome
import config from "@payload-config";
import payload from "payload";
import { migrations as migrationsSqlite } from "@/migrations";
import { migrations as migrationsPg } from "@/migrations-pg";

const [command = "migrate", name] = process.argv.slice(2);

async function main() {
  process.env.PAYLOAD_MIGRATING = "true";
  // Istanza minima, come fa la CLI: niente onInit (quindi niente seed) e niente push dello schema.
  await payload.init({ config, disableOnInit: true, disableDBConnect: command === "migrate:create" });

  switch (command) {
    case "migrate":
      // Se il DB è stato sincronizzato in modalità dev (riga batch -1), Payload chiederebbe conferma: su Vercel nessuno può rispondere.
      if (!process.stdin.isTTY) {
        const dev = await payload
          .find({ collection: "payload-migrations" as never, where: { batch: { equals: -1 } }, limit: 1, depth: 0 })
          .catch(() => null);
        if (dev?.docs.length) {
          throw new Error(
            "Il database contiene una sincronizzazione in modalità dev (payload_migrations con batch = -1). Ripulisci quella riga o il database prima di migrare.",
          );
        }
      }
      // Si passano le migrazioni già importate: la CLI le rileggerebbe dai file .ts, che Node da solo non carica.
      await payload.db.migrate({ migrations: (/^postgres(ql)?:/.test(process.env.DATABASE_URL ?? "") ? migrationsPg : migrationsSqlite) as never });
      break;
    case "migrate:create":
      await payload.db.createMigration({ migrationName: name, payload, forceAcceptWarning: true } as never);
      break;
    default:
      throw new Error(`Comando sconosciuto: ${command} (migrate, migrate:create)`);
  }
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
