/* eslint-disable import/no-extraneous-dependencies, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React, { useEffect, FC } from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-root');
document.body.appendChild(modalRoot);

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: FC<ModalProps> = ({ onClose, children }) => {
  const el = document.createElement('div');

  useEffect(() => {
    modalRoot.appendChild(el);

    return () => {
      modalRoot.removeChild(el);
    };
  });

  return ReactDOM.createPortal(
    <div onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        {children}
        <hr />
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>,
    el
  );
};

test('modal shows the children and a close button', () => {
  // Arrange
  const handleClose = jest.fn();

  // Act
  const { getByText } = render(
    <Modal onClose={handleClose}>
      <div>test</div>
    </Modal>
  );

  // Assert
  expect(getByText('test')).toBeTruthy();

  // Act
  fireEvent.click(getByText(/close/i));

  // Assert
  expect(handleClose).toHaveBeenCalledTimes(1);
});
