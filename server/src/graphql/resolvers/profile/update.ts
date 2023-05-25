import { ResolverWithoutParent } from '../../../../types';
import { ProfileMutations, ProfileMutationsUpdateArgs } from '../../../graphql.types';
import { getParamsFromToken } from '../../../utils/helpers';
import { DataBaseError, InvalidNickNameError, JWTError } from '../../../Errors';
import { UserDocument, UserModel } from '../../../models/User';
import { AccountJWTParams } from '../../account';
import { prepareProfile } from '../../../models/helpers/prepareProfile';

export const update: ResolverWithoutParent<ProfileMutationsUpdateArgs, ProfileMutations['update'] | Error> = async (
  _,
  { input },
  { token }
) => {
  let id: string;
  try {
    const res = await getParamsFromToken<AccountJWTParams>(token);
    id = res.id;
  } catch (e) {
    return new JWTError('invalid token');
  }
  let user;
  try {
    user = (await UserModel.findById(id)) as UserDocument;
  } catch (e) {
    return new DataBaseError(e);
  }

  try {
    const { name, about } = input;
    user.name = name || user.name;
    user.about = about || user.about;
    await user.save();

    return prepareProfile(user);
  } catch (e) {
    return new InvalidNickNameError(e);
  }
};
