import { ResolverWithoutParent } from '../../../../types';
import { CustomerModel } from '../../../models/Customer';
import { CustomerMutations, CustomerMutationsAddArgs } from '../../../graphql.types';
import { DataBaseError } from '../../../Errors';

export const add: ResolverWithoutParent<CustomerMutationsAddArgs, CustomerMutations['add'] | Error> = async (
  _,
  args
) => {
  const { img, name } = args;
  const entity: CustomerModel = new CustomerModel({ name, img });
  try {
    await entity.save();
  } catch (e) {
    return new DataBaseError(e);
  }

  return entity;
};
