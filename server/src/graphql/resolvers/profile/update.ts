import { ResolverWithoutSource } from '../../../../types';
import { ProfileMutations, ProfileMutationsUpdateArgs } from '../../../graphql.types';
import { prepareProfile } from '../../../models/helpers/prepareProfile';
import { withAuth } from '../../auth';

export const updateRaw: ResolverWithoutSource<ProfileMutationsUpdateArgs, ProfileMutations['update'] | Error> = async (
  _,
  { input },
  { user }
) => {
  const { name, about } = input;
  user.name = name || user.name;
  user.about = about || user.about;
  await user.save();

  return prepareProfile(user);
};

export const update = withAuth(updateRaw);
