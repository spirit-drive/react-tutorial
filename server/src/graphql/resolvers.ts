import { ApolloServerExpressConfig } from 'apollo-server-express/src/ApolloServer';
import { ProfileMutations, ProfilePasswordMutations, profile } from './resolvers/profile';
import { customers } from './resolvers/customers/customers';
import { CustomerMutations } from './resolvers/customers/CustomerMutations';

export const resolvers: ApolloServerExpressConfig['resolvers'] = {
  // Мутации по группам
  ProfileMutations,
  ProfilePasswordMutations,

  CustomerMutations,

  Mutation: {
    profile: () => ({}),
    customers: () => ({}),
  },
  Query: {
    profile,
    customers,
  },
};
