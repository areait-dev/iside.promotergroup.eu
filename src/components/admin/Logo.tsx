/** Logo Iside nella pagina di accesso al pannello. */
export default function Logo() {
  // eslint-disable-next-line @next/next/no-img-element -- grafica del pannello, fuori dal sito
  return <img src="/images/iside-logo-blu.svg" alt="Iside — Events | Lounge | Living" width={220} height={62} style={{ height: "auto", maxWidth: "100%" }} />;
}
