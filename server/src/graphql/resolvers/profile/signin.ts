import { AccountResponse, ResolverWithoutParent } from '../../../../types';
import { UserDocument, UserModel } from '../../../models/User';
import { ProfileMutations, ProfileMutationsSigninArgs } from '../../../graphql.types';
import { DataBaseError, IncorrectPasswordOrEmailError } from '../../../Errors';
import { getTokenByParams } from '../../../utils/helpers';

export const signin: ResolverWithoutParent<ProfileMutationsSigninArgs, ProfileMutations['signin'] | Error> = async (
  _,
  args
) => {
  const { password, email } = args;
  let user: UserDocument;
  try {
    user = (await UserModel.findOne({ email })) as UserDocument;
  } catch (e) {
    return new DataBaseError(e);
  }
  if (!user || !user.isRightPassword(password)) {
    return new IncorrectPasswordOrEmailError('User not found or invalid password');
  }

  const token = getTokenByParams({ id: user.id });
  const result: AccountResponse = {
    token,
    user,
  };
  return result;
};
