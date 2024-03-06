export const getArray = (length: number) =>
  Array(length)
    .fill('')
    .map((_, i) => i);

export function* permute(arr: number[], m: number[] = []): Generator<number[]> {
  if (arr.length === 0) {
    yield m;
  } else {
    for (let i = 0; i < arr.length; i++) {
      const curr = [...arr];
      const next = curr.splice(i, 1);
      yield* permute(curr.slice(), m.concat(next));
    }
  }
}
