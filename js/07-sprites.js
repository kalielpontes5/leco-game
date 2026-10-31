// ════════════════════════════════════════════════════════════
// ─ ARQUIVO: 07-sprites.js — Sprites e cenário
// ─ Sprites (pistas, pessoas, inimigos, folha), decorações, árvores, céu, colinas e materiais.
// ════════════════════════════════════════════════════════════
// ---- sprites ----
// ─ docR: desenho da pista (documento)
const docR=mir(['.kkkkk','kwwwww','kwSSSS','kwwwww','kwSSSS','kwwwww','kwSSSw','kwwwww','kwSSSS','kwwwww','kwwwyy','kwwwyY','.kkkkk']);
// ─ PR: desenho das pessoas
const PR=['..kkkk..','.knnnnk.','.kffffk.','.kfkfkk.','.kffffk.','..kffk..','.kbbbbk.','kbbbbbbk','kbbbbbbk','kbbbbbbk','.kbbbbk.','.kkkkkk.','.kk..kk.','kkk..kkk'];
// ─ SP: sprites principais (pistas, pessoas, espinho, gota, folha, drone, inimigos)
const SP={doc:spr(docR),docB:spr(docR,{...Q,w:'#d4eeff',S:Q.b}),
 pers:['#48A9E8','#F28AA5','#FF9B54'].map(b=>spr(PR,{...Q,b})),
 spike:spr(mir(['...r','..rr','..rR','.rrR','.rrR','rrrR','rrrR','kkkk'])),
 drop:spr(['..k..','.kgk.','.kgk.','kglgk','kggGk','kgGGk','.kGGk.'.slice(0,5),'..k..']),
 leaf:spr(['...kk..','..kllk.','.kllgGk','kllgGGk','kllgGk.','.kgGk..','..kk...','...k...']),
 drone:spr(mir(['...kkkk','..kkooo','.kooooo','kooooow','koooowk','kooooow','.kooooo','..kkkoo','....kkk'])),
 e0:spr(mir(['....gg','...gGg','..kkkk','.koooo','kooooo','kooowk','kooooo','koorrr','.koooo','..kkkk','..kk..','.kkk..'])),
 e1:spr(mir(['..kkkk','.kssss','kNnnnn','kNnnnn','kgglwk','kgggGg','kNnngn','kNnnnn','kNnnnn','kNnnnn','kNnnnn','kkkkkk']))};
