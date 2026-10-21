import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pagine_blocks_foto_testo_lato" AS ENUM('destra', 'sinistra');
  CREATE TYPE "public"."enum_pagine_stato" AS ENUM('bozza', 'pubblicata');
  CREATE TYPE "public"."enum_richieste_stato" AS ENUM('nuova', 'lavorazione', 'inviato', 'confermata', 'chiusa');
  CREATE TYPE "public"."enum_richieste_tipo" AS ENUM('privati', 'aziendali');
  CREATE TYPE "public"."enum_users_ruolo" AS ENUM('amministratore', 'editor');
  CREATE TYPE "public"."enum_area_living_galleria_formato" AS ENUM('largo', 'alto', 'meta', 'intera');
  CREATE TYPE "public"."enum__area_living_v_version_galleria_formato" AS ENUM('largo', 'alto', 'meta', 'intera');
  CREATE TYPE "public"."enum_centro_congressi_galleria_formato" AS ENUM('largo', 'alto', 'meta', 'intera');
  CREATE TYPE "public"."enum__centro_congressi_v_version_galleria_formato" AS ENUM('largo', 'alto', 'meta', 'intera');
  CREATE TYPE "public"."enum_impostazioni_orari_strutturati_giorni" AS ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
  CREATE TABLE "pagine_blocks_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titolo" varchar,
  	"contenuto" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pagine_blocks_foto_testo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titolo" varchar,
  	"testo" varchar,
  	"foto_id" integer NOT NULL,
  	"lato" "enum_pagine_blocks_foto_testo_lato" DEFAULT 'destra',
  	"link_testo" varchar,
  	"link_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pagine_blocks_schede_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titolo" varchar NOT NULL,
  	"testo" varchar
  );
  
  CREATE TABLE "pagine_blocks_schede" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titolo" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pagine_blocks_galleria_immagini" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"foto_id" integer NOT NULL
  );
  
  CREATE TABLE "pagine_blocks_galleria" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titolo" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pagine_blocks_fascia" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titolo" varchar NOT NULL,
  	"testo" varchar,
  	"pulsante" varchar,
  	"href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pagine" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"stato" "enum_pagine_stato" DEFAULT 'bozza' NOT NULL,
  	"slug" varchar NOT NULL,
  	"titolo" varchar NOT NULL,
  	"foto_id" integer,
  	"introduzione" varchar,
  	"seo_parola_chiave" varchar,
  	"seo_titolo" varchar,
  	"seo_descrizione" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "richieste" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"stato" "enum_richieste_stato" DEFAULT 'nuova' NOT NULL,
  	"note_interne" varchar,
  	"tipo" "enum_richieste_tipo",
  	"data_evento" varchar,
  	"ospiti" numeric,
  	"occasione" varchar,
  	"formato" varchar,
  	"nome" varchar NOT NULL,
  	"telefono" varchar,
  	"email" varchar,
  	"tecniche" varchar,
  	"messaggio" varchar,
  	"consenso" boolean,
  	"consenso_il" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_miniatura_url" varchar,
  	"sizes_miniatura_width" numeric,
  	"sizes_miniatura_height" numeric,
  	"sizes_miniatura_mime_type" varchar,
  	"sizes_miniatura_filesize" numeric,
  	"sizes_miniatura_filename" varchar,
  	"sizes_grande_url" varchar,
  	"sizes_grande_width" numeric,
  	"sizes_grande_height" numeric,
  	"sizes_grande_mime_type" varchar,
  	"sizes_grande_filesize" numeric,
  	"sizes_grande_filename" varchar
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nome" varchar,
  	"ruolo" "enum_users_ruolo" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pagine_id" integer,
  	"richieste_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_titolo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testo" varchar NOT NULL
  );
  
  CREATE TABLE "home_schede" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titolo" varchar NOT NULL,
  	"testo" varchar,
  	"link" varchar NOT NULL,
  	"foto_id" integer NOT NULL
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"riga_marchio" varchar,
  	"introduzione" varchar,
  	"cta_privati_testo" varchar,
  	"cta_privati_link" varchar,
  	"cta_aziende_testo" varchar,
  	"cta_aziende_link" varchar,
  	"titolo_spazi" varchar,
  	"seo_parola_chiave" varchar,
  	"seo_titolo" varchar,
  	"seo_descrizione" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_home_v_version_titolo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testo" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_schede" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titolo" varchar NOT NULL,
  	"testo" varchar,
  	"link" varchar NOT NULL,
  	"foto_id" integer NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_riga_marchio" varchar,
  	"version_introduzione" varchar,
  	"version_cta_privati_testo" varchar,
  	"version_cta_privati_link" varchar,
  	"version_cta_aziende_testo" varchar,
  	"version_cta_aziende_link" varchar,
  	"version_titolo_spazi" varchar,
  	"version_seo_parola_chiave" varchar,
  	"version_seo_titolo" varchar,
  	"version_seo_descrizione" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "eventi_privati_intro_titolo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testo" varchar NOT NULL
  );
  
  CREATE TABLE "eventi_privati_punti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titolo" varchar NOT NULL,
  	"testo" varchar
  );
  
  CREATE TABLE "eventi_privati_servizi_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titolo" varchar NOT NULL,
  	"testo" varchar
  );
  
  CREATE TABLE "eventi_privati_galleria" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"foto_id" integer NOT NULL
  );
  
  CREATE TABLE "eventi_privati" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_titolo" varchar,
  	"hero_foto_id" integer,
  	"link_area_testo" varchar,
  	"link_area_href" varchar,
  	"serate_titolo" varchar,
  	"serate_testo" varchar,
  	"servizi_titolo" varchar,
  	"richiesta_titolo" varchar,
  	"richiesta_testo" varchar,
  	"seo_parola_chiave" varchar,
  	"seo_titolo" varchar,
  	"seo_descrizione" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_eventi_privati_v_version_intro_titolo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testo" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_eventi_privati_v_version_punti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titolo" varchar NOT NULL,
  	"testo" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_eventi_privati_v_version_servizi_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titolo" varchar NOT NULL,
  	"testo" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_eventi_privati_v_version_galleria" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"foto_id" integer NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_eventi_privati_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_titolo" varchar,
  	"version_hero_foto_id" integer,
  	"version_link_area_testo" varchar,
  	"version_link_area_href" varchar,
  	"version_serate_titolo" varchar,
  	"version_serate_testo" varchar,
  	"version_servizi_titolo" varchar,
  	"version_richiesta_titolo" varchar,
  	"version_richiesta_testo" varchar,
  	"version_seo_parola_chiave" varchar,
  	"version_seo_titolo" varchar,
  	"version_seo_descrizione" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "eventi_aziendali_intro_titolo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testo" varchar NOT NULL
  );
  
  CREATE TABLE "eventi_aziendali_offerte" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titolo" varchar NOT NULL,
  	"testo" varchar,
  	"link_testo" varchar,
  	"link_href" varchar
  );
  
  CREATE TABLE "eventi_aziendali_galleria" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"foto_id" integer NOT NULL
  );
  
  CREATE TABLE "eventi_aziendali" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_titolo" varchar,
  	"hero_foto_id" integer,
  	"eventi_titolo" varchar,
  	"eventi_testo" varchar,
  	"richiesta_titolo" varchar,
  	"richiesta_testo" varchar,
  	"seo_parola_chiave" varchar,
  	"seo_titolo" varchar,
  	"seo_descrizione" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_eventi_aziendali_v_version_intro_titolo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testo" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_eventi_aziendali_v_version_offerte" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titolo" varchar NOT NULL,
  	"testo" varchar,
  	"link_testo" varchar,
  	"link_href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_eventi_aziendali_v_version_galleria" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"foto_id" integer NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_eventi_aziendali_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_titolo" varchar,
  	"version_hero_foto_id" integer,
  	"version_eventi_titolo" varchar,
  	"version_eventi_testo" varchar,
  	"version_richiesta_titolo" varchar,
  	"version_richiesta_testo" varchar,
  	"version_seo_parola_chiave" varchar,
  	"version_seo_titolo" varchar,
  	"version_seo_descrizione" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cucina_intro_titolo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testo" varchar NOT NULL
  );
  
  CREATE TABLE "cucina_momenti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titolo" varchar NOT NULL,
  	"lead" varchar,
  	"testo" varchar,
  	"orari" varchar,
  	"menu_link" varchar,
  	"menu_testo" varchar
  );
  
  CREATE TABLE "cucina" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_titolo" varchar,
  	"hero_foto_id" integer,
  	"hero_foto2_id" integer,
  	"intro_testo" varchar,
  	"tavolo_titolo" varchar,
  	"tavolo_testo" varchar,
  	"tavolo_etichetta_chiama" varchar,
  	"tavolo_etichetta_preventivo" varchar,
  	"seo_parola_chiave" varchar,
  	"seo_titolo" varchar,
  	"seo_descrizione" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_cucina_v_version_intro_titolo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testo" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_cucina_v_version_momenti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titolo" varchar NOT NULL,
  	"lead" varchar,
  	"testo" varchar,
  	"orari" varchar,
  	"menu_link" varchar,
  	"menu_testo" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_cucina_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_titolo" varchar,
  	"version_hero_foto_id" integer,
  	"version_hero_foto2_id" integer,
  	"version_intro_testo" varchar,
  	"version_tavolo_titolo" varchar,
  	"version_tavolo_testo" varchar,
  	"version_tavolo_etichetta_chiama" varchar,
  	"version_tavolo_etichetta_preventivo" varchar,
  	"version_seo_parola_chiave" varchar,
  	"version_seo_titolo" varchar,
  	"version_seo_descrizione" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "area_living_intro_titolo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testo" varchar NOT NULL
  );
  
  CREATE TABLE "area_living_spazi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titolo" varchar NOT NULL,
  	"testo" varchar
  );
  
  CREATE TABLE "area_living_galleria" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"foto_id" integer NOT NULL,
  	"formato" "enum_area_living_galleria_formato" DEFAULT 'meta'
  );
  
  CREATE TABLE "area_living" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_titolo" varchar,
  	"hero_foto_id" integer,
  	"intro_testo" varchar,
  	"servizi_testo" varchar,
  	"seo_parola_chiave" varchar,
  	"seo_titolo" varchar,
  	"seo_descrizione" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_area_living_v_version_intro_titolo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testo" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_area_living_v_version_spazi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titolo" varchar NOT NULL,
  	"testo" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_area_living_v_version_galleria" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"foto_id" integer NOT NULL,
  	"formato" "enum__area_living_v_version_galleria_formato" DEFAULT 'meta',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_area_living_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_titolo" varchar,
  	"version_hero_foto_id" integer,
  	"version_intro_testo" varchar,
  	"version_servizi_testo" varchar,
  	"version_seo_parola_chiave" varchar,
  	"version_seo_titolo" varchar,
  	"version_seo_descrizione" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "centro_congressi_intro_titolo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testo" varchar NOT NULL
  );
  
  CREATE TABLE "centro_congressi_scheda_allestimenti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nome" varchar NOT NULL,
  	"posti" varchar NOT NULL
  );
  
  CREATE TABLE "centro_congressi_scheda_attrezzature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nome" varchar NOT NULL,
  	"dettaglio" varchar NOT NULL
  );
  
  CREATE TABLE "centro_congressi_galleria" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"foto_id" integer NOT NULL,
  	"formato" "enum_centro_congressi_galleria_formato" DEFAULT 'meta'
  );
  
  CREATE TABLE "centro_congressi" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_titolo" varchar,
  	"hero_foto_id" integer,
  	"intro_testo" varchar,
  	"scheda_accessibilita" varchar,
  	"scheda_parcheggio" varchar,
  	"scheda_pdf" varchar,
  	"richiesta_titolo" varchar,
  	"richiesta_testo" varchar,
  	"seo_parola_chiave" varchar,
  	"seo_titolo" varchar,
  	"seo_descrizione" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_centro_congressi_v_version_intro_titolo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testo" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_centro_congressi_v_version_scheda_allestimenti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"nome" varchar NOT NULL,
  	"posti" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_centro_congressi_v_version_scheda_attrezzature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"nome" varchar NOT NULL,
  	"dettaglio" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_centro_congressi_v_version_galleria" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"foto_id" integer NOT NULL,
  	"formato" "enum__centro_congressi_v_version_galleria_formato" DEFAULT 'meta',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_centro_congressi_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_titolo" varchar,
  	"version_hero_foto_id" integer,
  	"version_intro_testo" varchar,
  	"version_scheda_accessibilita" varchar,
  	"version_scheda_parcheggio" varchar,
  	"version_scheda_pdf" varchar,
  	"version_richiesta_titolo" varchar,
  	"version_richiesta_testo" varchar,
  	"version_seo_parola_chiave" varchar,
  	"version_seo_titolo" varchar,
  	"version_seo_descrizione" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "fascia_finale" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titolo" varchar,
  	"testo" varchar,
  	"etichetta_chiama" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_fascia_finale_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_titolo" varchar,
  	"version_testo" varchar,
  	"version_etichetta_chiama" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "impostazioni_orari_strutturati_giorni" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_impostazioni_orari_strutturati_giorni",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "impostazioni_orari_strutturati" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"apre" varchar NOT NULL,
  	"chiude" varchar NOT NULL
  );
  
  CREATE TABLE "impostazioni" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"telefono" varchar,
  	"email" varchar,
  	"whatsapp" varchar,
  	"tempi_risposta" varchar,
  	"email_richieste" varchar,
  	"via" varchar,
  	"cap" varchar,
  	"comune" varchar,
  	"provincia" varchar,
  	"orari" varchar,
  	"maps_link" varchar,
  	"maps_embed" varchar,
  	"latitudine" varchar,
  	"longitudine" varchar,
  	"instagram" varchar,
  	"facebook" varchar,
  	"linkedin" varchar,
  	"titolare" varchar,
  	"indirizzo_titolare" varchar,
  	"email_privacy" varchar,
  	"telefono_privacy" varchar,
  	"conservazione" varchar,
  	"destinatari" varchar,
  	"aggiornato_il" varchar,
  	"tagline" varchar,
  	"descrizione" varchar,
  	"ragione_sociale" varchar,
  	"gestore" varchar,
  	"partita_iva" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "testi_per_pagina" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"percorso" varchar NOT NULL,
  	"testo" varchar NOT NULL,
  	"breve" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "testi_modulo_occasioni" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testo" varchar NOT NULL
  );
  
  CREATE TABLE "testi_modulo_formati" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testo" varchar NOT NULL
  );
  
  CREATE TABLE "testi" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"pulsanti_preventivo" varchar,
  	"pulsanti_preventivo_breve" varchar,
  	"pulsanti_chiama" varchar,
  	"pulsanti_whatsapp" varchar,
  	"navigazione_home" varchar,
  	"footer_titolo_sito" varchar,
  	"footer_titolo_social" varchar,
  	"footer_servizio_di" varchar,
  	"footer_etichetta_partita_iva" varchar,
  	"footer_privacy" varchar,
  	"footer_cookie" varchar,
  	"contatti_titolo" varchar,
  	"contatti_telefono" varchar,
  	"contatti_email" varchar,
  	"contatti_dove_siamo" varchar,
  	"contatti_zona" varchar,
  	"contatti_orari" varchar,
  	"contatti_apri_mappa" varchar,
  	"contatti_preferisci" varchar,
  	"pagina404_errore" varchar,
  	"pagina404_titolo" varchar,
  	"pagina404_testo" varchar,
  	"preventivo_testo" varchar,
  	"preventivo_scegli" varchar,
  	"preventivo_privato" varchar,
  	"preventivo_aziendale" varchar,
  	"preventivo_vuoto" varchar,
  	"modulo_legend_occasione" varchar,
  	"modulo_legend_formato" varchar,
  	"modulo_facoltativo" varchar,
  	"modulo_data" varchar,
  	"modulo_ospiti" varchar,
  	"modulo_nome" varchar,
  	"modulo_contatti" varchar,
  	"modulo_contatti_nota" varchar,
  	"modulo_telefono" varchar,
  	"modulo_email" varchar,
  	"modulo_tecniche" varchar,
  	"modulo_messaggio" varchar,
  	"modulo_consenso_inizio" varchar,
  	"modulo_consenso_link" varchar,
  	"modulo_consenso_fine" varchar,
  	"modulo_invia" varchar,
  	"modulo_invio" varchar,
  	"modulo_grazie" varchar,
  	"modulo_ricevuta" varchar,
  	"modulo_conferma" varchar,
  	"modulo_errore_invio" varchar,
  	"modulo_avviso_privati" varchar,
  	"modulo_avviso_aziendali" varchar,
  	"modulo_riepilogo_data" varchar,
  	"modulo_riepilogo_ospiti" varchar,
  	"modulo_riepilogo_occasione" varchar,
  	"modulo_riepilogo_formato" varchar,
  	"modulo_riepilogo_nome" varchar,
  	"modulo_riepilogo_telefono" varchar,
  	"modulo_riepilogo_email" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_testi_v_version_per_pagina" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"percorso" varchar NOT NULL,
  	"testo" varchar NOT NULL,
  	"breve" varchar NOT NULL,
  	"link" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_testi_v_version_modulo_occasioni" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testo" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_testi_v_version_modulo_formati" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testo" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_testi_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_pulsanti_preventivo" varchar,
  	"version_pulsanti_preventivo_breve" varchar,
  	"version_pulsanti_chiama" varchar,
  	"version_pulsanti_whatsapp" varchar,
  	"version_navigazione_home" varchar,
  	"version_footer_titolo_sito" varchar,
  	"version_footer_titolo_social" varchar,
  	"version_footer_servizio_di" varchar,
  	"version_footer_etichetta_partita_iva" varchar,
  	"version_footer_privacy" varchar,
  	"version_footer_cookie" varchar,
  	"version_contatti_titolo" varchar,
  	"version_contatti_telefono" varchar,
  	"version_contatti_email" varchar,
  	"version_contatti_dove_siamo" varchar,
  	"version_contatti_zona" varchar,
  	"version_contatti_orari" varchar,
  	"version_contatti_apri_mappa" varchar,
  	"version_contatti_preferisci" varchar,
  	"version_pagina404_errore" varchar,
  	"version_pagina404_titolo" varchar,
  	"version_pagina404_testo" varchar,
  	"version_preventivo_testo" varchar,
  	"version_preventivo_scegli" varchar,
  	"version_preventivo_privato" varchar,
  	"version_preventivo_aziendale" varchar,
  	"version_preventivo_vuoto" varchar,
  	"version_modulo_legend_occasione" varchar,
  	"version_modulo_legend_formato" varchar,
  	"version_modulo_facoltativo" varchar,
  	"version_modulo_data" varchar,
  	"version_modulo_ospiti" varchar,
  	"version_modulo_nome" varchar,
  	"version_modulo_contatti" varchar,
  	"version_modulo_contatti_nota" varchar,
  	"version_modulo_telefono" varchar,
  	"version_modulo_email" varchar,
  	"version_modulo_tecniche" varchar,
  	"version_modulo_messaggio" varchar,
  	"version_modulo_consenso_inizio" varchar,
  	"version_modulo_consenso_link" varchar,
  	"version_modulo_consenso_fine" varchar,
  	"version_modulo_invia" varchar,
  	"version_modulo_invio" varchar,
  	"version_modulo_grazie" varchar,
  	"version_modulo_ricevuta" varchar,
  	"version_modulo_conferma" varchar,
  	"version_modulo_errore_invio" varchar,
  	"version_modulo_avviso_privati" varchar,
  	"version_modulo_avviso_aziendali" varchar,
  	"version_modulo_riepilogo_data" varchar,
  	"version_modulo_riepilogo_ospiti" varchar,
  	"version_modulo_riepilogo_occasione" varchar,
  	"version_modulo_riepilogo_formato" varchar,
  	"version_modulo_riepilogo_nome" varchar,
  	"version_modulo_riepilogo_telefono" varchar,
  	"version_modulo_riepilogo_email" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "menu_voci" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"etichetta" varchar NOT NULL,
  	"indirizzo" varchar NOT NULL
  );
  
  CREATE TABLE "menu" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pagine_blocks_testo" ADD CONSTRAINT "pagine_blocks_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_blocks_foto_testo" ADD CONSTRAINT "pagine_blocks_foto_testo_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagine_blocks_foto_testo" ADD CONSTRAINT "pagine_blocks_foto_testo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_blocks_schede_voci" ADD CONSTRAINT "pagine_blocks_schede_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_blocks_schede"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_blocks_schede" ADD CONSTRAINT "pagine_blocks_schede_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_blocks_galleria_immagini" ADD CONSTRAINT "pagine_blocks_galleria_immagini_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagine_blocks_galleria_immagini" ADD CONSTRAINT "pagine_blocks_galleria_immagini_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine_blocks_galleria"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_blocks_galleria" ADD CONSTRAINT "pagine_blocks_galleria_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine_blocks_fascia" ADD CONSTRAINT "pagine_blocks_fascia_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagine"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagine" ADD CONSTRAINT "pagine_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pagine_fk" FOREIGN KEY ("pagine_id") REFERENCES "public"."pagine"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_richieste_fk" FOREIGN KEY ("richieste_id") REFERENCES "public"."richieste"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_titolo" ADD CONSTRAINT "home_titolo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_schede" ADD CONSTRAINT "home_schede_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_schede" ADD CONSTRAINT "home_schede_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_titolo" ADD CONSTRAINT "_home_v_version_titolo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_schede" ADD CONSTRAINT "_home_v_version_schede_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_version_schede" ADD CONSTRAINT "_home_v_version_schede_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "eventi_privati_intro_titolo" ADD CONSTRAINT "eventi_privati_intro_titolo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."eventi_privati"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "eventi_privati_punti" ADD CONSTRAINT "eventi_privati_punti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."eventi_privati"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "eventi_privati_servizi_voci" ADD CONSTRAINT "eventi_privati_servizi_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."eventi_privati"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "eventi_privati_galleria" ADD CONSTRAINT "eventi_privati_galleria_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "eventi_privati_galleria" ADD CONSTRAINT "eventi_privati_galleria_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."eventi_privati"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "eventi_privati" ADD CONSTRAINT "eventi_privati_hero_foto_id_media_id_fk" FOREIGN KEY ("hero_foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_eventi_privati_v_version_intro_titolo" ADD CONSTRAINT "_eventi_privati_v_version_intro_titolo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_eventi_privati_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_eventi_privati_v_version_punti" ADD CONSTRAINT "_eventi_privati_v_version_punti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_eventi_privati_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_eventi_privati_v_version_servizi_voci" ADD CONSTRAINT "_eventi_privati_v_version_servizi_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_eventi_privati_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_eventi_privati_v_version_galleria" ADD CONSTRAINT "_eventi_privati_v_version_galleria_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_eventi_privati_v_version_galleria" ADD CONSTRAINT "_eventi_privati_v_version_galleria_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_eventi_privati_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_eventi_privati_v" ADD CONSTRAINT "_eventi_privati_v_version_hero_foto_id_media_id_fk" FOREIGN KEY ("version_hero_foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "eventi_aziendali_intro_titolo" ADD CONSTRAINT "eventi_aziendali_intro_titolo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."eventi_aziendali"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "eventi_aziendali_offerte" ADD CONSTRAINT "eventi_aziendali_offerte_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."eventi_aziendali"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "eventi_aziendali_galleria" ADD CONSTRAINT "eventi_aziendali_galleria_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "eventi_aziendali_galleria" ADD CONSTRAINT "eventi_aziendali_galleria_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."eventi_aziendali"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "eventi_aziendali" ADD CONSTRAINT "eventi_aziendali_hero_foto_id_media_id_fk" FOREIGN KEY ("hero_foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_eventi_aziendali_v_version_intro_titolo" ADD CONSTRAINT "_eventi_aziendali_v_version_intro_titolo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_eventi_aziendali_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_eventi_aziendali_v_version_offerte" ADD CONSTRAINT "_eventi_aziendali_v_version_offerte_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_eventi_aziendali_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_eventi_aziendali_v_version_galleria" ADD CONSTRAINT "_eventi_aziendali_v_version_galleria_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_eventi_aziendali_v_version_galleria" ADD CONSTRAINT "_eventi_aziendali_v_version_galleria_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_eventi_aziendali_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_eventi_aziendali_v" ADD CONSTRAINT "_eventi_aziendali_v_version_hero_foto_id_media_id_fk" FOREIGN KEY ("version_hero_foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cucina_intro_titolo" ADD CONSTRAINT "cucina_intro_titolo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cucina"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cucina_momenti" ADD CONSTRAINT "cucina_momenti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cucina"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cucina" ADD CONSTRAINT "cucina_hero_foto_id_media_id_fk" FOREIGN KEY ("hero_foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cucina" ADD CONSTRAINT "cucina_hero_foto2_id_media_id_fk" FOREIGN KEY ("hero_foto2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_cucina_v_version_intro_titolo" ADD CONSTRAINT "_cucina_v_version_intro_titolo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_cucina_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cucina_v_version_momenti" ADD CONSTRAINT "_cucina_v_version_momenti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_cucina_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cucina_v" ADD CONSTRAINT "_cucina_v_version_hero_foto_id_media_id_fk" FOREIGN KEY ("version_hero_foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_cucina_v" ADD CONSTRAINT "_cucina_v_version_hero_foto2_id_media_id_fk" FOREIGN KEY ("version_hero_foto2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "area_living_intro_titolo" ADD CONSTRAINT "area_living_intro_titolo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."area_living"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "area_living_spazi" ADD CONSTRAINT "area_living_spazi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."area_living"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "area_living_galleria" ADD CONSTRAINT "area_living_galleria_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "area_living_galleria" ADD CONSTRAINT "area_living_galleria_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."area_living"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "area_living" ADD CONSTRAINT "area_living_hero_foto_id_media_id_fk" FOREIGN KEY ("hero_foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_area_living_v_version_intro_titolo" ADD CONSTRAINT "_area_living_v_version_intro_titolo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_area_living_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_area_living_v_version_spazi" ADD CONSTRAINT "_area_living_v_version_spazi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_area_living_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_area_living_v_version_galleria" ADD CONSTRAINT "_area_living_v_version_galleria_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_area_living_v_version_galleria" ADD CONSTRAINT "_area_living_v_version_galleria_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_area_living_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_area_living_v" ADD CONSTRAINT "_area_living_v_version_hero_foto_id_media_id_fk" FOREIGN KEY ("version_hero_foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "centro_congressi_intro_titolo" ADD CONSTRAINT "centro_congressi_intro_titolo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."centro_congressi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "centro_congressi_scheda_allestimenti" ADD CONSTRAINT "centro_congressi_scheda_allestimenti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."centro_congressi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "centro_congressi_scheda_attrezzature" ADD CONSTRAINT "centro_congressi_scheda_attrezzature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."centro_congressi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "centro_congressi_galleria" ADD CONSTRAINT "centro_congressi_galleria_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "centro_congressi_galleria" ADD CONSTRAINT "centro_congressi_galleria_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."centro_congressi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "centro_congressi" ADD CONSTRAINT "centro_congressi_hero_foto_id_media_id_fk" FOREIGN KEY ("hero_foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_centro_congressi_v_version_intro_titolo" ADD CONSTRAINT "_centro_congressi_v_version_intro_titolo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_centro_congressi_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_centro_congressi_v_version_scheda_allestimenti" ADD CONSTRAINT "_centro_congressi_v_version_scheda_allestimenti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_centro_congressi_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_centro_congressi_v_version_scheda_attrezzature" ADD CONSTRAINT "_centro_congressi_v_version_scheda_attrezzature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_centro_congressi_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_centro_congressi_v_version_galleria" ADD CONSTRAINT "_centro_congressi_v_version_galleria_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_centro_congressi_v_version_galleria" ADD CONSTRAINT "_centro_congressi_v_version_galleria_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_centro_congressi_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_centro_congressi_v" ADD CONSTRAINT "_centro_congressi_v_version_hero_foto_id_media_id_fk" FOREIGN KEY ("version_hero_foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "impostazioni_orari_strutturati_giorni" ADD CONSTRAINT "impostazioni_orari_strutturati_giorni_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."impostazioni_orari_strutturati"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impostazioni_orari_strutturati" ADD CONSTRAINT "impostazioni_orari_strutturati_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impostazioni"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testi_per_pagina" ADD CONSTRAINT "testi_per_pagina_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testi_modulo_occasioni" ADD CONSTRAINT "testi_modulo_occasioni_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testi_modulo_formati" ADD CONSTRAINT "testi_modulo_formati_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_testi_v_version_per_pagina" ADD CONSTRAINT "_testi_v_version_per_pagina_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_testi_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_testi_v_version_modulo_occasioni" ADD CONSTRAINT "_testi_v_version_modulo_occasioni_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_testi_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_testi_v_version_modulo_formati" ADD CONSTRAINT "_testi_v_version_modulo_formati_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_testi_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menu_voci" ADD CONSTRAINT "menu_voci_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."menu"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pagine_blocks_testo_order_idx" ON "pagine_blocks_testo" USING btree ("_order");
  CREATE INDEX "pagine_blocks_testo_parent_id_idx" ON "pagine_blocks_testo" USING btree ("_parent_id");
  CREATE INDEX "pagine_blocks_testo_path_idx" ON "pagine_blocks_testo" USING btree ("_path");
  CREATE INDEX "pagine_blocks_foto_testo_order_idx" ON "pagine_blocks_foto_testo" USING btree ("_order");
  CREATE INDEX "pagine_blocks_foto_testo_parent_id_idx" ON "pagine_blocks_foto_testo" USING btree ("_parent_id");
  CREATE INDEX "pagine_blocks_foto_testo_path_idx" ON "pagine_blocks_foto_testo" USING btree ("_path");
  CREATE INDEX "pagine_blocks_foto_testo_foto_idx" ON "pagine_blocks_foto_testo" USING btree ("foto_id");
  CREATE INDEX "pagine_blocks_schede_voci_order_idx" ON "pagine_blocks_schede_voci" USING btree ("_order");
  CREATE INDEX "pagine_blocks_schede_voci_parent_id_idx" ON "pagine_blocks_schede_voci" USING btree ("_parent_id");
  CREATE INDEX "pagine_blocks_schede_order_idx" ON "pagine_blocks_schede" USING btree ("_order");
  CREATE INDEX "pagine_blocks_schede_parent_id_idx" ON "pagine_blocks_schede" USING btree ("_parent_id");
  CREATE INDEX "pagine_blocks_schede_path_idx" ON "pagine_blocks_schede" USING btree ("_path");
  CREATE INDEX "pagine_blocks_galleria_immagini_order_idx" ON "pagine_blocks_galleria_immagini" USING btree ("_order");
  CREATE INDEX "pagine_blocks_galleria_immagini_parent_id_idx" ON "pagine_blocks_galleria_immagini" USING btree ("_parent_id");
  CREATE INDEX "pagine_blocks_galleria_immagini_foto_idx" ON "pagine_blocks_galleria_immagini" USING btree ("foto_id");
  CREATE INDEX "pagine_blocks_galleria_order_idx" ON "pagine_blocks_galleria" USING btree ("_order");
  CREATE INDEX "pagine_blocks_galleria_parent_id_idx" ON "pagine_blocks_galleria" USING btree ("_parent_id");
  CREATE INDEX "pagine_blocks_galleria_path_idx" ON "pagine_blocks_galleria" USING btree ("_path");
  CREATE INDEX "pagine_blocks_fascia_order_idx" ON "pagine_blocks_fascia" USING btree ("_order");
  CREATE INDEX "pagine_blocks_fascia_parent_id_idx" ON "pagine_blocks_fascia" USING btree ("_parent_id");
  CREATE INDEX "pagine_blocks_fascia_path_idx" ON "pagine_blocks_fascia" USING btree ("_path");
  CREATE INDEX "pagine_stato_idx" ON "pagine" USING btree ("stato");
  CREATE UNIQUE INDEX "pagine_slug_idx" ON "pagine" USING btree ("slug");
  CREATE INDEX "pagine_foto_idx" ON "pagine" USING btree ("foto_id");
  CREATE INDEX "pagine_updated_at_idx" ON "pagine" USING btree ("updated_at");
  CREATE INDEX "pagine_created_at_idx" ON "pagine" USING btree ("created_at");
  CREATE INDEX "richieste_stato_idx" ON "richieste" USING btree ("stato");
  CREATE INDEX "richieste_updated_at_idx" ON "richieste" USING btree ("updated_at");
  CREATE INDEX "richieste_created_at_idx" ON "richieste" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_miniatura_sizes_miniatura_filename_idx" ON "media" USING btree ("sizes_miniatura_filename");
  CREATE INDEX "media_sizes_grande_sizes_grande_filename_idx" ON "media" USING btree ("sizes_grande_filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pagine_id_idx" ON "payload_locked_documents_rels" USING btree ("pagine_id");
  CREATE INDEX "payload_locked_documents_rels_richieste_id_idx" ON "payload_locked_documents_rels" USING btree ("richieste_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "home_titolo_order_idx" ON "home_titolo" USING btree ("_order");
  CREATE INDEX "home_titolo_parent_id_idx" ON "home_titolo" USING btree ("_parent_id");
  CREATE INDEX "home_schede_order_idx" ON "home_schede" USING btree ("_order");
  CREATE INDEX "home_schede_parent_id_idx" ON "home_schede" USING btree ("_parent_id");
  CREATE INDEX "home_schede_foto_idx" ON "home_schede" USING btree ("foto_id");
  CREATE INDEX "_home_v_version_titolo_order_idx" ON "_home_v_version_titolo" USING btree ("_order");
  CREATE INDEX "_home_v_version_titolo_parent_id_idx" ON "_home_v_version_titolo" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_schede_order_idx" ON "_home_v_version_schede" USING btree ("_order");
  CREATE INDEX "_home_v_version_schede_parent_id_idx" ON "_home_v_version_schede" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_schede_foto_idx" ON "_home_v_version_schede" USING btree ("foto_id");
  CREATE INDEX "_home_v_created_at_idx" ON "_home_v" USING btree ("created_at");
  CREATE INDEX "_home_v_updated_at_idx" ON "_home_v" USING btree ("updated_at");
  CREATE INDEX "eventi_privati_intro_titolo_order_idx" ON "eventi_privati_intro_titolo" USING btree ("_order");
  CREATE INDEX "eventi_privati_intro_titolo_parent_id_idx" ON "eventi_privati_intro_titolo" USING btree ("_parent_id");
  CREATE INDEX "eventi_privati_punti_order_idx" ON "eventi_privati_punti" USING btree ("_order");
  CREATE INDEX "eventi_privati_punti_parent_id_idx" ON "eventi_privati_punti" USING btree ("_parent_id");
  CREATE INDEX "eventi_privati_servizi_voci_order_idx" ON "eventi_privati_servizi_voci" USING btree ("_order");
  CREATE INDEX "eventi_privati_servizi_voci_parent_id_idx" ON "eventi_privati_servizi_voci" USING btree ("_parent_id");
  CREATE INDEX "eventi_privati_galleria_order_idx" ON "eventi_privati_galleria" USING btree ("_order");
  CREATE INDEX "eventi_privati_galleria_parent_id_idx" ON "eventi_privati_galleria" USING btree ("_parent_id");
  CREATE INDEX "eventi_privati_galleria_foto_idx" ON "eventi_privati_galleria" USING btree ("foto_id");
  CREATE INDEX "eventi_privati_hero_hero_foto_idx" ON "eventi_privati" USING btree ("hero_foto_id");
  CREATE INDEX "_eventi_privati_v_version_intro_titolo_order_idx" ON "_eventi_privati_v_version_intro_titolo" USING btree ("_order");
  CREATE INDEX "_eventi_privati_v_version_intro_titolo_parent_id_idx" ON "_eventi_privati_v_version_intro_titolo" USING btree ("_parent_id");
  CREATE INDEX "_eventi_privati_v_version_punti_order_idx" ON "_eventi_privati_v_version_punti" USING btree ("_order");
  CREATE INDEX "_eventi_privati_v_version_punti_parent_id_idx" ON "_eventi_privati_v_version_punti" USING btree ("_parent_id");
  CREATE INDEX "_eventi_privati_v_version_servizi_voci_order_idx" ON "_eventi_privati_v_version_servizi_voci" USING btree ("_order");
  CREATE INDEX "_eventi_privati_v_version_servizi_voci_parent_id_idx" ON "_eventi_privati_v_version_servizi_voci" USING btree ("_parent_id");
  CREATE INDEX "_eventi_privati_v_version_galleria_order_idx" ON "_eventi_privati_v_version_galleria" USING btree ("_order");
  CREATE INDEX "_eventi_privati_v_version_galleria_parent_id_idx" ON "_eventi_privati_v_version_galleria" USING btree ("_parent_id");
  CREATE INDEX "_eventi_privati_v_version_galleria_foto_idx" ON "_eventi_privati_v_version_galleria" USING btree ("foto_id");
  CREATE INDEX "_eventi_privati_v_version_hero_version_hero_foto_idx" ON "_eventi_privati_v" USING btree ("version_hero_foto_id");
  CREATE INDEX "_eventi_privati_v_created_at_idx" ON "_eventi_privati_v" USING btree ("created_at");
  CREATE INDEX "_eventi_privati_v_updated_at_idx" ON "_eventi_privati_v" USING btree ("updated_at");
  CREATE INDEX "eventi_aziendali_intro_titolo_order_idx" ON "eventi_aziendali_intro_titolo" USING btree ("_order");
  CREATE INDEX "eventi_aziendali_intro_titolo_parent_id_idx" ON "eventi_aziendali_intro_titolo" USING btree ("_parent_id");
  CREATE INDEX "eventi_aziendali_offerte_order_idx" ON "eventi_aziendali_offerte" USING btree ("_order");
  CREATE INDEX "eventi_aziendali_offerte_parent_id_idx" ON "eventi_aziendali_offerte" USING btree ("_parent_id");
  CREATE INDEX "eventi_aziendali_galleria_order_idx" ON "eventi_aziendali_galleria" USING btree ("_order");
  CREATE INDEX "eventi_aziendali_galleria_parent_id_idx" ON "eventi_aziendali_galleria" USING btree ("_parent_id");
  CREATE INDEX "eventi_aziendali_galleria_foto_idx" ON "eventi_aziendali_galleria" USING btree ("foto_id");
  CREATE INDEX "eventi_aziendali_hero_hero_foto_idx" ON "eventi_aziendali" USING btree ("hero_foto_id");
  CREATE INDEX "_eventi_aziendali_v_version_intro_titolo_order_idx" ON "_eventi_aziendali_v_version_intro_titolo" USING btree ("_order");
  CREATE INDEX "_eventi_aziendali_v_version_intro_titolo_parent_id_idx" ON "_eventi_aziendali_v_version_intro_titolo" USING btree ("_parent_id");
  CREATE INDEX "_eventi_aziendali_v_version_offerte_order_idx" ON "_eventi_aziendali_v_version_offerte" USING btree ("_order");
  CREATE INDEX "_eventi_aziendali_v_version_offerte_parent_id_idx" ON "_eventi_aziendali_v_version_offerte" USING btree ("_parent_id");
  CREATE INDEX "_eventi_aziendali_v_version_galleria_order_idx" ON "_eventi_aziendali_v_version_galleria" USING btree ("_order");
  CREATE INDEX "_eventi_aziendali_v_version_galleria_parent_id_idx" ON "_eventi_aziendali_v_version_galleria" USING btree ("_parent_id");
  CREATE INDEX "_eventi_aziendali_v_version_galleria_foto_idx" ON "_eventi_aziendali_v_version_galleria" USING btree ("foto_id");
  CREATE INDEX "_eventi_aziendali_v_version_hero_version_hero_foto_idx" ON "_eventi_aziendali_v" USING btree ("version_hero_foto_id");
  CREATE INDEX "_eventi_aziendali_v_created_at_idx" ON "_eventi_aziendali_v" USING btree ("created_at");
  CREATE INDEX "_eventi_aziendali_v_updated_at_idx" ON "_eventi_aziendali_v" USING btree ("updated_at");
  CREATE INDEX "cucina_intro_titolo_order_idx" ON "cucina_intro_titolo" USING btree ("_order");
  CREATE INDEX "cucina_intro_titolo_parent_id_idx" ON "cucina_intro_titolo" USING btree ("_parent_id");
  CREATE INDEX "cucina_momenti_order_idx" ON "cucina_momenti" USING btree ("_order");
  CREATE INDEX "cucina_momenti_parent_id_idx" ON "cucina_momenti" USING btree ("_parent_id");
  CREATE INDEX "cucina_hero_hero_foto_idx" ON "cucina" USING btree ("hero_foto_id");
  CREATE INDEX "cucina_hero_hero_foto2_idx" ON "cucina" USING btree ("hero_foto2_id");
  CREATE INDEX "_cucina_v_version_intro_titolo_order_idx" ON "_cucina_v_version_intro_titolo" USING btree ("_order");
  CREATE INDEX "_cucina_v_version_intro_titolo_parent_id_idx" ON "_cucina_v_version_intro_titolo" USING btree ("_parent_id");
  CREATE INDEX "_cucina_v_version_momenti_order_idx" ON "_cucina_v_version_momenti" USING btree ("_order");
  CREATE INDEX "_cucina_v_version_momenti_parent_id_idx" ON "_cucina_v_version_momenti" USING btree ("_parent_id");
  CREATE INDEX "_cucina_v_version_hero_version_hero_foto_idx" ON "_cucina_v" USING btree ("version_hero_foto_id");
  CREATE INDEX "_cucina_v_version_hero_version_hero_foto2_idx" ON "_cucina_v" USING btree ("version_hero_foto2_id");
  CREATE INDEX "_cucina_v_created_at_idx" ON "_cucina_v" USING btree ("created_at");
  CREATE INDEX "_cucina_v_updated_at_idx" ON "_cucina_v" USING btree ("updated_at");
  CREATE INDEX "area_living_intro_titolo_order_idx" ON "area_living_intro_titolo" USING btree ("_order");
  CREATE INDEX "area_living_intro_titolo_parent_id_idx" ON "area_living_intro_titolo" USING btree ("_parent_id");
  CREATE INDEX "area_living_spazi_order_idx" ON "area_living_spazi" USING btree ("_order");
  CREATE INDEX "area_living_spazi_parent_id_idx" ON "area_living_spazi" USING btree ("_parent_id");
  CREATE INDEX "area_living_galleria_order_idx" ON "area_living_galleria" USING btree ("_order");
  CREATE INDEX "area_living_galleria_parent_id_idx" ON "area_living_galleria" USING btree ("_parent_id");
  CREATE INDEX "area_living_galleria_foto_idx" ON "area_living_galleria" USING btree ("foto_id");
  CREATE INDEX "area_living_hero_hero_foto_idx" ON "area_living" USING btree ("hero_foto_id");
  CREATE INDEX "_area_living_v_version_intro_titolo_order_idx" ON "_area_living_v_version_intro_titolo" USING btree ("_order");
  CREATE INDEX "_area_living_v_version_intro_titolo_parent_id_idx" ON "_area_living_v_version_intro_titolo" USING btree ("_parent_id");
  CREATE INDEX "_area_living_v_version_spazi_order_idx" ON "_area_living_v_version_spazi" USING btree ("_order");
  CREATE INDEX "_area_living_v_version_spazi_parent_id_idx" ON "_area_living_v_version_spazi" USING btree ("_parent_id");
  CREATE INDEX "_area_living_v_version_galleria_order_idx" ON "_area_living_v_version_galleria" USING btree ("_order");
  CREATE INDEX "_area_living_v_version_galleria_parent_id_idx" ON "_area_living_v_version_galleria" USING btree ("_parent_id");
  CREATE INDEX "_area_living_v_version_galleria_foto_idx" ON "_area_living_v_version_galleria" USING btree ("foto_id");
  CREATE INDEX "_area_living_v_version_hero_version_hero_foto_idx" ON "_area_living_v" USING btree ("version_hero_foto_id");
  CREATE INDEX "_area_living_v_created_at_idx" ON "_area_living_v" USING btree ("created_at");
  CREATE INDEX "_area_living_v_updated_at_idx" ON "_area_living_v" USING btree ("updated_at");
  CREATE INDEX "centro_congressi_intro_titolo_order_idx" ON "centro_congressi_intro_titolo" USING btree ("_order");
  CREATE INDEX "centro_congressi_intro_titolo_parent_id_idx" ON "centro_congressi_intro_titolo" USING btree ("_parent_id");
  CREATE INDEX "centro_congressi_scheda_allestimenti_order_idx" ON "centro_congressi_scheda_allestimenti" USING btree ("_order");
  CREATE INDEX "centro_congressi_scheda_allestimenti_parent_id_idx" ON "centro_congressi_scheda_allestimenti" USING btree ("_parent_id");
  CREATE INDEX "centro_congressi_scheda_attrezzature_order_idx" ON "centro_congressi_scheda_attrezzature" USING btree ("_order");
  CREATE INDEX "centro_congressi_scheda_attrezzature_parent_id_idx" ON "centro_congressi_scheda_attrezzature" USING btree ("_parent_id");
  CREATE INDEX "centro_congressi_galleria_order_idx" ON "centro_congressi_galleria" USING btree ("_order");
  CREATE INDEX "centro_congressi_galleria_parent_id_idx" ON "centro_congressi_galleria" USING btree ("_parent_id");
  CREATE INDEX "centro_congressi_galleria_foto_idx" ON "centro_congressi_galleria" USING btree ("foto_id");
  CREATE INDEX "centro_congressi_hero_hero_foto_idx" ON "centro_congressi" USING btree ("hero_foto_id");
  CREATE INDEX "_centro_congressi_v_version_intro_titolo_order_idx" ON "_centro_congressi_v_version_intro_titolo" USING btree ("_order");
  CREATE INDEX "_centro_congressi_v_version_intro_titolo_parent_id_idx" ON "_centro_congressi_v_version_intro_titolo" USING btree ("_parent_id");
  CREATE INDEX "_centro_congressi_v_version_scheda_allestimenti_order_idx" ON "_centro_congressi_v_version_scheda_allestimenti" USING btree ("_order");
  CREATE INDEX "_centro_congressi_v_version_scheda_allestimenti_parent_id_idx" ON "_centro_congressi_v_version_scheda_allestimenti" USING btree ("_parent_id");
  CREATE INDEX "_centro_congressi_v_version_scheda_attrezzature_order_idx" ON "_centro_congressi_v_version_scheda_attrezzature" USING btree ("_order");
  CREATE INDEX "_centro_congressi_v_version_scheda_attrezzature_parent_id_idx" ON "_centro_congressi_v_version_scheda_attrezzature" USING btree ("_parent_id");
  CREATE INDEX "_centro_congressi_v_version_galleria_order_idx" ON "_centro_congressi_v_version_galleria" USING btree ("_order");
  CREATE INDEX "_centro_congressi_v_version_galleria_parent_id_idx" ON "_centro_congressi_v_version_galleria" USING btree ("_parent_id");
  CREATE INDEX "_centro_congressi_v_version_galleria_foto_idx" ON "_centro_congressi_v_version_galleria" USING btree ("foto_id");
  CREATE INDEX "_centro_congressi_v_version_hero_version_hero_foto_idx" ON "_centro_congressi_v" USING btree ("version_hero_foto_id");
  CREATE INDEX "_centro_congressi_v_created_at_idx" ON "_centro_congressi_v" USING btree ("created_at");
  CREATE INDEX "_centro_congressi_v_updated_at_idx" ON "_centro_congressi_v" USING btree ("updated_at");
  CREATE INDEX "_fascia_finale_v_created_at_idx" ON "_fascia_finale_v" USING btree ("created_at");
  CREATE INDEX "_fascia_finale_v_updated_at_idx" ON "_fascia_finale_v" USING btree ("updated_at");
  CREATE INDEX "impostazioni_orari_strutturati_giorni_order_idx" ON "impostazioni_orari_strutturati_giorni" USING btree ("order");
  CREATE INDEX "impostazioni_orari_strutturati_giorni_parent_idx" ON "impostazioni_orari_strutturati_giorni" USING btree ("parent_id");
  CREATE INDEX "impostazioni_orari_strutturati_order_idx" ON "impostazioni_orari_strutturati" USING btree ("_order");
  CREATE INDEX "impostazioni_orari_strutturati_parent_id_idx" ON "impostazioni_orari_strutturati" USING btree ("_parent_id");
  CREATE INDEX "testi_per_pagina_order_idx" ON "testi_per_pagina" USING btree ("_order");
  CREATE INDEX "testi_per_pagina_parent_id_idx" ON "testi_per_pagina" USING btree ("_parent_id");
  CREATE INDEX "testi_modulo_occasioni_order_idx" ON "testi_modulo_occasioni" USING btree ("_order");
  CREATE INDEX "testi_modulo_occasioni_parent_id_idx" ON "testi_modulo_occasioni" USING btree ("_parent_id");
  CREATE INDEX "testi_modulo_formati_order_idx" ON "testi_modulo_formati" USING btree ("_order");
  CREATE INDEX "testi_modulo_formati_parent_id_idx" ON "testi_modulo_formati" USING btree ("_parent_id");
  CREATE INDEX "_testi_v_version_per_pagina_order_idx" ON "_testi_v_version_per_pagina" USING btree ("_order");
  CREATE INDEX "_testi_v_version_per_pagina_parent_id_idx" ON "_testi_v_version_per_pagina" USING btree ("_parent_id");
  CREATE INDEX "_testi_v_version_modulo_occasioni_order_idx" ON "_testi_v_version_modulo_occasioni" USING btree ("_order");
  CREATE INDEX "_testi_v_version_modulo_occasioni_parent_id_idx" ON "_testi_v_version_modulo_occasioni" USING btree ("_parent_id");
  CREATE INDEX "_testi_v_version_modulo_formati_order_idx" ON "_testi_v_version_modulo_formati" USING btree ("_order");
  CREATE INDEX "_testi_v_version_modulo_formati_parent_id_idx" ON "_testi_v_version_modulo_formati" USING btree ("_parent_id");
  CREATE INDEX "_testi_v_created_at_idx" ON "_testi_v" USING btree ("created_at");
  CREATE INDEX "_testi_v_updated_at_idx" ON "_testi_v" USING btree ("updated_at");
  CREATE INDEX "menu_voci_order_idx" ON "menu_voci" USING btree ("_order");
  CREATE INDEX "menu_voci_parent_id_idx" ON "menu_voci" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pagine_blocks_testo" CASCADE;
  DROP TABLE "pagine_blocks_foto_testo" CASCADE;
  DROP TABLE "pagine_blocks_schede_voci" CASCADE;
  DROP TABLE "pagine_blocks_schede" CASCADE;
  DROP TABLE "pagine_blocks_galleria_immagini" CASCADE;
  DROP TABLE "pagine_blocks_galleria" CASCADE;
  DROP TABLE "pagine_blocks_fascia" CASCADE;
  DROP TABLE "pagine" CASCADE;
  DROP TABLE "richieste" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "home_titolo" CASCADE;
  DROP TABLE "home_schede" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "_home_v_version_titolo" CASCADE;
  DROP TABLE "_home_v_version_schede" CASCADE;
  DROP TABLE "_home_v" CASCADE;
  DROP TABLE "eventi_privati_intro_titolo" CASCADE;
  DROP TABLE "eventi_privati_punti" CASCADE;
  DROP TABLE "eventi_privati_servizi_voci" CASCADE;
  DROP TABLE "eventi_privati_galleria" CASCADE;
  DROP TABLE "eventi_privati" CASCADE;
  DROP TABLE "_eventi_privati_v_version_intro_titolo" CASCADE;
  DROP TABLE "_eventi_privati_v_version_punti" CASCADE;
  DROP TABLE "_eventi_privati_v_version_servizi_voci" CASCADE;
  DROP TABLE "_eventi_privati_v_version_galleria" CASCADE;
  DROP TABLE "_eventi_privati_v" CASCADE;
  DROP TABLE "eventi_aziendali_intro_titolo" CASCADE;
  DROP TABLE "eventi_aziendali_offerte" CASCADE;
  DROP TABLE "eventi_aziendali_galleria" CASCADE;
  DROP TABLE "eventi_aziendali" CASCADE;
  DROP TABLE "_eventi_aziendali_v_version_intro_titolo" CASCADE;
  DROP TABLE "_eventi_aziendali_v_version_offerte" CASCADE;
  DROP TABLE "_eventi_aziendali_v_version_galleria" CASCADE;
  DROP TABLE "_eventi_aziendali_v" CASCADE;
  DROP TABLE "cucina_intro_titolo" CASCADE;
  DROP TABLE "cucina_momenti" CASCADE;
  DROP TABLE "cucina" CASCADE;
  DROP TABLE "_cucina_v_version_intro_titolo" CASCADE;
  DROP TABLE "_cucina_v_version_momenti" CASCADE;
  DROP TABLE "_cucina_v" CASCADE;
  DROP TABLE "area_living_intro_titolo" CASCADE;
  DROP TABLE "area_living_spazi" CASCADE;
  DROP TABLE "area_living_galleria" CASCADE;
  DROP TABLE "area_living" CASCADE;
  DROP TABLE "_area_living_v_version_intro_titolo" CASCADE;
  DROP TABLE "_area_living_v_version_spazi" CASCADE;
  DROP TABLE "_area_living_v_version_galleria" CASCADE;
  DROP TABLE "_area_living_v" CASCADE;
  DROP TABLE "centro_congressi_intro_titolo" CASCADE;
  DROP TABLE "centro_congressi_scheda_allestimenti" CASCADE;
  DROP TABLE "centro_congressi_scheda_attrezzature" CASCADE;
  DROP TABLE "centro_congressi_galleria" CASCADE;
  DROP TABLE "centro_congressi" CASCADE;
  DROP TABLE "_centro_congressi_v_version_intro_titolo" CASCADE;
  DROP TABLE "_centro_congressi_v_version_scheda_allestimenti" CASCADE;
  DROP TABLE "_centro_congressi_v_version_scheda_attrezzature" CASCADE;
  DROP TABLE "_centro_congressi_v_version_galleria" CASCADE;
  DROP TABLE "_centro_congressi_v" CASCADE;
  DROP TABLE "fascia_finale" CASCADE;
  DROP TABLE "_fascia_finale_v" CASCADE;
  DROP TABLE "impostazioni_orari_strutturati_giorni" CASCADE;
  DROP TABLE "impostazioni_orari_strutturati" CASCADE;
  DROP TABLE "impostazioni" CASCADE;
  DROP TABLE "testi_per_pagina" CASCADE;
  DROP TABLE "testi_modulo_occasioni" CASCADE;
  DROP TABLE "testi_modulo_formati" CASCADE;
  DROP TABLE "testi" CASCADE;
  DROP TABLE "_testi_v_version_per_pagina" CASCADE;
  DROP TABLE "_testi_v_version_modulo_occasioni" CASCADE;
  DROP TABLE "_testi_v_version_modulo_formati" CASCADE;
  DROP TABLE "_testi_v" CASCADE;
  DROP TABLE "menu_voci" CASCADE;
  DROP TABLE "menu" CASCADE;
  DROP TYPE "public"."enum_pagine_blocks_foto_testo_lato";
  DROP TYPE "public"."enum_pagine_stato";
  DROP TYPE "public"."enum_richieste_stato";
  DROP TYPE "public"."enum_richieste_tipo";
  DROP TYPE "public"."enum_users_ruolo";
  DROP TYPE "public"."enum_area_living_galleria_formato";
  DROP TYPE "public"."enum__area_living_v_version_galleria_formato";
  DROP TYPE "public"."enum_centro_congressi_galleria_formato";
  DROP TYPE "public"."enum__centro_congressi_v_version_galleria_formato";
  DROP TYPE "public"."enum_impostazioni_orari_strutturati_giorni";`)
}
