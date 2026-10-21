/** Link «Visualizza il sito» in fondo al menu del pannello, come in WordPress. */
export default function ViewSiteLink() {
  return (
    <a href="/" target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "0.75rem 0", fontWeight: 600 }}>
      Visualizza il sito ↗
    </a>
  );
}
