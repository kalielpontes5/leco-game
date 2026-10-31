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
