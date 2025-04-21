export const stickerify = (
  image: HTMLImageElement,
  thickness = 1,
  fillStyle: string | CanvasGradient | CanvasPattern = "white",
  samples = 36,
): HTMLCanvasElement => {
  // 1px buffer in case of rounding errors etc.
  const x = thickness + 1,
    y = thickness + 1;

  const canvas = createCanvas(image.width + x * 2, image.height + y * 2);
  const ctx = canvas.getContext("2d");
  invariant(ctx, "Failed to create canvas context");

  for (let angle = 0; angle < 360; angle += 360 / samples) {
    ctx.drawImage(
      image,
      thickness * Math.sin((Math.PI * 2 * angle) / 360) + x,
      thickness * Math.cos((Math.PI * 2 * angle) / 360) + y,
    );
  }

  ctx.globalCompositeOperation = "source-in";
  ctx.fillStyle = fillStyle;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.globalCompositeOperation = "source-over";
  ctx.drawImage(image, x, y);

  return trim(canvas);
};

// trim(canvas) taken from https://gist.github.com/remy/784508
interface Bound {
  top: number | null;
  left: number | null;
  right: number | null;
  bottom: number | null;
}

function trim(c: HTMLCanvasElement): HTMLCanvasElement {
  const ctx = c.getContext("2d")!,
    copy = createCanvas(c.width, c.height).getContext("2d")!,
    pixels = ctx.getImageData(0, 0, c.width, c.height);

  let x: number, y: number;
  const bound: Bound = {
    top: null,
    left: null,
    right: null,
    bottom: null,
  };

  for (let i = 0; i < pixels.data.length; i += 4) {
    if (pixels.data[i + 3] !== 0) {
      x = (i / 4) % c.width;
      y = ~~(i / 4 / c.width);

      if (bound.top === null) {
        bound.top = y;
      }

      if (bound.left === null) {
        bound.left = x;
      } else if (x < bound.left) {
        bound.left = x;
      }

      if (bound.right === null) {
        bound.right = x;
      } else if (bound.right < x) {
        bound.right = x;
      }

      if (bound.bottom === null) {
        bound.bottom = y;
      } else if (bound.bottom < y) {
        bound.bottom = y;
      }
    }
  }

  const trimHeight = bound.bottom! - bound.top! + 1,
    trimWidth = bound.right! - bound.left! + 1,
    trimmed = ctx.getImageData(bound.left!, bound.top!, trimWidth, trimHeight);

  copy.canvas.width = trimWidth;
  copy.canvas.height = trimHeight;
  copy.putImageData(trimmed, 0, 0);

  return copy.canvas;
}

const createCanvas = (width: number, height: number): HTMLCanvasElement => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
};
