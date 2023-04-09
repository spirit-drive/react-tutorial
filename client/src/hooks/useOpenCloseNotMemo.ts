import { useState } from 'react';

export const useOpenCloseNotMemo = (
  initialValue = false
): [boolean, { toggle: () => void; open: () => void; close: () => void }] => {
  const [visible, setVisible] = useState(initialValue);
  return [
    visible,
    {
      close: (): void => setVisible(false),
      open: (): void => setVisible(true),
      toggle: (): void => setVisible((v) => !v),
    },
  ];
};
