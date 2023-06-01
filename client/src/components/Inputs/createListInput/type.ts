export type ListInputRef = {
  add: () => void;
};

export type ItemInputProps<T, P = unknown> = P & {
  className?: string;
  index: number;
  value: T;
  onChange: (value: T) => void;
  onRemove: () => void;
};

export type ListInputProps<T, P = unknown> = P & {
  className?: string;
  value: T[];
  onChange: (value: T[]) => void;
};

export type StateItem<T> = { id: string; value: T };
export type State<T> = StateItem<T>[];
