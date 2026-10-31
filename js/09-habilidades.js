// ════════════════════════════════════════════════════════════
// ─ ARQUIVO: 09-habilidades.js — Habilidades, itens e vidas
// ─ Itens que caem, poderes, modo Foco, invisibilidade, HUD, comemoração, vidas e derrota no chefão.
// ════════════════════════════════════════════════════════════
// ---------- HABILIDADES, ITENS E COMEMORAÇÃO ----------
// ─ LW/lecoW: Leco com poder (cache)
const LW = {},
  lecoW = (p, f, cm, ex, pw) => {
    const k = [p, f, cm, ex, pw].join('_');
    return (
      LW[k] ||
      (LW[k] = (() => {
        const s = lecoCv(p, f, cm, ex, pw);
        return mk(s.width, s.height, (x) => {
          x.drawImage(s, 0, 0);
          x.globalCompositeOperation = 'source-in';
          x.fillStyle = '#fff';
          x.fillRect(0, 0, s.width, s.height);
        });
      })())
    );
  };
// ─ PWC: cores dos poderes
const PWC = {
  1: { a: '#b36cff', b: '#e6c8ff' },
  2: { a: '#3fa0ff', b: '#c4e6ff' }
};
// ─ extraStep: itens, poderes e tempos extras por quadro
function extraStep(dt) {
  pwR = Math.max(0, pwR - dt);
  pwS = Math.max(0, pwS - dt);
  lightT = Math.max(0, lightT - dt);
  if (!boss && vict <= 0 && lt > 5.5 && TIPS[S.li])
    for (const q of TIPS[S.li]) {
      const k = S.li + '-' + q[0];
      if (!tipsSeen[k] && P.x >= q[0] && P.x < q[0] + 90) {
        tipsSeen[k] = 1;
        toast(q[1], 4200);
        break;
      }
    }
  if (vict > 0) {
    vict -= dt;
    inv = Math.max(inv, 0.5);
    if (Math.random() < dt * 30)
      pt.push({
        x: cam + Math.random() * 384,
        y: -4,
        vx: (Math.random() - 0.5) * 30,
        vy: 20 + Math.random() * 30,
        l: 2.6,
        c: BC[(Math.random() * 4) | 0]
      });
    if (vict <= 0) {
      vict = 0;
      showPhaseResults();
    }
    return;
  }
  if (!boss || !boss.on || boss.dead) {
    drops = [];
    return;
  }
  dropT -= dt;
  if (dropT <= 0) {
    dropT = 7 + Math.random() * 5;
    if (drops.length < 2) {
      const ph = php <= 2 ? 0.6 : 0.28,
        r = Math.random(),
        k = r < ph ? 'h' : r < ph + (1 - ph) / 2 ? 'r' : 's';
      drops.push({
        k,
        x: arenaX + 22 + Math.random() * (L.w - arenaX - 150),
        y: -8,
        vy: 0,
        g: 0
      });
    }
  }
  drops = drops.filter((d) => {
    if (d.y < 180) {
      d.vy = Math.min(d.vy + 110 * dt, 90);
      d.y = Math.min(180, d.y + d.vy * dt);
      if (d.y >= 180) {
        d.vy = 0;
        burst(d.x, 178, '#ffffff', 4);
      }
    } else d.g += dt;
    if (d.g > (d.k == 'h' ? 5 : 9)) return false;
    if (Math.hypot(d.x - P.x, d.y - 6 - (P.y - 8)) < 12) {
      if (d.k == 'h') {
        if (php >= 5) return true;
        php = Math.min(5, php + 1);
        lightT = 1.6;
        burst(P.x, P.y - 10, '#ff8fb0', 14);
        burst(P.x, P.y - 14, '#ffe9a0', 10);
        sfx(660, 0.3, 'sine', 1320);
        toast('VIDA RECUPERADA! +1 coração', 1800);
      } else if (d.k == 'r') {
        pwR = 9;
        burst(P.x, P.y - 10, '#c89bff', 16);
        sfx(500, 0.3, 'sine', 1500);
        toast(
          'LÍNGUA INFINITA! Alcança o chefão de qualquer lugar por 9 s',
          2000
        );
      } else {
        pwS = 12;
        burst(P.x, P.y - 10, '#6cc4ff', 16);
        sfx(240, 0.3, 'sawtooth', 900);
        toast('FORÇA! Seus golpes causam 3x mais dano por 12 s', 1800);
      }
      return false;
    }
    return true;
  });
}
// ─ drawDrops: desenha itens que caem
function drawDrops() {
  drops.forEach((d) => {
    const x = Math.round(d.x - cam),
      y = Math.round(d.y),
      col = d.k == 'h' ? '#ff6f91' : d.k == 'r' ? '#b36cff' : '#3fa0ff',
      lg = d.k == 'h' ? '#ffd0dc' : d.k == 'r' ? '#e6c8ff' : '#c4e6ff',
      gr = d.vy == 0,
      bl = gr && (d.k == 'h' ? d.g > 3.4 : d.g > 7.4) && ((T * 10) | 0) % 2;
    if (!gr) {
      g.fillStyle = col;
      g.globalAlpha = 0.14;
      g.fillRect(x - 1, 0, 3, y);
      g.globalAlpha = 0.35;
      for (let j = 1; j <= 6; j++) g.fillRect(x - 1, y - 10 - j * 5, 2, 3);
      g.globalAlpha = 1;
    }
    g.fillStyle = 'rgba(0,0,0,.2)';
    g.fillRect(x - 5, 180, 10, 1);
    if (bl) return;
    const bo = gr ? Math.round(Math.sin(T * 5 + d.x) * 1.5) : 0,
      cy = y - 9 + bo;
    g.globalAlpha = 0.22 + 0.1 * Math.sin(T * 6);
    el(g, x, cy, 10, 10, col);
    g.globalAlpha = 1;
    if (d.k == 'h') g.drawImage(HRT, x - 7, cy - 6, 14, 12);
    else {
      el(g, x, cy, 7, 7, '#1d1a17');
      el(g, x, cy, 6, 6, col);
      el(g, x, cy, 4, 4, lg);
      g.fillStyle = col;
      if (d.k == 's') {
        [
          [1, -4, 2, 2],
          [0, -2, 2, 2],
          [-1, 0, 4, 2],
          [0, 2, 2, 2],
          [-1, 3, 2, 1]
        ].forEach(([a, b, w, h]) => g.fillRect(x + a, cy + b, w, h));
      } else {
        g.fillRect(x - 4, cy, 6, 1);
        g.fillRect(x + 1, cy - 2, 1, 5);
        g.fillRect(x + 2, cy - 1, 1, 3);
        g.fillRect(x + 3, cy, 1, 1);
      }
    }
    if (gr && Math.floor(T * 3 + d.x) % 3 == 0) {
      g.fillStyle = '#fff';
      g.fillRect(x + 7, cy - 7, 1, 1);
      g.fillRect(x + 6, cy - 7, 3, 1);
      g.fillRect(x + 7, cy - 8, 1, 3);
    }
    if (d.k == 'h' && gr && php >= 5 && Math.abs(d.x - P.x) < 22)
      txt('VIDA CHEIA', x, y - 20);
  });
}
// ─ aura: brilho do poder
function aura(x, y, t) {
  const c = PWC[t],
    p = 0.5 + 0.5 * Math.sin(T * 6 + t * 2),
    X = Math.round(x),
    Y = Math.round(y - 10);
  g.save();
  g.globalAlpha = 0.14 + 0.1 * p;
  el(g, X, Y, 18, 15, c.a);
  g.globalAlpha = 0.16 + 0.12 * p;
  el(g, X, Y, 12, 10, c.b);
  g.restore();
  ring(
    X,
    Y,
    9 + ((T * 16 + t * 6) % 13),
    t == 1 ? 'rgba(200,150,255,.55)' : 'rgba(120,195,255,.55)'
  );
}
// ─ sparks: faíscas
function sparks(x, y, t) {
  const c = PWC[t];
  for (let i = 0; i < 6; i++) {
    const a = T * 2.6 + i * 1.0472 + t,
      r = 11 + Math.sin(T * 5 + i) * 3,
      sx = Math.round(x + Math.cos(a) * r),
      sy = Math.round(y - 10 + Math.sin(a) * r * 0.8);
    if (Math.sin(T * 9 + i * 2) > -0.3) {
      g.fillStyle = i & 1 ? '#fff' : c.b;
      g.fillRect(sx, sy, 1, 1);
      g.fillRect(sx - 1, sy, 3, 1);
      g.fillRect(sx, sy - 1, 1, 3);
    }
  }
}
// ─ lightBeam: raio de luz
function lightBeam(x, y) {
  const u = 1 - lightT / 1.6,
    rise = Math.min(1, u * 3.2),
    fade = u < 0.55 ? 1 : Math.max(0, 1 - (u - 0.55) / 0.45),
    bot = Math.max(10, Math.round(y - 2)),
    len = Math.round(bot * rise),
    X = Math.round(x);
  for (let j = 0; j < len; j += 2) {
    const k = j / bot,
      w = Math.round(7 + k * 7 + Math.sin(T * 12 + j * 0.15)),
      a = (0.12 + 0.2 * k) * fade;
    g.fillStyle = 'rgba(255,236,160,' + a.toFixed(3) + ')';
    g.fillRect(X - w, j, w * 2, 2);
    g.fillStyle = 'rgba(255,255,255,' + (a * 1.5).toFixed(3) + ')';
    g.fillRect(X - (w >> 1), j, w, 2);
  }
  g.globalAlpha = fade;
  el(g, X, len, 8, 3, '#fff6c8');
  g.globalAlpha = 1;
  if (rise >= 1) {
    g.globalAlpha = 0.5 * fade;
    el(g, X, Math.round(y) - 1, 14, 3, '#fff6c0');
    g.globalAlpha = 1;
  }
}
// ─ heartRise: coração subindo
function heartRise(x, y) {
  const u = 1 - lightT / 1.6;
  if (u > 0.9) return;
  for (let i = 0; i < 4; i++) {
    const v = (u * 1.4 + i * 0.25) % 1;
    g.globalAlpha = Math.max(0, 1 - v);
    g.drawImage(
      HRT,
      Math.round(x + Math.sin(v * 6 + i * 1.7) * 10) - 3,
      Math.round(y - 8 - v * 34),
      7,
      6
    );
  }
  g.globalAlpha = 1;
  for (let i = 0; i < 7; i++) {
    const v = (u * 2 + i * 0.14) % 1,
      sx = Math.round(x + Math.sin(i * 2.3 + u * 5) * 13),
      sy = Math.round(y - v * 38);
    g.fillStyle = i & 1 ? '#fff' : '#ffe9a0';
    g.fillRect(sx, sy, 1, 1);
    g.fillRect(sx - 1, sy, 3, 1);
    g.fillRect(sx, sy - 1, 1, 3);
  }
}
// ─ FTN/fOn/tint: ajudantes do modo Foco
const FTN = new Map(),
  fOn = () => vis > 0 && !(boss && boss.on),
  tint = (im, col) => {
    let m = FTN.get(col);
    if (!m) {
      m = new Map();
      FTN.set(col, m);
    }
    let t = m.get(im);
    if (!t) {
      t = mk(im.width, im.height, (x) => {
        x.drawImage(im, 0, 0);
        x.globalCompositeOperation = 'source-in';
        x.fillStyle = col;
        x.fillRect(0, 0, im.width, im.height);
      });
      m.set(im, t);
    }
    return t;
  };
