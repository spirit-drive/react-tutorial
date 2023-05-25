import { ResolverWithoutParent } from '../../../../types';
import { Profile } from '../../../graphql.types';
import { getParamsFromToken } from '../../../utils/helpers';
import { DataBaseError, JWTError } from '../../../Errors';
import { UserDocument, UserModel } from '../../../models/User';
import { AccountJWTParams } from '../../account';

export const profile: ResolverWithoutParent<never, Profile | Error> = async (_, __, { token }) => {
  let id: string;
  try {
    const res = await getParamsFromToken<AccountJWTParams>(token);
    id = res.id;
  } catch (e) {
    return new JWTError('invalid token');
  }
  try {
    return (await UserModel.findById(id)) as UserDocument;
  } catch (e) {
    return new DataBaseError(e);
  }
};
