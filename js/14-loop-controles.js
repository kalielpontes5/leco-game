// ════════════════════════════════════════════════════════════
// ─ ARQUIVO: 14-loop-controles.js — Laço principal e controles
// ─ Loop do jogo, teclado, botões de toque e ajuste de tela (fit).
// ════════════════════════════════════════════════════════════
// ─ CB: botão C (celular)
const CB = document.querySelector('#t [data-k="c"]');
let cbv = null;
// ─ Observa os textos da barra superior (hn/hs)
['hn', 'hs'].forEach((id) => {
  const e = $(id),
    d = Object.getOwnPropertyDescriptor(Node.prototype, 'textContent');
  let v;
  Object.defineProperty(e, 'textContent', {
    get() {
      return d.get.call(this);
    },
    set(x) {
      if (x !== v) {
        v = x;
        d.set.call(this, x);
      }
    },
    configurable: true
  });
});
// ─ loop: laço principal (atualiza e desenha cada quadro)
let last = 0;
function loop(ts) {
  {
    const wc = !!(boss && boss.on && !boss.dead);
    if (CB && wc !== cbv) {
      cbv = wc;
      CB.style.display = wc ? '' : 'none';
    }
  }
  const dt = Math.min((ts - last) / 1000 || 0, 0.033);
  last = ts;
  T += dt;
  joy = Math.max(0, joy - dt);
  if (S.mode == 'play') step(dt);
  if (S.mode == 'swim') swimStep(dt);
  if (S.mode == 'cine' && cs) cineStep(dt);
  if (S.mode == 'intro6' && I6) intro6Step(dt);
  if (I6 && S.mode != 'intro6') {
    I6 = null;
    $('h').style.display = 'flex';
  }
  if (S.mode == 'end' && Math.random() < 0.4)
    pt.push({
      x: Math.random() * 384,
      y: 0,
      vx: 0,
      vy: 50,
      l: 3,
      c: BC[pt.length % 4]
    });
  pt = pt.filter((p) => (p.l -= dt) > 0);
  pt.forEach((p) => {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += (S.mode == 'end' ? 0 : 200) * dt;
  });
  if (S.mode == 'cine' && cs) cineDraw();
  else if (sw && (S.mode == 'swim' || S.mode == 'panel')) swimDraw();
  else if (S.mode == 'intro6' && I6) intro6Draw();
  else draw();
  heartVig();
  requestAnimationFrame(loop);
}
// ─ JK: teclas de pulo
const JK = ['w', 'arrowup'];
// ─ dn: tecla pressionada
function dn(k) {
  k = k.toLowerCase();
  K[k] = 1;
  if (S.mode == 'intro6') {
    if (k == ' ') intro6End();
    return;
  }
  if (k == 'escape') {
    if (S.mode == 'play') pauseP();
    else if (S.mode == 'pause') resume();
    return;
  }
  if (k == 'enter' && S.mode == 'panel') {
    const b = $('o').querySelector('button.b:not([disabled])');
    if (b && /GUARDAR PISTA|VOLTAR AO MAPA/.test(b.textContent)) b.click();
    return;
  }
  if (k == 'f' && S.mode == 'swim' && vis <= 0 && visCd <= 0) {
    vis = 5;
    sfx(700, 0.2, 'sine', 1200);
    return;
  }
  if (S.mode == 'cine') {
    if (k == ' ' || k == 'e' || k == 'enter') cineNext();
    return;
  }
  if (S.mode != 'play' || vict > 0) return;
  if (JK.includes(k)) jb = 0.12;
  if (k == 'arrowdown') act();
  if (k == 'f' && !(boss && boss.on) && vis <= 0 && visCd <= 0) {
    vis = 5;
    sfx(700, 0.2, 'sine', 1200);
  }
  if (k == ' ') tongue();
  if (k == 'c' && boss && boss.on && !boss.dead && camT <= 0 && camCd <= 0) {
    camT = camDur = boss && boss.on && !boss.dead ? 4 : 3;
    sfx(250, 0.4, 'sine', 90);
  }
  if (k == 'i') invP();
}
// ─ up: tecla solta
function up(k) {
  k = k.toLowerCase();
  K[k] = 0;
  if (JK.includes(k) && P.vy < -90) P.vy *= 0.5;
}
// ─ Eventos de teclado
addEventListener('keydown', (e) => {
  if (
    S.mode == 'play' &&
    [' ', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(
      e.key.toLowerCase()
    )
  )
    e.preventDefault();
  if (!e.repeat) dn(e.key);
});
// ─ keyup e perda de foco
addEventListener('keyup', (e) => up(e.key));
addEventListener('blur', () => {
  for (const k in K) K[k] = 0;
});
// ─ Botões de toque (celular)
document.querySelectorAll('#t button').forEach((b) => {
  b.onpointerdown = (e) => {
    e.preventDefault();
    dn(b.dataset.k);
  };
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(
    (v) => (b['on' + v] = () => up(b.dataset.k))
  );
});
// ─ fit: ajusta o jogo ao tamanho da tela
function fit() {
  const hh = (e) =>
      getComputedStyle(e).display == 'none' ? 0 : e.offsetHeight,
    w = $('w'),
    u = hh($('h')) + hh($('ts')) + hh($('t')),
    a = Math.max(100, Math.min(innerWidth, ((innerHeight - u) * 16) / 9));
  w.style.width = a + 'px';
  w.style.height = (a * 9) / 16 + 'px';
}
addEventListener('resize', fit);
fit();
