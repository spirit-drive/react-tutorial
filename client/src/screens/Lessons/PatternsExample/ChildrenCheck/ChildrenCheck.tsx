import React, { FC } from 'react';

export type ChildrenCheckProps = {
  children: React.ReactNode;
  // children: React.ReactElement;
};

export const ChildrenCheck: FC<ChildrenCheckProps> = ({ children }) => {
  // eslint-disable-next-line no-console
  console.log({ children, type: typeof children });
  return <div>{children}</div>;
};
