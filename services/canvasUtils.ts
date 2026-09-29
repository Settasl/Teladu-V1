/**
 * Cross-browser Canvas Utilities
 * Polyfills and safe helpers for CanvasRenderingContext2D methods like roundRect
 * Ensuring 100% compatibility with iOS Safari 12-16+, Android, and Desktop browsers.
 */

export const safeRoundRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radii: number | [number, number, number, number] = 0
) => {
  if (typeof ctx.roundRect === 'function') {
    try {
      ctx.roundRect(x, y, w, h, radii);
      return;
    } catch {
      // Fallback below
    }
  }

  // Cross-browser arc-based rounded rectangle fallback
  let rTopLeft = 0;
  let rTopRight = 0;
  let rBottomRight = 0;
  let rBottomLeft = 0;

  if (typeof radii === 'number') {
    rTopLeft = rTopRight = rBottomRight = rBottomLeft = Math.min(radii, w / 2, h / 2);
  } else if (Array.isArray(radii)) {
    rTopLeft = radii[0] || 0;
    rTopRight = radii[1] || 0;
    rBottomRight = radii[2] || 0;
    rBottomLeft = radii[3] || 0;
  }

  ctx.moveTo(x + rTopLeft, y);
  ctx.lineTo(x + w - rTopRight, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rTopRight);
  ctx.lineTo(x + w, y + h - rBottomRight);
  ctx.quadraticCurveTo(x + w, y + h, x + w - rBottomRight, y + h);
  ctx.lineTo(x + rBottomLeft, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - rBottomLeft);
  ctx.lineTo(x, y + rTopLeft);
  ctx.quadraticCurveTo(x, y, x + rTopLeft, y);
};

// Polyfill CanvasRenderingContext2D.prototype.roundRect if missing on older iOS / Safari
if (typeof window !== 'undefined' && typeof CanvasRenderingContext2D !== 'undefined') {
  if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function (
      this: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
      radii?: number | DOMPointInit | (number | DOMPointInit)[]
    ) {
      const radius = typeof radii === 'number' ? radii : 0;
      safeRoundRect(this, x, y, w, h, radius);
    };
  }
}
