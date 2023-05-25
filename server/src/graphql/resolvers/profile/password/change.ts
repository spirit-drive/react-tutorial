import { ResolverWithoutParent } from '../../../../../types';
import { ProfilePasswordMutationsChangeArgs } from '../../../../graphql.types';
import { getParamsFromToken } from '../../../../utils/helpers';
import {
  DataBaseError,
  IncorrectPasswordError,
  InvalidPasswordError,
  JWTError,
  UserNotFoundError,
} from '../../../../Errors';
import { UserDocument, UserModel } from '../../../../models/User';
import { isValidPassword } from '../../../../models/User/helpers';
import { AccountJWTParams } from '../../../account';
import { ResetPassword } from '../../../../graphql.types';

export const change: ResolverWithoutParent<ProfilePasswordMutationsChangeArgs, ResetPassword | Error> = async (
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

  if (!user) {
    return new UserNotFoundError(`User by id: ${id} not found`);
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
