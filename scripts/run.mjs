// Esegue uno script TypeScript del progetto: lo compila con esbuild (stessi alias del tsconfig) e lo lancia con Node.
// Non usa la CLI `payload` perché il suo loader (tsx) va in crash con undici ("Illegal constructor").
// Uso: node scripts/run.mjs scripts/db.ts migrate
import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { basename, resolve } from "node:path";
import { build } from "esbuild";

const [entry, ...args] = process.argv.slice(2);
if (!entry) {
  console.error("Uso: node scripts/run.mjs <script.ts> [argomenti]");
  process.exit(1);
}

// Dentro node_modules, così Node trova i pacchetti esterni (non incorporati nel bundle).
const outDir = resolve("node_modules/.cache/iside-scripts");
mkdirSync(outDir, { recursive: true });
const outfile = resolve(outDir, `${basename(entry).replace(/\.\w+$/, "")}.mjs`);

await build({
  entryPoints: [entry],
  outfile,
  bundle: true,
  packages: "external",
  platform: "node",
  format: "esm",
  tsconfig: "tsconfig.json",
  jsx: "automatic",
  logLevel: "warning",
  // Le subpath di next senza estensione non si risolvono da Node ESM.
  alias: {
    "next/cache": "next/cache.js",
    "next/headers": "next/headers.js",
    "next/server": "next/server.js",
    "next/navigation": "next/navigation.js",
  },
  loader: { ".css": "empty", ".scss": "empty" },
});

// Le migrazioni vanno sul Session pooler (porta 5432) se DATABASE_URL_MIGRATE è impostata; l'app usa sempre DATABASE_URL.
const env = { ...process.env };
if (args[0] === "migrate" && env.DATABASE_URL_MIGRATE) env.DATABASE_URL = env.DATABASE_URL_MIGRATE;

const { status } = spawnSync(process.execPath, [outfile, ...args], { stdio: "inherit", env });
process.exit(status ?? 1);
