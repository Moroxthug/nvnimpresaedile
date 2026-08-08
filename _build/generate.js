// ============================================================
// NVN IMPRESA EDILE — genera tutte le pagine del sito
// Design system: RBA Edilizia
// Uso: node _build/generate.js
// ============================================================
const L = require('./lib');
const SERVIZI = require('./data-servizi');
const ZONE = require('./data-zone');
const NEWS = require('./data-news');
const buildRootPages = require('./pages-root');

const TODAY = '2026-08-08';

// CSS condiviso dalle pagine servizio (ricalcato dalle pagine servizio RBA)
const SERVIZIO_CSS = `
.intro-section{max-width:860px;margin:60px auto 0;padding:0 20px;}
.intro-section p{font-size:15px;color:#555;line-height:1.9;margin-bottom:18px;}
.intro-section a{color:#a35a35;text-decoration:none;font-weight:700;}
.vantaggi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px;max-width:1100px;margin:70px auto 0;padding:0 20px;}
.vantaggio-card{background:#f9f6f1;padding:32px 24px;text-align:center;}
.vantaggio-card i{font-size:32px;color:#a35a35;margin-bottom:16px;display:block;}
.vantaggio-card h3{font-size:14px;letter-spacing:1.5px;text-transform:uppercase;color:#33291f;margin-bottom:10px;}
.vantaggio-card p{font-size:13px;color:#777;line-height:1.7;}
.content-block{max-width:860px;margin:70px auto 0;padding:0 20px;}
.content-block h2{font-size:20px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#33291f;margin-bottom:22px;}
.content-block p{font-size:15px;color:#555;line-height:1.9;margin-bottom:16px;}
.content-block a{color:#a35a35;text-decoration:none;font-weight:700;}
.content-block ul,.content-block ol{margin:0 0 18px 22px;}
.content-block ul li,.content-block ol li{font-size:14.5px;color:#555;line-height:1.85;margin-bottom:8px;}
.content-block strong{color:#a35a35;}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
.info-box{background:#f9f6f1;border-left:3px solid #a35a35;padding:18px 20px;margin-bottom:14px;}
.info-box p{font-size:13.5px;color:#555;line-height:1.75;margin:0;}
.cost-section{max-width:860px;margin:70px auto 0;padding:0 20px;}
.cost-section h2{font-size:20px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#33291f;margin-bottom:14px;text-align:center;}
.cost-section .cost-intro{font-size:14.5px;color:#555;line-height:1.8;text-align:center;margin-bottom:26px;}
.cost-section table{width:100%;border-collapse:collapse;font-size:14px;}
.cost-section th{background:#33291f;color:#fff;padding:12px 16px;text-align:left;font-family:'Fraunces',serif;font-size:13px;}
.cost-section td{padding:12px 16px;border-bottom:1px solid #e8e4dc;color:#555;}
.cost-section tr:nth-child(even) td{background:#f9f6f1;}
.cost-note{font-size:12.5px;color:#999;font-style:italic;margin-top:12px;}
.faq-block{max-width:860px;margin:70px auto 0;padding:0 20px;}
.faq-block h2{font-size:17px;letter-spacing:2px;text-transform:uppercase;color:#33291f;margin-bottom:24px;}
.altri-servizi{max-width:860px;margin:60px auto 0;padding:0 20px;}
.altri-servizi h2{font-size:17px;letter-spacing:2px;text-transform:uppercase;color:#33291f;margin-bottom:18px;}
.altri-servizi-links{display:flex;flex-wrap:wrap;gap:10px;}
.altri-servizi-links a{font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#33291f;text-decoration:none;border:1px solid #c5c0b5;padding:8px 16px;transition:background .2s,color .2s;}
.altri-servizi-links a:hover{background:#33291f;color:#fff;}
@media(max-width:600px){.grid-2{grid-template-columns:1fr;}}`;

