// ============================================================
// NVN IMPRESA EDILE — generatore sito statico
// Design system: RBA Edilizia (Fraunces + Karla, #a35a35 / #33291f)
// Uso: node _build/generate.js   (dalla root del progetto)
// ============================================================
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// ---------- DATI AZIENDA ----------
const S = {
  site: 'https://www.nvnimpresaedile.it',
  name: 'NVN Impresa Edile',
  legalName: "NVN Impresa Edile di Abdulai Vebi",
  owner: 'Vebi Abdulai',
  street: 'Via Arco delle Ville, 7',
  city: "L'Aquila",
  cap: '67100',
  prov: 'AQ',
  telDisplay: '339 713 9941',
  telHref: 'tel:+393397139941',
  telSchema: '+39-339-7139941',
  wa: 'https://wa.me/393397139941',
  email: 'nvn.impresaedile@gmail.com',
  piva: '02156880664',
  lat: 42.4149,
  lng: 13.5124,
  // TODO: inserire URL reale della pagina Facebook "Nvn Impresa Edile"
  facebook: '',
  gaId: '', // TODO: inserire ID Google Analytics (es. G-XXXXXXXXXX)
};

// Sfondo banner di tutte le pagine interne: foto reale di cantiere (percorso
// assoluto dalla root cosi' funziona a qualunque profondita' di pagina).
const BANNER_BG = "background-image:url('/images/banner-cantiere.jpg');";

// ============================================================
// PALETTE — i template usano i colori RBA (terracotta/marrone/crema);
// con USE_RED_PALETTE=true vengono rimappati a rosso/nero/grigi chiari
// (palette del logo NVN) in fase di generazione. Mettere false per
// tornare alla palette RBA originale e rigenerare.
// ============================================================
const USE_RED_PALETTE = true;
const PALETTE_RED = {
  // accento terracotta → rosso mattone spento (non il rosso vivo del logo:
  // usato ovunque per titoli/icone/bordi, deve restare riposante alla vista)
  '#a35a35': '#a4222c',
  '#bd7a52': '#c1323b',
  'rgba(163,90,53': 'rgba(164,34,44',
  'rgba(163, 90, 53': 'rgba(164, 34, 44',
  '%23a35a35': '%23a4222c',
  // marrone scuro → nero
  '#33291f': '#1c1c1c',
  'rgba(51,41,31': 'rgba(28,28,28',
  'rgba(40,38,30': 'rgba(20,20,20',
  // toni scuri caldi (gradienti hero/banner/qualità) → grigi scuri
  '#4a4038': '#3d3d3d',
  '#47403a': '#404040',
  '#3a322a': '#333333',
  '#322a22': '#2e2e2e',
  '#2b241d': '#242424',
  '#1e1913': '#1a1a1a',
  '#55483d': '#474747',
  '#5b4a3d': '#4d4d4d',
  // accenti chiari su fondo scuro → rosa antico spento (leggibile, non acceso)
  '#d9b592': '#c98a90',
  '#c9b99a': '#c98a90',
  '#c8a96e': '#a4222c',
  // creme → grigi chiari / bianco sporco
  '#f7f1e8': '#f5f5f5',
  '#f9f6f1': '#f7f7f7',
  '#f8f5f0': '#f6f6f6',
  '#f4efe6': '#efefef',
  '#f8f3ec': '#f5f5f5',
  '#efe4d8': '#e8e8e8',
  '#e8e4dc': '#e6e6e6',
  '#c5c0b5': '#c9c9c9',
  // placeholder foto (blocchi crema) → grigi
  '#e9e2d6': '#ececec',
  '#d8cdba': '#d9d9d9',
  '#ddd3c3': '#e3e3e3',
  '#cfc3ad': '#d2d2d2',
  '#e4dbcc': '#e8e8e8',
  '#d4c8b2': '#d6d6d6',
};

