import React, { FC, useEffect, useReducer } from 'react';
import { createPortal } from 'react-dom';
import { ModalBaseProps, ModalBase } from './ModalBase';

export type ModalProps = Omit<ModalBaseProps, 'maskRef'> & {
  container?: HTMLElement;
};

export enum ModalAction {
  VISIBLE,
  INVISIBLE,
  UNMOUNTED,
}

export type ModalState = {
  visible: boolean;
  mounted: boolean;
};

const reducer = (state: ModalState, action: ModalAction): ModalState => {
  switch (action) {
    case ModalAction.VISIBLE:
      return { visible: true, mounted: true };

    case ModalAction.INVISIBLE:
      return { ...state, visible: false };

    case ModalAction.UNMOUNTED:
      if (!state.visible) return { ...state, mounted: false };
      return state;

    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const check: never = action;
      return state;
    }
  }
};

export const Modal: FC<ModalProps> = ({ container = document.body, visible, afterClose, ...props }) => {
  const [state, dispatch] = useReducer(reducer, { visible, mounted: false });

  useEffect(() => {
    if (visible) {
      dispatch(ModalAction.VISIBLE);
    } else {
      dispatch(ModalAction.INVISIBLE);
    }
  }, [visible]);

  const handleAfterClose = (): void => {
    afterClose?.();
    dispatch(ModalAction.UNMOUNTED);
  };

  if (!state.mounted) return null;

  return createPortal(<ModalBase afterClose={handleAfterClose} visible={state.visible} {...props} />, container);
};
