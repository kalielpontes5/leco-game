const $=i=>document.getElementById(i),
g=$('c').getContext('2d'),
INK='#24364B';

if(!g.roundRect)CanvasRenderingContext2D.prototype.roundRect=function(x,y,w,h){
  this.rect(x,y,w,h)
};

const rr=(x,y,w,h,r,c)=>{g.fillStyle=c;
g.beginPath();
g.roundRect(x,y,w,h,r);
g.fill()},

ci=(x,y,r,c)=>{
  g.fillStyle=c;
  g.beginPath();
  g.arc(x,y,r,0,7);
  g.fill()
};
const CAT=['Documento','Detalhe oculto','Registro à distância','Depoimento'];
const LV=[
{
  n:'Mercado das Aparências',
  k:0,
  w:700,
  qx:450,
  qy:180,
  sk:['#8EDBFF','#FFF4D6'],
  hl:'#9ADB8A',
  gr:'#C98B5A',
  tp:'#FFD45A',
  b:'Olhos Atentos',
  m:'Descubra o que a embalagem realmente comprova.',
  t:'A/D andam, W ou ↑ pulam, ↓ investiga. F ativa o Foco; Espaço alcança pistas altas.',
  P:[[0,180,205,36],
    [245,180,140,36],
    [425,180,275,36],
    [140,164,32,16],
    [250,150,32,30],
    [470,164,40,16],
    [520,146,70,8],
    [600,120,60,8]],
  C:[[156,164,0,'Embalagem “100% ecológica”','Publicidade: a frente promete um produto 100% ecológico, sem mostrar em que se baseia.'],
    [330,180,0,'Símbolo de reciclagem','O símbolo aparece sozinho. Não diz se vale para o produto todo ou só para uma parte.'],
    [555,146,1,'Letra pequena do rótulo','Só uma parte do material usa conteúdo reciclado.'],
    [630,120,2,'Documento do fabricante','Não há avaliação completa dos impactos ambientais deste produto.'],
    [610,180,3,'Dona Rosa, comerciante','Meus clientes compram pela embalagem verde, mas ninguém me mostrou relatório algum.']],
  H:[],
  q:'Alegação: “100% ecológica”. O que as evidências permitem concluir?',
  o:['A promessa está comprovada.','A promessa é ampla demais para as evidências; faltam dados.','É fraude: a empresa mentiu de propósito.'],
  ok:1,
  f:['Não: só parte do material é reciclada e não há avaliação completa de impactos.','Correto! O rótulo é parcial e falta avaliação completa. Isso não prova má-fé. Próximo passo: pedir a documentação ao fabricante.','Precipitado: falta de prova da promessa não prova intenção de enganar. Peça documentos antes de acusar.']
},
{
  n:'O Rio Esquecido',k:1,w:800,qx:520,qy:180,sk:['#8EDBFF','#E6F7FF'],hl:'#7BC98E',gr:'#9A6848',tp:'#64C75B',b:'Guardião das Águas',
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