function applyPalette(text) {
  if (!USE_RED_PALETTE) return text;
  let out = text;
  for (const [from, to] of Object.entries(PALETTE_RED)) {
    out = out.split(from).join(to);
    out = out.split(from.toUpperCase()).join(to);
  }
  return out;
}

// ---------- NAV: SERVIZI ----------
const SERVIZI_NAV = [
  { slug: 'ristrutturazioni-laquila', label: 'Ristrutturazioni' },
  { slug: 'ristrutturazione-chiavi-in-mano-laquila', label: 'Chiavi in Mano' },
  { slug: 'ristrutturazione-bagno-laquila', label: 'Ristrutturazione Bagno' },
  { slug: 'tetti-in-legno-laquila', label: 'Tetti in Legno' },
  { slug: 'cappotto-termico-laquila', label: 'Cappotto Termico' },
  { slug: 'rifacimento-facciate-laquila', label: 'Rifacimento Facciate' },
  { slug: 'cartongesso-laquila', label: 'Cartongesso' },
  { slug: 'imbiancatura-tinteggiatura-laquila', label: 'Imbiancatura' },
  { slug: 'pavimenti-rivestimenti-laquila', label: 'Pavimenti e Rivestimenti' },
  { slug: 'progettazione-edile-laquila', label: 'Progettazione' },
];

// ---------- NAV: ZONE ----------
// Raggio di servizio reale: L'Aquila (con le sue frazioni principali) e i
// comuni limitrofi entro circa 15 km da Assergi/L'Aquila. Elenco volutamente
// corto: solo i centri piu' rilevanti, non ogni singola frazione.
const ZONE_NAV = [
  { slug: 'ristrutturazioni-laquila', label: "L'Aquila" },
  { slug: 'ristrutturazioni-assergi', label: 'Assergi' },
  { slug: 'ristrutturazioni-paganica', label: 'Paganica' },
  { slug: 'ristrutturazioni-coppito', label: 'Coppito' },
  { slug: 'ristrutturazioni-sassa', label: 'Sassa' },
  { slug: 'ristrutturazioni-preturo', label: 'Preturo' },
  { slug: 'ristrutturazioni-pizzoli', label: 'Pizzoli' },
  { slug: 'ristrutturazioni-scoppito', label: 'Scoppito' },
  { slug: 'ristrutturazioni-barisciano', label: 'Barisciano' },
];

// ---------- HEAD ----------
function head(o) {
  const rel = o.rel || '';
  const ga = S.gaId ? `
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${S.gaId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag("js", new Date());
  gtag("config", "${S.gaId}");
</script>` : `
<!-- TODO GOOGLE ANALYTICS: quando disponibile l'ID GA4, inserirlo in _build/lib.js (S.gaId) e rigenerare -->`;

  const schemas = (o.schemas || [])
    .map(s => `<script type="application/ld+json">\n${JSON.stringify(s)}\n</script>`)
    .join('\n');

  return `<!DOCTYPE html>
<html lang="it-IT">
<head>${ga}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- ===== SEO TITLE & META ===== -->
<title>${o.title}</title>
<meta name="description" content="${o.desc}">
${o.keywords ? `<meta name="keywords" content="${o.keywords}">\n` : ''}<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
<meta name="author" content="${S.name}">
<link rel="canonical" href="${S.site}/${o.canonical}">
<link rel="icon" type="image/svg+xml" href="${rel}images/favicon.svg">
<link rel="apple-touch-icon" href="${rel}images/favicon.svg">

<!-- ===== GEO TAG (Local SEO) ===== -->
<meta name="geo.region" content="IT-AQ">
<meta name="geo.placename" content="L'Aquila, Abruzzo">
<meta name="geo.position" content="${S.lat};${S.lng}">
<meta name="ICBM" content="${S.lat}, ${S.lng}">

<!-- ===== OPEN GRAPH ===== -->
<meta property="og:type" content="${o.ogType || 'website'}">
<meta property="og:url" content="${S.site}/${o.canonical}">
<meta property="og:title" content="${o.ogTitle || o.title}">
<meta property="og:description" content="${o.ogDesc || o.desc}">
<meta property="og:image" content="${S.site}/images/${o.ogImage || 'hero-nuova-costruzione.jpg'}">
<meta property="og:locale" content="it_IT">
<meta property="og:site_name" content="${S.name}">

<!-- ===== TWITTER CARD ===== -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${o.ogTitle || o.title}">
<meta name="twitter:description" content="${o.ogDesc || o.desc}">

<!-- ===== PERFORMANCE: PRECONNECT ===== -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://cdnjs.cloudflare.com">

<link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@300;400;500;600;700&family=Karla:wght@300;400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/fontawesome.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/solid.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/regular.min.css">
<link rel="stylesheet" href="${rel}style.css">
${o.extraCss ? `<style>\n${o.extraCss}\n</style>` : ''}
${schemas}
</head>
<body>`;
}