// ─ focusDim: escurece o cenário no Foco
function focusDim() {
  const k = Math.max(0, Math.min(1, (5 - vis) * 4, vis * 4)),
    gr = g.createRadialGradient(192, 108, 50, 192, 108, 235);
  gr.addColorStop(0, 'rgba(8,64,28,' + 0.4 * k + ')');
  gr.addColorStop(1, 'rgba(2,26,10,' + 0.78 * k + ')');
  g.fillStyle = gr;
  g.fillRect(0, 0, 384, 216);
}
// ─ focusGlow: brilho de perigos e itens no Foco
function focusGlow(im, x, y, hc, tc, r) {
  const p = 0.5 + 0.5 * Math.sin(T * 7 + x * 0.3);
  g.globalAlpha = 0.18 + 0.14 * p;
  el(
    g,
    x + im.width / 2,
    y + im.height / 2,
    im.width / 2 + r,
    im.height / 2 + r,
    hc
  );
  g.globalAlpha = 0.55 + 0.35 * p;
  g.drawImage(tint(im, tc), x, y);
  g.globalAlpha = 1;
}
// ─ swGlow: brilho no modo subaquático
function swGlow(t, x, y, rx, ry, hc) {
  const p = 0.5 + 0.5 * Math.sin(t * 7 + x * 0.3);
  g.globalAlpha = 0.2 + 0.16 * p;
  el(g, x, y, rx + 3, ry + 3, hc);
  g.globalAlpha = 0.3 + 0.2 * p;
  el(g, x, y, rx, ry, hc);
  g.globalAlpha = 1;
}
// ─ focusHud: barra do Foco
function focusHud() {
  const on = vis > 0,
    rd = visCd <= 0 && !on;
  hudRow(
    18,
    'F FOCO',
    on ? vis / 5 : rd ? 1 : 1 - visCd / 7,
    on ? '#9be86a' : rd ? '#6fe6a8' : '#7b8896',
    rd || on
  );
}
// ─ hudRow: linha de barra do HUD
function hudRow(y, label, fr, col, on) {
  g.fillStyle = '#1d1a17';
  g.fillRect(6, y, 86, 9);
  g.fillStyle = on ? '#2b3a33' : '#3a3330';
  g.fillRect(7, y + 1, 84, 7);
  pt3(label, 9, y + 2, on ? '#fff4d0' : '#9a9088');
  g.fillStyle = '#1d1a17';
  g.fillRect(56, y + 2, 34, 5);
  g.fillStyle = col;
  g.fillRect(57, y + 3, Math.round(32 * Math.max(0, Math.min(1, fr))), 3);
}
// ─ abilityHud: barra de invisibilidade
function abilityHud() {
  const on = camT > 0,
    rd = camCd <= 0 && !on;
  hudRow(
    37,
    'C INVISIVEL',
    on ? camT / camDur : rd ? 1 : 1 - camCd / camMax,
    on ? '#9fe8ff' : rd ? '#6fe6a8' : '#7b8896',
    rd || on
  );
  let y = 47;
  if (pwR > 0) {
    hudRow(y, 'LINGUA', pwR / 9, '#b36cff', 1);
    y += 10;
  }
  if (pwS > 0) hudRow(y, 'FORCA', pwS / 12, '#3fa0ff', 1);
}
// ─ note: nota musical da comemoração
function note(x, y, c) {
  g.fillStyle = '#1d1a17';
  g.fillRect(x - 1, y + 3, 5, 4);
  g.fillStyle = c;
  g.fillRect(x, y + 4, 3, 2);
  g.fillRect(x + 2, y, 1, 5);
  g.fillRect(x + 3, y, 2, 1);
  g.fillRect(x + 3, y + 1, 1, 1);
}
// ─ discoLights: luzes da comemoração
function discoLights() {
  const cols = ['255,155,84', '242,138,165', '255,212,90', '72,169,232'];
  for (let i = 0; i < 4; i++) {
    const cx = 192 + Math.sin(T * 1.7 + i * 1.6) * 150;
    for (let j = 0; j < 176; j += 3) {
      const w = 4 + j * 0.16;
      g.fillStyle = 'rgba(' + cols[i] + ',.10)';
      g.fillRect(
        Math.round(cx - w + Math.sin(T * 2 + i) * j * 0.1),
        j,
        Math.round(w * 2),
        3
      );
    }
  }
  g.fillStyle =
    'rgba(255,255,255,' + (0.04 + 0.04 * Math.sin(T * 15)).toFixed(3) + ')';
  g.fillRect(0, 0, 384, 216);
}
// ─ danceLeco: Leco dançando
function danceLeco(x, y) {
  const t = T * 7.5,
    s = Math.sin(t),
    fl = Math.sin(t * 0.5) >= 0 ? 1 : -1,
    c = lecoCv(0, 0, 0, 0);
  g.fillStyle = 'rgba(0,0,0,.25)';
  g.fillRect(Math.round(x) - 8, Math.round(y), 16, 1);
  g.save();
  g.translate(
    Math.round(x + Math.sin(t * 0.5) * 5),
    Math.round(y - 17 - Math.abs(s) * 4)
  );
  g.scale(fl, 1);
  g.rotate(-1.15 + s * 0.2 + Math.sin(t * 2) * 0.05);
  g.drawImage(c, -14, -12);
  g.fillStyle = '#0b0f12';
  g.fillRect(5, -5, 8, 5);
  g.fillRect(6, -6, 6, 1);
  g.fillRect(0, -4, 5, 1);
  g.fillStyle = '#5b8fd0';
  g.fillRect(6, -4, 2, 1);
  g.fillRect(10, -3, 1, 1);
  g.fillStyle = '#fff';
  g.fillRect(7, -5, 1, 1);
  g.restore();
  for (let i = 0; i < 3; i++) {
    const u = (T * 0.9 + i / 3) % 1;
    g.globalAlpha = 1 - u;
    note(
      Math.round(x + (i - 1) * 16 + Math.sin(T * 3 + i) * 4),
      Math.round(y - 34 - u * 30),
      BC[i]
    );
    g.globalAlpha = 1;
  }
}
// ─ abyss: efeito de profundidade do cenário
function abyss(l, cx) {
  if (l.k == 1) return;
  if (l.k == 3) {
    g.save();
    g.beginPath();
    g.rect(0, 180, 384, 36);
    g.clip();
    water();
    g.restore();
    g.fillStyle = '#d6f6ff';
    g.fillRect(0, 180, 384, 1);
    return;
  }
  const b = l.gr,
    n = 9;
  for (let i = 0; i < n; i++) {
    g.fillStyle = mixc(b, '#10141a', 0.45 + (0.45 * i) / (n - 1));
    g.fillRect(0, 180 + i * 4, 384, 4);
  }
  rep(
    34,
    0.5,
    (x, n) => {
      const w = 10 + mod(n * 7, 14),
        h = 3 + mod(n * 5, 6),
        y = 184 + mod(n * 13, 22);
      g.fillStyle = mixc(b, '#10141a', 0.8);
      g.fillRect(x, y, w, h);
      g.fillStyle = mixc(b, '#10141a', 0.62);
      g.fillRect(x, y, w, 1);
    },
    cx
  );
  g.fillStyle = 'rgba(0,0,0,.25)';
  g.fillRect(0, 180, 384, 2);
}
// ---------- VIDAS, CHANCES E OBSTÁCULOS NOVOS ----------
// ─ loseLife: perde vida
function loseLife(full) {
  if (boss && boss.on) return;
  lives = Math.max(0, lives - (full ? 2 : 1));
  if (lives <= 0) {
    S.mode = 'panel';
    jingle(FAIL);
    panel(
      '<img alt="Leco chorando" src="' +
        lecoCry() +
        '"><h3>AS VIDAS ACABARAM</h3><p>Leco perdeu as 5 vidas desta fase. Tente de novo com calma: observe os padrões dos obstáculos.</p>' +
        btn('fresh(S.li,1)', 'REINICIAR A FASE') +
        btn('levels()', 'ESCOLHER FASE') +
        btn('menu()', 'MENU PRINCIPAL')
    );
  }
}
// ─ livesHud: HUD de vidas
function livesHud() {
  sealHud();
  focusHud();
  for (let i = 0; i < 5; i++) {
    const x = 6 + i * 9;
    g.drawImage(HRE, x, 6);
    if (lives >= 2 * i + 2) g.drawImage(HRT, x, 6);
    else if (lives == 2 * i + 1) g.drawImage(HRT, 0, 0, 4, 6, x, 6, 4, 6);
  }
}
// ─ lecoCry: imagem do Leco chorando
function lecoCry() {
  const c = lecoCv(0, 0, 0, 1),
    k = 6;
  return mk(c.width * k, c.height * k + 8, (x) => {
    x.imageSmoothingEnabled = false;
    x.fillStyle = '#4aa8e8';
    x.fillRect(18, c.height * k - 2, c.width * k - 36, 8);
    x.fillStyle = '#8fd0f5';
    x.fillRect(26, c.height * k, c.width * k - 52, 3);
    x.drawImage(c, 0, 0, c.width * k, c.height * k);
    x.fillStyle = '#1d1a17';
    for (let i = 0; i < 6; i++) x.fillRect(112 + i * 5, 36 - i * 2 + 0, 5, 4);
    x.fillStyle = '#4aa8e8';
    x.fillRect(126, 68, 6, 40);
    x.fillRect(138, 70, 6, 28);
    x.fillStyle = '#bfe8ff';
    x.fillRect(126, 68, 2, 40);
    x.fillRect(138, 70, 2, 28);
    [
      [124, 112, 10],
      [136, 104, 8],
      [130, 124, 8]
    ].forEach(([a, b, h]) => {
      x.fillStyle = '#4aa8e8';
      x.fillRect(a, b, 8, h);
      x.fillStyle = '#bfe8ff';
      x.fillRect(a, b, 2, h);
    });
  }).toDataURL();
}
// ─ bossLost: fim de chances no chefão
function bossLost() {
  S.mode = 'panel';
  chances--;
  if (chances > 0) {
    jingle(FAIL.slice(0, 4), 'square', 0.13);
    panel(
      '<h3>O vilão resistiu...</h3><p>Seus corações acabaram.</p><div class="chn">' +
        chances +
        '/3</div><p><b>CHANCES RESTANTES</b></p><p>CONTINUAR retoma de onde parou (a vida do vilão volta ao último ponto de controle). REINICIAR recomeça o chefão do zero e devolve as 3 chances.</p>' +
        btn('retryBoss()', 'CONTINUAR') +
        btn('restartBoss()', 'REINICIAR') +
        '<br>' +
        btn('menu()', 'MENU PRINCIPAL')
    );
  } else {
    jingle(FAIL);
    panel(
      '<img alt="Leco chorando" src="' +
        lecoCry() +
        '"><h3>AS CHANCES ACABARAM</h3><div class="chn">0/3</div><p>Leco está chorando... Você usou as 3 chances contra o chefão.</p><p>' +
        (bossOnly
          ? 'Tente o chefão de novo: o resto do jogo não muda.'
          : 'Refaça só esta fase: o resto do progresso continua salvo.') +
        '</p>' +
        btn(
          'redoBoss()',
          bossOnly ? 'REINICIAR O CHEFÃO' : 'REINICIAR A FASE'
        ) +
        '<br>' +
        btn('menu()', 'MENU PRINCIPAL')
    );
  }
}
// ─ redoBoss: refazer o chefão
function redoBoss() {
  if (bossOnly) pick(6);
  else fresh(5, 1);
}
// ─ bossOnly: modo só chefão
var bossOnly = 0;
