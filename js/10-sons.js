// ---------- SONS DE VITÓRIA E DERROTA (chiptune) ----------
const WIN=[523,659,784,1047,0,784,1047,1319],BIG=[523,659,784,1047,988,1047,1175,1319,1568],FAIL=[392,370,349,330,0,262,196];
const NZB={};
function nzB(d){const k=d.toFixed(2);if(!NZB[k]){AC=AC||new AudioContext();const n=Math.max(1,AC.sampleRate*d|0),b=AC.createBuffer(1,n,AC.sampleRate),a=b.getChannelData(0);for(let i=0;i<n;i++)a[i]=Math.random()*2-1;NZB[k]=b}return NZB[k]}
function stampSfx(k,x){if(mute)return;const dx=Math.abs(P.x-x);if(dx>340)return;try{AC=AC||new AudioContext();const n=AC.currentTime+.01,out=AC.createGain();const cp=AC.createDynamicsCompressor();cp.threshold.value=-14;cp.ratio.value=6;cp.connect(vOut(0));out.gain.value=Math.max(.3,1-dx/340)*1.9;out.connect(cp);
 const env=(a,pk,d,t0)=>{a.gain.setValueAtTime(.0001,t0);a.gain.exponentialRampToValueAtTime(pk,t0+.008);a.gain.exponentialRampToValueAtTime(.0001,t0+d)};
 const osc=(ty,f1,f2,d,pk,t0,fl)=>{const o=AC.createOscillator(),a=AC.createGain();o.type=ty;o.frequency.setValueAtTime(f1,t0);o.frequency.exponentialRampToValueAtTime(f2,t0+d);env(a,pk,d,t0);if(fl){const f=AC.createBiquadFilter();f.type=fl[0];f.frequency.value=fl[1];o.connect(f);f.connect(a)}else o.connect(a);a.connect(out);o.start(t0);o.stop(t0+d+.03)};
 const noi=(ty,f1,f2,d,pk,t0)=>{const s=AC.createBufferSource(),f=AC.createBiquadFilter(),a=AC.createGain();s.buffer=nzB(d);f.type=ty;f.frequency.setValueAtTime(f1,t0);f.frequency.exponentialRampToValueAtTime(f2,t0+d);f.Q.value=ty=='bandpass'?1.2:.7;env(a,pk,d,t0);s.connect(f);f.connect(a);a.connect(out);s.start(t0)};
 const pn=t0=>{noi('highpass',7000,6000,.04,.22,t0);noi('highpass',5000,1800,.4,.24,t0);noi('bandpass',3500,1200,.32,.18,t0+.02)};
 if(k==0){pn(n);osc('sawtooth',360,80,.26,.05,n,['lowpass',900]);noi('bandpass',2200,350,.28,.06,n);osc('square',55,50,.2,.02,n,['lowpass',300])}
 else if(k==1){osc('sine',150,34,.42,.34,n);noi('lowpass',1400,120,.22,.3,n);osc('square',210,95,.12,.08,n,['lowpass',700]);[311,467,743].forEach((f,i)=>osc('triangle',f,f*.985,.3-i*.04,.045,n+.01));osc('sine',70,40,.5,.12,n+.14);noi('highpass',3000,1200,.12,.05,n+.05)}
 else{pn(n);osc('sawtooth',70,160,.5,.035,n,['lowpass',500]);noi('bandpass',500,1600,.45,.04,n);[.05,.2,.35].forEach(d=>osc('square',900,880,.03,.03,n+d))}
}catch(e){}}
let MO=(()=>{try{return +localStorage.getItem('leco_mm')||0}catch(e){return 0}})(),MB=null,MC=-1,MS=0,MN=0,MK=null,GEST=0,MP={},HP=0,MH=0,HA=[],MQ=null,HO=null,HS=0;
const MT=[
{b:108,n:32,r:60,sc:[0,2,4,7,9],ch:[[0,0],[9,1],[5,0],[7,0],[0,0],[9,1],[5,0],[7,0]],lw:'triangle',lv:.1,ld:.7,bw:'triangle',bv:.14,bp:1,aw:'square',av:.018,ar:2,pw:'sine',pv:.04,kt:2,sd:11},
{b:100,n:32,r:57,sc:[0,3,5,7,10],ch:[[0,1],[0,1],[8,0],[7,0],[0,1],[0,1],[5,0],[7,0]],lw:'sawtooth',lv:.045,ld:.45,bw:'sawtooth',bv:.11,bp:1,pw:'sawtooth',pv:.025,kt:3,sd:23},
{b:112,n:32,r:62,sc:[0,2,3,5,7,9,10],ch:[[0,1],[5,0],[0,1],[7,1],[3,0],[5,0],[0,1],[7,1]],lw:'square',lv:.04,ld:.6,bw:'triangle',bv:.14,bp:2,aw:'triangle',av:.04,ar:4,pw:'sine',pv:.04,kt:2,sd:37},
{b:76,n:32,r:64,sc:[0,3,5,7,10],ch:[[0,1],[8,0],[3,0],[10,0],[0,1],[8,0],[5,0],[7,1]],lw:'sine',lv:.12,ld:.35,bw:'sine',bv:.14,bp:3,aw:'sine',av:.05,ar:4,pw:'triangle',pv:.05,kt:0,sd:41},
{b:88,n:32,r:59,sc:[0,1,3,5,7,8,10],ch:[[0,1],[1,0],[0,1],[10,0],[0,1],[8,0],[5,0],[6,2]],lw:'triangle',lv:.08,ld:.4,bw:'sawtooth',bv:.1,bp:0,aw:'square',av:.018,ar:2,pw:'sawtooth',pv:.025,kt:4,sd:53},
{b:80,n:32,r:48,tn:1,g:2.2,ch:[[0,2],[0,2],[0,2],[0,2],[0,2],[0,2],[0,2],[0,2]],sd:67},
{b:70,n:32,r:60,sc:[0,2,4,7,9,11],ch:[[0,0],[2,0],[9,1],[7,0],[0,0],[4,1],[5,0],[7,0]],lw:'sine',lv:.1,ld:.3,bw:'sine',bv:.14,bp:3,aw:'sine',av:.06,ar:4,pw:'sine',pv:.05,kt:0,sd:71},
{b:132,n:48,r:50,tn:2,ch:[[0,2],[0,2],[0,2],[0,2],[0,2],[0,2],[0,2],[0,2]],sd:83},
{b:84,n:32,r:60,sc:[0,2,4,7,9],ch:[[0,0],[7,0],[9,1],[5,0],[0,0],[7,0],[5,0],[7,0]],lw:'triangle',lv:.09,ld:.5,bw:'sine',bv:.14,bp:0,aw:'sine',av:.045,ar:4,pw:'sine',pv:.04,kt:1,sd:97},
{b:120,n:32,r:60,am:1,ch:[[0,2],[0,2],[0,2],[0,2],[0,2],[0,2],[0,2],[0,2]],sd:97}];
const mf=m=>440*Math.pow(2,(m-69)/12),mh=(a,b,c,d)=>{let h=Math.imul(a,374761393)^Math.imul(b,668265263)^Math.imul(c,2147483647)^Math.imul(d,1274126177);h=Math.imul(h^(h>>>13),1274126177);return(h^(h>>>16))>>>0};
function heliPass(t){const d=13,dr=Math.random()<.5?-1:1,x=AC.createBufferSource(),lp=AC.createBiquadFilter(),ch=AC.createGain(),lf=AC.createOscillator(),lg=AC.createGain(),en=AC.createGain(),pn=AC.createStereoPanner(),ru=AC.createOscillator(),rl=AC.createBiquadFilter(),rg=AC.createGain();
 x.buffer=nzB(2);x.loop=true;lp.type='lowpass';lp.frequency.value=650;ch.gain.value=.4;lf.type='sine';lg.gain.value=.6;lf.frequency.setValueAtTime(10.4,t);lf.frequency.linearRampToValueAtTime(11.6,t+d*.45);lf.frequency.linearRampToValueAtTime(9.4,t+d);lf.connect(lg);lg.connect(ch.gain);
 ru.type='sawtooth';ru.frequency.value=46;rl.type='lowpass';rl.frequency.value=220;rg.gain.value=1.4;
 en.gain.setValueAtTime(.0001,t);en.gain.linearRampToValueAtTime(.2,t+d*.5);en.gain.linearRampToValueAtTime(.0001,t+d);
 pn.pan.setValueAtTime(-.8*dr,t);pn.pan.linearRampToValueAtTime(.8*dr,t+d);
 x.connect(lp);lp.connect(ch);ch.connect(en);ru.connect(rl);rl.connect(rg);rg.connect(en);en.connect(pn);pn.connect(vOut(0));
 [x,lf,ru].forEach(o=>{o.start(t);o.stop(t+d+.1)});HA.push(en);if(HA.length>4)HA.shift()}
