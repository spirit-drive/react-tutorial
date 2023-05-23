import { useMemo, useState } from 'react';

export const useOpenClose = (
  initialValue = false
): [boolean, { toggle: () => void; open: () => void; close: () => void }] => {
  const [visible, setVisible] = useState(initialValue);
  const callbacks = useMemo(
    () => ({
      toggle: (): void => setVisible((v) => !v),
      close: (): void => setVisible(false),
      open: (): void => setVisible(true),
    }),
    []
  );
  return [visible, callbacks];
};
