/** Reads current theme palette colors for the Lissajous canvas. */
function getPalette() {
  const styles = getComputedStyle(document.documentElement);
  return {
    bg: styles.getPropertyValue('--surface').trim(),
    accent: styles.getPropertyValue('--accent').trim(),
    saffron: styles.getPropertyValue('--saffron').trim(),
    sage: styles.getPropertyValue('--sage').trim(),
  };
}

/** Resizes canvas backing store cleanly for high-DPI displays (capped at 2x). */
function resizeCanvas(canvas, ctx) {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.max(1, Math.round(rect.width * dpr));
  canvas.height = Math.max(1, Math.round(rect.height * dpr));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { width: rect.width, height: rect.height };
}

/** Renders one harmonograph / Lissajous frame and updates the caption. */
function drawCurve(ctx, size, state, caption) {
  const { bg, accent, saffron, sage } = getPalette();
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, size.width, size.height);

  const cx = size.width / 2;
  const cy = size.height / 2;
  const rx = size.width * 0.38;
  const ry = size.height * 0.36;

  for (let layer = 0; layer < 3; layer += 1) {
    ctx.beginPath();
    ctx.strokeStyle = [accent, saffron, sage][layer];
    ctx.globalAlpha = [0.85, 0.55, 0.45][layer];
    ctx.lineWidth = [2.2, 1.5, 1.2][layer];
    for (let i = 0; i <= 420; i += 1) {
      const t = (i / 420) * Math.PI * 2;
      const damp = 1 - layer * 0.08;
      const x = cx + rx * damp * Math.sin(state.a * t + state.phase + layer * 0.35);
      const y = cy + ry * damp * Math.sin(state.b * t + layer * 0.2);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  if (caption) {
    caption.textContent = `x = sin(${state.a.toFixed(2)}t + ${state.phase.toFixed(2)}), y = sin(${state.b.toFixed(2)}t)`;
  }
}

/** Initializes the interactive, visibility-aware Lissajous hero canvas. */
export function initHeroArt() {
  const canvas = document.getElementById('hero-canvas');
  const caption = document.getElementById('hero-equation');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const state = { a: 3, b: 2, phase: 0.42, visible: true, rafId: 0 };
  let size = resizeCanvas(canvas, ctx);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const updatePointer = (event) => {
    const rect = canvas.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / Math.max(1, rect.width);
    const ny = (event.clientY - rect.top) / Math.max(1, rect.height);
    state.a = 2 + Math.round(nx * 4 * 4) / 4;
    state.b = 1 + Math.round(ny * 4 * 4) / 4;
    if (reduced) drawCurve(ctx, size, state, caption);
  };

  canvas.addEventListener('pointermove', updatePointer);
  window.addEventListener('resize', () => {
    size = resizeCanvas(canvas, ctx);
    drawCurve(ctx, size, state, caption);
  }, { passive: true });

  const tick = () => {
    if (state.visible && !document.hidden) {
      state.phase = (state.phase + 0.008) % (Math.PI * 2);
      drawCurve(ctx, size, state, caption);
    }
    state.rafId = requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(([entry]) => {
    state.visible = Boolean(entry && entry.isIntersecting);
  });
  observer.observe(canvas);

  drawCurve(ctx, size, state, caption);
  if (!reduced) state.rafId = requestAnimationFrame(tick);
}