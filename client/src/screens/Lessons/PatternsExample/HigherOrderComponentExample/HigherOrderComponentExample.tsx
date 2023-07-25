import React, { FC, useState } from 'react';
import cn from 'clsx';
import { Divider } from 'antd';
import { IntInput, InputIntRangeList, IntInputWithArrows, IntRangeInput } from 'src/components/Inputs';
import type { InputIntRangeListProps, IntRangeInputProps } from 'src/components/Inputs';
import { Title } from 'src/components/Title';
import s from './HigherOrderComponentExample.sass';

type WithFormatProps = { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void };
type WithFormatResultProps = { value: string; onChange: (value: string) => void };
const withFormat =
  (formatter: (e: React.ChangeEvent<HTMLInputElement>) => string) =>
  <P extends WithFormatProps>(Component: React.ComponentType<P>) =>
  ({ onChange, ...props }: WithFormatResultProps) =>
    <Component {...(props as P)} onChange={(e) => onChange(formatter(e))} />;

type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const Input: FC<InputProps> = ({ value, onChange }) => <input type="text" value={value} onChange={onChange} />;

const OnlyDigitInput = withFormat((e) => e.target.value.replace(/\D/g, ''))(Input);

export type HigherOrderComponentExampleProps = {
  className?: string;
};

export const HigherOrderComponentExample: FC<HigherOrderComponentExampleProps> = ({ className }) => {
  const [value0, onChange0] = useState<number>(0);
  const [value1, onChange1] = useState<number>(0);
  const [value2, onChange2] = useState<IntRangeInputProps['value']>({ from: 0, to: 0 });
  const [value3, onChange3] = useState<InputIntRangeListProps['value']>([]);
  const [value4, onChange4] = useState<string>('');
  return (
    <div className={cn(s.root, className)}>
      <Title>Обычный инпут</Title>
      <IntInput value={value0} onChange={onChange0} />
      <Divider />
      <Title>Форматированный инпут</Title>
      <OnlyDigitInput value={value4} onChange={onChange4} />
      <Divider />
      <Title>Инпут со стрелочками</Title>
      <IntInputWithArrows value={value1} onChange={onChange1} />
      <Divider />
      <Title>Диапазон инпутов со стрелочками</Title>
      <IntRangeInput value={value2} onChange={onChange2} />
      <Divider />
      <Title>Список диапазонов инпутов со стрелочками</Title>
      <InputIntRangeList value={value3} onChange={onChange3} />
    </div>
  );
};