// CSS condiviso dalle pagine zona (ricalcato da zone/ristrutturazioni-monza.html di RBA)
const ZONA_CSS = `
.intro-section{max-width:860px;margin:60px auto 0;padding:0 20px;}
.intro-section p{font-size:15px;color:#555;line-height:1.9;margin-bottom:18px;}
.intro-section strong{color:#a35a35;}
.servizi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;max-width:1100px;margin:60px auto 0;padding:0 20px;}
.servizio-card-z{background:#f9f6f1;padding:28px 24px;border-top:3px solid #a35a35;}
.servizio-card-z i{font-size:24px;color:#a35a35;margin-bottom:14px;display:block;}
.servizio-card-z h3{font-size:14px;letter-spacing:1.5px;text-transform:uppercase;color:#33291f;margin-bottom:8px;}
.servizio-card-z p{font-size:13px;color:#777;line-height:1.75;margin-bottom:12px;}
.servizio-card-z a{font-size:12px;color:#a35a35;letter-spacing:1px;text-transform:uppercase;text-decoration:none;font-weight:700;}
.numeri-section{background:#33291f;padding:70px 40px;text-align:center;margin-top:70px;}
.numeri-section h2{font-size:17px;letter-spacing:3px;text-transform:uppercase;color:#fff;margin-bottom:40px;}
.numeri-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:30px;max-width:900px;margin:0 auto;}
.numero-box{color:#fff;}
.numero-box .num{font-family:'Fraunces',serif;font-size:52px;font-weight:700;color:#c9b99a;line-height:1;}
.numero-box .label{font-size:12px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.75);margin-top:8px;}
.zone-vicine{max-width:860px;margin:60px auto 0;padding:0 20px;}
.zone-vicine h2{font-size:17px;letter-spacing:2px;text-transform:uppercase;color:#33291f;margin-bottom:18px;}
.zone-vicine-links{display:flex;flex-wrap:wrap;gap:10px;}
.zone-vicine-links a{font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#33291f;text-decoration:none;border:1px solid #c5c0b5;padding:8px 16px;transition:background .2s,color .2s;}
.zone-vicine-links a:hover{background:#33291f;color:#fff;}
.faq-block{max-width:860px;margin:60px auto 0;padding:0 20px;}
.faq-block h2{font-size:17px;letter-spacing:2px;text-transform:uppercase;color:#33291f;margin-bottom:24px;}`;

// CSS articoli news
const NEWS_CSS = `
.article-body{max-width:860px;margin:60px auto 0;padding:0 20px;}
.article-body p{font-size:15px;color:#555;line-height:1.9;margin-bottom:18px;}
.article-body h2{font-size:20px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#33291f;margin:44px 0 18px;}
.article-body h2:first-child{margin-top:0;}
.article-body h3{font-family:'Fraunces',serif;font-size:17px;color:#a35a35;margin:28px 0 10px;}
.article-body a{color:#a35a35;text-decoration:none;font-weight:700;}
.article-body strong{color:#a35a35;}
.article-body em{color:#777;}
.article-body ul,.article-body ol{margin:0 0 20px 22px;}
.article-body ul li,.article-body ol li{font-size:14.5px;color:#555;line-height:1.85;margin-bottom:9px;}
.article-body .info-box{background:#f9f6f1;border-left:3px solid #a35a35;padding:20px 24px;margin:30px 0;}
.article-body .info-box p{margin:0;font-size:14px;}
.article-back{max-width:860px;margin:50px auto 0;padding:0 20px;}
.article-back a{font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#33291f;text-decoration:none;border:1px solid #c5c0b5;padding:8px 16px;transition:background .2s,color .2s;display:inline-block;}
.article-back a:hover{background:#33291f;color:#fff;}`;

