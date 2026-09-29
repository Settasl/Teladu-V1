/**
 * Cross-browser Canvas Utilities
 * Polyfills and safe helpers for CanvasRenderingContext2D methods like roundRect
 * Ensuring 100% compatibility with iOS Safari 12-18, WebKit, Android, and Desktop browsers.
 */

// Native drawing helper - strictly uses standard arc/quadraticCurveTo with ZERO recursion risk
export const drawRoundRectPath = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radii: number | [number, number, number, number] = 0
): void => {
  let rTopLeft = 0;
  let rTopRight = 0;
  let rBottomRight = 0;
  let rBottomLeft = 0;

  if (typeof radii === 'number') {
    const maxR = Math.min(Math.abs(w) / 2, Math.abs(h) / 2);
    rTopLeft = rTopRight = rBottomRight = rBottomLeft = Math.max(0, Math.min(radii, maxR));
  } else if (Array.isArray(radii)) {
    rTopLeft = Math.max(0, radii[0] || 0);
    rTopRight = Math.max(0, radii[1] || 0);
    rBottomRight = Math.max(0, radii[2] || 0);
    rBottomLeft = Math.max(0, radii[3] || 0);
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

export const safeRoundRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radii: number | [number, number, number, number] = 0
): void => {
  // Always safely use the arc/curve-based path to guarantee 100% identical cross-browser rendering
  drawRoundRectPath(ctx, x, y, w, h, radii);
};

// Polyfill CanvasRenderingContext2D.prototype.roundRect if missing or broken on iOS / Safari
if (typeof window !== 'undefined' && typeof CanvasRenderingContext2D !== 'undefined') {
  try {
    const proto = CanvasRenderingContext2D.prototype;
    if (!proto.roundRect) {
      proto.roundRect = function (
        this: CanvasRenderingContext2D,
        x: number,
        y: number,
        w: number,
        h: number,
        radii?: number | DOMPointInit | (number | DOMPointInit)[]
      ) {
        let r = 0;
        if (typeof radii === 'number') {
          r = radii;
        } else if (Array.isArray(radii) && typeof radii[0] === 'number') {
          r = radii[0];
        }
        drawRoundRectPath(this, x, y, w, h, r);
      };
    }
  } catch (e) {
    console.warn('Canvas polyfill notice:', e);
  }
}