function mkc(){if(!MK){MK=AC.createDynamicsCompressor();MK.threshold.value=-16;MK.ratio.value=5;MK.connect(vOut(1))}return MK}
let VL=(()=>{try{const a=localStorage.getItem('leco_vs'),b=localStorage.getItem('leco_vm');return[a==null?1:Math.max(0,Math.min(1,+a||0)),b==null?1:Math.max(0,Math.min(1,+b||0))]}catch(e){return[1,1]}})(),VN=[null,null],VB=0;
function vOut(k){if(!VN[k]){VN[k]=AC.createGain();VN[k].gain.value=VL[k];VN[k].connect(AC.destination)}return VN[k]}
function setVol(k,v){VL[k]=Math.max(0,Math.min(1,+v||0));try{localStorage.setItem(k?'leco_vm':'leco_vs',VL[k])}catch(e){}if(VN[k])VN[k].gain.value=VL[k]}
function vSl(){const r=(l,k,ex)=>'<label style="display:inline-block;margin:8px 10px 0;font-weight:900;font-size:.9em;color:var(--g2)">'+l+' <input type="range" min="0" max="100" step="5" value="'+Math.round(VL[k]*100)+'" oninput="setVol('+k+',this.value/100)"'+(ex||'')+' style="vertical-align:middle;width:110px;accent-color:#4f7a3a"></label>';return r('VOLUME EFEITOS',0,' onchange="sfx(660,.08)"')+r('VOLUME MÚSICA',1)}
function heartVig(){if(S.mode!='play'||!lowHp()||!VB)return;const d=(performance.now()-VB)/1000,e=x=>x>0&&x<.3?Math.pow(1-x/.3,1.6):0,i=Math.max(e(d),e(d-.3)*.8);if(i<.02)return;g.setTransform(1,0,0,1,0,0);g.globalAlpha=1;const r=g.createRadialGradient(192,108,60,192,108,235);r.addColorStop(0,'rgba(90,0,8,0)');r.addColorStop(1,'rgba(90,0,8,'+(i*.55).toFixed(3)+')');g.fillStyle=r;g.fillRect(0,0,384,216)}
let I6=null;
const I6D=[6,7,8.5,6.5,15,3.5],I6T=[0,6,13,21.5,28,43],I6L=46.5,
I6P={o:['#17407f','#2a6fc0','#4a95e0'],l:['#1f6a2c','#4caf50','#8fd36a'],d:['#141a18','#26332f','#3c4d46'],e:['#241a18','#53402f','#7a6650'],c:['#b8c8dc','#e6eef7','#ffffff'],s:['#2a2024','#4a3a3e','#6a5a5a'],i:['#a8c8e8','#e8f4ff','#ffffff'],j:['#4a4040','#6a6060','#8a8080']},
I6X=[[['Houve um tempo em que a Terra era verde',.8,5.4,166],['e cheia de vida...',2.6,5.4,182]],
[['O greenwashing espalhou promessas bonitas.',.6,6.4,166],['Os consumidores acreditaram nas empresas...',3,6.4,182]],
[['E o mundo foi contaminado',4.6,8.2,166],['e pode ser destruído por completo em breve...',6,8.2,182]],
[['Mas ainda dá tempo de reverter isso!',1.2,6.2,166],['O principal vilão disso é o Ecofachada!',3,6.2,182]],
[['Ele se disfarçou de sustentável',1.2,5.2,166],['esse tempo todo...',2.6,5.2,182],['Mas agora ele revelou a sua verdadeira face:',8.4,14.4,166],['Ele usava uma máscara!',11,14.4,182]]];
const i6c=(s,y,c,k)=>pt3(s,Math.round(192-tw(s)*k/2),y,c,k);
function intro6Start(){I6={t:0,rot:0,sc:-1,lb:0,fl:0,u:0};S.mode='intro6';$('h').style.display='none'}
function intro6End(){if(!I6)return;I6=null;S.mode='play';$('h').style.display='flex';close();K[' ']=0;toast(L.m+' — '+L.t,6000)}
function intro6Step(dt){const q=I6;q.t+=dt;if(q.t>=I6L){intro6End();return}let sc=0;for(let i=1;i<6;i++)if(q.t>=I6T[i])sc=i;const u=q.t-I6T[sc];
 if(sc!=q.sc){q.sc=sc;q.lb=0;if(sc==1)sfx(110,1,'sawtooth',70);if(sc==3)sfx(520,1.2,'sine',380);if(sc==4)sfx(330,.5,'triangle',440);if(sc==5)sfx(330,.5,'triangle',880)}
 q.u=u;q.rot+=dt*(sc==0?.22:sc==1?.22+Math.pow(u/7,2)*2.8:sc==2?.5:0);
 if(sc==2&&u>3.5&&!q.br){q.br=1;q.fl=1;q.fc='#ffffff';sfx(60,1.6,'sawtooth',25);sfx(220,.5,'square',40)}
 if(sc==4&&u>5.4&&!q.ev){q.ev=1;q.fl=.8;q.fc='#ff2a1a';sfx(70,.9,'sawtooth',40);sfx(900,.35,'square',160)}
 if(sc==4&&u>8&&!q.mk){q.mk=1;sfx(260,.35,'square',90);sfx(120,.9,'sawtooth',50)}
 q.fl=Math.max(0,q.fl-dt*1.6);
 let tc=0;(I6X[sc]||[]).forEach(([s,at,to])=>{if(u>=at&&u<to)tc+=Math.min(s.length,Math.floor((u-at)*28))});const lb=tc/3|0;if(lb>q.lb&&tc)sfx(480+(lb%4)*30,.015,'square');q.lb=lb}
