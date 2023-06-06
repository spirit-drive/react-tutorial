import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { tokenSelectors } from 'src/store/token';
import { RootState } from '../store';
import { NavigationState } from './types';

export const ProtectedRoute: FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = useSelector<RootState, RootState['token']>(tokenSelectors.get);
  const location = useLocation();
  if (token) return <>{children}</>;
  return <Navigate to="/auth" state={{ from: location } as NavigationState} replace />;
};
