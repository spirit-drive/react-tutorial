import { ResolverWithoutParent } from '../../../../types';
import { ProfileMutations, ProfileMutationsSignupArgs } from '../../../graphql.types';
import { UserDocument, UserModel } from '../../../models/User';
import { AccountAlreadyExistError, DataBaseError } from '../../../Errors';
import { getTokenByParams } from '../../../utils/helpers';

export const signup: ResolverWithoutParent<ProfileMutationsSignupArgs, ProfileMutations['signup'] | Error> = async (
  _,
  args
) => {
  const { password, email } = args;

  let foundUsers;
  try {
    foundUsers = (await UserModel.findOne({ email })) as UserDocument;
  } catch (e) {
    return new DataBaseError(e);
  }
  if (foundUsers) {
    return new AccountAlreadyExistError(`User with email: ${foundUsers.email} already exist`);
  }
  const user = new UserModel() as UserDocument;
  user.email = email;
  user.password = await user.generateHash(password);

  try {
    await user.save();
  } catch (e) {
    return new DataBaseError(e);
  }

  const token = getTokenByParams({ id: user.id });
  return {
    token,
    user,
  };
};