function i6Stars(a){for(let i=0;i<70;i++){const x=(i*97+13)%384,y=(i*57+7)%150,b=(Math.sin(I6.t*2+i)+1)*.5;g.globalAlpha=a*(.3+.7*b);g.fillStyle=i%9?'#cfe6ff':'#ffe9a0';g.fillRect(x,y,i%7?1:2,i%7?1:2)}g.globalAlpha=1}
function i6Smog(cx,cy,t,k){for(let i=0;i<30;i++){const a=i*.7+t*(.15+(i%4)*.05),r=52+((i*13)%16),z=2+(i%3)*2;g.globalAlpha=Math.min(1,.45*k);g.fillStyle=i%2?'#3b2f33':'#5a4a4a';g.fillRect(Math.round(cx+Math.cos(a)*r),Math.round(cy+Math.sin(a)*r),z,z)}g.globalAlpha=1}
function i6Seals(cx,cy,R,t,h,fall,m){for(let i=0;i<6;i++){const a=t*.8+i*1.0472;if((m==1&&Math.sin(a)>=0)||(m==2&&Math.sin(a)<0))continue;const x=Math.round(cx+Math.cos(a)*(R+30)),y=Math.round(cy+Math.sin(a)*(R*.32)+Math.sin(a*2)*4+fall*fall*(60+i*9));if(y>150)continue;g.globalAlpha=Math.max(0,1-fall*.6);const col=h>.6?'#4caf50':h>.3?'#8a9a3a':'#6a5a4a';el(g,x,y,6,6,'#fffdf4');el(g,x,y,5,5,col);g.fillStyle='#fff';g.fillRect(x-1,y-3,3,1);g.fillRect(x-2,y-2,4,3);g.fillRect(x-1,y+1,2,1);g.fillRect(x+1,y+1,1,2)}g.globalAlpha=1}
function i6Planet(cx,cy,R,rot,h,t){g.fillStyle=h>.5?'#7fc8ff':'#ff6a3a';for(let r=3;r>0;r--){g.globalAlpha=.09*(4-r);for(let y=-R-r;y<=R+r;y+=2){const a=Math.sqrt(Math.max(0,(R+r)*(R+r)-y*y)),b=Math.sqrt(Math.max(0,R*R-y*y)),w=Math.round(a-b)+1;g.fillRect(Math.round(cx-a),cy+y,w,2);g.fillRect(Math.round(cx+b),cy+y,w,2)}}g.globalAlpha=1;
 for(let y=-R;y<R;y+=2)for(let x=-R;x<R;x+=2){const dx=(x+1)/R,dy=(y+1)/R,r2=dx*dx+dy*dy;if(r2>1)continue;
  const z=Math.sqrt(1-r2),lon=Math.atan2(dx,z)+rot,lat=Math.asin(dy),sh=-dx*.6-dy*.4+z*.45,si=sh>.5?2:sh>0?1:0,
  dm=(Math.sin(lon*3+lat*4+1)+.7*Math.sin(lon*7-lat*3)+.5*Math.cos(lon*2-lat*8))/2.2*.5+.5,bad=dm<(1-h)*1.25,
  ld=Math.sin(lon*2+1.3)*Math.cos(lat*2.2)+.7*Math.sin(lon*3.1-lat*2)+.35*Math.sin(lon*6+lat*5)+.2*Math.cos(lat*9+lon*2)>.45;
  let c;if(Math.abs(dy)>.86)c=(bad?I6P.j:I6P.i)[si];else if(ld)c=(bad?I6P.e:I6P.l)[si];else c=(bad?I6P.d:I6P.o)[si];
  if(Math.sin(lon*4+t*.3+lat*3)*Math.sin(lon*2-lat*5+1)>.55)c=(bad?I6P.s:I6P.c)[si];
  else if(bad&&h<.7){if(Math.abs(Math.sin(lon*8+lat*5+t*.5)*Math.cos(lon*5-lat*9))<.14*(1-h))c=(((t*6)|0)+x)%3?'#ff7a1a':'#ffd45a';else if(ld&&((x*7+y*13+((t*9)|0)*5)%41==0))c='#ffb02e'}
  g.fillStyle=c;g.fillRect(cx+x,cy+y,2,2)}}
