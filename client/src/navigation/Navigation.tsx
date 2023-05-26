import React, { FC, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { useLoginNavigate } from './useLoginNavigate';

const HomeScreen = lazy(() => import('../screens/Home'));
const ProfileScreen = lazy(() => import('../screens/Profile/Profile'));
const AuthScreen = lazy(() => import('../screens/AuthScreen'));
const TeachersScreen = lazy(() => import('../screens/Teachers'));
const HomeWorksScreen = lazy(() => import('../screens/HomeWorks'));
const NotFoundScreen = lazy(() => import('../screens/NotFound'));

const authElement = (
  <Suspense fallback="loading">
    <AuthScreen />
  </Suspense>
);

export const Navigation: FC = () => {
  useLoginNavigate();

  return (
    <Routes>
      <Route
        index
        element={
          <Suspense fallback="loading">
            <HomeScreen />
          </Suspense>
        }
      />
      <Route
        path="teachers"
        element={
          <Suspense fallback="loading">
            <TeachersScreen />
          </Suspense>
        }
      />
      <Route path="auth/*" element={authElement}>
        <Route path=":mode" />
      </Route>
      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <Suspense fallback="loading">
              <ProfileScreen />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="home-works"
        element={
          <Suspense fallback="loading">
            <HomeWorksScreen />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback="loading">
            <NotFoundScreen />
          </Suspense>
        }
      />
    </Routes>
  );
};
