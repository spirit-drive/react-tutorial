import { ResolverWithoutParent } from '../../../../types';
import { CustomerModel } from '../../../models/Customer';
import { CustomerMutations, CustomerMutationsEditArgs } from '../../../graphql.types';
import { DataBaseError } from '../../../Errors';

export const edit: ResolverWithoutParent<CustomerMutationsEditArgs, CustomerMutations['edit'] | Error> = async (
  _,
  args
) => {
  const { id, name, img } = args;
  try {
    return await CustomerModel.findByIdAndUpdate(id, { name, img });
  } catch (e) {
    return new DataBaseError(e);
  }
};
