import React, { FC } from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './client';

export type ClientProps = {
  children: React.ReactNode;
};

export const ClientProvider: FC<ClientProps> = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
