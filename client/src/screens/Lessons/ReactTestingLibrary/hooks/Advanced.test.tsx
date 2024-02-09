/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useContext } from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';

const CounterStepContext = React.createContext(1);

type CounterStepProviderProps = { step: number; children: React.ReactNode };
export const CounterStepProvider: React.FC<CounterStepProviderProps> = ({ step, children }) => (
  <CounterStepContext.Provider value={step}>{children}</CounterStepContext.Provider>
);

export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const step = useContext(CounterStepContext);
  const increment = useCallback(() => setCount((x) => x + step), [step]);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  const incrementAsync = useCallback(() => setTimeout(increment, 100), [increment]);
  return { count, increment, reset, incrementAsync };
}

describe('advanced hooks testing', () => {
  test('should use custom step when incrementing', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CounterStepProvider step={2}>{children}</CounterStepProvider>
    );
    const { result } = renderHook(() => useCounter(20), { wrapper });

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(22);
  });

  test('returns logged in user', () => {
    const { result, rerender } = renderHook((props: Record<string, unknown> = {}) => props, {
      initialProps: { name: 'Alice' },
    });
    expect(result.current).toEqual({ name: 'Alice' });
    rerender();
    expect(result.current).toEqual({ name: undefined });
  });

  test('should increment counter after delay', async () => {
    const { result } = renderHook(() => useCounter());

    result.current.incrementAsync();

    await waitFor(() => expect(result.current.count).toBe(1));
  });
});
