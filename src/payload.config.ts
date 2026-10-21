import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { it } from "@payloadcms/translations/languages/it";
import fs from "fs";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { Media } from "./collections/Media";
import { Pagine } from "./collections/Pagine";
import { Richieste } from "./collections/Richieste";
import { Users } from "./collections/Users";
import { Home } from "./globals/Home";
import { AreaLiving, CentroCongressi, Cucina, EventiAziendali, EventiPrivati, FasciaFinale, Testi } from "./globals/pages";
import { Menu } from "./globals/Menu";
import { SiteSettings } from "./globals/SiteSettings";
import { migrations } from "./migrations";
import { migrations as migrationsPg } from "./migrations-pg";
import { seedSiteSettings } from "./lib/seed";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Su Vercel capita di incollare il valore con virgolette o spazi: li tolgo.
const DATABASE_URL = process.env.DATABASE_URL?.trim().replace(/^["']|["']$/g, "");
const usaPostgres = /^postgres(ql)?:\/\//.test(DATABASE_URL ?? "");
// Online un file SQLite locale sarebbe vuoto (disco effimero): meglio fermarsi che pubblicare pagine senza dati.
if (process.env.VERCEL && !usaPostgres && !process.env.DATABASE_URI) {
  throw new Error("Database non configurato: su Vercel imposta DATABASE_URL (Postgres/Supabase) oppure DATABASE_URI (Turso).");
}
// SQLite/libsql: file locale in sviluppo, Turso (libsql://…) online.
const DATABASE_URI = process.env.DATABASE_URI || "file:./data/payload.db";
const usaS3 = Boolean(process.env.S3_BUCKET && process.env.S3_ENDPOINT && process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY && process.env.S3_PUBLIC_URL);

// Il file SQLite locale vive in ./data: va creata prima del primo avvio (con Turso o Postgres non serve).
if (!usaPostgres && DATABASE_URI.startsWith("file:")) fs.mkdirSync(path.resolve(dirname, "../data"), { recursive: true });

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: { titleSuffix: " — Iside", icons: [{ rel: "icon", url: "/favicon.ico" }] },
    importMap: { baseDir: path.resolve(dirname) },
    theme: "light",
    components: {
      beforeNavLinks: ["/components/admin/NavPagine#default"],
      beforeDashboard: ["/components/admin/DashboardSezioni#default"],
      afterNavLinks: ["/components/admin/ViewSiteLink#default"],
      views: {
        pagine: { Component: "/components/admin/PagineView#default", path: "/pagine" },
        impostazioni: { Component: "/components/admin/ImpostazioniView#default", path: "/impostazioni" },
      },
      beforeLogin: ["/components/admin/LoginIntro#default"],
      afterLogin: ["/components/admin/BackToSite#default"],
      graphics: { Logo: "/components/admin/Logo#default", Icon: "/components/admin/Icon#default" },
    },
  },
  i18n: { supportedLanguages: { it }, fallbackLanguage: "it" },
  collections: [Pagine, Richieste, Media, Users],
  globals: [Home, EventiPrivati, EventiAziendali, Cucina, AreaLiving, CentroCongressi, FasciaFinale, SiteSettings, Testi, Menu],
  editor: lexicalEditor(),
  // Email di notifica: con le variabili SMTP_* parte davvero; senza, Payload la scrive nella console (utile in locale).
  ...(process.env.SMTP_HOST && {
    email: nodemailerAdapter({
      defaultFromAddress: process.env.EMAIL_FROM || "noreply@iside.promotergroup.eu",
      defaultFromName: "Iside",
      transportOptions: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT || 587) === 465,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      },
    }),
  }),
  secret: process.env.PAYLOAD_SECRET || "",
  // In locale un file SQLite; online Turso (DATABASE_URI + DATABASE_AUTH_TOKEN) con lo schema creato dalle migrazioni.
  // Con DATABASE_URL che inizia per postgres (Supabase) si usa invece Postgres.
  db: usaPostgres
    ? postgresAdapter({
        pool: { connectionString: DATABASE_URL, max: 3 },
        // Postgres ha le sue migrazioni (dialetto diverso da SQLite).
        migrationDir: path.resolve(process.cwd(), "src/migrations-pg"),
        prodMigrations: migrationsPg,
      })
    : sqliteAdapter({
        client: { url: DATABASE_URI, authToken: process.env.DATABASE_AUTH_TOKEN },
        prodMigrations: migrations,
      }),
  // Le foto vanno su Supabase Storage quando le variabili S3_* sono presenti; senza, restano nella cartella /media.
  plugins: usaS3
    ? [
        s3Storage({
          collections: {
            media: {
              disablePayloadAccessControl: true,
              generateFileURL: ({ filename, prefix }) => `${process.env.S3_PUBLIC_URL}/${[prefix, filename].filter(Boolean).join("/")}`,
            },
          },
          bucket: process.env.S3_BUCKET!,
          config: {
            endpoint: process.env.S3_ENDPOINT,
            region: process.env.S3_REGION || "eu-central-1",
            forcePathStyle: true,
            credentials: { accessKeyId: process.env.S3_ACCESS_KEY_ID!, secretAccessKey: process.env.S3_SECRET_ACCESS_KEY! },
          },
        }),
      ]
    : [],
  sharp,
  onInit: async (payload) => {
    // Durante `next build` lo schema può non esistere ancora e il seed non serve: ci pensa `npm run seed`.
    if (process.env.NEXT_PHASE === "phase-production-build") return;
    await seedSiteSettings(payload);
  },
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
});
