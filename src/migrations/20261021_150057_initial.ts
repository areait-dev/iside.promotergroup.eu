import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pagine_blocks_testo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`titolo\` text,
  	\`contenuto\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pagine\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pagine_blocks_testo_order_idx\` ON \`pagine_blocks_testo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pagine_blocks_testo_parent_id_idx\` ON \`pagine_blocks_testo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pagine_blocks_testo_path_idx\` ON \`pagine_blocks_testo\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pagine_blocks_foto_testo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`titolo\` text,
  	\`testo\` text,
  	\`foto_id\` integer NOT NULL,
  	\`lato\` text DEFAULT 'destra',
  	\`link_testo\` text,
  	\`link_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`foto_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pagine\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pagine_blocks_foto_testo_order_idx\` ON \`pagine_blocks_foto_testo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pagine_blocks_foto_testo_parent_id_idx\` ON \`pagine_blocks_foto_testo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pagine_blocks_foto_testo_path_idx\` ON \`pagine_blocks_foto_testo\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pagine_blocks_foto_testo_foto_idx\` ON \`pagine_blocks_foto_testo\` (\`foto_id\`);`)
  await db.run(sql`CREATE TABLE \`pagine_blocks_schede_voci\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`titolo\` text NOT NULL,
  	\`testo\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pagine_blocks_schede\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pagine_blocks_schede_voci_order_idx\` ON \`pagine_blocks_schede_voci\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pagine_blocks_schede_voci_parent_id_idx\` ON \`pagine_blocks_schede_voci\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pagine_blocks_schede\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`titolo\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pagine\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pagine_blocks_schede_order_idx\` ON \`pagine_blocks_schede\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pagine_blocks_schede_parent_id_idx\` ON \`pagine_blocks_schede\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pagine_blocks_schede_path_idx\` ON \`pagine_blocks_schede\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pagine_blocks_galleria_immagini\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`foto_id\` integer NOT NULL,
  	FOREIGN KEY (\`foto_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pagine_blocks_galleria\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pagine_blocks_galleria_immagini_order_idx\` ON \`pagine_blocks_galleria_immagini\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pagine_blocks_galleria_immagini_parent_id_idx\` ON \`pagine_blocks_galleria_immagini\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pagine_blocks_galleria_immagini_foto_idx\` ON \`pagine_blocks_galleria_immagini\` (\`foto_id\`);`)
  await db.run(sql`CREATE TABLE \`pagine_blocks_galleria\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`titolo\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pagine\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pagine_blocks_galleria_order_idx\` ON \`pagine_blocks_galleria\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pagine_blocks_galleria_parent_id_idx\` ON \`pagine_blocks_galleria\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pagine_blocks_galleria_path_idx\` ON \`pagine_blocks_galleria\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pagine_blocks_fascia\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`titolo\` text NOT NULL,
  	\`testo\` text,
  	\`pulsante\` text,
  	\`href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pagine\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pagine_blocks_fascia_order_idx\` ON \`pagine_blocks_fascia\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pagine_blocks_fascia_parent_id_idx\` ON \`pagine_blocks_fascia\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pagine_blocks_fascia_path_idx\` ON \`pagine_blocks_fascia\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pagine\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`stato\` text DEFAULT 'bozza' NOT NULL,
  	\`slug\` text NOT NULL,
  	\`titolo\` text NOT NULL,
  	\`foto_id\` integer,
  	\`introduzione\` text,
  	\`seo_parola_chiave\` text,
  	\`seo_titolo\` text,
  	\`seo_descrizione\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`foto_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`pagine_stato_idx\` ON \`pagine\` (\`stato\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pagine_slug_idx\` ON \`pagine\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pagine_foto_idx\` ON \`pagine\` (\`foto_id\`);`)
  await db.run(sql`CREATE INDEX \`pagine_updated_at_idx\` ON \`pagine\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pagine_created_at_idx\` ON \`pagine\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`richieste\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`stato\` text DEFAULT 'nuova' NOT NULL,
  	\`note_interne\` text,
  	\`tipo\` text,
  	\`data_evento\` text,
  	\`ospiti\` numeric,
  	\`occasione\` text,
  	\`formato\` text,
  	\`nome\` text NOT NULL,
  	\`telefono\` text,
  	\`email\` text,
  	\`tecniche\` text,
  	\`messaggio\` text,
  	\`consenso\` integer,
  	\`consenso_il\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`richieste_stato_idx\` ON \`richieste\` (\`stato\`);`)
  await db.run(sql`CREATE INDEX \`richieste_updated_at_idx\` ON \`richieste\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`richieste_created_at_idx\` ON \`richieste\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_miniatura_url\` text,
  	\`sizes_miniatura_width\` numeric,
  	\`sizes_miniatura_height\` numeric,
  	\`sizes_miniatura_mime_type\` text,
  	\`sizes_miniatura_filesize\` numeric,
  	\`sizes_miniatura_filename\` text,
  	\`sizes_grande_url\` text,
  	\`sizes_grande_width\` numeric,
  	\`sizes_grande_height\` numeric,
  	\`sizes_grande_mime_type\` text,
  	\`sizes_grande_filesize\` numeric,
  	\`sizes_grande_filename\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_miniatura_sizes_miniatura_filename_idx\` ON \`media\` (\`sizes_miniatura_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_grande_sizes_grande_filename_idx\` ON \`media\` (\`sizes_grande_filename\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`nome\` text,
  	\`ruolo\` text DEFAULT 'editor' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`reset_password_requested_at\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pagine_id\` integer,
  	\`richieste_id\` integer,
  	\`media_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pagine_id\`) REFERENCES \`pagine\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`richieste_id\`) REFERENCES \`richieste\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pagine_id_idx\` ON \`payload_locked_documents_rels\` (\`pagine_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_richieste_id_idx\` ON \`payload_locked_documents_rels\` (\`richieste_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`home_titolo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`testo\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_titolo_order_idx\` ON \`home_titolo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_titolo_parent_id_idx\` ON \`home_titolo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_schede\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`titolo\` text NOT NULL,
  	\`testo\` text,
  	\`link\` text NOT NULL,
  	\`foto_id\` integer NOT NULL,
  	FOREIGN KEY (\`foto_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_schede_order_idx\` ON \`home_schede\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_schede_parent_id_idx\` ON \`home_schede\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_schede_foto_idx\` ON \`home_schede\` (\`foto_id\`);`)
  await db.run(sql`CREATE TABLE \`home\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`riga_marchio\` text,
  	\`introduzione\` text,
  	\`cta_privati_testo\` text,
  	\`cta_privati_link\` text,
  	\`cta_aziende_testo\` text,
  	\`cta_aziende_link\` text,
  	\`titolo_spazi\` text,
  	\`seo_parola_chiave\` text,
  	\`seo_titolo\` text,
  	\`seo_descrizione\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`_home_v_version_titolo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`testo\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_v_version_titolo_order_idx\` ON \`_home_v_version_titolo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_version_titolo_parent_id_idx\` ON \`_home_v_version_titolo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_v_version_schede\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titolo\` text NOT NULL,
  	\`testo\` text,
  	\`link\` text NOT NULL,
  	\`foto_id\` integer NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`foto_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_v_version_schede_order_idx\` ON \`_home_v_version_schede\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_version_schede_parent_id_idx\` ON \`_home_v_version_schede\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_version_schede_foto_idx\` ON \`_home_v_version_schede\` (\`foto_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_riga_marchio\` text,
  	\`version_introduzione\` text,
  	\`version_cta_privati_testo\` text,
  	\`version_cta_privati_link\` text,
  	\`version_cta_aziende_testo\` text,
  	\`version_cta_aziende_link\` text,
  	\`version_titolo_spazi\` text,
  	\`version_seo_parola_chiave\` text,
  	\`version_seo_titolo\` text,
  	\`version_seo_descrizione\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_v_created_at_idx\` ON \`_home_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_updated_at_idx\` ON \`_home_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`eventi_privati_intro_titolo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`testo\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`eventi_privati\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eventi_privati_intro_titolo_order_idx\` ON \`eventi_privati_intro_titolo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eventi_privati_intro_titolo_parent_id_idx\` ON \`eventi_privati_intro_titolo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`eventi_privati_punti\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`titolo\` text NOT NULL,
  	\`testo\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`eventi_privati\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eventi_privati_punti_order_idx\` ON \`eventi_privati_punti\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eventi_privati_punti_parent_id_idx\` ON \`eventi_privati_punti\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`eventi_privati_servizi_voci\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`titolo\` text NOT NULL,
  	\`testo\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`eventi_privati\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eventi_privati_servizi_voci_order_idx\` ON \`eventi_privati_servizi_voci\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eventi_privati_servizi_voci_parent_id_idx\` ON \`eventi_privati_servizi_voci\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`eventi_privati_galleria\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`foto_id\` integer NOT NULL,
  	FOREIGN KEY (\`foto_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`eventi_privati\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eventi_privati_galleria_order_idx\` ON \`eventi_privati_galleria\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eventi_privati_galleria_parent_id_idx\` ON \`eventi_privati_galleria\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`eventi_privati_galleria_foto_idx\` ON \`eventi_privati_galleria\` (\`foto_id\`);`)
  await db.run(sql`CREATE TABLE \`eventi_privati\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_titolo\` text,
  	\`hero_foto_id\` integer,
  	\`link_area_testo\` text,
  	\`link_area_href\` text,
  	\`serate_titolo\` text,
  	\`serate_testo\` text,
  	\`servizi_titolo\` text,
  	\`richiesta_titolo\` text,
  	\`richiesta_testo\` text,
  	\`seo_parola_chiave\` text,
  	\`seo_titolo\` text,
  	\`seo_descrizione\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_foto_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`eventi_privati_hero_hero_foto_idx\` ON \`eventi_privati\` (\`hero_foto_id\`);`)
  await db.run(sql`CREATE TABLE \`_eventi_privati_v_version_intro_titolo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`testo\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_eventi_privati_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_eventi_privati_v_version_intro_titolo_order_idx\` ON \`_eventi_privati_v_version_intro_titolo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_eventi_privati_v_version_intro_titolo_parent_id_idx\` ON \`_eventi_privati_v_version_intro_titolo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_eventi_privati_v_version_punti\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titolo\` text NOT NULL,
  	\`testo\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_eventi_privati_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_eventi_privati_v_version_punti_order_idx\` ON \`_eventi_privati_v_version_punti\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_eventi_privati_v_version_punti_parent_id_idx\` ON \`_eventi_privati_v_version_punti\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_eventi_privati_v_version_servizi_voci\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titolo\` text NOT NULL,
  	\`testo\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_eventi_privati_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_eventi_privati_v_version_servizi_voci_order_idx\` ON \`_eventi_privati_v_version_servizi_voci\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_eventi_privati_v_version_servizi_voci_parent_id_idx\` ON \`_eventi_privati_v_version_servizi_voci\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_eventi_privati_v_version_galleria\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`foto_id\` integer NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`foto_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_eventi_privati_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_eventi_privati_v_version_galleria_order_idx\` ON \`_eventi_privati_v_version_galleria\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_eventi_privati_v_version_galleria_parent_id_idx\` ON \`_eventi_privati_v_version_galleria\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_eventi_privati_v_version_galleria_foto_idx\` ON \`_eventi_privati_v_version_galleria\` (\`foto_id\`);`)
  await db.run(sql`CREATE TABLE \`_eventi_privati_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_titolo\` text,
  	\`version_hero_foto_id\` integer,
  	\`version_link_area_testo\` text,
  	\`version_link_area_href\` text,
  	\`version_serate_titolo\` text,
  	\`version_serate_testo\` text,
  	\`version_servizi_titolo\` text,
  	\`version_richiesta_titolo\` text,
  	\`version_richiesta_testo\` text,
  	\`version_seo_parola_chiave\` text,
  	\`version_seo_titolo\` text,
  	\`version_seo_descrizione\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`version_hero_foto_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_eventi_privati_v_version_hero_version_hero_foto_idx\` ON \`_eventi_privati_v\` (\`version_hero_foto_id\`);`)
  await db.run(sql`CREATE INDEX \`_eventi_privati_v_created_at_idx\` ON \`_eventi_privati_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_eventi_privati_v_updated_at_idx\` ON \`_eventi_privati_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`eventi_aziendali_intro_titolo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`testo\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`eventi_aziendali\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eventi_aziendali_intro_titolo_order_idx\` ON \`eventi_aziendali_intro_titolo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eventi_aziendali_intro_titolo_parent_id_idx\` ON \`eventi_aziendali_intro_titolo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`eventi_aziendali_offerte\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`titolo\` text NOT NULL,
  	\`testo\` text,
  	\`link_testo\` text,
  	\`link_href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`eventi_aziendali\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eventi_aziendali_offerte_order_idx\` ON \`eventi_aziendali_offerte\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eventi_aziendali_offerte_parent_id_idx\` ON \`eventi_aziendali_offerte\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`eventi_aziendali_galleria\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`foto_id\` integer NOT NULL,
  	FOREIGN KEY (\`foto_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`eventi_aziendali\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eventi_aziendali_galleria_order_idx\` ON \`eventi_aziendali_galleria\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eventi_aziendali_galleria_parent_id_idx\` ON \`eventi_aziendali_galleria\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`eventi_aziendali_galleria_foto_idx\` ON \`eventi_aziendali_galleria\` (\`foto_id\`);`)
  await db.run(sql`CREATE TABLE \`eventi_aziendali\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_titolo\` text,
  	\`hero_foto_id\` integer,
  	\`eventi_titolo\` text,
  	\`eventi_testo\` text,
  	\`richiesta_titolo\` text,
  	\`richiesta_testo\` text,
  	\`seo_parola_chiave\` text,
  	\`seo_titolo\` text,
  	\`seo_descrizione\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_foto_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`eventi_aziendali_hero_hero_foto_idx\` ON \`eventi_aziendali\` (\`hero_foto_id\`);`)
  await db.run(sql`CREATE TABLE \`_eventi_aziendali_v_version_intro_titolo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`testo\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_eventi_aziendali_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_eventi_aziendali_v_version_intro_titolo_order_idx\` ON \`_eventi_aziendali_v_version_intro_titolo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_eventi_aziendali_v_version_intro_titolo_parent_id_idx\` ON \`_eventi_aziendali_v_version_intro_titolo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_eventi_aziendali_v_version_offerte\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titolo\` text NOT NULL,
  	\`testo\` text,
  	\`link_testo\` text,
  	\`link_href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_eventi_aziendali_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_eventi_aziendali_v_version_offerte_order_idx\` ON \`_eventi_aziendali_v_version_offerte\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_eventi_aziendali_v_version_offerte_parent_id_idx\` ON \`_eventi_aziendali_v_version_offerte\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_eventi_aziendali_v_version_galleria\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`foto_id\` integer NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`foto_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_eventi_aziendali_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_eventi_aziendali_v_version_galleria_order_idx\` ON \`_eventi_aziendali_v_version_galleria\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_eventi_aziendali_v_version_galleria_parent_id_idx\` ON \`_eventi_aziendali_v_version_galleria\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_eventi_aziendali_v_version_galleria_foto_idx\` ON \`_eventi_aziendali_v_version_galleria\` (\`foto_id\`);`)
  await db.run(sql`CREATE TABLE \`_eventi_aziendali_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_titolo\` text,
  	\`version_hero_foto_id\` integer,
  	\`version_eventi_titolo\` text,
  	\`version_eventi_testo\` text,
  	\`version_richiesta_titolo\` text,
  	\`version_richiesta_testo\` text,
  	\`version_seo_parola_chiave\` text,
  	\`version_seo_titolo\` text,
  	\`version_seo_descrizione\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`version_hero_foto_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_eventi_aziendali_v_version_hero_version_hero_foto_idx\` ON \`_eventi_aziendali_v\` (\`version_hero_foto_id\`);`)
  await db.run(sql`CREATE INDEX \`_eventi_aziendali_v_created_at_idx\` ON \`_eventi_aziendali_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_eventi_aziendali_v_updated_at_idx\` ON \`_eventi_aziendali_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`cucina_intro_titolo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`testo\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cucina\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`cucina_intro_titolo_order_idx\` ON \`cucina_intro_titolo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`cucina_intro_titolo_parent_id_idx\` ON \`cucina_intro_titolo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`cucina_momenti\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`titolo\` text NOT NULL,
  	\`lead\` text,
  	\`testo\` text,
  	\`orari\` text,
  	\`menu_link\` text,
  	\`menu_testo\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cucina\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`cucina_momenti_order_idx\` ON \`cucina_momenti\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`cucina_momenti_parent_id_idx\` ON \`cucina_momenti\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`cucina\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_titolo\` text,
  	\`hero_foto_id\` integer,
  	\`hero_foto2_id\` integer,
  	\`intro_testo\` text,
  	\`tavolo_titolo\` text,
  	\`tavolo_testo\` text,
  	\`tavolo_etichetta_chiama\` text,
  	\`tavolo_etichetta_preventivo\` text,
  	\`seo_parola_chiave\` text,
  	\`seo_titolo\` text,
  	\`seo_descrizione\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_foto_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_foto2_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`cucina_hero_hero_foto_idx\` ON \`cucina\` (\`hero_foto_id\`);`)
  await db.run(sql`CREATE INDEX \`cucina_hero_hero_foto2_idx\` ON \`cucina\` (\`hero_foto2_id\`);`)
  await db.run(sql`CREATE TABLE \`_cucina_v_version_intro_titolo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`testo\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_cucina_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_cucina_v_version_intro_titolo_order_idx\` ON \`_cucina_v_version_intro_titolo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_cucina_v_version_intro_titolo_parent_id_idx\` ON \`_cucina_v_version_intro_titolo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_cucina_v_version_momenti\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titolo\` text NOT NULL,
  	\`lead\` text,
  	\`testo\` text,
  	\`orari\` text,
  	\`menu_link\` text,
  	\`menu_testo\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_cucina_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_cucina_v_version_momenti_order_idx\` ON \`_cucina_v_version_momenti\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_cucina_v_version_momenti_parent_id_idx\` ON \`_cucina_v_version_momenti\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_cucina_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_titolo\` text,
  	\`version_hero_foto_id\` integer,
  	\`version_hero_foto2_id\` integer,
  	\`version_intro_testo\` text,
  	\`version_tavolo_titolo\` text,
  	\`version_tavolo_testo\` text,
  	\`version_tavolo_etichetta_chiama\` text,
  	\`version_tavolo_etichetta_preventivo\` text,
  	\`version_seo_parola_chiave\` text,
  	\`version_seo_titolo\` text,
  	\`version_seo_descrizione\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`version_hero_foto_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_foto2_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_cucina_v_version_hero_version_hero_foto_idx\` ON \`_cucina_v\` (\`version_hero_foto_id\`);`)
  await db.run(sql`CREATE INDEX \`_cucina_v_version_hero_version_hero_foto2_idx\` ON \`_cucina_v\` (\`version_hero_foto2_id\`);`)
  await db.run(sql`CREATE INDEX \`_cucina_v_created_at_idx\` ON \`_cucina_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_cucina_v_updated_at_idx\` ON \`_cucina_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`area_living_intro_titolo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`testo\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`area_living\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`area_living_intro_titolo_order_idx\` ON \`area_living_intro_titolo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`area_living_intro_titolo_parent_id_idx\` ON \`area_living_intro_titolo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`area_living_spazi\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`titolo\` text NOT NULL,
  	\`testo\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`area_living\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`area_living_spazi_order_idx\` ON \`area_living_spazi\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`area_living_spazi_parent_id_idx\` ON \`area_living_spazi\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`area_living_galleria\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`foto_id\` integer NOT NULL,
  	\`formato\` text DEFAULT 'meta',
  	FOREIGN KEY (\`foto_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`area_living\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`area_living_galleria_order_idx\` ON \`area_living_galleria\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`area_living_galleria_parent_id_idx\` ON \`area_living_galleria\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`area_living_galleria_foto_idx\` ON \`area_living_galleria\` (\`foto_id\`);`)
  await db.run(sql`CREATE TABLE \`area_living\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_titolo\` text,
  	\`hero_foto_id\` integer,
  	\`intro_testo\` text,
  	\`servizi_testo\` text,
  	\`seo_parola_chiave\` text,
  	\`seo_titolo\` text,
  	\`seo_descrizione\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_foto_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`area_living_hero_hero_foto_idx\` ON \`area_living\` (\`hero_foto_id\`);`)
  await db.run(sql`CREATE TABLE \`_area_living_v_version_intro_titolo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`testo\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_area_living_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_area_living_v_version_intro_titolo_order_idx\` ON \`_area_living_v_version_intro_titolo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_area_living_v_version_intro_titolo_parent_id_idx\` ON \`_area_living_v_version_intro_titolo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_area_living_v_version_spazi\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titolo\` text NOT NULL,
  	\`testo\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_area_living_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_area_living_v_version_spazi_order_idx\` ON \`_area_living_v_version_spazi\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_area_living_v_version_spazi_parent_id_idx\` ON \`_area_living_v_version_spazi\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_area_living_v_version_galleria\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`foto_id\` integer NOT NULL,
  	\`formato\` text DEFAULT 'meta',
  	\`_uuid\` text,
  	FOREIGN KEY (\`foto_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_area_living_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_area_living_v_version_galleria_order_idx\` ON \`_area_living_v_version_galleria\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_area_living_v_version_galleria_parent_id_idx\` ON \`_area_living_v_version_galleria\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_area_living_v_version_galleria_foto_idx\` ON \`_area_living_v_version_galleria\` (\`foto_id\`);`)
  await db.run(sql`CREATE TABLE \`_area_living_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_titolo\` text,
  	\`version_hero_foto_id\` integer,
  	\`version_intro_testo\` text,
  	\`version_servizi_testo\` text,
  	\`version_seo_parola_chiave\` text,
  	\`version_seo_titolo\` text,
  	\`version_seo_descrizione\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`version_hero_foto_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_area_living_v_version_hero_version_hero_foto_idx\` ON \`_area_living_v\` (\`version_hero_foto_id\`);`)
  await db.run(sql`CREATE INDEX \`_area_living_v_created_at_idx\` ON \`_area_living_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_area_living_v_updated_at_idx\` ON \`_area_living_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`centro_congressi_intro_titolo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`testo\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`centro_congressi\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`centro_congressi_intro_titolo_order_idx\` ON \`centro_congressi_intro_titolo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`centro_congressi_intro_titolo_parent_id_idx\` ON \`centro_congressi_intro_titolo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`centro_congressi_scheda_allestimenti\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`nome\` text NOT NULL,
  	\`posti\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`centro_congressi\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`centro_congressi_scheda_allestimenti_order_idx\` ON \`centro_congressi_scheda_allestimenti\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`centro_congressi_scheda_allestimenti_parent_id_idx\` ON \`centro_congressi_scheda_allestimenti\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`centro_congressi_scheda_attrezzature\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`nome\` text NOT NULL,
  	\`dettaglio\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`centro_congressi\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`centro_congressi_scheda_attrezzature_order_idx\` ON \`centro_congressi_scheda_attrezzature\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`centro_congressi_scheda_attrezzature_parent_id_idx\` ON \`centro_congressi_scheda_attrezzature\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`centro_congressi_galleria\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`foto_id\` integer NOT NULL,
  	\`formato\` text DEFAULT 'meta',
  	FOREIGN KEY (\`foto_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`centro_congressi\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`centro_congressi_galleria_order_idx\` ON \`centro_congressi_galleria\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`centro_congressi_galleria_parent_id_idx\` ON \`centro_congressi_galleria\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`centro_congressi_galleria_foto_idx\` ON \`centro_congressi_galleria\` (\`foto_id\`);`)
  await db.run(sql`CREATE TABLE \`centro_congressi\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_titolo\` text,
  	\`hero_foto_id\` integer,
  	\`intro_testo\` text,
  	\`scheda_accessibilita\` text,
  	\`scheda_parcheggio\` text,
  	\`scheda_pdf\` text,
  	\`richiesta_titolo\` text,
  	\`richiesta_testo\` text,
  	\`seo_parola_chiave\` text,
  	\`seo_titolo\` text,
  	\`seo_descrizione\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_foto_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`centro_congressi_hero_hero_foto_idx\` ON \`centro_congressi\` (\`hero_foto_id\`);`)
  await db.run(sql`CREATE TABLE \`_centro_congressi_v_version_intro_titolo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`testo\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_centro_congressi_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_centro_congressi_v_version_intro_titolo_order_idx\` ON \`_centro_congressi_v_version_intro_titolo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_centro_congressi_v_version_intro_titolo_parent_id_idx\` ON \`_centro_congressi_v_version_intro_titolo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_centro_congressi_v_version_scheda_allestimenti\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`nome\` text NOT NULL,
  	\`posti\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_centro_congressi_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_centro_congressi_v_version_scheda_allestimenti_order_idx\` ON \`_centro_congressi_v_version_scheda_allestimenti\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_centro_congressi_v_version_scheda_allestimenti_parent_id_idx\` ON \`_centro_congressi_v_version_scheda_allestimenti\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_centro_congressi_v_version_scheda_attrezzature\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`nome\` text NOT NULL,
  	\`dettaglio\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_centro_congressi_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_centro_congressi_v_version_scheda_attrezzature_order_idx\` ON \`_centro_congressi_v_version_scheda_attrezzature\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_centro_congressi_v_version_scheda_attrezzature_parent_id_idx\` ON \`_centro_congressi_v_version_scheda_attrezzature\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_centro_congressi_v_version_galleria\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`foto_id\` integer NOT NULL,
  	\`formato\` text DEFAULT 'meta',
  	\`_uuid\` text,
  	FOREIGN KEY (\`foto_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_centro_congressi_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_centro_congressi_v_version_galleria_order_idx\` ON \`_centro_congressi_v_version_galleria\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_centro_congressi_v_version_galleria_parent_id_idx\` ON \`_centro_congressi_v_version_galleria\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_centro_congressi_v_version_galleria_foto_idx\` ON \`_centro_congressi_v_version_galleria\` (\`foto_id\`);`)
  await db.run(sql`CREATE TABLE \`_centro_congressi_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_titolo\` text,
  	\`version_hero_foto_id\` integer,
  	\`version_intro_testo\` text,
  	\`version_scheda_accessibilita\` text,
  	\`version_scheda_parcheggio\` text,
  	\`version_scheda_pdf\` text,
  	\`version_richiesta_titolo\` text,
  	\`version_richiesta_testo\` text,
  	\`version_seo_parola_chiave\` text,
  	\`version_seo_titolo\` text,
  	\`version_seo_descrizione\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`version_hero_foto_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_centro_congressi_v_version_hero_version_hero_foto_idx\` ON \`_centro_congressi_v\` (\`version_hero_foto_id\`);`)
  await db.run(sql`CREATE INDEX \`_centro_congressi_v_created_at_idx\` ON \`_centro_congressi_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_centro_congressi_v_updated_at_idx\` ON \`_centro_congressi_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`fascia_finale\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titolo\` text,
  	\`testo\` text,
  	\`etichetta_chiama\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`_fascia_finale_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_titolo\` text,
  	\`version_testo\` text,
  	\`version_etichetta_chiama\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_fascia_finale_v_created_at_idx\` ON \`_fascia_finale_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_fascia_finale_v_updated_at_idx\` ON \`_fascia_finale_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`impostazioni_orari_strutturati_giorni\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`impostazioni_orari_strutturati\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`impostazioni_orari_strutturati_giorni_order_idx\` ON \`impostazioni_orari_strutturati_giorni\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`impostazioni_orari_strutturati_giorni_parent_idx\` ON \`impostazioni_orari_strutturati_giorni\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`impostazioni_orari_strutturati\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`apre\` text NOT NULL,
  	\`chiude\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`impostazioni\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`impostazioni_orari_strutturati_order_idx\` ON \`impostazioni_orari_strutturati\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`impostazioni_orari_strutturati_parent_id_idx\` ON \`impostazioni_orari_strutturati\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`impostazioni\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`telefono\` text,
  	\`email\` text,
  	\`whatsapp\` text,
  	\`tempi_risposta\` text,
  	\`email_richieste\` text,
  	\`via\` text,
  	\`cap\` text,
  	\`comune\` text,
  	\`provincia\` text,
  	\`orari\` text,
  	\`maps_link\` text,
  	\`maps_embed\` text,
  	\`latitudine\` text,
  	\`longitudine\` text,
  	\`instagram\` text,
  	\`facebook\` text,
  	\`linkedin\` text,
  	\`titolare\` text,
  	\`indirizzo_titolare\` text,
  	\`email_privacy\` text,
  	\`telefono_privacy\` text,
  	\`conservazione\` text,
  	\`destinatari\` text,
  	\`aggiornato_il\` text,
  	\`tagline\` text,
  	\`descrizione\` text,
  	\`ragione_sociale\` text,
  	\`gestore\` text,
  	\`partita_iva\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`testi_per_pagina\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`percorso\` text NOT NULL,
  	\`testo\` text NOT NULL,
  	\`breve\` text NOT NULL,
  	\`link\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`testi\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`testi_per_pagina_order_idx\` ON \`testi_per_pagina\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`testi_per_pagina_parent_id_idx\` ON \`testi_per_pagina\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`testi_modulo_occasioni\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`testo\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`testi\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`testi_modulo_occasioni_order_idx\` ON \`testi_modulo_occasioni\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`testi_modulo_occasioni_parent_id_idx\` ON \`testi_modulo_occasioni\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`testi_modulo_formati\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`testo\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`testi\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`testi_modulo_formati_order_idx\` ON \`testi_modulo_formati\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`testi_modulo_formati_parent_id_idx\` ON \`testi_modulo_formati\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`testi\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`pulsanti_preventivo\` text,
  	\`pulsanti_preventivo_breve\` text,
  	\`pulsanti_chiama\` text,
  	\`pulsanti_whatsapp\` text,
  	\`navigazione_home\` text,
  	\`footer_titolo_sito\` text,
  	\`footer_titolo_social\` text,
  	\`footer_servizio_di\` text,
  	\`footer_etichetta_partita_iva\` text,
  	\`footer_privacy\` text,
  	\`footer_cookie\` text,
  	\`contatti_titolo\` text,
  	\`contatti_telefono\` text,
  	\`contatti_email\` text,
  	\`contatti_dove_siamo\` text,
  	\`contatti_zona\` text,
  	\`contatti_orari\` text,
  	\`contatti_apri_mappa\` text,
  	\`contatti_preferisci\` text,
  	\`pagina404_errore\` text,
  	\`pagina404_titolo\` text,
  	\`pagina404_testo\` text,
  	\`preventivo_testo\` text,
  	\`preventivo_scegli\` text,
  	\`preventivo_privato\` text,
  	\`preventivo_aziendale\` text,
  	\`preventivo_vuoto\` text,
  	\`modulo_legend_occasione\` text,
  	\`modulo_legend_formato\` text,
  	\`modulo_facoltativo\` text,
  	\`modulo_data\` text,
  	\`modulo_ospiti\` text,
  	\`modulo_nome\` text,
  	\`modulo_contatti\` text,
  	\`modulo_contatti_nota\` text,
  	\`modulo_telefono\` text,
  	\`modulo_email\` text,
  	\`modulo_tecniche\` text,
  	\`modulo_messaggio\` text,
  	\`modulo_consenso_inizio\` text,
  	\`modulo_consenso_link\` text,
  	\`modulo_consenso_fine\` text,
  	\`modulo_invia\` text,
  	\`modulo_invio\` text,
  	\`modulo_grazie\` text,
  	\`modulo_ricevuta\` text,
  	\`modulo_conferma\` text,
  	\`modulo_errore_invio\` text,
  	\`modulo_avviso_privati\` text,
  	\`modulo_avviso_aziendali\` text,
  	\`modulo_riepilogo_data\` text,
  	\`modulo_riepilogo_ospiti\` text,
  	\`modulo_riepilogo_occasione\` text,
  	\`modulo_riepilogo_formato\` text,
  	\`modulo_riepilogo_nome\` text,
  	\`modulo_riepilogo_telefono\` text,
  	\`modulo_riepilogo_email\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`_testi_v_version_per_pagina\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`percorso\` text NOT NULL,
  	\`testo\` text NOT NULL,
  	\`breve\` text NOT NULL,
  	\`link\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_testi_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_testi_v_version_per_pagina_order_idx\` ON \`_testi_v_version_per_pagina\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_testi_v_version_per_pagina_parent_id_idx\` ON \`_testi_v_version_per_pagina\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_testi_v_version_modulo_occasioni\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`testo\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_testi_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_testi_v_version_modulo_occasioni_order_idx\` ON \`_testi_v_version_modulo_occasioni\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_testi_v_version_modulo_occasioni_parent_id_idx\` ON \`_testi_v_version_modulo_occasioni\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_testi_v_version_modulo_formati\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`testo\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_testi_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_testi_v_version_modulo_formati_order_idx\` ON \`_testi_v_version_modulo_formati\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_testi_v_version_modulo_formati_parent_id_idx\` ON \`_testi_v_version_modulo_formati\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_testi_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_pulsanti_preventivo\` text,
  	\`version_pulsanti_preventivo_breve\` text,
  	\`version_pulsanti_chiama\` text,
  	\`version_pulsanti_whatsapp\` text,
  	\`version_navigazione_home\` text,
  	\`version_footer_titolo_sito\` text,
  	\`version_footer_titolo_social\` text,
  	\`version_footer_servizio_di\` text,
  	\`version_footer_etichetta_partita_iva\` text,
  	\`version_footer_privacy\` text,
  	\`version_footer_cookie\` text,
  	\`version_contatti_titolo\` text,
  	\`version_contatti_telefono\` text,
  	\`version_contatti_email\` text,
  	\`version_contatti_dove_siamo\` text,
  	\`version_contatti_zona\` text,
  	\`version_contatti_orari\` text,
  	\`version_contatti_apri_mappa\` text,
  	\`version_contatti_preferisci\` text,
  	\`version_pagina404_errore\` text,
  	\`version_pagina404_titolo\` text,
  	\`version_pagina404_testo\` text,
  	\`version_preventivo_testo\` text,
  	\`version_preventivo_scegli\` text,
  	\`version_preventivo_privato\` text,
  	\`version_preventivo_aziendale\` text,
  	\`version_preventivo_vuoto\` text,
  	\`version_modulo_legend_occasione\` text,
  	\`version_modulo_legend_formato\` text,
  	\`version_modulo_facoltativo\` text,
  	\`version_modulo_data\` text,
  	\`version_modulo_ospiti\` text,
  	\`version_modulo_nome\` text,
  	\`version_modulo_contatti\` text,
  	\`version_modulo_contatti_nota\` text,
  	\`version_modulo_telefono\` text,
  	\`version_modulo_email\` text,
  	\`version_modulo_tecniche\` text,
  	\`version_modulo_messaggio\` text,
  	\`version_modulo_consenso_inizio\` text,
  	\`version_modulo_consenso_link\` text,
  	\`version_modulo_consenso_fine\` text,
  	\`version_modulo_invia\` text,
  	\`version_modulo_invio\` text,
  	\`version_modulo_grazie\` text,
  	\`version_modulo_ricevuta\` text,
  	\`version_modulo_conferma\` text,
  	\`version_modulo_errore_invio\` text,
  	\`version_modulo_avviso_privati\` text,
  	\`version_modulo_avviso_aziendali\` text,
  	\`version_modulo_riepilogo_data\` text,
  	\`version_modulo_riepilogo_ospiti\` text,
  	\`version_modulo_riepilogo_occasione\` text,
  	\`version_modulo_riepilogo_formato\` text,
  	\`version_modulo_riepilogo_nome\` text,
  	\`version_modulo_riepilogo_telefono\` text,
  	\`version_modulo_riepilogo_email\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_testi_v_created_at_idx\` ON \`_testi_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_testi_v_updated_at_idx\` ON \`_testi_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`menu_voci\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`etichetta\` text NOT NULL,
  	\`indirizzo\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`menu\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`menu_voci_order_idx\` ON \`menu_voci\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`menu_voci_parent_id_idx\` ON \`menu_voci\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`menu\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pagine_blocks_testo\`;`)
  await db.run(sql`DROP TABLE \`pagine_blocks_foto_testo\`;`)
  await db.run(sql`DROP TABLE \`pagine_blocks_schede_voci\`;`)
  await db.run(sql`DROP TABLE \`pagine_blocks_schede\`;`)
  await db.run(sql`DROP TABLE \`pagine_blocks_galleria_immagini\`;`)
  await db.run(sql`DROP TABLE \`pagine_blocks_galleria\`;`)
  await db.run(sql`DROP TABLE \`pagine_blocks_fascia\`;`)
  await db.run(sql`DROP TABLE \`pagine\`;`)
  await db.run(sql`DROP TABLE \`richieste\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`home_titolo\`;`)
  await db.run(sql`DROP TABLE \`home_schede\`;`)
  await db.run(sql`DROP TABLE \`home\`;`)
  await db.run(sql`DROP TABLE \`_home_v_version_titolo\`;`)
  await db.run(sql`DROP TABLE \`_home_v_version_schede\`;`)
  await db.run(sql`DROP TABLE \`_home_v\`;`)
  await db.run(sql`DROP TABLE \`eventi_privati_intro_titolo\`;`)
  await db.run(sql`DROP TABLE \`eventi_privati_punti\`;`)
  await db.run(sql`DROP TABLE \`eventi_privati_servizi_voci\`;`)
  await db.run(sql`DROP TABLE \`eventi_privati_galleria\`;`)
  await db.run(sql`DROP TABLE \`eventi_privati\`;`)
  await db.run(sql`DROP TABLE \`_eventi_privati_v_version_intro_titolo\`;`)
  await db.run(sql`DROP TABLE \`_eventi_privati_v_version_punti\`;`)
  await db.run(sql`DROP TABLE \`_eventi_privati_v_version_servizi_voci\`;`)
  await db.run(sql`DROP TABLE \`_eventi_privati_v_version_galleria\`;`)
  await db.run(sql`DROP TABLE \`_eventi_privati_v\`;`)
  await db.run(sql`DROP TABLE \`eventi_aziendali_intro_titolo\`;`)
  await db.run(sql`DROP TABLE \`eventi_aziendali_offerte\`;`)
  await db.run(sql`DROP TABLE \`eventi_aziendali_galleria\`;`)
  await db.run(sql`DROP TABLE \`eventi_aziendali\`;`)
  await db.run(sql`DROP TABLE \`_eventi_aziendali_v_version_intro_titolo\`;`)
  await db.run(sql`DROP TABLE \`_eventi_aziendali_v_version_offerte\`;`)
  await db.run(sql`DROP TABLE \`_eventi_aziendali_v_version_galleria\`;`)
  await db.run(sql`DROP TABLE \`_eventi_aziendali_v\`;`)
  await db.run(sql`DROP TABLE \`cucina_intro_titolo\`;`)
  await db.run(sql`DROP TABLE \`cucina_momenti\`;`)
  await db.run(sql`DROP TABLE \`cucina\`;`)
  await db.run(sql`DROP TABLE \`_cucina_v_version_intro_titolo\`;`)
  await db.run(sql`DROP TABLE \`_cucina_v_version_momenti\`;`)
  await db.run(sql`DROP TABLE \`_cucina_v\`;`)
  await db.run(sql`DROP TABLE \`area_living_intro_titolo\`;`)
  await db.run(sql`DROP TABLE \`area_living_spazi\`;`)
  await db.run(sql`DROP TABLE \`area_living_galleria\`;`)
  await db.run(sql`DROP TABLE \`area_living\`;`)
  await db.run(sql`DROP TABLE \`_area_living_v_version_intro_titolo\`;`)
  await db.run(sql`DROP TABLE \`_area_living_v_version_spazi\`;`)
  await db.run(sql`DROP TABLE \`_area_living_v_version_galleria\`;`)
  await db.run(sql`DROP TABLE \`_area_living_v\`;`)
  await db.run(sql`DROP TABLE \`centro_congressi_intro_titolo\`;`)
  await db.run(sql`DROP TABLE \`centro_congressi_scheda_allestimenti\`;`)
  await db.run(sql`DROP TABLE \`centro_congressi_scheda_attrezzature\`;`)
  await db.run(sql`DROP TABLE \`centro_congressi_galleria\`;`)
  await db.run(sql`DROP TABLE \`centro_congressi\`;`)
  await db.run(sql`DROP TABLE \`_centro_congressi_v_version_intro_titolo\`;`)
  await db.run(sql`DROP TABLE \`_centro_congressi_v_version_scheda_allestimenti\`;`)
  await db.run(sql`DROP TABLE \`_centro_congressi_v_version_scheda_attrezzature\`;`)
  await db.run(sql`DROP TABLE \`_centro_congressi_v_version_galleria\`;`)
  await db.run(sql`DROP TABLE \`_centro_congressi_v\`;`)
  await db.run(sql`DROP TABLE \`fascia_finale\`;`)
  await db.run(sql`DROP TABLE \`_fascia_finale_v\`;`)
  await db.run(sql`DROP TABLE \`impostazioni_orari_strutturati_giorni\`;`)
  await db.run(sql`DROP TABLE \`impostazioni_orari_strutturati\`;`)
  await db.run(sql`DROP TABLE \`impostazioni\`;`)
  await db.run(sql`DROP TABLE \`testi_per_pagina\`;`)
  await db.run(sql`DROP TABLE \`testi_modulo_occasioni\`;`)
  await db.run(sql`DROP TABLE \`testi_modulo_formati\`;`)
  await db.run(sql`DROP TABLE \`testi\`;`)
  await db.run(sql`DROP TABLE \`_testi_v_version_per_pagina\`;`)
  await db.run(sql`DROP TABLE \`_testi_v_version_modulo_occasioni\`;`)
  await db.run(sql`DROP TABLE \`_testi_v_version_modulo_formati\`;`)
  await db.run(sql`DROP TABLE \`_testi_v\`;`)
  await db.run(sql`DROP TABLE \`menu_voci\`;`)
  await db.run(sql`DROP TABLE \`menu\`;`)
}
