import React, { FC, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const HomeScreen = lazy(() => import('../screens/Home'));
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
