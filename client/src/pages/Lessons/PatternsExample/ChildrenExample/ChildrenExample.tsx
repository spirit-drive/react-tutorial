/* eslint-disable no-console */
import React, { FC, useReducer } from 'react';
import cn from 'clsx';
import { Divider, Button } from 'antd';
import { ChildrenCheck } from '../ChildrenCheck';
import s from './ChildrenExample.sass';

interface RenderPropsAsFunctionProps {
  renderCount: (count: number) => React.ReactElement;
  children?: React.ReactNode;
}

const RenderPropsAsFunction: FC<RenderPropsAsFunctionProps> = ({ renderCount, children }) => {
  const [count, increase] = useReducer((v) => v + 1, 0);

  return (
    <div>
      {children}
      {renderCount(count)}
      <Button onClick={increase}>increase</Button>
    </div>
  );
};

interface RenderPropsAsJSXProps {
  header: React.ReactElement;
  footer: React.ReactElement;
}

const RenderPropsAsJSX: FC<RenderPropsAsJSXProps> = ({ footer, header }) => (
  <div>
    {header}
    <Divider />
    {footer}
  </div>
);

interface FunctionAsChildrenExampleProps {
  children: (count: number) => React.ReactNode;
}

const FunctionAsChildrenExample: FC<FunctionAsChildrenExampleProps> = ({ children }) => {
  const [count, increase] = useReducer((v) => v + 1, 0);

  return (
    <div>
      {children(count)}
      <Button onClick={increase}>increase</Button>
    </div>
  );
};

export type TestProps = Record<string, never>;

export const Test: FC<TestProps> = () => <div>Компонент</div>;

export type ChildrenExampleProps = {
  className?: string;
};

export const ChildrenExample: FC<ChildrenExampleProps> = ({ className }) => (
  <div className={cn(s.root, className)}>
    <ChildrenCheck>0</ChildrenCheck>
    <ChildrenCheck>{0}</ChildrenCheck>
    <ChildrenCheck>{null}</ChildrenCheck>
    <ChildrenCheck>{undefined}</ChildrenCheck>
    <ChildrenCheck>{false}</ChildrenCheck>
    <ChildrenCheck>{true}</ChildrenCheck>

    <ChildrenCheck>{[2, '3', null, undefined, false, <div key="1">test</div>, <div key="2">test</div>]}</ChildrenCheck>
    <ChildrenCheck>
      <div>Элемент</div>
    </ChildrenCheck>
    <ChildrenCheck>
      <Test />
    </ChildrenCheck>
    <FunctionAsChildrenExample>{(count) => <div>{`${count * 1000} руб`}</div>}</FunctionAsChildrenExample>
    <RenderPropsAsFunction renderCount={(count) => <div>{count}</div>}>Child</RenderPropsAsFunction>
    <RenderPropsAsJSX header={<div>header</div>} footer={<div>footer</div>} />
  </div>
);
