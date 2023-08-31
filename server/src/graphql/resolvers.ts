import { ProfileMutations, ProfilePasswordMutations, profile } from './resolvers/profile';
import { customers } from './resolvers/customers/customers';
import { CustomerMutations } from './resolvers/customers/CustomerMutations';
import { animals } from './resolvers/animals';
import { IExecutableSchemaDefinition } from '@graphql-tools/schema/typings';

export const resolvers: IExecutableSchemaDefinition<unknown>['resolvers'] = {
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
    animals,
  },
};
