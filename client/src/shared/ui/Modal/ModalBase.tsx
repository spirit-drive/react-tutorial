import React, { memo, MouseEvent, Ref } from 'react';
import cn from 'clsx';
import { ModalContentProps, ModalContent } from './ModalContent';
import s from './ModalBase.sass';

export type ModalBaseProps = ModalContentProps & {
  className?: string;
  classNameMask?: string;
  visible?: boolean;
  maskRef?: Ref<HTMLDivElement>;
  afterClose?: () => void;
};

export const ModalBase = memo<ModalBaseProps>(
  ({ className, maskRef, afterClose, visible, full, classNameMask, onClose, children }) => {
    const onTransitionEnd = (): void => {
      if (!visible) setTimeout(() => afterClose?.());
    };

    const close = (e: MouseEvent): void => {
      const selection = window.getSelection().toString();
      if (e.target === e.currentTarget && !selection) onClose();
    };

    const clx = cn(s.root, full && s.full, className, visible && s.visible);

    return (
      <div
        data-visible={visible}
        data-testid="modal"
        ref={maskRef}
        role="presentation"
        onClick={close}
        onTransitionEnd={onTransitionEnd}
        className={cn(s.mask, classNameMask, visible && s.visible)}
      >
        <ModalContent onClose={onClose} full={full} className={clx}>
          {children}
        </ModalContent>
      </div>
    );
  }
);

ModalBase.displayName = 'ModalBase';