// ---------- HEADER / NAV (struttura RBA) ----------
function header(rel, current) {
  const cur = k => (current === k ? ' class="current"' : '');
  const curDrop = k => (current === k ? 'has-dropdown current' : 'has-dropdown');
  const serviziDrop = SERVIZI_NAV.map(s => `<li><a href="${rel}servizi/${s.slug}.html">${s.label}</a></li>`).join('');
  const zoneDrop = ZONE_NAV.map(z => `<li><a href="${rel}zone/${z.slug}.html">${z.label}</a></li>`).join('');
  return `
<div id="outer-wrap">
<header id="site-header">
  <div id="site-logo"><a href="${rel}index.html"><img src="${rel}images/logo.svg" alt="NVN IMPRESA EDILE"></a></div>
  <div id="header-right">
<nav id="site-navigation">
    <ul>
      <li${cur('home')}><a href="${rel}index.html">Home</a></li>
      <li${cur('chi-siamo')}><a href="${rel}chi-siamo.html">Chi siamo</a></li>
      <li class="${curDrop('servizi')}"><a href="${rel}servizi.html">Servizi <i class="fa fa-chevron-down dropdown-arrow"></i></a><ul class="dropdown">${serviziDrop}</ul></li>
      <li${cur('lavori')}><a href="${rel}lavori.html">I nostri Lavori</a></li>
      <li class="${curDrop('zone')}"><a href="${rel}zone.html">Zone <i class="fa fa-chevron-down dropdown-arrow"></i></a><ul class="dropdown">${zoneDrop}</ul></li>
      <li${cur('faq')}><a href="${rel}faq.html">FAQ</a></li>
      <li${cur('contatti')}><a href="${rel}contatti.html">Contatti</a></li><li${cur('testimonianze')}><a href="${rel}testimonianze.html">Recensioni</a></li>
      <li${cur('news')}><a href="${rel}news.html">News</a></li>
    </ul>
  </nav>
  <a href="${S.telHref}" class="header-phone"><i class="fa-solid fa-phone"></i> ${S.telDisplay}</a>
</div>
<button class="mobile-toggle" id="mobileToggle" aria-label="Menu"><i class="fa fa-bars"></i></button>
</header>
<div id="wrap">`;
}

// ---------- PAGE BANNER (struttura RBA) ----------
function pageBanner(o) {
  const crumbs = o.crumbs
    .map((c, i) =>
      i === o.crumbs.length - 1
        ? `<span class="current-page">${c.label}</span>`
        : `<a href="${c.href}">${c.label}</a><span class="sep">/</span>`
    )
    .join('');
  return `
  <section class="page-banner" style="${o.bg || BANNER_BG}">
    <div class="banner-inner">
      <h1>${o.h1}</h1>
      ${o.sub ? `<p class="banner-sub">${o.sub}</p>` : ''}
      <div class="breadcrumb">${crumbs}</div>
    </div>
  </section>`;
}

