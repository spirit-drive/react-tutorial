import React, { FC, useState } from 'react';
import cn from 'clsx';
import { Divider, Input } from 'antd';
import { Title } from 'src/shared/ui/Title';
import { compose } from 'src/utils/compose';
import { withArrows } from 'src/features/inputs/NumberInput/withArrows';
import { createRangeInput, RangeInputValue } from 'src/shared/inputs/factories/createRangeInput';
import { IntRangeInput, IntRangeInputProps } from 'src/features/inputs/IntRangeInput';
import { InputIntRangeList, InputIntRangeListProps } from 'src/features/inputs/InputIntRangeList';
import { IntInput, IntInputWithArrows } from 'src/features/inputs/NumberInput';
import s from './HigherOrderComponentExample.sass';

type WithFormatProps = { onChange: (value: string) => void };
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

type InputProps = {
  value: string;
  onChange: (value: string) => void;
};
const MyInput: FC<InputProps> = ({ value, onChange }) => (
  <Input value={value} onChange={(e) => onChange(e.target.value)} />
);

const getOnlyDigits = (v: string) => v.replace(/\D/g, '');
const getWithoutOne = (v: string) => v.replace(/1/g, '');

const OnlyDigitInput = withFormat(getOnlyDigits)(MyInput);

const InputWithoutOne = withFormat(getWithoutOne)(MyInput);

/**
 * Каррирование позволяет композировать несколько форматирований, а также несколько компонентов высшего порядка
 * */

// Композиция форматирвания
const formatter = compose(getWithoutOne, getOnlyDigits);

const withOnlyDigitAndNotOne = withFormat(formatter);

// Композиция HOC
const withHOCComposition = compose(createRangeInput<number>, withArrows, withFormat(formatter));

const InputWithOnlyDigitAndNotOne = withOnlyDigitAndNotOne(MyInput);
const InputWithHOCComposition = withHOCComposition(MyInput);

type FrameComponentProps = {
  value: string;
  children: React.ReactNode;
};
/**
 * Данный компонент никак не изменяет сами данные, а значит тут не нужен HOC
 * */
const FrameComponent: FC<FrameComponentProps> = ({ value, children }) => (
  <div className={s.frame}>
    <Title>{`Здесь будет отображаться текст ${value}`}</Title>
    {children}
  </div>
);

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
  const [value7, onChange7] = useState<RangeInputValue<number>>({ from: 0, to: 0 });
  const [value8, onChange8] = useState<string>('');
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
      <Title>Композированный инпут</Title>
      <InputWithHOCComposition value={value7} onChange={onChange7} />
      <Divider />
      <Title>Здесь не нужен HOC</Title>
      <FrameComponent value={value8}>
        <InputWithOnlyDigitAndNotOne value={value8} onChange={onChange8} />
      </FrameComponent>
      <Divider />
    </div>
  );
};
