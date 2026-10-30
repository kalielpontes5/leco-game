
const $=i=>document.getElementById(i),g=$('c').getContext('2d'),INK='#24364B';
if(!g.roundRect)CanvasRenderingContext2D.prototype.roundRect=function(x,y,w,h){this.rect(x,y,w,h)};
const rr=(x,y,w,h,r,c)=>{g.fillStyle=c;g.beginPath();g.roundRect(x,y,w,h,r);g.fill()},ci=(x,y,r,c)=>{g.fillStyle=c;g.beginPath();g.arc(x,y,r,0,7);g.fill()};
const CAT=['Documento','Detalhe oculto','Registro à distância','Depoimento'];
const LV=[
{n:'Mercado das Aparências',k:0,w:700,qx:450,qy:180,sk:['#8EDBFF','#FFF4D6'],hl:'#9ADB8A',gr:'#C98B5A',tp:'#FFD45A',b:'Olhos Atentos',
m:'Descubra o que a embalagem realmente comprova.',t:'A/D andam, W ou ↑ pulam, ↓ investiga. F ativa o Foco; Espaço alcança pistas altas.',
P:[[0,180,205,36],[245,180,140,36],[425,180,275,36],[140,164,32,16],[250,150,32,30],[470,164,40,16],[520,146,70,8],[600,120,60,8]],
C:[[156,164,0,'Embalagem “100% ecológica”','Publicidade: a frente promete um produto 100% ecológico, sem mostrar em que se baseia.'],[330,180,0,'Símbolo de reciclagem','O símbolo aparece sozinho. Não diz se vale para o produto todo ou só para uma parte.'],[555,146,1,'Letra pequena do rótulo','Só uma parte do material usa conteúdo reciclado.'],[630,120,2,'Documento do fabricante','Não há avaliação completa dos impactos ambientais deste produto.'],[610,180,3,'Dona Rosa, comerciante','Meus clientes compram pela embalagem verde, mas ninguém me mostrou relatório algum.']],H:[],
q:'Alegação: “100% ecológica”. O que as evidências permitem concluir?',o:['A promessa está comprovada.','A promessa é ampla demais para as evidências; faltam dados.','É fraude: a empresa mentiu de propósito.'],ok:1,
f:['Não: só parte do material é reciclada e não há avaliação completa de impactos.','Correto! O rótulo é parcial e falta avaliação completa. Isso não prova má-fé. Próximo passo: pedir a documentação ao fabricante.','Precipitado: falta de prova da promessa não prova intenção de enganar. Peça documentos antes de acusar.']},
{n:'O Rio Esquecido',k:1,w:800,qx:520,qy:180,sk:['#8EDBFF','#E6F7FF'],hl:'#7BC98E',gr:'#9A6848',tp:'#64C75B',b:'Guardião das Águas',
m:'Separe indício de causa comprovada.',t:'Drones de vigilância patrulham as margens: aperte C para se camuflar por 3 segundos.',
P:[[0,180,220,36],[260,180,140,36],[440,180,120,36],[600,180,200,36],[470,146,50,8],[690,130,50,8]],
C:[[80,180,0,'Propaganda “Água protegida”','Publicidade: a fábrica diz proteger os recursos hídricos, sem apresentar números.'],[330,180,0,'Registro de manutenção','Registro técnico: a tubulação 4 foi reparada após um vazamento. Não diz o que vazou.'],[495,146,1,'Observação dos moradores','Depoimento: a água ficou turva perto da tubulação 4 nas últimas semanas.'],[670,180,3,'Seu Jorge, pescador','Pesco aqui há 20 anos. A água mudou de cor, mas não sei dizer por quê.'],[715,130,2,'Relatório de amostragem','Dado ambiental (fictício): duas amostras com turbidez alta. A origem ainda precisa ser confirmada.']],H:[[270,390,166],[610,730,166]],
q:'A água mudou perto da fábrica. O que concluir?',o:['A fábrica causou a mudança: está provado.','Está tudo bem; não há o que investigar.','Há indícios, mas a causa não está confirmada: pedir investigação técnica.'],ok:2,
f:['Ainda não: há indícios, mas a origem da alteração não foi confirmada.','Ignorar relatos, registro e amostras seria deixar evidências de lado.','Correto! Indício não é causalidade. Registre as evidências e peça análise técnica independente.']},
{n:'A Cidade dos Selos',k:2,w:1000,qx:540,qy:180,sk:['#8EDBFF','#FFF4D6'],hl:'#A6DCEB',gr:'#C9B79C',tp:'#FFD45A',b:'Detetive da Transparência',
m:'Compare os selos e classifique cada caso.',t:'Suba pelas varandas. Use o Foco (F) para destacar ameaças e coletáveis.',
P:[[0,180,190,36],[235,180,160,36],[440,180,200,36],[690,180,310,36],[120,148,60,8],[230,128,60,8],[340,150,60,8],[470,160,40,20],[560,130,70,8],[900,100,40,8]],
C:[[145,148,0,'Selo com entidade responsável','Selo fictício “Aliança Verde” (organização independente): cita processo e relatório público. Dá para verificar.'],[255,128,1,'Selo ilegível','Letras miúdas: “válido até...” sem data nem entidade. Não dá para confirmar.'],[595,130,0,'Selo criado pela própria empresa','O símbolo foi inventado pela empresa para a campanha. Não há auditoria externa.'],[740,180,3,'Seu Paulo, comerciante','Uns selos têm papel e número de processo. Outros são só desenho bonito na vitrine.'],[920,100,2,'Declaração mista','Mistura compromisso voluntário com certificação independente. Só a segunda exige verificação de terceiros.']],H:[],
q:'Como classificar os selos encontrados?',o:['Só o selo documentado é verificável; o da empresa é publicidade e o ilegível é inconclusivo.','Todos são certificações confiáveis.','Todos são falsos.'],ok:0,
f:['Correto! Cada caso tem uma classificação própria, conforme o que os documentos permitem concluir.','Não: um deles foi criado pela própria empresa e outro não pode ser confirmado.','Exagero: um dos selos tem documentação verificável.']},
{n:'A Floresta de Papel',k:3,w:1100,qx:520,qy:180,sk:['#8EDBFF','#D4F5C0'],hl:'#8CD17D',gr:'#9A6848',tp:'#64C75B',b:'Protetor da Floresta',
m:'Compare árvores plantadas com impactos a compensar.',t:'Use os troncos para subir. O Foco (F) destaca ameaças e coletáveis.',
P:[[0,180,330,36],[375,180,185,36],[605,180,355,36],[1010,180,90,36],[160,150,50,10],[260,124,50,10],[400,150,60,10],[560,100,40,8],[700,160,50,20],[800,132,60,10],[900,104,60,10]],
C:[[70,180,0,'Campanha de reflorestamento','Publicidade: “Plantamos o futuro” — a empresa diz compensar todo o seu impacto plantando árvores.'],[185,150,0,'Registro de mudas','Documento: 10.000 mudas plantadas. Não informa a área nem as espécies.'],[285,124,1,'Área afetada','Documento: a atividade afetou 40 hectares. Compare com a área plantada.'],[580,100,2,'Sobrevivência das mudas','Não há acompanhamento publicado da sobrevivência e da manutenção das mudas.'],[650,180,3,'Dona Iara, moradora','Algumas mudas secaram, outras crescem bem. Plantar ajuda, mas ninguém me mostrou as contas.'],[930,104,1,'Registro incompleto','Lista parcial dos impactos a compensar: faltam as emissões do transporte.']],H:[[320,450,166]],
q:'A empresa diz compensar tudo plantando árvores. O que concluir?',o:['Plantar árvores prova a compensação total.','Plantar é positivo, mas faltam dados para provar a compensação total.','Falta documento, então é fraude.'],ok:1,
f:['Não: plantar pode ser positivo, mas os registros não provam que todos os impactos foram compensados.','Correto! Faltam área, sobrevivência e impactos completos. A ausência de um documento não é prova automática de fraude: peça os dados.','Precipitado: falta de documento pede mais informação, não acusação.']},
{n:'A Torre da Verdade',k:4,w:1000,qx:560,qy:180,sk:['#BFE6FF','#FFF1D5'],hl:'#D8EBF5',gr:'#C8D3DC',tp:'#FFD45A',b:'Guardião da Verdade',
m:'Reúna os quatro dossiês e entregue o relatório final.',t:'Combine tudo o que aprendeu: F, Espaço e C. Cuidado com os drones dos corredores.',
P:[[0,180,235,36],[280,180,180,36],[500,180,110,36],[655,180,125,36],[825,180,175,36],[120,150,50,8],[220,122,50,8],[320,94,50,8],[450,124,60,8],[560,152,50,8],[640,86,40,8],[690,158,40,22],[740,126,60,8]],
C:[[145,150,0,'Dossiê A: alegação sustentada','Meta de redução com auditoria pública e dados anuais. Evidências suficientes.'],[345,94,1,'Dossiê B: promessa ampla','Promete “neutralidade total”, mas só mostra dados de uma unidade.'],[660,86,2,'Dossiê C: indício sem causa provada','Há aumento de resíduos após a obra, mas nada prova a causa ainda.'],[765,126,0,'Dossiê D: iniciativa positiva','Programa de coleta promissor, mas ainda não diz em quantos bairros atua.'],[900,180,3,'Dra. Lia, pesquisadora','Cada dossiê pede uma resposta: reconhecer, pedir dados, investigar ou delimitar o alcance.']],H:[[200,400,166],[560,680,166]],
q:'Relatório final: qual postura é proporcional aos quatro dossiês?',o:['Aprovar todos por terem aparência verde.','Acusar todos de fraude.','Reconhecer o que está provado, pedir dados onde falta, investigar onde há indício e delimitar o alcance.'],ok:2,
f:['Aparência não é comprovação.','Acusar sem provas é precipitado.','Correto! Cada dossiê pede um tratamento proporcional às evidências.']},
{n:'O Colapso do Greenwashing',k:5,w:2820,qx:2460,qy:180,sk:['#4a2f3f','#e89a62'],hl:'#6b4a45',gr:'#5e4a3a',tp:'#8a7b6a',b:'Voz da Verdade',
m:'Atravesse as ruínas e descubra o que a propaganda verde escondeu.',t:'Tudo desaba: abismos, drones, gotas tóxicas e tremores. Colete ao menos 1 pista, responda à pergunta no fim e enfrente o responsável.',
P:[[0,180,300,36]],C:[[150,180,3,'Rita, ex-moradora','Eles prometeram “cuidado total” e sumiram quando o rio transbordou. Quem ficou foi a gente.']],H:[],
q:'Este lugar desabou depois de anos de propaganda verde. O que ele mostra sobre o greenwashing?',o:['Que propaganda verde sempre garante cuidado ambiental.','Que promessas sem prova podem esconder danos reais; por isso é preciso exigir evidências e responsabilização.','Que toda empresa com propaganda verde é culpada, mesmo sem provas.'],ok:1,
f:['Não: aqui a propaganda prometia cuidado e as evidências mostram o contrário.','Correto! Promessa sem prova pode esconder dano real. Evidência e responsabilização, não suposição, são o caminho.','Precipitado: acusar sem provas também é um erro. Aqui há evidências concretas, e é nelas que devemos nos apoiar.']}];

// ---------- EXTRAS POR FASE: M móveis [x,y,w,eixo,alcance,vel] · S espinhos [x,y,w] · W patrulheiros [x1,x2,y] · D gotas [x,período] · F folhas [x,y] · P plataformas ----------
const E=[
{M:[],P:[],S:[[282,180,22]],W:[[520,590,180]],F:[[160,140],[266,126],[330,160],[540,120],[626,100]]},
{M:[],P:[],S:[[120,180,24],[345,180,24],[495,180,24]],W:[[620,725,180]],D:[[300,2.6],[520,2.2],[680,2.4]],F:[[240,150],[330,150],[490,120],[640,150],[715,106]]},
{M:[[640,112,36,'h',60,1],[790,172,34,'v',86,.85]],P:[[836,86,50,8]],S:[[110,180,24],[300,180,28],[700,180,24],[860,180,30]],W:[[250,380,180],[760,850,180]],F:[[150,128],[260,108],[370,130],[590,110],[680,90],[860,68]]},
{M:[[500,172,30,'v',76,.9],[965,120,34,'h',50,1.1]],P:[[1030,84,50,8]],S:[[120,180,26],[225,180,22],[790,180,30],[890,180,26]],W:[[400,500,180],[610,690,180]],F:[[185,130],[285,104],[430,130],[640,150],[820,112],[930,84],[1055,66]]},
{M:[[385,98,36,'h',46,1.1],[600,172,30,'v',84,.9]],P:[],S:[[120,180,24],[330,180,26],[505,180,24],[850,180,24]],W:[[135,225,180],[350,450,180],[880,960,180]],D:[[260,2.4],[520,2]],F:[[145,130],[245,102],[345,74],[480,104],[585,132],[660,66],[770,106]]}];

E.push({M:[],P:[],S:[[210,180,24]],W:[],D:[[90,2.4]],F:[[60,150],[240,150]]});
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
function ext(i,seq,cl,o,chaos){const l=LV[i],e=E[i];e.D=e.D||[];e.V=e.V||[];e.Z=e.Z||[];const sh=(a,d,ix=[0])=>(a||[]).map(r=>r.map((v,j)=>ix.includes(j)?v+d:v));
 seq.forEach(k=>{const m=MOD[k];l.P.push(...sh(m.P,o));l.H.push(...sh(m.H,o,[0,1]));e.S.push(...sh(m.S,o));e.W.push(...sh(m.W,o,[0,1]));e.M.push(...sh(m.M,o));e.D.push(...sh(m.D,o));e.F.push(...sh(m.F,o));e.V.push(...sh(m.V,o));e.Z.push(...sh(m.Z,o));if(m.z)(l.sp=l.sp||[]).push([o,o+300]);
  if(chaos)e.D.push([o+70,2.3],[o+230,2.8]);if(m.c&&cl.length){const c=cl.shift();l.C.push([o+m.c[0],m.c[1],c[0],c[1],c[2]])}o+=300});
 if(chaos){l.P.push([o,180,420,36]);o+=420;l.qx=o-360}l.w=o}
ext(2,['a','i','f'],[[0,'Selo “Eco Premium”','Selo vendido em kit de marketing: qualquer empresa paga e usa, sem checagem de produção.'],[1,'Rodapé do selo','Letrinhas: “conforme critérios próprios”. Sem norma pública nem entidade externa.'],[2,'Auditoria independente','Relatório público (fictício): comprova redução de 30% dos resíduos, com método e dados abertos.'],[1,'Selo sem validade','Detalhe oculto: o selo “Natureza Plena” não traz data de validade nem número de registro.'],[2,'Vitrine promocional','Faixa na vitrine: “Selo de qualidade ambiental”, sem dizer quem concedeu nem com quais critérios.']],1000);
ext(3,['b','k','c','h','d'],[[0,'Viveiro de mudas','Cartaz diz 20 mil mudas; o contrato mostra 8 mil, e só 3 mil sobreviveram à primeira estação.'],[1,'Mapa de plantio','Legenda pequena: o plantio ocorre em área que já era floresta; não repõe a que foi derrubada.'],[2,'Monocultura de eucalipto','Parte do plantio é de uma única espécie: ajuda no carbono, mas não substitui a biodiversidade perdida.'],[0,'Contrato de plantio','Documento: replantio só se a muda morrer em até 30 dias; depois disso, ninguém monitora.'],[1,'Rodapé do balanço','Letrinhas: os “hectares plantados” incluem áreas de reflorestamento já exigidas por lei.'],[2,'Foto de satélite','Registro à distância: a faixa “plantada” aparece como solo exposto em duas imagens seguidas.']],1100);
ext(4,['d','i','f','j','g'],[[0,'Planilha de emissões','Mostra só o escopo da fábrica; transporte e fornecedores ficam de fora.'],[1,'Nota de rodapé','A meta “neutro até 2030” depende de compensações ainda não contratadas.'],[2,'Programa de coleta','Relatório de bairro: atende 2 de 14 bairros; ainda é cedo para generalizar.'],[0,'Laudo de água','Laudo independente: resultado dentro do limite em 3 pontos; faltam 2 pontos de coleta.'],[1,'Gráfico cortado','O eixo do gráfico começa em 80%: a queda de emissões parece maior do que é.'],[2,'Placa na usina','Registro à distância: a placa “zero resíduos” fica ao lado de uma pilha de resíduos.'],[0,'Relatório de sustentabilidade','Documento: 40 páginas de ações pontuais e nenhuma tabela com resultados medidos.'],[1,'Assinatura do laudo','Letra miúda: o laudo foi pago e assinado pela própria empresa, não por laboratório independente.']],1000);
ext(5,['h','j'],[[0,'Outdoor “Nós cuidamos de tudo”','O painel prometia cuidado total. Hoje cobre uma encosta desmatada.'],[1,'Marca de enchente no muro','Letras miúdas: o rio subiu após o desmatamento da encosta, autorizado “para plantio de compensação”.'],[2,'Relatório de impacto cortado','Só a parte positiva foi publicada; a seção de resíduos tóxicos sumiu da versão pública.'],[0,'Selo “Neutro em carbono” desbotado','Selo criado pela própria empresa, sem auditoria externa, colado em tanques que vazam.'],[1,'Etiqueta de tambor','Tambores “biodegradáveis” continham solvente. A palavra não aparecia no laudo.'],[2,'Registro de fiscalização','Três notificações da fiscalização. Multas contestadas e nenhum plano de recuperação apresentado.'],[2,'Placa “Zero Resíduos”','Registro à distância: a placa continua de pé, ao lado de uma montanha de entulho.'],[0,'Contrato de recuperação','Documento: previa recuperar a área em 2 anos; nada foi feito e o prazo venceu.'],[1,'Data no relatório','Letra miúda: o relatório “de impacto” é anterior à obra que ele deveria avaliar.'],[2,'Faixa “Verde para sempre”','Registro à distância: a faixa rasgada cobre uma cerca com aviso de área contaminada.']],300,1);
// pergunta perto do fim nas fases longas
LV[4].P.push([LV[4].w,180,100,36]);LV[4].w+=100;
[2,3,4].forEach(i=>{LV[i].qx=LV[i].w-240;LV[i].qy=180});
// dificuldade extra: mais inimigos, espinhos, drones e gotas nas fases longas
function harden(i,from,to,n){const l=LV[i],e=E[i];e.D=e.D||[];const pl=l.P.concat(e.P||[]),cx=l.C.map(c=>c[0]),qx=l.qx||0,gs=l.P.filter(p=>p[1]==180&&p[3]==36&&p[0]>=from&&p[0]+p[2]<=to&&p[2]>=120&&!(l.sp||[]).some(r=>p[0]>=r[0]&&p[0]<r[1]));
 gs.forEach((p,j)=>{const x=p[0],w=p[2];
  if(!e.W.some(q=>q[0]<x+w&&q[1]>x)&&(n>2||j%2==0))e.W.push([x+14,x+Math.min(w-14,100+n*14),180]);
  if(w>=150){const sx=Math.round(x+w*.62);if(!e.S.some(q=>Math.abs(q[0]-sx)<60)&&!cx.some(c=>Math.abs(c-sx)<45)&&Math.abs(qx-sx)>60&&!pl.some(q=>q[1]<180&&q[3]>=20&&q[0]<sx+30&&q[0]+q[2]>sx-6))e.S.push([sx,180,24])}
  if(n>1&&w>=200&&j%2==1)l.H.push([x+20,x+w-30,166]);
  if(n>1&&j%2==0)e.D.push([x+Math.round(w*.5),+(3-n*.25).toFixed(2)])})}