// ============================================================
// PAGINE SERVIZIO
// ============================================================
function buildServizio(s) {
  const rel = '../';
  const canonical = `servizi/${s.slug}.html`;
  const crumbs = [
    { label: 'Home', href: rel + 'index.html', path: '' },
    { label: 'Servizi', href: rel + 'servizi.html', path: 'servizi.html' },
    { label: s.label, href: '#', path: canonical },
  ];

  const schemas = [
    L.schemaService({ name: s.h1, description: s.schemaDesc, serviceType: s.serviceType }),
    L.schemaFAQ(s.faqs),
    L.schemaBreadcrumb(crumbs),
  ];

  const vantaggi = s.vantaggi.map((v, i) => `
      <div class="vantaggio-card reveal"${i ? ` style="transition-delay:.${i}s"` : ''}><i class="${v.icon}"></i><h3>${v.h}</h3><p>${v.p}</p></div>`).join('');

  const sections = s.sections.map(sec => `
  <div class="content-block reveal">
    <h2>${sec.h2}</h2>
    ${sec.html}
  </div>`).join('\n');

  const cost = `
  <div class="cost-section reveal">
    <h2>${s.costTable.h2}</h2>
    <p class="cost-intro">${s.costTable.intro}</p>
    <table>
      <thead><tr>${s.costTable.cols.map(c => `<th>${c}</th>`).join('')}</tr></thead>
      <tbody>${s.costTable.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
    </table>
    <p class="cost-note">${s.costTable.note}</p>
  </div>`;

  const html = `${L.head({ rel, title: s.title, desc: s.metaDesc, canonical, schemas, extraCss: SERVIZIO_CSS })}
${L.header(rel, 'servizi')}
${L.pageBanner({ h1: s.h1, sub: s.bannerSub, crumbs })}

  <div class="intro-section reveal">
    ${s.intro.map(p => `<p>${p}</p>`).join('\n    ')}
  </div>

  <div class="vantaggi-grid">${vantaggi}
  </div>
${sections}
${cost}

  <div class="faq-block">
    <h2>Domande Frequenti — ${s.label}</h2>${L.faqDetails(s.faqs)}
  </div>

  <div class="altri-servizi reveal">
    <h2>Scopri gli Altri Servizi</h2>
    <div class="altri-servizi-links">
      ${L.SERVIZI_NAV.filter(x => x.slug !== s.slug).map(x => `<a href="${x.slug}.html">${x.label}</a>`).join('\n      ')}
    </div>
  </div>
${L.ctaSection(rel, { title: `Preventivo ${s.label} a L'Aquila`, text: 'Sopralluogo gratuito e preventivo scritto e dettagliato entro 24 ore.' })}
${L.footer(rel)}`;

  L.writePage(canonical, html);
}

// ============================================================
// PAGINE ZONA
// ============================================================
function buildZona(z) {
  const rel = '../';
  const canonical = `zone/${z.slug}.html`;
  const crumbs = [
    { label: 'Home', href: rel + 'index.html', path: '' },
    { label: 'Zone', href: rel + 'zone.html', path: 'zone.html' },
    { label: z.label, href: '#', path: canonical },
  ];

  const schemas = [
    L.schemaService({
      name: `Ristrutturazioni a ${z.label}`,
      description: z.metaDesc,
      serviceType: 'Ristrutturazioni e lavori edili',
      areaServed: z.label,
    }),
    L.schemaFAQ(z.faqs),
    L.schemaBreadcrumb(crumbs),
  ];

  const serviziCards = [
    { slug: 'ristrutturazioni-laquila', icon: 'fas fa-home', h: 'Ristrutturazioni', p: `Ristrutturazioni complete o parziali di case e appartamenti a ${z.label}: murature, impianti, finiture. Chiavi in mano o per fasi.` },
    { slug: 'ristrutturazione-bagno-laquila', icon: 'fas fa-bath', h: 'Rifacimento Bagno', p: 'Demolizione, impianti, piastrelle, sanitari e box doccia. Bagno completo consegnato in 10–15 giorni lavorativi.' },
    { slug: 'tetti-in-legno-laquila', icon: 'fas fa-warehouse', h: 'Tetti in Legno', p: 'Coperture in lamellare e massello, ventilate e coibentate, dimensionate per i carichi di neve della zona.' },
    { slug: 'cappotto-termico-laquila', icon: 'fas fa-thermometer-half', h: 'Cappotto Termico', p: 'Isolamento a cappotto certificato per ridurre i consumi fino al 40%. Detrazioni fiscali applicabili.' },
    { slug: 'cartongesso-laquila', icon: 'fas fa-layer-group', h: 'Cartongesso', p: 'Controsoffitti con LED, pareti divisorie e contropareti isolanti per ambienti moderni e caldi.' },
    { slug: 'ristrutturazione-chiavi-in-mano-laquila', icon: 'fas fa-key', h: 'Chiavi in Mano', p: 'Un unico interlocutore dalla progettazione alla consegna: muratura, impianti, pavimenti e finiture.' },
  ].map((c, i) => `
      <div class="servizio-card-z reveal"${i ? ` style="transition-delay:.${(i * 5).toString().padStart(2, '0')}s"`.replace('.05s', '.05s') : ''}><i class="${c.icon}"></i><h3>${c.h}</h3><p>${c.p}</p><a href="${rel}servizi/${c.slug}.html">Scopri il servizio →</a></div>`).join('');

  const html = `${L.head({ rel, title: z.title, desc: z.metaDesc, canonical, schemas, extraCss: ZONA_CSS })}
${L.header(rel, 'zone')}
${L.pageBanner({ h1: z.h1, sub: z.bannerSub, crumbs })}

  <div class="intro-section reveal">
    ${z.intro.map(p => `<p>${p}</p>`).join('\n    ')}
  </div>

  <div style="max-width:1100px;margin:50px auto 0;padding:0 20px;">
    <h2 style="font-size:17px;letter-spacing:2px;text-transform:uppercase;color:#33291f;margin-bottom:30px;text-align:center;">Servizi Edili a ${z.label}</h2>
    <div class="servizi-grid" style="margin-top:0;">${serviziCards}
    </div>
  </div>

  <!-- TODO: aggiornare i numeri con i dati reali forniti dal cliente -->
  <div class="numeri-section reveal">
    <h2>${L.S.name} in Numeri</h2>
    <div class="numeri-grid">
      <div class="numero-box"><div class="num">10+</div><div class="label">Anni di esperienza</div></div>
      <div class="numero-box"><div class="num">150+</div><div class="label">Progetti completati</div></div>
      <div class="numero-box"><div class="num">24h</div><div class="label">Preventivo gratuito</div></div>
      <div class="numero-box"><div class="num">100%</div><div class="label">Cantieri seguiti di persona</div></div>
    </div>
  </div>

  <div class="zone-vicine reveal">
    <h2>Operiamo Anche nelle Zone Vicine a ${z.label}</h2>
    <div class="zone-vicine-links">
      ${L.zoneVicineLinks(rel, z.slug)}
    </div>
  </div>

  <div class="faq-block">
    <h2>Domande Frequenti — ${z.label}</h2>${L.faqDetails(z.faqs)}
  </div>
${L.ctaSection(rel, { title: `Preventivo Ristrutturazione a ${z.label}`, text: 'Sopralluogo gratuito e preventivo scritto e dettagliato entro 24 ore.' })}
${L.footer(rel)}`;

  L.writePage(canonical, html);
}

// ============================================================
// ARTICOLI NEWS
// ============================================================
function buildArticolo(a) {
  const rel = '../';
  const canonical = `news/${a.slug}.html`;
  const crumbs = [
    { label: 'Home', href: rel + 'index.html', path: '' },
    { label: 'News', href: rel + 'news.html', path: 'news.html' },
    { label: a.category, href: '#', path: canonical },
  ];

  const schemas = [
    L.schemaArticle({ headline: a.h1, description: a.metaDesc, date: a.date, path: canonical }),
    L.schemaBreadcrumb(crumbs),
  ];

  const dateIt = new Date(a.date + 'T12:00:00').toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });

  const html = `${L.head({ rel, title: a.title, desc: a.metaDesc, canonical, schemas, ogType: 'article', extraCss: NEWS_CSS })}
${L.header(rel, 'news')}
${L.pageBanner({ h1: a.h1, sub: `${dateIt} · ${a.category}`, crumbs })}

  <article class="article-body reveal">
    ${a.body}
  </article>

  <div class="article-back reveal">
    <a href="${rel}news.html">← Torna alle News</a>
  </div>
${L.ctaSection(rel)}
${L.footer(rel)}`;

  L.writePage(canonical, html);
}

// ============================================================
// SITEMAP + ROBOTS
// ============================================================
function buildSitemap() {
  const url = (loc, lastmod, changefreq, priority) => `  <url>
    <loc>${L.S.site}/${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

  const parts = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
    '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9',
    '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">',
    '',
    '  <!-- HOMEPAGE -->',
    url('', TODAY, 'weekly', '1.0'),
    '',
    '  <!-- PAGINE PRINCIPALI -->',
    url('chi-siamo.html', TODAY, 'monthly', '0.8'),
    url('servizi.html', TODAY, 'monthly', '0.9'),
    url('lavori.html', TODAY, 'monthly', '0.8'),
    url('zone.html', TODAY, 'monthly', '0.8'),
    url('faq.html', TODAY, 'monthly', '0.7'),
    url('testimonianze.html', TODAY, 'monthly', '0.8'),
    url('news.html', TODAY, 'weekly', '0.7'),
    url('contatti.html', TODAY, 'monthly', '0.8'),
    url('preventivo-ristrutturazione-laquila.html', TODAY, 'monthly', '0.9'),
    '',
    '  <!-- PAGINE SERVIZIO -->',
    ...SERVIZI.map(s => url(`servizi/${s.slug}.html`, TODAY, 'monthly', s.slug === 'ristrutturazioni-laquila' ? '0.9' : '0.8')),
    '',
    '  <!-- PAGINE ZONA -->',
    ...ZONE.map(z => url(`zone/${z.slug}.html`, TODAY, 'monthly', z.priority || '0.7')),
    '',
    '  <!-- ARTICOLI NEWS -->',
    ...NEWS.map(a => url(`news/${a.slug}.html`, a.date, 'monthly', '0.7')),
    '',
    '</urlset>',
    '',
  ];
  L.writePage('sitemap.xml', parts.join('\n'));
}

function buildRobots() {
  L.writePage('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${L.S.site}/sitemap.xml\n`);
}

// ============================================================
// RUN
// ============================================================
console.log('Generazione sito NVN Impresa Edile (design RBA)...');
L.buildStyleCss();
SERVIZI.forEach(buildServizio);
ZONE.forEach(buildZona);
NEWS.forEach(buildArticolo);
buildRootPages({ SERVIZI, ZONE, NEWS, TODAY });
buildSitemap();
buildRobots();
console.log('Fatto.');
