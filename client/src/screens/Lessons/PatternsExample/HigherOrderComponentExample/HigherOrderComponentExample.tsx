import React, { FC, useState } from 'react';
import cn from 'clsx';
import { Divider, Input } from 'antd';
import { IntInput, InputIntRangeList, IntInputWithArrows, IntRangeInput } from 'src/components/Inputs';
import type { InputIntRangeListProps, IntRangeInputProps } from 'src/components/Inputs';
import { Title } from 'src/components/Title';
import { compose } from 'src/utils/compose';
import s from './HigherOrderComponentExample.sass';

type WithFormatProps = { value: string; onChange: (value: string) => void };
/* Это компонент высшего порядка или higher-order component (HOC)
 * Принимает функцию форматирования value, и возвращает другой HOC, который уже принимает компонент
 * Строго говоря это все единый HOC
 * Прием, когда одна функция возвращает другую, называется "каррирование",
 * с помощью него можно легко композировать несколько форматирований
 * */
const withFormat =
  (formatter: (value: string) => string) =>
  // это функция, что принимает компонент, изменяет его поведение и возвращает функциональный компонент, это тоже HOC
  <P extends WithFormatProps>(Component: React.ComponentType<P>) =>
  // это функциональный компонент
  ({ onChange, ...props }: P) =>
    <Component {...(props as P)} onChange={(v) => onChange(formatter(v))} />;

type InputProps = WithFormatProps;
const MyInput: FC<InputProps> = ({ value, onChange }) => (
  <Input value={value} onChange={(e) => onChange(e.target.value)} />
);

const OnlyDigitInput = withFormat((v) => v.replace(/\D/g, ''))(MyInput);

const InputWithoutOne = withFormat((v) => v.replace(/1/g, ''))(MyInput);

/**
 * Каррирование позволяет композировать несколько форматирований
 * */
const withOnlyDigitAndNotOne = compose(
  withFormat((v) => v.replace(/1/g, '')),
  withFormat((v) => v.replace(/\D/g, ''))
);

const InputWithOnlyDigitAndNotOne = withOnlyDigitAndNotOne(MyInput);

export type HigherOrderComponentExampleProps = {
  className?: string;
};

export const HigherOrderComponentExample: FC<HigherOrderComponentExampleProps> = ({ className }) => {
  const [value0, onChange0] = useState<number>(0);
  const [value1, onChange1] = useState<number>(0);
  const [value2, onChange2] = useState<IntRangeInputProps['value']>({ from: 0, to: 0 });
  const [value3, onChange3] = useState<InputIntRangeListProps['value']>([]);
  const [value4, onChange4] = useState<string>('');
  const [value5, onChange5] = useState<string>('');
  const [value6, onChange6] = useState<string>('');
  return (
    <div className={cn(s.root, className)}>
      <Title>Обычный инпут</Title>
      <IntInput value={value0} onChange={onChange0} />
      <Divider />
      <Title>Инпут со стрелочками</Title>
      <IntInputWithArrows value={value1} onChange={onChange1} />
      <Divider />
      <Title>Диапазон инпутов со стрелочками</Title>
      <IntRangeInput value={value2} onChange={onChange2} />
      <Divider />
      <Title>Список диапазонов инпутов со стрелочками</Title>
      <InputIntRangeList value={value3} onChange={onChange3} />
      <Divider />
      <Title>Форматированный инпут (только числа)</Title>
      <OnlyDigitInput value={value4} onChange={onChange4} />
      <Divider />
      <Title>Форматированный инпут (без единицы)</Title>
      <InputWithoutOne value={value5} onChange={onChange5} />
      <Divider />
      <Title>Форматированный инпут (только числа без единицы)</Title>
      <InputWithOnlyDigitAndNotOne value={value6} onChange={onChange6} />
      <Divider />
    </div>
  );
};