harden(2,1000,LV[2].w,1);harden(3,1100,LV[3].w,2);E[4].D.push([1090,2.5]);harden(4,1000,LV[4].w,3);harden(5,300,LV[5].w-420,3);
LV.forEach((l,i)=>(E[i].D||[]).forEach(d=>{if(l.C.some(c=>c[1]==180&&Math.abs(d[0]-c[0])<22))d[0]+=34}));
// dificuldade extra nas fases curtas
E[0].S.push([560,180,18]);E[0].W.push([310,380,180]);E[0].D=[];E[1].W.push([265,320,180]);
const TIPS=[[[100,'W ou ↑ pulam (toque duas vezes no ar para o pulo duplo). Chegue perto de um documento e aperte ↓ para investigar.'],[235,'Espinhos e poluentes machucam: pule por cima dos espinhos, pise na cabeça dos poluentes ou aperte Espaço para neutralizá-los com a língua.'],[405,'A caixa dourada é a PERGUNTA da fase: colete 1 pista e aperte ↓ perto dela.'],[500,'Aperte F para ativar o Foco: o cenário escurece, as ameaças brilham em vermelho e o que dá para coletar brilha em dourado. Ele dura pouco e depois recarrega.'],[580,'Pistas azuis ficam no alto: aperte Espaço de perto para alcançá-las com a língua. Depois vá até a porta e aperte ↓.']],
[[40,'Drones de vigilância patrulham o chão: aperte C para se camuflar por 3 segundos. Depois a habilidade recarrega.'],[200,'Gotas tóxicas caem em ritmo: espere o intervalo e passe.'],[410,'Combine as ferramentas: F ativa o Foco e Espaço alcança pistas altas.']]];
// ---------- ESTADO ----------
const S={li:0,sc:0,cr:50,got:{},lv:{},bd:[],ok:0,fin:0,mode:'menu',answered:{},pg:{}},P={x:24,y:180,vx:0,vy:0,dir:1,og:0,sp:null,dj:0,sq:0},K={};
let L=LV[0],cam=0,T=0,lt=0,vis=0,visCd=0,camT=0,camCd=0,inv=0,tg=0,tgT=null,hz=[],pt=[],safe={x:24,y:180},near=null,mute=(()=>{try{return +localStorage.getItem('leco_m')||0}catch(e){return 0}})(),mt,AC,st=[],mv=[],sk=[],wk=[],dr=[],lf=[],cy=0,jb=0,sh=0;
const ORD=[0,2,1,3,4,5],KEY='leco_v6',META=[300,360,900,1300,1700,2400],phaseKey=i=>'fase-'+i,clueIndexes=i=>LV[i].C.map((c,j)=>({c,j})).filter(o=>o.c[2]!==3&&o.c[2]!==1),cnt=i=>clueIndexes(i).filter(o=>S.got[i+'-'+o.j]).length,clueTotal=i=>clueIndexes(i).length,requiredClues=i=>1,tot=LV.reduce((a,l,i)=>a+clueTotal(i),0),nLf=()=>Object.keys(S.lv).length;
let phaseStartScore=0,tongueTarget=null,tongueCooldown=0,phaseStats=null;const phasePoints=()=>Math.max(0,S.sc-phaseStartScore),readyToQuestion=()=>cnt(S.li)>=requiredClues(S.li);
function newStats(){return {leaves:0,enemies:0,damage:0,deaths:0,clues:0,pointsLost:0};}
function progressText(i=S.li){return `${cnt(i)}/${requiredClues(i)} pistas necessárias (${clueTotal(i)} pistas coletáveis)`;}
function sfx(f,d=.1,t='square',f2){if(mute)return;try{AC=AC||new AudioContext();const o=AC.createOscillator(),v=AC.createGain(),n=AC.currentTime;o.type=t;o.frequency.setValueAtTime(f,n);if(f2)o.frequency.exponentialRampToValueAtTime(f2,n+d);v.gain.setValueAtTime(.05,n);v.gain.exponentialRampToValueAtTime(.001,n+d);o.connect(v);v.connect(AC.destination);o.start();o.stop(n+d)}catch(e){}}
const panel=h=>{$('o').innerHTML='<div class=pn>'+h+'</div>';$('o').style.display='flex'},close=()=>$('o').style.display='none';
const toast=(s,ms=2400)=>{const e=$('ts');e.textContent=s;e.style.visibility='visible';clearTimeout(mt);mt=setTimeout(()=>e.style.visibility='hidden',ms)};
const btn=(f,l,d)=>`<button class=b onclick="${f}"${d?' disabled':''}>${l}</button>`;
function save(){try{localStorage.setItem(KEY,JSON.stringify({v:6,li:S.li,sc:S.sc,cr:S.cr,got:S.got,lv:S.lv,bd:S.bd,ok:S.ok,fin:S.fin,answered:S.answered,pg:Object.assign({},S.pg,{[S.li]:phasePoints()}),phaseStartScore}))}catch(e){}}
function load(){try{const d=JSON.parse(localStorage.getItem(KEY));if(d&&d.v==6&&Number.isInteger(d.li)&&d.li>=0&&d.li<LV.length){d.got=Object.fromEntries(Object.entries(d.got&&typeof d.got=='object'?d.got:{}).filter(([k])=>{const q=k.split('-');return LV[q[0]]&&LV[q[0]].C[q[1]]}));return d}}catch(e){}return null}
// ---------- MENUS ----------
function menu(){S.mode='menu';$('h').style.display='none';document.body.classList.add('mn');fit();panel('<img alt="Leco, o camaleão" src="'+lecoBig()+'"><h1>LECO: ALÉM DO VERDE</h1><p>“Nem tudo que parece verde é sustentável.”</p>'+btn('go(0)','JOGAR')+btn('go(1)','CONTINUAR',!load())+btn('levels()','FASES')+'<br>'+btn('how()','COMO JOGAR')+btn('snd()','SOM: '+(mute?'OFF':'ON'))+btn('cred()','CRÉDITOS'))}
function levels(){panel('<h3>ESCOLHER FASE</h3>'+ORD.map((i,p)=>btn('pick('+i+')',(p+1)+'. '+LV[i].n)).join('<br>')+'<br>'+btn('pick(6)','⚔ SÓ O CHEFÃO')+'<br>'+btn('menu()','VOLTAR'))}
function pick(i){const d=load();if(d)Object.assign(S,{sc:d.sc|0,cr:d.cr|0,got:d.got||{},lv:d.lv&&typeof d.lv=='object'?d.lv:{},bd:Array.isArray(d.bd)?d.bd:[],ok:d.ok|0,fin:d.fin|0,answered:d.answered&&typeof d.answered=='object'?d.answered:{},pg:d.pg&&typeof d.pg=='object'?d.pg:{}});close();if(i>5){enter(5);bossOnly=1;S.answered[phaseKey(5)]=true;startBoss();cam=L.w-384;return}fresh(i)}
function snd(){mute=mute?0:1;try{localStorage.setItem('leco_m',mute)}catch(e){}menu()}
function how(){panel('<h3>COMO JOGAR</h3><p><b>A/D ou ◀ ▶</b> andar · <b>W</b> ou <b>↑</b> pular (toque duas vezes no ar para o pulo duplo) · <b>↓</b> investigar e sair pela porta · <b>F</b> Foco (escurece o cenário, destaca ameaças em vermelho e coletáveis em dourado; tem tempo de uso e recarga) · <b>Espaço</b> língua · <b>Esc</b> pausa<br>Pule na cabeça dos poluentes, evite espinhos e gotas, e use as plataformas móveis para subir. A língua (Espaço) neutraliza inimigos e alcança pistas azuis (espinhos não podem ser removidos: pule por cima). Basta 1 pista para liberar a saída, mas pegar todas rende bônus de pontos e mais estrelas. Pessoas são relatos e não contam como pistas. Leco tem 5 vidas por fase: ataques, espinhos e gotas tiram meia vida e cair em um buraco tira uma inteira. No chefão você tem 3 chances. Inimigos: mascote publicitário falso, barril de chorume e selo enganoso. Nas fases 4 a 6 há fiscais do greenwashing que atiram: acerte 3 linguadas (Espaço) para ganhar o selo dourado de Fiscal Ativo e uma folha extra. Na luta contra o chefão, C deixa você invisível por alguns segundos (depois recarrega) e caem itens do céu: orbe roxo = língua mais longa, orbe azul = ataque mais forte, coração = vida (só é coletado quando você precisa e some em 5 s).</p>'+btn('menu()','VOLTAR'))}
function cred(){panel('<h3>CRÉDITOS</h3><p>LECO: ALÉM DO VERDE<br>Um jogo do universo Verde Real.<br>Personagens, empresas e documentos são fictícios.</p>'+btn('menu()','VOLTAR'))}
function go(c){if(!c){load()?panel('<h3>Já existe progresso salvo.</h3><p>Começar de novo substitui o progresso atual.</p>'+btn('newG()','SUBSTITUIR')+btn('menu()','CANCELAR')):newG();return}const d=load();if(!d)return;Object.assign(S,{sc:d.sc|0,cr:d.cr|0,got:d.got&&typeof d.got=='object'?d.got:{},lv:d.lv&&typeof d.lv=='object'?d.lv:{},bd:Array.isArray(d.bd)?d.bd:[],ok:d.ok|0,fin:d.fin|0,answered:d.answered&&typeof d.answered=='object'?d.answered:{},pg:d.pg&&typeof d.pg=='object'?d.pg:{}});phaseStartScore=Number.isFinite(d.phaseStartScore)?d.phaseStartScore:d.sc; if(S.fin){S.li=LV.length-1;L=LV[S.li];S.mode='end';endP()}else{enter(d.li);phaseStartScore=Number.isFinite(d.phaseStartScore)?d.phaseStartScore:d.sc;save()}}
function newG(){Object.assign(S,{sc:0,cr:50,got:{},lv:{},bd:[],ok:0,fin:0,answered:{},pg:{}});phaseStartScore=0;save();enter(0)}
function pauseP(){S.mode='pause';panel('<h3>PAUSA</h3><p>MISSÃO: '+L.m+'</p>'+btn('resume()','CONTINUAR')+btn('invP()','INVENTÁRIO')+'<br>'+btn('fresh(S.li,1)','REINICIAR FASE')+btn('levels()','ESCOLHER FASE')+btn('menu()','MENU PRINCIPAL'))}
function resume(){close();S.mode='play'}
function invP(){const e=S.mode=='end';panel('<h3>INVENTÁRIO DE PISTAS</h3>'+LV.map((l,i)=>`<p><b>${l.n}</b> (${cnt(i)}/${clueTotal(i)})<br><small>`+l.C.map((c,j)=>c[2]===1?null:c[2]===3?'◉ '+c[3]+' [Relato]':S.got[i+'-'+j]?'✔ '+c[3]+' ['+CAT[c[2]]+']':'▫ Pista não encontrada').filter(Boolean).join('<br>')+'</small></p>').join('')+btn(e?'endP()':'pauseP()','VOLTAR'))}
function endP(){const f=Object.keys(S.got).length,t=S.ok>=LV.length-1&&f>=tot*.9?'Investigador exemplar':S.ok>=2?'Investigador atento':'Investigador em aprendizado';panel('<h1>VERDELÂNDIA APRENDEU!</h1><h3>'+t+'</h3><p>Pontos: '+S.sc+' · Credibilidade: '+S.cr+' · Pistas: '+f+'/'+tot+' · Folhas: '+nLf()+'/'+(E.reduce((a,e)=>a+e.F.length,0)+5)+'</p><p>'+(S.bd.map(b=>'★ '+b).join('<br>')||'Nenhuma insígnia desta vez.')+'</p><p><small>Você aprendeu a pedir evidências antes de concluir.</small></p>'+btn('newG()','JOGAR NOVAMENTE')+btn('invP()','REVISAR')+btn('menu()','MENU'))}
// ---------- FASE ----------
function fresh(i,live){S.pg=S.pg||{};const g=live?phasePoints():(S.pg[i]|0),pre=i+'-';Object.keys(S.got).forEach(k=>{if(k.startsWith(pre))delete S.got[k]});Object.keys(S.lv).forEach(k=>{if(k.startsWith('l'+pre))delete S.lv[k]});if(S.answered[phaseKey(i)]){delete S.answered[phaseKey(i)];S.ok=Math.max(0,S.ok-1);S.bd=S.bd.filter(b=>b!==LV[i].b)}S.bd=S.bd.filter(b=>!FOE.some(o=>o.ph==i&&o.seal==b));S.sc=Math.max(0,S.sc-g);S.pg[i]=0;enter(i)}
function enter(i){bossOnly=0;boss=null;bp=[];php=5;drops=[];dropT=0;pwR=pwS=lightT=vict=0;tipsSeen={};lives=10;chances=3;S.li=i;L=LV[i];phaseStartScore=S.sc;phaseStats=newStats();const e=E[i];tongueTarget=null;tongueCooldown=0;Object.assign(P,{x:24,y:180,vx:0,vy:0,dir:1,og:1,sp:null,dj:0,sq:0});safe={x:24,y:180};cam=0;vis=visCd=0;camT=camCd=tg=cy=jb=lt=inv=0;tgT=null;
 st=L.P.concat(e.P||[]);hz=L.H.map(h=>({x:h[0],a:h[0],b:h[1],y:h[2],d:1})).map(o=>clipRun(o,o.y,o.y+10,7)).filter(Boolean);
 mv=(e.M||[]).filter(m=>m[4]>0).map(m=>({ox:m[0],oy:m[1],x:m[0],y:m[1],w:m[2],ax:m[3],r:m[4],s:m[5],dx:0,dy:0,mv:1}));
 sk=(e.S||[]).filter(s=>s[2]>0);wk=(e.W||[]).map(w=>({a:w[0],b:w[1],y:w[2],x:w[0],d:1,dead:0})).map(o=>clipRun(o,o.y-12,o.y-1,6)).filter(Boolean);dr=(e.D||[]).map((d,j)=>({x:d[0],p:d[1],o:j*.9}));vp=(e.V||[]).map(v=>{const o={x:v[0],y:v[1],w:v[2],per:v[3]||4,off:v[4]||0,mode:v[5]||0,hid:v[6]||1.2,vis:1,warn:0,t:0,h:0};o.r=[o.x,o.y,o.w,8];o.r.v=o;return o});zp=(e.Z||[]).map(z=>({x:z[0],per:z[1]||3,kind:z[2]||0,off:z[3]||0,u:0,y:14,h:0}));vs=vp.map(v=>v.r);
 lf=(e.F||[]).map((f,j)=>({x:f[0],y:f[1],k:'l'+i+'-'+j})).filter(f=>!S.lv[f.k]);pt=[];spawnFoes();if(S.li==5)hz=[];S.mode='play';$('h').style.display='flex';document.body.classList.remove('mn');fit();close();save();toast(L.m+' — '+L.t,6000)}
function clipRun(o,y0,y1,hw){const free=x=>!st.some(p=>x+hw>p[0]&&x-hw<p[0]+p[2]&&p[1]<y1&&p[1]+p[3]>y0);let bs=0,bl=0,s=null;for(let x=o.a;x<=o.b+1;x++){const f=x<=o.b&&free(x);if(f&&s==null)s=x;if(!f&&s!=null){if(x-1-s>bl){bl=x-1-s;bs=s}s=null}}if(bl<14)return null;o.a=bs;o.b=bs+bl;o.x=bs;o.d=1;return o}
const burst=(x,y,c,n=8)=>{for(let j=0;j<n;j++)pt.push({x,y,vx:(Math.random()-.5)*90,vy:-Math.random()*80,l:.5,c})};
function collect(i){const k=S.li+'-'+i;if(S.got[k]||!L.C[i]||L.C[i][2]===3||L.C[i][2]===1)return;
 S.got[k]=1;S.sc+=100;if(phaseStats)phaseStats.clues++;const c=L.C[i];burst(c[0],c[1]-8,'#FFD45A',12);joy=.7;sfx(660,.2,'square',1320);toast('PISTA ENCONTRADA: '+c[3]);save()}
function act(){if(!near)return;if(near.rosa){near=null;return cineStart()}if(near.q){return conclude()}if(near.d){return finishPhase()}const c=L.C[near.i];S.mode='panel';if(c[2]===3){panel(`<h3>${c[3]}</h3><small>RELATO DE MORADOR</small><p>${c[4]}</p><p><small>Relatos ajudam a entender o contexto, mas não contam como pista documental coletável.</small></p>`+btn('resume()','VOLTAR AO MAPA'));return}panel(`<h3>${c[3]}</h3><small>${CAT[c[2]]}</small><p>${c[4]}</p>`+btn('collect('+near.i+');resume()','GUARDAR PISTA')+btn('resume()','FECHAR'))}
function tongue(){if(tg>0||tongueCooldown>0)return;const reach=pwR>0?176:112,dir=P.dir||1;
 if(boss&&boss.on&&!boss.dead&&(pwR>0||(Math.abs(boss.x-P.x)<=reach+22&&(boss.x-P.x)*dir>0))){if(pwR>0)P.dir=1;tg=.28;tgT=-1;tongueTarget={x:boss.x-24,y:P.y-18,type:'enemy'};tongueCooldown=.5;if(boss.st=='vuln'){boss.hp-=pwS>0?3:1;boss.flash=.25;S.sc+=15;sh=pwS>0?.2:.12;burst(boss.x-22,P.y-24,pwS>0?'#6cc4ff':'#ffd45a',pwS>0?16:8);sfx(300,.15,'square',900);if(boss.hp<=0)bossDie()}else{toast('A máscara está fechada! Espere ela abrir.',1200);sfx(120,.1)}return}
const i=L.C.findIndex((c,j)=>c[2]==2&&!S.got[S.li+'-'+j]&&Math.abs(c[0]-P.x)<=reach&&Math.abs(c[1]-P.y)<=88&&((c[0]-P.x)*dir>=-12));if(i>=0){tg=.3;tgT=i;tongueTarget={x:L.C[i][0],y:L.C[i][1]-8,type:'clue',i};tongueCooldown=.55;sfx(300,.25,'sawtooth',900);return}
 const wi=wk.findIndex(w=>!w.dead&&Math.abs(w.x-P.x)<=reach&&Math.abs(w.y-P.y)<34&&((w.x-P.x)*dir>=-8));if(wi>=0){const w=wk[wi];w.dead=1;tg=.28;tgT=-1;tongueTarget={x:w.x,y:w.y-5,type:'enemy'};tongueCooldown=.8;S.sc+=60;if(phaseStats)phaseStats.enemies++;burst(w.x,w.y-5,'#B8E85C',12);sfx(420,.22,'square',1200);toast('Língua certeira! Inimigo neutralizado. +60 pontos');save();return}
 const xi=foes.findIndex(s=>!s.dead&&Math.abs(s.x-P.x)<=reach+8&&Math.abs(s.y-P.y)<34&&((s.x-P.x)*dir>=-8));if(xi>=0){hitFoe(xi);return}
 tg=.22;tongueCooldown=.45;tongueTarget={x:P.x+dir*reach,y:P.y-12,type:'miss'};sfx(150,.1);toast('A língua alcança inimigos e pistas azuis. Aproxime-se e vire para o alvo.');}
function conclude(){S.mode='panel';const key=phaseKey(S.li);if(S.li==5&&foes.some(f=>!f.dead)){panel('<h3>CHEFÃO BLOQUEADO</h3><p>Derrote os fiscais do greenwashing desta fase (3 linguadas com Espaço em cada um) antes de enfrentar o vilão.</p>'+btn('resume()','VOLTAR'));return}if(S.answered[key]){panel(`<h3>Pergunta já respondida</h3><p>Você já registrou sua conclusão nesta fase. Agora colete ao menos 1 pista e vá até a saída. Pegar todas rende bônus e mais estrelas.</p>`+(S.li==5?btn('startBoss()','⚔ ENFRENTAR O VILÃO'):btn('resume()','CONTINUAR')));return}if(S.li==5&&!readyToQuestion()){panel(`<h3>Falta uma pista</h3><p>Colete ao menos 1 pista nas ruínas antes de responder.</p>`+btn('resume()','VOLTAR'));return}panel(`<h3>PERGUNTA DE INVESTIGAÇÃO</h3><p><b>${L.n}</b></p><p>${L.q}</p>`+L.o.map((o,i)=>btn('ans('+i+')',o)).join('<br>')+`<p><small>Responda no mapa e depois continue a exploração.</small></p>`+btn('resume()','PENSAR MAIS'))}
function ans(i){
 const key=phaseKey(S.li),ok=i==L.ok,already=!!S.answered[key];
 if(!ok){if(phaseStats){phaseStats.damage++;phaseStats.pointsLost+=20}S.sc=Math.max(0,S.sc-20);S.cr=Math.max(0,S.cr-5);sfx(200,.3,'sawtooth');save();panel(`<h3>Quase! Reavalie as evidências</h3><p>${L.f[i]}</p><p>Você perdeu 5 pontos de credibilidade. A pergunta continua disponível no mapa.</p>`+btn('resume()','VOLTAR À EXPLORAÇÃO')+btn('conclude()','TENTAR OUTRA RESPOSTA'));return}
 if(!already){S.sc+=120;S.cr=Math.min(100,S.cr+10);S.ok++;S.answered[key]=true;if(!S.bd.includes(L.b))S.bd.push(L.b);sfx(880,.4,'square',1760)}
 save();const missing=Math.max(0,META[S.li]-phasePoints());panel(`<h3>ANÁLISE CORRETA!</h3><p>${L.f[i]}</p><p>+120 pontos · +10 credibilidade</p><p>${cnt(S.li)}/${clueTotal(S.li)} pistas · ${phasePoints()} pontos nesta fase.</p><p>${S.li==5?'O responsável pelo colapso aparece! Desvie dos ataques e use a língua (Espaço) quando a máscara abrir.':cnt(S.li)<1?'Colete ao menos 1 pista para liberar a saída.':'Vá até a saída, ou explore mais: todas as pistas rendem bônus e mais estrelas.'}</p>`+(S.li==5?btn('startBoss()','⚔ ENFRENTAR O VILÃO'):btn('resume()','CONTINUAR A FASE'))+btn('invP()','REVISAR PISTAS'))
}
function finishPhase(){const key=phaseKey(S.li);if(S.li==1&&!S.lv['l1-riv']){panel('<h3>SAÍDA SELADA</h3><p>A saída da fábrica só abre para quem trouxer as amostras do fundo do rio. Fale com a Dona Rosa (tecla ↓), perto da pergunta do mapa, para começar a missão no Rio Esquecido.</p>'+btn('resume()','CONTINUAR EXPLORANDO'));return}if(foes.some(f=>!f.dead)){panel('<h3>SAÍDA BLOQUEADA</h3><p>Derrote os fiscais do greenwashing desta fase (3 linguadas com Espaço em cada um) antes de sair pela porta.</p>'+btn('resume()','CONTINUAR EXPLORANDO'));return}if(!readyToQuestion()||!S.answered[key]){panel(`<h3>SAÍDA BLOQUEADA</h3><p>Para concluir a fase, colete ao menos 1 das ${clueTotal(S.li)} pistas e responda corretamente à pergunta do mapa. Pegar todas as pistas dá bônus e mais estrelas.</p><p>Progresso: ${cnt(S.li)}/${clueTotal(S.li)} pistas · ${phasePoints()} pontos · ${S.answered[key]?'pergunta respondida':'pergunta pendente'}.</p>`+btn('resume()','CONTINUAR EXPLORANDO'));return}showPhaseResults()}
function starsFor(){const t=clueTotal(S.li),c=cnt(S.li),st=phaseStats||newStats(),lt=E[S.li].F.length,lv=Object.keys(S.lv).filter(k=>k.startsWith('l'+S.li+'-')).length;let n=1;if(c>=Math.ceil(t/2))n++;if(c>=t)n++;if(lt&&lv>=lt*.7)n++;if(st.damage<=2)n++;return Math.min(5,n)}
function showPhaseResults(){jingle(WIN);const full=cnt(S.li)>=clueTotal(S.li);if(full){S.sc+=150;save()}const stt=phaseStats||newStats(),stars=starsFor();S.mode='panel';const html=`<div class="result-stars">${'★'.repeat(stars)}${'☆'.repeat(5-stars)}</div><h2>FASE ${ORD.indexOf(S.li)+1} CONCLUÍDA!</h2><p><b>${L.n}</b></p><div class="result-grid"><div><b>${cnt(S.li)}/${clueTotal(S.li)}</b><small>Pistas encontradas</small></div><div><b>${stt.leaves}</b><small>Folhas comidas</small></div><div><b>${stt.enemies}</b><small>Inimigos derrotados</small></div><div><b>${stt.damage}</b><small>Ataques / penalidades</small></div><div><b>−${stt.pointsLost}</b><small>Pontos perdidos</small></div><div><b>${phasePoints()}</b><small>Pontos da fase</small></div><div><b>${stt.deaths}</b><small>Quedas / mortes</small></div></div><p>${stars>=4?'Excelente investigação!':stars>=3?'Bom trabalho. Explore mais para conquistar todas as estrelas.':'Fase concluída! Tente evitar danos e encontrar mais evidências na próxima partida.'}</p>${full?'<p><b>BÔNUS: todas as pistas! +150 pontos</b></p>':''}<p><small>★ Estrelas: concluir · metade das pistas · todas as pistas · 70% das folhas · no máximo 2 danos.</small></p>`;panel(html+btn('advanceAfterResults()','CONTINUAR'))}
function advanceAfterResults(){if(ORD.indexOf(S.li)<LV.length-1)fresh(ORD[ORD.indexOf(S.li)+1],0);else{S.fin=1;S.mode='end';save();endP()}}
function nxt(){finishPhase()}
function die(m,full){if(inv>0)return;S.cr=Math.max(0,S.cr-8);S.sc=Math.max(0,S.sc-25);if(phaseStats){phaseStats.damage++;phaseStats.deaths++;phaseStats.pointsLost+=25}burst(P.x,P.y-8,'#43B95C',10);P.x=safe.x;P.y=safe.y;P.vx=P.vy=0;inv=1.5;sh=.25;sfx(150,.3,'sawtooth');toast(m+' −8 credibilidade; '+(full?'−1 vida;':'−½ vida;')+' retorno ao último ponto seguro.');loseLife(full)}
const hurt=m=>{if(inv<=0)die(m)};
function hitS(ax){for(const p of st.concat(vs)){const[x,y,w,h]=p;if(P.x+6>x&&P.x-6<x+w&&P.y>y&&P.y-13<y+h){if(ax)P.x=P.vx>0?x-6:x+w+6;else if(P.vy>0){P.y=y;P.vy=0;P.og=1;P.sp=p}else{P.y=y+h+13;P.vy=0}}}}
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
// ---------- DESENHO (PIXEL ART) ----------
g.imageSmoothingEnabled=false;
const mk=(w,h,f)=>{const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'),c);return c},
el=(x,cx,cy,rx,ry,c)=>{x.fillStyle=c;const q=(i,j)=>((i-cx)/rx)**2+((j-cy)/ry)**2<=1;for(let j=Math.floor(cy-ry);j<=cy+ry;j++){const t=1-((j-cy)/ry)**2;if(t<0)continue;const h=rx*Math.sqrt(t);let a=Math.ceil(cx-h)-1,b=Math.floor(cx+h)+1;while(a<=b&&!q(a,j))a++;while(b>=a&&!q(b,j))b--;if(a<=b)x.fillRect(a,j,b-a+1,1)}},
Q={k:'#1d2224',w:'#fffdf4',y:'#ffd45a',Y:'#c98b1e',g:'#6fbf4a',G:'#3c8a3a',l:'#a9e07a',b:'#4aa8e8',r:'#e2564b',R:'#a63a30',o:'#f08a3c',p:'#f28aa5',n:'#8a5a38',N:'#5a3a24',s:'#c3ccd5',S:'#7b8896',c:'#f6e8c6',C:'#d9c395',f:'#f2c7a0'},
spr=(rows,pal=Q)=>mk(rows[0].length,rows.length,x=>rows.forEach((r,j)=>[...r].forEach((ch,i)=>{if(pal[ch]){x.fillStyle=pal[ch];x.fillRect(i,j,1,1)}}))),
mir=r=>r.map(s=>s+[...s].reverse().join('')),
rnd=n=>{const s=Math.sin(n*127.1+311.7)*43758.5453;return s-Math.floor(s)},
MXM=new Map(),mixc0=(a,b,t)=>{const p=s=>[1,3,5].map(i=>parseInt(s.substr(i,2),16)),A=p(a),B=p(b);return'#'+A.map((v,i)=>('0'+Math.round(v+(B[i]-v)*t).toString(16)).slice(-2)).join('')},
mixc=(a,b,t)=>{const k=a+'|'+b+'|'+t;let v=MXM.get(k);if(v===undefined){if(MXM.size>3000)MXM.clear();v=mixc0(a,b,t);MXM.set(k,v)}return v},
outl=(c,col)=>{const x=c.getContext('2d'),w=c.width,h=c.height,a=x.getImageData(0,0,w,h).data,o=[];for(let j=0;j<h;j++)for(let i=0;i<w;i++)if(!a[(j*w+i)*4+3])for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const u=i+dx,v=j+dy;if(u>=0&&v>=0&&u<w&&v<h&&a[(v*w+u)*4+3]>0){o.push(i,j);break}}x.fillStyle=col;for(let k=0;k<o.length;k+=2)x.fillRect(o[k],o[k+1],1,1)};
// ---- fonte pixel 3x5 ----
const F={A:'010101111101101',B:'110101110101110',C:'011100100100011',D:'110101101101110',E:'111100110100111',F:'111100110100100',G:'011100101101011',H:'101101111101101',I:'111010010010111',J:'001001001101010',K:'101101110101101',L:'100100100100111',M:'101111111101101',N:'110101101101101',O:'010101101101010',P:'110101110100100',Q:'010101101111011',R:'110101110101101',S:'011100010001110',T:'111010010010010',U:'101101101101111',V:'101101101101010',W:'101101111111101',X:'101101010101101',Y:'101101010010010',Z:'111001010100111',0:'111101101101111',1:'010110010010111',2:'110001010100111',3:'110001010001110',4:'101101111001001',5:'111100110001110',6:'011100111101111',7:'111001010010010',8:'111101111101111',9:'111101111001110','?':'110001010000010','.':'000000000000010','—':'000000111000000','-':'000000111000000','!':'010010010000010'};
const nf=s=>s.toUpperCase().normalize('NFD'),tw=s=>nf(s).replace(/[\u0300-\u036f]/g,'').length*4-1;
function pt3r(G,s,x,y,c,k=1){G.fillStyle=c;let cx=x,last=x;for(const ch of nf(s)){if(ch>='\u0300'&&ch<='\u036f'){G.fillRect(last+k,y-2*k,k,k);continue}const gl=F[ch];last=cx;if(gl)for(let i=0;i<15;i++)if(gl[i]=='1')G.fillRect(cx+(i%3)*k,y+((i/3)|0)*k,k,k);cx+=4*k}}
const PT3C=new Map();function txtA(s,x,y){x=Math.round(x);y=Math.round(y);const w=tw(s)+15,l=x-(w>>1);g.fillStyle='#f6e7b4';g.fillRect(l-1,y-8,w+2,11);g.fillStyle='#1d3a2f';g.fillRect(l,y-7,w,9);g.fillStyle='#fff4d0';g.fillRect(l+2,y-6,7,7);g.fillStyle='#1d3a2f';g.fillRect(l+5,y-5,1,2);g.fillRect(l+3,y-3,5,1);g.fillRect(l+4,y-2,3,1);g.fillRect(l+5,y-1,1,1);pt3(s,l+12,y-5,'#fff4d0')}
function pt3(s,x,y,c,k=1){const key=s+'|'+c+'|'+k;let e=PT3C.get(key);if(!e){if(PT3C.size>500)PT3C.clear();e=mk(nf(s).length*4*k+2*k,8*k,x2=>pt3r(x2,s,0,2*k,c,k));PT3C.set(key,e)}g.drawImage(e,Math.round(x),Math.round(y)-2*k)}
function txt(s,x,y){x=Math.round(x);y=Math.round(y);const w=tw(s)+6,l=x-(w>>1);g.fillStyle='#f6e7b4';g.fillRect(l-1,y-8,w+2,11);g.fillStyle='#1d3a2f';g.fillRect(l,y-7,w,9);pt3(s,l+3,y-5,'#fff4d0')}
// ---- Leco em pixel art (camaleão da arte oficial, sem óculos) ----
const LC={};
function lecoCv(p,f,cm,ex,pw=0){const key=[p,f,cm,ex,pw].join('_');if(LC[key])return LC[key];
 const C=pw==1?{o:'#3a1766',b:'#a86cf0',s:'#8650d2',d:'#5a2fa6',l:'#e2c6ff',v:'#f1e2ff'}:pw==2?{o:'#0f2c6b',b:'#4fb0ff',s:'#2f86e6',d:'#1d5cb8',l:'#b4e2ff',v:'#dff2ff'}:cm?{o:'#5f8f6a',b:'#b9dcbc',s:'#93c39a',d:'#6fa179',l:'#e4f4e0',v:'#eef8e4'}:{o:'#1d4a2a',b:'#6db83f',s:'#4c9a3a',d:'#2f7535',l:'#a8de68',v:'#d6ee98'};
 const c=mk(28,23,x=>{const E=(a,b,rx,ry,col)=>el(x,a,b,rx,ry,col),R=(a,b,w,h,col)=>{x.fillStyle=col;x.fillRect(a,b,w,h)};
  const by=p==1?[0,-1,0,-1][f]:p==4?1:0,hy=p==0?f:p==4?1:p==3?1:p==2?-1:0,ts=p==1?f&1:p==0?f:0;
  const leg=(bx,ph,col)=>{const q=(f+ph)&3,sw=p==1?[-2,0,2,0][q]:p==2?(ph?2:-2):p==3?(ph?1:-1):0,lf=p==1?(q==3?1:0):p==2?2:p==3?1:0,fy=20-lf;for(let y=14;y<fy;y++)R(bx+Math.round(sw*(y-14)/Math.max(1,fy-14)),y,1,1,col);R(bx+sw,fy,3,2,C.d)};
  // cauda: sai do traseiro, desce e enrola em espiral
  R(3,10+by,3,3,C.s);R(2,12+by,2,5,C.b);R(3,12+by,1,5,C.s);E(5,18+ts,3.5,3.5,C.s);E(5,18+ts,2.5,2.5,C.b);R(5,17+ts,2,2,C.o);R(6,18+ts,1,1,C.s);R(4,17+ts,1,1,C.d);
  leg(10,2,C.d);leg(19,0,C.d);
  // corpo alongado com padrão quadriculado nas costas
  E(12,11+by,9,4.5,C.s);E(12,10+by,9,3.5,C.b);E(13,14+by,7,1.6,C.v);
  for(let j=-3;j<=0;j++)for(let i=3;i<=21;i++)if(((i-12)/9)**2+(j/3.6)**2<=1&&((i+j)&1)==0)R(i,10+by+j,1,1,C.l);
  for(let i=6;i<=16;i+=2)R(i,6+by,1,1,C.l);
  leg(7,2,C.s);leg(16,0,C.s);
  // cabeça com crista pontuda
  E(21,9+hy,5,4,C.s);E(21,8+hy,5,3.5,C.b);E(25,10+hy,2.5,2,C.s);E(25,9+hy,2.5,1.5,C.b);R(18,6+hy,3,1,C.l);
  for(let r=0;r<5;r++){R(19-r,2+r+hy,2*r+1,1,C.b);R(19+r,2+r+hy,1,1,C.s);R(19-r,2+r+hy,1,1,C.l)}
  R(21,12+hy,6,1,C.d);R(27,11+hy,1,1,C.d);
  // olho grande
  E(22,9+hy,3.4,3.4,C.o);
  if(ex==1){E(22,9+hy,2.6,2.6,C.b);R(19,9+hy,6,1,C.o)}
  else if(ex==2){E(22,9+hy,2.6,2.6,C.b);R(19,10+hy,1,1,C.o);R(20,9+hy,4,1,C.o);R(24,10+hy,1,1,C.o);R(25,12+hy,2,1,'#f29a9a')}
  else{E(22,9+hy,2.5,2.5,'#fffef2');if(ex==3)R(22,9+hy,1,1,'#10181c');else{R(23,8+hy,2,3,'#10181c');R(23,8+hy,1,1,'#fff')}}
 });outl(c,C.o);return LC[key]=c}
