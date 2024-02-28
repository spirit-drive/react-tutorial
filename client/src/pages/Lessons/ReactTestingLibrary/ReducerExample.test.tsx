/* eslint-disable import/no-extraneous-dependencies, default-param-last */
import React, { useReducer } from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

const initialState = {
  isConfirmed: false,
};

type State = {
  isConfirmed: boolean;
};

type Action = {
  type: 'SUCCESS';
};

function reducer(state: State = initialState, action: Action) {
  const { type } = action;
  switch (type) {
    case 'SUCCESS':
      return {
        ...state,
        isConfirmed: true,
      };

    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const unhandled: never = type;
      return state;
    }
  }
}

const ReducerExample = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <div>{state.isConfirmed ? <p>Confirmed!</p> : <p>Waiting for confirmation...</p>}</div>
      <button type="button" onClick={() => dispatch({ type: 'SUCCESS' })}>
        Confirm
      </button>
    </div>
  );
};

it('shows success message after confirm button is clicked', () => {
  const { getByText } = render(<ReducerExample />);

  expect(getByText(/waiting/i)).toBeInTheDocument();

  fireEvent.click(getByText('Confirm'));

  expect(getByText('Confirmed!')).toBeInTheDocument();
});
