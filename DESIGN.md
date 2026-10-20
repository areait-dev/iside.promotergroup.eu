# Iside — Events | Lounge | Living · DESIGN.md

> Guida di design e implementazione per il restyling di https://iside.promotergroup.eu
> Base strutturale: estrazione del template Meridian (Next.js), riadattata al brand e ai contenuti Iside.
> Stack previsto: Next.js (App Router) + TypeScript + Tailwind CSS.

## Mission
Creare un sito **mobile-first** per Iside, basato su token, che metta in evidenza la struttura (soprattutto gli **spazi esterni** e la **zona bordo piscina coperta da ~70 persone**) e che porti ogni visitatore, in pochi tocchi, al proprio percorso di accesso: **feste private**, **pranzo giornaliero**, **eventi aziendali** (convegni e non convegnistici).

## Brand
- Brand: **Iside — Events | Lounge | Living**, brand di Promotergroup S.p.A. (gestione Promoter srl)
- URL attuale: https://iside.promotergroup.eu (WordPress + Elementor → da sostituire)
- Luogo: Valle dell'Ippari, vicino all'aeroporto di Comiso e a Vittoria (RG)
- Pubblico:
  - privati che organizzano una festa (compleanni, lauree, battesimi, anniversari)
  - chi lavora o passa in zona e cerca un **pranzo** all'aperto
  - aziende e organizzatori (convegni, seminari, conferenze stampa, cene aziendali, team building, networking)
- Superficie: sito vetrina + richiesta di prenotazione, **fruito per lo più da smartphone** (traffico da social e WhatsApp)
- Contatti reali: tel. **0932 1618964** · **iside@promotergroup.eu** · Instagram `iside_events` · Facebook · LinkedIn (showcase isideevents)

## Contenuti di riferimento (fonte: sito attuale)
| Spazio | Uso | Capienza |
|---|---|---|
| Bordo piscina coperto (**novità**) | feste, pranzo, cene aziendali | **~70 persone** |
| Piscina + giardino + gazebi (area living) | feste, aperitivi, eventi all'aperto | [DA CONFERMARE] |
| Centro Congressi "Davide Failla" | convegni, seminari, conferenze stampa | **fino a 200** |

Dati mancanti, da segnare sempre come segnaposto `[DA CONFERMARE]` e mai inventare: orari e giorni del pranzo, menu e prezzi, indirizzo completo, capienza giardino, servizi inclusi (catering, audio/video, parcheggio).