const lecoBig=()=>{const c=lecoCv(0,0,0,0);return mk(c.width*6,c.height*6,x=>{x.imageSmoothingEnabled=false;x.drawImage(c,0,0,c.width*6,c.height*6)}).toDataURL()};
// ---- sprites ----
const docR=mir(['.kkkkk','kwwwww','kwSSSS','kwwwww','kwSSSS','kwwwww','kwSSSw','kwwwww','kwSSSS','kwwwww','kwwwyy','kwwwyY','.kkkkk']);
const PR=['..kkkk..','.knnnnk.','.kffffk.','.kfkfkk.','.kffffk.','..kffk..','.kbbbbk.','kbbbbbbk','kbbbbbbk','kbbbbbbk','.kbbbbk.','.kkkkkk.','.kk..kk.','kkk..kkk'];
const SP={doc:spr(docR),docB:spr(docR,{...Q,w:'#d4eeff',S:Q.b}),
 pers:['#48A9E8','#F28AA5','#FF9B54'].map(b=>spr(PR,{...Q,b})),
 spike:spr(mir(['...r','..rr','..rR','.rrR','.rrR','rrrR','rrrR','kkkk'])),
 drop:spr(['..k..','.kgk.','.kgk.','kglgk','kggGk','kgGGk','.kGGk.'.slice(0,5),'..k..']),
 leaf:spr(['...kk..','..kllk.','.kllgGk','kllgGGk','kllgGk.','.kgGk..','..kk...','...k...']),
 drone:spr(mir(['...kkkk','..kkooo','.kooooo','kooooow','koooowk','kooooow','.kooooo','..kkkoo','....kkk'])),
 e0:spr(mir(['....gg','...gGg','..kkkk','.koooo','kooooo','kooowk','kooooo','koorrr','.koooo','..kkkk','..kk..','.kkk..'])),
 e1:spr(mir(['..kkkk','.kssss','kNnnnn','kNnnnn','kgglwk','kgggGg','kNnngn','kNnnnn','kNnnnn','kNnnnn','kNnnnn','kkkkkk']))};
const tuft=spr(['..l..l.','.gl.gl.','gGgGGlg','.GgGgG.','..GGG..']),fl=c=>spr(['..p..','.pyp.','..p..','..G..','gGG..','..GGg','..G..'],{...Q,p:c}),rock=spr(['..sss..','.ssSSs.','sssSSSS','SSSSSSS','.SSSSS.']),mush=spr(['.rrr.','rwrwr','rrrrr','..c..','..c..']),pot=spr(['..g.g..','.gGgGg.','..ooo..','.ooooo.','.onnno.','.onnno.','..nnn..']);
const dtuft=spr(['..l..l.','.gl.gl.','gGgGGlg','.GgGgG.','..GGG..'],{...Q,l:'#b08a4a',g:'#8a6a3a',G:'#5a4326'});
const DECO=[null,[tuft,fl('#fffdf4'),rock,tuft,fl('#f08a3c')],null,[tuft,fl('#fffdf4'),mush,rock,tuft],null,[rock,dtuft,rock,dtuft]];
const CL=mk(48,18,x=>{el(x,24,12,22,5,'#cfe7f3');el(x,14,10,9,6,'#f4fbff');el(x,26,7,11,7,'#fff');el(x,37,10,8,5,'#f4fbff')});
const tree=(w,h,c)=>mk(w,h,x=>{const th=Math.round(h*.4),tx=w>>1;x.fillStyle=c.t;x.fillRect(tx-2,h-th,5,th);x.fillStyle=c.td;x.fillRect(tx+1,h-th,2,th);x.fillStyle=c.tl;x.fillRect(tx-2,h-th,1,th);const B=[[.5,.32,.46,.3],[.26,.5,.28,.2],[.74,.5,.28,.2],[.5,.55,.38,.17]];B.forEach(([a,b,r,s])=>el(x,w*a+1,h*b*.9+1,w*r,h*s,c.d));B.forEach(([a,b,r,s])=>el(x,w*a,h*b*.9,w*r,h*s,c.m));B.forEach(([a,b,r,s])=>el(x,w*a-w*.08,h*b*.9-h*.05,w*r*.6,h*s*.55,c.l))});
const TR1=tree(34,64,{t:'#6b4a35',td:'#4a3223',tl:'#8a6446',d:'#2f7d5a',m:'#4aa86e',l:'#8bdc8a'}),TRM=tree(60,120,{t:'#6b4a35',td:'#43301f',tl:'#8f6a48',d:'#1f6b34',m:'#2f9a46',l:'#7bd35a'}),TRF=tree(48,90,{t:'#5f8a6a',td:'#4f7a5a',tl:'#6f9a7a',d:'#4f9a6a',m:'#6fb683',l:'#9bd69a'});
const FOLI=mk(34,14,x=>{el(x,8,11,11,4,'#1f6b34');el(x,22,10,12,5,'#2a7f3c');el(x,16,12,9,3,'#3f9a4a');el(x,10,9,5,2,'#7bd35a');el(x,24,8,5,2,'#8fe06a')});
const STALL=[['#e2564b','#fff4dc'],['#3f9f5a','#fff4dc'],['#f2b54a','#fff4dc']].map((cc,n)=>mk(56,62,x=>{for(let i=0;i<56;i+=7){x.fillStyle=cc[(i/7)&1];x.fillRect(i,0,7,12);x.fillRect(i,12,7,2)}x.fillStyle='#8a5a38';x.fillRect(2,14,3,48);x.fillRect(51,14,3,48);x.fillStyle='#c99a63';x.fillRect(0,40,56,22);x.fillStyle='#a07440';for(let j=46;j<62;j+=5)x.fillRect(0,j,56,1);x.fillStyle='#e0b57a';x.fillRect(0,40,56,2);for(let i=0;i<7;i++){x.fillStyle=['#e2564b','#f08a3c','#6fbf4a','#ffd45a'][(i+n)&3];x.fillRect(6+i*7,36+(i&1),4,4)}outl(x.canvas,'#3a2a22')}));
const MAT=[{c:['#e3c27b','#b58b4a'],b:['#c99a63','#a07440'],t:1},{c:['#6cc24f','#2f7d3a'],b:['#8c5e3b','#5e3a24'],t:0},{c:['#dfe5ea','#9aa7b3'],b:['#aab5c0','#7d8a98'],t:1},{c:['#58b84c','#2a6f36'],b:['#7a4e30','#4e301c'],t:0},{c:['#f0cf6a','#b8902f'],b:['#c3d0dc','#91a2b4'],t:1},{c:['#8a7b6a','#4e4338'],b:['#5e4a3a','#2f261e'],t:0}].map((m,k)=>{m.o='#1d1a17';m.B=mk(16,16,x=>{x.fillStyle=m.b[0];x.fillRect(0,0,16,16);if(m.t){const lt=mixc(m.b[0],'#ffffff',.22);for(let r=0;r<2;r++){const y=r*8;x.fillStyle=m.b[1];x.fillRect(0,y,16,1);x.fillRect(r?4:0,y,1,8);x.fillRect(r?12:8,y,1,8);x.fillStyle=lt;x.fillRect(0,y+1,16,1)}}else{for(let i=0;i<26;i++){x.fillStyle=m.b[1];x.fillRect(Math.floor(rnd(i+k)*15),Math.floor(rnd(i*3+k)*15),1+(i&1),1)}for(let i=0;i<4;i++){const a=Math.floor(rnd(i+40+k)*12),b=Math.floor(rnd(i+70+k)*12);x.fillStyle='#8f8a82';x.fillRect(a,b,3,2);x.fillStyle='#c4bfb6';x.fillRect(a,b,2,1)}}});m.C=mk(16,7,x=>{x.fillStyle=m.c[0];x.fillRect(0,0,16,4);x.fillStyle=mixc(m.c[0],'#ffffff',.3);x.fillRect(0,0,16,1);x.fillStyle=m.c[1];x.fillRect(0,4,16,1);for(let i=0;i<16;i++)if(rnd(i+k*9)<.6){x.fillRect(i,5,1,1+(rnd(i+9+k)<.4?1:0))}});return m});
const SKY={},sky=l=>SKY[l.k]||(SKY[l.k]=mk(384,216,x=>{const n=7;for(let i=0;i<n;i++){x.fillStyle=mixc(l.sk[0],l.sk[1],i/(n-1));x.fillRect(0,i*31,384,31);if(i<n-1){x.fillStyle=mixc(l.sk[0],l.sk[1],(i+1)/(n-1));for(let j=0;j<384;j+=2){x.fillRect(j,i*31+29,1,1);x.fillRect(j+1,i*31+30,1,1)}}}}));
const BC=['#FF9B54','#F28AA5','#FFD45A','#48A9E8'],mod=(n,m)=>((n%m)+m)%m,rep=(s,f,fn,cx)=>{const o=cx*f,b=Math.floor(o/s);for(let i=-1;i<=384/s+1;i++)fn(Math.round(i*s-(o-b*s)),b+i)};
const hills=(cx,fac,base,amp,col,top)=>{for(let x=0;x<384;x+=2){const u=x+cx*fac,h=Math.round(base-amp*(Math.sin(u/37)+.6*Math.sin(u/17+1)));g.fillStyle=col;g.fillRect(x,h,2,216-h);g.fillStyle=top;g.fillRect(x,h,2,1)}};

// ---------- CHEFE: SR. ECOFACHADA ----------
let boss=null,bp=[],php=5,arenaX=0,drops=[],dropT=0,pwR=0,pwS=0,lightT=0,vict=0,camDur=3,camMax=3,tipsSeen={},GLW=0,vp=[],zp=[],vs=[],lives=10,chances=3;
const SEQ=[['sH','sL','sH','sL'],['w','w','w'],['r','r','r','r','r'],['w','sH','r','sL','w'],['sH','w','sL','r','sH','w'],['r','r','r','r','r','r','r'],['sL','sH','w','r','w','sH']],DLY=[.62,.95,.42,.8,.55,.36,.5],CKP=[30,20,10];
function startBoss(){foes=[];shots=[];sealFx=null;close();S.mode='play';arenaX=L.w-384;boss={x:L.w-52,hp:30,max:30,st:'idle',t:1.6,open:0,atk:-1,sq:[],flash:0,on:1,dead:0};bp=[];php=5;drops=[];dropT=4;pwR=pwS=lightT=vict=0;camT=camCd=0;chances=3;Object.assign(P,{x:arenaX+30,y:180,vx:0,vy:0,og:1,sp:null});safe={x:arenaX+30,y:180};inv=1.5;toast('Sr. Ecofachada, o responsável pela propaganda, aparece! Desvie e ataque com Espaço sempre que a máscara abrir. C = invisibilidade; pegue os itens que caem do céu!',6500);sfx(110,.6,'sawtooth',60);setTimeout(bossLaugh,700)}
function bsfx(f,d,t,f2,vol=.05,vib=0){if(mute)return;try{AC=AC||new AudioContext();const o=AC.createOscillator(),v=AC.createGain(),n=AC.currentTime;o.type=t;o.frequency.setValueAtTime(f,n);if(f2)o.frequency.exponentialRampToValueAtTime(f2,n+d);if(vib){const l=AC.createOscillator(),lg=AC.createGain();l.frequency.value=vib;lg.gain.value=f*.06;l.connect(lg);lg.connect(o.frequency);l.start();l.stop(n+d)}v.gain.setValueAtTime(vol,n);v.gain.exponentialRampToValueAtTime(.001,n+d);o.connect(v);v.connect(AC.destination);o.start();o.stop(n+d)}catch(e){}}
function bossLaugh(){for(let i=0;i<5;i++)setTimeout(()=>{bsfx(230-i*16,.17,'sawtooth',150-i*10,.07,26);bsfx(115-i*7,.17,'square',80,.035)},i*200)}
function bossScream(){bsfx(300,.9,'sawtooth',1100,.08,38);bsfx(70,1.5,'sawtooth',38,.06,11);setTimeout(()=>bsfx(1100,.7,'sawtooth',170,.07,48),850);setTimeout(bossLaugh,1500)}
function shoot(k,ph){const b=boss,v=125+ph*18;if(k=='w')bsfx(110,.3,'sine',70,.03);else if(k=='r')bsfx(600,.4,'sine',300,.025);else bsfx(220,.3,'triangle',140,.03);if(k=='sH')bp.push({k:'s',x:b.x-26,y:158,vx:-v,vy:0});else if(k=='sL')bp.push({k:'s',x:b.x-26,y:172,vx:-v,vy:0});else if(k=='w'){bp.push({k:'w',x:b.x-30,y:180,vx:-(100+ph*15),vy:0});if(ph>2)bp.push({k:'w',x:b.x-30,y:180,vx:-135,vy:0})}else bp.push({k:'r',x:Math.max(arenaX+14,Math.min(L.w-14,P.x+(Math.random()-.5)*50)),y:-12,vx:0,vy:0,wn:.9-ph*.1});if(ph>=3&&Math.random()<.5)bp.push({k:'r',x:arenaX+20+Math.random()*(L.w-arenaX-110),y:-12,vx:0,vy:0,wn:.9})}
function bHurt(a=1){if(inv>0||camT>0)return;php=+(php-a).toFixed(3);if(boss&&boss.on&&(boss.lt||-9)<T-6){boss.lt=T;setTimeout(bossLaugh,250)}inv=1.4;sh=.25;P.vx=-P.dir*140;P.vy=-120;P.og=0;burst(P.x,P.y-8,'#43B95C',10);sfx(150,.3,'sawtooth');if(phaseStats)phaseStats.damage++;if(php<=.01){php=0;bossLost()}}
function retryBoss(){close();S.mode='play';boss.hp=CKP.filter(v=>v>=boss.hp).pop()||30;boss.st='idle';boss.t=1.5;boss.open=0;bp=[];php=5;drops=[];dropT=4;pwR=pwS=lightT=0;camT=camCd=0;Object.assign(P,{x:arenaX+30,y:180,vx:0,vy:0,og:1,sp:null});inv=1.5}
function bossDie(){setTimeout(()=>jingle(BIG),900);const b=boss;b.dead=1;b.endT=2.2;bp=[];sh=.5;S.sc+=300;vict=6.5;inv=8;pwR=pwS=0;drops=[];camT=0;sfx(80,1,'sawtooth',30);toast('O vilão caiu! A verdade veio à tona. +300 pontos',3000)}
function bossStep(dt){const b=boss;if(!b||!b.on)return;b.flash=Math.max(0,b.flash-dt);
 if(b.dead){b.endT-=dt;if(Math.random()<.6)burst(b.x-20+Math.random()*40,180-Math.random()*60,Math.random()<.5?'#ffb347':'#ffffff',4);if(b.endT<=0){boss=null;bp=[]}return}
 const ph=b.hp>20?0:b.hp>10?1:b.hp>4?2:3;b.t-=dt;if(b.pc==null)b.pc=ph;if(ph!=b.pc){if(ph>b.pc){sh=.5;bossScream();burst(b.x,150,ph>2?'#ff3b2f':'#ff7a1a',30);burst(b.x,150,'#ffd45a',16);toast(['','O SR. ECOFACHADA SE ENFURECE! Ele ficou mais rápido e perigoso!','FÚRIA TOTAL! O chefão perdeu o controle e o ar queima!','ÚLTIMO SURTO! O vilão está no limite: acabe com ele!'][ph],2400)}b.pc=ph}b.hb=(b.hb||0)-dt;if(ph>=1&&b.hb<=0){b.hb=1.1-ph*.22;sfx(52,.22,'sine',34);if(ph>=2)setTimeout(()=>sfx(48,.2,'sine',32),170)}if(ph>=1&&Math.random()<dt*ph*7)pt.push({x:b.x-22+Math.random()*44,y:130-Math.random()*50,vx:(Math.random()-.5)*24,vy:-18-Math.random()*30,l:.8,c:ph>2?'#ff3b2f':ph>1?'#ff7a1a':'#ffd45a'});
 if(b.st=='idle'&&b.t<=0){b.atk=(b.atk+1)%SEQ.length;b.sq=SEQ[b.atk].slice();if(ph>1)b.sq.push(b.sq[0]);if(ph>2)b.sq.push('w');b.st='tele';b.t=.9-ph*.12;bsfx(120,.5,'sine',90,.03);if(Math.random()<.18)bossLaugh()}
 else if(b.st=='tele'&&b.t<=0){b.st='fire';b.t=0}
 else if(b.st=='fire'&&b.t<=0){const k=b.sq.shift();if(k)shoot(k,ph);b.t=Math.max(.4,DLY[b.atk]-ph*.06);if(!b.sq.length){b.st='vuln';b.t=2.8-ph*.3;toast('MÁSCARA ABERTA! Aproxime-se e use Espaço!',1400)}}
 else if(b.st=='vuln'&&b.t<=0){b.st='idle';b.t=.6-ph*.1}
 bp.forEach(q=>{if(q.k=='r'){if(q.wn>0){q.wn-=dt;if(q.wn<=0)q.vy=210}else{q.vy+=200*dt;q.y+=q.vy*dt}}else{q.x+=q.vx*dt;q.y+=q.vy*dt}
  const hit=q.k=='s'?Math.abs(P.x-q.x)<10&&Math.abs(P.y-7-q.y)<11:q.k=='w'?Math.abs(P.x-q.x)<8&&P.y>168:q.wn<=0&&Math.abs(P.x-q.x)<10&&q.y+6>P.y-13&&q.y-6<P.y;if(hit&&camT<=0){q.dead=1;if(q.k=='r'){burst(q.x,q.y,'#ff7a1a',16);burst(q.x,q.y,'#ffd45a',8);bsfx(90,.25,'sine',50,.04);bHurt(5/3)}else bHurt()}if(q.k=='r'&&q.wn<=0&&q.y>=176&&!q.dead){q.dead=1;burst(q.x,178,'#ff7a1a',10);burst(q.x,178,'#ffd45a',5);bsfx(120,.12,'sine',70,.025)}if(q.x<arenaX-12||q.y>196)q.dead=1});
 bp=bp.filter(q=>!q.dead);if(Math.abs(P.x-b.x)<26&&P.y>122)bHurt()}