let I6LC=null;function i6Leco(cx,cy,t){if(!I6LC){I6LC=new Image();I6LC.src=lecoCry()}if(I6LC.complete&&I6LC.width)g.drawImage(I6LC,Math.round(cx-I6LC.width/2),Math.round(cy-73+((t*5%1)<.12?1:0)))}
function i6Eco(u){const T=I6.t,ev=Math.min(1,Math.max(0,(u-5.4)/1.2)),mk=Math.min(1,Math.max(0,(u-8)/1.6)),O='#1d1a17',B=ev>.5?BPAL[2][0]:'#8b99a6',D=ev>.5?BPAL[2][1]:'#566472',Lt=ev>.5?BPAL[2][2]:'#b8c5d0',M=ev>.5?BPAL[2][3]:BPAL[0][3],M2=ev>.5?BPAL[2][4]:BPAL[0][4],e5=ev>.5;
 if(ev>0){g.globalAlpha=(.3*ev+(mk>.9?.1:0))*(.7+.3*Math.sin(T*6));el(g,192,90,170,100,'#5a0a10');g.globalAlpha=1}
 g.globalAlpha=Math.min(1,u/.8);i6c('ECOFACHADA',10,e5?'#ff3b2f':'#8fdc63',2);g.globalAlpha=1;
 g.save();g.translate(192,152);g.scale(1.5,1.5);if(ev>0&&mk<1)g.translate(Math.round(Math.sin(T*47)*ev*.8),0);
 if(mk>=0){const ob=boss,oc=cam,obp=bp;boss={x:0,hp:ev>.5?8:30,st:mk>0?'vuln':'idle',flash:0,dead:0};cam=0;bp=[];g.save();g.translate(0,-180);try{drawBoss()}finally{boss=ob;cam=oc;bp=obp}g.restore();
  if(mk>0&&mk<1){const sl=mk*mk*40,fa=mk*mk*60;[-1,1].forEach(sd=>{g.save();g.globalAlpha=1-mk*.5;g.translate(sd*8.5+sd*sl,-38+fa);g.rotate(sd*mk*.6);g.translate(-sd*8.5,38);g.beginPath();g.rect(sd<0?-17:0,-51,17,26);g.clip();g.fillStyle=BPAL[2][3];g.fillRect(-17,-51,34,26);g.fillStyle=BPAL[2][4];g.fillRect(-17,-51,34,2);[-12,4].forEach(ex=>{g.fillStyle='#fffdf4';g.fillRect(ex,-44,8,8);g.fillStyle='#ff3b2f';g.fillRect(ex+1,-42,6,5)});g.fillStyle='#1d1a17';g.fillRect(-10,-32,20,2);g.fillStyle='#fff';for(let k=0;k<5;k++)g.fillRect(-9+k*4,-30,2,2+(k%2));g.restore()});g.save();g.globalAlpha=1-mk*.5;g.translate(0,-60+fa*1.4);g.rotate(mk*.8);g.drawImage(SP.leaf,-7,-8,14,16);g.restore()}
  g.restore();return}
 [[-20,76],[8,70]].forEach(([dx,h],i)=>{g.fillStyle=O;g.fillRect(dx-1,-h,10,22);g.fillStyle='#6a5a52';g.fillRect(dx,-h+1,8,20);g.fillStyle='#e2564b';g.fillRect(dx,-h+1,8,3);for(let j=0;j<3;j++){g.globalAlpha=.6-j*.17;el(g,dx+4+Math.round(Math.sin(T*2+j+i)*2),-h-5-j*7-(((T*8+i*3)%6)|0),3+j,3+j,'#3a3236')}g.globalAlpha=1});
 g.fillStyle=O;g.fillRect(-24,-12,16,12);g.fillRect(8,-12,16,12);g.fillStyle=D;g.fillRect(-23,-11,14,10);g.fillRect(9,-11,14,10);
 g.fillStyle=O;g.fillRect(-26,-56,52,46);g.fillStyle=B;g.fillRect(-25,-55,50,44);g.fillStyle=D;g.fillRect(8,-55,17,44);g.fillStyle=Lt;g.fillRect(-25,-55,50,2);for(let i=0;i<3;i++){g.fillStyle=D;g.fillRect(-22,-30+i*7,2,2);g.fillStyle=Lt;g.fillRect(19,-30+i*7,2,2)}
 [[-40,-1],[26,1]].forEach(([ax,sd])=>{g.fillStyle=O;g.fillRect(ax,-48,14,26);el(g,ax+7,-20,7,7,O);g.fillStyle=B;g.fillRect(ax+1,-47,12,24);el(g,ax+7,-20,6,6,B);g.fillStyle=D;g.fillRect(ax+(sd>0?8:1),-47,5,24)});
 g.fillStyle=O;g.fillRect(-18,-52,36,28);
 if(mk>0){g.fillStyle='#2a1010';g.fillRect(-17,-51,34,26);g.fillStyle='#3a1a1a';g.fillRect(-17,-51,8,26);g.fillRect(9,-51,8,26);el(g,0,-36,5+(((T*6)|0)%2),5,'#ff6a3a');el(g,0,-36,3,3,'#ffd45a');g.fillStyle='#ff3b2f';g.fillRect(-13,-48,9,3);g.fillRect(4,-48,9,3);g.fillStyle='#000';for(let k=0;k<8;k++){g.fillRect(-14+k,-51+(k>>1),1,2);g.fillRect(13-k,-51+(k>>1),1,2)}g.fillStyle='#e9e2c8';for(let k=0;k<9;k++)g.fillRect(-12+k*3,-29,2,2+(k%2)*2)}
 const mask=()=>{g.fillStyle=M;g.fillRect(-17,-51,34,26);g.fillStyle=M2;g.fillRect(-17,-51,34,2);[-12,4].forEach(ex=>{g.fillStyle='#fffdf4';g.fillRect(ex,-44,8,8);if(e5){g.fillStyle='#ff3b2f';g.fillRect(ex+1,-42,6,5)}else{g.fillStyle='#101820';g.fillRect(ex+3,-42,3,4);g.fillStyle='#fff';g.fillRect(ex+3,-42,1,1)}});
  g.fillStyle=O;g.fillRect(-10,-32,20,2);if(e5){g.fillRect(-12,-30,2,2);g.fillRect(10,-30,2,2);for(let k=0;k<8;k++){g.fillRect(-14+k,-48+(k>>1),1,2);g.fillRect(13-k,-48+(k>>1),1,2)}g.fillStyle='#fff';for(let k=0;k<5;k++)g.fillRect(-9+k*4,-30,2,2+(k%2))}else{g.fillRect(-12,-34,2,2);g.fillRect(10,-34,2,2)}};
 if(mk<1){const sl=mk*mk*40,fa=mk*mk*60;[-1,1].forEach(sd=>{g.save();g.globalAlpha=1-mk*.5;g.translate(sd*8.5+sd*sl,-38+fa);g.rotate(sd*mk*.6);g.translate(-sd*8.5,38);g.beginPath();g.rect(sd<0?-17:0,-51,17,26);g.clip();mask();g.restore()});
  g.save();g.globalAlpha=1-mk*.5;g.translate(0,-60+fa*1.4/1);g.rotate(mk*.8);g.drawImage(SP.leaf,-7,-8,14,16);g.restore()}
 g.restore()}
