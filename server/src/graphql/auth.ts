import { GraphQLError } from 'graphql/index';
import { ErrorCode, AccountResponse, ApolloResolver } from '../../types';

export const withAuth =
  <T, Res = AccountResponse, Args extends Record<string, unknown> = Record<string, unknown>>(
    action: ApolloResolver<T, Res, Args>
  ): ApolloResolver<T, Res, Args> =>
  async (parent, args, context): Promise<Res> => {
    if (!context.user) {
      throw new GraphQLError('User is not authenticated', {
        extensions: {
          code: ErrorCode.AUTH_ERROR,
          http: { status: 401 },
        },
      });
    }
    return action(parent, args, context);
  };