// ---------- CTA SECTION (struttura RBA) ----------
function ctaSection(rel, o = {}) {
  return `
  <section class="cta-section reveal" style="margin-top:70px;">
    <h2>${o.title || 'Richiedi un Preventivo Gratuito'}</h2>
    <p>${o.text || 'Sopralluogo gratuito e preventivo dettagliato entro 24 ore, senza impegno.'}</p>
    <a href="${rel}preventivo-ristrutturazione-laquila.html" class="btn-primary">Richiedi Preventivo</a>
    <a href="${rel}contatti.html" class="btn-outline">Contattaci</a>
  </section>`;
}

// ---------- PREVENTIVATORE ONLINE (PrevAI, struttura RBA) ----------
function prevaiSection(rel) {
  return `
  <!-- PREVENTIVATORE ONLINE (PrevAI Widget Funnel) -->
  <section id="preventivatore" style="background:#f7f1e8;padding:70px 20px;position:relative;z-index:5;">
    <div style="max-width:900px;margin:0 auto;">
      <div class="reveal">
        <h2 style="font-family:'Fraunces',serif;font-size:28px;font-weight:600;color:#2c2c2c;text-align:center;margin-bottom:16px;">CALCOLA IL TUO PREVENTIVO ONLINE</h2>
        <div class="contattaci-divider"></div>
        <!-- ============================================================
             PrevAI Widget Funnel — placeholder in attesa dell'API key.
             Quando disponibile, sostituire il blocco qui sotto con:

             <div id="prevai-widget" style="--pvq-accent:#a35a35;--pvq-radius:0;">
               <a href="https://prevai.it" rel="noopener">Calcola il tuo preventivo con PrevAI</a>
             </div>
             <script src="https://www.prevai.it/widget.js" data-api-key="INSERIRE_API_KEY" async></script>
             ============================================================ -->
        <div style="background:#fff;border-top:3px solid #a35a35;padding:44px 32px;text-align:center;">
          <p style="font-size:15px;color:#555;line-height:1.8;max-width:560px;margin:0 auto 26px;">Il preventivatore online sarà presto disponibile. Nel frattempo contattaci direttamente: ti rispondiamo <strong style="color:#a35a35;">entro 24 ore</strong> con una stima gratuita e senza impegno.</p>
          <a href="${rel}preventivo-ristrutturazione-laquila.html" class="btn-primary" style="border-color:transparent;">Richiedi Preventivo Gratuito</a>
        </div>
      </div>
    </div>
  </section>`;
}

