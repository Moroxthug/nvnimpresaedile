// Pagine root del sito — NVN Impresa Edile (design RBA Edilizia)
const L = require('./lib');

// Placeholder foto in attesa degli scatti reali dei cantieri (palette RBA).
// TODO FOTO: quando il cliente fornisce le immagini, sostituire i div .ph-block con <img>.
const PH_CSS = `
.ph-block{background:linear-gradient(135deg,#e9e2d6 0%,#d8cdba 100%);display:flex;align-items:center;justify-content:center;}
.ph-block i{font-size:42px;color:rgba(163,90,53,0.45);}`;

const INTRO_CSS = `
.intro-section{max-width:860px;margin:60px auto 0;padding:0 20px;}
.intro-section p{font-size:15px;color:#555;line-height:1.9;margin-bottom:18px;}
.intro-section strong{color:#a35a35;}
.intro-section a{color:#a35a35;text-decoration:none;font-weight:700;}`;

const SERVIZI_GRID_CSS = `
.servizi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;max-width:1100px;margin:60px auto 0;padding:0 20px;}
.servizio-card-z{background:#f9f6f1;padding:28px 24px;border-top:3px solid #a35a35;}
.servizio-card-z i{font-size:24px;color:#a35a35;margin-bottom:14px;display:block;}
.servizio-card-z h3{font-size:14px;letter-spacing:1.5px;text-transform:uppercase;color:#33291f;margin-bottom:8px;}
.servizio-card-z p{font-size:13px;color:#777;line-height:1.75;margin-bottom:12px;}
.servizio-card-z a{font-size:12px;color:#a35a35;letter-spacing:1px;text-transform:uppercase;text-decoration:none;font-weight:700;}`;

// Form → WhatsApp: compone il messaggio e apre la chat, poi mostra la conferma
const FORM_JS = `
function nvnSendWhatsApp(prefix, formEl, successEl){
  const fields=['nome','cognome','telefono','email','tipo'];
  const allFilled=fields.every(f=>{const el=document.getElementById(prefix+f);return el&&el.value.trim()!=='';});
  if(!allFilled){alert('Per favore compila tutti i campi obbligatori.');return;}
  const v=f=>{const el=document.getElementById(prefix+f);return el?el.value.trim():'';};
  let msg='Ciao NVN Impresa Edile! Vorrei un preventivo.'+"\\n"
    +'Nome: '+v('nome')+' '+v('cognome')+"\\n"
    +'Telefono: '+v('telefono')+"\\n"
    +'Email: '+v('email')+"\\n"
    +'Tipo di lavoro: '+v('tipo')
    +(v('messaggio')?"\\n"+'Messaggio: '+v('messaggio'):'');
  window.open('${L.S.wa}?text='+encodeURIComponent(msg),'_blank');
  formEl.style.display='none';
  successEl.style.display='block';
}`;

const TIPO_OPTIONS = `
            <option value="" disabled selected>Seleziona un servizio</option>
            <option value="Ristrutturazione completa">Ristrutturazione completa</option>
            <option value="Ristrutturazione bagno">Ristrutturazione bagno</option>
            <option value="Tetto in legno">Tetto in legno</option>
            <option value="Cappotto termico">Cappotto termico</option>
            <option value="Rifacimento facciata">Rifacimento facciata</option>
            <option value="Cartongesso">Cartongesso</option>
            <option value="Imbiancatura">Imbiancatura</option>
            <option value="Pavimenti e rivestimenti">Pavimenti e rivestimenti</option>
            <option value="Altro">Altro</option>`;

function inlineForm(idPrefix) {
  return `
    <div id="preventivo" class="inline-prev-wrap reveal">
      <h2 class="inline-prev-title">RICHIEDI UN PREVENTIVO GRATUITO</h2>
      <div class="contattaci-divider"></div>
      <form id="${idPrefix}Form" class="inline-prev-form" novalidate>
        <div class="inline-prev-row">
          <div class="inline-prev-field">
            <label for="${idPrefix}-nome">Nome *</label>
            <input type="text" id="${idPrefix}-nome" name="nome" placeholder="Mario" required>
          </div>
          <div class="inline-prev-field">
            <label for="${idPrefix}-cognome">Cognome *</label>
            <input type="text" id="${idPrefix}-cognome" name="cognome" placeholder="Rossi" required>
          </div>
        </div>
        <div class="inline-prev-row">
          <div class="inline-prev-field">
            <label for="${idPrefix}-telefono">Telefono *</label>
            <input type="tel" id="${idPrefix}-telefono" name="telefono" placeholder="+39 000 000 0000" required>
          </div>
          <div class="inline-prev-field">
            <label for="${idPrefix}-email">Email *</label>
            <input type="email" id="${idPrefix}-email" name="email" placeholder="mario@email.it" required>
          </div>
        </div>
        <div class="inline-prev-field">
          <label for="${idPrefix}-tipo">Tipo di lavoro *</label>
          <select id="${idPrefix}-tipo" name="tipo" required>${TIPO_OPTIONS}
          </select>
        </div>
        <div class="inline-prev-field">
          <label for="${idPrefix}-messaggio">Messaggio</label>
          <textarea id="${idPrefix}-messaggio" name="messaggio" placeholder="Descrivi brevemente il tuo progetto o le tue esigenze..."></textarea>
        </div>
        <button type="submit" class="prev-submit-btn">Invia richiesta</button>
        <p style="font-size:12px;color:#999;margin-top:10px;text-align:center;">La richiesta si apre su WhatsApp, già compilata: basta premere invio.</p>
      </form>
      <div id="${idPrefix}-success" style="display:none;" class="inline-prev-success">
        <div class="success-icon" style="margin: 0 auto 20px;"><i class="fas fa-check"></i></div>
        <h3 style="font-family:'Fraunces',serif;font-size:22px;letter-spacing:2px;text-transform:uppercase;color:#a35a35;margin-bottom:12px;">Richiesta inviata!</h3>
        <p style="font-size:14px;color:#555;line-height:1.7;">Grazie per averci contattato.<br>Il nostro team ti risponderà entro 24 ore.</p>
      </div>
    </div>`;
}

const iconBoxes = `
    <div class="icon-boxes">
      <div class="icon-box">
        <div class="icon-wrap"><i class="far fa-map"></i></div>
        <h3>INDIRIZZO</h3>
        <p>${L.S.street}<br>${L.S.cap} ${L.S.city} ${L.S.prov}</p>
      </div>
      <div class="icon-box" style="transition-delay:0.1s">
        <div class="icon-wrap"><i class="fas fa-phone"></i></div>
        <h3>TELEFONO</h3>
        <p>${L.S.telDisplay}</p>
      </div>
      <div class="icon-box" style="transition-delay:0.2s">
        <div class="icon-wrap"><i class="far fa-envelope"></i></div>
        <h3>Email</h3>
        <p>${L.S.email}</p>
      </div>
      <div class="icon-box" style="transition-delay:0.3s">
        <div class="icon-wrap"><i class="fas fa-calendar-alt"></i></div>
        <h3>ORARIO</h3>
        <p>LUN a VEN: 8.00-18.00<br>SAB e DOM: Chiuso</p>
      </div>
    </div>`;

