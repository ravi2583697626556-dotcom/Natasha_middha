/* ═══════════════════════════════════════════
   Natasha Birthday Page — main.js
   ═══════════════════════════════════════════ */

// ══════════ DATA ══════════
const TOTAL = 44;
const imgs = Array.from({ length: TOTAL }, (_, i) => `img/img1 (${i + 1}).jpg`);
const shuffled = [...imgs].sort(() => Math.random() - .5);

const quotes = [
  { text: '"She dances not just with her feet, but with every star in her soul."',          by: '— For Natasha' },
  { text: '"A crown on her head, a fire in her heart, and the whole world at her feet."',   by: '— Her Story' },
  { text: '"She turned her dreams into plans, and her plans into a glorious reality."',     by: "— Miss Rajasthan '25" },
  { text: '"To shine your brightest light is the greatest gift you can give to the world."',by: '— With Love' },
  { text: '"She is both the storm and the calm. The dance and the stillness. A masterpiece."', by: '— Always' },
];

const wishes = [
  { e: '🌹', t: 'May your beauty — inside and out — continue to inspire everyone around you.' },
  { e: '🏆', t: "You wore the crown of Miss Rajasthan like it was made for you. Because it was." },
  { e: '💃', t: 'May your dance floor always be wide, your music always perfect, your moves always fire.' },
  { e: '⭐', t: "Forever Star India couldn't have chosen a brighter soul. The stage is yours, Natasha." },
  { e: '🎨', t: 'Your artistry turns ordinary moments into extraordinary memories. Keep creating.' },
  { e: '💌', t: "1988 followers and counting — but you've always been number one to those who know you." },
  { e: '🌺', t: 'May this birthday mark the beginning of your most beautiful chapter yet.' },
  { e: '✨', t: 'You were born to shine. Not just today — every single day of your beautiful life.' },
  { e: '🦋', t: "Like a butterfly, you've transformed before our eyes. And the best is still to come." },
];

const candleColors    = ['#ff6b8a','#f0c060','#a78bfa','#34d399','#fb923c','#60a5fa','#f472b6'];
const heartChars      = ['💗','💖','✨','🌹','💫','🌸','⭐','💕'];
const galleryLabels   = ['Radiant ✨','Queen 👑','Grace 🌹','Dazzling 💫','Star ⭐','Fire 🔥','Beauty 🌺','Joy 💗','Art 🎨','Dance 💃'];
const polaroidLabels  = ['Star ✨','Queen 👑','Artist 🎨','Dancer 💃','Beauty 🌹','Iconic ⭐','Dazzling 💫','Radiant 🌺','Grace 🦋'];


// ══════════ LOADER ══════════
let loaded = 0;
const lbar = document.getElementById('lbar');

function tick() {
  loaded++;
  const pct = Math.min(100, Math.round(loaded / TOTAL * 100));
  lbar.style.width = pct + '%';
  if (pct >= 100) setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
    launchConfetti();
  }, 400);
}
imgs.forEach(src => {
  const img = new Image();
  img.onload = tick;
  img.onerror = tick;
  img.src = src;
});


// ══════════ CURSOR + TRAIL ══════════
const curEl    = document.getElementById('cur');
const tCanvas  = document.getElementById('trailCanvas');
const tCtx     = tCanvas.getContext('2d');
let mx = innerWidth / 2, my = innerHeight / 2, trailPts = [];

function resizeT() { tCanvas.width = innerWidth; tCanvas.height = innerHeight; }
resizeT();
addEventListener('resize', resizeT);

addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  curEl.style.transform = `translate(${mx - 4}px,${my - 4}px)`;
  trailPts.push({ x: mx, y: my, age: 0, hue: Math.random() * 60 + 330 });
  if (trailPts.length > 45) trailPts.shift();
});

function drawTrail() {
  tCtx.clearRect(0, 0, tCanvas.width, tCanvas.height);
  trailPts.forEach(p => {
    p.age++;
    const a = Math.max(0, (45 - p.age) / 45) * .55;
    const s = Math.max(0, (45 - p.age) / 45) * 7;
    tCtx.beginPath();
    tCtx.arc(p.x, p.y, s, 0, Math.PI * 2);
    tCtx.fillStyle = `hsla(${p.hue},100%,70%,${a})`;
    tCtx.fill();
  });
  trailPts = trailPts.filter(p => p.age < 45);
  requestAnimationFrame(drawTrail);
}
drawTrail();


// ══════════ STARFIELD ══════════
const sf = document.getElementById('starfield');
const sc = sf.getContext('2d');
let stars = [];

function resizeSF() { sf.width = innerWidth; sf.height = innerHeight; }
resizeSF();
addEventListener('resize', resizeSF);