const BPAL=[['#8b99a6','#566472','#b8c5d0','#5fb447','#8fdc63'],['#a39080','#665248','#c9b6a2','#b9b43c','#e2dc6a'],['#b36a55','#7a3a30','#e0967c','#e0832e','#ffb35a'],['#7a2f42','#3e1424','#b04a5e','#c8282e','#ff5a4a']];
function drawBoss(){const b=boss,x=Math.round(b.x-cam),y=180,fl=b.flash>0&&((T*24)|0)%2,O='#1d1a17',ph=b.hp>20?0:b.hp>10?1:b.hp>4?2:3,PL=BPAL[ph],B=fl?'#ffffff':PL[0],D=fl?'#e8e8e8':PL[1],Lt=fl?'#ffffff':PL[2],M=PL[3],M2=PL[4],op=b.st=='vuln',te=b.st=='tele'||b.st=='fire',ar=te?-8:0;g.save();if(b.dead)g.translate(((T*30)|0)%3-1,0);else if(ph>=2)g.translate(Math.round(Math.sin(T*53)*(ph-1)*.7),0);if(ph>=1){g.globalAlpha=.1+.05*ph+.05*Math.sin(T*(4+ph*3));el(g,x,y-30,44+ph*6,42+ph*5,ph>2?'#ff2a1a':ph>1?'#ff7a1a':'#ffd45a');g.globalAlpha=1}
 [[-20,76],[8,70]].forEach(([dx,h],i)=>{g.fillStyle=O;g.fillRect(x+dx-1,y-h,10,22);g.fillStyle='#6a5a52';g.fillRect(x+dx,y-h+1,8,20);g.fillStyle='#e2564b';g.fillRect(x+dx,y-h+1,8,3);for(let j=0;j<3;j++){g.globalAlpha=.6-j*.17;el(g,x+dx+4+Math.round(Math.sin(T*2+j+i)*2),y-h-5-j*7-(((T*8+i*3)%6)|0),3+j,3+j,'#3a3236')}g.globalAlpha=1});
 g.fillStyle=O;g.fillRect(x-24,y-12,16,12);g.fillRect(x+8,y-12,16,12);g.fillStyle=D;g.fillRect(x-23,y-11,14,10);g.fillRect(x+9,y-11,14,10);
 g.fillStyle=O;g.fillRect(x-26,y-56,52,46);g.fillStyle=B;g.fillRect(x-25,y-55,50,44);g.fillStyle=D;g.fillRect(x+8,y-55,17,44);g.fillStyle=Lt;g.fillRect(x-25,y-55,50,2);for(let i=0;i<3;i++){g.fillStyle=D;g.fillRect(x-22,y-30+i*7,2,2);g.fillStyle=Lt;g.fillRect(x+19,y-30+i*7,2,2)}
 if(ph>=1){g.globalAlpha=.55+.45*Math.sin(T*(5+ph*2));g.fillStyle=ph>2?'#ff3b2f':'#ffb02e';[[x-22,y-24,1,5],[x-21,y-20,2,1],[x-20,y-19,1,5],[x+14,y-20,1,6],[x+15,y-15,2,1],[x+16,y-14,1,5]].forEach(a=>g.fillRect(...a));if(ph>=2)[[x-8,y-18,1,5],[x-7,y-14,2,1],[x+2,y-17,1,4],[x+3,y-14,2,1]].forEach(a=>g.fillRect(...a));g.globalAlpha=1}
 [[-40,-1],[26,1]].forEach(([ax,sd])=>{g.fillStyle=O;g.fillRect(x+ax,y-48+ar,14,26);el(g,x+ax+7,y-20+ar,7,7,O);g.fillStyle=B;g.fillRect(x+ax+1,y-47+ar,12,24);el(g,x+ax+7,y-20+ar,6,6,B);g.fillStyle=D;g.fillRect(x+ax+(sd>0?8:1),y-47+ar,5,24)});
 g.fillStyle=O;g.fillRect(x-18,y-52,36,28);
 if(!op){g.fillStyle=M;g.fillRect(x-17,y-51,34,26);g.fillStyle=M2;g.fillRect(x-17,y-51,34,2);g.drawImage(SP.leaf,x-7,y-68,14,16);
  [[-12],[4]].forEach(([ex])=>{g.fillStyle='#fffdf4';g.fillRect(x+ex,y-44,8,8);g.fillStyle=te||ph>=2?'#ff3b2f':'#101820';g.fillRect(x+ex+(te||ph>=2?1:3),y-42,te||ph>=2?6:3,te||ph>=2?5:4)});
  g.fillStyle=O;g.fillRect(x-10,y-32,20,2);g.fillRect(x-12,y-34,2,2);g.fillRect(x+10,y-34,2,2);if(te){g.fillStyle='#fff';g.fillRect(x-8,y-30,16,2)}if(ph>=1){g.fillStyle=O;for(let k=0;k<8;k++){g.fillRect(x-14+k,y-48+(k>>1),1,2);g.fillRect(x+13-k,y-48+(k>>1),1,2)}g.fillStyle='#fff';for(let k=0;k<5;k++)g.fillRect(x-9+k*4,y-30,2,2+(k%2));if(ph>=3){g.fillStyle='#d01818';g.fillRect(x-5,y-28+(((T*6)|0)%2),1,3);g.fillRect(x+4,y-28,1,2+(((T*5)|0)%3))}}}
 else{g.fillStyle='#2a1010';g.fillRect(x-17,y-51,34,26);g.fillStyle=M;g.fillRect(x-17,y-51,8,26);g.fillRect(x+9,y-51,8,26);el(g,x,y-38,7+(((T*6)|0)%2),7,'#ff6a3a');el(g,x,y-38,4,4,'#ffd45a');g.fillStyle='#fff';g.fillRect(x-1,y-40,2,2)}
 g.restore();
 bp.forEach(q=>{const px=Math.round(q.x-cam),py=Math.round(q.y);
  if(q.k=='s'){const wy=py+Math.round(Math.sin(T*9+q.x*.05)*2);
   for(let j=3;j>=1;j--){g.globalAlpha=.5-j*.12;el(g,px+j*6,wy+Math.round(Math.sin(T*8+j)*3),6-j,6-j,j&1?'#2a1a3a':'#3a2a4a')}g.globalAlpha=1;
   el(g,px,wy,8,8,'#0e0a14');el(g,px,wy,7,7,'#3a2a4a');el(g,px-1,wy-2,5,4,'#52406a');
   g.fillStyle='#9dff5a';g.fillRect(px-4,wy-3,3,3);g.fillRect(px+1,wy-3,3,3);g.fillStyle='#0e0a14';g.fillRect(px-3,wy-2,1,2);g.fillRect(px+2,wy-2,1,2);g.fillRect(px-4,wy+2,9,3);
   g.fillStyle='#e9e2c8';for(let k=0;k<5;k++)g.fillRect(px-4+k*2,wy+2,1,1+(k&1));
   if(((T*10)|0)%3==0){g.fillStyle='#d84f4f';g.fillRect(px-1,wy-8,3,1)}}
  else if(q.k=='w'){const bw=((T*8)|0)%2;
   el(g,px,173,9+bw,7,'#1d1a17');el(g,px,173,8+bw,6,'#2a2230');
   g.fillStyle='#7b5cff';g.fillRect(px-5,171,3,1);g.fillRect(px+1,169,3,1);g.fillStyle='#3fd0a0';g.fillRect(px-2,172,3,1);g.fillRect(px+3,175,2,1);
   g.fillStyle='#fff';g.fillRect(px-6,169,1,1);g.fillRect(px+4,167,1,1);
   g.fillStyle='#ff3b2f';g.fillRect(px-4,172,2,2);g.fillRect(px+1,172,2,2);
   g.fillStyle='#2a2230';g.fillRect(px+8,176,3,2);g.fillRect(px+12,178,2,1);g.fillRect(px-2,177+(((T*6)|0)%2),1,2)}
  else if(q.wn>0){g.globalAlpha=.38+.14*Math.sin(T*9);g.fillStyle='#ff7a1a';g.fillRect(px-6,178,12,2);g.fillRect(px-4,176,8,2);g.fillRect(px-2,174,4,2);g.globalAlpha=.14+.05*Math.sin(T*9);g.fillStyle='#ffb02e';g.fillRect(px,0,1,172);g.globalAlpha=1}
  else{const fy=py,t2=T*18;
   for(let j=8;j>=1;j--){g.globalAlpha=.6-j*.06;el(g,px+Math.round(Math.sin(t2+j*1.7)*2),fy-3-j*4,4-(j>>2),3.5,j<3?'#ffa01f':j<5?'#f2601a':'#c8321a')}g.globalAlpha=1;
   el(g,px,fy,6,6,'#d8321f');el(g,px,fy,5,5,'#f2701a');el(g,px,fy+1,3.5,3.5,'#ffb02e');el(g,px,fy+1,2,2,'#fff1a8');
   const w2=((T*16)|0)%3;g.fillStyle='#f2701a';g.fillRect(px-4,fy-7-(w2==0),2,3);g.fillRect(px+2,fy-8+(w2==1),2,4);g.fillRect(px-1,fy-9,2,4);g.fillStyle='#ffb02e';g.fillRect(px-1,fy-8,2,2);
   g.fillStyle='#ffd45a';g.fillRect(px+Math.round(Math.sin(t2*1.3)*8),fy-6-(((T*30)|0)%12),1,1)}})}
const HRT=spr(['.rr.rr.','rwrrrrr','rrrrrrr','.rrrrr.','..rrr..','...r...']),HRE=spr(['.rr.rr.','rwrrrrr','rrrrrrr','.rrrrr.','..rrr..','...r...'],{...Q,r:'#4a3a3a',w:'#4a3a3a'});
function bossHud(){const b=boss,w=140,x0=122;for(let i=0;i<5;i++){g.drawImage(HRE,6+i*9,26);const f=Math.max(0,Math.min(1,php-i));if(f>.01){const w=Math.max(1,Math.round(7*f));g.drawImage(HRT,0,0,w,6,6+i*9,26,w,6)}}abilityHud();g.fillStyle='#1d1a17';g.fillRect(x0-2,25,w+4,9);g.fillStyle='#5a1f1f';g.fillRect(x0,27,w,5);const fw=Math.round(w*Math.max(0,b.hp)/b.max);g.fillStyle=b.hp>10?'#e2564b':'#ffb02e';g.fillRect(x0,27,fw,5);g.fillStyle='rgba(255,255,255,.35)';g.fillRect(x0,27,fw,1);g.fillStyle='#1d1a17';g.fillRect(x0+46,27,1,5);g.fillRect(x0+93,27,1,5);const nm=b.hp>10?'SR. ECOFACHADA':b.hp>4?'ECOFACHADA ENFURECIDO':'ECOFACHADA FURIOSO';pt3(nm,192-(tw(nm)>>1),19,b.hp>10?'#fff4d0':b.hp>4?'#ffb35a':'#ff5a4a');pt3('CHANCES '+chances,318,19,'#fff4d0');if(b.hp<=4&&!b.dead){g.globalAlpha=.07+.05*Math.sin(T*9);g.fillStyle='#ff1a1a';g.fillRect(0,0,g.canvas.width,g.canvas.height);g.globalAlpha=1}}
let joy=0;
function water(){g.fillStyle='#4fb6e6';g.fillRect(0,176,384,40);g.fillStyle='#3aa0d8';g.fillRect(0,192,384,24);g.fillStyle='#2b86bd';g.fillRect(0,206,384,10);g.fillStyle='#9be3fa';for(let y=178;y<216;y+=5)for(let x=(y%10)*3;x<384;x+=22){g.fillRect(x+Math.round(Math.sin(T*2+x*.1+y)*2),y,4+(y%3),1)}g.fillStyle='#d6f6ff';g.fillRect(0,176,384,1)}
function badge(x,y,n){const c=['#ffd45a','#6fbf4a','#c3ccd5'][n%3];el(g,x,y,9,9,'#3a2a22');el(g,x,y,8,8,c);el(g,x,y,5,5,'#fff8e6');if(n%3==0){g.fillStyle='#3c8a3a';g.fillRect(x-3,y,2,2);g.fillRect(x-1,y+1,2,2);g.fillRect(x+1,y-1,2,2);g.fillRect(x+3,y-3,1,3)}else if(n%3==1)pt3('?',x-2,y-3,'#2f7535');else{g.fillStyle='#7b8896';g.fillRect(x-3,y,7,1)}}
function bg(l,cx){const k=l.k;g.drawImage(sky(l),0,0);
 if(k<4)for(let i=0;i<3;i++)g.drawImage(CL,Math.round(mod(i*150-cx*.08+T*3,470)-60),10+(i*17)%36);
 if(k==0){rep(80,.2,(x,n)=>{const h=64+mod(n*37,40),y=180-h;g.fillStyle=mixc(l.sk[1],'#c9a67a',.4);g.fillRect(x,y,70,h);g.fillStyle=mixc(l.sk[1],'#a88a5e',.5);g.fillRect(x,y,70,3);for(let j=0;j<h-20;j+=18)for(let i=0;i<3;i++){g.fillStyle=mixc(l.sk[1],'#7db8d8',.55);g.fillRect(x+8+i*20,y+12+j,10,10)}},cx);
  g.fillStyle='#5a3a24';g.fillRect(0,10,384,1);rep(16,.5,(x,n)=>{g.fillStyle=BC[mod(n,4)];for(let r=0;r<4;r++)g.fillRect(x+r,11+r,7-2*r,1)},cx);
  rep(64,.5,(x,n)=>g.drawImage(STALL[mod(n,3)],x,118),cx)}
 if(k==1){hills(cx,.1,128,12,mixc(l.hl,l.sk[1],.5),mixc(l.hl,l.sk[1],.7));
  rep(240,.3,(x,n)=>{g.fillStyle='#9fb4bd';g.fillRect(x,112,92,68);g.fillStyle='#7f98a4';g.fillRect(x,112,92,3);g.fillRect(x+70,115,22,65);for(let i=0;i<4;i++){g.fillStyle='#e8f4f8';g.fillRect(x+6+i*16,126,10,8)}[[x+10,76,10,38],[x+34,88,8,26]].forEach(([a,b,w,h],q)=>{g.fillStyle='#8a99a4';g.fillRect(a,b,w,h);g.fillStyle='#e2564b';g.fillRect(a,b,w,3);g.fillRect(a,b+8,w,3);for(let j=0;j<3;j++){g.globalAlpha=.55-j*.14;el(g,a+w/2+Math.round(Math.sin(T+j+q)*2),b-4-j*7-Math.floor((T*5+n*3)%7),3+j,3+j,'#f2f6f8')}g.globalAlpha=1})},cx);
  hills(cx,.25,150,10,l.hl,mixc(l.hl,'#ffffff',.3));rep(44,.55,(x,n)=>g.drawImage(TR1,x,122+mod(n*5,8)),cx);g.save();g.beginPath();g.rect(0,180,384,36);g.clip();water();g.restore();g.fillStyle='#d6f6ff';g.fillRect(0,180,384,1)}
 if(k==2){rep(70,.25,(x,n)=>{const h=70+mod(n*37,50);g.fillStyle=mixc(l.sk[1],'#b9c9d6',.5);g.fillRect(x,180-h,58,h);for(let j=0;j<h-14;j+=14)for(let i=0;i<3;i++){g.fillStyle=mixc(l.sk[1],'#8fa8bb',.6);g.fillRect(x+7+i*16,188-h+j,7,7)}},cx);
  rep(96,.5,(x,n)=>{g.fillStyle='#3a2a22';g.fillRect(x-1,59,86,122);g.fillStyle='#f3e6c8';g.fillRect(x,60,84,120);g.fillStyle='#d9c7a0';g.fillRect(x,60,84,3);g.fillRect(x,126,84,2);for(let i=0;i<2;i++){g.fillStyle='#7aa6c4';g.fillRect(x+10+i*44,134,20,30);g.fillStyle='#b9dcf0';g.fillRect(x+12+i*44,136,6,12)}g.fillStyle='#8a5a38';for(let i=0;i<84;i+=6)g.fillRect(x+i,122,2,5);badge(x+42,92,mod(n,3))},cx)}
 if(k==3){rep(50,.2,(x,n)=>g.drawImage(TRF,x,94+mod(n*7,3)*3),cx);rep(76,.45,(x,n)=>g.drawImage(TRM,x,64+mod(n*13,3)*3),cx);
  for(let i=0;i<4;i++){const x0=mod(i*110-cx*.25,470)-40;g.fillStyle='rgba(255,246,170,.10)';for(let y=0;y<180;y+=3)g.fillRect(x0+Math.round(y*.35),y,10+i*2,3)}
  for(let i=0;i<9;i++){const a=T*.4+i*.7;g.fillStyle=Math.sin(T*3+i)>.3?'#fff3a0':'rgba(255,243,160,.35)';g.fillRect(Math.round(mod(i*53-cx*.35+Math.sin(a)*10,400)-8),Math.round(110+(i*9)%50+Math.cos(a*1.3)*6),1,1)}}

 if(k==5){g.fillStyle='rgba(255,106,58,.2)';g.fillRect(0,90,384,90);g.fillStyle='rgba(255,170,80,.3)';for(let i=0;i<384;i+=2)g.fillRect(i,118+((i>>1)&1),1,1);
  rep(90,.2,(x,n)=>{const h=50+mod(n*41,60),y=180-h,c=mixc(l.sk[1],'#2b1d25',.7);g.fillStyle=c;g.fillRect(x,y,66,h);for(let i=0;i<66;i+=6){const d=Math.floor(rnd(n*9+i)*10);g.fillRect(x+i,y-d,6,d)}g.fillStyle=mixc(c,'#ffb347',.35);for(let j=0;j<h-12;j+=14)for(let i=0;i<3;i++)if(rnd(n+i*7+j)<.5)g.fillRect(x+8+i*18,y+8+j,6,6)},cx);
  rep(170,.4,(x,n)=>{g.fillStyle='#2f2528';g.fillRect(x+30,100,14,80);g.fillStyle='#4a3a3a';g.fillRect(x+30,100,4,80);g.fillStyle='#8a2f28';g.fillRect(x+30,104,14,4);for(let j=0;j<5;j++){g.globalAlpha=.55-j*.09;el(g,x+37+Math.round(Math.sin(T*1.5+j+n)*3),96-j*9-(((T*7+n*4)%9)|0),6+j,5+j,'#1d1618')}g.globalAlpha=1},cx);
  rep(200,.5,(x,n)=>{const o=(n&1)*4;g.fillStyle='#2f2528';g.fillRect(x+20,124,4,56);g.fillRect(x+90,130,4,50);g.fillStyle='#1d1a17';g.fillRect(x+6,70+o,100,36);g.fillStyle='#e8d9a8';g.fillRect(x+8,72+o,96,32);pt3('100% VERDE',x+13,80+o,'#3c8a3a',2);g.fillStyle='#c8402f';for(let q=0;q<30;q++){g.fillRect(x+10+q*3,74+o+q,3,2);g.fillRect(x+100-q*3,74+o+q,3,2)}g.fillStyle='#1d1a17';g.fillRect(x+40,72+o,2,10);g.fillRect(x+42,80+o,2,8);g.fillRect(x+70,90+o,2,14)},cx);
  rep(130,.7,(x,n)=>{for(let i=0;i<3;i++){const h=6+Math.round(Math.abs(Math.sin(T*9+i+n))*6);g.fillStyle='#e2564b';g.fillRect(x+i*5,180-h,4,h);g.fillStyle='#ff9b54';g.fillRect(x+i*5+1,180-h+3,2,h-3);g.fillStyle='#ffd45a';g.fillRect(x+i*5+1,180-Math.max(2,h-6),2,Math.max(2,h-6))}},cx);
  for(let i=0;i<26;i++){g.fillStyle=i&1?'#ffb347':'#d8d0c8';g.fillRect(Math.round(mod(i*37-cx*.6+Math.sin(T+i)*6,400)-8),Math.round(mod(T*(18+(i%5)*6)+i*23,216)),1,1)}}
 if(k==4){g.fillStyle=mixc(l.sk[1],'#d8cdb5',.5);g.fillRect(0,0,384,180);g.fillStyle='#cdbf9f';for(let x=0;x<384;x+=32)g.fillRect(x,0,1,180);g.fillStyle='#b5c7d5';g.fillRect(0,0,384,14);g.fillStyle='#e6c25a';g.fillRect(0,14,384,2);
  rep(100,.5,(x,n)=>{g.fillStyle='#3a2a22';g.fillRect(x-1,39,58,142);g.fillStyle='#e9eef2';g.fillRect(x,40,56,140);g.fillStyle='#b7c9d6';g.fillRect(x+44,40,12,140);g.fillStyle='#fff';g.fillRect(x+2,40,3,140);g.fillStyle='#e6c25a';g.fillRect(x,56,56,4);g.fillRect(x,150,56,4);g.fillStyle='#7aa6c4';g.fillRect(x+14,68,28,50);g.fillStyle='#b9dcf0';g.fillRect(x+16,70,10,24);g.fillStyle='#e6c25a';g.fillRect(x+14,66,28,2)},cx)}
}
function plat(l,x,y,w,h,wx){x=Math.round(x);y=Math.round(y);if(x>384||x+w<0)return;const M=MAT[l.k];
 for(let j=0;j<h;j+=16){const hh=Math.min(16,h-j);for(let i=0;i<w;i+=16){const ww=Math.min(16,w-i);g.drawImage(M.B,0,0,ww,hh,x+i,y+j,ww,hh)}}
 for(let i=0;i<w;i+=16){const ww=Math.min(16,w-i);g.drawImage(M.C,0,0,ww,Math.min(7,h),x+i,y,ww,Math.min(7,h))}
 g.fillStyle=M.o;g.fillRect(x-1,y-1,w+2,1);g.fillRect(x-1,y,1,h);g.fillRect(x+w,y,1,h);if(y+h<216)g.fillRect(x,y+h,w,1);
 const ds=DECO[l.k];if(ds&&w>=20&&wx!=null)for(let i=6;i<w-8;i+=11){const hv=rnd(Math.floor(wx)+i);if(hv<.55){const s=ds[Math.floor(hv*100)%ds.length];g.drawImage(s,x+i+Math.floor(rnd(wx+i+3)*4),y-s.height)}}}
function leco(x,y,d,p,f,cm,ex,pw=0){g.save();if(cm)g.globalAlpha=.6;g.translate(Math.round(x),Math.round(y));if(d<0)g.scale(-1,1);g.drawImage(lecoCv(p,f,cm?1:0,ex,pw),-13,-22);
 if(pw||GLW>0){const w=lecoW(p,f,cm?1:0,ex,pw),ba=cm?.6:1;
  if(pw){g.globalAlpha=ba*(.08+.2*(.5+.5*Math.sin(T*7)));g.drawImage(w,-13,-22);const bx=((T*34)%64)-22;g.save();g.beginPath();g.moveTo(-13+bx,-22);g.lineTo(-13+bx+6,-22);g.lineTo(-13+bx-5,2);g.lineTo(-13+bx-11,2);g.closePath();g.clip();g.globalAlpha=ba*.8;g.drawImage(w,-13,-22);g.restore()}
  if(GLW>0){g.globalAlpha=GLW;g.drawImage(w,-13,-22)}}
 g.restore()}
const ring=(cx,cy,r,c)=>{g.fillStyle=c;const n=Math.max(12,r*4|0);for(let i=0;i<n;i++)g.fillRect(Math.round(cx+Math.cos(i/n*6.283)*r),Math.round(cy+Math.sin(i/n*6.283)*r),1,1)};
function draw(){g.setTransform(1,0,0,1,0,0);g.imageSmoothingEnabled=false;g.globalAlpha=1;const m=S.mode,pl=m!='menu'&&m!='end',l=pl?L:LV[3],cx=Math.round(pl?cam:T*18);
 if(sh>0)g.translate(Math.round((Math.random()-.5)*6*sh*3),Math.round((Math.random()-.5)*6*sh*3));
 bg(l,cx);if(l.k==3)papers(cx);abyss(l,cx);(pl?st:[[cx-10,180,410,36]]).forEach(([x,y,w,h])=>plat(l,x-cx,y,w,h,pl?x:0));
 if(pl){mv.forEach(o=>{const x=Math.round(o.x-cam),y=Math.round(o.y);g.fillStyle='rgba(255,255,255,.55)';if(o.ax=='h')for(let i=Math.round(o.ox-cam);i<o.ox+o.r+o.w-cam;i+=4)g.fillRect(i,Math.round(o.oy+3),2,1);else for(let j=Math.round(o.oy-o.r);j<o.oy+3;j+=4)g.fillRect(Math.round(o.ox+o.w/2-cam),j,1,2);g.fillStyle='#3a2a22';g.fillRect(x-1,y-1,o.w+2,9);g.fillStyle='#f6e7c1';g.fillRect(x,y,o.w,7);g.fillStyle='#fff9e6';g.fillRect(x,y,o.w,1);g.fillStyle='#e9963a';g.fillRect(x+2,y+4,o.w-4,2);g.fillStyle='#b8651f';for(let i=3;i<o.w-3;i+=6)g.fillRect(x+i,y+4,2,2)});
  if(fOn())focusDim();
  sk.forEach(([x,y,w])=>{x=Math.round(x-cam);for(let i=0;i<w;i+=8){g.drawImage(SP.spike,x+i,y-8);if(fOn())focusGlow(SP.spike,x+i,y-8,'#ff2a2a','#ff5a4a',4)}});
  dr.forEach(d=>{const x=Math.round(d.x-cam);if(d.y<0){g.fillStyle='#4b9a3a';g.fillRect(x-1,0,3,2+((T*4)|0)%2)}else{g.drawImage(SP.drop,x-2,Math.round(d.y)-6);if(fOn())focusGlow(SP.drop,x-2,Math.round(d.y)-6,'#ff2a2a','#ff5a4a',3)}});
  lf.forEach(f=>{const x=Math.round(f.x-cam),y=Math.round(f.y+Math.sin(T*3+f.x)*1.5);g.drawImage(SP.leaf,x-3,y-4);if(fOn())focusGlow(SP.leaf,x-3,y-4,'#ffd45a','#ffe27a',4);if((T*2+f.x)%3<.12){g.fillStyle='#fff';g.fillRect(x+4,y-5,1,1)}});
  L.C.forEach((c,i)=>{const x=Math.round(c[0]-cam),y=c[1],gt=S.got[S.li+'-'+i],bo=Math.round(Math.sin(T*4+i)*1.5);
   if(c[2]==3){g.fillStyle='rgba(0,0,0,.18)';g.fillRect(x-5,y,10,1);g.drawImage(SP.pers[i%3],x-4,y-14);if(near&&near.i==i)txtA('INVESTIGAR',x,y-22)}
   else if(!gt){if(c[2]==1)return;if(false){if(Math.floor(T*2+i)%2){g.fillStyle='rgba(255,255,255,.85)';g.fillRect(x,y-8,1,1);g.fillRect(x-1,y-7,3,1);g.fillRect(x,y-6,1,1)}return}
    g.drawImage(c[2]==2?SP.docB:SP.doc,x-6,y-15+bo);if(fOn())focusGlow(c[2]==2?SP.docB:SP.doc,x-6,y-15+bo,'#ffd45a','#ffe27a',6);const sp=Math.floor(T*3+i)%3;g.fillStyle='#fff6c0';[[x-9,y-14],[x+8,y-6],[x+6,y-18]][sp].forEach?0:0;const[a,b2]=[[x-9,y-14],[x+8,y-6],[x+6,y-18]][sp];g.fillRect(a,b2,1,1);g.fillRect(a-1,b2,3,1);g.fillRect(a,b2-1,1,3);
    if(near&&near.i==i)txtA('INVESTIGAR',x,y-24);else if(c[2]==2&&Math.abs(c[0]-P.x)<=95&&Math.abs(c[1]-P.y)<=85)txt('ESPACO — LINGUA',x,y-24)}});
  if(S.li==1){const rx=Math.round(460-cam);rosaW(rx,180,P.x>460,((T*2)|0)%2);if(S.lv['l1-riv'])txt('PISTAS ENCONTRADAS',rx,180-44);else if(near&&near.rosa)txtA('FALAR COM DONA ROSA',rx,180-44);else pt3('!',rx-1,180-48+Math.round(Math.sin(T*4)*2),'#ffd45a',2)}
  const qx=Math.round((L.qx||L.w*.5)-cam),qy=L.qy||180,qb=Math.round(Math.sin(T*3)*1.5);g.fillStyle='#5a3a24';g.fillRect(qx-7,qy-4,14,4);g.fillStyle='#3a2a22';g.fillRect(qx-8,qy-25+qb,16,20);g.fillStyle='#ffd45a';g.fillRect(qx-7,qy-24+qb,14,18);g.fillStyle='#fff1b8';g.fillRect(qx-7,qy-24+qb,14,2);g.fillStyle='#d9a21f';g.fillRect(qx-7,qy-8+qb,14,2);pt3('?',qx-3,qy-20+qb,'#7a4a10',2);if(Math.floor(T*2.5)%2){g.fillStyle='#fff6c0';g.fillRect(qx+9,qy-26+qb,1,3);g.fillRect(qx+8,qy-25+qb,3,1)}
  if(near&&near.q)(S.answered[phaseKey(S.li)]?txt:txtA)(S.answered[phaseKey(S.li)]?'PERGUNTA RESPONDIDA':'PERGUNTA',qx,qy-31);
  const dx=S.li==5?-999:Math.round(L.w-30-cam),ok=readyToQuestion()&&!!S.answered[phaseKey(S.li)];g.fillStyle='#2b3a33';g.fillRect(dx-12,146,24,34);g.fillStyle=ok?'#ffd45a':'#9aa6b0';g.fillRect(dx-10,148,20,32);g.fillStyle=ok?'#fff3c0':'#c9d1d8';g.fillRect(dx-7,152,14,28);g.fillStyle=ok?'#d9a21f':'#7b8896';g.fillRect(dx-7,152,14,1);g.fillRect(dx+3,166,3,3);g.fillStyle='#2b3a33';g.fillRect(dx-12,144,24,2);(ok&&near&&near.d?txtA:txt)(ok&&near&&near.d?'SAIR':'SAÍDA',dx,140);
  wk.forEach((w,j)=>{if(w.dead)return;const x=Math.round(w.x-cam),bob=Math.round(Math.sin(T*9+j)*1.2),type=(j+L.k)%3,y=Math.round(w.y);g.fillStyle='rgba(0,0,0,.18)';g.fillRect(x-6,y,12,1);
   if(type==0)oldE0(x,y,bob);else if(type==1)oldE1(x,y,bob);else oldE2(x,y,bob)});
  hz.forEach(h=>{const x=Math.round(h.x-cam),y=Math.round(h.y+(T*20%2|0));g.fillStyle='rgba(255,155,84,.25)';for(let j=y-6;j<y;j+=2)g.fillRect(x,j,1,1);drone2(x,y);g.fillStyle=camT>0?'#48A9E8':INK;g.fillRect(x-1,y+4,2,2)})}
 if(pl){drawNew();drawDrops();drawFoes()}let x=192,y=180,d=1,cm=0,pose=0,f=0,pw=0;
 if(pl){x=P.x-cam;y=P.y;d=P.dir;cm=camT>0;const wlk=P.og&&Math.abs(P.vx)>8;pose=!P.og?(P.vy<0?2:3):wlk?1:(P.sq>.08?4:0);f=pose==1?Math.floor(P.x/5)&3:pose==0?(T%2.6<1.3?0:1):0;if(P.og){g.fillStyle='rgba(0,0,0,.2)';g.fillRect(Math.round(x)-6,Math.round(y),12,1)}}
 else if(m=='end'){y=180-Math.abs(Math.sin(T*4))*30;pose=2}else{x=120;f=T%2.6<1.3?0:1}
 const ex=joy>0||m=='end'?2:(pl&&inv>1.1)?3:(T%3.6<.13?1:0);
 pw=pl&&vict<=0?(pwR>0&&pwS>0?(((T*3)|0)%2?2:1):pwS>0?2:pwR>0?1:0):0;if(pw&&((pwR>0&&pwR<2)||(pwS>0&&pwS<2))&&((T*8)|0)%2)pw=0;
 GLW=pl&&lightT>0?Math.min(.55,lightT*.8)*(.6+.4*Math.sin(T*14)):0;
 if(pl&&lightT>0)lightBeam(x,y);
 if(pl&&vict>0){discoLights();danceLeco(x,y)}
 else{if(pl&&pwR>0)aura(x,y,1);if(pl&&pwS>0)aura(x,y,2);if(!(pl&&inv>0&&Math.floor(T*12)%2))leco(x,y,d,pose,f,cm,ex,pw);if(pl&&pwR>0)sparks(x,y,1);if(pl&&pwS>0)sparks(x,y,2);if(pl&&boss&&camT>0){const r=(camDur-camT)*50;if(r<24)ring(Math.round(x),Math.round(y-10),r,'rgba(159,232,255,.6)')}if(pl&&lightT>0)heartRise(x,y)}
 GLW=0;
 if(pl&&tg>0&&tongueTarget){const a=Math.max(0,Math.min(1,tg>.15?(tg-.15)/.15:tg/.15)),mx=P.x+P.dir*14-cam,my=P.y-11,ex2=mx+(tongueTarget.x-cam-mx)*a,ey2=my+(tongueTarget.y-my)*a,n=Math.max(1,Math.round(Math.max(Math.abs(ex2-mx),Math.abs(ey2-my))));for(let i=0;i<=n;i++){const px=Math.round(mx+(ex2-mx)*i/n),py=Math.round(my+(ey2-my)*i/n);g.fillStyle=pwR>0?'#8a4fd0':'#e5557a';g.fillRect(px,py+1,2,1);g.fillStyle=pwR>0?'#c89bff':'#f28aa5';g.fillRect(px,py,2,1)}g.fillStyle=tongueTarget.type=='clue'?'#ffd45a':pwR>0?'#b36cff':'#e5557a';g.fillRect(Math.round(ex2)-1,Math.round(ey2)-1,4,4);g.fillStyle='#fff';g.fillRect(Math.round(ex2),Math.round(ey2)-1,1,1);if(pwS>0){g.fillStyle='#bfe4ff';g.fillRect(Math.round(ex2)-3,Math.round(ey2),7,1);g.fillRect(Math.round(ex2),Math.round(ey2)-3,1,7)}}
 if(boss)drawBoss();if(pl&&(L.k==1||L.k==3))rep(120,1.25,(x2,n)=>g.drawImage(FOLI,x2,203+mod(n,2)*2),cam);
 pt.forEach(p=>{g.fillStyle=p.c;g.fillRect(Math.round(p.x-(pl?cam:0)),Math.round(p.y),2,2)});if(boss&&boss.on)bossHud();else if(pl&&vict<=0)livesHud()}
