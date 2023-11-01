/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

function SomeComponent() {
  return (
    <div aria-label="test" id="some-component">
      <div aria-label="test">Название</div>
      <div>Описание</div>
    </div>
  );
}

describe('snapshot testing', () => {
  test('SomeComponent', () => {
    const { container } = render(<SomeComponent />);
    expect(container).toMatchSnapshot();
  });
});
