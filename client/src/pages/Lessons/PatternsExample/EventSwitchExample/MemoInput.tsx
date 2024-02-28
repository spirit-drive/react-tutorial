import React, { memo } from 'react';
import { Input, InputProps } from 'antd';

export const MemoInput = memo<InputProps>((props) => {
  // eslint-disable-next-line no-console
  console.log('rerender MemoInput', props.name);
  return <Input {...props} />;
});

MemoInput.displayName = 'MemoInput';
