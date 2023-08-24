export type QueryData<T = unknown> = {
  loading: boolean;
  error: Error;
  data: T;
};

export type QueryActionLoading = {
  type: 'loading';
};

export type QueryActionError<E extends Error = Error> = {
  type: 'error';
  payload: E;
};

export type QueryActionData<T = unknown> = {
  type: 'data';
  payload: T;
};

export type QueryAction<T = unknown, E extends Error = Error> =
  | QueryActionLoading
  | QueryActionError<E>
  | QueryActionData<T>;

export const reducer = <T>(state: QueryData<T>, action: QueryAction<T>): QueryData<T> => {
  const { type } = action;
  switch (type) {
    case 'loading':
      return {
        ...state,
        error: null,
        loading: true,
      };

    case 'error':
      return {
        ...state,
        data: null,
        loading: false,
        error: (action as QueryActionError).payload,
      };

    case 'data':
      return {
        ...state,
        data: (action as QueryActionData<T>).payload,
        loading: false,
        error: null,
      };

    default: {
      const unhandled: never = type; // eslint-disable-line @typescript-eslint/no-unused-vars

      // Важно каким-то образом залогировать ошибку, чтобы быстро ее обнаружить
      console.error(new Error(`invalid type: ${type}`)); // eslint-disable-line no-console
      return state;
    }
  }
};