// ─ Decorações: moitas, flores, pedras
const tuft=spr(['..l..l.','.gl.gl.','gGgGGlg','.GgGgG.','..GGG..']),fl=c=>spr(['..p..','.pyp.','..p..','..G..','gGG..','..GGg','..G..'],{...Q,p:c}),rock=spr(['..sss..','.ssSSs.','sssSSSS','SSSSSSS','.SSSSS.']),mush=spr(['.rrr.','rwrwr','rrrrr','..c..','..c..']),pot=spr(['..g.g..','.gGgGg.','..ooo..','.ooooo.','.onnno.','.onnno.','..nnn..']);
// ─ dtuft: moita seca
const dtuft=spr(['..l..l.','.gl.gl.','gGgGGlg','.GgGgG.','..GGG..'],{...Q,l:'#b08a4a',g:'#8a6a3a',G:'#5a4326'});
// ─ DECO: decorações de cada fase
const DECO=[null,[tuft,fl('#fffdf4'),rock,tuft,fl('#f08a3c')],null,[tuft,fl('#fffdf4'),mush,rock,tuft],null,[rock,dtuft,rock,dtuft]];
// ─ CL: nuvem
const CL=mk(48,18,x=>{el(x,24,12,22,5,'#cfe7f3');el(x,14,10,9,6,'#f4fbff');el(x,26,7,11,7,'#fff');el(x,37,10,8,5,'#f4fbff')});
// ─ tree: gerador de árvores
const tree=(w,h,c)=>mk(w,h,x=>{const th=Math.round(h*.4),tx=w>>1;x.fillStyle=c.t;x.fillRect(tx-2,h-th,5,th);x.fillStyle=c.td;x.fillRect(tx+1,h-th,2,th);x.fillStyle=c.tl;x.fillRect(tx-2,h-th,1,th);const B=[[.5,.32,.46,.3],[.26,.5,.28,.2],[.74,.5,.28,.2],[.5,.55,.38,.17]];B.forEach(([a,b,r,s])=>el(x,w*a+1,h*b*.9+1,w*r,h*s,c.d));B.forEach(([a,b,r,s])=>el(x,w*a,h*b*.9,w*r,h*s,c.m));B.forEach(([a,b,r,s])=>el(x,w*a-w*.08,h*b*.9-h*.05,w*r*.6,h*s*.55,c.l))});
// ─ Árvores prontas
const TR1=tree(34,64,{t:'#6b4a35',td:'#4a3223',tl:'#8a6446',d:'#2f7d5a',m:'#4aa86e',l:'#8bdc8a'}),TRM=tree(60,120,{t:'#6b4a35',td:'#43301f',tl:'#8f6a48',d:'#1f6b34',m:'#2f9a46',l:'#7bd35a'}),TRF=tree(48,90,{t:'#5f8a6a',td:'#4f7a5a',tl:'#6f9a7a',d:'#4f9a6a',m:'#6fb683',l:'#9bd69a'});
// ─ FOLI: folhagem
const FOLI=mk(34,14,x=>{el(x,8,11,11,4,'#1f6b34');el(x,22,10,12,5,'#2a7f3c');el(x,16,12,9,3,'#3f9a4a');el(x,10,9,5,2,'#7bd35a');el(x,24,8,5,2,'#8fe06a')});
// ─ STALL: cores das barracas
const STALL=[['#e2564b','#fff4dc'],['#3f9f5a','#fff4dc'],['#f2b54a','#fff4dc']].map((cc,n)=>mk(56,62,x=>{for(let i=0;i<56;i+=7){x.fillStyle=cc[(i/7)&1];x.fillRect(i,0,7,12);x.fillRect(i,12,7,2)}x.fillStyle='#8a5a38';x.fillRect(2,14,3,48);x.fillRect(51,14,3,48);x.fillStyle='#c99a63';x.fillRect(0,40,56,22);x.fillStyle='#a07440';for(let j=46;j<62;j+=5)x.fillRect(0,j,56,1);x.fillStyle='#e0b57a';x.fillRect(0,40,56,2);for(let i=0;i<7;i++){x.fillStyle=['#e2564b','#f08a3c','#6fbf4a','#ffd45a'][(i+n)&3];x.fillRect(6+i*7,36+(i&1),4,4)}outl(x.canvas,'#3a2a22')}));
// ─ MAT: materiais das plataformas
const MAT=[{c:['#e3c27b','#b58b4a'],b:['#c99a63','#a07440'],t:1},{c:['#6cc24f','#2f7d3a'],b:['#8c5e3b','#5e3a24'],t:0},{c:['#dfe5ea','#9aa7b3'],b:['#aab5c0','#7d8a98'],t:1},{c:['#58b84c','#2a6f36'],b:['#7a4e30','#4e301c'],t:0},{c:['#f0cf6a','#b8902f'],b:['#c3d0dc','#91a2b4'],t:1},{c:['#8a7b6a','#4e4338'],b:['#5e4a3a','#2f261e'],t:0}].map((m,k)=>{m.o='#1d1a17';m.B=mk(16,16,x=>{x.fillStyle=m.b[0];x.fillRect(0,0,16,16);if(m.t){const lt=mixc(m.b[0],'#ffffff',.22);for(let r=0;r<2;r++){const y=r*8;x.fillStyle=m.b[1];x.fillRect(0,y,16,1);x.fillRect(r?4:0,y,1,8);x.fillRect(r?12:8,y,1,8);x.fillStyle=lt;x.fillRect(0,y+1,16,1)}}else{for(let i=0;i<26;i++){x.fillStyle=m.b[1];x.fillRect(Math.floor(rnd(i+k)*15),Math.floor(rnd(i*3+k)*15),1+(i&1),1)}for(let i=0;i<4;i++){const a=Math.floor(rnd(i+40+k)*12),b=Math.floor(rnd(i+70+k)*12);x.fillStyle='#8f8a82';x.fillRect(a,b,3,2);x.fillStyle='#c4bfb6';x.fillRect(a,b,2,1)}}});m.C=mk(16,7,x=>{x.fillStyle=m.c[0];x.fillRect(0,0,16,4);x.fillStyle=mixc(m.c[0],'#ffffff',.3);x.fillRect(0,0,16,1);x.fillStyle=m.c[1];x.fillRect(0,4,16,1);for(let i=0;i<16;i++)if(rnd(i+k*9)<.6){x.fillRect(i,5,1,1+(rnd(i+9+k)<.4?1:0))}});return m});
// ─ SKY/sky: céu de cada fase
const SKY={},sky=l=>SKY[l.k]||(SKY[l.k]=mk(384,216,x=>{const n=7;for(let i=0;i<n;i++){x.fillStyle=mixc(l.sk[0],l.sk[1],i/(n-1));x.fillRect(0,i*31,384,31);if(i<n-1){x.fillStyle=mixc(l.sk[0],l.sk[1],(i+1)/(n-1));for(let j=0;j<384;j+=2){x.fillRect(j,i*31+29,1,1);x.fillRect(j+1,i*31+30,1,1)}}}}));
// ─ BC: cores e pequenos ajudantes
const BC=['#FF9B54','#F28AA5','#FFD45A','#48A9E8'],mod=(n,m)=>((n%m)+m)%m,rep=(s,f,fn,cx)=>{const o=cx*f,b=Math.floor(o/s);for(let i=-1;i<=384/s+1;i++)fn(Math.round(i*s-(o-b*s)),b+i)};
// ─ hills: colinas ao fundo
const hills=(cx,fac,base,amp,col,top)=>{for(let x=0;x<384;x+=2){const u=x+cx*fac,h=Math.round(base-amp*(Math.sin(u/37)+.6*Math.sin(u/17+1)));g.fillStyle=col;g.fillRect(x,h,2,216-h);g.fillStyle=top;g.fillRect(x,h,2,1)}};

