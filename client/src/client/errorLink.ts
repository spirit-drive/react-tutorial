import { ErrorResponse, onError } from '@apollo/client/link/error';
import { GraphQLError } from 'graphql';
import { store } from 'src/store';
import { tokenActions } from 'src/store/token';
import { NOT_AUTHORIZED_CODE } from './config';

export type Extensions = {
  code: string;
  field: string;
  value: string;
};

export const getGraphqlErrorExtensions = (errors: readonly GraphQLError[]): Extensions[] =>
  errors.map((err) => {
    const { extensions } = err;

    return extensions as Extensions;
  });

export const getErrorExtensions = (error: ErrorResponse): Extensions[] => {
  const { graphQLErrors } = error || {};
  if (graphQLErrors?.length) {
    return getGraphqlErrorExtensions(graphQLErrors);
  }
  return null;
};

export const errorLink = onError((error: ErrorResponse) => {
  const extensions = getErrorExtensions(error);
  if (extensions?.find((i) => i.code === NOT_AUTHORIZED_CODE)) {
    store.dispatch(tokenActions.logout());
  }
});
