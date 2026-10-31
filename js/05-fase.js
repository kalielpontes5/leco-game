// ════════════════════════════════════════════════════════════
// ─ ARQUIVO: 05-fase.js — Lógica da fase
// ─ Entrar na fase, coletar pistas, língua, perguntas, resultados, dano e o passo de atualização (step).
// ════════════════════════════════════════════════════════════
// ---------- FASE ----------
// ─ fresh: prepara/reinicia o estado de uma fase
function fresh(i,live){S.pg=S.pg||{};const g=live?phasePoints():(S.pg[i]|0),pre=i+'-';Object.keys(S.got).forEach(k=>{if(k.startsWith(pre))delete S.got[k]});Object.keys(S.lv).forEach(k=>{if(k.startsWith('l'+pre))delete S.lv[k]});if(S.answered[phaseKey(i)]){delete S.answered[phaseKey(i)];S.ok=Math.max(0,S.ok-1);S.bd=S.bd.filter(b=>b!==LV[i].b)}S.bd=S.bd.filter(b=>!FOE.some(o=>o.ph==i&&o.seal==b));S.sc=Math.max(0,S.sc-g);S.pg[i]=0;enter(i)}
// ─ enter: entra na fase (cenário, posições, inimigos)
function enter(i){bossOnly=0;boss=null;bp=[];php=5;drops=[];dropT=0;pwR=pwS=lightT=vict=0;tipsSeen={};lives=10;chances=3;S.li=i;L=LV[i];phaseStartScore=S.sc;phaseStats=newStats();const e=E[i];tongueTarget=null;tongueCooldown=0;Object.assign(P,{x:24,y:180,vx:0,vy:0,dir:1,og:1,sp:null,dj:0,sq:0});safe={x:24,y:180};cam=0;vis=visCd=0;camT=camCd=tg=cy=jb=lt=inv=0;tgT=null;
 st=L.P.concat(e.P||[]);hz=L.H.map(h=>({x:h[0],a:h[0],b:h[1],y:h[2],d:1})).map(o=>clipRun(o,o.y,o.y+10,7)).filter(Boolean);
 mv=(e.M||[]).filter(m=>m[4]>0).map(m=>({ox:m[0],oy:m[1],x:m[0],y:m[1],w:m[2],ax:m[3],r:m[4],s:m[5],dx:0,dy:0,mv:1}));
 sk=(e.S||[]).filter(s=>s[2]>0);wk=(e.W||[]).map(w=>({a:w[0],b:w[1],y:w[2],x:w[0],d:1,dead:0})).map(o=>clipRun(o,o.y-12,o.y-1,6)).filter(Boolean);dr=(e.D||[]).map((d,j)=>({x:d[0],p:d[1],o:j*.9}));vp=(e.V||[]).map(v=>{const o={x:v[0],y:v[1],w:v[2],per:v[3]||4,off:v[4]||0,mode:v[5]||0,hid:v[6]||1.2,vis:1,warn:0,t:0,h:0};o.r=[o.x,o.y,o.w,8];o.r.v=o;return o});zp=(e.Z||[]).map(z=>({x:z[0],per:z[1]||3,kind:z[2]||0,off:z[3]||0,u:0,y:14,h:0}));vs=vp.map(v=>v.r);
 lf=(e.F||[]).map((f,j)=>({x:f[0],y:f[1],k:'l'+i+'-'+j})).filter(f=>!S.lv[f.k]);pt=[];spawnFoes();if(S.li==5)hz=[];S.mode='play';$('h').style.display='flex';document.body.classList.remove('mn');fit();close();save();if(i==5)intro6Start();else toast(L.m+' — '+L.t,6000)}
