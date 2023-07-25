import React, { FC } from 'react';

export type ChildrenCheckProps = {
  children: React.ReactNode;
};

export const ChildrenCheck: FC<ChildrenCheckProps> = ({ children }) => {
  // eslint-disable-next-line no-console
  console.log({ children });
  return <div>{children}</div>;
};
