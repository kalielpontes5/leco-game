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
  if(d<11&&P.y>s.y-20&&P.y-13<s.y){if(inv>0||(P.vy>40&&P.y<s.y-12)){const sd=P.x>=s.x?1:-1;P.x=s.x+sd*11.5;if(P.vx*sd<0)P.vx=0}else hurt('Um vilão do greenwashing! Use a língua (Espaço) à distância.')}});
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
