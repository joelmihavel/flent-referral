import { confettiColors } from './constants';

interface ConfettiPiece {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  vx: number;
  vy: number;
  rot: number;
  rotV: number;
  opacity: number;
}

let confettiPieces: ConfettiPiece[] = [];
let confettiAnimId: number | null = null;

export function launchConfetti(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const w = window.innerWidth;
  const h = window.innerHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  confettiPieces = [];
  for (let i = 0; i < 80; i++) {
    confettiPieces.push({
      x: Math.random() * w,
      y: Math.random() * -h * 0.5,
      w: Math.random() * 10 + 5,
      h: Math.random() * 6 + 3,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3 + 2,
      rot: Math.random() * 360,
      rotV: (Math.random() - 0.5) * 12,
      opacity: 1,
    });
  }

  if (confettiAnimId) cancelAnimationFrame(confettiAnimId);

  function animate() {
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);
    let alive = false;

    for (let i = 0; i < confettiPieces.length; i++) {
      const p = confettiPieces[i];
      if (p.opacity <= 0) continue;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.06;
      p.rot += p.rotV;
      if (p.y > h + 20) p.opacity -= 0.03;
      alive = true;
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      const rad = p.rot * 0.01745329;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      ctx.setTransform(cos, sin, -sin, cos, p.x, p.y);
      ctx.fillRect(-p.w * 0.5, -p.h * 0.5, p.w, p.h);
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;

    if (alive) {
      confettiAnimId = requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, w, h);
      confettiAnimId = null;
    }
  }

  animate();
}