Foto disponibili: `wp-content/uploads/2024/07/` → droni `DJI_0099`, `DJI_0092` (hero, vista dall'alto della piscina); `SAL5955`–`SAL6380` (galleria). Ogni immagine **must** avere un `alt` descrittivo in italiano (oggi sono tutti vuoti).

## Style Foundations
- Stile visivo: luminoso, all'aperto, foto a tutto schermo, testi brevi; pietra calcarea, acqua della piscina, sole siciliano.
- Font:
  - `font.family.display=Bricolage Grotesque` (titoli, peso 600–700)
  - `font.family.primary=Inter`, `font.family.stack=Inter, system-ui, sans-serif`
  - `font.size.base=16px`, `font.weight.base=400`, `font.lineHeight.base=24px`
- Scala tipografica (mobile → ≥1024px):
  - `font.size.xs=12px`, `font.size.sm=14px`, `font.size.md=16px`, `font.size.lg=20px`, `font.size.xl=24px`, `font.size.2xl=32px`, `font.size.3xl=40px → 64px` (solo hero; sostituisce il `300px` dell'estrazione Meridian, non utilizzabile su mobile)
- Palette (**proposta**: verificare sul logo `iside_dx_1.svg` e sostituire gli hex se il brand ha colori propri):
  - `color.surface.base=#F6F4EE` (calcare, fondo pagine)
  - `color.surface.raised=#FFFFFF` (card)
  - `color.surface.strong=#13282B` (notte: header su foto, footer, barra azioni)
  - `color.accent.water=#1D6B70` (acqua: pulsanti primari, link)
  - `color.accent.sun=#E3A92B` (sole: badge "Novità", evidenze; **solo come fondo**, mai come testo su chiaro)
  - `color.text.primary=#13282B`, `color.text.secondary=#4E5F61`, `color.text.inverse=#FFFFFF`
  - `color.border.default=#D9DED9`, `color.border.muted=rgba(19,40,43,0.12)`
  - `color.state.error=#B42318`, `color.state.success=#1F7A4D`
  - Contrasti verificati: `text.secondary` su `surface.base` ≈ 6:1 · bianco su `accent.water` ≈ 6.2:1 · `text.primary` su `accent.sun` ≈ 7.3:1. ✗ `accent.sun` su `surface.base` ≈ 2:1 → vietato per testo.
- Spaziature: `space.1=8px`, `space.2=10px`, `space.3=12px`, `space.4=16px`, `space.5=20px`, `space.6=24px`, `space.7=32px`, `space.8=48px`, `space.9=64px`
  - Margine laterale pagina: `space.4` (mobile), `space.7` (≥768px); contenuto max 1200px.
- Radius: `radius.xs=8px`, `radius.md=16px` (card, foto), `radius.pill=9999px` (pulsanti, chip; sostituisce `33554400px`)
- Ombre: `shadow.card=0 1px 2px rgba(19,40,43,.06), 0 8px 24px rgba(19,40,43,.08)`
- Motion: `motion.duration.instant=150ms`, `fast=200ms`, `normal=250ms`, `slow=300ms`, `slower=400ms`, `step6=600ms`; easing `cubic-bezier(.2,.7,.2,1)`. Ogni animazione **must** rispettare `prefers-reduced-motion`.
- Breakpoint: `sm=390px` (riferimento di progetto), `md=768px`, `lg=1024px`, `xl=1280px`. Si progetta a 390px e si allarga, mai il contrario.

## Architettura delle pagine
1. **Home** (una pagina lunga, ancore):
   Hero (foto drone piscina) → Numeri chiave (~70 coperti · fino a 200 congressi · giardino e gazebi) → **Come vuoi viverla?** (selettore 3 percorsi) → **Gli spazi** (bordo piscina coperto in evidenza, poi piscina, giardino, gazebi, Centro Congressi) → Capienze a colpo d'occhio → Galleria → Dove siamo → Contatti/Footer.
2. **/feste-private**, **/pranzo**, **/eventi-aziendali** (con sottosezioni *Convegni & formazione* e *Eventi & networking*): pagine di approdo per campagne social, ognuna con il suo modulo precompilato.
3. **/prenota**: modulo unico, con il tipo di richiesta preselezionato da query `?tipo=feste|pranzo|aziende`.
4. **/gruppi** (Libroterapia, Parola per genitori, Crescita personale): contenuto esistente, spostato fuori dalla navigazione principale.

## Component Rules

### Header
- Anatomia: logo Iside · pulsante "Chiama" (icona + label nascosta visivamente) · pulsante menu.
- Mobile: alto 56px, trasparente sull'hero e `surface.strong` dopo 80px di scroll. Il menu si apre a schermo intero e **must** intrappolare il focus, chiudersi con `Esc` e restituire il focus al pulsante.
- Stati: default, hover (desktop), focus-visible, menu aperto.

### Hero
- Foto `DJI_0099` a tutta larghezza, altezza `min(88svh, 720px)`, velo `surface.strong` al 45% per il contrasto del testo.
- Titolo `font.size.3xl` display, max 2 righe a 390px; sottotitolo max 2 righe.
- CTA primaria "Richiedi disponibilità" → `/prenota`; secondaria "Scopri gli spazi" → `#spazi`.
- L'immagine **must** usare `next/image` con `priority` e `sizes="100vw"`; LCP < 2.5s su 4G.

### Selettore percorsi ("Come vuoi viverla?")
- Tre tab: **Feste private** · **Pranzo** · **Aziende**. Pattern ARIA `tablist` / `tab` / `tabpanel`.
- Tastiera: frecce sx/dx tra le tab, `Home`/`End`, attivazione automatica. Touch: tap, area minima 44×44px. A 390px le tab **must** stare su una riga (label corte).
- Ogni pannello: occhiello, titolo, 2 righe di testo, 3 dati chiave (spazio · capienza · orario/servizi), CTA che apre `/prenota?tipo=…`.
- Il pannello Aziende **must** separare *Convegni & formazione* (Centro Congressi, fino a 200) da *Eventi & networking* (area living e piscina, ~70 coperti).
- Stati tab: default, hover, focus-visible, selected (fondo `accent.water`, testo inverse), disabled (non previsto).
- L'URL **should** riflettere la tab (`#feste`, `#pranzo`, `#aziende`) per poterla linkare dai social.

### Card spazio
- Anatomia: foto 4:3 (`radius.md`), badge opzionale ("Novità" su `accent.sun`), nome, capienza, 1 riga di uso, link "Vedi lo spazio".
- La card del **bordo piscina coperto** è la prima e a tutta larghezza; le altre stanno in griglia 1 colonna (390px) → 2 (768px) → 4 (1280px).
- Tutta la card è cliccabile tramite un solo `<a>` (niente link annidati). Stati: default, hover (zoom foto 1.03, `motion.fast`), focus-visible (outline su tutta la card), active.
- Contenuti lunghi: nome max 2 righe con troncamento; capienza mancante → "[DA CONFERMARE]" in dev, nascosta in produzione.

### Tabella capienze
- `<table>` vera con `<caption>`; a 390px resta su 3 colonne (Spazio · Formato · Ospiti). Se servono più colonne, scroll orizzontale in un contenitore con `tabindex="0"` e etichetta.

### Galleria
- Griglia 2 colonne (mobile) → 3 (≥768px), foto `radius.xs`. Il tap apre un lightbox con swipe, frecce da tastiera, `Esc` per chiudere e contatore "3 / 12".
- Lazy loading per tutte le foto tranne le prime 4. Senza foto → la sezione non compare.

### Barra azioni fissa (solo mobile)
- In basso, `surface.strong`, 64px + `env(safe-area-inset-bottom)`: **Chiama** (`tel:+3909321618964`) · **WhatsApp** [NUMERO DA CONFERMARE] · **Prenota** (primario).
- Compare dopo l'hero e si nasconde quando la tastiera è aperta o quando il footer è visibile. Non deve coprire contenuti: aggiungere un padding inferiore equivalente al `<main>`.

### Modulo di richiesta (/prenota)
- Campi: tipo di richiesta (chip radio: Festa privata / Pranzo / Evento aziendale) · data · numero ospiti · nome · telefono · email · messaggio · consenso privacy (obbligatorio).
- I campi condizionali **should** cambiare in base al tipo: Pranzo → fascia oraria; Aziende → formato (convegno / cena / team building / altro) e necessità tecniche.
- Ogni `<input>` **must** avere `<label>` visibile, `autocomplete` corretto, `inputmode` (tel, email, numeric) e messaggi di errore collegati con `aria-describedby`.
- Stati: default, focus-visible, compilato, errore (bordo e testo `state.error` + icona + testo, mai solo colore), disabled, **loading** (pulsante con spinner e label "Invio in corso…"), successo (pagina "Grazie!" con riepilogo e tempi di risposta).
- Ospiti > 70 con tipo "Festa" o "Pranzo" → avviso inline: "Oltre 70 ospiti usiamo anche il giardino: ti ricontattiamo per i dettagli."

### Footer
- Logo, contatti cliccabili (tel, mail), social, link a /gruppi, privacy e cookie, "Iside è un brand di Promotergroup S.p.A. — Promoter srl, P.IVA 01376750889".

## Accessibilità (WCAG 2.2 AA)
Criteri verificabili, ognuno pass/fail:
- [ ] Testo normale ≥ 4.5:1, testo grande e icone ≥ 3:1 (verifica con axe o Lighthouse).
- [ ] Ogni elemento interattivo è raggiungibile con `Tab` in ordine logico e ha un focus visibile: outline 2px `accent.water` + offset 2px; su fondi scuri outline bianco.
- [ ] Target touch ≥ 44×44px (2.5.8 richiede ≥ 24px; noi teniamo 44).
- [ ] Nessun contenuto coperto dalla barra fissa o dall'header quando un elemento riceve il focus (2.4.11).
- [ ] Il sito funziona a 320px senza scroll orizzontale e con zoom al 200%.
- [ ] Tutte le foto informative hanno un `alt`; quelle decorative hanno `alt=""`.
- [ ] `lang="it"` su `<html>`; un solo `<h1>` per pagina; titoli in ordine.
- [ ] Il modulo è compilabile e inviabile solo da tastiera, e gli errori sono annunciati (`aria-live="polite"`).

## Tono e testi
Diretto, caldo, concreto. Frasi brevi, seconda persona ("la tua festa"), niente superlativi vuoti.
- ✓ "Bordo piscina coperto: fino a 70 ospiti, anche se piove."
- ✓ "Pranzo all'aperto, a due passi da Vittoria."
- ✗ "Un'esperienza unica e indimenticabile per i tuoi eventi."
- CTA sempre esplicite: "Richiedi un preventivo", "Prenota un tavolo", "Organizza il tuo evento". Mai "Clicca qui" o "Scopri di più" senza oggetto.
- Numeri: "~70" o "circa 70" (mai "70+" finché la capienza non è confermata).

## Anti-pattern vietati
- Testo su foto senza velo o con contrasto non verificato.
- `accent.sun` usato come colore di testo su fondi chiari.
- Carousel automatici nell'hero; video in autoplay con audio.
- Popup all'apertura (newsletter, promo) su mobile.
- Dati inventati (prezzi, orari, recensioni, capienze non confermate).
- Spaziature o font fuori scala, `!important` per correggere layout.
- Link annidati nelle card; `div` cliccabili al posto di `<a>` o `<button>`.
- Menu che dipendono dall'hover.

## Note di migrazione da WordPress
- Redirect 301 dalle vecchie URL (pagine dei gruppi, pagina "Grazie") alle nuove.
- Mantenere GTM (`GTM-MSM7C362`) e Meta Pixel, caricati **solo dopo il consenso** (CMP compatibile IAB TCF, come oggi).
- Sostituire il link esterno `develop.madroom.it/iside-booking/` con `/prenota`, oppure incorporarlo se resta il gestionale ufficiale [DA DECIDERE].
- Esportare le foto originali in alta risoluzione e convertirle in AVIF/WebP tramite `next/image`.
- Open Graph: immagine 1200×630 dalla foto drone, titolo e descrizione per ogni pagina.

## QA checklist
- [ ] Testato su iPhone (Safari) e Android (Chrome) reali a 360–430px.
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility 100, Best Practices ≥ 95, SEO 100.
- [ ] I tre percorsi sono raggiungibili dalla home in ≤ 2 tocchi.
- [ ] Chiama, mail e WhatsApp aprono l'app corretta.
- [ ] Il modulo invia, mostra errori e conferma; il tipo arriva preselezionato dai link.
- [ ] Nessun `[DA CONFERMARE]` resta visibile in produzione.
- [ ] Tutti i componenti hanno gli stati default, hover, focus-visible, active, disabled, loading ed error dove applicabili.
- [ ] Cookie banner: nessun tracciamento prima del consenso.

## Quality gates
- Ogni regola non negoziabile usa "must"; ogni raccomandazione usa "should".
- Ogni regola di accessibilità è verificabile in implementazione.
- La coerenza del sistema prevale sulle eccezioni visive locali.
