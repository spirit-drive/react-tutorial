import { FC, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initedActions } from '../store/reducers/inited';

export const Initializer: FC = () => {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(initedActions.init());
  }, [dispatch]);

  return null;
};
