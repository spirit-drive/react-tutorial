import { ApolloServerExpressConfig } from 'apollo-server-express/src/ApolloServer';
import { ProfileMutations, ProfilePasswordMutations, profile } from './resolvers/profile';

export const resolvers: ApolloServerExpressConfig['resolvers'] = {
  // Мутации по группам
  ProfileMutations,
  ProfilePasswordMutations,

  Mutation: {
    profile: () => ({}),
  },
  Query: {
    profile,
  },
};