function intro6Draw(){const q=I6,t=q.t,sc=q.sc,u=q.u||0;g.setTransform(1,0,0,1,0,0);g.imageSmoothingEnabled=false;g.globalAlpha=1;g.fillStyle='#000';g.fillRect(0,0,384,216);if(sc<0)return;
 i6Stars(sc>=3&&sc<5?.35:sc==5?.6:1);
 const ox=(sc==1&&u>4)?Math.round(Math.sin(t*61)*(u-4)/3):(sc==2&&u<3.5)?Math.round(Math.sin(t*61)*(1+u)):0;
 if(sc==0)i6Planet(192,74,50,q.rot,1,t);
 else if(sc==1){const h=1-Math.min(1,u/6.5)*.8;i6Smog(192,74,t,1-h);i6Seals(192,74,50,t,h,0,1);i6Planet(192+ox,74,50,q.rot,h,t);i6Seals(192,74,50,t,h,0,2)}
 else if(sc==2){if(u<3.5){const h=.2*(1-u/3.5);i6Smog(192,74,t,1);i6Seals(192,74,50,t,h,u/3.5,1);i6Planet(192+ox,74,50,q.rot,h,t);i6Seals(192,74,50,t,h,u/3.5,2)}
  else{const tau=u-3.5;g.globalAlpha=.15;el(g,192,74,26+Math.round(tau*2),26,'#ff2a1a');g.globalAlpha=1;
   for(let i=0;i<48;i++){const a=i*2.399,d=(26+((i*37)%70))*tau/(1+.35*tau)*1.6;g.fillStyle=['#241a18','#53402f','#7a6650','#ff7a1a','#3c4d46'][i%5];const z=2+((i*11)%6);g.fillRect(Math.round(192+Math.cos(a)*d),Math.round(74+Math.sin(a)*d*.8),z,z);if(i%3==0&&tau<3){g.fillStyle='rgba(255,176,46,.5)';g.fillRect(Math.round(192+Math.cos(a)*d*.8),Math.round(74+Math.sin(a)*d*.64),2,2)}}
   if(tau<1.6)ring(192,74,Math.round(tau*100),'rgba(255,210,140,'+(1-tau/1.6).toFixed(2)+')');
   el(g,192,74,6+(((t*5)|0)%2),6,'#ff6a3a');el(g,192,74,3,3,'#ffd45a');
   for(let i=0;i<14;i++){g.globalAlpha=.5;g.fillStyle=i%2?'#3a3236':'#5a4a4a';const z=2+(i%3);g.fillRect(Math.round(192+Math.sin(i*2+t)*(6+tau*3)),Math.round(70-((tau*14+i*9)%50)),z,z)}g.globalAlpha=1}}
 else if(sc==3){g.globalAlpha=.12;el(g,192,78,150,90,'#4aa8e8');g.globalAlpha=1;i6Leco(192,78,t)}
 else if(sc==4)i6Eco(u);
 else{g.globalAlpha=Math.min(1,u/.8);i6c('FASE 6',66,'#ff7a1a',6);g.fillStyle='#7a2f42';g.fillRect(90,108,204,2);g.fillRect(90,130,204,2);i6c('O COLAPSO DO GREENWASHING',116,'#fff4d0',2);for(let i=0;i<16;i++){g.fillStyle=i%2?'#ff7a1a':'#ffd45a';g.fillRect((i*61)%384,216-((t*30+i*37)%216),1,1)}g.globalAlpha=1}
 if(sc<5){g.fillStyle='#000';g.fillRect(0,152,384,64);
  (I6X[sc]||[]).forEach(([s,at,to,y])=>{if(u<at||u>=to)return;const n=nf(s).length,ch=Math.min(n,Math.floor((u-at)*28)),x=Math.round(192-tw(s));g.save();if(to-u<.5)g.globalAlpha=(to-u)/.5;g.beginPath();g.rect(x-2,y-8,ch*8+2,22);g.clip();pt3(s,x+2,y+2,'#2a2a2a',2);pt3(s,x,y,'#fff4d0',2);g.restore()})}
 const d=I6D[sc];let a=0;if(u<.6)a=1-u/.6;if(u>d-.6)a=Math.max(a,(u-(d-.6))/.6);if(a>0){g.globalAlpha=Math.min(1,a);g.fillStyle='#000';g.fillRect(0,0,384,216);g.globalAlpha=1}
 if(q.fl>0){g.globalAlpha=Math.min(1,q.fl)*.85;g.fillStyle=q.fc||'#fff';g.fillRect(0,0,384,216);g.globalAlpha=1}
 pt3('ESPAÇO: PULAR',380-tw('ESPAÇO: PULAR'),8,'#8a8a8a',1)}
