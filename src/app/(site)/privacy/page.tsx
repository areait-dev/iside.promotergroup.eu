import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { SITE } from "@/config/site";
import { getLegal } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Dichiarazione sulla privacy — Iside",
  description: "Come trattiamo i dati personali che ci invii attraverso i moduli del sito.",
  alternates: { canonical: "/privacy" },
};

const list = "grid list-disc gap-s2 pl-s5";
const link = "underline underline-offset-4";

/*
 * Testo preso dalla dichiarazione sulla privacy del sito attuale (iside.promotergroup.eu/dichiarazione-sulla-privacy-ue),
 * con due adattamenti al nuovo sito: l'elenco dei dati raccolti comprende anche i campi del modulo di preventivo
 * (data, ospiti, tipo di evento, messaggio) e il rimando ai cookie punta alla nuova pagina /cookie.
 * Da far rivedere al titolare / consulente.
 */
export default async function Privacy() {
  const LEGAL = await getLegal();
  return (
    <LegalPage
      title="Dichiarazione sulla privacy"
      intro={
        <>
          <p>
            Questa dichiarazione sulla privacy è stata aggiornata l’ultima volta il {LEGAL.updatedAt} e si applica ai cittadini e ai
            residenti permanenti legali dello Spazio Economico Europeo e della Svizzera.
          </p>
          <p className="mt-s3">
            In questa dichiarazione sulla privacy, spieghiamo cosa facciamo con i tuoi dati che otteniamo attraverso {SITE.url}. Ti
            consigliamo di leggere attentamente la dichiarazione. Durante l’elaborazione rispettiamo i requisiti della legislazione sulla
            privacy. Ciò significa, tra le altre cose, che:
          </p>
          <ul className={`${list} mt-s3`}>
            <li>comunichiamo chiaramente il motivo per il quale processiamo dati personali. Facciamo questo per mezzo di questa dichiarazione sulla privacy;</li>
            <li>miriamo a limitare la raccolta di dati personali solo ai dati personali richiesti per scopi legittimi;</li>
            <li>prima chiediamo il tuo esplicito consenso per processare i tuoi dati personali nei casi che richiedono il tuo consenso;</li>
            <li>
              adottiamo misure di sicurezza appropriate per proteggere i tuoi dati personali e lo richiediamo anche da parti che elaborano
              dati personali per nostro conto;
            </li>
            <li>rispettiamo il tuo diritto di accesso ai tuoi dati personali o di averli corretti o cancellati, su tua richiesta.</li>
          </ul>
          <p className="mt-s3">Se hai domande o vuoi sapere esattamente quali dati conserviamo, contattaci.</p>
        </>
      }
      sections={[
        {
          heading: "1. Scopo, dati e periodo di conservazione",
          body: (
            <>
              <p>
                Possiamo raccogliere o ricevere informazioni personali per una serie di scopi legati alle nostre operazioni commerciali
                che possono includere quanto segue:
              </p>
              <h3 className="font-display text-lg font-bold text-ink">1.1 Contatto — tramite telefono, posta, email e/o moduli web</h3>
              <p>Per questo scopo usiamo i seguenti dati:</p>
              <ul className={list}>
                <li>un nome e cognome</li>
                <li>un indirizzo email</li>
                <li>un numero di telefono</li>
                <li>la data dell’evento, il numero di ospiti e il tipo di evento indicati nel modulo di richiesta</li>
                <li>il testo che scrivi nei campi facoltativi del modulo (messaggio, necessità tecniche)</li>
              </ul>
              <p>La base con la quale processiamo i dati è: su disposizione del consenso.</p>
              <p>
                <strong className="text-ink">Periodo di conservazione.</strong> {LEGAL.retention}
              </p>
            </>
          ),
        },
        {
          heading: "2. Cookie",
          body: (
            <p>
              Il nostro sito web usa cookie. Per ulteriori informazioni riguardo i cookie, per favore fai riferimento alla nostra{" "}
              <Link href="/cookie" className={link}>
                Cookie Policy
              </Link>
              .
            </p>
          ),
        },
        {
          heading: "3. Pratiche di divulgazione",
          body: (
            <>
              <p>
                Comunichiamo informazioni personali se ci viene richiesto dalla legge o da un ordine del tribunale, in risposta a
                un’autorità incaricata dell’applicazione della legge, nella misura consentita da altre disposizioni di legge, per fornire
                informazioni o per un’indagine su una questione relativa alla sicurezza pubblica.
              </p>
              <p>
                Se il nostro sito Web o organizzazione viene rilevato, venduto o coinvolto in una fusione o acquisizione, i tuoi dati
                potrebbero essere divulgati ai nostri consulenti e a eventuali potenziali acquirenti e saranno trasmessi ai nuovi
                proprietari.
              </p>
              <p>{LEGAL.recipients}</p>
            </>
          ),
        },
        {
          heading: "4. Sicurezza",
          body: (
            <p>
              Ci impegniamo per la sicurezza dei dati personali. Prendiamo adeguate misure di sicurezza per limitare l’abuso e l’accesso
              non autorizzato ai dati personali. Ciò garantisce che solo le persone necessarie abbiano accesso ai tuoi dati, che l’accesso
              ai dati sia protetto e che le nostre misure di sicurezza vengano regolarmente riviste.
            </p>
          ),
        },
        {
          heading: "5. Siti web di terze parti",
          body: (
            <p>
              Questa dichiarazione sulla privacy non si applica ai siti web di terzi collegati tramite link sul nostro sito web. Non
              possiamo garantire che queste terze parti gestiscano i vostri dati personali in modo affidabile e sicuro. Vi consigliamo di
              leggere le dichiarazioni sulla privacy di questi siti web prima di utilizzarli.
            </p>
          ),
        },
        {
          heading: "6. Ammende riguardo questa dichiarazione della privacy",
          body: (
            <p>
              Ci riserviamo il diritto di apportare modifiche alla presente dichiarazione sulla privacy. Si raccomanda di consultare
              regolarmente questa dichiarazione sulla privacy per essere a conoscenza di eventuali modifiche. Inoltre, ti informeremo
              attivamente laddove possibile.
            </p>
          ),
        },
        {
          heading: "7. Accesso e modifica dei tuoi dati",
          body: (
            <>
              <p>
                Se hai domande o vuoi sapere esattamente quali tuoi dati sono in nostro possesso, contattaci. Potrai contattarci usando le
                informazioni presenti qui sotto. Hai i seguenti diritti:
              </p>
              <ul className={list}>
                <li>Hai il diritto di sapere quando i tuoi dati personali sono necessari, cosa succede ad essi, quanto a lungo verranno mantenuti.</li>
                <li>Diritto di accesso: hai il diritto ad accedere ai tuoi dati personali dei quali siamo a conoscenza.</li>
                <li>Diritto di rettifica: hai il diritto di completare, correggere, cancellare o bloccare i tuoi dati personali quando lo desideri.</li>
                <li>
                  Diritto di trasferire i tuoi dati: hai il diritto di richiedere tutti i tuoi dati dal controllore e trasferirli tutti quanti
                  ad un altro controllore.
                </li>
                <li>
                  Diritto di obiezione: hai il diritto di obiezione verso il processo dei tuoi dati. Noi rispetteremo questa scelta, a meno
                  che non ci siano delle basi valide per il processo.
                </li>
              </ul>
              <p>Se hai domande o problemi relativi all’accessibilità del sito web, per favore non esitare a contattarci.</p>
              <p>
                Assicurati di segnalare sempre in modo chiaro chi sei, così da essere certi di non cancellare o modificare i dati di una
                persona sbagliata.
              </p>
            </>
          ),
        },
        {
          heading: "8. Invio di un reclamo",
          body: (
            <p>
              Se non sei soddisfatto di come gestiamo (una lamentela su) il processo dei tuoi dati personali, hai il diritto di spedire un
              reclamo al Garante per la protezione dei dati personali.
            </p>
          ),
        },
        {
          heading: "9. Dettagli contatti",
          body: (
            <address className="grid gap-s1 not-italic">
              <span className="font-semibold text-ink">{LEGAL.controller}</span>
              <span>{LEGAL.controllerAddress}</span>
              <span>
                Sito web:{" "}
                <a className={link} href={SITE.url}>
                  {SITE.url}
                </a>
              </span>
              <span>
                Email:{" "}
                <a className={link} href={`mailto:${LEGAL.privacyEmail}`}>
                  {LEGAL.privacyEmail}
                </a>
              </span>
              <span>
                Numero di telefono:{" "}
                <a className={link} href={`tel:${LEGAL.phone.e164}`}>
                  {LEGAL.phone.display}
                </a>
              </span>
            </address>
          ),
        },
      ]}
    />
  );
}
