// ════════════════════════════════════════════════════════════
// ─ ARQUIVO: 02-fases-dados.js — Conteúdo extra das fases
// ─ Extras por fase (móveis, espinhos, gotas, drones), módulos de plataformas, dificuldade e dicas.
// ════════════════════════════════════════════════════════════
// ---------- EXTRAS POR FASE: M móveis [x,y,w,eixo,alcance,vel] · S espinhos [x,y,w] · W patrulheiros [x1,x2,y] · D gotas [x,período] · F folhas [x,y] · P plataformas ----------
// ─ E: extras de cada fase (móveis, espinhos, gotas, drones...) — legenda no comentário acima
const E=[
{M:[],P:[],S:[[282,180,22]],W:[[520,590,180]],F:[[160,140],[266,126],[330,160],[540,120],[626,100]]},
{M:[],P:[],S:[[120,180,24],[345,180,24],[495,180,24]],W:[[620,725,180]],D:[[300,2.6],[520,2.2],[680,2.4]],F:[[240,150],[330,150],[490,120],[640,150],[715,106]]},
{M:[[640,112,36,'h',60,1],[790,172,34,'v',86,.85]],P:[[836,86,50,8]],S:[[110,180,24],[300,180,28],[700,180,24],[860,180,30]],W:[[250,380,180],[760,850,180]],F:[[150,128],[260,108],[370,130],[590,110],[680,90],[860,68]]},
{M:[[500,172,30,'v',76,.9],[965,120,34,'h',50,1.1]],P:[[1030,84,50,8]],S:[[120,180,26],[225,180,22],[790,180,30],[890,180,26]],W:[[400,500,180],[610,690,180]],F:[[185,130],[285,104],[430,130],[640,150],[820,112],[930,84],[1055,66]]},
{M:[[385,98,36,'h',46,1.1],[600,172,30,'v',84,.9]],P:[],S:[[120,180,24],[330,180,26],[505,180,24],[850,180,24]],W:[[135,225,180],[350,450,180],[880,960,180]],D:[[260,2.4],[520,2]],F:[[145,130],[245,102],[345,74],[480,104],[585,132],[660,66],[770,106]]}];

// ─ Mais uma entrada na lista de extras E
E.push({M:[],P:[],S:[[210,180,24]],W:[],D:[[90,2.4]],F:[[60,150],[240,150]]});
// ─ MOD: módulos reutilizáveis de plataformas e obstáculos usados para montar as fases
const MOD={
a:{P:[[0,180,120,36],[165,180,135,36],[95,140,50,8]],S:[[28,180,22]],W:[[185,285,180]],F:[[110,126],[205,165],[60,160]],c:[120,140]},
b:{P:[[0,180,50,36],[250,180,50,36],[70,158,34,8],[125,138,34,8],[180,158,34,8]],S:[[14,180,24]],D:[[150,2.2]],F:[[87,146],[142,126],[197,146],[150,102]],c:[142,138]},
c:{P:[[0,180,300,36],[160,158,30,22]],S:[[110,180,24],[225,180,28]],W:[[10,95,180]],H:[[195,290,166]],F:[[60,160],[210,150],[270,150]],c:[148,180]},
d:{P:[[0,180,300,36],[40,152,40,8],[100,124,40,8],[160,96,40,8],[220,124,40,8],[270,152,30,8]],S:[[90,180,28],[200,180,28]],W:[[235,290,180]],F:[[60,140],[120,112],[180,84],[240,112]],c:[180,96]},
e:{P:[[0,180,40,36],[260,180,40,36]],M:[[70,168,30,'h',40,1],[150,140,30,'v',60,.8],[215,168,30,'h',30,1.1]],S:[[8,180,20]],F:[[90,150],[165,100],[230,150]]}};
// novos módulos: V=plataformas que somem [x,y,w,período,deslocamento,modo(0 some/1 desmorona),tempo oculto] · Z=êmbolos [x,período,tipo(0 carimbo/1 jato),deslocamento]
MOD.f={P:[[0,180,60,36],[240,180,60,36]],V:[[68,180,38,4,0,0,1.2],[124,180,38,4,1,0,1.2],[180,180,38,4,2,0,1.2]],F:[[87,150],[143,150],[199,150]],c:[125,150],z:1};
MOD.g={P:[[0,180,50,36],[250,180,50,36]],V:[[50,180,40,4.4,0,0,.8],[90,180,40,4.4,.5,0,.8],[130,180,40,4.4,1,0,.8],[170,180,40,4.4,1.5,0,.8],[210,180,40,4.4,2,0,.8]],F:[[70,160],[130,160],[190,160]],z:1};
MOD.h={P:[[0,180,40,36],[260,180,40,36]],V:[[50,172,36,0,0,1],[96,160,36,0,0,1],[142,148,36,0,0,1],[188,160,36,0,0,1],[226,172,34,0,0,1]],F:[[68,146],[160,124],[244,150]],z:1};
MOD.i={P:[[0,180,300,36]],Z:[[55,3.2,0,0],[110,3.2,0,1],[215,3.2,0,2]],F:[[85,150],[165,150],[260,150]],c:[165,180],z:1};
MOD.j={P:[[0,180,300,36]],Z:[[60,2.8,1,0],[130,2.8,1,.9],[200,2.8,1,1.8],[255,2.8,1,.45]],H:[[150,290,166]],F:[[95,140],[165,140],[228,140]],c:[95,180],z:1};
MOD.k={P:[[0,180,50,36],[250,180,50,36]],M:[[56,172,34,'h',50,1],[150,172,34,'h',56,1.15]],F:[[80,150],[170,150]],z:1};
// ─ ext: aplica módulos MOD a uma fase e registra suas pistas
function ext(i,seq,cl,o,chaos){const l=LV[i],e=E[i];e.D=e.D||[];e.V=e.V||[];e.Z=e.Z||[];const sh=(a,d,ix=[0])=>(a||[]).map(r=>r.map((v,j)=>ix.includes(j)?v+d:v));
 seq.forEach(k=>{const m=MOD[k];l.P.push(...sh(m.P,o));l.H.push(...sh(m.H,o,[0,1]));e.S.push(...sh(m.S,o));e.W.push(...sh(m.W,o,[0,1]));e.M.push(...sh(m.M,o));e.D.push(...sh(m.D,o));e.F.push(...sh(m.F,o));e.V.push(...sh(m.V,o));e.Z.push(...sh(m.Z,o));if(m.z)(l.sp=l.sp||[]).push([o,o+300]);
  if(chaos)e.D.push([o+70,2.3],[o+230,2.8]);if(m.c&&cl.length){const c=cl.shift();l.C.push([o+m.c[0],m.c[1],c[0],c[1],c[2]])}o+=300});
 if(chaos){l.P.push([o,180,420,36]);o+=420;l.qx=o-360}l.w=o}
