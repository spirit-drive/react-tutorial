import { ResolverWithoutSource } from '../../../../types';
import { CustomerModel } from '../../../models/Customer';
import { CustomerMutations, CustomerMutationsRemoveArgs } from '../../../graphql.types';
import { withAuth } from '../../auth';

export const removeRaw: ResolverWithoutSource<
  CustomerMutationsRemoveArgs,
  CustomerMutations['remove'] | Error
> = async (_, args) => {
  const { id } = args;
  return await CustomerModel.removeById(id);
};

export const remove = withAuth(removeRaw);