// ---------- HABILIDADES, ITENS E COMEMORAÇÃO ----------
const LW={},lecoW=(p,f,cm,ex,pw)=>{const k=[p,f,cm,ex,pw].join('_');return LW[k]||(LW[k]=(()=>{const s=lecoCv(p,f,cm,ex,pw);return mk(s.width,s.height,x=>{x.drawImage(s,0,0);x.globalCompositeOperation='source-in';x.fillStyle='#fff';x.fillRect(0,0,s.width,s.height)})})())};
const PWC={1:{a:'#b36cff',b:'#e6c8ff'},2:{a:'#3fa0ff',b:'#c4e6ff'}};
function extraStep(dt){pwR=Math.max(0,pwR-dt);pwS=Math.max(0,pwS-dt);lightT=Math.max(0,lightT-dt);
 if(!boss&&vict<=0&&lt>5.5&&TIPS[S.li])for(const q of TIPS[S.li]){const k=S.li+'-'+q[0];if(!tipsSeen[k]&&P.x>=q[0]&&P.x<q[0]+90){tipsSeen[k]=1;toast(q[1],4200);break}}
 if(vict>0){vict-=dt;inv=Math.max(inv,.5);if(Math.random()<dt*30)pt.push({x:cam+Math.random()*384,y:-4,vx:(Math.random()-.5)*30,vy:20+Math.random()*30,l:2.6,c:BC[(Math.random()*4)|0]});if(vict<=0){vict=0;showPhaseResults()}return}
 if(!boss||!boss.on||boss.dead){drops=[];return}
 dropT-=dt;
 if(dropT<=0){dropT=7+Math.random()*5;if(drops.length<2){const ph=php<=2?.6:.28,r=Math.random(),k=r<ph?'h':r<ph+(1-ph)/2?'r':'s';drops.push({k,x:arenaX+22+Math.random()*(L.w-arenaX-150),y:-8,vy:0,g:0})}}
 drops=drops.filter(d=>{if(d.y<180){d.vy=Math.min(d.vy+110*dt,90);d.y=Math.min(180,d.y+d.vy*dt);if(d.y>=180){d.vy=0;burst(d.x,178,'#ffffff',4)}}else d.g+=dt;
  if(d.g>(d.k=='h'?5:9))return false;
  if(Math.hypot(d.x-P.x,(d.y-6)-(P.y-8))<12){
   if(d.k=='h'){if(php>=5)return true;php=Math.min(5,php+1);lightT=1.6;burst(P.x,P.y-10,'#ff8fb0',14);burst(P.x,P.y-14,'#ffe9a0',10);sfx(660,.3,'sine',1320);toast('VIDA RECUPERADA! +1 coração',1800)}
   else if(d.k=='r'){pwR=9;burst(P.x,P.y-10,'#c89bff',16);sfx(500,.3,'sine',1500);toast('LÍNGUA INFINITA! Alcança o chefão de qualquer lugar por 9 s',2000)}
   else{pwS=12;burst(P.x,P.y-10,'#6cc4ff',16);sfx(240,.3,'sawtooth',900);toast('FORÇA! Seus golpes causam 3x mais dano por 12 s',1800)}
   return false}
  return true})}
function drawDrops(){drops.forEach(d=>{const x=Math.round(d.x-cam),y=Math.round(d.y),col=d.k=='h'?'#ff6f91':d.k=='r'?'#b36cff':'#3fa0ff',lg=d.k=='h'?'#ffd0dc':d.k=='r'?'#e6c8ff':'#c4e6ff',gr=d.vy==0,bl=gr&&(d.k=='h'?d.g>3.4:d.g>7.4)&&((T*10)|0)%2;
 if(!gr){g.fillStyle=col;g.globalAlpha=.14;g.fillRect(x-1,0,3,y);g.globalAlpha=.35;for(let j=1;j<=6;j++)g.fillRect(x-1,y-10-j*5,2,3);g.globalAlpha=1}
 g.fillStyle='rgba(0,0,0,.2)';g.fillRect(x-5,180,10,1);
 if(bl)return;
 const bo=gr?Math.round(Math.sin(T*5+d.x)*1.5):0,cy=y-9+bo;
 g.globalAlpha=.22+.1*Math.sin(T*6);el(g,x,cy,10,10,col);g.globalAlpha=1;
 if(d.k=='h')g.drawImage(HRT,x-7,cy-6,14,12);
 else{el(g,x,cy,7,7,'#1d1a17');el(g,x,cy,6,6,col);el(g,x,cy,4,4,lg);g.fillStyle=col;
  if(d.k=='s'){[[1,-4,2,2],[0,-2,2,2],[-1,0,4,2],[0,2,2,2],[-1,3,2,1]].forEach(([a,b,w,h])=>g.fillRect(x+a,cy+b,w,h))}
  else{g.fillRect(x-4,cy,6,1);g.fillRect(x+1,cy-2,1,5);g.fillRect(x+2,cy-1,1,3);g.fillRect(x+3,cy,1,1)}}
 if(gr&&Math.floor(T*3+d.x)%3==0){g.fillStyle='#fff';g.fillRect(x+7,cy-7,1,1);g.fillRect(x+6,cy-7,3,1);g.fillRect(x+7,cy-8,1,3)}
 if(d.k=='h'&&gr&&php>=5&&Math.abs(d.x-P.x)<22)txt('VIDA CHEIA',x,y-20)})}
function aura(x,y,t){const c=PWC[t],p=.5+.5*Math.sin(T*6+t*2),X=Math.round(x),Y=Math.round(y-10);g.save();g.globalAlpha=.14+.1*p;el(g,X,Y,18,15,c.a);g.globalAlpha=.16+.12*p;el(g,X,Y,12,10,c.b);g.restore();ring(X,Y,9+((T*16+t*6)%13),t==1?'rgba(200,150,255,.55)':'rgba(120,195,255,.55)')}
function sparks(x,y,t){const c=PWC[t];for(let i=0;i<6;i++){const a=T*2.6+i*1.0472+t,r=11+Math.sin(T*5+i)*3,sx=Math.round(x+Math.cos(a)*r),sy=Math.round(y-10+Math.sin(a)*r*.8);if(Math.sin(T*9+i*2)>-.3){g.fillStyle=i&1?'#fff':c.b;g.fillRect(sx,sy,1,1);g.fillRect(sx-1,sy,3,1);g.fillRect(sx,sy-1,1,3)}}}
function lightBeam(x,y){const u=1-lightT/1.6,rise=Math.min(1,u*3.2),fade=u<.55?1:Math.max(0,1-(u-.55)/.45),bot=Math.max(10,Math.round(y-2)),len=Math.round(bot*rise),X=Math.round(x);
 for(let j=0;j<len;j+=2){const k=j/bot,w=Math.round(7+k*7+Math.sin(T*12+j*.15)),a=(.12+.2*k)*fade;g.fillStyle='rgba(255,236,160,'+a.toFixed(3)+')';g.fillRect(X-w,j,w*2,2);g.fillStyle='rgba(255,255,255,'+(a*1.5).toFixed(3)+')';g.fillRect(X-(w>>1),j,w,2)}
 g.globalAlpha=fade;el(g,X,len,8,3,'#fff6c8');g.globalAlpha=1;
 if(rise>=1){g.globalAlpha=.5*fade;el(g,X,Math.round(y)-1,14,3,'#fff6c0');g.globalAlpha=1}}
function heartRise(x,y){const u=1-lightT/1.6;if(u>.9)return;for(let i=0;i<4;i++){const v=(u*1.4+i*.25)%1;g.globalAlpha=Math.max(0,1-v);g.drawImage(HRT,Math.round(x+Math.sin(v*6+i*1.7)*10)-3,Math.round(y-8-v*34),7,6)}g.globalAlpha=1;
 for(let i=0;i<7;i++){const v=(u*2+i*.14)%1,sx=Math.round(x+Math.sin(i*2.3+u*5)*13),sy=Math.round(y-v*38);g.fillStyle=i&1?'#fff':'#ffe9a0';g.fillRect(sx,sy,1,1);g.fillRect(sx-1,sy,3,1);g.fillRect(sx,sy-1,1,3)}}
const FTN=new Map(),fOn=()=>vis>0&&!(boss&&boss.on),tint=(im,col)=>{let m=FTN.get(col);if(!m){m=new Map();FTN.set(col,m)}let t=m.get(im);if(!t){t=mk(im.width,im.height,x=>{x.drawImage(im,0,0);x.globalCompositeOperation='source-in';x.fillStyle=col;x.fillRect(0,0,im.width,im.height)});m.set(im,t)}return t};
function focusDim(){const k=Math.max(0,Math.min(1,(5-vis)*4,vis*4)),gr=g.createRadialGradient(192,108,50,192,108,235);gr.addColorStop(0,'rgba(8,64,28,'+(.4*k)+')');gr.addColorStop(1,'rgba(2,26,10,'+(.78*k)+')');g.fillStyle=gr;g.fillRect(0,0,384,216)}
function focusGlow(im,x,y,hc,tc,r){const p=.5+.5*Math.sin(T*7+x*.3);g.globalAlpha=.18+.14*p;el(g,x+im.width/2,y+im.height/2,im.width/2+r,im.height/2+r,hc);g.globalAlpha=.55+.35*p;g.drawImage(tint(im,tc),x,y);g.globalAlpha=1}
function swGlow(t,x,y,rx,ry,hc){const p=.5+.5*Math.sin(t*7+x*.3);g.globalAlpha=.2+.16*p;el(g,x,y,rx+3,ry+3,hc);g.globalAlpha=.3+.2*p;el(g,x,y,rx,ry,hc);g.globalAlpha=1}
function focusHud(){const on=vis>0,rd=visCd<=0&&!on;hudRow(18,'F FOCO',on?vis/5:rd?1:1-visCd/7,on?'#9be86a':rd?'#6fe6a8':'#7b8896',rd||on)}
function hudRow(y,label,fr,col,on){g.fillStyle='#1d1a17';g.fillRect(6,y,86,9);g.fillStyle=on?'#2b3a33':'#3a3330';g.fillRect(7,y+1,84,7);pt3(label,9,y+2,on?'#fff4d0':'#9a9088');g.fillStyle='#1d1a17';g.fillRect(56,y+2,34,5);g.fillStyle=col;g.fillRect(57,y+3,Math.round(32*Math.max(0,Math.min(1,fr))),3)}
function abilityHud(){const on=camT>0,rd=camCd<=0&&!on;hudRow(37,'C INVISIVEL',on?camT/camDur:rd?1:1-camCd/camMax,on?'#9fe8ff':rd?'#6fe6a8':'#7b8896',rd||on);let y=47;if(pwR>0){hudRow(y,'LINGUA',pwR/9,'#b36cff',1);y+=10}if(pwS>0)hudRow(y,'FORCA',pwS/12,'#3fa0ff',1)}
function note(x,y,c){g.fillStyle='#1d1a17';g.fillRect(x-1,y+3,5,4);g.fillStyle=c;g.fillRect(x,y+4,3,2);g.fillRect(x+2,y,1,5);g.fillRect(x+3,y,2,1);g.fillRect(x+3,y+1,1,1)}
function discoLights(){const cols=['255,155,84','242,138,165','255,212,90','72,169,232'];for(let i=0;i<4;i++){const cx=192+Math.sin(T*1.7+i*1.6)*150;for(let j=0;j<176;j+=3){const w=4+j*.16;g.fillStyle='rgba('+cols[i]+',.10)';g.fillRect(Math.round(cx-w+Math.sin(T*2+i)*j*.1),j,Math.round(w*2),3)}}g.fillStyle='rgba(255,255,255,'+(.04+.04*Math.sin(T*15)).toFixed(3)+')';g.fillRect(0,0,384,216)}
function danceLeco(x,y){const t=T*7.5,s=Math.sin(t),fl=Math.sin(t*.5)>=0?1:-1,c=lecoCv(0,0,0,0);
 g.fillStyle='rgba(0,0,0,.25)';g.fillRect(Math.round(x)-8,Math.round(y),16,1);
 g.save();g.translate(Math.round(x+Math.sin(t*.5)*5),Math.round(y-17-Math.abs(s)*4));g.scale(fl,1);g.rotate(-1.15+s*.2+Math.sin(t*2)*.05);
 g.drawImage(c,-14,-12);
 g.fillStyle='#0b0f12';g.fillRect(5,-5,8,5);g.fillRect(6,-6,6,1);g.fillRect(0,-4,5,1);
 g.fillStyle='#5b8fd0';g.fillRect(6,-4,2,1);g.fillRect(10,-3,1,1);g.fillStyle='#fff';g.fillRect(7,-5,1,1);
 g.restore();
 for(let i=0;i<3;i++){const u=(T*.9+i/3)%1;g.globalAlpha=1-u;note(Math.round(x+(i-1)*16+Math.sin(T*3+i)*4),Math.round(y-34-u*30),BC[i]);g.globalAlpha=1}}
function abyss(l,cx){if(l.k==1)return;if(l.k==3){g.save();g.beginPath();g.rect(0,180,384,36);g.clip();water();g.restore();g.fillStyle='#d6f6ff';g.fillRect(0,180,384,1);return}const b=l.gr,n=9;for(let i=0;i<n;i++){g.fillStyle=mixc(b,'#10141a',.45+.45*i/(n-1));g.fillRect(0,180+i*4,384,4)}
 rep(34,.5,(x,n)=>{const w=10+mod(n*7,14),h=3+mod(n*5,6),y=184+mod(n*13,22);g.fillStyle=mixc(b,'#10141a',.8);g.fillRect(x,y,w,h);g.fillStyle=mixc(b,'#10141a',.62);g.fillRect(x,y,w,1)},cx);
 g.fillStyle='rgba(0,0,0,.25)';g.fillRect(0,180,384,2)}
// ---------- VIDAS, CHANCES E OBSTÁCULOS NOVOS ----------
function loseLife(full){if(boss&&boss.on)return;lives=Math.max(0,lives-(full?2:1));if(lives<=0){S.mode='panel';jingle(FAIL);panel('<img alt="Leco chorando" src="'+lecoCry()+'"><h3>AS VIDAS ACABARAM</h3><p>Leco perdeu as 5 vidas desta fase. Tente de novo com calma: observe os padrões dos obstáculos.</p>'+btn('fresh(S.li,1)','REINICIAR A FASE')+btn('levels()','ESCOLHER FASE')+btn('menu()','MENU PRINCIPAL'))}}
function livesHud(){sealHud();focusHud();for(let i=0;i<5;i++){const x=6+i*9;g.drawImage(HRE,x,6);if(lives>=2*i+2)g.drawImage(HRT,x,6);else if(lives==2*i+1)g.drawImage(HRT,0,0,4,6,x,6,4,6)}}
function lecoCry(){const c=lecoCv(0,0,0,1),k=6;return mk(c.width*k,c.height*k+8,x=>{x.imageSmoothingEnabled=false;x.fillStyle='#4aa8e8';x.fillRect(18,c.height*k-2,c.width*k-36,8);x.fillStyle='#8fd0f5';x.fillRect(26,c.height*k,c.width*k-52,3);x.drawImage(c,0,0,c.width*k,c.height*k);
 x.fillStyle='#1d1a17';for(let i=0;i<6;i++)x.fillRect(112+i*5,36-i*2+0,5,4);
 x.fillStyle='#4aa8e8';x.fillRect(126,68,6,40);x.fillRect(138,70,6,28);x.fillStyle='#bfe8ff';x.fillRect(126,68,2,40);x.fillRect(138,70,2,28);
 [[124,112,10],[136,104,8],[130,124,8]].forEach(([a,b,h])=>{x.fillStyle='#4aa8e8';x.fillRect(a,b,8,h);x.fillStyle='#bfe8ff';x.fillRect(a,b,2,h)})}).toDataURL()}
function bossLost(){S.mode='panel';chances--;
 if(chances>0){jingle(FAIL.slice(0,4),'square',.13);panel('<h3>O vilão resistiu...</h3><p>Seus corações acabaram.</p><div class="chn">'+chances+'/3</div><p><b>CHANCES RESTANTES</b></p><p>CONTINUAR retoma de onde parou (a vida do vilão volta ao último ponto de controle). REINICIAR recomeça o chefão do zero e devolve as 3 chances.</p>'+btn('retryBoss()','CONTINUAR')+btn('restartBoss()','REINICIAR')+'<br>'+btn('menu()','MENU PRINCIPAL'))}
 else{jingle(FAIL);panel('<img alt="Leco chorando" src="'+lecoCry()+'"><h3>AS CHANCES ACABARAM</h3><div class="chn">0/3</div><p>Leco está chorando... Você usou as 3 chances contra o chefão.</p><p>'+(bossOnly?'Tente o chefão de novo: o resto do jogo não muda.':'Refaça só esta fase: o resto do progresso continua salvo.')+'</p>'+btn('redoBoss()',bossOnly?'REINICIAR O CHEFÃO':'REINICIAR A FASE')+'<br>'+btn('menu()','MENU PRINCIPAL'))}}
function redoBoss(){if(bossOnly)pick(6);else fresh(5,1)}
var bossOnly=0;
// ---------- SONS DE VITÓRIA E DERROTA (chiptune) ----------
const WIN=[523,659,784,1047,0,784,1047,1319],BIG=[523,659,784,1047,988,1047,1175,1319,1568],FAIL=[392,370,349,330,0,262,196];
const NZB={};
function nzB(d){const k=d.toFixed(2);if(!NZB[k]){AC=AC||new AudioContext();const n=Math.max(1,AC.sampleRate*d|0),b=AC.createBuffer(1,n,AC.sampleRate),a=b.getChannelData(0);for(let i=0;i<n;i++)a[i]=Math.random()*2-1;NZB[k]=b}return NZB[k]}
function stampSfx(k,x){if(mute)return;const dx=Math.abs(P.x-x);if(dx>300)return;try{AC=AC||new AudioContext();const n=AC.currentTime+.01,out=AC.createGain();out.gain.value=Math.max(.15,1-dx/300);out.connect(AC.destination);
 const env=(a,pk,d,t0)=>{a.gain.setValueAtTime(.0001,t0);a.gain.exponentialRampToValueAtTime(pk,t0+.008);a.gain.exponentialRampToValueAtTime(.0001,t0+d)};
 const osc=(ty,f1,f2,d,pk,t0,fl)=>{const o=AC.createOscillator(),a=AC.createGain();o.type=ty;o.frequency.setValueAtTime(f1,t0);o.frequency.exponentialRampToValueAtTime(f2,t0+d);env(a,pk,d,t0);if(fl){const f=AC.createBiquadFilter();f.type=fl[0];f.frequency.value=fl[1];o.connect(f);f.connect(a)}else o.connect(a);a.connect(out);o.start(t0);o.stop(t0+d+.03)};
 const noi=(ty,f1,f2,d,pk,t0)=>{const s=AC.createBufferSource(),f=AC.createBiquadFilter(),a=AC.createGain();s.buffer=nzB(d);f.type=ty;f.frequency.setValueAtTime(f1,t0);f.frequency.exponentialRampToValueAtTime(f2,t0+d);f.Q.value=ty=='bandpass'?1.2:.7;env(a,pk,d,t0);s.connect(f);f.connect(a);a.connect(out);s.start(t0)};
 if(k==0){osc('sawtooth',360,80,.26,.05,n,['lowpass',900]);noi('bandpass',2200,350,.28,.06,n);osc('square',55,50,.2,.02,n,['lowpass',300])}
 else if(k==1){osc('sine',150,34,.42,.34,n);noi('lowpass',1400,120,.22,.3,n);osc('square',210,95,.12,.08,n,['lowpass',700]);[311,467,743].forEach((f,i)=>osc('triangle',f,f*.985,.3-i*.04,.045,n+.01));osc('sine',70,40,.5,.12,n+.14);noi('highpass',3000,1200,.12,.05,n+.05)}
 else{osc('sawtooth',70,160,.5,.035,n,['lowpass',500]);noi('bandpass',500,1600,.45,.04,n);[.05,.2,.35].forEach(d=>osc('square',900,880,.03,.03,n+d))}
}catch(e){}}
function jingle(n,t='square',d=.12,v=.06){if(mute)return;try{AC=AC||new AudioContext();const s0=AC.currentTime+.02;n.forEach((f,k)=>{if(!f)return;const o=AC.createOscillator(),a=AC.createGain(),b=s0+k*d;o.type=t;o.frequency.setValueAtTime(f,b);a.gain.setValueAtTime(v,b);a.gain.exponentialRampToValueAtTime(.001,b+d*.95);o.connect(a);a.connect(AC.destination);o.start(b);o.stop(b+d)})}catch(e){}}
function restartBoss(){retryBoss();boss.hp=boss.max;chances=3}
function newStep(dt){foeStep(dt);
 vp.forEach(v=>{const ov=P.x+6>v.x&&P.x-6<v.x+v.w&&P.y>v.y-1&&P.y-13<v.y+8;
  if(v.mode==0){const on=v.per-v.hid,u=(lt+v.off)%v.per,want=u<on;v.warn=want&&u>on-.7;if(want){if(!v.vis&&!ov)v.vis=1}else v.vis=0}
  else if(v.vis){if(v.t==0&&P.og&&P.sp===v.r)v.t=.0001;if(v.t>0){v.t+=dt;if(v.t>.5){v.vis=0;v.h=2.6;v.t=0}}}
  else{v.h-=dt;if(v.h<=0&&!ov)v.vis=1}});
 vs=vp.filter(v=>v.vis).map(v=>v.r);
 zp.forEach(z=>{const u=((lt+z.off)%z.per)/z.per;const pu=z.pu;z.u=u;if(z.kind==0){z.pu=u;if(pu!==undefined&&pu<u){if(pu<.64&&u>=.64)stampSfx(0,z.x);if(pu<.72&&u>=.72)stampSfx(1,z.x);if(pu<.88&&u>=.88)stampSfx(2,z.x)}}
  if(z.kind==0){z.y=u<.64?14:u<.72?14+(u-.64)/.08*166:u<.88?180:180-(u-.88)/.12*166;if(Math.abs(P.x-z.x)<10&&P.y>z.y-30&&P.y-13<z.y)hurt('Carimbo! Passe quando ele subir.')}
  else{z.h=u<.65?0:u<.7?(u-.65)/.05*40:u<.88?40:40*(1-(u-.88)/.12);if(z.h>4&&Math.abs(P.x-z.x)<7&&P.y>180-z.h)hurt('Jato quente! Espere o jato baixar.')}})}