// ─ Aplicação dos módulos nas fases (índices 2 a 5)
ext(2,['a','i','f'],[[0,'Selo “Eco Premium”','Selo vendido em kit de marketing: qualquer empresa paga e usa, sem checagem de produção.'],[1,'Rodapé do selo','Letrinhas: “conforme critérios próprios”. Sem norma pública nem entidade externa.'],[2,'Auditoria independente','Relatório público (fictício): comprova redução de 30% dos resíduos, com método e dados abertos.'],[1,'Selo sem validade','Detalhe oculto: o selo “Natureza Plena” não traz data de validade nem número de registro.'],[2,'Vitrine promocional','Faixa na vitrine: “Selo de qualidade ambiental”, sem dizer quem concedeu nem com quais critérios.']],1000);
ext(3,['b','k','c','h','d'],[[0,'Viveiro de mudas','Cartaz diz 20 mil mudas; o contrato mostra 8 mil, e só 3 mil sobreviveram à primeira estação.'],[1,'Mapa de plantio','Legenda pequena: o plantio ocorre em área que já era floresta; não repõe a que foi derrubada.'],[2,'Monocultura de eucalipto','Parte do plantio é de uma única espécie: ajuda no carbono, mas não substitui a biodiversidade perdida.'],[0,'Contrato de plantio','Documento: replantio só se a muda morrer em até 30 dias; depois disso, ninguém monitora.'],[1,'Rodapé do balanço','Letrinhas: os “hectares plantados” incluem áreas de reflorestamento já exigidas por lei.'],[2,'Foto de satélite','Registro à distância: a faixa “plantada” aparece como solo exposto em duas imagens seguidas.']],1100);
ext(4,['d','i','f','j','g'],[[0,'Planilha de emissões','Mostra só o escopo da fábrica; transporte e fornecedores ficam de fora.'],[1,'Nota de rodapé','A meta “neutro até 2030” depende de compensações ainda não contratadas.'],[2,'Programa de coleta','Relatório de bairro: atende 2 de 14 bairros; ainda é cedo para generalizar.'],[0,'Laudo de água','Laudo independente: resultado dentro do limite em 3 pontos; faltam 2 pontos de coleta.'],[1,'Gráfico cortado','O eixo do gráfico começa em 80%: a queda de emissões parece maior do que é.'],[2,'Placa na usina','Registro à distância: a placa “zero resíduos” fica ao lado de uma pilha de resíduos.'],[0,'Relatório de sustentabilidade','Documento: 40 páginas de ações pontuais e nenhuma tabela com resultados medidos.'],[1,'Assinatura do laudo','Letra miúda: o laudo foi pago e assinado pela própria empresa, não por laboratório independente.']],1000);
ext(5,['h','j'],[[0,'Outdoor “Nós cuidamos de tudo”','O painel prometia cuidado total. Hoje cobre uma encosta desmatada.'],[1,'Marca de enchente no muro','Letras miúdas: o rio subiu após o desmatamento da encosta, autorizado “para plantio de compensação”.'],[2,'Relatório de impacto cortado','Só a parte positiva foi publicada; a seção de resíduos tóxicos sumiu da versão pública.'],[0,'Selo “Neutro em carbono” desbotado','Selo criado pela própria empresa, sem auditoria externa, colado em tanques que vazam.'],[1,'Etiqueta de tambor','Tambores “biodegradáveis” continham solvente. A palavra não aparecia no laudo.'],[2,'Registro de fiscalização','Três notificações da fiscalização. Multas contestadas e nenhum plano de recuperação apresentado.'],[2,'Placa “Zero Resíduos”','Registro à distância: a placa continua de pé, ao lado de uma montanha de entulho.'],[0,'Contrato de recuperação','Documento: previa recuperar a área em 2 anos; nada foi feito e o prazo venceu.'],[1,'Data no relatório','Letra miúda: o relatório “de impacto” é anterior à obra que ele deveria avaliar.'],[2,'Faixa “Verde para sempre”','Registro à distância: a faixa rasgada cobre uma cerca com aviso de área contaminada.']],300,1);
// pergunta perto do fim nas fases longas
LV[4].P.push([LV[4].w,180,100,36]);LV[4].w+=100;
[2,3,4].forEach(i=>{LV[i].qx=LV[i].w-240;LV[i].qy=180});
// dificuldade extra: mais inimigos, espinhos, drones e gotas nas fases longas
// ─ harden: dificuldade extra (mais drones, espinhos e gotas)
function harden(i,from,to,n){const l=LV[i],e=E[i];e.D=e.D||[];const pl=l.P.concat(e.P||[]),cx=l.C.map(c=>c[0]),qx=l.qx||0,gs=l.P.filter(p=>p[1]==180&&p[3]==36&&p[0]>=from&&p[0]+p[2]<=to&&p[2]>=120&&!(l.sp||[]).some(r=>p[0]>=r[0]&&p[0]<r[1]));
 gs.forEach((p,j)=>{const x=p[0],w=p[2];
  if(!e.W.some(q=>q[0]<x+w&&q[1]>x)&&(n>2||j%2==0))e.W.push([x+14,x+Math.min(w-14,100+n*14),180]);
  if(w>=150){const sx=Math.round(x+w*.62);if(!e.S.some(q=>Math.abs(q[0]-sx)<60)&&!cx.some(c=>Math.abs(c-sx)<45)&&Math.abs(qx-sx)>60&&!pl.some(q=>q[1]<180&&q[3]>=20&&q[0]<sx+30&&q[0]+q[2]>sx-6))e.S.push([sx,180,24])}
  if(n>1&&w>=200&&j%2==1)l.H.push([x+20,x+w-30,166]);
  if(n>1&&j%2==0)e.D.push([x+Math.round(w*.5),+(3-n*.25).toFixed(2)])})}
