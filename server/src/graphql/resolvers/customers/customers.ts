import { ResolverWithoutParent } from '../../../../types';
import { Customer, QueryCustomersArgs } from '../../../graphql.types';
import { DataBaseError } from '../../../Errors';
import { CustomerModel } from '../../../models/Customer';

export const customers: ResolverWithoutParent<QueryCustomersArgs, Customer[] | Error> = async (_, { ids }) => {
  try {
    return (await CustomerModel.findByIds(ids)) as Customer[];
  } catch (e) {
    return new DataBaseError(e);
  }
};
