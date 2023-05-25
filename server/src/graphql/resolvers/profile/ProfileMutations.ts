import { signin } from './signin';
import { signup } from './signup';
import { update } from './update';

export const ProfileMutations = {
  signin,
  signup,
  update,
  password: () => ({}),
};
