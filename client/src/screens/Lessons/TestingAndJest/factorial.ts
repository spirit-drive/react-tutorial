export const factorial = (n: number): number | never => {
  if (n < 0) throw new Error(`n must be more zero, but it is: ${n}`);
  if (n !== Math.round(n)) throw new Error(`n must be whole digit, but it is: ${n}`);
  let result = 1;
  let count = n;
  while (count > 1) {
    result *= count--;
  }
  return result;
};
