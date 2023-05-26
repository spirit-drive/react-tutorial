import React, { FC, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

const HomeScreen = lazy(() => import('../screens/Home'));
const SecretScreen = lazy(() => import('../screens/Secret'));
const AuthScreen = lazy(() => import('../screens/AuthScreen'));
const TeachersScreen = lazy(() => import('../screens/Teachers'));
const HomeWorksScreen = lazy(() => import('../screens/HomeWorks'));
const NotFoundScreen = lazy(() => import('../screens/NotFound'));

export const Navigation: FC = () => (
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
    <Route
      path="auth"
      element={
        <Suspense fallback="loading">
          <AuthScreen />
        </Suspense>
      }
    />
    <Route
      path="secret"
      element={
        <ProtectedRoute>
          <Suspense fallback="loading">
            <SecretScreen />
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