// ---------- FOOTER (struttura RBA) ----------
function footer(rel, opts = {}) {
  const year = new Date().getFullYear();
  const zoneLinks = ZONE_NAV.map(z => `<li><a href="${rel}zone/${z.slug}.html">${z.label}</a></li>`).join('');
  return `
  <footer id="footer" itemscope itemtype="https://schema.org/LocalBusiness">
    <meta itemprop="name" content="${S.name}"><meta itemprop="telephone" content="${S.telSchema}">
    <div id="footer-widgets"><div class="footer-widgets-inner">
      <div class="footer-box"><h4>Contatti</h4><div class="textwidget"><a href="mailto:${S.email}">${S.email}</a><br><a href="${S.telHref}">${S.telDisplay}</a><br>P.IVA IT${S.piva}</div></div>
      <div class="footer-box" itemprop="address" itemscope itemtype="https://schema.org/PostalAddress"><h4>Indirizzo</h4><div class="textwidget"><span itemprop="streetAddress">${S.street.replace(',', '')}</span>,<br><span itemprop="postalCode">${S.cap}</span> <span itemprop="addressLocality">${S.city}</span> <span itemprop="addressRegion">${S.prov}</span></div></div>
      <div class="footer-box"><h4>Orario</h4><div class="textwidget">Lunedì – Venerdì: 8:00–18:00<br>Sabato &amp; Domenica: Chiuso</div></div>
      <div class="footer-box">
          <details class="footer-zone-dropdown">
            <summary>Zone Servite</summary>
            <ul class="footer-zone-links">${zoneLinks}</ul>
            <p class="footer-zone-more">e inoltre: tutta la provincia dell'Aquila</p>
          </details>
        </div>
    </div></div>
    <div id="footer-bottom"><div id="copyright">© ${year} ${S.legalName} – Impresa Edile a L'Aquila – P.IVA IT${S.piva} – <a href="mailto:${S.email}">${S.email}</a></div></div>
  </footer>
</div></div>
<a id="scroll-top" href="#" aria-label="Torna in cima"><i class="fa fa-angle-up"></i></a>
${opts.beforeScripts || ''}
${scripts(opts)}
<!-- WHATSAPP FLOATING BUTTON -->
<a href="${S.wa}" class="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="Contattaci su WhatsApp">
  <svg class="whatsapp-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.287 1.488 4.799 1.49 5.367 0 9.734-4.321 9.737-9.63.002-2.571-1.002-4.99-2.827-6.815C16.33 2.373 13.914 1.368 11.51 1.368c-5.372 0-9.738 4.322-9.74 9.631-.001 1.636.438 3.197 1.272 4.606L2.04 21.96l6.607-1.73-.001-.076zm12.355-6.892c-.328-.164-1.942-.959-2.242-1.07-.301-.109-.52-.164-.739.164-.219.329-.848 1.07-1.039 1.289-.192.219-.383.246-.711.082-.328-.164-1.386-.51-2.64-1.627-.975-.87-1.633-1.946-1.824-2.274-.192-.329-.02-.507.144-.671.147-.148.328-.383.493-.574.164-.192.219-.328.328-.548.11-.219.055-.411-.027-.574-.082-.164-.739-1.782-1.012-2.44-.267-.641-.539-.553-.739-.563-.19-.01-.41-.01-.629-.01-.219 0-.575.082-.876.411-.3.329-1.149 1.123-1.149 2.738 0 1.615 1.177 3.178 1.341 3.397.164.219 2.315 3.535 5.607 4.957.783.338 1.394.54 1.87.69.787.25 1.503.215 2.069.13.632-.095 1.943-.795 2.216-1.562.273-.767.273-1.425.191-1.562-.08-.137-.3-.219-.628-.383z"/>
  </svg>
</a>
</body>
</html>`;
}

// ---------- SCRIPTS (identici a RBA pagine interne) ----------
function scripts(opts = {}) {
  return `<script>
const mobileToggle=document.getElementById('mobileToggle'),siteNav=document.getElementById('site-navigation');
mobileToggle.addEventListener('click',(e)=>{e.stopPropagation();siteNav.classList.toggle('open');});
document.addEventListener('click',(e)=>{if(!siteNav.contains(e.target)&&!mobileToggle.contains(e.target))siteNav.classList.remove('open');});
siteNav.querySelectorAll('li.has-dropdown > a').forEach(link=>{link.addEventListener('click',(e)=>{if(window.innerWidth<=900){e.preventDefault();link.parentElement.classList.toggle('mob-open');}});});
const scrollTopBtn=document.getElementById('scroll-top');
window.addEventListener('scroll',()=>scrollTopBtn.classList.toggle('visible',window.scrollY>400),{passive:true});
scrollTopBtn.addEventListener('click',(e)=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'});});
const observer=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});},{threshold:0.12});
document.querySelectorAll('.reveal, .icon-box').forEach(el=>observer.observe(el));
${opts.extraJs || ''}
</script>`;
}