function drawNew(){
 vp.forEach(v=>{const x=Math.round(v.x-cam);if(x>384||x+v.w<0)return;
  if(!v.vis){g.fillStyle='rgba(255,255,255,.3)';for(let i=0;i<v.w;i+=4)g.fillRect(x+i,v.y,2,1);return}
  if(v.mode==0&&v.warn&&((T*14)|0)%2)return;
  const sx=v.mode==1&&v.t>0?Math.round(Math.sin(T*60)):0;plat(L,x+sx,v.y,v.w,8,null);
  if(v.mode==0){g.fillStyle='#ffd45a';for(let i=2;i<v.w-2;i+=6)g.fillRect(x+sx+i,v.y+6,3,1)}
  else{g.fillStyle='#1d1a17';[[6,3],[v.w>>1,5],[v.w-9,2]].forEach(([a,b])=>g.fillRect(x+sx+a,v.y+b,1,3))}});
 zp.forEach(z=>{const x=Math.round(z.x-cam);if(x<-20||x>404)return;const u=z.u;
  if(z.kind==0){const by=Math.round(z.y);
   if(u>=.45&&u<.72&&((T*10)|0)%2){g.fillStyle='rgba(226,86,75,.75)';g.fillRect(x-10,179,20,1);g.fillRect(x-8,178,16,1)}
   g.fillStyle='#3a2a22';g.fillRect(x-2,0,5,by-13);g.fillStyle='#8a5a38';g.fillRect(x-1,0,3,by-14);
   g.fillStyle='#1d1a17';g.fillRect(x-11,by-14,22,15);g.fillStyle='#8a5a38';g.fillRect(x-10,by-13,20,6);g.fillStyle='#c99a63';g.fillRect(x-10,by-13,20,1);g.fillStyle='#e2564b';g.fillRect(x-10,by-7,20,7);g.fillStyle='#ff8a7a';g.fillRect(x-10,by-7,20,1)}
  else{g.fillStyle='#1d1a17';g.fillRect(x-8,177,16,4);g.fillStyle='#7b8896';g.fillRect(x-7,178,14,2);
   if(u>=.45&&u<.65&&((T*12)|0)%2){g.fillStyle='#ff9b54';g.fillRect(x-5,178,10,1)}
   const h=Math.round(z.h);
   if(h>0){for(let j=0;j<h;j+=2){const w=Math.max(2,Math.round(7*(1-j/h)*(.8+.2*Math.sin(T*30+j))));g.fillStyle='#e2564b';g.fillRect(x-w,177-j,w*2,2);g.fillStyle='#ff9b54';g.fillRect(x-(w>>1),177-j,Math.max(1,w),2);if(j<h*.7){g.fillStyle='#ffd45a';g.fillRect(x-(w>>2),177-j,Math.max(1,w>>1),2)}}}
   else if(u<.45&&((T*5+z.x)%1)<.3){g.fillStyle='rgba(255,255,255,.6)';g.fillRect(x-1,172-(((T*20)|0)%5),2,2)}}})}
function papers(cx){for(let i=0;i<22;i++){const d=i%3,sc=[.12,.25,.42][d],sz=[3,4,6][d],al=[.28,.4,.55][d],sp=[7,12,19][d],x=Math.round(mod(i*47-cx*sc*.6+Math.sin(T*.7+i)*(8+d*4),420)-18),y=Math.round(mod(T*sp+i*29,236)-12),w=Math.max(1,Math.round(sz*Math.abs(Math.cos(T*(1.1+d*.4)+i))));
 g.globalAlpha=al;g.fillStyle='#fff6dc';g.fillRect(x,y,w,sz+1+d);if(d==2&&w>3){g.fillStyle='#b9ad8c';g.fillRect(x+1,y+2,w-2,1);g.fillRect(x+1,y+4,w-2,1)}}g.globalAlpha=1}
// ---------- RIO ESQUECIDO: MISSÃO SUBAQUÁTICA (fase 2) ----------
let sw=null;const SWL=1500,
SWH=[['b',180,60,50,1.1],['o',330,100,45,1.3],['f',430,150,70,1.6],['b',520,110,40,1],['o',640,80,50,1.5],['f',720,60,80,1.4],['b',800,120,45,1.2],['o',960,140,45,1.2],['f',1020,100,80,1.7],['b',1090,160,40,1.1],['o',1230,70,50,1.4],['f',1290,120,80,1.5],['b',1370,100,45,1],['o',1450,150,40,1.3]],
SWT=[[30,'LECO: QUE ÁGUA TURVA... E O AR ACABA RÁPIDO! ONDE ESTÃO AS AMOSTRAS?'],[400,'O PEIXE SELO ECO É VERDE SÓ NO RÓTULO!'],[880,'BARRIS BIODEGRADÁVEIS... CHEIOS DE SOLVENTE!'],[1250,'O PORTAL SE ABRE COM AS 5 AMOSTRAS NA MOCHILA.']],
swP=(h,t)=>{const k=h[0],x=h[1],y=h[2],a=h[3],u=Math.sin(t*h[4]+x);return k=='o'?{x:x,y:y+u*a}:k=='b'?{x:x+u*a,y:y+Math.sin(t*.8+x)*4}:{x:x+u*a,y:y,d:Math.cos(t*h[4]+x)>=0?1:-1}},
SWZ=[[330,520],[820,1020],[1180,1330]],SWA=[[200,70],[480,170],[700,100],[1010,60],[1250,170]],
swSay=(m,n)=>{sw.msg=m;sw.mt=n};
function swimIntro(){S.mode='panel';panel('<h3>O RIO ESQUECIDO</h3><p>Leco escorrega e cai nas águas barrentas do rio... mas o rio não está vazio.</p><p>Sob a superfície, a fábrica escondeu por anos frascos com amostras da água que despejava. Dona Rosa pediu: <b>colete as 5 amostras</b> e prove o que aconteceu.</p><p>Cuidado com barris de chorume, manchas de óleo e peixes-selo &quot;ECO&quot;. Nade com <b>A/D ou ◀ ▶</b>, suba com <b>W</b>/<b>↑</b> e desça com <b>S</b>. Com as 5 amostras, entre no portal.</p>'+btn('swimGo()','MERGULHAR'))}
function swimGo(){close();S.mode='swim';sw={x:40,y:34,vx:0,vy:30,dir:1,got:0,hp:3,br:100,zn:0,ar:SWA.map(a=>({x:a[0],y:a[1],u:0,r:0})),inv:1,cam:0,t:0,msg:'',mt:0,ck:40,sd:{},bb:[],it:[[260,120],[560,60],[860,150],[1130,90],[1380,160]].map(a=>({x:a[0],y:a[1],g:0}))};sfx(300,.4,'sine',90)}
function swHit(k){const w=sw;w.hp--;w.br=Math.max(0,w.br-12);w.inv=1.4;w.vx=-w.dir*90;w.vy=40;sfx(150,.3,'sawtooth');
 if(w.hp<=0){swimOver()}
 else swSay(k=='b'?'BARRIL DE CHORUME! CUIDADO!':k=='o'?'MANCHA DE ÓLEO! DESVIE!':'O PEIXE SELO ECO MORDEU!',2.5)}
function swimStep(dt){const w=sw;w.t+=dt;w.mt=Math.max(0,w.mt-dt);w.inv=Math.max(0,w.inv-dt);if(vis>0){vis-=dt;if(vis<=0){vis=0;visCd=7;sfx(400,.2,'sine',300)}}else if(visCd>0)visCd=Math.max(0,visCd-dt);
 const ax=(K.d||K.arrowright?1:0)-(K.a||K.arrowleft?1:0),up=K.w||K.arrowup,dw=K.s||K.arrowdown;
 if(ax)w.dir=ax;const cur=Math.sin(w.t*.7+w.x*.01)*10,zn=SWZ.some(z=>w.x>z[0]&&w.x<z[1])&&w.y>96;w.zn=zn;
 w.vx+=(ax*78*(w.br<20?.7:1)+cur-w.vx)*Math.min(1,4*dt);w.vy+=((up?-70:dw?85:8+(100-w.br)*.22)-w.vy)*Math.min(1,5*dt);
 w.br=Math.min(100,w.br-dt*(3.4+((ax||up||dw)?1.4:0))*(zn?2.4:1));if(w.y<=34)w.br=Math.min(100,w.br+dt*45);
 w.ar.forEach(a=>{if(a.u){if((a.r+=dt)>12)a.u=0}else if(Math.abs(a.x-w.x)<14&&Math.abs(a.y-w.y)<14){a.u=1;a.r=0;w.br=Math.min(100,w.br+45);sfx(660,.2,'sine',990);swSay('BOLSA DE AR! RESPIRE FUNDO.',2);for(let k=0;k<8;k++)w.bb.push({x:a.x,y:a.y,vy:-26-Math.random()*16,l:.9})}});
 if(w.br<=0){w.br=0;w.dw=(w.dw||0)+dt;if(w.dw>=1){w.dw-=1;w.hp--;sfx(150,.3,'sawtooth');swSay('SEM FÔLEGO! VOCÊ PERDE 1 VIDA POR SEGUNDO!',1.5);if(w.hp<=0){swimOver();return}}}else{w.dw=0;if(w.br<25&&w.mt<=0)swSay('FÔLEGO ACABANDO! SUBA OU ACHE UMA BOLSA DE AR.',2)}
 w.x=Math.max(10,Math.min(SWL+40,w.x+w.vx*dt));w.y=Math.max(30,Math.min(194,w.y+w.vy*dt));
 if(Math.random()<dt*(ax||up?9:3))w.bb.push({x:w.x+w.dir*13,y:w.y-3,vy:-16-Math.random()*14,l:1.2});
 w.bb=w.bb.filter(b=>(b.l-=dt)>0&&(b.y+=b.vy*dt)>22);
 SWT.forEach((t,i)=>{if(!w.sd[i]&&w.x>=t[0]){w.sd[i]=1;swSay(t[1],4.5)}});
 for(const h of SWH){const p=swP(h,w.t),k=h[0],hx=k=='b'?17:k=='o'?18:18,hy=k=='b'?14:k=='o'?11:10;if(w.inv<=0&&Math.abs(p.x-w.x)<hx&&Math.abs(p.y-w.y)<hy){swHit(k);break}}
 w.it.forEach(i=>{if(!i.g&&Math.abs(i.x-w.x)<10&&Math.abs(i.y-w.y)<11){i.g=1;w.got++;w.ck=Math.max(40,i.x-30);if(!S.lv['l1-riv'])S.sc+=40;sfx(880,.2,'sine',1500);swSay(w.got<5?'AMOSTRA '+w.got+' DE 5 COLETADA!':'TODAS AS AMOSTRAS! ENTRE NO PORTAL!',3);for(let k=0;k<8;k++)w.bb.push({x:i.x,y:i.y,vy:-30-Math.random()*20,l:.8})}});
 w.cam+=(Math.max(0,Math.min(SWL+80-384,w.x-150))-w.cam)*Math.min(1,6*dt);
 $('hs').textContent='Rio Esquecido · Amostras '+w.got+'/5 · Fôlego '+Math.ceil(w.br)+'% · Vidas '+w.hp+'/3';
 if(w.got>=5&&Math.abs(w.x-1500)<14&&Math.abs(w.y-110)<22)swimEnd()}
function swimEnd(){S.mode='panel';const fst=!S.lv['l1-riv'];S.lv['l1-riv']=1;if(fst){S.sc+=100;S.cr=Math.min(100,S.cr+5)}sw.fst=fst;save();jingle([523,659,784,1047],'square',.14);
 panel('<h3>PORTAL DAS ÁGUAS</h3><p>As 5 amostras estão com Leco! Enquanto a placa dizia “ÁGUA PROTEGIDA”, os frascos mostram lama e solvente no rio. Ele atravessa o portal e emerge, encharcado, perto da saída da fábrica.</p><p>'+(fst?'+140 pontos · +5 credibilidade. ':'Amostras já entregues antes. ')+'A porta final já pode ser aberta.</p>'+btn('swimOut()','SAIR DO RIO'))}
function swimOver(){if(S.mode!='swim')return;S.mode='panel';sfx(120,.6,'sawtooth',60);panel('<h3>LECO SE AFOGOU</h3><p>As vidas acabaram no fundo do rio. As amostras coletadas nesta tentativa não foram salvas, mas o progresso da fase 3 continua intacto.</p>'+btn('swimGo()','TENTAR NOVAMENTE')+btn('swimLeave()','DEIXAR FASE')+btn('swimMenu()','MENU'))}
function swimLeave(){close();sw=null;S.mode='play';Object.assign(P,{x:475,y:180,vx:0,vy:0,og:1,sp:null,dj:0,sq:0});safe={x:475,y:180};cam=Math.max(0,Math.min(L.w-384,P.x-192));inv=2;$('hs').textContent=L.n}
function swimMenu(){sw=null;menu()}
function swimOut(){const bx=475;close();sw=null;S.mode='play';Object.assign(P,{x:bx,y:180,vx:0,vy:0,og:1,sp:null,dj:0,sq:0});safe={x:bx,y:180};cam=Math.max(0,Math.min(L.w-384,P.x-192));inv=2;save()}

function swimDraw(){const w=sw,c=Math.round(w.cam),t=w.t,zi=x=>SWZ.some(z=>x>z[0]&&x<z[1]);g.setTransform(1,0,0,1,0,0);g.imageSmoothingEnabled=false;g.globalAlpha=1;
 g.fillStyle='#a6c9c4';g.fillRect(0,0,384,22);g.fillStyle='#bcc6a6';g.fillRect(0,13,384,9);
 for(let i=0;i<5;i++){const px=((i*130-c*.15)%650+650)%650-60;g.fillStyle='#6b7681';g.fillRect(px,10,40,12);g.fillStyle='#5b6670';g.fillRect(px+6,3,6,8);g.fillRect(px+26,5,6,6);g.globalAlpha=.55;el(g,Math.round(px+9+Math.sin(t+i)*3),2-(((t*5+i*3)%6)|0),4,3,'#8a8f84');g.globalAlpha=1}
 const BD=['#6ccbe4','#62c0de','#58b4d6','#4ea7cc','#459ac2','#3c8cb6','#337ea9','#2b709b','#24628c','#1e557c','#19496c','#153f5d'];
 BD.forEach((k,i)=>{g.fillStyle=k;g.fillRect(0,22+i*16,384,16);if(i){g.fillStyle=BD[i-1];for(let x=0;x<384;x+=4){g.fillRect(x,22+i*16,2,2);g.fillRect(x+2,24+i*16,2,2)}}});
 g.fillStyle='rgba(18,70,100,.45)';for(let x=0;x<384;x+=4){const wx=x+c*.35,h=Math.round(26+Math.sin(wx*.021)*12+Math.sin(wx*.057)*7);g.fillRect(x,202-h,4,h)}
 g.fillStyle='rgba(14,56,84,.55)';for(let x=0;x<384;x+=4){const wx=x+c*.6,h=Math.round(12+Math.sin(wx*.04+1)*8);g.fillRect(x,202-h,4,h)}
 for(let i=0;i<4;i++){const bx=((i*118-c*.25+Math.sin(t*.35+i*1.7)*10)%520+520)%520-60,pol=zi(bx+c+30)?.35:1;for(let y=22;y<200;y+=2){const f=1-(y-22)/178;g.fillStyle='rgba(255,250,200,'+(.13*f*f*pol)+')';g.fillRect(Math.round(bx+(y-22)*.32),y,Math.round(12+(y-22)*.1+i*2),2)}}
 g.fillStyle='rgba(255,255,255,.2)';for(let i=0;i<26;i++){const x=Math.round(((i*31+Math.sin(t*.8+i)*6-c*.9)%400+400)%400-8),y=26+((i*13)%26)+Math.round(Math.sin(t*1.5+i)*2);g.fillRect(x,y,3,1);g.fillRect(x+1,y+1,1,1)}
 g.fillStyle='rgba(230,245,255,.35)';for(let i=0;i<28;i++)g.fillRect(Math.round(((i*47+t*(4+i%4)-c*(.5+i%3*.2))%400+400)%400-8),24+(((i*37+Math.sin(t+i)*6)%176)|0),1,1);
 g.fillStyle='#d6f6ff';for(let x=0;x<384;x+=3)g.fillRect(x,22+Math.round(Math.sin(t*2+(x+c)*.12)),3,1);
 g.fillStyle='#8a6240';g.fillRect(0,202,384,14);g.fillStyle='#6d4a30';for(let x=((-c)%14+14)%14-14;x<384;x+=14)g.fillRect(x,204+(((x+c)*7)&3),5,2);
 for(let i=0;i<30;i++){const wx=i*52+14,x=wx-c;if(x<-10||x>394)continue;const d=zi(wx);for(let j=0;j<6;j++){g.fillStyle=d?(j&1?'#6b5a2e':'#7d6b3a'):(j&1?'#3c8a3a':'#4aa86e');g.fillRect(x+Math.round(Math.sin(t*1.6+i+j*.6)*j*.6),202-j*(d?3:5),3,d?3:5)}}
 [[250,0],[610,1],[1060,2],[1420,0]].forEach(a=>{const x=Math.round(a[0]-c);if(x<-20||x>404)return;if(a[1]==0){g.fillStyle='#d8d0c8';g.fillRect(x-5,196,10,6);g.fillRect(x-3,194,6,2);g.fillStyle='#fff';g.fillRect(x-4,197,2,1)}else if(a[1]==1){g.fillStyle='#8b99a6';g.fillRect(x-4,196,8,6);g.fillStyle='#c3ccd5';g.fillRect(x-4,196,8,1)}else{el(g,x,197,7,5,'#1d1a17');el(g,x,197,3,2,'#6d4a30')}});
 [[760,'TUDO VERDE'],[1160,'AGUA LIMPA']].forEach(a=>{const x=Math.round(a[0]-c);if(x<-40||x>424)return;g.fillStyle='#5e3a24';g.fillRect(x,176,2,26);g.fillStyle='#1d3a2f';g.fillRect(x-25,168,52,16);g.fillStyle='#2f8f4a';g.fillRect(x-24,169,50,14);pt3(a[1],x-(tw(a[1])>>1)+1,173,'#fff4d0');g.fillStyle='#4f5a2a';g.fillRect(x-14,183,3,5);g.fillRect(x+8,183,2,7);g.fillStyle='#1d1a17';g.fillRect(x+12,170,1,6)});
 SWZ.forEach(z=>{const x0=Math.max(0,Math.round(z[0]-c)),x1=Math.min(384,Math.round(z[1]-c));if(x1<=x0)return;g.globalAlpha=.28+.07*Math.sin(t*1.5+z[0]);g.fillStyle='#6b5a2e';g.fillRect(x0,96,x1-x0,106);g.globalAlpha=1;
  const x=Math.round(z[0]+30-c);if(x<-60||x>440)return;g.fillStyle='#8b99a6';g.fillRect(x-8,192,18,10);g.fillStyle='#5b6670';g.fillRect(x-8,192,18,2);g.fillRect(x+6,190,6,12);g.fillStyle='#1d1a17';g.fillRect(x-6,194,6,6);
  for(let k=0;k<11;k++){const a=(t*16+k*9.5)%100;g.globalAlpha=Math.max(0,.62-a/160);el(g,Math.round(x-2+Math.sin(a*.09+k)*6+a*.12),Math.round(192-a),3+Math.round(a*.05),3+Math.round(a*.04),k&1?'#4a3f1e':'#2a1f2e')}g.globalAlpha=1});
 for(let i=0;i<9;i++){const wx=(i*173+t*(10+(i%3)*4))%1560,x=Math.round(wx-c);if(zi(wx)||x<-8||x>392)continue;const y=Math.round(50+((i*41)%130)+Math.sin(t*2+i)*4);g.fillStyle='rgba(220,245,255,.55)';g.fillRect(x-3,y-1,6,3);g.fillRect(x-6,y-2+(((t*8+i)|0)&1),2,4);g.fillStyle='#10181c';g.fillRect(x+1,y-1,1,1)}
 [150,640,1100].forEach((fx,j)=>{const x=Math.round(fx-c),y=Math.round(24+Math.sin(t*1.3+j));if(x<-14||x>398)return;el(g,x,y,7,2,'#d8d0b8');g.fillStyle='#9aa09a';g.fillRect(x-10,y-2,3,5);g.fillStyle='#1d1a17';g.fillRect(x+3,y-1,1,1);g.fillRect(x+4,y,1,1)});
 if(fOn())focusDim();
 w.ar.forEach(a=>{if(a.u)return;const x=Math.round(a.x-c),y=Math.round(a.y+Math.sin(t*2+a.x)*2);if(x<-12||x>396)return;if(fOn())swGlow(t,x,y,12,11,'#8fdcff');[[0,0,4],[-5,4,3],[5,3,3],[1,-6,3],[-3,-4,2]].forEach(b=>{g.globalAlpha=.7;el(g,x+b[0],y+b[1]+Math.round(Math.sin(t*3+b[0])),b[2],b[2],'#e8fbff');g.globalAlpha=1;g.fillStyle='#9fe3ff';g.fillRect(x+b[0]-1,y+b[1]-1,1,1)})});
 w.it.forEach(i=>{if(i.g)return;const x=Math.round(i.x-c),y=Math.round(i.y+Math.sin(t*3+i.x)*2);if(x<-14||x>398)return;if(fOn())swGlow(t,x,y,13,14,'#ffd45a');g.globalAlpha=.2+.12*Math.sin(t*5+i.x);el(g,x,y,11,11,'#fff8b0');g.globalAlpha=.6;g.fillStyle='#fff8b0';for(let k=0;k<6;k++){const a=t*2+k*1.047;g.fillRect(Math.round(x+Math.cos(a)*13),Math.round(y+Math.sin(a)*13),1,1)}g.globalAlpha=1;
  g.fillStyle='#10181c';g.fillRect(x-4,y-6,8,13);g.fillStyle='#bfe9f5';g.fillRect(x-3,y-5,6,11);g.fillStyle='#6fbf4a';g.fillRect(x-3,y,6,6);g.fillStyle='#fff';g.fillRect(x-3,y-3,6,2);g.fillStyle='#c98b5a';g.fillRect(x-3,y-8,6,3);g.fillStyle='#fff';g.fillRect(x-2,y-5,1,3)});
 SWH.forEach(h=>{const p=swP(h,t),x=Math.round(p.x-c),y=Math.round(p.y);if(x<-24||x>408)return;if(fOn()&&h[0]!='f')swGlow(t,x,y,h[0]=='b'?12:13,h[0]=='b'?12:9,'#ff3a2a');
  if(h[0]=='b'){g.save();g.translate(x,y);g.rotate(Math.sin(t*1.3+h[1])*.12);g.fillStyle='#1d1a17';g.fillRect(-9,-9,18,18);g.fillStyle='#8b2e22';g.fillRect(-8,-8,16,16);g.fillStyle='#5a1f18';g.fillRect(-8,-5,16,2);g.fillRect(-8,3,16,2);g.fillStyle='#c0553f';g.fillRect(-7,-8,2,16);el(g,0,-1,3,3,'#ffd45a');g.fillStyle='#1d1a17';g.fillRect(-1,-3,2,3);g.fillRect(-1,1,2,1);g.fillStyle='#5a6a2a';g.fillRect(-3,-10,6,2);g.restore();g.fillStyle='#6a7a2a';for(let k=0;k<3;k++){g.globalAlpha=.7-k*.2;g.fillRect(x+4+k*2,y-12-(((t*14+k*5+h[1])%12)|0),2,2)}g.globalAlpha=1}
  else if(h[0]=='o'){el(g,x,y,11,7,'#1d1618');el(g,x-3,y-2,5,2,'#5a4a6a');g.globalAlpha=.75;g.fillStyle='#7b5cff';g.fillRect(x+2,y+1,4,1);g.fillStyle='#43B95C';g.fillRect(x-6,y+2,4,1);g.fillStyle='#ffd45a';g.fillRect(x-1,y-4,3,1);g.globalAlpha=1}
  else{const d=p.d;el(g,x,y,10,5,'#1d3a2f');el(g,x,y,9,4,'#6fbf4a');el(g,x,y+2,6,2,'#d8e8b0');g.fillStyle='#2f7d3a';g.fillRect(x-d*2-2,y-7,4,2);g.fillStyle='#1d3a2f';g.fillRect(x-d*11,y-4-(((t*8)|0)&1),3,8);g.fillRect(x-d*14,y-6,2,12);g.fillStyle='#fff';g.fillRect(x+d*5,y-2,2,2);g.fillStyle='#000';g.fillRect(x+d*6,y-2,1,1);g.fillRect(x+d*8,y+1,3,1);g.fillStyle='#fff';g.fillRect(x+d*8,y+2,1,1);el(g,x-d,y,3,3,'#3a2a22');el(g,x-d,y,2,2,'#ffd45a');g.fillStyle='#2f8f4a';g.fillRect(x-d-1,y-1,2,2)}});
 {const x=Math.round(1500-c),y=110,op=w.got>=5,lb=op?'PORTAL':'FECHADO';if(x>-30&&x<414){if(op){for(let i=0;i<4;i++)for(let k=0;k<22;k++){const a=k/22*6.283+t*(2+i*.7)*(i&1?-1:1),r=17-i*3.5;g.fillStyle=['#b36cff','#e6c8ff','#7b5cff','#ffffff'][i];g.fillRect(Math.round(x+Math.cos(a)*r*.7),Math.round(y+Math.sin(a)*r*1.3),2,2)}g.globalAlpha=.5+.3*Math.sin(t*6);el(g,x,y,7,12,'#f1e2ff');g.globalAlpha=1}
  else{g.globalAlpha=.55;g.fillStyle='#8b99a6';for(let k=0;k<22;k++){const a=k/22*6.283;g.fillRect(Math.round(x+Math.cos(a)*12),Math.round(y+Math.sin(a)*22),2,2)}g.globalAlpha=1}pt3(lb,x-(tw(lb)>>1),y+30,'#fff4d0')}}
 if(!(w.inv>0&&((t*14)|0)%2)){const sp=Math.hypot(w.vx,w.vy),st=sp>14,fr=((w.t*(st?9:2.5))|0)&3,pi=Math.max(-.65,Math.min(.65,w.vy*.011)),im=lecoCv(st?1:2,st?fr:0,0,0);
  if(sp>55){g.fillStyle='rgba(255,255,255,.35)';for(let k=0;k<3;k++)g.fillRect(Math.round(w.x-c-w.dir*(16+k*6)),Math.round(w.y-4+k*4),8,1)}
  g.save();g.translate(Math.round(w.x-c),Math.round(w.y+Math.sin(w.t*3)*1.3));g.scale(w.dir,1);g.rotate(pi);g.drawImage(im,-(im.width>>1),-(im.height>>1));g.restore()}
 g.fillStyle='#e8fbff';w.bb.forEach(b=>{g.globalAlpha=Math.min(1,b.l);const r=b.l>.8?2:1;g.fillRect(Math.round(b.x-c),Math.round(b.y),r+1,r+1)});g.globalAlpha=1;
 g.fillStyle='rgba(29,58,47,.8)';g.fillRect(4,3,92,24);pt3('AMOSTRAS '+w.got+' DE 5',8,7,'#fff4d0');pt3('FOLEGO',8,18,'#fff4d0');g.fillStyle='#10181c';g.fillRect(38,17,54,7);g.fillStyle='#3a4a58';g.fillRect(39,18,52,5);g.fillStyle=w.br<25?(((t*6)|0)%2?'#ffffff':'#e2564b'):'#7fd8ff';g.fillRect(39,18,Math.round(w.br*.52),5);
 for(let i=0;i<3;i++)el(g,350+i*10,9,3,3,i<w.hp?'#e2564b':'#3a4a58');
 if(w.br<30){g.fillStyle='rgba(120,0,0,'+(.22*(1-w.br/30)*(.6+.4*Math.sin(t*8)))+')';g.fillRect(0,0,384,216)}if(w.zn){g.fillStyle='rgba(60,45,20,.18)';g.fillRect(0,0,384,216)}
 if(w.mt>0)txt(w.msg,192,208);
 if(w.t<.6){g.fillStyle='rgba(255,255,255,'+(1-w.t/.6)+')';g.fillRect(0,0,384,216)}}