// ─ Aplica a dificuldade extra nas fases longas
harden(2,1000,LV[2].w,1);harden(3,1100,LV[3].w,2);E[4].D.push([1090,2.5]);harden(4,1000,LV[4].w,3);harden(5,300,LV[5].w-420,3);
LV.forEach((l,i)=>(E[i].D||[]).forEach(d=>{if(l.C.some(c=>c[1]==180&&Math.abs(d[0]-c[0])<22))d[0]+=34}));
// dificuldade extra nas fases curtas
E[0].S.push([560,180,18]);E[0].W.push([310,380,180]);E[0].D=[];E[1].W.push([265,320,180]);
// ─ TIPS: dicas exibidas durante as fases
const TIPS=[[[100,'W ou ↑ pulam (toque duas vezes no ar para o pulo duplo). Chegue perto de um documento e aperte ↓ para investigar.'],[235,'Espinhos e poluentes machucam: pule por cima dos espinhos, pise na cabeça dos poluentes ou aperte Espaço para neutralizá-los com a língua.'],[405,'A caixa dourada é a PERGUNTA da fase: colete 1 pista e aperte ↓ perto dela.'],[500,'Aperte F para ativar o Foco: o cenário escurece, as ameaças brilham em vermelho e o que dá para coletar brilha em dourado. Ele dura pouco e depois recarrega.'],[580,'Pistas azuis ficam no alto: aperte Espaço de perto para alcançá-las com a língua. Depois vá até a porta e aperte ↓.']],
[[40,'Drones de vigilância patrulham o chão: aperte C para se camuflar por 3 segundos. Depois a habilidade recarrega.'],[200,'Gotas tóxicas caem em ritmo: espere o intervalo e passe.'],[410,'Combine as ferramentas: F ativa o Foco e Espaço alcança pistas altas.']]];
