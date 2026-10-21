import type { ServerProps } from "payload";
import NavLinks, { type VoceNav } from "./NavLinks";

/** Menu laterale come WordPress: una voce per sezione, con icona e tendina a destra. Gli utenti li vede solo l'amministratore. */
export default function NavPagine({ user }: ServerProps) {
  const admin = (user as { ruolo?: string } | undefined)?.ruolo === "amministratore";
  const voci: VoceNav[] = [
    { label: "Bacheca", href: "/admin", icona: "bacheca", ambito: [], sotto: [] },
    {
      label: "Pagine",
      href: "/admin/pagine",
      icona: "pagine",
      ambito: ["/admin/pagine", "/admin/collections/pagine", "/admin/globals/home", "/admin/globals/eventi-privati", "/admin/globals/eventi-aziendali", "/admin/globals/cucina", "/admin/globals/area-living", "/admin/globals/centro-congressi"],
      sotto: [
        { label: "Tutte le pagine", href: "/admin/pagine" },
        { label: "Aggiungi pagina", href: "/admin/collections/pagine/create" },
      ],
    },
    {
      label: "Foto",
      href: "/admin/collections/media",
      icona: "foto",
      ambito: ["/admin/collections/media"],
      sotto: [
        { label: "Libreria", href: "/admin/collections/media" },
        { label: "Aggiungi foto", href: "/admin/collections/media/create" },
      ],
    },
    {
      label: "Richieste",
      href: "/admin/collections/richieste",
      icona: "richieste",
      ambito: ["/admin/collections/richieste"],
      sotto: [{ label: "Tutte le richieste", href: "/admin/collections/richieste" }],
    },
    {
      label: "Impostazioni",
      href: "/admin/impostazioni",
      icona: "impostazioni",
      ambito: ["/admin/impostazioni", "/admin/globals/impostazioni", "/admin/globals/testi", "/admin/globals/menu", "/admin/globals/fascia-finale"],
      sotto: [
        { label: "Impostazioni del sito", href: "/admin/globals/impostazioni" },
        { label: "Testi del sito", href: "/admin/globals/testi" },
        { label: "Menu", href: "/admin/globals/menu" },
        { label: "Fascia finale", href: "/admin/globals/fascia-finale" },
      ],
    },
    ...(admin
      ? ([
          {
            label: "Utenti",
            href: "/admin/collections/users",
            icona: "utenti",
            ambito: ["/admin/collections/users"],
            sotto: [
              { label: "Tutti gli utenti", href: "/admin/collections/users" },
              { label: "Aggiungi utente", href: "/admin/collections/users/create" },
            ],
          },
        ] as VoceNav[])
      : []),
  ];
  return <NavLinks voci={voci} />;
}
