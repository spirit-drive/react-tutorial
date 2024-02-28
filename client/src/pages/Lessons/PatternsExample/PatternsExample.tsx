import React, { FC } from 'react';
import cn from 'clsx';
import { Divider } from 'antd';
import { Title } from 'src/shared/ui/Title';
import { HigherOrderComponentExample } from 'src/pages/Lessons/PatternsExample/HigherOrderComponentExample';
import { EventSwitchExample } from 'src/pages/Lessons/PatternsExample/EventSwitchExample';
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
    <Title className={s.title}>Компонент высшего порядка</Title>
    <HigherOrderComponentExample />
    <Divider />
    <Title className={s.title}>Event switch</Title>
    <EventSwitchExample />
    <Divider />
  </div>
);