function lowHp(){return !!(boss&&boss.on&&!boss.dead&&vict<=0&&php>0&&php<2)}
function heartOut(){if(!HO){const c=AC.createDynamicsCompressor();c.threshold.value=-6;c.knee.value=0;c.ratio.value=20;c.connect(vOut(0));const g=AC.createGain();g.gain.value=2.4;g.connect(c);HO=g}return HO}
function heartPulse(t){const o=(ty,f0,f1,tb,v,d)=>{const q=AC.createOscillator(),a=AC.createGain();q.type=ty;q.frequency.setValueAtTime(f0,t+tb);q.frequency.exponentialRampToValueAtTime(f1,t+tb+d);a.gain.setValueAtTime(.0001,t+tb);a.gain.linearRampToValueAtTime(v,t+tb+.012);a.gain.exponentialRampToValueAtTime(.0001,t+tb+d+.12);q.connect(a);a.connect(heartOut());q.start(t+tb);q.stop(t+tb+d+.2)},u=.3;
 o('sine',62,34,0,.9,.26);o('triangle',110,55,0,.45,.18);
 o('sine',56,32,u,.75,.22);o('triangle',100,50,u,.35,.15)}
function heartSting(t){const o=(f,v,d,at)=>{const q=AC.createOscillator(),a=AC.createGain();q.type='sine';q.frequency.setValueAtTime(f,t);q.frequency.linearRampToValueAtTime(f*.985,t+d);a.gain.setValueAtTime(.0001,t);a.gain.linearRampToValueAtTime(v,t+at);a.gain.setValueAtTime(v,t+d*.45);a.gain.exponentialRampToValueAtTime(.0001,t+d);q.connect(a);a.connect(heartOut());q.start(t);q.stop(t+d+.1)};
 o(5200,.035,3,.25);o(5260,.03,3,.35);o(2600,.012,3,.3)}
function sfxTick(){const t=AC.currentTime,pl=S.mode=='play'&&!mute;
 if(pl&&L.k==5&&!(boss&&boss.on)){if(t>=HP){heliPass(t);HP=t+13+7+Math.random()*4}}else if(HA.length){HA.forEach(a=>{a.gain.cancelScheduledValues(t);a.gain.setTargetAtTime(0,t,.3)});HA=[]}
 const hc=lowHp();if(!hc)HS=0;else if(pl){if(!HS){HS=1;heartSting(t);MH=t+2.4}if(t>=MH){heartPulse(t);VB=performance.now();MH=t+1.15}}else if(hc&&S.mode=='play'&&performance.now()-VB>1150)VB=performance.now()}
function victBal(){if(MO||mute&&0)return;try{AC=AC||new AudioContext();if(!MK){MK=AC.createDynamicsCompressor();MK.threshold.value=-16;MK.ratio.value=5;MK.connect(vOut(1))}
 const t0=AC.currentTime+.05,bt=60/108,g=AC.createGain();g.gain.setValueAtTime(.9,t0);g.gain.setValueAtTime(.9,t0+3);g.gain.linearRampToValueAtTime(.0001,t0+5.4);g.connect(MK);
 const nn=(w,m,tb,d,v,at)=>{const o=AC.createOscillator(),a=AC.createGain(),t=t0+tb*bt;o.type=w;o.frequency.value=mf(m);a.gain.setValueAtTime(.0001,t);a.gain.linearRampToValueAtTime(v,t+(at||.02));a.gain.exponentialRampToValueAtTime(.0001,t+d*bt);o.connect(a);a.connect(g);o.start(t);o.stop(t+d*bt+.05)};
 [[76,0,.75],[79,.75,.75],[83,1.5,.75],[81,2.25,.75],[81,3,.75],[84,3.75,.75],[88,4.5,3]].forEach(n=>{nn('triangle',n[0],n[1],n[2]*1.1,.14);nn('sine',n[0]+12,n[1],n[2],.04)});
 [[0,[48,55,60,64],1.5],[1.5,[43,50,59,62],1.5],[3,[41,48,57,60],1.5],[4.5,[48,55,64,67],3]].forEach(c=>{nn('sine',c[1][0]-12,c[0],c[2]*1.1,.16);c[1].forEach(m=>nn('triangle',m,c[0],c[2]*1.1,.035,.3));for(let k=0;k<c[2]/.375;k++)nn('sine',c[1][1+k%3]+12,c[0]+k*.375,.5,.05)});
 nn('sine',96,4.5,2.5,.025)}catch(e){}}