// ─ clipRun: auxiliar de colisão horizontal com plataformas
function clipRun(o,y0,y1,hw){const free=x=>!st.some(p=>x+hw>p[0]&&x-hw<p[0]+p[2]&&p[1]<y1&&p[1]+p[3]>y0);let bs=0,bl=0,s=null;for(let x=o.a;x<=o.b+1;x++){const f=x<=o.b&&free(x);if(f&&s==null)s=x;if(!f&&s!=null){if(x-1-s>bl){bl=x-1-s;bs=s}s=null}}if(bl<14)return null;o.a=bs;o.b=bs+bl;o.x=bs;o.d=1;return o}
// ─ burst: partículas
const burst=(x,y,c,n=8)=>{for(let j=0;j<n;j++)pt.push({x,y,vx:(Math.random()-.5)*90,vy:-Math.random()*80,l:.5,c})};
// ─ collect: coleta uma pista
function collect(i){const k=S.li+'-'+i;if(S.got[k]||!L.C[i]||L.C[i][2]===3||L.C[i][2]===1)return;
 S.got[k]=1;S.sc+=100;if(phaseStats)phaseStats.clues++;const c=L.C[i];burst(c[0],c[1]-8,'#FFD45A',12);joy=.7;sfx(660,.2,'square',1320);toast('PISTA ENCONTRADA: '+c[3]);save()}
// ─ act: ação ↓ (investigar / entrar na porta)
function act(){if(!near)return;if(near.rosa){near=null;return cineStart()}if(near.q){return conclude()}if(near.d){return finishPhase()}const c=L.C[near.i];S.mode='panel';if(c[2]===3){panel(`<h3>${c[3]}</h3><small>RELATO DE MORADOR</small><p>${c[4]}</p><p><small>Relatos ajudam a entender o contexto, mas não contam como pista documental coletável.</small></p>`+btn('resume()','VOLTAR AO MAPA'));return}panel(`<h3>${c[3]}</h3><small>${CAT[c[2]]}</small><p>${c[4]}</p>`+btn('collect('+near.i+');resume()','GUARDAR PISTA')+btn('resume()','FECHAR'))}
// ─ tongue: língua do Leco (ESPAÇO)
function tongue(){if(tg>0||tongueCooldown>0)return;const reach=pwR>0?176:112,dir=P.dir||1;
 if(boss&&boss.on&&!boss.dead&&(pwR>0||(Math.abs(boss.x-P.x)<=reach+22&&(boss.x-P.x)*dir>0))){if(pwR>0)P.dir=1;tg=.28;tgT=-1;tongueTarget={x:boss.x-24,y:P.y-18,type:'enemy'};tongueCooldown=.5;if(boss.st=='vuln'){boss.hp-=pwS>0?3:1;boss.flash=.25;S.sc+=15;sh=pwS>0?.2:.12;burst(boss.x-22,P.y-24,pwS>0?'#6cc4ff':'#ffd45a',pwS>0?16:8);sfx(300,.15,'square',900);if(boss.hp<=0)bossDie()}else{toast('A máscara está fechada! Espere ela abrir.',1200);sfx(120,.1)}return}
const i=L.C.findIndex((c,j)=>c[2]==2&&!S.got[S.li+'-'+j]&&Math.abs(c[0]-P.x)<=reach&&Math.abs(c[1]-P.y)<=88&&((c[0]-P.x)*dir>=-12));if(i>=0){tg=.3;tgT=i;tongueTarget={x:L.C[i][0],y:L.C[i][1]-8,type:'clue',i};tongueCooldown=.55;sfx(300,.25,'sawtooth',900);return}
 const wi=wk.findIndex(w=>!w.dead&&Math.abs(w.x-P.x)<=reach&&Math.abs(w.y-P.y)<34&&((w.x-P.x)*dir>=-8));if(wi>=0){const w=wk[wi];w.dead=1;tg=.28;tgT=-1;tongueTarget={x:w.x,y:w.y-5,type:'enemy'};tongueCooldown=.8;S.sc+=60;if(phaseStats)phaseStats.enemies++;burst(w.x,w.y-5,'#B8E85C',12);sfx(420,.22,'square',1200);toast('Língua certeira! Inimigo neutralizado. +60 pontos');save();return}
 const xi=foes.findIndex(s=>!s.dead&&Math.abs(s.x-P.x)<=reach+8&&Math.abs(s.y-P.y)<34&&((s.x-P.x)*dir>=-8));if(xi>=0){hitFoe(xi);return}
 tg=.22;tongueCooldown=.45;tongueTarget={x:P.x+dir*reach,y:P.y-12,type:'miss'};sfx(150,.1);toast('A língua alcança inimigos e pistas azuis. Aproxime-se e vire para o alvo.');}
