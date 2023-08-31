import { ResolverWithoutParent } from '../../../../types';
import { CustomerModel } from '../../../models/Customer';
import { CustomerMutations, CustomerMutationsRemoveArgs } from '../../../graphql.types';
import { DataBaseError } from '../../../Errors';

export const remove: ResolverWithoutParent<CustomerMutationsRemoveArgs, CustomerMutations['remove'] | Error> = async (
  _,
  args
) => {
  const { id } = args;
  try {
    return await CustomerModel.removeById(id);
  } catch (e) {
    return new DataBaseError(e);
  }
};
