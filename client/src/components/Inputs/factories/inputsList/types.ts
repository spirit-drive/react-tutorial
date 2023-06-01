import { MutableRefObject } from 'react';

export type Manager = {
  add: () => void;
  remove: (id: string) => void;
};

export type Props<T, Extra = Record<string, unknown>> = Extra & {
  className?: string;
  value: T[];
  onChange: (value: T[]) => void;
  onBlur?: () => void;
  manager?: MutableRefObject<Manager>;
  canRemoveAll?: boolean;
  disabled?: boolean;
};

export type ComponentProps<T, Extra> = Omit<
  Props<T, Extra>,
  'title' | 'children' | 'className' | 'value' | 'onChange' | 'manager'
> & {
  id: string;
  single: boolean;
  value: T;
  onChange: (value: T) => void;
};

export type ListParams<T> = { isNotEmptyData?: (data: T) => boolean };
