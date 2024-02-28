export type DeepObj = {
  [key: string]: string | DeepObj;
};

export const createDeepObjByRecord = (record: Record<string, string>): DeepObj => {
  const result: DeepObj = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(record)) {
    const keys = key.split('.');
    let nestedObj = result;
    for (let i = 0; i < keys.length; i++) {
      const currentKey = keys[i];
      if (i === keys.length - 1) {
        nestedObj[currentKey] = value;
      } else {
        nestedObj[currentKey] = nestedObj[currentKey] || {};
        nestedObj = nestedObj[currentKey] as DeepObj;
      }
    }
  }
  return result;
};
