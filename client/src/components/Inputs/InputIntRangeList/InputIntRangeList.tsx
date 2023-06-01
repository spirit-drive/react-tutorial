import { Button } from 'antd';
import React, { memo, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import cn from 'clsx';
import { useTranslation } from 'react-i18next';
import { Title } from '../../Title';
import { IntRangeInput } from '../../RangeInputs';
import { RemoveButton } from '../../RemoveButton';
import { deepClear } from 'src/utils/deepClear';
import { createListInput, ItemInputProps, ListInputRef, ListInputProps } from '../createListInput';
import s from './InputIntRangeList.sass';

type Value = { from: number; to: number };
export type InputIntRangeListValue = Value[];

const PreparedInput = memo<ItemInputProps<Value>>(({ onChange, onRemove, className, index, value }) => {
  const { t } = useTranslation();
  return (
    <div className={cn(s.item, className)}>
      <div className={s.line}>
        <Title>{`${t`components.InputIntRangeList.title`} ${index + 1}`}</Title>
        <RemoveButton confirmed={!!deepClear(value)} onRemove={onRemove} />
      </div>
      <IntRangeInput size="small" onChange={onChange} value={value} />
    </div>
  );
});

export type InputIntRangeListRef = ListInputRef;

export const InputIntRangeListOrigin = createListInput<Value>(PreparedInput, { from: 0, to: 0 });

export const InputIntRangeList = memo<ListInputProps<Value>>(({ className, ...props }) => {
  const input = useRef<InputIntRangeListRef>();

  return (
    <div className={cn(s.root, className)}>
      <InputIntRangeListOrigin ref={input} {...props} />
      <Button size="small" onClick={() => input.current.add()}>
        <PlusOutlined />
      </Button>
    </div>
  );
});
