import React, { ExoticComponent, ComponentPropsWithRef, Suspense } from 'react';

export const getWithSuspense =
  (fallback: React.ReactNode) => (Component: ExoticComponent<ComponentPropsWithRef<any>> & { readonly _result: any }) =>
    (
      <Suspense fallback={fallback}>
        <Component />
      </Suspense>
    );