// ---------- RIO ESQUECIDO: NARRATIVA DE ABERTURA (margem, cano 4 e cachoeira) ----------
let cs=null;
const CNL=[['ROSA','Leco, olha aquela placa: ÁGUA PROTEGIDA. Mas o cano 4 despeja uma lama estranha no rio.'],
['LECO','Os peixes estão boiando de barriga para cima. Isso não parece proteção.'],
['ROSA','A empresa jura que é totalmente verde. Mas relatório bonito e placa pintada não provam nada. Só a água prova.'],
['ROSA','Dizem que a fábrica escondeu amostras do que despejava, atrás da cachoeira. Sem elas, é a palavra deles contra a nossa.'],
['LECO','Então eu vou buscar. É só prender o fôlego e trazer as provas.'],
['ROSA','Cuidado! Lá embaixo o ar acaba rápido e a lama deixa tudo pior. Procure bolsas de ar e volte vivo!']];
function cwrap(s,m){const o=[];let l='';s.split(' ').forEach(x=>{if((l+' '+x).trim().length>m){o.push(l);l=x}else l=(l+' '+x).trim()});o.push(l);return o}
function rosaW(x,y,fl,w){g.save();g.translate(Math.round(x),Math.round(y));if(fl)g.scale(-1,1);g.fillStyle='rgba(0,0,0,.18)';g.fillRect(-6,0,12,1);g.fillStyle='#5a3a2a';g.fillRect(-4,-8,3,8);g.fillRect(1,-8,3,8);g.fillStyle='#d84f4f';g.fillRect(-6,-22,12,15);g.fillStyle='#f6e7b4';g.fillRect(-4,-18,8,9);g.fillStyle='#c98b5a';g.fillRect(-8,-20,2,8);g.fillRect(6,-22-w*3,2,8);el(g,0,-27,5,5,'#c98b5a');g.fillStyle='#2b2420';g.fillRect(-5,-31,10,3);g.fillStyle='#e3c27b';g.fillRect(-8,-33,16,2);g.fillRect(-5,-36,10,3);g.fillStyle='#1d1a17';g.fillRect(-3,-28,1,2);g.fillRect(0,-28,1,2);g.fillRect(-3,-24,2,1);g.restore()}
function cineStart(){S.mode='cine';cs={i:0,t:0,c:0,ph:0,pt:0};$('hs').textContent='Rio Esquecido · Narrativa';sfx(200,.3,'sine',120)}
function cineNext(){if(!cs||cs.ph)return;const n=CNL[cs.i][1].length;if(cs.c<n){cs.c=n;return}if(cs.i<CNL.length-1){cs.i++;cs.c=0;sfx(520,.05,'square')}else{cs.ph=1;cs.pt=0;sfx(300,.5,'sine',700)}}
function cineStep(dt){cs.t+=dt;if(cs.ph){cs.pt+=dt;if(cs.pt>=2.7){cs=null;swimGo()}}else cs.c=Math.min(CNL[cs.i][1].length,cs.c+dt*38)}
addEventListener('pointerdown',e=>{if(S.mode=='cine'&&e.target.id=='c')cineNext()});
function cineDraw(){const t=cs.t,pt=cs.pt,ph=cs.ph;g.setTransform(1,0,0,1,0,0);g.imageSmoothingEnabled=false;g.globalAlpha=1;
 ['#9fd3e6','#a6d0d2','#b3cbb8','#bec7a4','#c8c298'].forEach((k,i)=>{g.fillStyle=k;g.fillRect(0,i*30,384,30)});
 g.fillStyle='#8fb88a';for(let x=0;x<384;x+=4)g.fillRect(x,Math.round(104+Math.sin(x*.035)*9+Math.sin(x*.013)*12),4,80);
 g.fillStyle='#6fa36f';for(let x=0;x<384;x+=4)g.fillRect(x,Math.round(122+Math.sin(x*.05+2)*6),4,60);
 const pa=ph?Math.min(1,pt/1.2):0;
 g.fillStyle='#7d6a58';g.fillRect(270,40,114,136);for(let y=46;y<176;y+=14){g.fillStyle='#6a5846';g.fillRect(270,y,114,2)}for(let y=40;y<176;y+=6){g.fillStyle='#7d6a58';g.fillRect(270-((y*7)&3),y,4,6)}
 g.fillStyle='#64C75B';g.fillRect(270,40,114,5);g.fillStyle='#5e3a24';g.fillRect(348,22,4,18);el(g,350,18,10,8,'#3c8a3a');g.fillStyle='#6a5846';g.fillRect(288,50,38,4);
 g.globalAlpha=.12+.05*Math.sin(t*2)+.8*pa;el(g,307,118,10,26,'#b36cff');g.globalAlpha=.1+.7*pa;el(g,307,118,5,16,'#f1e2ff');g.globalAlpha=1;
 if(pa>0)for(let i=0;i<3;i++)for(let k=0;k<20;k++){const a=k/20*6.283+t*(2+i*.7)*(i&1?-1:1),r=24-i*4;g.globalAlpha=pa;g.fillStyle=['#b36cff','#e6c8ff','#7b5cff'][i];g.fillRect(Math.round(307+Math.cos(a)*r*.5),Math.round(118+Math.sin(a)*r*1.1),2,2)}g.globalAlpha=1;
 g.fillStyle='#7c8791';g.fillRect(150,98,100,52);g.fillStyle='#5b6670';g.fillRect(146,94,108,6);g.fillStyle='#6b7681';g.fillRect(166,64,12,34);g.fillRect(226,64,12,34);g.fillStyle='#c0392b';g.fillRect(166,64,12,4);g.fillRect(226,64,12,4);
 for(let i=0;i<5;i++){g.fillStyle=((t*2+i)|0)%5==0?'#ffd45a':'#3a4a58';g.fillRect(156+i*18,110,8,8)}g.fillStyle='#3a4a58';g.fillRect(205,134,14,16);g.fillStyle='#2f8f4a';g.fillRect(186,122,26,10);pt3('ECO',192,125,'#ffffff');
 [172,232].forEach((cx,j)=>{for(let i=0;i<7;i++){const a=(t*9+i*9+j*5)%63,y=62-a,x=cx+Math.sin(a*.12+j)*5+a*.35,r=3+a*.08;g.globalAlpha=Math.max(0,.75-a/70);el(g,Math.round(x),Math.round(y),Math.round(r),Math.round(r*.8),i&1?'#8a8f84':'#a3a89a')}});g.globalAlpha=1;
 g.fillStyle='#5e3a24';g.fillRect(10,112,3,38);g.fillRect(52,112,3,38);g.fillStyle='#1d3a2f';g.fillRect(4,90,58,28);g.fillStyle='#2f8f4a';g.fillRect(5,91,56,26);el(g,14,99,4,3,'#a6e07a');pt3('ÁGUA',22,95,'#fff4d0');pt3('PROTEGIDA',10,105,'#fff4d0');g.fillStyle='#7a6a2e';g.fillRect(40,111,8,3);
 g.fillStyle='#9A6848';g.fillRect(0,150,270,26);g.fillStyle='#7d5238';for(let x=0;x<270;x+=9)g.fillRect(x,158+((x*7)&7),4,2);g.fillStyle='#64C75B';g.fillRect(0,150,270,4);for(let x=2;x<270;x+=7)g.fillRect(x,148-(x&1),2,2);
 ['#7b8f55','#6e8248','#617640','#566a38'].forEach((k,i)=>{g.fillStyle=k;g.fillRect(0,176+i*10,384,10)});
 g.fillStyle='rgba(220,230,170,.35)';for(let i=0;i<30;i++)g.fillRect(Math.round(((i*53+t*12*(1+(i%3)*.3))%400)-8),180+((i*17)%34),8,1);
 g.globalAlpha=.3;['#7b5cff','#43B95C','#ffd45a','#e2564b'].forEach((k,i)=>{g.fillStyle=k;for(let j=0;j<4;j++)g.fillRect(Math.round(((j*97+i*23+t*6)%420)-20),178+i*2+(j&1)*8,14,1)});g.globalAlpha=1;
 const gap=ph?Math.min(11,Math.max(0,(pt-.7)*18)):0;
 for(let x=292;x<322;x++){if(Math.abs(x-307)<gap)continue;g.globalAlpha=.78;g.fillStyle=(x&3)?'#bfe9f5':'#e6f7ff';g.fillRect(x,54,1,122)}g.globalAlpha=1;g.fillStyle='#ffffff';for(let x=292;x<322;x+=2){if(Math.abs(x-307)<gap)continue;g.fillRect(x,Math.round(54+((t*80+x*17)%110)),1,9)}
 g.globalAlpha=.5;for(let k=0;k<9;k++)el(g,Math.round(292+k*3.6),Math.round(174+Math.sin(t*3+k)*2),5,3,'#ffffff');g.globalAlpha=1;
 g.fillStyle='#5b6670';g.fillRect(132,157,16,12);g.fillStyle='#1d1a17';g.fillRect(134,159,12,8);g.fillStyle='#c3ccd5';g.fillRect(150,158,8,8);pt3('4',153,159,'#1d1a17');
 for(let y=164;y<178;y+=2){g.fillStyle=(y&2)?'#7a6a2e':'#4f5a2a';g.fillRect(137+Math.round(Math.sin(t*6+y)),y,5,2)}g.fillStyle='#4f5a2a';for(let k=0;k<4;k++)g.fillRect(138+(k%3),164+Math.round((t*40+k*7)%14),2,3);
 g.globalAlpha=.6;el(g,142,184,18+Math.round(Math.sin(t*2)*3),4,'#4a3f1e');g.globalAlpha=1;
 [[34,0],[205,1],[250,0]].forEach(f=>{const x=f[0],y=Math.round(182+Math.sin(t*1.5+x)*1.2);el(g,x,y,7,3,'#d8d0b8');g.fillStyle='#9aa09a';g.fillRect(x-10,y-2,3,5);g.fillStyle='#1d1a17';g.fillRect(x+3,y-1,1,1);g.fillRect(x+4,y,1,1)});
 let lx=70,ly=150,rot=0,vis=1;
 if(ph){if(pt<1.1){const u=pt/1.1;lx=70+192*(u*u*(3-2*u));ly-=Math.abs(Math.sin(pt*16))*3}else if(pt<2){const u=(pt-1.1)/.9;lx=262+38*u;ly=150-54*u-46*Math.sin(Math.PI*u);rot=.5*Math.sin(Math.PI*u)}else vis=0}
 else{const d=CNL[cs.i];if(d[0]=='LECO'&&cs.c<d[1].length)ly-=Math.abs(Math.sin(t*14))*2;ly-=Math.sin(t*2.5)*.6}
 if(!ph||pt<1.3){const d=ph?['ROSA','',1]:CNL[cs.i],sp=!ph&&d[0]=='ROSA'&&cs.c<d[1].length,x=122,y=150,w=ph||sp?(Math.sin(t*10)>0?1:0):0;
  g.fillStyle='#5a3a2a';g.fillRect(x-4,y-8,3,8);g.fillRect(x+1,y-8,3,8);g.fillStyle='#d84f4f';g.fillRect(x-6,y-22,12,15);g.fillStyle='#f6e7b4';g.fillRect(x-4,y-18,8,9);g.fillStyle='#c98b5a';g.fillRect(x-8,y-20,2,8);g.fillRect(x+6,y-22-w*3,2,8);
  el(g,x,y-27,5,5,'#c98b5a');g.fillStyle='#2b2420';g.fillRect(x-5,y-31,10,3);g.fillStyle='#e3c27b';g.fillRect(x-8,y-33,16,2);g.fillRect(x-5,y-36,10,3);g.fillStyle='#1d1a17';g.fillRect(x-3,y-28,1,2);g.fillRect(x,y-28,1,2);g.fillRect(x-3,y-24-(sp?w:0),2,1)}
 if(vis){g.save();g.translate(Math.round(lx),Math.round(ly));g.rotate(rot);g.drawImage(lecoCv(0,0,0,0),-13,-22);g.restore()}
 if(ph&&pt>=2){const u=pt-2;g.fillStyle='#e8fbff';for(let k=0;k<16;k++){const a=k/16*6.283;g.fillRect(Math.round(307+Math.cos(a)*u*45),Math.round(112+Math.sin(a)*u*45-u*10+u*u*60),2,2)}g.fillStyle='rgba(230,200,255,'+Math.min(1,u/.7)+')';g.fillRect(0,0,384,216)}
 if(!ph){const d=CNL[cs.i],ln=cwrap(d[1],86),col=d[0]=='ROSA'?'#ffd45a':'#7BC98E';g.fillStyle='#f6e7b4';g.fillRect(5,3,374,48);g.fillStyle='#1d3a2f';g.fillRect(6,4,372,46);g.fillStyle=col;g.fillRect(6,4,372,1);pt3(d[0]=='ROSA'?'DONA ROSA':'LECO',11,8,col);
  let n=cs.c|0;ln.forEach((q,i)=>{if(n>0)pt3(q.slice(0,n),11,19+i*8,'#fff4d0');n-=q.length+1});
  if(cs.c>=d[1].length){pt3('ESPAÇO OU TOQUE',290,44,'#8aa897');if(((t*3)|0)%2){g.fillStyle='#ffd45a';g.fillRect(366,42,6,3);g.fillRect(367,45,4,1)}}}
 else if(pt<2)txt('RESPIRE FUNDO!',192,62);
 if(t<.8){g.fillStyle='rgba(0,0,0,'+(1-t/.8)+')';g.fillRect(0,0,384,216)}}

// ---------- LOOP E ENTRADA ----------

// ---------- FISCAIS DO GREENWASHING (fases 4 a 6): inimigos que atiram · 3 linguadas · selo dourado + folha ----------
let foes=[],shots=[],sealFx=null;
const FOE=[
{ph:3,n:'PLANTADOR DE PAPEL',seal:'Fiscal Ativo: Plantador de Papel',per:2.7,intro:'Plantador de Papel jura ter reflorestado tudo… com árvores de papel! Ele dispara aviões de promessas vazias. 3 linguadas (Espaço) o desmascaram!',msg:'Avião de promessas! Desvie dele.'},
{ph:4,n:'DR. SELO-FACIL',seal:'Fiscal Ativo: Dr. Selo-Fácil',per:2.5,intro:'Dr. Selo-Fácil vende certificados “verdes” sem auditar nada e arremessa carimbos APROVADO. 3 linguadas (Espaço) revogam o selo dele!',msg:'Carimbo falso! Desvie dele.'},
{ph:5,n:'CORTINA DE FUMACA',seal:'Fiscal Ativo: Sra. Cortina de Fumaça',per:3.1,intro:'Sra. Cortina de Fumaça esconde a poluição atrás de nuvens com a palavra ECO. 3 linguadas (Espaço) dissipam a fumaça dela!',msg:'Fumaça maquiada de ECO! Desvie dela.'},
{ph:4,n:'ANALISTA MAQUIADO',seal:'Fiscal Ativo: Analista Maquiado',per:3,intro:'O Analista Maquiado edita relatórios para parecerem 100% verdes e mira gráficos falsos direto em você! Ele anda sem parar. 3 linguadas (Espaço) o fazem renunciar!',msg:'Gráfico falso mirado em você!'},
{ph:5,n:'LOBISTA DO PETROLEO',seal:'Fiscal Ativo: Lobista do Petróleo',per:3.3,intro:'O Lobista do Petróleo pinta de verde o que continua sujo e cospe petróleo na sua direção! Ele anda sem parar. 3 linguadas (Espaço) cortam o patrocínio dele!',msg:'Petróleo disfarçado de verde!'}];
function spawnFoes(){foes=[];shots=[];sealFx=null;if(S.li<3||bossOnly)return;
 const PL={3:[[0,.62]],4:[[1,.36],[3,.86]],5:[[2,.3],[4,.76]]}[S.li],gs0=st.filter(p=>p[1]==180&&p[3]>=36&&p[2]>=110&&p[0]>120).map(p=>({p,c:Math.round(p[0]+p[2]/2)}));
 PL.forEach(([t,fr],j)=>{const tx=L.w*fr,lim=S.li==5?L.w-80:S.li==4?L.w-140:L.w,gs=gs0.filter(o=>o.c<=lim&&!foes.some(q=>Math.abs(q.x-o.c)<160));
  const ok=gs.filter(o=>!sk.some(k=>Math.abs(k[0]-o.c)<45)&&!wk.some(w=>w.y==180&&w.a<o.c+25&&w.b>o.c-25)&&!dr.some(d=>Math.abs(d.x-o.c)<30)&&!zp.some(z=>Math.abs(z.x-o.c)<30)&&Math.abs(o.c-(L.qx||-999))>45);
  const fx=S.li==3?st.find(q=>q[0]==1010&&q[1]==180&&q[2]==90):null,pk=fx?{p:fx,c:1060}:(ok.length?ok:gs).sort((a,b)=>Math.abs(a.c-tx)-Math.abs(b.c-tx))[0];if(!pk)return;
  const key='l'+S.li+'-e'+j,o={x:pk.c,y:180,t:t,hp:3,flash:0,cd:1.4,wind:0,bt:0,f:-1,seen:0,k:key,dead:!!S.lv[key],a:pk.p[0]+16,b:pk.p[0]+pk.p[2]-16,d:1};
  st=st.filter(q=>!(q[1]<180&&q[1]+q[3]>=179&&o.x+9>q[0]&&o.x-9<q[0]+q[2]));
  if(t>=3){const fr=x=>!st.some(q=>x+7>q[0]&&x-7<q[0]+q[2]&&q[1]<179&&q[1]+q[3]>154);let a=o.x,b=o.x;while(a>o.a&&fr(a-1))a--;while(b<o.b&&fr(b+1))b++;o.a=a;o.b=b}
  if(S.li==3)hz=hz.filter(h=>h.b<o.x-80||h.a>o.x+80);foes.push(o)})}
function foeShot(s){const k=s.t,y=s.y-12,f=s.f;sfx(k==1?260:k==2?140:520,.12,'square',k==2?90:760);
 if(k==0){const ay=Math.max(-70,Math.min(70,((P.y-9)-y)/(Math.max(40,Math.abs(P.x-s.x))/88)));shots.push({k:0,x:s.x+f*10,y:y,y0:y,vx:f*88,vy:ay,g:0,t:0})}
 else if(k==1){const d=Math.abs(P.x-s.x);shots.push({k:1,x:s.x+f*8,y:y-4,vx:f*Math.max(48,Math.min(118,d*.55)),vy:-125,g:260,t:0})}
 else if(k==2)shots.push({k:2,x:s.x+f*12,y:y,vx:f*68,vy:0,g:0,t:0});else{const tx=P.x-s.x,ty=(P.y-9)-y,dl=Math.hypot(tx,ty)||1,sp=k==3?82:92;shots.push({k:k,x:s.x+f*10,y:y,vx:tx/dl*sp,vy:ty/dl*sp,g:0,t:0})}shots[shots.length-1].m=FOE[k].msg}
function sAt(x,a,b){return st.some(q=>x>q[0]&&x<q[0]+q[2]&&q[1]<b&&q[1]+q[3]>a)}
function walkAI(s,dt){
 if(!s.seen){s.x+=s.d*26*dt;if(s.x>s.b)s.d=-1;if(s.x<s.a)s.d=1;return}
 s.hx=s.hx||s.x;s.vy=s.vy||0;s.vx=s.vx||0;
 const sf=st.concat(vs.filter(r=>r.v.mode||((lt+r.v.off)%r.v.per)<r.v.per-r.v.hid-1.2||
  (s.vy==0&&s.x>r[0]&&s.x<r[0]+r[2]&&Math.abs(r[1]-s.y)<2)),mv.map(m=>[m.x,m.y,m.w,8])),
  at=(x,a,b)=>sf.some(q=>x>q[0]&&x<q[0]+q[2]&&q[1]<b&&q[1]+q[3]>a),
  tp=(x,a,b)=>{let t=null;sf.forEach(q=>{if(x>q[0]&&x<q[0]+q[2]&&q[1]>=a&&q[1]<=b&&
   (t==null||q[1]<t))t=q[1]});return t},
  og=s.vy==0&&at(s.x,s.y+.5,s.y+3);
 let dir=P.x>s.x+4?1:P.x<s.x-4?-1:(Math.abs(P.y-s.y)>24?(s.d||1):0);
 if(og){let go=dir,jmp=0,jv=240,zw=0;
  if(dir){const ax=s.x+dir*9,
    wl=sf.filter(q=>ax>q[0]&&ax<q[0]+q[2]&&q[1]<s.y-3&&q[1]+q[3]>s.y-22),
    jvf=t=>Math.min(300,Math.max(240,Math.sqrt(1600*(Math.max(0,s.y-t)+8)))),
    rch=(k,t)=>{const v=jvf(t);return k<=80*(v+Math.sqrt(Math.max(0,v*v-1600*(s.y-t))))/800*.85},
    spk=(x,t)=>sk.some(q=>x>q[0]-6&&x<q[0]+q[2]+6&&Math.abs(q[1]-t)<8),
    fd=(a,b,ks)=>{for(const k of ks){const x=s.x+dir*k,t=tp(x,a,b);
     if(t!=null&&!at(x,t-22,t-2)&&!spk(x,t)&&rch(k,t))return t}return null};
   if(wl.length){const h=s.y-Math.min(...wl.map(q=>q[1]));
    if(h<=48){jmp=1;jv=jvf(s.y-h)}else go=0}
   else if(!at(s.x+dir*10,s.y+.5,s.y+3)){const dx=s.x+dir*18,
    dt2=P.y>s.y+10?tp(dx,s.y+3,190):null;
    if(dt2!=null&&!spk(dx,dt2))go=dir;
    else{const t=fd(s.y-50,s.y+14,[14,22,30,38]);if(t!=null){jmp=1;jv=jvf(t)}else go=0}}
   else{const t=P.y<s.y-14?fd(s.y-54,s.y-6,[10,18,26,34]):null;
    if(t!=null){jmp=1;jv=jvf(t)}
    else if(sk.some(k=>Math.abs(k[1]-s.y)<5&&s.x+dir*12>k[0]-2&&s.x+dir*12<k[0]+k[2]+2))jmp=1}
   if(zp.some(z=>{const d=(z.x-s.x)*dir;return d>10&&d<30&&z.u>.2&&z.u<.95}))go=0,zw=1}
  s.vx=go*34;if(jmp){s.vy=-jv;s.vx=dir*80}
  s.sk2=(dir&&!go&&!jmp&&!zw)?(s.sk2||0)+dt:0;
  if(s.sk2>1.5){s.vy=-300;s.vx=dir*80;s.sk2=0}}
 const sg=Math.sign(s.vx),nx=s.x+s.vx*dt,oy=s.y;
 if(!(sg&&at(nx+sg*7,s.y-22,s.y-3)))s.x=Math.max(10,Math.min(L.w-10,nx));
 s.vy=Math.min(s.vy+800*dt,400);s.y+=s.vy*dt;
 if(s.vy>=0){const q=sf.find(q=>s.x>q[0]&&s.x<q[0]+q[2]&&q[1]>=oy-1&&q[1]<=s.y);
  if(q){s.y=q[1];s.vy=0}}
 else if(at(s.x,s.y-30,s.y-24))s.vy=.01;
 if(s.y>215){s.x=s.hx;s.y=180;s.vy=s.vx=0}}
