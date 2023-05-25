import { UserDocument } from '../User';
import { Profile } from '../../graphql.types';

export const prepareProfile = (item: UserDocument): Profile =>
  item && {
    id: item.id,
    name: item.name,
    about: item.about,
    email: item.email,
    signUpDate: item.signUpDate,
  };
