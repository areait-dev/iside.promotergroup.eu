import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { LEGAL, SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Cookie policy — Iside",
  description: "Quali cookie usa il sito di Iside e come gestirli.",
  alternates: { canonical: "/cookie" },
};

const list = "grid list-disc gap-s2 pl-s5";
const link = "underline underline-offset-4";

/*
 * Parti generali (definizioni, diritti, contatti) prese dalla cookie policy del sito attuale
 * (iside.promotergroup.eu/cookie-policy-ue). L'elenco dei cookie di quel sito (WordPress, Elementor, Complianz,
 * Google Analytics, Facebook Pixel, reCAPTCHA, Google Fonts) NON è stato riportato: il nuovo sito non li usa.
 * Le sezioni 5, 6 e 7 descrivono ciò che il nuovo sito fa davvero: la mappa Google si carica da sola (vedi src/components/MapEmbed.tsx).
 * Quando verranno aggiunti Google Tag Manager, Google Analytics o Meta Pixel con un banner di consenso,
 * vanno aggiornate le sezioni 5.2, 5.3, 6 e 7.
 */
export default function Cookie() {
  return (
    <LegalPage
      title="Cookie policy"
      intro={
        <p>
          Questa politica sui cookie è stata aggiornata l’ultima volta il {LEGAL.updatedAt} e si applica ai cittadini e ai residenti
          permanenti legali dello Spazio Economico Europeo e della Svizzera.
        </p>
      }
      sections={[
        {
          heading: "1. Introduzione",
          body: (
            <p>
              Il nostro sito web, {SITE.url} (di seguito: “il sito web”) utilizza i cookie e altre tecnologie correlate (per comodità
              tutte le tecnologie sono definite “cookie”). I cookie vengono anche inseriti da terze parti che abbiamo ingaggiato. Nel
              documento sottostante ti informiamo sull’uso dei cookie sul nostro sito web.
            </p>
          ),
        },
        {
          heading: "2. Cosa sono i cookie?",
          body: (
            <p>
              I cookie sono dei semplici file spediti assieme alle pagine di questo sito e salvati dal tuo browser sul disco rigido del
              tuo computer o altri dispositivi. Le informazioni raccolte in essi possono venire rispediti ai nostri server oppure ai
              server di terze parti durante la prossima visita.
            </p>
          ),
        },
        {
          heading: "3. Cosa sono gli script?",
          body: (
            <p>
              Uno script è un pezzo di codice usato per far funzionare correttamente ed interattivamente il nostro sito. Questo codice
              viene eseguito sui nostri server o sul tuo dispositivo.
            </p>
          ),
        },
        {
          heading: "4. Cos’è un web beacon?",
          body: (
            <p>
              Un web beacon (o pixel tag) è un piccolo, invisibile pezzo di testo o immagine su un sito che viene usato per monitorare il
              traffico di un sito web. Per fare questo, diversi dati su di te vengono conservati utilizzando dei web beacon.
            </p>
          ),
        },
        {
          heading: "5. Cookie",
          body: (
            <>
              <h3 className="font-display text-lg font-bold text-ink">5.1 Cookie tecnici o funzionali</h3>
              <p>
                Alcuni cookie assicurano il corretto funzionamento del sito e che le tue preferenze rimangano valide. Piazzando cookie
                funzionali, rendiamo più facile per te visitare il nostro sito web. In questo modo non devi inserire ripetutamente le
                stesse informazioni quando visiti il nostro sito web. Possiamo piazzare questi cookie senza il tuo consenso.
              </p>
              <p>Il sito non imposta cookie propri e non salva preferenze nel tuo browser.</p>
              <h3 className="font-display text-lg font-bold text-ink">5.2 Cookie statistici</h3>
              <p>
                Utilizziamo i cookie statistici per ottimizzare l’esperienza del sito web per i nostri utenti. Con questi cookie statistici
                otteniamo approfondimenti sull’uso del nostro sito web. Chiediamo il tuo permesso per piazzare cookie statistici. Al momento
                il sito non ne usa.
              </p>
              <h3 className="font-display text-lg font-bold text-ink">5.3 Cookie di marketing/tracciamento</h3>
              <p>
                I cookie di marketing/tracciamento sono cookie o qualsiasi altra forma di memorizzazione locale, utilizzati per creare
                profili utente per visualizzare pubblicità o per tracciare l’utente su questo sito web o su diversi siti web per scopi di
                marketing simili. Al momento il sito non ne usa; se li attiveremo, chiederemo prima il tuo permesso.
              </p>
            </>
          ),
        },
        {
          heading: "6. Cookie presenti",
          body: (
            <>
              <h3 className="font-display text-lg font-bold text-ink">Google Maps</h3>
              <dl className="grid gap-s2">
                <div>
                  <dt className="font-semibold text-ink">Categoria</dt>
                  <dd>Terze parti</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Utilizzo</dt>
                  <dd>Usiamo Google Maps per mostrare la mappa nella sezione Contatti.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Condivisione dei dati</dt>
                  <dd>Per ulteriori informazioni, si prega di leggere la dichiarazione sulla privacy di Google Maps.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Nome</dt>
                  <dd>Google Maps API</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Scadenza</dt>
                  <dd>nessuno</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Funzione</dt>
                  <dd>Richiedere l’indirizzo IP dell’utente</dd>
                </div>
              </dl>
              <p>
                La mappa nella sezione Contatti è fornita da Google e si carica da sola quando scorri fino a quella sezione. Quando si
                carica, Google può impostare propri cookie e trattare i dati di navigazione secondo la propria informativa.
              </p>
            </>
          ),
        },
        {
          heading: "7. Consenso",
          body: (
            <>
              <p>
                Il sito non mostra un banner per i cookie: i soli cookie presenti sono quelli di Google che la mappa può impostare quando
                si carica. Se non vuoi riceverli, puoi bloccare i cookie di terze parti dalle impostazioni del browser.
              </p>
              <p>
                Puoi disabilitare i cookie attraverso il tuo browser, ma prendi in considerazione che il nostro sito web potrebbe non
                funzionare più correttamente.
              </p>
            </>
          ),
        },
        {
          heading: "8. Abilitare/disabilitare e cancellazione cookie",
          body: (
            <>
              <p>
                Puoi usare il tuo browser per cancellare automaticamente o manualmente i cookie. È anche possibile specificare che
                determinati cookie non possono essere piazzati. Un’altra opzione è quella di modificare le impostazioni del tuo browser
                internet in modo da ricevere un messaggio ogni volta che viene inserito un cookie. Per ulteriori informazioni su queste
                opzioni, consultare le istruzioni nella sezione Guida del tuo browser.
              </p>
              <p>
                Tieni presente che il nostro sito web potrebbe non funzionare correttamente se tutti i cookie sono disabilitati. Se
                cancelli i cookie nel vostro browser, essi verranno nuovamente inseriti dopo il consenso fornito quando visiterete nuovamente
                il nostro sito web.
              </p>
            </>
          ),
        },
        {
          heading: "9. I tuoi diritti con rispetto ai dati personali",
          body: (
            <>
              <p>Hai i seguenti diritti relativi ai tuoi dati personali:</p>
              <ul className={list}>
                <li>Hai il diritto di sapere quando i tuoi dati personali sono necessari, cosa succede ad essi, quanto a lungo verranno mantenuti.</li>
                <li>Diritto di accesso: hai il diritto ad accedere ai tuoi dati personali dei quali siamo a conoscenza.</li>
                <li>Diritto di rettifica: hai il diritto di completare, correggere, cancellare o bloccare i tuoi dati personali quando lo desideri.</li>
                <li>Se ci darai il consenso per elaborare i tuoi dati, hai il diritto di revocare questo consenso e di eliminare i tuoi dati personali.</li>
                <li>
                  Diritto di trasferire i tuoi dati: hai il diritto di richiedere tutti i tuoi dati dal controllore e trasferirli tutti quanti
                  ad un altro controllore.
                </li>
                <li>
                  Diritto di obiezione: hai il diritto di obiezione verso il processo dei tuoi dati. Noi rispetteremo questa scelta, a meno
                  che non ci siano delle basi valide per il processo.
                </li>
              </ul>
              <p>
                Per esercitare questi diritti, non esitate a contattarci. Si prega di fare riferimento ai dettagli di contatto in fondo a
                questa Cookie Policy. Se hai un reclamo su come gestiamo i tuoi dati, vorremmo sentirti, ma hai anche il diritto di
                presentare un reclamo all’autorità di vigilanza (l’Autorità per la Protezione dei Dati). Per i dati personali raccolti con i
                moduli vedi la{" "}
                <Link href="/privacy" className={link}>
                  dichiarazione sulla privacy
                </Link>
                .
              </p>
            </>
          ),
        },
        {
          heading: "10. Dettagli contatti",
          body: (
            <>
              <p>
                Per domande e/o commenti riguardo la Cookie Policy e questa dichiarazione, per favore contattaci usando i seguenti dati di
                contatto:
              </p>
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
            </>
          ),
        },
      ]}
    />
  );
}
