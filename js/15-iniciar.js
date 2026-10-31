// ════════════════════════════════════════════════════════════
// ─ ARQUIVO: 15-iniciar.js — Início
// ─ Última linha carregada: abre o menu e liga o laço do jogo.
// ════════════════════════════════════════════════════════════
// ─ Inicia o jogo: abre o menu e liga o laço
menu();
requestAnimationFrame(loop);
setTimeout(fit, 50);
addEventListener('orientationchange', () => setTimeout(fit, 150));
