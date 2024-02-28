/* eslint-disable import/no-extraneous-dependencies */
import { useState, useCallback } from 'react';
import { renderHook, act } from '@testing-library/react';

function useCounter(initialState = 0) {
  const [count, setCount] = useState(initialState);
  const increment = useCallback(() => setCount((x) => x + 1), []);
  const reset = useCallback(() => setCount(initialState), [initialState]);
  return { count, increment, reset };
}

describe('basic hooks testing', () => {
  test('render', () => {
    const { result } = renderHook(useCounter);

    expect(result.current.count).toBe(0);
    expect(typeof result.current.increment).toBe('function');
  });

  test('update', () => {
    const { result } = renderHook(useCounter);

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  test('should reset counter to updated initial value', () => {
    let initialValue = 0;
    const { result, rerender } = renderHook(() => useCounter(initialValue));

    initialValue = 10;

    expect(result.current.count).toBe(0);
    rerender();
    expect(result.current.count).toBe(0);

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(10);
  });
});