for (let i = 0; i < 170; i++) stars.push({
  x: Math.random() * sf.width,
  y: Math.random() * sf.height,
  r: Math.random() * 1.5 + .3,
  speed: Math.random() * .3 + .05,
  op: Math.random(),
  ts: Math.random() * .03 + .01,
  td: 1,
  hue: Math.random() < .3 ? 350 : 45
});

function drawStars() {
  sc.clearRect(0, 0, sf.width, sf.height);
  stars.forEach(s => {
    s.op += s.ts * s.td;
    if (s.op > 1 || s.op < .1) s.td *= -1;
    s.y -= s.speed;
    if (s.y < 0) { s.y = sf.height; s.x = Math.random() * sf.width; }
    sc.beginPath();
    sc.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    sc.fillStyle = `hsla(${s.hue},80%,90%,${s.op})`;
    sc.fill();
  });
  requestAnimationFrame(drawStars);
}
drawStars();


// ══════════ HERO NAME LETTERS ══════════
const heroNameEl = document.getElementById('heroName');
'NATASHA'.split('').forEach((ch, i) => {
  const sp = document.createElement('span');
  sp.className = 'letter';
  sp.textContent = ch;
  sp.style.animationDelay = (i * .08) + 's';
  heroNameEl.appendChild(sp);
});


// ══════════ POLAROID STRIP ══════════
const strip1    = document.getElementById('strip1');
const stripImgs = [...shuffled].slice(0, 22);

function makePolaroid(src, i) {
  const d   = document.createElement('div');
  d.className = 'polaroid';
  d.style.setProperty('--r', (Math.random() * 10 - 5) + 'deg');
  const img = document.createElement('img'); img.src = src; img.alt = '';
  const lbl = document.createElement('div'); lbl.className = 'polaroid-label';
  lbl.textContent = polaroidLabels[i % polaroidLabels.length];
  d.appendChild(img); d.appendChild(lbl);
  d.onclick = () => openLB(shuffled.indexOf(src));
  return d;
}
[...stripImgs, ...stripImgs].forEach((s, i) => strip1.appendChild(makePolaroid(s, i)));


// ══════════ SCROLL REVEAL ══════════
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));


// ══════════ MORPHING QUOTES ══════════
let qi = 0;
const qText   = document.getElementById('quoteText');
const qAuthor = document.getElementById('quoteAuthor');
const qDots   = document.getElementById('quoteDots');

quotes.forEach((_, i) => {
  const d = document.createElement('div');
  d.className = 'qdot' + (i === 0 ? ' active' : '');
  d.onclick = () => setQuote(i);
  qDots.appendChild(d);
});

function setQuote(i) {
  qi = i;
  qText.style.opacity = '0';
  qText.style.transform = 'translateY(20px)';
  qAuthor.style.opacity = '0';
  setTimeout(() => {
    qText.innerHTML  = quotes[i].text;
    qAuthor.textContent = quotes[i].by;
    qText.style.transition   = 'opacity .6s, transform .6s';
    qText.style.opacity      = '1';
    qText.style.transform    = 'translateY(0)';
    qAuthor.style.transition = 'opacity .6s .2s';
    qAuthor.style.opacity    = '1';
  }, 300);
  document.querySelectorAll('.qdot').forEach((d, j) => d.classList.toggle('active', j === i));
}
setQuote(0);
setInterval(() => setQuote((qi + 1) % quotes.length), 4500);


// ══════════ 3D CAROUSEL ══════════
const car     = document.getElementById('carousel3d');
const carImgs = shuffled.slice(0, 12);
const aStep   = 360 / carImgs.length;
const rad     = Math.round(200 / Math.tan(Math.PI / carImgs.length));

carImgs.forEach((src, i) => {
  const card = document.createElement('div'); card.className = 'c-card';
  const img  = document.createElement('img'); img.src = src; img.alt = '';
  card.appendChild(img);
  card.style.transform = `rotateY(${i * aStep}deg) translateZ(${rad}px)`;
  card.onclick = () => openLB(shuffled.indexOf(src));
  car.appendChild(card);
});


// ══════════ WISHING WALL ══════════
const ww = document.getElementById('wishWall');
wishes.forEach(w => {
  const d = document.createElement('div'); d.className = 'wish-card';
  d.innerHTML = `<span class="wish-emoji">${w.e}</span><p class="wish-text">${w.t}</p>`;
  ww.appendChild(d);
});


// ══════════ MAIN GALLERY ══════════
const mg = document.getElementById('mainGallery');
const filterTypes = ['portrait','candid','glam'];

