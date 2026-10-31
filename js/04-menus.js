// ════════════════════════════════════════════════════════════
// ─ ARQUIVO: 04-menus.js — Menus e telas
// ─ Menu inicial, escolher fase, COMO JOGAR, créditos, pausa, inventário e tela final.
// ════════════════════════════════════════════════════════════
// ---------- MENUS ----------
// ─ menu: tela inicial
function menu(){S.mode='menu';$('h').style.display='none';document.body.classList.add('mn');fit();panel('<img alt="Leco, o camaleão" src="'+lecoBig()+'"><h1>LECO: ALÉM DO VERDE</h1><p>“Nem tudo que parece verde é sustentável.”</p>'+btn('go(0)','JOGAR')+btn('go(1)','CONTINUAR',!load())+btn('levels()','FASES')+'<br>'+btn('how()','COMO JOGAR')+btn('snd()','EFEITOS: '+(mute?'OFF':'ON'))+btn('musT()','MÚSICA: '+(MO?'OFF':'ON'))+btn('cred()','CRÉDITOS')+'<br>'+vSl())}
// ─ levels: escolher fase
function levels(){panel('<h3>ESCOLHER FASE</h3>'+ORD.map((i,p)=>btn('pick('+i+')',(p+1)+'. '+LV[i].n)).join('<br>')+'<br>'+btn('pick(6)','⚔ SÓ O CHEFÃO')+'<br>'+btn('menu()','VOLTAR'))}
// ─ pick: inicia a fase escolhida
function pick(i){const d=load();if(d)Object.assign(S,{sc:d.sc|0,cr:d.cr|0,got:d.got||{},lv:d.lv&&typeof d.lv=='object'?d.lv:{},bd:Array.isArray(d.bd)?d.bd:[],ok:d.ok|0,fin:d.fin|0,answered:d.answered&&typeof d.answered=='object'?d.answered:{},pg:d.pg&&typeof d.pg=='object'?d.pg:{}});close();if(i>5){enter(5);bossOnly=1;S.answered[phaseKey(5)]=true;startBoss();cam=L.w-384;return}fresh(i)}
// ─ snd: liga/desliga o som
function snd(){mute=mute?0:1;try{localStorage.setItem('leco_m',mute)}catch(e){}S.mode=='pause'?pauseP():menu()}
// ─ how: tela COMO JOGAR
function how(){const k=s=>'<span class=k>'+s+'</span>',im=(c,n=2)=>'<img alt="" style="width:'+c.width*n+'px" src="'+c.toDataURL()+'">',o=c=>'<u class=o style="background:'+c+'"></u>',d=(i,t,x,w)=>'<div'+(w?' class=w':'')+'><i>'+i+'</i><em><b>'+t+'</b><span>'+x+'</span></em></div>',hs=t=>'<h4 class=hs>'+t+'</h4>',
 cap=(fn,w,h)=>{let r='';try{const W=g.canvas.width,H=g.canvas.height,bk=g.getImageData(0,0,W,H);g.save();try{g.setTransform(1,0,0,1,0,0);g.globalAlpha=1;g.fillStyle='#fff6d8';g.fillRect(0,0,w,h);fn();r=im(mk(w,h,x=>x.drawImage(g.canvas,0,0,w,h,0,0,w,h)),1)}finally{g.restore();g.putImageData(bk,0,0)}}catch(e){}return r},
 px=(o)=>new Proxy(o,{get:(q,n)=>n in q?q[n]:0}),
 vf=i=>{const a=foes,b=shots,c=cam;try{foes=[px({x:18,y:36,t:i,f:1,flash:0,dead:0,wind:0,hp:3,cd:0})];shots=[];cam=0;return cap(drawFoes,36,40)}catch(e){return ''}finally{foes=a;shots=b;cam=c}},
 sf=i=>{const a=foes,b=shots,c=cam;try{foes=[];shots=[px({k:i,x:10,y:8,vx:1,vy:0,t:1})];cam=0;return cap(drawFoes,20,16)}catch(e){return ''}finally{foes=a;shots=b;cam=c}},
 en=n=>cap(()=>[oldE0,oldE1,oldE2][n](16,36,0),32,40),dr=()=>cap(()=>drone2(14,6),28,22),
 bs=()=>{const a=boss,b=bp,c=cam;try{boss={x:0,hp:30,st:'idle',flash:0,dead:0};bp=[];cam=0;return cap(()=>{g.translate(26,-42);g.scale(.5,.5);drawBoss()},52,56)}catch(e){return ''}finally{boss=a;bp=b;cam=c}};
 panel('<h3>COMO JOGAR</h3>'+hs('CONTROLES')+'<div class=hw>'
 +d(k('A')+k('D')+k('◀')+k('▶'),'ANDAR','Vá para a esquerda e para a direita.')
 +d(k('W')+k('↑'),'PULAR','Toque 2x no ar para o pulo duplo.')
 +d(k('ESPAÇO'),'LÍNGUA','Neutraliza inimigos e pega pistas azuis distantes.')
 +d(k('↓'),'INVESTIGAR','Examine pistas e entre na porta para sair da fase.')
 +d(k('F'),'FOCO','Perigos ficam vermelhos e itens dourados. Dura pouco e recarrega.')
 +d(k('C'),'INVISIBILIDADE','No chefão: fica invisível por alguns segundos e recarrega.')
 +d(k('ESC'),'PAUSA','Pausa o jogo.')
 +d(k('▬'),'PLATAFORMAS MÓVEIS','Use para subir aonde o pulo não alcança.')
 +'</div>'+hs('OBJETIVO DA FASE')+'<div class=hw>'
 +d(im(SP.doc)+im(SP.docB),'PISTAS','Pegue 1 para liberar a saída. Pegar todas dá bônus de pontos e mais estrelas.')
 +d(im(SP.pers[0])+im(SP.pers[1]),'PESSOAS','São relatos. Não contam como pistas.')
 +d(im(HRT),'VIDAS','5 por fase. Ataque, espinho ou gota: −½ vida. Cair no buraco: −1 vida.')
 +d(im(SP.leaf),'FOLHAS','Colete as folhas espalhadas pela fase para ganhar pontos.')
 +'</div>'+hs('INIMIGOS')+'<div class=hw>'
 +d(k('▼')+k('ESPAÇO'),'COMO DERROTAR','Pule na cabeça deles ou acerte com a língua.',1)
 +d(en(0),'MASCOTE FALSO','Publicidade enganosa que anda pelo chão.')
 +d(en(1),'BARRIL DE CHORUME','Anda pelo chão. Não encoste.')
 +d(en(2),'SELO ENGANOSO','Certificado falso. Não encoste.')
 +'</div>'+hs('PERIGOS (NÃO MORREM)')+'<div class=hw>'
 +d(dr(),'DRONE DE VIGILÂNCIA','Voa de um lado para o outro. Desvie por cima ou por baixo.')
 +d(im(SP.spike),'ESPINHOS','Não podem ser removidos. Pule por cima.')
 +d(im(SP.drop),'GOTAS TÓXICAS','Caem do alto. Espere passar e siga.')
 +d(k('▼'),'BURACOS','Cair em um buraco tira 1 vida inteira.')
 +'</div>'+hs('VILÕES (FASES 4 A 6)')+'<div class=hw>'
 +d(im(SP.leaf),'COMO DERROTAR','Eles andam e atiram. Acerte 3 linguadas (ESPAÇO): selo dourado Fiscal Ativo, +80 pontos e uma folha extra.',1)
 +d(vf(0)+sf(0),'PLANTADOR DE PAPEL','Fase 4. Dispara aviões de promessas vazias.')
 +d(vf(1)+sf(1),'DR. SELO-FÁCIL','Fase 5. Arremessa carimbos APROVADO.')
 +d(vf(3)+sf(3),'ANALISTA MAQUIADO','Fase 5. Anda sem parar e mira gráficos falsos em você.')
 +d(vf(2)+sf(2),'SRA. CORTINA DE FUMAÇA','Fase 6. Solta nuvens de fumaça ECO.')
 +d(vf(4)+sf(4),'LOBISTA DO PETRÓLEO','Fase 6. Anda sem parar e cospe petróleo.')
 +'</div>'+hs('CHEFÃO FINAL')+'<div class=hw>'
 +d(bs(),'SR. ECOFACHADA','Desvie dos ataques e acerte com ESPAÇO quando a máscara abrir. Você tem 3 chances. Use C para ficar invisível.',1)
 +d(o('#a86cf0')+o('#4fb0ff')+im(HRT),'ITENS DO CÉU','Roxo: língua mais longa · Azul: ataque mais forte · Coração: vida (só é pego quando você precisa e some em 5 s).',1)
 +'</div>'+btn('menu()','VOLTAR'))}
