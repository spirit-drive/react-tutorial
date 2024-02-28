import React, { FC } from 'react';
import cn from 'clsx';
import { Divider } from 'antd';
import { Title } from 'src/shared/ui/Title';
import { FetchByMounting } from './FetchByMounting';
import { FetchByAction } from './FetchByAction';
import s from './FetchExample.sass';

export type FetchExampleProps = {
  className?: string;
};

export const FetchExample: FC<FetchExampleProps> = ({ className }) => (
  <div className={cn(s.root, className)}>
    <div>
      <Title>Запрос при монтировании</Title>
      <FetchByMounting className={s.block} />
    </div>
    <Divider />
    <div>
      <Title>Запрос по требованию</Title>
      <FetchByAction className={s.block} />
    </div>
  </div>
);
