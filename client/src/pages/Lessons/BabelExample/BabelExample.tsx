import React, { FC, useState } from 'react';
import cn from 'clsx';
import { Divider } from 'antd';
import { Title } from 'src/shared/ui/Title';
import { BrokenInput, BrokenInputValue } from './BrokenInput';
import { FormTS } from './FormTS';
import { FormJS } from './FormJS';
import s from './BabelExample.sass';

export type BabelExampleProps = {
  className?: string;
};

export const BabelExample: FC<BabelExampleProps> = ({ className }) => {
  const [value, onChange] = useState<BrokenInputValue>({} as BrokenInputValue);
  return (
    <div className={cn(s.root, className)}>
      <Title className={s.title}>Сломанный инпут</Title>
      <div className={s.center}>{JSON.stringify(value)}</div>
      <BrokenInput value={value} onChange={onChange} />
      <Divider />
      <FormJS className={s.center} />
      <Divider />
      <FormTS className={s.center} />
    </div>
  );
};
