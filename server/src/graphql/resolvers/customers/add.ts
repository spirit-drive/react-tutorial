import { ResolverWithoutSource } from '../../../../types';
import { CustomerModel } from '../../../models/Customer';
import { CustomerMutations, CustomerMutationsAddArgs } from '../../../graphql.types';
import { withAuth } from '../../auth';

export const addRaw: ResolverWithoutSource<CustomerMutationsAddArgs, CustomerMutations['add'] | Error> = async (
  _,
  args
) => {
  const { img, name } = args;
  const entity: CustomerModel = new CustomerModel({ name, img });
  await entity.save();

  return entity;
};

export const add = withAuth(addRaw);
