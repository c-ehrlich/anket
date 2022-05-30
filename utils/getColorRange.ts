export type ColorRGB = {
  r: number;
  g: number;
  b: number;
};

/*
 * Creates an array representing a range of colors
 * inputs:
 * - start, end: starting and ending colors (hex)
 *   example: '#1f4456'
 * - colors: number of colors to generate (min. 2)
 */
export function getColorRange({
  start,
  end,
  count,
}: {
  start: string;
  end: string;
  count: number;
}): string[] {
  const gradientRGB: ColorRGB[] = [];

  const startAsCol = hexToRGB(start);
  const endAsCol = hexToRGB(end);
  const diff: ColorRGB = {
    r: endAsCol.r - startAsCol.r,
    g: endAsCol.g - startAsCol.g,
    b: endAsCol.b - startAsCol.b,
  };

  for (let i = 0; i < count; i++) {
    gradientRGB.push({
      r: startAsCol.r + diff.r * (i / (count - 1)),
      g: startAsCol.g + diff.g * (i / (count - 1)),
      b: startAsCol.b + diff.b * (i / (count - 1)),
    });
  }

  const gradientHex = gradientRGB.map((color) => rgbToHex(color));

  return gradientHex;
}

function hexToRGB(hexColor: string): ColorRGB {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  return { r, g, b };
}

function rgbToHex(color: ColorRGB): string {
  let r = String(Math.floor(color.r).toString(16));
  if (r.length === 1) r = '0' + r;
  let g = String(Math.floor(color.g).toString(16));
  if (g.length === 1) g = '0' + g;
  let b = String(Math.floor(color.b).toString(16));
  if (b.length === 1) b = '0' + b;
  return `#${r}${g}${b}`;
}
