import { FC, useInsertionEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializedActions } from './initialized';

export const Initializer: FC = () => {
  const dispatch = useDispatch();

  useInsertionEffect(() => {
    dispatch(initializedActions.init());
  }, [dispatch]);
  return null;
};