// ---------- SCHEMA BUILDERS ----------
function schemaLocalBusiness() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'GeneralContractor'],
    '@id': `${S.site}/#localbusiness`,
    name: S.name,
    alternateName: S.legalName,
    description: `Impresa edile a L'Aquila specializzata in ristrutturazioni di edifici, tetti in legno, cartongesso, imbiancatura, rifacimento facciate, cappotto termico e progettazione. Operiamo a L'Aquila e in tutta la provincia.`,
    url: `${S.site}/`,
    logo: `${S.site}/images/logo.svg`,
    image: `${S.site}/images/logo.svg`,
    telephone: S.telSchema,
    email: S.email,
    vatID: `IT${S.piva}`,
    founder: { '@type': 'Person', name: S.owner },
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: S.street.replace(',', ''),
      addressLocality: S.city,
      addressRegion: S.prov,
      postalCode: S.cap,
      addressCountry: 'IT',
    },
    geo: { '@type': 'GeoCoordinates', latitude: S.lat, longitude: S.lng },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    areaServed: ZONE_NAV.map(z => ({ '@type': 'City', name: z.label })),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: S.telSchema,
      contactType: 'customer service',
      availableLanguage: 'Italian',
    },
    // TODO: quando ci saranno recensioni reali (Google / PagineGialle), aggiungere aggregateRating
  };
}

function schemaService(o) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: o.name,
    description: o.description,
    serviceType: o.serviceType,
    areaServed: o.areaServed || "L'Aquila e provincia",
    provider: {
      '@type': 'LocalBusiness',
      name: S.name,
      telephone: S.telSchema,
      address: {
        '@type': 'PostalAddress',
        streetAddress: S.street.replace(',', ''),
        addressLocality: S.city,
        postalCode: S.cap,
        addressRegion: S.prov,
        addressCountry: 'IT',
      },
    },
  };
}

function schemaFAQ(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.aText || f.a.replace(/<[^>]+>/g, '') },
    })),
  };
}

function schemaBreadcrumb(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: `${S.site}/${c.path}`,
    })),
  };
}

function schemaArticle(o) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: o.headline,
    description: o.description,
    image: o.image ? [`${S.site}/images/${o.image}`] : undefined,
    datePublished: o.date,
    dateModified: o.date,
    inLanguage: 'it-IT',
    author: { '@type': 'Organization', name: S.name, url: `${S.site}/` },
    publisher: {
      '@type': 'Organization',
      name: S.name,
      logo: { '@type': 'ImageObject', url: `${S.site}/images/logo.svg` },
    },
    mainEntityOfPage: `${S.site}/${o.path}`,
  };
}

// ---------- FAQ (details.faq-item come homepage RBA) ----------
function faqDetails(faqs) {
  return faqs.map((f, i) => `
        <details class="faq-item reveal"${i ? ` style="transition-delay:${(i * 0.08).toFixed(2)}s"` : ''}>
          <summary>${f.q}</summary>
          <p>${f.a}</p>
        </details>`).join('');
}

// ---------- ZONE VICINE LINKS (stile pagina zona RBA) ----------
function zoneVicineLinks(rel, excludeSlug) {
  return ZONE_NAV.filter(z => z.slug !== excludeSlug)
    .map(z => `<a href="${rel}zone/${z.slug}.html">${z.label}</a>`)
    .join('\n      ');
}

// ---------- WRITE ----------
function writePage(relPath, html) {
  const full = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, applyPalette(html), 'utf8');
  console.log('  ✓', relPath);
}

// Genera style.css dalla base RBA applicando la palette attiva
function buildStyleCss() {
  const base = fs.readFileSync(path.join(__dirname, 'style-base.css'), 'utf8');
  writePage('style.css', base);
}

module.exports = {
  S, SERVIZI_NAV, ZONE_NAV, BANNER_BG,
  head, header, pageBanner, ctaSection, prevaiSection, footer, scripts,
  schemaLocalBusiness, schemaService, schemaFAQ, schemaBreadcrumb, schemaArticle,
  faqDetails, zoneVicineLinks, writePage, buildStyleCss,
};
