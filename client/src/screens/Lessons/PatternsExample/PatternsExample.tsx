import React, { FC } from 'react';
import cn from 'clsx';
import { Divider } from 'antd';
import { Title } from 'src/components/Title';
import { DestructuringPropsExample } from './DestructuringPropsExample';
import { ChildrenExample } from './ChildrenExample';
import { ConditionalRenderExample } from './ConditionalRenderExample';
import s from './PatternsExample.sass';

export type BabelExampleProps = {
  className?: string;
};

export const PatternsExample: FC<BabelExampleProps> = ({ className }) => (
  <div className={cn(s.root, className)}>
    <Title className={s.title}>Деструктуризация пропсов и прочее</Title>
    <DestructuringPropsExample />
    <Divider />
    <Title className={s.title}>Работа с children</Title>
    <ChildrenExample />
    <Divider />
    <Title className={s.title}>Условный рендеринг</Title>
    <ConditionalRenderExample />
    <Divider />
  </div>
);
