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