module.exports = function buildRootPages({ SERVIZI, ZONE, NEWS }) {
  const rel = '';

  // ============================================================
  // HOMEPAGE (struttura index.html RBA)
  // ============================================================
  (function () {
    const schemas = [
      {
        '@context': 'https://schema.org',
        '@graph': [
          L.schemaLocalBusiness(),
          {
            '@type': 'WebSite',
            '@id': `${L.S.site}/#website`,
            url: `${L.S.site}/`,
            name: L.S.name,
            publisher: { '@id': `${L.S.site}/#localbusiness` },
          },
        ],
      },
    ];

    const HOME_CSS = `
/* ===== PAGINA HOME — stili specifici (ricalcati da RBA) ===== */
.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  min-height: 500px;
  overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  background: #000;
}
.hero-video-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}
.hero-video-container img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center 35%;
}
.hero-ph {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 30% 20%, rgba(163,90,53,0.28) 0%, transparent 55%),
    linear-gradient(160deg, #4a4038 0%, #322a22 45%, #1e1913 100%);
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.45);
}
.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #fff;
  padding: 20px;
  animation: fadeInUp 1.2s ease both;
}
.hero-h1 {
  font-family: 'Fraunces', serif;
  font-size: clamp(36px, 6vw, 80px);
  font-weight: 700;
  color: #fff;
  letter-spacing: 8px;
  text-transform: uppercase;
  text-shadow: 0 3px 30px rgba(0,0,0,0.5);
  line-height: 1.1;
}
.hero-sub {
  font-family: 'Fraunces', serif;
  font-size: clamp(14px, 2vw, 22px);
  font-weight: 300;
  color: rgba(255,255,255,0.85);
  letter-spacing: 5px;
  text-transform: uppercase;
  margin-top: 10px;
  text-shadow: 0 2px 10px rgba(0,0,0,0.4);
}
.hero-btn {
  display: inline-block;
  margin-top: 28px;
  padding: 12px 36px;
  background: rgba(163,90,53,0.85);
  color: #fff;
  font-family: 'Fraunces', serif;
  font-size: 14px;
  letter-spacing: 3px;
  text-transform: uppercase;
  border: 2px solid rgba(255,255,255,0.5);
  transition: background 0.3s, border-color 0.3s;
  animation: fadeInUp 1.2s 0.3s ease both;
}
.hero-btn:hover {
  background: rgba(163,90,53,1);
  border-color: rgba(255,255,255,0.9);
}

/* ===== SERVICES SECTION (3 image-box cards) ===== */
.services-section { width: 100%; }
.services-row { display: flex; flex-wrap: wrap; }
.service-card {
  flex: 1 1 33.333%;
  position: relative;
  overflow: hidden;
  background: #1a1a1a;
}
.svc-img {
  width: 100%;
  height: 380px;
  object-fit: cover;
  display: block;
  transition: transform 0.6s ease, opacity 0.4s;
  opacity: 0.92;
}
.service-card:hover .svc-img { transform: scale(1.06); opacity: 0.78; }
.service-card-content {
  padding: 30px 28px 36px;
  background: #f8f5f0;
}
.service-card-content h3 {
  font-family: 'Fraunces', serif;
  font-size: 22px;
  font-weight: 600;
  color: #a35a35;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 12px;
}
.service-card-content p {
  font-size: 14px;
  color: #555;
  line-height: 1.75;
}
.service-card-content p strong { color: #a35a35; }

/* ===== PROFESSIONISTI SECTION ===== */
.professionisti-section {
  position: relative;
  background: linear-gradient(150deg, #47403a 0%, #2b241d 100%);
  padding: 90px 40px;
  text-align: center;
}
.professionisti-section::before {
  content: '';
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.35);
}
.professionisti-section .inner { position: relative; z-index: 1; }
.professionisti-section h2 {
  font-family: 'Fraunces', serif;
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 700;
  color: #fff;
  letter-spacing: 10px;
  text-transform: uppercase;
  text-shadow: 0 2px 20px rgba(0,0,0,0.5);
}
.professionisti-section .divider-line {
  width: 80px; height: 2px;
  background: #a35a35;
  margin: 20px auto 0;
}
.professionisti-text {
  max-width: 800px;
  margin: 24px auto 0;
  font-size: 15px;
  color: rgba(255,255,255,0.88);
  line-height: 1.85;
  font-family: 'Karla', sans-serif;
}
.professionisti-text strong { color: #fff; font-weight: 700; }

/* ===== LAVORI SECTION — griglia fotografica uniforme (diversa dalla colonna a mosaico) ===== */
.lavori-section { background: #fff; padding-bottom: 90px; }
.lavori-section .section-header {
  background: #fff;
  text-align: center;
  padding: 55px 20px 30px;
}
/* TODO FOTO: sostituire i .ph-block con le foto reali dei lavori quando disponibili */
.work-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 6px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.work-item {
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  cursor: pointer;
}
.work-item .ph-block { width: 100%; height: 100%; transition: transform 0.6s ease; }
.work-item:hover .ph-block { transform: scale(1.07); }
.work-photo { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.6s ease; }
.work-item:hover .work-photo { transform: scale(1.07); }
.work-caption {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  padding: 20px 18px 16px;
  background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 60%, transparent 100%);
  color: #fff;
  font-family: 'Fraunces', serif;
  font-size: 12.5px;
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s, transform 0.3s;
}
.work-item:hover .work-caption { opacity: 1; transform: translateY(0); }
@media (max-width: 600px) {
  .work-grid { grid-template-columns: repeat(2, 1fr); gap: 4px; padding: 0 4px; }
  .work-caption { opacity: 1; transform: translateY(0); padding: 14px 10px 10px; font-size: 10.5px; letter-spacing: 1px; }
}

/* ===== NVN IN NUMERI — sostituisce la sezione statica "qualità materiali" di RBA ===== */
.numeri-curve-section {
  position: relative;
  background: linear-gradient(140deg, #5b4a3d 0%, #33291f 70%);
  padding: 90px 40px;
  text-align: center;
  overflow: hidden;
}
.numeri-curve-section::before {
  content: '';
  position: absolute; inset: 0;
  background: rgba(40,38,30,0.55);
}
.numeri-curve-section .inner { position: relative; z-index: 1; }
.numeri-curve-section h2 {
  font-family: 'Fraunces', serif;
  font-size: 17px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 4px;
  text-transform: uppercase;
}
.numeri-curve-section .divider-line {
  width: 60px; height: 2px;
  background: rgba(255,255,255,0.5);
  margin: 18px auto 44px;
}
.numeri-inline {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 56px;
  max-width: 900px;
  margin: 0 auto;
}
.numeri-inline .num-item .num {
  font-family: 'Fraunces', serif;
  font-size: 48px;
  font-weight: 700;
  color: #c9b99a;
  line-height: 1;
}
.numeri-inline .num-item .lbl {
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.75);
  margin-top: 10px;
}
.shape-top, .shape-bottom {
  position: absolute;
  left: 0; right: 0;
  height: 60px;
  overflow: hidden;
  line-height: 0;
  z-index: 2;
}
.shape-top { top: -1px; }
.shape-bottom { bottom: -1px; transform: rotate(180deg); }
.shape-top svg, .shape-bottom svg { width: 100%; height: 60px; }
.shape-top .fill, .shape-bottom .fill { fill: #fff; }

/* ===== ATTREZZATURA SECTION ===== */
.attrezzatura-section {
  display: flex;
  flex-wrap: wrap;
  background: #f7f1e8;
  padding: 60px 40px;
  align-items: center;
  gap: 40px;
}
.attr-image-col { flex: 1 1 420px; text-align: center; }
.attr-image-col .ph-block { max-width: 500px; height: 320px; margin: 0 auto; }
.attr-image-col img { max-width: 420px; width: 100%; margin: 0 auto; display: block; transition: transform 0.5s; }
.attr-image-col img:hover { transform: scale(1.02); }
.attr-text-col { flex: 1 1 320px; padding: 10px 0; }
.attr-text-col h2 {
  font-family: 'Fraunces', serif;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 4px;
  color: #a35a35;
  text-transform: uppercase;
  margin-bottom: 20px;
  line-height: 1.3;
}
.attr-divider { width: 50px; height: 2px; background: #a35a35; margin-bottom: 22px; }
.attr-text-col p { font-size: 15px; color: #555; line-height: 1.8; }

/* ===== LA NOSTRA ESPERIENZA STRIP ===== */
.esperienza-strip {
  background: #33291f;
  padding: 18px 40px;
  text-align: center;
}
.esperienza-strip p {
  font-size: 13px;
  letter-spacing: 3px;
  color: #fff;
  text-transform: uppercase;
  font-family: 'Fraunces', serif;
}

/* TODO FOTO: placeholder news in attesa di immagini */
.news-ph { height: 220px; }

/* ===== RESPONSIVE (homepage-specific) ===== */
@media (max-width: 900px) {
  .services-row { flex-direction: column; }
  .service-card { flex: 1 1 100%; }
  .professionisti-section h2 { font-size: 28px; letter-spacing: 5px; }
}
${PH_CSS}`;

    const newsCards = NEWS.slice(0, 3).map((a, i) => {
      const dateIt = new Date(a.date + 'T12:00:00').toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
      return `
      <article class="news-card reveal"${i ? ` style="transition-delay:0.${i * 12}s"` : ''}>
        <div class="news-card-img-wrap">
          <img class="news-card-img" src="${rel}images/${a.image}" alt="${a.imageAlt || a.h1}" loading="lazy" width="400" height="220">
        </div>
        <div class="news-card-body">
          <div class="news-card-meta">${dateIt.charAt(0).toUpperCase() + dateIt.slice(1)} &nbsp;·&nbsp; ${a.category}</div>
          <h3>${a.h1}</h3>
          <p>${a.excerpt}</p>
          <a class="news-card-link" href="news/${a.slug}.html">Leggi l'articolo</a>
        </div>
      </article>`;
    }).join('\n');

    const faqs = [
      { q: 'In quali zone operate per le ristrutturazioni?', a: `Operiamo a <strong>L'Aquila</strong> e nei comuni limitrofi entro circa 15 km da Assergi: Paganica, Coppito, Sassa, Preturo, Pizzoli, Scoppito e Barisciano.` },
      { q: 'Come posso richiedere un preventivo gratuito?', a: `Puoi compilare il modulo direttamente su questo sito, chiamarci al <strong>${L.S.telDisplay}</strong>, scriverci su WhatsApp oppure a <strong>${L.S.email}</strong>. Risponderemo entro 24 ore lavorative.` },
      { q: 'Quali lavori edili eseguite?', a: `Eseguiamo <strong>ristrutturazioni complete</strong> di appartamenti e case, rifacimento bagni, tetti in legno, cappotto termico, rifacimento facciate, opere in cartongesso, imbiancatura e tinteggiatura, posa di pavimenti e rivestimenti, progettazione.` },
      { q: 'Gestite le pratiche per i bonus fiscali?', a: `Sì: con i nostri tecnici partner ti supportiamo su pratiche edilizie (CILA, SCIA) e sulla documentazione per le <strong>detrazioni fiscali</strong> previste dalla normativa vigente — fatture corrette, bonifici parlanti e comunicazioni.` },
      { q: `Quanto dura una ristrutturazione a L'Aquila?`, a: `Una ristrutturazione parziale richiede tipicamente <strong>2–4 settimane</strong>, un bagno completo 10–15 giorni lavorativi, un intervento completo di un appartamento 8–12 settimane. Forniamo sempre un cronoprogramma dettagliato prima dell'inizio dei lavori.` },
      { q: 'Utilizzate materiali certificati e di qualità?', a: `Assolutamente sì. NVN Impresa Edile seleziona esclusivamente <strong>materiali certificati CE</strong> di primarie aziende. La qualità dei materiali è per noi un valore irrinunciabile, al pari della qualità delle lavorazioni.` },
    ];

    const serviziHub = [
      { slug: 'ristrutturazioni-laquila', icon: 'fas fa-home', t: 'Ristrutturazioni', d: 'Appartamenti, case e locali' },
      { slug: 'ristrutturazione-bagno-laquila', icon: 'fas fa-bath', t: 'Rifacimento Bagno', d: 'Completo in 10–15 giorni' },
      { slug: 'tetti-in-legno-laquila', icon: 'fas fa-warehouse', t: 'Tetti in Legno', d: 'Lamellare e massello, coibentati' },
      { slug: 'cappotto-termico-laquila', icon: 'fas fa-thermometer-half', t: 'Cappotto Termico', d: 'Fino al 40% di risparmio' },
      { slug: 'cartongesso-laquila', icon: 'fas fa-layer-group', t: 'Cartongesso', d: 'Controsoffitti, pareti, LED' },
      { slug: 'ristrutturazione-chiavi-in-mano-laquila', icon: 'fas fa-key', t: 'Chiavi in Mano', d: 'Un unico referente per tutto' },
    ].map(s => `          <a href="servizi/${s.slug}.html" style="display:flex;align-items:center;gap:12px;background:#fff;padding:18px 20px;text-decoration:none;transition:box-shadow .2s;" onmouseover="this.style.boxShadow='0 6px 20px rgba(0,0,0,.10)'" onmouseout="this.style.boxShadow='none'"><i class="${s.icon}" style="color:#a35a35;font-size:18px;min-width:20px;"></i><div><div style="font-size:14px;color:#2c2c2c;font-weight:600;">${s.t}</div><div style="font-size:12px;color:#888;margin-top:2px;">${s.d}</div></div></a>`).join('\n');

    const extraJs = `
// ---- Modale Preventivo ----
const prevOverlay=document.getElementById('preventivo-overlay');
const prevForm=document.getElementById('preventivoForm');
const prevSuccess=document.getElementById('preventivo-success');
function openPreventivoModal(e){if(e)e.preventDefault();prevForm.style.display='';prevSuccess.style.display='none';prevForm.reset();prevOverlay.classList.add('open');document.body.style.overflow='hidden';}
function closePreventivoModal(){prevOverlay.classList.remove('open');document.body.style.overflow='';}
document.getElementById('openPreventivoModal').addEventListener('click',openPreventivoModal);
document.getElementById('closePreventivoModal').addEventListener('click',closePreventivoModal);
prevOverlay.addEventListener('click',(e)=>{if(e.target===prevOverlay)closePreventivoModal();});
document.addEventListener('keydown',(e)=>{if(e.key==='Escape'&&prevOverlay.classList.contains('open'))closePreventivoModal();});
${FORM_JS}
prevForm.addEventListener('submit',(e)=>{e.preventDefault();nvnSendWhatsApp('prev-',prevForm,prevSuccess);});
const inlineFormEl=document.getElementById('ipForm');
const inlineSuccessEl=document.getElementById('ip-success');
inlineFormEl.addEventListener('submit',(e)=>{e.preventDefault();nvnSendWhatsApp('ip-',inlineFormEl,inlineSuccessEl);});`;

    const beforeScripts = `
<!-- MODALE PREVENTIVO -->
<div id="preventivo-overlay">
  <div id="preventivo-modal" role="dialog" aria-modal="true" aria-labelledby="prevModalTitle">
    <div class="modal-header">
      <h2 id="prevModalTitle">Richiedi un preventivo gratuito</h2>
      <p>Compila il form e ti ricontatteremo entro 24 ore</p>
      <span class="modal-close" id="closePreventivoModal" aria-label="Chiudi">&times;</span>
    </div>
    <div class="modal-body">
      <form id="preventivoForm" novalidate>
        <div class="prev-form-row">
          <div class="prev-field">
            <label for="prev-nome">Nome *</label>
            <input type="text" id="prev-nome" name="nome" placeholder="Mario" required>
          </div>
          <div class="prev-field">
            <label for="prev-cognome">Cognome *</label>
            <input type="text" id="prev-cognome" name="cognome" placeholder="Rossi" required>
          </div>
        </div>
        <div class="prev-form-row">
          <div class="prev-field">
            <label for="prev-telefono">Telefono *</label>
            <input type="tel" id="prev-telefono" name="telefono" placeholder="+39 000 000 0000" required>
          </div>
          <div class="prev-field">
            <label for="prev-email">Email *</label>
            <input type="email" id="prev-email" name="email" placeholder="mario@email.it" required>
          </div>
        </div>
        <div class="prev-field">
          <label for="prev-tipo">Tipo di lavoro *</label>
          <select id="prev-tipo" name="tipo" required>${TIPO_OPTIONS}
          </select>
        </div>
        <div class="prev-field">
          <label for="prev-messaggio">Messaggio</label>
          <textarea id="prev-messaggio" name="messaggio" placeholder="Descrivi brevemente il tuo progetto o le tue esigenze..."></textarea>
        </div>
        <button type="submit" class="prev-submit-btn">Invia richiesta</button>
      </form>
      <div id="preventivo-success">
        <div class="success-icon"><i class="fas fa-check"></i></div>
        <h3>Richiesta inviata!</h3>
        <p>Grazie per averci contattato.<br>Il nostro team ti risponderà entro 24 ore.</p>
      </div>
    </div>
  </div>
</div>

<!-- COOKIE BAR -->
<div id="cookie-bar">
  <span>Utilizziamo i cookie per essere sicuri che tu possa avere la migliore esperienza sul nostro sito. Se continui ad utilizzare questo sito noi assumiamo che tu ne sia felice.</span>
  <button onclick="document.getElementById('cookie-bar').style.display='none'">Ok</button>
</div>`;

    const html = `${L.head({
      rel,
      title: "NVN Impresa Edile | Impresa Edile L'Aquila",
      desc: "NVN Impresa Edile di Abdulai Vebi: ristrutturazioni di edifici, tetti in legno, cartongesso, imbiancatura, rifacimento facciate, cappotto termico e progettazione a L'Aquila e provincia. Preventivo gratuito.",
      keywords: "impresa edile L'Aquila, ristrutturazioni L'Aquila, edilizia L'Aquila, tetti in legno L'Aquila, cappotto termico L'Aquila, cartongesso L'Aquila, imbiancatura L'Aquila, rifacimento facciate L'Aquila, ristrutturazione bagno L'Aquila, impresa edile Abruzzo, preventivo ristrutturazione L'Aquila, NVN Impresa Edile",
      canonical: '',
      schemas,
      extraCss: HOME_CSS,
    })}
${L.header(rel, 'home')}

  <!-- HERO -->
  <section class="hero-section">
    <div class="hero-video-container" id="heroVideoContainer">
      <img src="images/hero-nuova-costruzione.jpg" alt="Nuova costruzione in legno realizzata da NVN Impresa Edile a L'Aquila" fetchpriority="high" width="1600" height="1000">
    </div>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1 class="hero-h1">NVN IMPRESA EDILE</h1>
      <p class="hero-sub">Impresa Edile a L'Aquila</p>
      <a href="#" class="hero-btn" id="openPreventivoModal">RICHIEDI UN PREVENTIVO GRATUITO</a>
    </div>
  </section>

  <!-- SERVICES -->
  <section class="services-section" id="servizi">
    <div class="services-row">
      <div class="service-card">
        <img class="svc-img" src="images/svc-ristrutturazioni.jpg" alt="Ristrutturazione di interni realizzata da NVN Impresa Edile" loading="lazy" width="800" height="600">
        <div class="service-card-content">
          <h3>RISTRUTTURAZIONI</h3>
          <p>Ristrutturazioni complete e parziali di case, appartamenti e locali a <strong>L'Aquila e provincia</strong>: dalla demolizione alle finiture, con un unico referente e la formula chiavi in mano.</p>
        </div>
      </div>
      <div class="service-card">
        <img class="svc-img" src="images/svc-tetti-cappotti.jpg" alt="Struttura in legno a vista di un tetto realizzato da NVN Impresa Edile" loading="lazy" width="800" height="600">
        <div class="service-card-content">
          <h3>TETTI E CAPPOTTI</h3>
          <p>Specialisti in <strong>tetti in legno</strong> e <strong>cappotto termico</strong>: coperture ventilate e isolamenti pensati per il clima di montagna, per case calde d'inverno ed efficienti tutto l'anno.</p>
        </div>
      </div>
      <div class="service-card">
        <img class="svc-img" src="images/svc-finiture.jpg" alt="Finiture su misura realizzate da NVN Impresa Edile" loading="lazy" width="800" height="600">
        <div class="service-card-content">
          <h3>FINITURE</h3>
          <p><strong>Cartongesso, imbiancatura, facciate, pavimenti e rivestimenti</strong>: lavorazioni a regola d'arte e materiali certificati per ambienti moderni, funzionali e curati in ogni dettaglio.</p>
        </div>
      </div>
    </div>
  </section>

${L.prevaiSection(rel)}

  <!-- CHI SIAMO / PROFESSIONISTI -->
  <section class="professionisti-section reveal" id="chi-siamo">
    <div class="inner">
      <h2>PROFESSIONISTI</h2>
      <div class="divider-line"></div>
      <p class="professionisti-text">
        NVN Impresa Edile di <strong>Abdulai Vebi</strong> è un'impresa specializzata in una vasta gamma di servizi edili, con sede a <strong>L'Aquila</strong>, ad Assergi, ai piedi del Gran Sasso. Seguiamo ogni progetto dal sopralluogo iniziale fino alla consegna del lavoro finito, garantendo puntualità, trasparenza e lavorazioni a regola d'arte.
      </p>
      <p class="professionisti-text" style="margin-top:14px;">
        Operiamo a <strong>L'Aquila e nei comuni limitrofi</strong> entro circa 15 km da Assergi — Paganica, Coppito, Sassa, Preturo, Pizzoli, Scoppito, Barisciano e le altre frazioni del territorio — con una conoscenza approfondita degli edifici e del clima locale.
      </p>
    </div>
  </section>

  <!-- LAVORI -->
  <section class="lavori-section" id="lavori">
    <div class="section-header reveal">
      <h2>ALCUNI DEI NOSTRI LAVORI</h2>
    </div>
    <div class="work-grid">
      <div class="work-item reveal"><img class="work-photo" src="images/work-ristrutturazione-completa.jpg" alt="Ristrutturazione completa realizzata da NVN Impresa Edile" loading="lazy" width="640" height="800"><div class="work-caption">Ristrutturazione Completa</div></div>
      <div class="work-item reveal" style="transition-delay:.05s"><img class="work-photo" src="images/work-bagno.jpg" alt="Bagno ristrutturato da NVN Impresa Edile" loading="lazy" width="640" height="800"><div class="work-caption">Rifacimento Bagno</div></div>
      <div class="work-item reveal" style="transition-delay:.1s"><img class="work-photo" src="images/work-tetto-legno.jpg" alt="Tetto in legno con travi a vista realizzato da NVN Impresa Edile" loading="lazy" width="640" height="800"><div class="work-caption">Tetto in Legno</div></div>
      <div class="work-item reveal" style="transition-delay:.15s"><img class="work-photo" src="images/work-cappotto-termico.jpg" alt="Cappotto termico in posa su facciata, cantiere NVN Impresa Edile" loading="lazy" width="640" height="800"><div class="work-caption">Cappotto Termico</div></div>
      <div class="work-item reveal" style="transition-delay:.2s"><img class="work-photo" src="images/work-cartongesso.jpg" alt="Struttura in cartongesso realizzata da NVN Impresa Edile" loading="lazy" width="640" height="800"><div class="work-caption">Cartongesso</div></div>
      <div class="work-item reveal" style="transition-delay:.25s"><img class="work-photo" src="images/work-facciata.jpg" alt="Rifacimento facciata con rivestimento in legno, NVN Impresa Edile" loading="lazy" width="640" height="800"><div class="work-caption">Rifacimento Facciata</div></div>
      <div class="work-item reveal" style="transition-delay:.3s"><img class="work-photo" src="images/work-imbiancatura.jpg" alt="Interno tinteggiato da NVN Impresa Edile" loading="lazy" width="640" height="800"><div class="work-caption">Imbiancatura</div></div>
      <div class="work-item reveal" style="transition-delay:.35s"><img class="work-photo" src="images/work-pavimenti.jpg" alt="Posa di pavimenti e rivestimenti, cantiere NVN Impresa Edile" loading="lazy" width="640" height="800"><div class="work-caption">Pavimenti e Rivestimenti</div></div>
    </div>
  </section>

  <!-- NVN IN NUMERI -->
  <!-- TODO: aggiornare i numeri con i dati reali forniti dal cliente -->
  <section class="numeri-curve-section reveal">
    <div class="shape-top" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
        <path class="fill" d="M1000,4.3V0H0v4.3C0.9,23.1,126.7,99.2,500,100S1000,22.7,1000,4.3z"></path>
      </svg>
    </div>
    <div class="inner">
      <h2>NVN Impresa Edile in Numeri</h2>
      <div class="divider-line"></div>
      <div class="numeri-inline">
        <div class="num-item"><div class="num">10+</div><div class="lbl">Anni di Esperienza</div></div>
        <div class="num-item"><div class="num">150+</div><div class="lbl">Progetti Completati</div></div>
        <div class="num-item"><div class="num">12+</div><div class="lbl">Comuni Serviti</div></div>
        <div class="num-item"><div class="num">24h</div><div class="lbl">Preventivo Gratuito</div></div>
      </div>
    </div>
    <div class="shape-bottom" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
        <path class="fill" d="M1000,4.3V0H0v4.3C0.9,23.1,126.7,99.2,500,100S1000,22.7,1000,4.3z"></path>
      </svg>
    </div>
  </section>

  <!-- ATTREZZATURA -->
  <section class="attrezzatura-section">
    <div class="attr-image-col reveal">
      <img src="images/attrezzatura-laser.jpg" alt="Livella laser professionale utilizzata da NVN Impresa Edile" loading="lazy" width="675" height="900">
    </div>
    <div class="attr-text-col reveal" style="transition-delay:0.15s">
      <h2>PRECISIONE E PROFESSIONALITÀ</h2>
      <div class="attr-divider"></div>
      <p>Ogni intervento è eseguito con attrezzatura professionale, materiali certificati e la cura di chi tratta ogni casa come fosse la propria: protezioni accurate, cantiere pulito e dettagli curati fino alla consegna.</p>
    </div>
  </section>

  <!-- ESPERIENZA STRIP -->
  <div class="esperienza-strip">
    <p>LA NOSTRA ESPERIENZA AL VOSTRO SERVIZIO</p>
  </div>

  <!-- CONTATTACI -->
  <section class="contattaci-section">
    <h2>Contattaci per informazioni</h2>
    <div class="contattaci-divider"></div>
    <h2 class="sub">LA NOSTRA ESPERIENZA AL VOSTRO SERVIZIO</h2>
${iconBoxes}
${inlineForm('ip')}
  </section>

  <!-- RECENSIONI -->
  <!-- TODO: sostituire con recensioni reali dei clienti (Google / PagineGialle / Facebook) e aggiornare i riferimenti -->
  <section class="recensioni-section" id="recensioni">
    <div class="section-header reveal">
      <h2>Cosa Dicono i Nostri Clienti</h2>
      <div class="divider-line"></div>
    </div>
    <div class="recensioni-grid">
      <article class="recensione-card reveal">
        <div class="rec-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <blockquote>"Hanno ristrutturato completamente il nostro bagno: lavoro pulito, veloce e curato nei dettagli. Persone serie e disponibili."</blockquote>
        <footer>
          <span class="rec-author">M. — L'Aquila</span>
        </footer>
      </article>
      <article class="recensione-card reveal" style="transition-delay:0.1s">
        <div class="rec-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <blockquote>"Tetto in legno rifatto a regola d'arte: preventivo rispettato al centesimo e cantiere sempre in ordine. Consigliati."</blockquote>
        <footer>
          <span class="rec-author">G. — Provincia dell'Aquila</span>
        </footer>
      </article>
      <article class="recensione-card reveal" style="transition-delay:0.2s">
        <div class="rec-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <blockquote>"Imbiancatura e cartongesso in tutta casa: puntuali, precisi e attenti a proteggere mobili e pavimenti. Risultato eccellente."</blockquote>
        <footer>
          <span class="rec-author">S. — L'Aquila</span>
        </footer>
      </article>
    </div>
    <div style="text-align:center;margin-top:30px;">
      <a href="testimonianze.html" class="btn-outline" style="border-color:#a35a35;color:#a35a35;">Leggi tutte le recensioni</a>
    </div>
  </section>

  <!-- NEWS SECTION -->
  <section id="news" class="news-section">
    <div class="section-header">
      <h2>News &amp; Aggiornamenti</h2>
      <div class="divider-line"></div>
    </div>
    <div class="news-grid">
${newsCards}
    </div>
  </section>

  <!-- FAQ -->
  <section class="faq-section" id="faq">
    <div class="faq-inner">
      <div class="section-header reveal">
        <h2>Domande Frequenti</h2>
        <div class="divider-line" style="margin:14px auto 0;"></div>
      </div>
      <div class="faq-list">
${L.faqDetails(faqs)}
      </div>
    </div>
  </section>

  <!-- SERVIZI — internal linking hub -->
  <section id="zone-servizi-hub" style="background:#f7f1e8;padding:70px 20px;">
    <div style="max-width:1100px;margin:0 auto;">
      <div class="reveal">
        <h2 style="font-size:18px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#33291f;text-align:center;margin-bottom:8px;">I Nostri Servizi</h2>
        <p style="text-align:center;font-size:14px;color:#888;margin-bottom:32px;">Dalla ristrutturazione chiavi in mano ai tetti in legno: scopri tutti i servizi NVN Impresa Edile.</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px;">
${serviziHub}
        </div>
      </div>
    </div>
  </section>
${L.footer(rel, { beforeScripts, extraJs })}`;

    L.writePage('index.html', html);
  })();

  // ============================================================
  // CHI SIAMO
  // ============================================================
  (function () {
    const crumbs = [
      { label: 'Home', href: 'index.html', path: '' },
      { label: 'Chi Siamo', href: '#', path: 'chi-siamo.html' },
    ];
    const schemas = [L.schemaLocalBusiness(), L.schemaBreadcrumb(crumbs)];
    const CSS = `${INTRO_CSS}
.content-block{max-width:860px;margin:60px auto 0;padding:0 20px;}
.content-block h2{font-size:20px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#33291f;margin-bottom:22px;font-family:'Fraunces',serif;}
.content-block p{font-size:15px;color:#555;line-height:1.9;margin-bottom:16px;}
.content-block strong{color:#a35a35;}
.valori-section{background:#f7f1e8;padding:70px 40px;margin-top:70px;text-align:center;}
.valori-section .section-header{margin-bottom:44px;}
.chi-siamo-img{max-width:860px;margin:50px auto 0;padding:0 20px;}
.chi-siamo-img img{width:100%;height:auto;display:block;}`;
    const html = `${L.head({
      rel,
      title: "Chi Siamo | NVN Impresa Edile di Abdulai Vebi – L'Aquila",
      desc: "NVN Impresa Edile di Abdulai Vebi, con sede a L'Aquila (Assergi): storia, valori e metodo di lavoro di un'impresa specializzata in ristrutturazioni e lavori edili.",
      canonical: 'chi-siamo.html',
      schemas,
      extraCss: CSS,
    })}
${L.header(rel, 'chi-siamo')}
${L.pageBanner({ h1: 'Chi Siamo', sub: "Impresa edile a L'Aquila — precisione e professionalità", crumbs })}

  <div class="intro-section reveal">
    <p><strong>NVN Impresa Edile di Abdulai Vebi</strong> è un'impresa specializzata in una vasta gamma di servizi edili, con sede ad Assergi, ai piedi del Gran Sasso, nel comune dell'Aquila. Offriamo soluzioni complete per ogni tipo di esigenza: dalla ristrutturazione integrale di case e appartamenti al singolo intervento di finitura.</p>
    <p>Ci occupiamo di <strong>ristrutturazione di edifici</strong>, compresa la ristrutturazione di bagni, <strong>rifacimento facciate</strong>, lavori di <strong>decorazione e imbiancatura</strong>. Siamo esperti nella realizzazione di <strong>tetti in legno</strong>, nella <strong>progettazione</strong> di ristrutturazioni e nuove costruzioni, e nella posa di <strong>cappotto termico</strong> per migliorare l'efficienza energetica degli edifici. Completano l'offerta i <strong>lavori in cartongesso</strong> per creare ambienti moderni e funzionali.</p>
    <p>Se desideri rinnovare la tua casa o il tuo appartamento, possiamo aiutarti a realizzare ogni tipo di intervento <strong>con precisione e professionalità</strong>, garantendo un risultato finale di qualità.</p>
  </div>

  <div class="chi-siamo-img reveal">
    <img src="images/svc-finiture.jpg" alt="Finiture su misura realizzate da NVN Impresa Edile a L'Aquila" loading="lazy" width="800" height="600">
  </div>

  <div class="content-block reveal">
    <h2>Il Nostro Metodo</h2>
    <p>Crediamo che un buon lavoro edile nasca da tre cose: un preventivo onesto, un cantiere organizzato e la cura dei dettagli. Per questo ogni progetto segue lo stesso percorso: <strong>sopralluogo gratuito</strong>, <strong>computo dettagliato voce per voce</strong>, cronoprogramma condiviso e un <strong>unico referente</strong> che risponde di tutto, dall'inizio alla consegna.</p>
    <p>Lavoriamo con fornitori selezionati e materiali certificati, e trattiamo ogni casa come fosse la nostra: protezioni accurate, pulizia quotidiana del cantiere e riconsegna degli ambienti pronti da vivere.</p>
  </div>

  <div class="content-block reveal">
    <h2>Il Territorio è la Nostra Forza</h2>
    <p>Operare a L'Aquila e nella sua provincia significa conoscere un patrimonio edilizio unico: case in pietra dei borghi, edifici ricostruiti dopo il sisma, condomini da riqualificare energeticamente, seconde case di montagna. La nostra sede ad Assergi ci mette al centro di questo territorio: <strong>sopralluoghi rapidi, presenza costante in cantiere</strong> e rapporti diretti con tecnici e fornitori locali.</p>
  </div>

  <section class="valori-section">
    <div class="section-header reveal">
      <h2>Perché i Clienti ci Scelgono</h2>
      <div class="divider-line"></div>
    </div>
    <div class="icon-boxes">
      <div class="icon-box">
        <div class="icon-wrap"><i class="fas fa-handshake"></i></div>
        <h3>TRASPARENZA</h3>
        <p>Preventivi voce per voce e prezzi concordati: sai sempre cosa paghi e perché.</p>
      </div>
      <div class="icon-box" style="transition-delay:0.1s">
        <div class="icon-wrap"><i class="fas fa-ruler-combined"></i></div>
        <h3>PRECISIONE</h3>
        <p>Misure, livelli e finiture curate: la regola d'arte è il nostro standard.</p>
      </div>
      <div class="icon-box" style="transition-delay:0.2s">
        <div class="icon-wrap"><i class="far fa-clock"></i></div>
        <h3>PUNTUALITÀ</h3>
        <p>Cronoprogramma definito prima di iniziare e rispettato fino alla consegna.</p>
      </div>
      <div class="icon-box" style="transition-delay:0.3s">
        <div class="icon-wrap"><i class="fas fa-heart"></i></div>
        <h3>RISPETTO DELLA CASA</h3>
        <p>Protezioni, ordine e pulizia: il cantiere è casa tua, e la trattiamo come tale.</p>
      </div>
    </div>
  </section>
${L.ctaSection(rel)}
${L.footer(rel)}`;
    L.writePage('chi-siamo.html', html);
  })();

  // ============================================================
  // SERVIZI (hub)
  // ============================================================
  (function () {
    const crumbs = [
      { label: 'Home', href: 'index.html', path: '' },
      { label: 'Servizi', href: '#', path: 'servizi.html' },
    ];
    const schemas = [L.schemaBreadcrumb(crumbs)];
    const icons = {
      'ristrutturazioni-laquila': 'fas fa-home',
      'ristrutturazione-chiavi-in-mano-laquila': 'fas fa-key',
      'ristrutturazione-bagno-laquila': 'fas fa-bath',
      'tetti-in-legno-laquila': 'fas fa-warehouse',
      'cappotto-termico-laquila': 'fas fa-thermometer-half',
      'rifacimento-facciate-laquila': 'fas fa-building',
      'cartongesso-laquila': 'fas fa-layer-group',
      'imbiancatura-tinteggiatura-laquila': 'fas fa-paint-roller',
      'pavimenti-rivestimenti-laquila': 'fas fa-border-all',
      'progettazione-edile-laquila': 'fas fa-drafting-compass',
    };
    const cards = SERVIZI.map((s, i) => `
      <div class="servizio-card-z reveal"${i ? ` style="transition-delay:.${(i % 6) * 5 < 10 ? '0' : ''}${(i % 6) * 5}s"` : ''}><i class="${icons[s.slug] || 'fas fa-hammer'}"></i><h3>${s.label}</h3><p>${s.metaDesc.split('.')[0]}.</p><a href="servizi/${s.slug}.html">Scopri il servizio →</a></div>`).join('');

    const html = `${L.head({
      rel,
      title: "Servizi Edili L'Aquila | Ristrutturazioni, Tetti, Cartongesso – NVN",
      desc: "Tutti i servizi di NVN Impresa Edile a L'Aquila: ristrutturazioni complete, bagni, tetti in legno, cappotto termico, cartongesso, facciate, imbiancatura e progettazione.",
      canonical: 'servizi.html',
      schemas,
      extraCss: `${INTRO_CSS}${SERVIZI_GRID_CSS}`,
    })}
${L.header(rel, 'servizi')}
${L.pageBanner({ h1: 'I Nostri Servizi', sub: "Soluzioni complete per ristrutturare, costruire e rinnovare", crumbs })}

  <div class="intro-section reveal">
    <p>NVN Impresa Edile offre <strong>soluzioni complete per ogni esigenza edile</strong> a L'Aquila e provincia: dalla ristrutturazione integrale con formula chiavi in mano al singolo intervento di finitura. Un'unica impresa, tutte le competenze — muratura, tetti, isolamenti, cartongesso, tinteggiature e pavimenti — coordinate da un unico referente.</p>
    <p>Seleziona un servizio per scoprire lavorazioni, costi indicativi e domande frequenti. Il <strong>sopralluogo e il preventivo sono sempre gratuiti</strong>.</p>
  </div>

  <div class="servizi-grid">${cards}
  </div>
${L.ctaSection(rel)}
${L.footer(rel)}`;
    L.writePage('servizi.html', html);
  })();

  // ============================================================
  // LAVORI
  // ============================================================
  (function () {
    const crumbs = [
      { label: 'Home', href: 'index.html', path: '' },
      { label: 'I nostri Lavori', href: '#', path: 'lavori.html' },
    ];
    const schemas = [L.schemaBreadcrumb(crumbs)];
    const CSS = `${INTRO_CSS}
.work-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:6px;max-width:1200px;margin:60px auto 0;padding:0 20px;}
.work-item{position:relative;aspect-ratio:4/5;overflow:hidden;cursor:pointer;}
.work-photo{width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.6s ease;}
.work-item:hover .work-photo{transform:scale(1.07);}
.work-caption{position:absolute;left:0;right:0;bottom:0;padding:20px 18px 16px;background:linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 60%, transparent 100%);color:#fff;font-family:'Fraunces',serif;font-size:12.5px;letter-spacing:2px;text-transform:uppercase;opacity:0;transform:translateY(10px);transition:opacity 0.3s, transform 0.3s;}
.work-item:hover .work-caption{opacity:1;transform:translateY(0);}
@media(max-width:600px){.work-grid{grid-template-columns:repeat(2,1fr);gap:4px;padding:0 4px;}.work-caption{opacity:1;transform:translateY(0);padding:14px 10px 10px;font-size:10.5px;letter-spacing:1px;}}`;
    const lavori = [
      { img: 'work-ristrutturazione-completa.jpg', t: 'Ristrutturazione Completa' },
      { img: 'work-bagno.jpg', t: 'Rifacimento Bagno' },
      { img: 'work-tetto-legno.jpg', t: 'Tetto in Legno' },
      { img: 'work-cappotto-termico.jpg', t: 'Cappotto Termico' },
      { img: 'work-cartongesso.jpg', t: 'Cartongesso' },
      { img: 'work-facciata.jpg', t: 'Rifacimento Facciata' },
      { img: 'work-imbiancatura.jpg', t: 'Imbiancatura' },
      { img: 'work-pavimenti.jpg', t: 'Pavimenti e Rivestimenti' },
      { img: 'work-chiavi-in-mano.jpg', t: 'Ristrutturazione Chiavi in Mano' },
    ].map((x, i) => `
      <div class="work-item reveal"${i ? ` style="transition-delay:.${(i % 6) * 5}s"` : ''}><img class="work-photo" src="images/${x.img}" alt="${x.t} — NVN Impresa Edile" loading="lazy" width="640" height="800"><div class="work-caption">${x.t}</div></div>`).join('');

    const html = `${L.head({
      rel,
      title: "I Nostri Lavori | Ristrutturazioni Realizzate – NVN L'Aquila",
      desc: "Una selezione dei lavori di NVN Impresa Edile a L'Aquila e provincia: ristrutturazioni, tetti in legno, bagni, cappotti termici, cartongesso e facciate.",
      canonical: 'lavori.html',
      schemas,
      extraCss: CSS,
    })}
${L.header(rel, 'lavori')}
${L.pageBanner({ h1: 'I Nostri Lavori', sub: 'Gli interventi che raccontano il nostro modo di lavorare', crumbs })}

  <div class="intro-section reveal">
    <p>Dalle <strong>ristrutturazioni complete</strong> ai <strong>tetti in legno</strong>, dai bagni ai cappotti termici: ogni cantiere è seguito con la stessa cura, dal primo sopralluogo alla consegna. Le fotografie dei nostri lavori più recenti saranno pubblicate a breve in questa pagina.</p>
  </div>

  <div class="work-grid">${lavori}
  </div>
${L.ctaSection(rel, { title: 'Vuoi un Risultato Così Anche a Casa Tua?', text: 'Raccontaci il tuo progetto: sopralluogo e preventivo sono gratuiti e senza impegno.' })}
${L.footer(rel)}`;
    L.writePage('lavori.html', html);
  })();

  // ============================================================
  // ZONE (hub)
  // ============================================================
  (function () {
    const crumbs = [
      { label: 'Home', href: 'index.html', path: '' },
      { label: 'Zone', href: '#', path: 'zone.html' },
    ];
    const schemas = [L.schemaLocalBusiness(), L.schemaBreadcrumb(crumbs)];
    const cards = ZONE.map((z, i) => `
      <div class="servizio-card-z reveal"${i ? ` style="transition-delay:.${(i % 6) * 5 < 10 ? '0' : ''}${(i % 6) * 5}s"` : ''}><i class="fas fa-map-marker-alt"></i><h3>${z.label}</h3><p>${z.bannerSub}</p><a href="zone/${z.slug}.html">Scopri la zona →</a></div>`).join('');

    const html = `${L.head({
      rel,
      title: "Zone Servite | Impresa Edile L'Aquila e Provincia – NVN",
      desc: "NVN Impresa Edile opera a L'Aquila e nei comuni limitrofi entro 15 km: Assergi, Paganica, Coppito, Sassa, Preturo, Pizzoli, Scoppito e Barisciano.",
      canonical: 'zone.html',
      schemas,
      extraCss: `${INTRO_CSS}${SERVIZI_GRID_CSS}`,
    })}
${L.header(rel, 'zone')}
${L.pageBanner({ h1: 'Zone Servite', sub: "L'Aquila, le frazioni e i comuni della provincia", crumbs })}

  <div class="intro-section reveal">
    <p>NVN Impresa Edile ha sede ad <strong>Assergi</strong>, nel comune dell'Aquila, e opera in un raggio di circa 15 km: la città con le sue frazioni principali e i comuni limitrofi della conca aquilana e dell'alta valle dell'Aterno.</p>
    <p>Essere un'impresa <strong>del territorio</strong> significa sopralluoghi rapidi, cantieri presidiati ogni giorno e la conoscenza diretta di edifici, clima e fornitori locali. Seleziona la tua zona per scoprire i servizi dedicati.</p>
  </div>

  <div class="servizi-grid">${cards}
  </div>

  <div class="intro-section reveal" style="margin-top:50px;">
    <p><strong>Non trovi il tuo comune?</strong> L'elenco copre le zone in cui interveniamo più spesso, ma lavoriamo in tutta la provincia dell'Aquila: <a href="contatti.html">contattaci</a> e verifichiamo insieme la disponibilità per il tuo cantiere.</p>
  </div>
${L.ctaSection(rel)}
${L.footer(rel)}`;
    L.writePage('zone.html', html);
  })();

  // ============================================================
  // NEWS (hub)
  // ============================================================
  (function () {
    const crumbs = [
      { label: 'Home', href: 'index.html', path: '' },
      { label: 'News', href: '#', path: 'news.html' },
    ];
    const schemas = [L.schemaBreadcrumb(crumbs)];
    const cards = NEWS.map((a, i) => {
      const dateIt = new Date(a.date + 'T12:00:00').toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
      return `
      <article class="news-card reveal"${i ? ` style="transition-delay:0.${(i % 3) * 12}s"` : ''}>
        <div class="news-card-img-wrap">
          <img class="news-card-img" src="${rel}images/${a.image}" alt="${a.imageAlt || a.h1}" loading="lazy" width="400" height="220">
        </div>
        <div class="news-card-body">
          <div class="news-card-meta">${dateIt.charAt(0).toUpperCase() + dateIt.slice(1)} &nbsp;·&nbsp; ${a.category}</div>
          <h3>${a.h1}</h3>
          <p>${a.excerpt}</p>
          <a class="news-card-link" href="news/${a.slug}.html">Leggi l'articolo</a>
        </div>
      </article>`;
    }).join('\n');

    const html = `${L.head({
      rel,
      title: "News e Guide | Ristrutturazioni e Casa – NVN Impresa Edile L'Aquila",
      desc: "Guide, costi e consigli pratici su ristrutturazioni, tetti in legno, cappotto termico, cartongesso e bonus casa: il blog di NVN Impresa Edile, L'Aquila.",
      canonical: 'news.html',
      schemas,
      extraCss: PH_CSS,
    })}
${L.header(rel, 'news')}
${L.pageBanner({ h1: 'News e Guide', sub: 'Costi, bonus e consigli pratici per chi deve ristrutturare', crumbs })}

  <section class="news-section" style="background:#fff;">
    <div class="news-grid">
${cards}
    </div>
  </section>
${L.ctaSection(rel)}
${L.footer(rel)}`;
    L.writePage('news.html', html);
  })();

  // ============================================================
  // FAQ
  // ============================================================
  (function () {
    const crumbs = [
      { label: 'Home', href: 'index.html', path: '' },
      { label: 'FAQ', href: '#', path: 'faq.html' },
    ];
    const faqs = [
      { q: 'Il preventivo è gratuito?', a: `Sì, sempre: sopralluogo e preventivo dettagliato sono <strong>gratuiti e senza impegno</strong>, a L'Aquila e in tutta la provincia. Rispondiamo alle richieste entro 24 ore.` },
      { q: 'In quali zone operate?', a: `In un raggio di circa 15 km da Assergi: <strong>L'Aquila</strong> e le sue frazioni (Paganica, Coppito, Sassa, Preturo e le altre), oltre ai comuni limitrofi di Pizzoli, Scoppito e Barisciano.` },
      { q: 'Che tipo di lavori eseguite?', a: `<strong>Ristrutturazioni complete e parziali</strong>, ristrutturazione bagni, tetti in legno, cappotto termico, rifacimento facciate, opere in cartongesso, imbiancatura e tinteggiatura, posa di pavimenti e rivestimenti, progettazione con tecnici partner.` },
      { q: 'Quanto costa una ristrutturazione completa?', a: `Indicativamente <strong>450–700 €/mq</strong> per un livello standard e 700–1.000+ €/mq con finiture di pregio. Gli interventi parziali partono da 250 €/mq. Il preventivo esatto viene definito dopo il sopralluogo gratuito.` },
      { q: 'Quanto durano i lavori?', a: `Un bagno completo richiede <strong>10–15 giorni lavorativi</strong>, un appartamento medio 8–12 settimane, un'imbiancatura 3–5 giorni. Prima di iniziare concordiamo un cronoprogramma con data di consegna.` },
      { q: 'Vi occupate delle pratiche edilizie?', a: `Sì: collaboriamo con architetti, ingegneri e geometri abilitati per <strong>CILA, SCIA</strong> e le altre pratiche necessarie, comprese le comunicazioni per accedere alle detrazioni fiscali.` },
      { q: 'Aiutate ad ottenere i bonus fiscali?', a: `Sì: emettiamo fatture con le diciture corrette, ti guidiamo sui <strong>bonifici parlanti</strong> e prepariamo la documentazione richiesta, così la detrazione prevista dalla normativa vigente non si perde per errori formali.` },
      { q: 'Posso seguire i lavori a distanza?', a: `Certo: molti clienti possiedono seconde case in montagna o vivono fuori regione. Inviamo <strong>aggiornamenti fotografici periodici</strong> via WhatsApp ed email e consegniamo la casa pronta alla data concordata.` },
      { q: 'Il prezzo può cambiare durante i lavori?', a: `Il prezzo concordato è quello del contratto. Cambia solo se richiedi tu lavorazioni aggiuntive, che vengono sempre <strong>quotate e approvate per iscritto</strong> prima dell'esecuzione.` },
      { q: 'Siete assicurati?', a: `Sì: operiamo con regolare copertura assicurativa e nel rispetto delle norme di sicurezza sul lavoro. Su richiesta forniamo la documentazione dell'impresa (visura, DURC, polizza).` },
    ];
    const schemas = [L.schemaFAQ(faqs), L.schemaBreadcrumb(crumbs)];
    const html = `${L.head({
      rel,
      title: "FAQ | Domande Frequenti – NVN Impresa Edile L'Aquila",
      desc: "Le risposte alle domande più frequenti su preventivi, costi, tempi, pratiche edilizie e bonus fiscali. NVN Impresa Edile, L'Aquila.",
      canonical: 'faq.html',
      schemas,
      extraCss: INTRO_CSS,
    })}
${L.header(rel, 'faq')}
${L.pageBanner({ h1: 'Domande Frequenti', sub: 'Tutto quello che i clienti ci chiedono prima di iniziare i lavori', crumbs })}

  <section class="faq-section">
    <div class="faq-inner">
      <div class="faq-list" style="margin-top:0;">
${L.faqDetails(faqs)}
      </div>
    </div>
  </section>

  <div class="intro-section reveal" style="text-align:center;">
    <p><strong>Non hai trovato la risposta?</strong> Chiamaci al <a href="${L.S.telHref}">${L.S.telDisplay}</a>, scrivici su <a href="${L.S.wa}" rel="noopener" target="_blank">WhatsApp</a> o via email a <a href="mailto:${L.S.email}">${L.S.email}</a>: rispondiamo entro 24 ore.</p>
  </div>
${L.ctaSection(rel)}
${L.footer(rel)}`;
    L.writePage('faq.html', html);
  })();

  // ============================================================
  // TESTIMONIANZE
  // ============================================================
  (function () {
    const crumbs = [
      { label: 'Home', href: 'index.html', path: '' },
      { label: 'Recensioni', href: '#', path: 'testimonianze.html' },
    ];
    const schemas = [L.schemaBreadcrumb(crumbs)];
    // TODO: sostituire le recensioni segnaposto con recensioni reali (Google, PagineGialle, Facebook)
    const reviews = [
      { txt: '"Hanno ristrutturato completamente il nostro bagno: lavoro pulito, veloce e curato nei dettagli. Persone serie e disponibili."', a: "M. — L'Aquila" },
      { txt: '"Tetto in legno rifatto a regola d\'arte: preventivo rispettato al centesimo e cantiere sempre in ordine. Consigliati."', a: "G. — Provincia dell'Aquila" },
      { txt: '"Imbiancatura e cartongesso in tutta casa: puntuali, precisi e attenti a proteggere mobili e pavimenti. Risultato eccellente."', a: "S. — L'Aquila" },
      { txt: '"Cappotto termico sulla nostra villetta: già dal primo inverno la differenza in bolletta si è vista. Professionali dall\'inizio alla fine."', a: 'A. — Conca aquilana' },
      { txt: '"Seguivano i lavori della nostra seconda casa mentre eravamo fuori regione: foto continue, zero pensieri e casa perfetta al nostro arrivo."', a: 'F. — Pizzoli' },
      { txt: '"Preventivo chiaro, nessuna sorpresa e grande disponibilità a spiegare ogni scelta. Così dovrebbe lavorare ogni impresa."', a: "L. — L'Aquila" },
    ].map((r, i) => `
      <article class="recensione-card reveal"${i ? ` style="transition-delay:0.${i % 3}s"` : ''}>
        <div class="rec-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <blockquote>${r.txt}</blockquote>
        <footer>
          <span class="rec-author">${r.a}</span>
        </footer>
      </article>`).join('');

    const html = `${L.head({
      rel,
      title: "Recensioni | Cosa Dicono i Clienti – NVN Impresa Edile L'Aquila",
      desc: "Le opinioni di chi ha ristrutturato con NVN Impresa Edile a L'Aquila e provincia: bagni, tetti, cappotti termici e ristrutturazioni complete.",
      canonical: 'testimonianze.html',
      schemas,
      extraCss: INTRO_CSS,
    })}
${L.header(rel, 'testimonianze')}
${L.pageBanner({ h1: 'Le Recensioni dei Clienti', sub: 'La soddisfazione di chi ci ha scelto è la nostra migliore referenza', crumbs })}

  <section class="recensioni-section">
    <div class="recensioni-grid">${reviews}
    </div>
  </section>

  <div class="intro-section reveal" style="text-align:center;margin-top:0;padding-top:50px;">
    <p><strong>Hai lavorato con noi?</strong> La tua opinione conta: <a href="https://www.paginegialle.it/nvn-di-abdulai-vebi-impresa-edile-l-aquila/commenti" rel="noopener" target="_blank">lascia una recensione su PagineGialle</a> o contattaci per raccontarci la tua esperienza.</p>
  </div>
${L.ctaSection(rel)}
${L.footer(rel)}`;
    L.writePage('testimonianze.html', html);
  })();

  // ============================================================
  // CONTATTI
  // ============================================================
  (function () {
    const crumbs = [
      { label: 'Home', href: 'index.html', path: '' },
      { label: 'Contatti', href: '#', path: 'contatti.html' },
    ];
    const schemas = [L.schemaLocalBusiness(), L.schemaBreadcrumb(crumbs)];
    const extraJs = `${FORM_JS}
const cForm=document.getElementById('ipForm');
const cSuccess=document.getElementById('ip-success');
cForm.addEventListener('submit',(e)=>{e.preventDefault();nvnSendWhatsApp('ip-',cForm,cSuccess);});`;
    const html = `${L.head({
      rel,
      title: "Contatti | NVN Impresa Edile L'Aquila – Preventivo Gratuito",
      desc: "Contatta NVN Impresa Edile: telefono 339 713 9941, WhatsApp, email nvn.impresaedile@gmail.com. Sede in Via Arco delle Ville 7, L'Aquila. Preventivo gratuito.",
      canonical: 'contatti.html',
      schemas,
      extraCss: INTRO_CSS,
    })}
${L.header(rel, 'contatti')}
${L.pageBanner({ h1: 'Contatti', sub: 'Raccontaci il tuo progetto: rispondiamo entro 24 ore', crumbs })}

  <section class="contattaci-section">
    <h2>Contattaci per informazioni</h2>
    <div class="contattaci-divider"></div>
    <h2 class="sub">LA NOSTRA ESPERIENZA AL VOSTRO SERVIZIO</h2>
${iconBoxes}
${inlineForm('ip')}
  </section>

  <section style="line-height:0;">
    <iframe title="Mappa — NVN Impresa Edile, Via Arco delle Ville 7, L'Aquila" src="https://www.google.com/maps?q=Via+Arco+delle+Ville+7,+67100+L%27Aquila+AQ&output=embed" width="100%" height="380" style="border:0;" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </section>
${L.ctaSection(rel)}
${L.footer(rel, { extraJs })}`;
    L.writePage('contatti.html', html);
  })();

  // ============================================================
  // PREVENTIVO (landing)
  // ============================================================
  (function () {
    const crumbs = [
      { label: 'Home', href: 'index.html', path: '' },
      { label: 'Preventivo', href: '#', path: 'preventivo-ristrutturazione-laquila.html' },
    ];
    const schemas = [L.schemaLocalBusiness(), L.schemaBreadcrumb(crumbs)];
    const CSS = `${INTRO_CSS}
.vantaggi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px;max-width:1100px;margin:60px auto 0;padding:0 20px;}
.vantaggio-card{background:#f9f6f1;padding:32px 24px;text-align:center;}
.vantaggio-card i{font-size:32px;color:#a35a35;margin-bottom:16px;display:block;}
.vantaggio-card h3{font-size:14px;letter-spacing:1.5px;text-transform:uppercase;color:#33291f;margin-bottom:10px;}
.vantaggio-card p{font-size:13px;color:#777;line-height:1.7;}
.content-block{max-width:860px;margin:60px auto 0;padding:0 20px;}
.content-block h2{font-size:20px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#33291f;margin-bottom:22px;}
.content-block p{font-size:15px;color:#555;line-height:1.9;margin-bottom:16px;}
.content-block ul{margin:0 0 18px 22px;}
.content-block ul li{font-size:14.5px;color:#555;line-height:1.85;margin-bottom:8px;}
.content-block strong{color:#a35a35;}`;
    const extraJs = `${FORM_JS}
const pForm=document.getElementById('ipForm');
const pSuccess=document.getElementById('ip-success');
pForm.addEventListener('submit',(e)=>{e.preventDefault();nvnSendWhatsApp('ip-',pForm,pSuccess);});`;
    const html = `${L.head({
      rel,
      title: "Preventivo Ristrutturazione L'Aquila | Gratuito in 24h – NVN",
      desc: "Richiedi un preventivo gratuito per la tua ristrutturazione a L'Aquila: sopralluogo senza impegno, computo dettagliato voce per voce e risposta entro 24 ore.",
      canonical: 'preventivo-ristrutturazione-laquila.html',
      schemas,
      extraCss: CSS,
    })}
${L.header(rel, null)}
${L.pageBanner({ h1: "Preventivo Ristrutturazione", sub: 'Gratuito, dettagliato e senza impegno — risposta entro 24 ore', crumbs })}

  <div class="intro-section reveal">
    <p>Stai pensando di <strong>ristrutturare casa a L'Aquila</strong> o in provincia? Il primo passo è capire quanto costa davvero — e per farlo serve un preventivo serio, non una cifra buttata lì al telefono.</p>
    <p>Con NVN Impresa Edile funziona così: fissiamo un <strong>sopralluogo gratuito</strong>, valutiamo insieme l'immobile e le tue esigenze, e ti consegniamo un <strong>computo dettagliato voce per voce</strong>: demolizioni, impianti, massetti, pavimenti, bagni, finiture. Ogni voce con la sua quantità e il suo prezzo. Così puoi confrontare, ragionare e decidere con calma — senza impegno.</p>
  </div>

  <div class="vantaggi-grid">
    <div class="vantaggio-card reveal"><i class="fas fa-euro-sign"></i><h3>100% Gratuito</h3><p>Sopralluogo e preventivo non costano nulla e non ti impegnano in alcun modo.</p></div>
    <div class="vantaggio-card reveal" style="transition-delay:.1s"><i class="fas fa-list-ul"></i><h3>Voce per Voce</h3><p>Niente prezzi "a corpo" misteriosi: ogni lavorazione è quantificata e prezzata.</p></div>
    <div class="vantaggio-card reveal" style="transition-delay:.2s"><i class="fas fa-bolt"></i><h3>Risposta in 24h</h3><p>Ti ricontattiamo entro un giorno lavorativo per fissare il sopralluogo.</p></div>
    <div class="vantaggio-card reveal" style="transition-delay:.3s"><i class="fas fa-lock"></i><h3>Prezzo Bloccato</h3><p>Quello che firmi è quello che paghi: modifiche solo se le chiedi tu.</p></div>
  </div>

${L.prevaiSection(rel)}

  <section class="contattaci-section">
    <h2>Richiedi il tuo preventivo</h2>
    <div class="contattaci-divider"></div>
${inlineForm('ip')}
    <p style="margin-top:30px;font-size:14px;color:#777;">Preferisci parlarne a voce? Chiamaci al <a href="${L.S.telHref}" style="color:#a35a35;font-weight:700;">${L.S.telDisplay}</a> o scrivici su <a href="${L.S.wa}" rel="noopener" target="_blank" style="color:#a35a35;font-weight:700;">WhatsApp</a>.</p>
  </section>

  <div class="content-block reveal">
    <h2>Cosa Preparare per il Sopralluogo</h2>
    <ul>
      <li><strong>Le tue idee</strong> — anche solo appunti o foto di ispirazione: ci aiutano a capire cosa desideri</li>
      <li><strong>Una planimetria</strong>, se disponibile: rende la valutazione più rapida e precisa</li>
      <li><strong>Il budget orientativo</strong> — parlarne subito ci permette di proporti le soluzioni giuste</li>
      <li><strong>Le priorità</strong> — cosa è irrinunciabile e cosa può aspettare una seconda fase</li>
    </ul>
    <p>Al resto pensiamo noi: misure, verifiche tecniche e la proposta più adatta a casa tua.</p>
  </div>
${L.ctaSection(rel)}
${L.footer(rel, { extraJs })}`;
    L.writePage('preventivo-ristrutturazione-laquila.html', html);
  })();
};
