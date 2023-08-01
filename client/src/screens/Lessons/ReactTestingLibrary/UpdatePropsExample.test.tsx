/* eslint-disable import/no-extraneous-dependencies */
import React, { useRef, FC } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

let idCounter = 1;

type NumberDisplayProps = {
  number: number;
};

const NumberDisplay: FC<NumberDisplayProps> = ({ number }) => {
  const id = useRef(idCounter++); // to ensure we don't remount a different instance

  return (
    <div>
      <span data-testid="number-display">{number}</span>
      <span data-testid="instance-id">{id.current}</span>
    </div>
  );
};

test('calling render with the same component on the same container does not remount', () => {
  const { rerender } = render(<NumberDisplay number={1} />);
  expect(screen.getByTestId('number-display')).toHaveTextContent('1');

  // re-render the same component with different props
  rerender(<NumberDisplay number={2} />);
  expect(screen.getByTestId('number-display')).toHaveTextContent('2');

  expect(screen.getByTestId('instance-id')).toHaveTextContent('1');
});
