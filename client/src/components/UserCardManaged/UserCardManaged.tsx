import React, { FC, useReducer } from 'react';
import cn from 'clsx';
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { UserCard, UserCardProps } from '../UserCard';
import { User } from '../UserCard/types';
import { UserInput } from '../Inputs/UserInput';
import s from './UserCardManaged.sass';

export type UserCardManagedProps = UserCardProps & {
  onSave?: (id: string, user: User) => void;
  onRemove?: (id: string) => void;
};

type UserCardManagedState = {
  edited: boolean;
  user: User;
};

type UserCardManagedEditAction = {
  type: 'edit';
};

type UserCardManagedSaveAction = {
  type: 'save';
};

type UserCardManagedChangeAction = {
  type: 'change';
  payload: User;
};

type UserCardManagedAction = UserCardManagedChangeAction | UserCardManagedSaveAction | UserCardManagedEditAction;

const reducer = (state: UserCardManagedState, action: UserCardManagedAction): UserCardManagedState => {
  const { type } = action;
  switch (type) {
    case 'save':
      return {
        ...state,
        edited: false,
      };

    case 'edit':
      return {
        ...state,
        edited: true,
      };

    case 'change':
      return {
        ...state,
        user: (action as UserCardManagedChangeAction).payload,
      };

    default: {
      const unhandled: never = type; // eslint-disable-line @typescript-eslint/no-unused-vars

      // Важно каким-то образом залогировать ошибку, чтобы быстро ее обнаружить
      console.error(new Error(`invalid type: ${type}`)); // eslint-disable-line no-console
      return state;
    }
  }
};

export const UserCardManaged: FC<UserCardManagedProps> = ({ className, onRemove, onSave, ...props }) => {
  const { id, name, img } = props;
  const [state, dispatch] = useReducer(reducer, {
    edited: false,
    user: { id, name, img },
  });

  const save = () => {
    onSave?.(id, state.user);
    dispatch({ type: 'save' });
  };

  return (
    <div className={cn(s.root, className)}>
      {state.edited ? (
        <>
          <UserInput
            value={state.user}
            onPressEnter={save}
            onChange={(u) => dispatch({ type: 'change', payload: u })}
            className={s.origin}
          />
          <SaveOutlined onClick={save} />
        </>
      ) : (
        <>
          <UserCard {...props} className={s.origin} />
          <div>
            {onSave && <EditOutlined className={s.btn} onClick={() => dispatch({ type: 'edit' })} />}
            {onRemove && <DeleteOutlined className={s.btn} onClick={() => onRemove(id)} />}
          </div>
        </>
      )}
    </div>
  );
};
