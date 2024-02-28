import React, { FC, useState } from 'react';
import cn from 'clsx';
import { Divider } from 'antd';
import { IntRangeInput, IntRangeInputProps } from 'src/features/inputs/IntRangeInput';
import { InputIntRangeList, InputIntRangeListProps } from 'src/features/inputs/InputIntRangeList';
import { IntInput, IntInputWithArrows } from 'src/features/inputs/NumberInput';
import { Title } from 'src/shared/ui/Title';
import s from './InputsExample.sass';

export type InputsExampleProps = {
  className?: string;
};

export const InputsExample: FC<InputsExampleProps> = ({ className }) => {
  const [value0, onChange0] = useState<number>(0);
  const [value1, onChange1] = useState<number>(0);
  const [value2, onChange2] = useState<IntRangeInputProps['value']>({ from: 0, to: 0 });
  const [value3, onChange3] = useState<InputIntRangeListProps['value']>([]);
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
    </div>
  );
};