shuffled.forEach((src, i) => {
  const d   = document.createElement('div');
  let cls = 'g-item';
  if (i % 13 === 0) cls += ' featured';
  else if (i % 7 === 0) cls += ' tall';
  else if (i % 11 === 0) cls += ' wide';
  const ftype = filterTypes[i % filterTypes.length];
  d.className = cls;
  d.dataset.filter = ftype;

  const img = document.createElement('img'); img.src = src; img.alt = ''; img.loading = 'lazy';

  const ov  = document.createElement('div'); ov.className = 'g-overlay';
  const ot  = document.createElement('div'); ot.className = 'g-overlay-text';
  ot.textContent = galleryLabels[i % galleryLabels.length];
  const on  = document.createElement('div'); on.className = 'g-overlay-num';
  on.textContent = String(i + 1).padStart(2, '0') + ' / 44';

  ov.appendChild(ot); ov.appendChild(on);
  d.appendChild(img); d.appendChild(ov);
  d.onclick = () => openLB(i);

  // Staggered entrance animation
  d.style.opacity = '0';
  d.style.transform = 'scale(0.92)';
  setTimeout(() => {
    d.style.transition = 'opacity .5s, transform .5s';
    d.style.opacity = '1';
    d.style.transform = 'scale(1)';
  }, 100 + i * 30);

  mg.appendChild(d);
});

// Filter logic
let activeFilter = 'all';
document.querySelectorAll('.gfb').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.gfb').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    let visible = 0;
    document.querySelectorAll('.g-item').forEach(item => {
      const match = activeFilter === 'all' || item.dataset.filter === activeFilter;
      if (match) {
        item.style.display = '';
        item.classList.add('showing');
        item.classList.remove('hiding');
        visible++;
      } else {
        item.classList.add('hiding');
        item.classList.remove('showing');
        setTimeout(() => { item.style.display = 'none'; }, 350);
      }
    });
    const gcNum = document.getElementById('gcNum');
    if (gcNum) gcNum.textContent = activeFilter === 'all' ? '44' : visible;
  });
});


// ══════════ GALLERY: 3D TILT ══════════
// Each card lifts and rotates in 3D to follow the cursor,
// with a gloss highlight that slides to the light source.

document.querySelectorAll('.g-item').forEach(item => {
  // Create the gloss layer once per card
  const gloss = document.createElement('div');
  gloss.className = 'g-gloss';
  item.appendChild(gloss);

  item.addEventListener('mousemove', e => {
    const r  = item.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;   // 0 → 1
    const py = (e.clientY - r.top)  / r.height;  // 0 → 1
    const rx = (px - .5) * 8;   // rotate around Y
    const ry = (.5 - py) * 8;   // rotate around X

    item.style.transform  = `perspective(900px) rotateY(${rx}deg) rotateX(${ry}deg) scale(1) translateZ(0)`;
    item.style.zIndex     = '20';
    item.style.transition = 'transform .25s ease, box-shadow .3s';
    item.style.boxShadow  = `
      ${-rx * 1.2}px ${ry * 1.2}px 40px rgba(0,0,0,.55),
      0 0 0 1px rgba(240,192,96,.35)
    `;

    // Gloss highlight follows the "light source" opposite the tilt
    gloss.style.background = `radial-gradient(
      ellipse at ${px * 100}% ${py * 100}%,
      rgba(255,255,255,.18) 0%,
      rgba(255,255,255,.04) 40%,
      transparent 70%
    )`;
    gloss.style.opacity = '1';
  });

  item.addEventListener('mouseleave', () => {
    item.style.transform  = 'perspective(700px) rotateY(0deg) rotateX(0deg) scale(1) translateZ(0)';
    item.style.zIndex     = '';
    item.style.boxShadow  = '';
    item.style.transition = 'transform .7s cubic-bezier(.16,1,.3,1), box-shadow .6s';
    gloss.style.opacity   = '0';
  });
});


// ══════════ LIGHTBOX ══════════
let lbIdx = 0;
const lb        = document.getElementById('lb');
const lbImg     = document.getElementById('lbImg');
const lbCounter = document.getElementById('lbCounter');

function openLB(i) {
  lbIdx = i;
  lbImg.src = shuffled[i];
  lb.classList.add('open');
  lbCounter.textContent = `${i + 1} / ${shuffled.length}`;
}
function closeLB() { lb.classList.remove('open'); }
function navLB(d) {
  lbIdx = (lbIdx + d + shuffled.length) % shuffled.length;
  lbImg.src = shuffled[lbIdx];
  lbCounter.textContent = `${lbIdx + 1} / ${shuffled.length}`;
}

lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
addEventListener('keydown', e => {
  if (e.key === 'Escape')      closeLB();
  if (e.key === 'ArrowRight')  navLB(1);
  if (e.key === 'ArrowLeft')   navLB(-1);
});


// ══════════ CANDLES ══════════
const cr = document.getElementById('candlesRow');
let candlesLit = true;

