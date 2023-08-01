import React, { memo, useCallback, useMemo, useRef } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { inputsListOnlyList } from 'src/components/Inputs/factories/inputsList';
import { StringInput } from '../StringInput';
import { Manager } from '../factories/inputsList/types';
import s from './StringMultiInput.module.sass';
import { RemoveButton } from '../../RemoveButton';

export type StringMultiInputProps = {
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  value: string[];
  onChange: (value: string[]) => void;
};

const isNotEmptyData = (d: unknown): boolean => !!d;

export const StringMultiInput = memo<StringMultiInputProps>(({ value: $value, placeholder, onChange }) => {
  const manager = useRef<Manager>();

  const List = useMemo(
    () =>
      inputsListOnlyList<string>(({ id, single, canRemoveAll, disabled, value, ...props }) => {
        const remove = (): void => manager.current.remove(id);
        return (
          <div className={s.item}>
            <StringInput {...props} placeholder={placeholder} disabled={disabled as boolean} value={value} />
            {(canRemoveAll || !single) && (
              <RemoveButton
                disabled={disabled as boolean}
                className={s.delete}
                onRemove={remove}
                confirmed={isNotEmptyData(value)}
              />
            )}
          </div>
        );
      }),
    [placeholder]
  );

  const onAdd = useCallback((): void => manager.current.add(), []);

  return (
    <div>
      <List value={$value} manager={manager} canRemoveAll onChange={onChange} />
      <Button size="small" className={s.plus} onClick={onAdd}>
        <PlusOutlined />
      </Button>
    </div>
  );
});

StringMultiInput.displayName = 'StringMultiInput';
