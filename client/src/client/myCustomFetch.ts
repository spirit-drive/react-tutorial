import { URL } from 'src/client/config';

export const myCustomFetch = <T = Response>(input: string, init?: RequestInit): Promise<T> =>
  fetch(`${URL}${input}`, init).then(async (res) => {
    if (res.status === 200) return res.json();
    return Promise.reject(await res.json());
  });
