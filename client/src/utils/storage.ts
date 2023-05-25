export const storage = {
  get: (key: string): string => localStorage.getItem(key),
  set: (key: string, value: string): void => localStorage.setItem(key, value),
  clear: (): void => localStorage.clear(),
  remove: (...keys: string[]): void => keys.forEach((key) => localStorage.removeItem(key)),
};
