import { ResolverWithoutSource } from '../../../../types';
import { ProfileMutations, ProfileMutationsSignupArgs } from '../../../graphql.types';
import { UserDocument, UserModel } from '../../../models/User';
import { AccountAlreadyExistError, InvalidEmailError } from '../../../Errors';
import { getTokenByParams } from '../../../utils/helpers';
import { isValidEmail } from '../../../models/User/helpers';

export const signup: ResolverWithoutSource<ProfileMutationsSignupArgs, ProfileMutations['signup'] | Error> = async (
  _,
  args
) => {
  const { password, email } = args;

  const foundUsers = (await UserModel.findOne({ email })) as UserDocument;
  if (foundUsers) {
    return new AccountAlreadyExistError(`User with email: ${foundUsers.email} already exist`);
  }
  if (!isValidEmail(email)) {
    return new InvalidEmailError(`"${foundUsers.email}" is not valid`);
  }
  const user = new UserModel() as UserDocument;
  user.email = email;
  user.password = await user.generateHash(password);

  await user.save();

  const token = getTokenByParams({ id: user.id });
  return {
    token,
    profile: user,
  };
};