// ─ conclude: conclui a fase
function conclude(){S.mode='panel';const key=phaseKey(S.li);if(S.li==5&&foes.some(f=>!f.dead)){panel('<h3>CHEFÃO BLOQUEADO</h3><p>Derrote os vilões do greenwashing desta fase (3 linguadas com Espaço em cada um) antes de enfrentar o vilão.</p>'+btn('resume()','VOLTAR'));return}if(S.answered[key]){panel(`<h3>Pergunta já respondida</h3><p>Você já registrou sua conclusão nesta fase. Agora colete ao menos 1 pista e vá até a saída. Pegar todas rende bônus e mais estrelas.</p>`+(S.li==5?btn('startBoss()','⚔ ENFRENTAR O VILÃO'):btn('resume()','CONTINUAR')));return}if(S.li==5&&!readyToQuestion()){panel(`<h3>Falta uma pista</h3><p>Colete ao menos 1 pista nas ruínas antes de responder.</p>`+btn('resume()','VOLTAR'));return}panel(`<h3>PERGUNTA DE INVESTIGAÇÃO</h3><p><b>${L.n}</b></p><p>${L.q}</p>`+L.o.map((o,i)=>btn('ans('+i+')',o)).join('<br>')+`<p><small>Responda no mapa e depois continue a exploração.</small></p>`+btn('resume()','PENSAR MAIS'))}
// ─ ans: resposta da pergunta
function ans(i){
 const key=phaseKey(S.li),ok=i==L.ok,already=!!S.answered[key];
 if(!ok){if(phaseStats){phaseStats.damage++;phaseStats.pointsLost+=20}S.sc=Math.max(0,S.sc-20);S.cr=Math.max(0,S.cr-5);sfx(200,.3,'sawtooth');save();panel(`<h3>Quase! Reavalie as evidências</h3><p>${L.f[i]}</p><p>Você perdeu 5 pontos de credibilidade. A pergunta continua disponível no mapa.</p>`+btn('resume()','VOLTAR À EXPLORAÇÃO')+btn('conclude()','TENTAR OUTRA RESPOSTA'));return}
 if(!already){S.sc+=120;S.cr=Math.min(100,S.cr+10);S.ok++;S.answered[key]=true;if(!S.bd.includes(L.b))S.bd.push(L.b);sfx(880,.4,'square',1760)}
 save();const missing=Math.max(0,META[S.li]-phasePoints());panel(`<h3>ANÁLISE CORRETA!</h3><p>${L.f[i]}</p><p>+120 pontos · +10 credibilidade</p><p>${cnt(S.li)}/${clueTotal(S.li)} pistas · ${phasePoints()} pontos nesta fase.</p><p>${S.li==5?'O responsável pelo colapso aparece! Desvie dos ataques e use a língua (Espaço) quando a máscara abrir.':cnt(S.li)<1?'Colete ao menos 1 pista para liberar a saída.':'Vá até a saída, ou explore mais: todas as pistas rendem bônus e mais estrelas.'}</p>`+(S.li==5?btn('startBoss()','⚔ ENFRENTAR O VILÃO'):btn('resume()','CONTINUAR A FASE'))+btn('invP()','REVISAR PISTAS'))
}
// ─ finishPhase: encerra a fase
function finishPhase(){const key=phaseKey(S.li);if(S.li==1&&!S.lv['l1-riv']){panel('<h3>SAÍDA SELADA</h3><p>A saída da fábrica só abre para quem trouxer as amostras do fundo do rio. Fale com a Dona Rosa (tecla ↓), perto da pergunta do mapa, para começar a missão no Rio Esquecido.</p>'+btn('resume()','CONTINUAR EXPLORANDO'));return}if(foes.some(f=>!f.dead)){panel('<h3>SAÍDA BLOQUEADA</h3><p>Derrote os vilões do greenwashing desta fase (3 linguadas com Espaço em cada um) antes de sair pela porta.</p>'+btn('resume()','CONTINUAR EXPLORANDO'));return}if(!readyToQuestion()||!S.answered[key]){panel(`<h3>SAÍDA BLOQUEADA</h3><p>Para concluir a fase, colete ao menos 1 das ${clueTotal(S.li)} pistas e responda corretamente à pergunta do mapa. Pegar todas as pistas dá bônus e mais estrelas.</p><p>Progresso: ${cnt(S.li)}/${clueTotal(S.li)} pistas · ${phasePoints()} pontos · ${S.answered[key]?'pergunta respondida':'pergunta pendente'}.</p>`+btn('resume()','CONTINUAR EXPLORANDO'));return}showPhaseResults()}
// ─ starsFor: calcula as estrelas
function starsFor(){const t=clueTotal(S.li),c=cnt(S.li),st=phaseStats||newStats(),lt=E[S.li].F.length,lv=Object.keys(S.lv).filter(k=>k.startsWith('l'+S.li+'-')).length;let n=1;if(c>=Math.ceil(t/2))n++;if(c>=t)n++;if(lt&&lv>=lt*.7)n++;if(st.damage<=2)n++;return Math.min(5,n)}
// ─ showPhaseResults: mostra os resultados
function showPhaseResults(){if(S.li!=5)jingle(WIN);const full=cnt(S.li)>=clueTotal(S.li);if(full){S.sc+=150;save()}const stt=phaseStats||newStats(),stars=starsFor();S.mode='panel';const html=`<div class="result-stars">${'★'.repeat(stars)}${'☆'.repeat(5-stars)}</div><h2>FASE ${ORD.indexOf(S.li)+1} CONCLUÍDA!</h2><p><b>${L.n}</b></p><div class="result-grid"><div><b>${cnt(S.li)}/${clueTotal(S.li)}</b><small>Pistas encontradas</small></div><div><b>${stt.leaves}</b><small>Folhas comidas</small></div><div><b>${stt.enemies}</b><small>Inimigos derrotados</small></div><div><b>${stt.damage}</b><small>Ataques / penalidades</small></div><div><b>−${stt.pointsLost}</b><small>Pontos perdidos</small></div><div><b>${phasePoints()}</b><small>Pontos da fase</small></div><div><b>${stt.deaths}</b><small>Quedas / mortes</small></div></div><p>${stars>=4?'Excelente investigação!':stars>=3?'Bom trabalho. Explore mais para conquistar todas as estrelas.':'Fase concluída! Tente evitar danos e encontrar mais evidências na próxima partida.'}</p>${full?'<p><b>BÔNUS: todas as pistas! +150 pontos</b></p>':''}<p><small>★ Estrelas: concluir · metade das pistas · todas as pistas · 70% das folhas · no máximo 2 danos.</small></p>`;panel(html+btn('advanceAfterResults()','CONTINUAR'))}
// ─ advanceAfterResults: avança para a próxima fase
function advanceAfterResults(){if(ORD.indexOf(S.li)<LV.length-1)fresh(ORD[ORD.indexOf(S.li)+1],0);else{S.fin=1;S.mode='end';save();endP()}}
// ─ nxt: próxima fase
function nxt(){finishPhase()}
// ─ die: penaliza credibilidade e pontos
function die(m,full){if(inv>0)return;S.cr=Math.max(0,S.cr-8);S.sc=Math.max(0,S.sc-25);if(phaseStats){phaseStats.damage++;phaseStats.deaths++;phaseStats.pointsLost+=25}burst(P.x,P.y-8,'#43B95C',10);P.x=safe.x;P.y=safe.y;P.vx=P.vy=0;inv=1.5;sh=.25;sfx(150,.3,'sawtooth');toast(m+' −8 credibilidade; '+(full?'−1 vida;':'−½ vida;')+' retorno ao último ponto seguro.');loseLife(full)}
// ─ hurt: dano
const hurt=m=>{if(inv<=0)die(m)};
// ─ hitS: colisão com espinhos/obstáculos
function hitS(ax){for(const p of st.concat(vs)){const[x,y,w,h]=p;if(P.x+6>x&&P.x-6<x+w&&P.y>y&&P.y-13<y+h){if(ax)P.x=P.vx>0?x-6:x+w+6;else if(P.vy>0){P.y=y;P.vy=0;P.og=1;P.sp=p}else{P.y=y+h+13;P.vy=0}}}}
// ─ step: atualização principal de cada quadro na fase (movimento, física, colisões)
function step(dt){lt+=dt;sh=Math.max(0,sh-dt);
 mv.forEach(m=>{const s=(Math.sin(lt*m.s)+1)/2,nx=m.ax=='h'?m.ox+m.r*s:m.ox,ny=m.ax=='v'?m.oy-m.r*s:m.oy;m.dx=nx-m.x;m.dy=ny-m.y;m.x=nx;m.y=ny});
 if(P.og&&P.sp&&P.sp.mv){P.x+=P.sp.dx;P.y=P.sp.y}
 newStep(dt);const ax=vict>0?0:(K.d||K.arrowright?1:0)-(K.a||K.arrowleft?1:0);P.vx+=(ax*92-P.vx)*Math.min(1,(ax?14:18)*dt);if(ax)P.dir=ax;
 jb=vict>0?0:Math.max(0,jb-dt);cy=P.og?.1:Math.max(0,cy-dt);
 if(jb>0){if(cy>0){P.vy=-282;jb=cy=0;P.og=0;P.sq=-.18;burst(P.x,P.y,'rgba(255,255,255,.8)',5);sfx(520,.15,'square',900)}else if(!P.dj&&!P.og){P.vy=-255;P.dj=1;jb=0;P.sq=-.12;burst(P.x,P.y-4,'#B8E85C',7);sfx(700,.15,'sine',1100)}}
 P.vy=Math.min(P.vy+800*dt,420);P.x=Math.max(boss&&boss.on?arenaX+8:8,Math.min(boss&&boss.on&&!boss.dead?boss.x-46:L.w-8,P.x+P.vx*dt));hitS(1);
 const py=P.y,was=P.og;P.y+=P.vy*dt;P.og=0;P.sp=null;hitS(0);
 for(const m of mv)if(P.vy>=0&&P.x+6>m.x&&P.x-6<m.x+m.w&&py<=m.y+4&&P.y>=m.y&&P.y<=m.y+12){P.y=m.y;P.vy=0;P.og=1;P.sp=m}
 if(P.og){P.dj=0;if(!was){P.sq=.2;burst(P.x,P.y,'rgba(255,255,255,.7)',4)}if(!P.sp.mv&&!P.sp.v&&P.sp[2]>=40&&P.x>P.sp[0]+10&&P.x<P.sp[0]+P.sp[2]-10)safe={x:P.x,y:P.y}}
 P.sq*=Math.max(0,1-12*dt);
 if(P.y>250)die('Caiu! Voltando ao último ponto seguro.',1);
 tongueCooldown=Math.max(0,tongueCooldown-dt);if(vis>0){vis-=dt;if(vis<=0){vis=0;visCd=7;sfx(400,.2,'sine',300)}}else if(visCd>0)visCd=Math.max(0,visCd-dt);if(camT>0){camT-=dt;if(camT<=0)camCd=camMax=(boss&&boss.on?9:3)}else if(camCd>0)camCd-=dt;inv=Math.max(0,inv-dt);
 hz.forEach(h=>{h.x+=h.d*(46+S.li*8)*dt;if(h.x>h.b)h.d=-1;if(h.x<h.a)h.d=1;if(camT<=0&&Math.abs(h.x-P.x)<13&&P.y>h.y&&P.y-13<h.y+10)hurt('Drone de vigilância! Use C para se camuflar.')});
 sk.forEach(([x,y,w])=>{if(P.x+5>x&&P.x-5<x+w&&P.y>y-6&&P.y-13<y)hurt('Espinhos! Pule por cima.')});
 wk.forEach(w=>{if(w.dead)return;w.x+=w.d*(40+S.li*8)*dt;if(w.x>w.b)w.d=-1;if(w.x<w.a)w.d=1;
  if(Math.abs(P.x-w.x)<10&&P.y>w.y-12&&P.y-13<w.y){if(P.vy>40&&P.y<w.y-4){w.dead=1;P.vy=-210;P.dj=0;S.sc+=50;if(phaseStats)phaseStats.enemies++;burst(w.x,w.y-5,'#6C7F95',10);sfx(400,.15,'square',800)}else hurt('Um poluente! Pule na cabeça dele.')}});
 dr.forEach(d=>{const u=((lt+d.o)%d.p)/d.p;d.u=u;d.y=u<.55?4+176*Math.pow(u/.55,2):-9;if(d.y>0){let cp=180;st.concat(vs,mv.map(m=>[m.x,m.y,m.w,8])).forEach(q=>{if(d.x>q[0]&&d.x<q[0]+q[2]&&q[1]>=4&&q[1]<cp)cp=q[1]});if(d.y>=cp)d.y=-9}if(d.y>0&&Math.abs(P.x-d.x)<6&&P.y-6>d.y-8&&P.y-6<d.y+6)hurt('Gota tóxica!')});
 bossStep(dt);extraStep(dt);if(S.li==5&&!boss&&vict<=0&&Math.random()<dt*.15)sh=.18;
 lf=lf.filter(f=>{if(Math.hypot(f.x-P.x,f.y-(P.y-8))<11){S.lv[f.k]=1;S.sc+=25;if(phaseStats)phaseStats.leaves++;burst(f.x,f.y,'#9BE15D',6);joy=.5;sfx(900,.1,'sine',1400);return false}return true});
 if(tg>0){tg-=dt;if(tg<=0&&tgT!=null){if(tgT>=0)collect(tgT);tgT=null;tongueTarget=null}}
 near=null;let bd=99;L.C.forEach((c,i)=>{if(S.got[S.li+'-'+i]||c[2]==2||c[2]==1)return;const d=Math.abs(c[0]-P.x);if(d<20&&Math.abs(c[1]-P.y)<22&&d<bd){bd=d;near={i}}});
 const qd=Math.abs((L.qx||L.w*.5)-P.x);if(qd<24&&Math.abs((L.qy||180)-P.y)<24){near={q:1};bd=0}
 if(qd>=24&&!near&&S.li<5&&Math.abs(L.w-30-P.x)<22&&P.y>=170)near={d:1};if((boss&&boss.on)||vict>0)near=null;if(S.li==1&&!near&&!S.lv['l1-riv']&&Math.abs(P.x-460)<24&&P.y>=170)near={rosa:1};
 cam+=(Math.max(boss&&boss.on?L.w-384:0,Math.min(L.w-384,P.x-192+P.dir*22))-cam)*Math.min(1,6*dt);
 $('hn').textContent='Fase '+(ORD.indexOf(S.li)+1)+'/'+LV.length+' · '+L.n;$('hs').textContent='Pistas '+cnt(S.li)+'/'+clueTotal(S.li)+' (mín. 1) · '+phasePoints()+' pts · Folhas '+(phaseStats?phaseStats.leaves:0)+' · Cred. '+S.cr+(vis>0&&!(boss&&boss.on)?' · Foco':'')+(camT>0?' · Camuflado':camCd>0?' · Recarregando':'')+(pwR>0?' · Língua longa':'')+(pwS>0?' · Força':'')}
