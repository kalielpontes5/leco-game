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
