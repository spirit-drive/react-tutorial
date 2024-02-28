import React, { ExoticComponent, ComponentPropsWithRef, Suspense } from 'react';

export const getWithSuspense = (fallback: React.ReactNode) =>
  function (Component: ExoticComponent<ComponentPropsWithRef<any>> & { readonly _result: any }) {
    return (
      <Suspense fallback={fallback}>
        <Component />
      </Suspense>
    );
  };
