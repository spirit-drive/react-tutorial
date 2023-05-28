// https://en.wikipedia.org/wiki/Pyramid_of_doom_(programming)
// https://stackoverflow.com/a/28032438/10828885

export function spawn<A, P, G>(generator: (...args: A[]) => Generator<G>) {
  return (...args: A[]): Promise<P> => {
    const iter = generator(...args);

    return Promise.resolve().then(function onValue(lastValue): P | Promise<P> {
      const result = iter.next(lastValue);

      const { done, value } = result;

      if (done) {
        // generator done, resolve promise
        return value;
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return Promise.resolve(value).then(onValue, iter.throw.bind(iter)) as Promise<P>; // repeat
    });
  };
}
