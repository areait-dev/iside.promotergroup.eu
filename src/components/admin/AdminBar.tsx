import Link from "next/link";
import type { ServerProps } from "payload";

/** Barra nera in alto, come la «admin bar» di WordPress: nome del sito, scorciatoia «Nuova pagina» e saluto all'utente. */
export default function AdminBar({ user }: ServerProps) {
  const utente = user as { nome?: string; email?: string } | undefined;
  // Se il nome non è compilato, resta l'email
  const nome = utente?.nome?.trim() || utente?.email;
  const admin = (user as { ruolo?: string } | undefined)?.ruolo === "amministratore";
  return (
    <div className="admin-bar" role="navigation" aria-label="Barra del sito">
      <div className="admin-bar__gruppo">
        <a className="admin-bar__voce admin-bar__voce--sito" href="/" target="_blank" rel="noopener noreferrer">
          Iside<span className="admin-bar__sr"> — visualizza il sito (si apre in una nuova scheda)</span>
        </a>
        <Link className="admin-bar__voce" href="/admin/collections/pagine/create">
          + Nuova pagina
        </Link>
        <Link className="admin-bar__voce" href="/admin/collections/media/create">
          + Nuova foto
        </Link>
        {admin && (
          <Link className="admin-bar__voce" href="/admin/collections/users/create">
            + Nuovo utente
          </Link>
        )}
      </div>
      {nome && (
        <Link className="admin-bar__voce" href="/admin/account">
          Ciao, <strong>{nome}</strong>
        </Link>
      )}
    </div>
  );
}
