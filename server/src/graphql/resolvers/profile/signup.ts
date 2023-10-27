import { ResolverWithoutSource } from '../../../../types';
import { ProfileMutations, ProfileMutationsSignupArgs } from '../../../graphql.types';
import { UserDocument, UserModel } from '../../../models/User';
import { AccountAlreadyExistError, DataBaseError, InvalidEmailError } from '../../../Errors';
import { getTokenByParams } from '../../../utils/helpers';
import { isValidEmail } from '../../../models/User/helpers';

export const signup: ResolverWithoutSource<ProfileMutationsSignupArgs, ProfileMutations['signup'] | Error> = async (
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
  if (!isValidEmail(email)) {
    return new InvalidEmailError(`"${foundUsers.email}" is not valid`);
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
