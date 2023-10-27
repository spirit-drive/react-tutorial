import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { UserDocument, UserModel } from '../models/User';
import { getParamsFromToken } from '../utils/helpers';
import { AccountJWTParams } from './account';

export const AUTHENTICATION_TYPE = 'Bearer';
const regexpForRemoveAuthenticationType = new RegExp(`^${AUTHENTICATION_TYPE}\\s`);
const getToken = (authentication: string): string => authentication?.replace(regexpForRemoveAuthenticationType, '');

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: async ({ req }) => {
    const { authorization, locale } = req.headers as { authorization: string; locale: string };
    const token = getToken(authorization);
    if (!token) return { token: null, user: null, locale };
    const access = await getParamsFromToken<AccountJWTParams>(token);
    const { id: userId } = access;

    const user = (await UserModel.findById(userId)) as UserDocument;
    return { token, user, locale };
  },
});
