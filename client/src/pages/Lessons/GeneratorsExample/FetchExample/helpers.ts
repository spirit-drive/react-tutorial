export function* fetchOneGen(id = '1'): Generator {
  yield fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then((response) => response.json());
}

export const fetchOne = fetchOneGen();

export function* fetchInfinityGen(id = 1): Generator {
  let i = id;
  while (true) {
    yield fetch(`https://jsonplaceholder.typicode.com/todos/${i++}`).then((response) => response.json());
  }
}

export const fetchInfinity = fetchInfinityGen();

export const getFromToItems = (from: number, to: number) => ({
  from,
  to,
  async *[Symbol.asyncIterator]() {
    for (let i = from; i <= to; i++) {
      yield await fetch(`https://jsonplaceholder.typicode.com/todos/${i}`).then((response) => response.json());
    }
  },
});
