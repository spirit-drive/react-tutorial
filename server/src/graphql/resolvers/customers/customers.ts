import { ResolverWithoutSource } from '../../../../types';
import { Customer, QueryCustomersArgs } from '../../../graphql.types';
import { CustomerModel } from '../../../models/Customer';

export const customers: ResolverWithoutSource<QueryCustomersArgs, Customer[] | Error> = async (_, { ids }) =>
  (await CustomerModel.findByIds(ids)) as Customer[];
