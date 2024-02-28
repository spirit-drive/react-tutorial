import React, { FC, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { useLoginNavigate } from './useLoginNavigate';
import { SpinLoading } from './SpinLoading';
import { getWithSuspense } from './getWithSuspense';
import { PageSkeleton } from './PageSkeleton';

const getWithPageSuspense = getWithSuspense(<PageSkeleton />);
const getWithSpinSuspense = getWithSuspense(<SpinLoading />);

const homeScreen = getWithPageSuspense(lazy(() => import('src/pages/Home')));
const profileScreen = getWithPageSuspense(lazy(() => import('src/pages/ProfileScreen')));
const authScreen = getWithSpinSuspense(lazy(() => import('src/pages/AuthScreen')));
const teachersScreen = getWithPageSuspense(lazy(() => import('src/pages/Teachers')));
const examplesScreen = getWithPageSuspense(lazy(() => import('src/pages/Examples')));
const lessonsScreen = getWithPageSuspense(lazy(() => import('src/pages/Lessons')));
const homeWorksScreen = getWithPageSuspense(lazy(() => import('src/pages/HomeWorks')));
const notFoundScreen = getWithSpinSuspense(lazy(() => import('src/pages/NotFound')));

export const Navigation: FC = () => {
  useLoginNavigate();

  return (
    <Routes>
      <Route index element={homeScreen} />
      <Route path="teachers" element={teachersScreen} />
      <Route path="examples/*" element={examplesScreen}>
        <Route path=":mode" element={examplesScreen} />
      </Route>
      <Route path="lessons/*" element={lessonsScreen}>
        <Route path=":mode" element={lessonsScreen} />
      </Route>
      <Route path="auth/*" element={authScreen}>
        <Route path=":mode" element={authScreen} />
      </Route>
      <Route path="profile" element={<ProtectedRoute>{profileScreen}</ProtectedRoute>} />
      <Route path="home-works" element={homeWorksScreen} />
      <Route path="*" element={notFoundScreen} />
    </Routes>
  );
};
