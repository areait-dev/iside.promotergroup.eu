/** Link per tornare al sito, sotto il modulo di accesso (come il «Torna indietro» del modello di login). */
export default function BackToSite() {
  return (
    <p className="login-back">
      {/* link normale: il sito ha un layout radice diverso da quello del pannello */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a href="/">← Torna al sito</a>
    </p>
  );
}
