import { ResolverWithoutSource } from '../../../../../types';
import { ProfilePasswordMutationsChangeArgs } from '../../../../graphql.types';
import { DataBaseError, IncorrectPasswordError, InvalidPasswordError, UserNotFoundError } from '../../../../Errors';
import { isValidPassword } from '../../../../models/User/helpers';
import { ResetPassword } from '../../../../graphql.types';
import { withAuth } from '../../../auth';

export const changeRaw: ResolverWithoutSource<ProfilePasswordMutationsChangeArgs, ResetPassword | Error> = async (
  _,
  { input },
  { user }
) => {
  if (!user) {
    return new UserNotFoundError(`User not found`);
  }

  const { password, newPassword } = input;
  if (!user.isRightPassword(password)) {
    return new IncorrectPasswordError('Invalid password');
  }

  if (!isValidPassword(newPassword)) {
    return new InvalidPasswordError(`"${newPassword}" is not valid password`);
  }

  user.password = await user.generateHash(newPassword);

  try {
    await user.save();
  } catch (e) {
    return new DataBaseError(e);
  }

  return {
    success: true,
  };
};

export const change = withAuth(changeRaw);
