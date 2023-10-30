export const diffArrays = (
  arr1: unknown[],
  arr2: unknown[],
  compare: (a: unknown, b: unknown) => boolean = (a, b) => a === b
) => {
  const residue1: unknown[] = [];
  const residue2: unknown[] = [];
  for (let i = 0; i < arr1.length; i++) {
    const item = arr1[i];
    const index = arr2.findIndex((l) => compare(l, item));
    if (index < 0) {
      residue1.push(item);
    }
  }
  for (let i = 0; i < arr1.length; i++) {
    const item = arr2[i];
    const index = arr1.findIndex((l) => compare(l, item));
    if (index < 0) {
      residue2.push(item);
    }
  }
  return [residue1, residue2];
};