function heliBg(){for(let i=0;i<2;i++){const x=Math.round(420-((T*(6+i*3)+i*210)%470)),y=20+i*17+Math.round(Math.sin(T*.8+i*2)*2),f=((T*24)|0)&1;g.fillStyle='rgba(14,22,18,.75)';g.fillRect(x,y,8,3);g.fillRect(x+8,y+1,6,1);g.fillRect(x+13,y-2,1,3);g.fillRect(x+3,y-1,2,1);g.fillRect(f?x-2:x+1,y-2,f?12:6,1);g.fillRect(x+1,y+3,6,1)}}
function musT(){MO=MO?0:1;try{localStorage.setItem('leco_mm',MO)}catch(e){}S.mode=='pause'?pauseP():menu()}
function musWant(){const m=S.mode;if(m=='menu'||m=='pause')return 9;if(m=='end')return 8;if(sw&&(m=='swim'||m=='panel'))return 6;if(boss&&boss.dead)return -1;if(boss&&boss.on)return 7;return L.k}
function musStep(T,st,t,sd){const bar=((st/16)|0)%T.n,s=st%16,sq=T.n/4,sec=(bar/sq)|0,bi=bar%sq,ty=sec==2?1:(sec>0&&bi>=sq-2?2:0),cd=T.ch[bar%8],base=T.r+cd[0],iv=[[0,4,7],[0,3,7],[0,3,6],[0,7,12]][cd[1]],B=MB,br=base-12;
 const nt=(w,f,d,v,at,fl)=>{const o=AC.createOscillator(),a=AC.createGain();o.type=w;o.frequency.value=f;a.gain.setValueAtTime(.0001,t);a.gain.linearRampToValueAtTime(v,t+(at||.01));a.gain.exponentialRampToValueAtTime(.0001,t+Math.max(d,(at||.01)+.02));let n=o;if(fl){const q=AC.createBiquadFilter();q.type='lowpass';q.frequency.value=fl;o.connect(q);n=q}n.connect(a);a.connect(B);o.start(t);o.stop(t+Math.max(d,(at||.01)+.02)+.05)};
 const no=(ft,f1,d,v)=>{const x=AC.createBufferSource(),q=AC.createBiquadFilter(),a=AC.createGain();x.buffer=nzB(d);q.type=ft;q.frequency.value=f1;a.gain.setValueAtTime(v,t);a.gain.exponentialRampToValueAtTime(.0001,t+d);x.connect(q);q.connect(a);a.connect(B);x.start(t)};
 const kick=v=>{const o=AC.createOscillator(),a=AC.createGain();o.frequency.setValueAtTime(150,t);o.frequency.exponentialRampToValueAtTime(42,t+.12);a.gain.setValueAtTime(v,t);a.gain.exponentialRampToValueAtTime(.0001,t+.2);o.connect(a);a.connect(B);o.start(t);o.stop(t+.22)};
 const snare=()=>{no('bandpass',1900,.14,.12);nt('triangle',190,.09,.08)},hat=v=>no('highpass',7500,.04,v);
 const vb=(m,d,v)=>{const o=AC.createOscillator(),l=AC.createOscillator(),lg=AC.createGain(),q=AC.createBiquadFilter(),a=AC.createGain();o.type='sawtooth';o.frequency.value=mf(m);l.frequency.value=5.5;lg.gain.value=mf(m)*.018;l.connect(lg);lg.connect(o.frequency);q.type='lowpass';q.frequency.value=1700;a.gain.setValueAtTime(.0001,t);a.gain.linearRampToValueAtTime(v,t+d*.3);a.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(q);q.connect(a);a.connect(B);o.start(t);l.start(t);o.stop(t+d+.05);l.stop(t+d+.05)};
 const rs=d=>{const x=AC.createBufferSource(),q=AC.createBiquadFilter(),a=AC.createGain();x.buffer=nzB(d);q.type='bandpass';q.Q.value=3;q.frequency.setValueAtTime(300,t);q.frequency.exponentialRampToValueAtTime(3500,t+d);a.gain.setValueAtTime(.0001,t);a.gain.exponentialRampToValueAtTime(.09,t+d*.95);a.gain.linearRampToValueAtTime(0,t+d);x.connect(q);q.connect(a);a.connect(B);x.start(t)};
 const cl=(m,d,v)=>[0,1,6].forEach(i=>nt('square',mf(m+i),d,v,.005,2600));
 if(T.am){const wd=(f,fe,v,d,bq)=>{const x=AC.createBufferSource(),q=AC.createBiquadFilter(),a=AC.createGain();x.buffer=nzB(d);q.type=bq||'lowpass';if(bq)q.Q.value=.6;q.frequency.setValueAtTime(f,t);q.frequency.linearRampToValueAtTime(fe,t+d*.5);q.frequency.linearRampToValueAtTime(f,t+d);a.gain.setValueAtTime(.0001,t);a.gain.linearRampToValueAtTime(v,t+d*.45);a.gain.linearRampToValueAtTime(.0001,t+d);x.connect(q);q.connect(a);a.connect(B);x.start(t)};
  if(s==0&&bar%2==0){wd(260,520,.07,6.5);wd(420,760,.022,6.5,'bandpass')}
  if(s==8&&bar%2==1)wd(200,430,.05,5.5);return}
 if(T.tn==1){const R=T.r,h=mh(T.sd,sec,bi,s);
  if(s==0){nt('sawtooth',mf(R-12),sd*16,.1,.8,260);nt('sawtooth',mf(R-12)*1.0145,sd*16,.08,.8,260);if(sec>0&&bar%2)nt('sawtooth',mf(R-6),sd*16,.05,.8,240)}
  if(sec==0){if(s==0&&bi%2==0)kick(.14);if(s==3&&bi%2==0)kick(.1);if(s==0&&h%3==0)nt('sine',mf(R+36+[0,1,6,7][(h>>>3)%4]),sd*14,.03,2.5);if(s==0&&bi%4==2)no('bandpass',1800,sd*14,.03)}
  else if(sec==1){if(s==0||s==3)kick(s?.12:.22);if(bi>=4&&(s==8||s==11))kick(s%8?.1:.18);if(s==0||s==8)vb(R+24-((bi*2+(s>>3))%7),sd*8,.05);if(s==0&&bi==7)rs(sd*16)}
  else if(sec==2){if(s%2==0)nt('sawtooth',mf(R-12+(s%8==6?6:0)),sd*1.6,.12,.01,420);if(s==0||s==3||s==8||s==11)kick(s%8?.14:.28);if((s==4||s==12)&&bi%2==0){cl(R+12,sd*3,.035);no('bandpass',2500,.12,.1)}if(s==0&&bi==7)rs(sd*16)}
  else{if((s==0||s==3)&&bi<4)kick(s?.1:.2);if(s==0&&(bi==2||bi==5))nt('triangle',mf(R+48+(bi==5?1:0)),sd*10,.03,.01);if(bi==6&&s==8){cl(R+12,sd*6,.06);kick(.4);no('lowpass',900,.4,.2)}if(bi==7&&s==0)rs(sd*16);if(bi>=4&&bi<6&&s==0)vb(R+19-(bi-4),sd*14,.04)}
  return}
 if(T.tn==2){const R=T.r,rt=R+[0,1,0,8][bar%4],ar=[0,1,3,7,6,3,1,0][s>>1],bs=(f,d,v)=>nt('sawtooth',mf(f),d,v,.008,500);
  if(sec==0){if(s%2==0)bs(rt-12,sd*1.7,.12);if(s==0||s==8)kick(.28);if(s==0)nt('sine',mf(rt-24),sd*10,.2,.01);if(s==0&&bi%2==0){nt('sawtooth',mf(R+24),sd*30,.03,2,1400);nt('sawtooth',mf(R+25),sd*30,.03,2,1400)}if(bi==11&&s==0)rs(sd*16)}
  else if(sec==1){if(s%2==0){bs(rt-12+(s%8==6?1:0),sd*1.7,.13);hat(.04);nt('square',mf(R+24+ar),sd*1.6,.022,.005,2400)}if(s%4==0)kick(.28);if(s==4||s==12)snare();if(s==0&&bi%4==0)cl(R+24,sd*4,.03);if(bi==11&&s==0)rs(sd*16)}
  else if(sec==2){if(s==0){nt('sine',mf(rt-24),sd*14,.2,.01);nt('sawtooth',mf(rt-12),sd*16,.09,.6,300)}if(s==0||s==8)vb(R+24-(bi%6),sd*8,.06);if(s==8)kick(.22);if(bi%2&&s==4)no('bandpass',2000,.1,.06);if(bi==11&&s==0)rs(sd*16)}
  else{if(s%2==0){bs(rt-12+(s%8==6?12:0),sd*1.7,.14);hat(.045);nt('square',mf(R+24+ar+(bi%4==3?12:0)),sd*1.5,.025,.005,2600)}if(s%4==0||s==10)kick(.3);if(s==4||s==12)snare();if(s==0){cl(rt+12,sd*3,.04);no('highpass',5000,.35,.07)}if(bi==11&&s==0)rs(sd*16)}
  return}
 if(s%2==0&&T.lv){const h=mh(T.sd,ty,bi,s);if(s%8==0||(h%100)/100<T.ld){const m=s%8==0?base+12+iv[h%3]+(h&8?12:0):T.r+12+T.sc[h%T.sc.length]+(h&16?12:0);nt(T.lw,mf(m),sd*(T.lw=='sine'?3.5:1.8),T.lv,.01,T.lw=='sawtooth'?2200:0)}}
 if(T.ar&&s%T.ar==0){const k=(s/T.ar)|0;nt(T.aw,mf(base+12+iv[k%3]+(k%6>2?12:0)),sd*T.ar*.9,T.av,.005,T.aw=='square'?2500:0)}
 if(s==0&&T.pv)iv.forEach(i=>nt(T.pw,mf(base+i),sd*16,T.pv,.5,T.pw=='sawtooth'?700:1500));
 let bn=null;if(T.bp==0){if(s==0)bn=[br,7];else if(s==8)bn=[br,5];else if(s==12)bn=[br+7,3]}else if(T.bp==1){if(s%2==0)bn=[s==6||s==14?br+12:br,1.6]}else if(T.bp==2){if([0,3,6,10,12].includes(s))bn=[s==6||s==12?br+7:br,2.2]}else if(s==0)bn=[br,15];
 if(bn)nt(T.bw,mf(bn[0]),bn[1]*sd,T.bv,.01,T.bw=='sawtooth'?380:800);
 const k=T.kt;
 if(k==1){if(s==0||s==8)kick(.2);if(s==4||s==12)hat(.025)}
 else if(k==2){if([0,6,8,11].includes(s))kick(.24);if(s==4||s==12)snare();if(s%2==0)hat(.04)}
 else if(k==3){if(s==0||s==8)kick(.28);if(s==4||s==12){nt('square',830,.12,.05);nt('square',1250,.1,.03);no('bandpass',2600,.08,.07)}if(s%4==2)no('bandpass',3500,.05,.05)}
 else if(k==4){if(s==0||s==3)kick(s?.18:.3)}
 else if(k==5){if(s%4==0||s==10)kick(.28);if(s==4||s==12)snare();if(s%2==0)hat(.045);if(s==14)no('highpass',6000,.18,.05)}
 else if(k==6){if(s==0||s==3||(bar%2&&(s==8||s==11)))kick(s%8?.2:.32);if(bar%4==3&&s==0){const d=sd*16,x=AC.createBufferSource(),q=AC.createBiquadFilter(),a=AC.createGain();x.buffer=nzB(d);q.type='bandpass';q.Q.value=3;q.frequency.setValueAtTime(300,t);q.frequency.exponentialRampToValueAtTime(3500,t+d);a.gain.setValueAtTime(.0001,t);a.gain.exponentialRampToValueAtTime(.09,t+d*.95);a.gain.linearRampToValueAtTime(0,t+d);x.connect(q);q.connect(a);a.connect(B);x.start(t)}}}
