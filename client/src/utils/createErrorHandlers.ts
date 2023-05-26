import { ApolloError } from '@apollo/client';
import { GraphQLError } from 'graphql';

export type ErrorHandlers<Err extends Record<string, unknown> = Record<string, unknown>> = {
  catcher: (error: ApolloError) => void;
  catcherValidator: (params: {
    setErrors: (errors: Err) => void;
    getMessage: (code: string, graphqlError: GraphQLError, apolloError: ApolloError) => string;
  }) => (error: ApolloError) => void;
};

export type ValidatorSchema<K extends string> = Partial<Record<K, string[]>>;

export const createErrorHandlers = <
  Keys extends string = string,
  Err extends Record<string, unknown> = Record<string, unknown>
>(
  handle: (code: string | null, graphqlError: GraphQLError | null, apolloError: ApolloError) => void,
  validatorSchema?: ValidatorSchema<Keys>
): ErrorHandlers<Err> => ({
  catcher: (error) => {
    if ('graphQLErrors' in error && Array.isArray(error.graphQLErrors) && error.graphQLErrors.length) {
      error.graphQLErrors.forEach((err) => {
        handle(err.extensions.code as string, err, error);
      });
    } else {
      handle(null, null, error);
    }
  },
  catcherValidator: ({ setErrors, getMessage }) => {
    const keys = Object.keys(validatorSchema || {}) as Keys[];
    return (error) => {
      if ('graphQLErrors' in error && Array.isArray(error.graphQLErrors)) {
        error.graphQLErrors.forEach((err) => {
          const index = keys.findIndex((key) => validatorSchema[key].includes(err.extensions.code));
          if (index !== -1) {
            const key = keys[index];
            setErrors({ [key]: getMessage(err.extensions.code as string, err, error) } as Err);
          } else {
            handle(err.extensions.code as string, err, error);
          }
        });
      }
    };
  },
});