candleColors.forEach((col, i) => {
  const c = document.createElement('div'); c.className = 'candle';
  const f = document.createElement('div'); f.className = 'flame'; f.id = 'flame' + i;
  const w = document.createElement('div'); w.className = 'wick';
  const b = document.createElement('div'); b.className = 'candle-body';
  b.style.background = `linear-gradient(to bottom,${col},${candleColors[(i + 1) % candleColors.length]})`;
  c.appendChild(f); c.appendChild(w); c.appendChild(b);
  cr.appendChild(c);
});

function blowCandles() {
  if (!candlesLit) return;
  document.querySelectorAll('.flame').forEach((f, i) =>
    setTimeout(() => f.classList.add('out'), i * 200)
  );
  setTimeout(() => {
    document.getElementById('blowMsg').classList.add('show');
    const btn = document.getElementById('blowBtn');
    btn.textContent = '🕯️ Relight';
    btn.onclick = relightCandles;
    spawnHearts(20);
  }, candleColors.length * 200 + 400);
  candlesLit = false;
}

function relightCandles() {
  document.querySelectorAll('.flame').forEach(f => f.classList.remove('out'));
  document.getElementById('blowMsg').classList.remove('show');
  const btn = document.getElementById('blowBtn');
  btn.textContent = '💨 Blow!';
  btn.onclick = blowCandles;
  candlesLit = true;
}


// ══════════ FLOATING HEARTS ══════════
function spawnHeart(x, y) {
  const h = document.createElement('div'); h.className = 'fh';
  h.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
  h.style.left = x + 'px';
  h.style.top  = y + 'px';
  h.style.fontSize = (1 + Math.random()) + 'rem';
  h.style.animationDuration = (2.5 + Math.random() * 2) + 's';
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 4000);
}

function spawnHearts(n) {
  for (let i = 0; i < n; i++)
    setTimeout(() => spawnHeart(
      Math.random() * innerWidth,
      Math.random() * innerHeight * .8 + innerHeight * .1
    ), i * 100);
}

addEventListener('click', e => {
  for (let i = 0; i < 5; i++)
    spawnHeart(e.clientX + (Math.random() * 40 - 20), e.clientY + (Math.random() * 20 - 10));
});


// ══════════ CONFETTI ══════════
const cc   = document.getElementById('confetti-canvas');
const cctx = cc.getContext('2d');
cc.width = innerWidth; cc.height = innerHeight;
addEventListener('resize', () => { cc.width = innerWidth; cc.height = innerHeight; });

let pieces = [];
const confColors = ['#ff6b8a','#f0c060','#a78bfa','#06b6d4','#34d399','#fb923c','#f472b6','#fff'];

function launchConfetti() {
  for (let i = 0; i < 220; i++) pieces.push({
    x: Math.random() * cc.width,
    y: -20 - Math.random() * 200,
    w: 6 + Math.random() * 8,
    h: 4 + Math.random() * 6,
    color: confColors[Math.floor(Math.random() * confColors.length)],
    vx: (Math.random() - .5) * 4,
    vy: 2 + Math.random() * 4,
    r:  Math.random() * Math.PI * 2,
    vr: (Math.random() - .5) * .2,
    life: 1
  });
  drawConf();
}

function drawConf() {
  cctx.clearRect(0, 0, cc.width, cc.height);
  pieces = pieces.filter(p => p.y < cc.height + 20 && p.life > 0);
  pieces.forEach(p => {
    p.x  += p.vx + Math.sin(Date.now() * .001 + p.y * .01) * .5;
    p.y  += p.vy; p.r += p.vr; p.vy += 0.04; p.life -= 0.004;
    cctx.save();
    cctx.globalAlpha = Math.max(0, p.life);
    cctx.translate(p.x, p.y); cctx.rotate(p.r);
    cctx.fillStyle = p.color;
    cctx.beginPath();
    cctx.ellipse(0, 0, p.w / 2, p.h / 2, 0, 0, Math.PI * 2);
    cctx.fill();
    cctx.restore();
  });
  if (pieces.length > 0) requestAnimationFrame(drawConf);
  else cctx.clearRect(0, 0, cc.width, cc.height);
}


// ══════════ PARALLAX HERO ══════════
addEventListener('scroll', () => {
  const heroBg = document.querySelector('.hero-bg-img');
  if (heroBg) heroBg.style.transform = `scale(1.1) translateY(${scrollY * .3}px)`;
});


// ══════════ FINALE — TRIGGER CONFETTI ON SCROLL ══════════
new IntersectionObserver(
  e => { if (e[0].isIntersecting) launchConfetti(); },
  { threshold: .3 }
).observe(document.getElementById('finale'));
