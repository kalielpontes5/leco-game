// ════════════════════════════════════════════════════════════
// ─ ARQUIVO: 03-estado.js — Estado e salvamento
// ─ Estado global (S), variáveis de jogo, painéis/toasts/botões e salvar/carregar progresso.
// ════════════════════════════════════════════════════════════
// ---------- ESTADO ----------
// ─ S: estado geral do jogo (fase, pontos, credibilidade, pistas, modo)
const S={li:0,sc:0,cr:50,got:{},lv:{},bd:[],ok:0,fin:0,mode:'menu',answered:{},pg:{}},P={x:24,y:180,vx:0,vy:0,dir:1,og:0,sp:null,dj:0,sq:0},K={};
// ─ Variáveis globais de jogo (fase atual L, câmera, tempo, habilidades, listas)
let L=LV[0],cam=0,T=0,lt=0,vis=0,visCd=0,camT=0,camCd=0,inv=0,tg=0,tgT=null,hz=[],pt=[],safe={x:24,y:180},near=null,mute=(()=>{try{return +localStorage.getItem('leco_m')||0}catch(e){return 0}})(),mt,AC,st=[],mv=[],sk=[],wk=[],dr=[],lf=[],cy=0,jb=0,sh=0;
// ─ ORD: ordem das fases · KEY: chave do salvamento · META: metas
const ORD=[0,2,1,3,4,5],KEY='leco_v6',META=[300,360,900,1300,1700,2400],phaseKey=i=>'fase-'+i,clueIndexes=i=>LV[i].C.map((c,j)=>({c,j})).filter(o=>o.c[2]!==3&&o.c[2]!==1),cnt=i=>clueIndexes(i).filter(o=>S.got[i+'-'+o.j]).length,clueTotal=i=>clueIndexes(i).length,requiredClues=i=>1,tot=LV.reduce((a,l,i)=>a+clueTotal(i),0),nLf=()=>Object.keys(S.lv).length;
// ─ Estatísticas da fase e estado da língua
let phaseStartScore=0,tongueTarget=null,tongueCooldown=0,phaseStats=null;const phasePoints=()=>Math.max(0,S.sc-phaseStartScore),readyToQuestion=()=>cnt(S.li)>=requiredClues(S.li);
// ─ newStats: zera as estatísticas da fase
function newStats(){return {leaves:0,enemies:0,damage:0,deaths:0,clues:0,pointsLost:0};}
// ─ progressText: texto de progresso das pistas
function progressText(i=S.li){return `${cnt(i)}/${requiredClues(i)} pistas necessárias (${clueTotal(i)} pistas coletáveis)`;}
// ─ sfx: efeito sonoro simples
function sfx(f,d=.1,t='square',f2){if(mute)return;try{AC=AC||new AudioContext();const o=AC.createOscillator(),v=AC.createGain(),n=AC.currentTime;o.type=t;o.frequency.setValueAtTime(f,n);if(f2)o.frequency.exponentialRampToValueAtTime(f2,n+d);v.gain.setValueAtTime(.05,n);v.gain.exponentialRampToValueAtTime(.001,n+d);o.connect(v);v.connect(vOut(0));o.start();o.stop(n+d)}catch(e){}}
// ─ panel: abre o painel (janela de menu) com HTML
const panel=h=>{$('o').innerHTML='<div class=pn>'+h+'</div>';$('o').style.display='flex'},close=()=>$('o').style.display='none';
// ─ toast: mensagem curta na tela
const toast=(s,ms=2400)=>{const e=$('ts');e.textContent=s;e.style.visibility='visible';clearTimeout(mt);mt=setTimeout(()=>e.style.visibility='hidden',ms)};
// ─ btn: gera o HTML de um botão
const btn=(f,l,d)=>`<button class=b onclick="${f}"${d?' disabled':''}>${l}</button>`;
// ─ save: grava o progresso no localStorage
function save(){try{localStorage.setItem(KEY,JSON.stringify({v:6,li:S.li,sc:S.sc,cr:S.cr,got:S.got,lv:S.lv,bd:S.bd,ok:S.ok,fin:S.fin,answered:S.answered,pg:Object.assign({},S.pg,{[S.li]:phasePoints()}),phaseStartScore}))}catch(e){}}
// ─ load: lê o progresso salvo
function load(){try{const d=JSON.parse(localStorage.getItem(KEY));if(d&&d.v==6&&Number.isInteger(d.li)&&d.li>=0&&d.li<LV.length){d.got=Object.fromEntries(Object.entries(d.got&&typeof d.got=='object'?d.got:{}).filter(([k])=>{const q=k.split('-');return LV[q[0]]&&LV[q[0]].C[q[1]]}));return d}}catch(e){}return null}
