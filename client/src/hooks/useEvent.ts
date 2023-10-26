import { useCallback, useRef } from 'react';

export type Callback = (...args: unknown[]) => unknown;

/* Альтернатива useCallback, которая все зависимости получает из замыкания.
 * Придумал ее Дэн Абрамов https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md
 * Видео об этом https://youtu.be/qLQyjhU3fqg?si=dZiOLK2f17HwXPzc
 * Данная реализация немного отличается от оригинальной, однако работает ничуть не хуже
 *  */
export const useEvent = <T extends Callback = Callback>(callback: T): T => {
  const copy = useRef<T>();
  copy.current = callback;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback<T>(((...args) => copy.current(...args)) as T, []);
};