function musTick(){if(!AC&&!GEST)return;try{AC=AC||new AudioContext();if(document.hidden){if(AC.state=='running')AC.suspend();return}if(AC.state=='suspended')AC.resume();sfxTick();
 const want=MO?-1:musWant();
 if(want!=MC){if(MB){const o=MB;o.gain.cancelScheduledValues(AC.currentTime);o.gain.setTargetAtTime(0,AC.currentTime,.25);setTimeout(()=>{try{o.disconnect()}catch(e){}},1800)}
  if(MC>=0)MP[MC]=MS;MB=null;MC=want;MS=want>=0&&want!=9?((MP[want]||0)&~15):0;if(want>=0){if(!MK){MK=AC.createDynamicsCompressor();MK.threshold.value=-16;MK.ratio.value=5;MK.connect(vOut(1))}MB=AC.createGain();MB.gain.setValueAtTime(0,AC.currentTime);MB.gain.linearRampToValueAtTime(.55*(MT[want].g||1),AC.currentTime+.8);MQ=AC.createGain();MB.connect(MQ);MQ.connect(MK);MN=AC.currentTime+.08}}
 if(!MB)return;if(MQ)MQ.gain.setTargetAtTime(MC==7?(S.mode=='play'&&lowHp()?.06:.75):1,AC.currentTime,.5);const T=MT[MC],sd=60/T.b/4;while(MN<AC.currentTime+.35){try{musStep(T,MS,MN,sd)}catch(e){}MN+=sd;MS++}}catch(e){}}
addEventListener('pointerdown',()=>{GEST=1});addEventListener('keydown',()=>{GEST=1});setInterval(musTick,100);
function jingle(n,t='square',d=.12,v=.06){if(mute)return;try{AC=AC||new AudioContext();const s0=AC.currentTime+.02;n.forEach((f,k)=>{if(!f)return;const o=AC.createOscillator(),a=AC.createGain(),b=s0+k*d;o.type=t;o.frequency.setValueAtTime(f,b);a.gain.setValueAtTime(v,b);a.gain.exponentialRampToValueAtTime(.001,b+d*.95);o.connect(a);a.connect(vOut(0));o.start(b);o.stop(b+d)})}catch(e){}}
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