// ─ cred: créditos
function cred(){panel('<h3>CRÉDITOS</h3><p>LECO: ALÉM DO VERDE<br>Um jogo do universo Verde Real.<br>Personagens, empresas e documentos são fictícios.</p>'+btn('menu()','VOLTAR'))}
// ─ go: JOGAR / CONTINUAR
function go(c){if(!c){load()?panel('<h3>Já existe progresso salvo.</h3><p>Começar de novo substitui o progresso atual.</p>'+btn('newG()','SUBSTITUIR')+btn('menu()','CANCELAR')):newG();return}const d=load();if(!d)return;Object.assign(S,{sc:d.sc|0,cr:d.cr|0,got:d.got&&typeof d.got=='object'?d.got:{},lv:d.lv&&typeof d.lv=='object'?d.lv:{},bd:Array.isArray(d.bd)?d.bd:[],ok:d.ok|0,fin:d.fin|0,answered:d.answered&&typeof d.answered=='object'?d.answered:{},pg:d.pg&&typeof d.pg=='object'?d.pg:{}});phaseStartScore=Number.isFinite(d.phaseStartScore)?d.phaseStartScore:d.sc; if(S.fin){S.li=LV.length-1;L=LV[S.li];S.mode='end';endP()}else{enter(d.li);phaseStartScore=Number.isFinite(d.phaseStartScore)?d.phaseStartScore:d.sc;save()}}
// ─ newG: começa um jogo novo
function newG(){Object.assign(S,{sc:0,cr:50,got:{},lv:{},bd:[],ok:0,fin:0,answered:{},pg:{}});phaseStartScore=0;save();enter(0)}
// ─ pauseP: pausa
function pauseP(){S.mode='pause';panel('<h3>PAUSA</h3><p>MISSÃO: '+L.m+'</p>'+btn('resume()','CONTINUAR')+btn('invP()','INVENTÁRIO')+'<br>'+btn('fresh(S.li,1)','REINICIAR FASE')+btn('levels()','ESCOLHER FASE')+btn('menu()','MENU PRINCIPAL')+'<br>'+btn('snd()','EFEITOS: '+(mute?'OFF':'ON'))+btn('musT()','MÚSICA: '+(MO?'OFF':'ON'))+'<br>'+vSl())}
// ─ resume: retoma o jogo
function resume(){close();S.mode='play'}
// ─ invP: inventário de pistas
function invP(){const e=S.mode=='end';panel('<h3>INVENTÁRIO DE PISTAS</h3>'+LV.map((l,i)=>`<p><b>${l.n}</b> (${cnt(i)}/${clueTotal(i)})<br><small>`+l.C.map((c,j)=>c[2]===1?null:c[2]===3?'◉ '+c[3]+' [Relato]':S.got[i+'-'+j]?'✔ '+c[3]+' ['+CAT[c[2]]+']':'▫ Pista não encontrada').filter(Boolean).join('<br>')+'</small></p>').join('')+btn(e?'endP()':'pauseP()','VOLTAR'))}
// ─ endP: tela final
function endP(){const f=Object.keys(S.got).length,t=S.ok>=LV.length-1&&f>=tot*.9?'Investigador exemplar':S.ok>=2?'Investigador atento':'Investigador em aprendizado';panel('<h1>VERDELÂNDIA APRENDEU!</h1><h3>'+t+'</h3><p>Pontos: '+S.sc+' · Credibilidade: '+S.cr+' · Pistas: '+f+'/'+tot+' · Folhas: '+nLf()+'/'+(E.reduce((a,e)=>a+e.F.length,0)+5)+'</p><p>'+(S.bd.map(b=>'★ '+b).join('<br>')||'Nenhuma insígnia desta vez.')+'</p><p><small>Você aprendeu a pedir evidências antes de concluir.</small></p>'+btn('newG()','JOGAR NOVAMENTE')+btn('invP()','REVISAR')+btn('menu()','MENU'))}