function foeStep(dt){if(!foes.length)return;sealFx&&(sealFx.t-=dt)>0||(sealFx=null);
 foes.forEach(s=>{if(s.dead)return;s.flash=Math.max(0,s.flash-dt);if(s.t>=3)walkAI(s,dt);s.f=P.x>=s.x?1:-1;const d=Math.abs(P.x-s.x),act=d<250&&Math.abs(P.y-s.y)<110&&vict<=0;
  if(act&&!s.seen){s.seen=1;toast(FOE[s.t].intro,6500)}
  if(act){s.cd-=dt;s.wind=s.cd<.45?1:0;if(s.cd<=0){foeShot(s);s.cd=FOE[s.t].per;if(s.t==2)s.bt=.38}}else{s.wind=0;s.cd=Math.max(s.cd,.9)}
  if(s.bt>0){s.bt-=dt;if(s.bt<=0)foeShot(s)}
  if(d<11&&P.y>s.y-20&&P.y-13<s.y){if(inv>0||(P.vy>40&&P.y<s.y-12)){const sd=P.x>=s.x?1:-1;P.x=s.x+sd*11.5;if(P.vx*sd<0)P.vx=0}else hurt('Um fiscal do greenwashing! Use a língua (Espaço) à distância.')}});
 shots=shots.filter(p=>{p.t+=dt;p.x+=p.vx*dt;p.vy+=p.g*dt;p.y=p.k==0?(p.y0+=p.vy*dt)+Math.sin(p.t*6)*8:p.y+p.vy*dt;const r=p.k==2?4+Math.min(2,p.t):4;
  if(p.t>6||p.x<cam-40||p.x>cam+424||p.y>206||p.y<-20)return false;
  if(st.concat(vs,mv.map(m=>[m.x,m.y,m.w,8])).some(q=>p.x>q[0]&&p.x<q[0]+q[2]&&p.y>q[1]&&p.y<q[1]+q[3])){burst(p.x,p.y,['#fff8e6','#e2564b','#8b99a6','#6fbf4a','#7b5cff'][p.k]||'#fff',6);return false}
  if(camT<=0&&inv<=0&&Math.abs(P.x-p.x)<6+r&&P.y-14<p.y+r&&P.y>p.y-r){hurt(p.m||'Tiro do greenwashing!');return false}
  return true})}
function hitFoe(i){const s=foes[i];s.hp--;tg=.28;tgT=-1;tongueTarget={x:s.x,y:s.y-10,type:'enemy'};tongueCooldown=.5;s.flash=.3;s.cd=Math.max(s.cd,1);burst(s.x,s.y-12,'#ffd45a',8);sfx(300,.15,'square',900);
 if(s.hp>0){toast('Acertou! Faltam '+s.hp+' linguada'+(s.hp>1?'s':'')+'.',1300);return}
 s.dead=1;shots=[];S.sc+=80;if(phaseStats)phaseStats.enemies++;if(!S.bd.includes(FOE[s.t].seal))S.bd.push(FOE[s.t].seal);
 if(!S.lv[s.k]&&!lf.some(f=>f.k==s.k))lf.push({x:s.x,y:s.y-12,k:s.k});sealFx={x:s.x,y:s.y-26,t:3};burst(s.x,s.y-14,'#ffd45a',22);jingle(WIN);toast('FISCAL ATIVO! Selo dourado conquistado · +80 pontos · uma folha caiu!',4500);save()}
function goldSeal(x,y,k=1){x=Math.round(x);y=Math.round(y);const R=Math.round(9*k),r=Math.round(8*k),m=Math.round(6*k),c=Math.round(3.5*k);el(g,x,y,R,R,'#3a2a22');el(g,x,y,r,r,'#c98a12');el(g,x,y,r-1,r-1,'#ffd45a');el(g,x,y,m,m,'#ffb02e');el(g,x,y,m-1,m-1,'#fff1a8');
 g.fillStyle='#c98a12';g.fillRect(x-1,y-c,2,c*2);g.fillRect(x-c,y-1,c*2,2);g.fillStyle='#fff';const a=T*3,sx2=Math.round(x+Math.cos(a)*r*.7),sy2=Math.round(y+Math.sin(a)*r*.7);g.fillRect(sx2,sy2,1,1);
 if(((T*6)|0)%2){g.fillRect(x-r-2,y-r,3,1);g.fillRect(x-r-1,y-r-1,1,3)}else{g.fillRect(x+r,y+r-2,3,1);g.fillRect(x+r+1,y+r-3,1,3)}}
function drawFoes(){shots.forEach(p=>{const x=Math.round(p.x-cam),y=Math.round(p.y),I='#1d1a17';
  if(p.k==0){g.fillStyle=I;g.fillRect(x-5,y-2,11,5);g.fillStyle='#fff8e6';g.fillRect(x-4,y-1,9,3);g.fillStyle='#c3ccd5';g.fillRect(x-4,y+1,6,1);g.fillStyle='#6fbf4a';g.fillRect(x+3,y-1,2,1)}
  else if(p.k==1){const sp=((T*10)|0)%2;g.fillStyle=I;g.fillRect(x-4,y-4,9,9);g.fillStyle='#e2564b';g.fillRect(x-3,y-3,7,7);g.fillStyle='#ff8a7a';g.fillRect(x-3,y-3,7,1);g.fillStyle='#fff8e6';g.fillRect(x-2,y,2,1);g.fillRect(x-1,y+1,2,1);g.fillRect(x+1,y-1,2,2);if(sp){g.fillStyle='#fff';g.fillRect(x+4,y-5,1,1)}}
  else if(p.k==2){const r=Math.round(4+Math.min(2,p.t));el(g,x,y,r+1,r+1,I);el(g,x,y,r,r,'#8b99a6');el(g,x-1,y-1,r-2,r-2,'#b8c5d0');g.fillStyle='#64c75b';g.fillRect(x-2,y,2,1);g.fillRect(x,y-1,2,1);g.fillRect(x+2,y-2,1,1)}
  else if(p.k==3){el(g,x,y,6,6,I);el(g,x,y,5,5,'#fff8e6');const q=((T*8)|0)%4;g.fillStyle='#6fbf4a';g.fillRect(x-4+(q==1||q==2?4:0),y-4+(q>=2?4:0),4,4);g.fillStyle='#e2564b';g.fillRect(x-4+(q==0||q==3?4:0),y-4+(q<2?4:0)*0+(q>=2?0:4),1,1)}
  else{el(g,x,y,5,5,I);el(g,x,y,4,4,'#2a2230');g.fillStyle='#7b5cff';g.fillRect(x-2,y-2,2,1);g.fillStyle='#3fd0a0';g.fillRect(x,y-1,2,1);g.fillStyle='#fff';g.fillRect(x-3,y-3,1,1);g.fillStyle='#2a2230';g.fillRect(x-(p.vx>0?7:-5),y+1,2,2)}});
 foes.forEach(s=>{if(s.dead)return;const x=Math.round(s.x-cam),y=Math.round(s.y);if(x<-30||x>414)return;const f=s.f,fl=s.flash>0&&((T*24)|0)%2,bob=Math.round(Math.sin(T*5)*.8),I='#1d1a17',w=s.wind&&((T*14)|0)%2;
  g.fillStyle='rgba(0,0,0,.2)';g.fillRect(x-8,y,16,1);
  if(s.t==0){const C=fl?'#fff':'#6fbf4a',D=fl?'#fff':'#3c8a3a';g.fillStyle=I;g.fillRect(x-4,y-5,3,5);g.fillRect(x+1,y-5,3,5);g.fillStyle='#8a5a38';g.fillRect(x-3,y-4,2,4);g.fillRect(x+1,y-4,2,4);
   g.fillStyle=I;g.fillRect(x-7,y-15+bob,14,11);g.fillStyle=C;g.fillRect(x-6,y-14+bob,12,9);g.fillStyle=D;g.fillRect(x-6,y-8+bob,12,1);g.fillStyle='#fff8e6';g.fillRect(x-2,y-14+bob,4,3);
   el(g,x,y-18+bob,5,5,I);el(g,x,y-18+bob,4,4,fl?'#fff':'#f2c9a0');g.fillStyle=I;g.fillRect(x+f*1,y-19+bob,1,2);g.fillRect(x+f*3-1,y-19+bob,1,2);g.fillRect(x-1+f,y-15+bob,4,1);
   g.fillStyle=I;g.fillRect(x-6,y-25+bob,12,4);g.fillStyle=fl?'#fff':'#ffd45a';g.fillRect(x-5,y-24+bob,10,2);g.fillStyle=I;g.fillRect(x-7+(f>0?0:0),y-22+bob,14,1);
   g.fillStyle='#fff8e6';g.fillRect(x+f*8-2,y-12+bob-(w?3:0),5,3);g.fillStyle='#c3ccd5';g.fillRect(x+f*8-2,y-10+bob-(w?3:0),3,1);g.fillStyle=I;g.fillRect(x-1,y-27+bob,3,3);g.fillStyle='#fff8e6';g.fillRect(x,y-27+bob,1,2)}
  else if(s.t==1){const C=fl?'#fff':'#263a53',B=fl?'#fff':'#c3ccd5';g.fillStyle=I;g.fillRect(x-4,y-5,3,5);g.fillRect(x+1,y-5,3,5);g.fillStyle='#3a4658';g.fillRect(x-3,y-4,2,4);g.fillRect(x+1,y-4,2,4);
   g.fillStyle=I;g.fillRect(x-7,y-15+bob,14,11);g.fillStyle=C;g.fillRect(x-6,y-14+bob,12,9);g.fillStyle='#fff8e6';g.fillRect(x-1,y-14+bob,3,5);g.fillStyle='#e2564b';g.fillRect(x,y-13+bob,1,5);
   el(g,x,y-18+bob,5,5,I);el(g,x,y-18+bob,4,4,fl?'#fff':'#f2c9a0');g.fillStyle=I;g.fillRect(x-2+f,y-19+bob,1,2);g.fillRect(x+2+f,y-19+bob,1,2);g.fillRect(x-1+f,y-15+bob,3,1);
   g.fillStyle=I;g.fillRect(x-1,y-29+bob,3,4);g.fillStyle='#8a5a38';g.fillRect(x,y-28+bob,1,3);g.fillStyle=I;g.fillRect(x-6,y-25+bob,12,4);g.fillStyle=B;g.fillRect(x-5,y-24+bob,10,2);g.fillStyle='#e2564b';g.fillRect(x-4,y-23+bob,8,1);
   const hy=y-12+bob-(w?4:0);g.fillStyle=I;g.fillRect(x+f*8-3,hy,7,5);g.fillStyle='#e2564b';g.fillRect(x+f*8-2,hy+1,5,3);g.fillStyle='#fff8e6';g.fillRect(x+f*8-1,hy+2,3,1)}
  else if(s.t==2){const C=fl?'#fff':'#8b99a6',D=fl?'#fff':'#566472';g.fillStyle=I;g.fillRect(x-4,y-5,3,5);g.fillRect(x+1,y-5,3,5);g.fillStyle='#3a4658';g.fillRect(x-3,y-4,2,4);g.fillRect(x+1,y-4,2,4);
   g.fillStyle=I;g.fillRect(x-7,y-20+bob,14,16);g.fillStyle=C;g.fillRect(x-6,y-19+bob,12,14);g.fillStyle=D;for(let j=0;j<14;j+=4){g.fillRect(x-6,y-19+bob+j,12,1)}g.fillStyle='#b8c5d0';g.fillRect(x-6,y-19+bob,2,14);
   g.fillStyle=I;g.fillRect(x-3+f*2,y-17+bob,2,2);g.fillRect(x+2+f*2,y-17+bob,2,2);g.fillStyle='#fff8e6';g.fillRect(x-3+f*2,y-17+bob,1,1);g.fillRect(x+2+f*2,y-17+bob,1,1);g.fillStyle=I;g.fillRect(x-2+f*2,y-12+bob,6,2);
   g.fillStyle=I;g.fillRect(x-8,y-24+bob,16,5);g.fillStyle='#e2564b';g.fillRect(x-7,y-23+bob,14,1);g.fillStyle='#fff8e6';g.fillRect(x-7,y-22+bob,14,1);g.fillStyle='#e2564b';g.fillRect(x-7,y-21+bob,14,1);
   const pf=Math.round(Math.sin(T*3)*2);el(g,x-3,y-28+bob+pf,4,3,'#566472');el(g,x+2,y-30+bob-pf,4,4,'#8b99a6');el(g,x+5,y-27+bob,3,3,'#b8c5d0');
   g.fillStyle=I;g.fillRect(x+f*8-2,y-13+bob,5,4);g.fillStyle=w?'#ffd45a':'#c3ccd5';g.fillRect(x+f*8-1,y-12+bob,3,2)}
  else if(s.t==3){const C=fl?'#fff':'#2f7a6d',lg=Math.sin(T*9)>0?1:0;g.fillStyle=I;g.fillRect(x-4,y-5+lg,3,5-lg);g.fillRect(x+1,y-4-lg+1,3,4+lg);g.fillStyle='#3a4658';g.fillRect(x-3,y-4+lg,2,4-lg);g.fillRect(x+1,y-3-lg+1,2,3+lg);
   g.fillStyle=I;g.fillRect(x-7,y-15+bob,14,11);g.fillStyle=C;g.fillRect(x-6,y-14+bob,12,9);g.fillStyle='#fff8e6';g.fillRect(x-1,y-14+bob,3,4);g.fillStyle='#6fbf4a';g.fillRect(x,y-13+bob,1,6);
   el(g,x,y-18+bob,5,5,I);el(g,x,y-18+bob,4,4,fl?'#fff':'#f2c9a0');g.fillStyle=fl?'#fff':'#5a3a28';g.fillRect(x-4,y-23+bob,9,3);g.fillStyle=I;g.fillRect(x-4+f,y-19+bob,3,2);g.fillRect(x+1+f,y-19+bob,3,2);g.fillStyle='#fff';g.fillRect(x-3+f,y-19+bob,1,1);g.fillRect(x+2+f,y-19+bob,1,1);g.fillRect(x-1+f,y-15+bob,3,1);
   const cy=y-17+bob-(w?3:0),cx=x+f*9-3;g.fillStyle=I;g.fillRect(cx,cy,7,10);g.fillStyle='#fff8e6';g.fillRect(cx+1,cy+1,5,8);g.fillStyle='#6fbf4a';g.fillRect(cx+1,cy+6,1,3);g.fillRect(cx+3,cy+4,1,5);g.fillRect(cx+5,cy+2,1,7)}
  else if(s.t==4){const C=fl?'#fff':'#2a2230',lg=Math.sin(T*9)>0?1:0;g.fillStyle=I;g.fillRect(x-4,y-5+lg,3,5-lg);g.fillRect(x+1,y-4-lg+1,3,4+lg);g.fillStyle='#3b3347';g.fillRect(x-3,y-4+lg,2,4-lg);g.fillRect(x+1,y-3-lg+1,2,3+lg);
   g.fillStyle=I;g.fillRect(x-7,y-15+bob,14,11);g.fillStyle=C;g.fillRect(x-6,y-14+bob,12,9);g.fillStyle='#3b3347';g.fillRect(x-6,y-14+bob,2,9);g.fillStyle='#fff8e6';g.fillRect(x-1,y-14+bob,3,3);g.fillStyle='#64c75b';g.fillRect(x,y-12+bob,1,6);
   el(g,x,y-18+bob,5,5,I);el(g,x,y-18+bob,4,4,fl?'#fff':'#f2c9a0');g.fillStyle=I;g.fillRect(x-4+f,y-19+bob,9,2);g.fillRect(x-1+f,y-15+bob,3,1);
   g.fillStyle=I;g.fillRect(x-6,y-24+bob,12,2);g.fillRect(x-4,y-30+bob,8,7);g.fillStyle='#ffd45a';g.fillRect(x-4,y-25+bob,8,1);g.fillStyle='#64c75b';g.fillRect(x-1,y-29+bob,2,3);
   const oy=y-13+bob-(w?3:0),ox=x+f*9-3;g.fillStyle=I;g.fillRect(ox,oy,7,8);g.fillStyle=fl?'#fff':'#3b3347';g.fillRect(ox+1,oy+1,5,6);g.fillStyle='#7b5cff';g.fillRect(ox+1,oy+2,2,1);g.fillStyle='#64c75b';g.fillRect(ox+3,oy+4,2,2);if(w){g.fillStyle='#2a2230';g.fillRect(ox+3,oy+8,1,3)}}
  g.fillStyle=I;g.fillRect(x-8,y-37,17,4);for(let j=0;j<3;j++){g.fillStyle=j<s.hp?'#e2564b':'#4a3a3a';g.fillRect(x-7+j*6,y-36,5,2)}
  if(Math.abs(P.x-s.x)<150)txt(FOE[s.t].n,x,y-42)});
 if(sealFx){const u=1-sealFx.t/3,x=sealFx.x-cam,y=sealFx.y-u*26;g.save();g.globalAlpha=Math.min(1,sealFx.t*1.2);goldSeal(x,y,1.5);g.restore()}}
function sealHud(){FOE.filter(o=>o.ph==S.li&&S.bd.includes(o.seal)).forEach((o,j)=>goldSeal(61+j*14,11,.8))}
// ---------- VISUAL DOS INIMIGOS ANTIGOS (mais claros: o que parece verde, mas não é) ----------
function oldE0(x,y,b){const I='#1d1a17',sw=Math.round(Math.sin(T*4+x)*1);g.fillStyle='#8b99a6';g.fillRect(x-7,y-2+b,3,2);g.fillRect(x+5,y-3+b,2,2);g.fillStyle=I;g.fillRect(x-4,y-3,3,3);g.fillRect(x+1,y-3,3,3);
 el(g,x,y-8+b,6.5,6.5,I);el(g,x,y-8+b,5.5,5.5,'#64c75b');el(g,x-1,y-10+b,3,3,'#8fdc63');g.fillStyle='#3c8a3a';g.fillRect(x-1,y-14+b,1,12);
 g.fillStyle=I;g.fillRect(x-3,y-11+b,2,2);g.fillRect(x+1,y-11+b,2,2);g.fillStyle='#fff';g.fillRect(x-3,y-11+b,1,1);g.fillRect(x+1,y-11+b,1,1);
 g.fillStyle='#e2564b';g.fillRect(x-3,y-7+b,6,1);g.fillStyle='#fff8e6';g.fillRect(x-2,y-6+b,4,1);g.fillStyle=I;g.fillRect(x+3,y-6+b,3,4);g.fillStyle='#3a2a22';g.fillRect(x+4,y-5+b,1,3);
 g.fillStyle='#566472';g.fillRect(x+6+sw,y-9+b,2,2);g.fillRect(x+7,y-12+b,2,2);txt('ECO?',x,y-19+b)}
function oldE1(x,y,b){const I='#1d1a17';g.fillStyle=I;g.fillRect(x-6,y-13+b,12,13);g.fillStyle='#6b7885';g.fillRect(x-5,y-12+b,10,11);g.fillStyle='#8b99a6';g.fillRect(x-5,y-12+b,2,11);
 g.fillStyle=I;g.fillRect(x-6,y-9+b,12,1);g.fillRect(x-6,y-3+b,12,1);g.fillStyle='#8fdc63';g.fillRect(x-5,y-14+b,10,2);g.fillRect(x-4,y-15+b,3,1);g.fillStyle='#64c75b';g.fillRect(x+3,y-12+b,2,5);
 g.fillStyle='#fff8e6';g.fillRect(x-3,y-8+b,6,5);g.fillStyle=I;g.fillRect(x-3,y-8+b,6,1);g.fillStyle='#6fbf4a';g.fillRect(x-2,y-7+b,3,2);g.fillRect(x-1,y-5+b,1,1);g.fillStyle='#e2564b';g.fillRect(x+2,y-4+b,1,1);
 g.fillStyle='#ffd45a';g.fillRect(x-4,y-11+b,2,1);g.fillRect(x+1,y-11+b,2,1);g.fillStyle=I;g.fillRect(x-4,y-1,2,1);g.fillRect(x+2,y-1,2,1)}
function oldE2(x,y,b){const I='#1d1a17';g.fillStyle='#e2564b';g.fillRect(x-4,y-3+b,3,4);g.fillRect(x+1,y-3+b,3,4);g.fillStyle=I;g.fillRect(x-4,y+b,3,1);g.fillRect(x+1,y+b,3,1);
 el(g,x,y-8+b,7,7,I);el(g,x,y-8+b,6,6,'#ffd45a');el(g,x,y-8+b,4.5,4.5,'#fff8e6');el(g,x,y-8+b,3,3,'#64c75b');
 g.fillStyle='#fff8e6';g.fillRect(x-2,y-8+b,1,1);g.fillRect(x-1,y-7+b,1,1);g.fillRect(x,y-8+b,1,1);g.fillRect(x+1,y-9+b,1,1);g.fillRect(x+2,y-10+b,1,1);
 g.fillStyle='#d84f4f';for(let q=-5;q<=5;q++)g.fillRect(x+q,y-8+b-q,2,1);g.fillStyle=I;g.fillRect(x-3,y-10+b,2,1);g.fillRect(x+2,y-10+b,2,1)}
function drone2(x,y){const I='#1d1a17',pr=((T*30)|0)%2;g.fillStyle=I;g.fillRect(x-7,y,14,2);if(pr){g.fillRect(x-7,y-1,5,1);g.fillRect(x+3,y-1,5,1)}else{g.fillRect(x-6,y-1,3,1);g.fillRect(x+4,y-1,3,1)}
 g.fillRect(x-5,y+2,10,6);g.fillStyle='#e8eef2';g.fillRect(x-4,y+3,8,4);g.fillStyle='#64c75b';g.fillRect(x-4,y+3,8,1);g.fillStyle='#8b99a6';g.fillRect(x+2,y+3,2,4);
 g.fillStyle=I;g.fillRect(x-2,y+8,4,2);g.fillStyle='#8b99a6';g.fillRect(x-1,y+10+(((T*8)|0)%2),2,1)}
const CB=document.querySelector('#t [data-k="c"]');let cbv=null;
['hn','hs'].forEach(id=>{const e=$(id),d=Object.getOwnPropertyDescriptor(Node.prototype,'textContent');let v;Object.defineProperty(e,'textContent',{get(){return d.get.call(this)},set(x){if(x!==v){v=x;d.set.call(this,x)}},configurable:true})});
let last=0;function loop(ts){{const wc=!!(boss&&boss.on&&!boss.dead);if(CB&&wc!==cbv){cbv=wc;CB.style.display=wc?'':'none'}}const dt=Math.min((ts-last)/1000||0,.033);last=ts;T+=dt;joy=Math.max(0,joy-dt);
 if(S.mode=='play')step(dt);if(S.mode=='swim')swimStep(dt);if(S.mode=='cine'&&cs)cineStep(dt);
 if(S.mode=='end'&&Math.random()<.4)pt.push({x:Math.random()*384,y:0,vx:0,vy:50,l:3,c:BC[pt.length%4]});
 pt=pt.filter(p=>(p.l-=dt)>0);pt.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=(S.mode=='end'?0:200)*dt});
 if(S.mode=='cine'&&cs)cineDraw();else if(sw&&(S.mode=='swim'||S.mode=='panel'))swimDraw();else draw();requestAnimationFrame(loop)}
const JK=['w','arrowup'];
function dn(k){k=k.toLowerCase();K[k]=1;
 if(k=='escape'){if(S.mode=='play')pauseP();else if(S.mode=='pause')resume();return}
 if(k=='enter'&&S.mode=='panel'){const b=$('o').querySelector('button.b:not([disabled])');if(b&&/GUARDAR PISTA|VOLTAR AO MAPA/.test(b.textContent))b.click();return}
 if(k=='f'&&S.mode=='swim'&&vis<=0&&visCd<=0){vis=5;sfx(700,.2,'sine',1200);return}
 if(S.mode=='cine'){if(k==' '||k=='e'||k=='enter')cineNext();return}if(S.mode!='play'||vict>0)return;if(JK.includes(k))jb=.12;if(k=='arrowdown')act();if(k=='f'&&!(boss&&boss.on)&&vis<=0&&visCd<=0){vis=5;sfx(700,.2,'sine',1200)}if(k==' ')tongue();if(k=='c'&&boss&&boss.on&&!boss.dead&&camT<=0&&camCd<=0){camT=camDur=(boss&&boss.on&&!boss.dead?4:3);sfx(250,.4,'sine',90)}if(k=='i')invP()}
function up(k){k=k.toLowerCase();K[k]=0;if(JK.includes(k)&&P.vy<-90)P.vy*=.5}
addEventListener('keydown',e=>{if(S.mode=='play'&&[' ','arrowup','arrowdown','arrowleft','arrowright'].includes(e.key.toLowerCase()))e.preventDefault();if(!e.repeat)dn(e.key)});
addEventListener('keyup',e=>up(e.key));addEventListener('blur',()=>{for(const k in K)K[k]=0});
document.querySelectorAll('#t button').forEach(b=>{b.onpointerdown=e=>{e.preventDefault();dn(b.dataset.k)};['pointerup','pointerleave','pointercancel'].forEach(v=>b['on'+v]=()=>up(b.dataset.k))});
function fit(){const hh=e=>getComputedStyle(e).display=='none'?0:e.offsetHeight,w=$('w'),u=hh($('h'))+hh($('ts'))+hh($('t')),a=Math.max(100,Math.min(innerWidth,(innerHeight-u)*16/9));w.style.width=a+'px';w.style.height=(a*9/16)+'px'}addEventListener('resize',fit);fit();
menu();requestAnimationFrame(loop);setTimeout(fit,50);addEventListener('orientationchange',()=>setTimeout(fit,150));
