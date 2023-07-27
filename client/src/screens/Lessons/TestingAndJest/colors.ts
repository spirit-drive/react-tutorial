type Red = number;
type Green = number;
type Blue = number;

export const shortColorRegExp = /^#[0-9a-f]{3}$/i;
export const longColorRegExp = /^#[0-9a-f]{6}$/i;

export const checkColor = (color: string): never | void => {
  if (!longColorRegExp.test(color) && !shortColorRegExp.test(color)) throw new Error(`invalid hex color: ${color}`);
};

export const hex2rgb = (color: string): [Red, Green, Blue] => {
  checkColor(color);
  if (shortColorRegExp.test(color)) {
    const red = parseInt(color.substring(1, 2), 16);
    const green = parseInt(color.substring(2, 3), 16);
    const blue = parseInt(color.substring(3, 4), 16);
    return [red, green, blue];
  }
  const red = parseInt(color.substring(1, 3), 16);
  const green = parseInt(color.substring(3, 5), 16);
  const blue = parseInt(color.substring(5, 8), 16);
  return [red, green, blue];
};

const toHexValue = (color: number): string => {
  const hex = color.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
};

export const toHex = (red: number, green: number, blue: number) => {
  const redHex = toHexValue(red);
  const greenHex = toHexValue(green);
  const blueHex = toHexValue(blue);

  return `#${redHex}${greenHex}${blueHex}`;
};
