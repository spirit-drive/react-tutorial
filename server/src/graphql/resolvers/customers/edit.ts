import { ResolverWithoutSource } from '../../../../types';
import { CustomerModel } from '../../../models/Customer';
import { CustomerMutations, CustomerMutationsEditArgs } from '../../../graphql.types';
import { withAuth } from '../../auth';

export const editRaw: ResolverWithoutSource<CustomerMutationsEditArgs, CustomerMutations['edit'] | Error> = async (
  _,
  args
) => {
  const { id, name, img } = args;
  return await CustomerModel.findByIdAndUpdate(id, { name, img });
};

export const edit = withAuth(editRaw);
