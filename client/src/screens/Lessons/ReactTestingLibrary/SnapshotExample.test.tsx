/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Queries } from '@testing-library/dom';

function SomeComponent() {
  return (
    <div id="some-component">
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

export interface RenderOptions<
  Q extends Queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container
> {
  /**
   * By default, React Testing Library will create a div and append that div to the document.body. Your React component will be rendered in the created div. If you provide your own HTMLElement container via this option,
   *  it will not be appended to the document.body automatically.
   *x
   *  For example: If you are unit testing a `<tbody>` element, it cannot be a child of a div. In this case, you can
   *  specify a table as the render container.
   *
   *  @see https://testing-library.com/docs/react-testing-library/api/#container
   */
  container?: Container;
  /**
   * Defaults to the container if the container is specified. Otherwise `document.body` is used for the default. This is used as
   *  the base element for the queries as well as what is printed when you use `debug()`.
   *
   *  @see https://testing-library.com/docs/react-testing-library/api/#baseelement
   */
  baseElement?: BaseElement;
  /**
   * If `hydrate` is set to `true`, then it will render with `ReactDOM.hydrate`. This may be useful if you are using server-side
   *  rendering and use ReactDOM.hydrate to mount your components.
   *
   *  @see https://testing-library.com/docs/react-testing-library/api/#hydrate)
   */
  hydrate?: boolean;
  /**
   * Set to `true` if you want to force synchronous `ReactDOM.render`.
   * Otherwise `render` will default to concurrent React if available.
   */
  legacyRoot?: boolean;
  /**
   * Queries to bind. Overrides the default set from DOM Testing Library unless merged.
   *
   *  @see https://testing-library.com/docs/react-testing-library/api/#queries
   */
  queries?: Q;
  /**
   * Pass a React Component as the wrapper option to have it rendered around the inner element. This is most useful for creating
   *  reusable custom render functions for common data providers. See setup for examples.
   *
   *  @see https://testing-library.com/docs/react-testing-library/api/#wrapper
   */
  wrapper?: React.JSXElementConstructor<{ children: React.ReactElement }>;
}
