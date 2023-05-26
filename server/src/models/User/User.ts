import { generateHash, isValidCode, isValidEmail, isValidNickname } from './helpers';
import { Profile } from '../../graphql.types';
import { get, set } from './db';
import { InvalidEmailError, InvalidNickNameError } from '../../Errors';

export type UserDocument = Profile & {
  password: string;
  generateHash?: (string: string) => Promise<string>;
  isRightPassword?: (password: string) => boolean;
  save?: () => Promise<void>;
};

export class UserModel {
  id: string;
  name: string;
  email: string;
  password: string;
  signUpDate?: string;
  about?: string;
  generateHash: (string: string) => Promise<string>;

  constructor(data?: UserDocument) {
    if (data?.name && !isValidNickname(data.name)) throw new InvalidNickNameError(`"${data.name}" is not valid name`);
    if (data?.email && !isValidEmail(data.email)) throw new InvalidEmailError(`"${data.email}" is not valid email`);

    this.id = data?.id || (Math.random() * 10 ** 17).toString(16);
    this.name = data?.name;
    this.email = data?.email;
    this.password = data?.password;
    this.signUpDate = data?.signUpDate || new Date().toISOString();
    this.about = data?.about;
    this.generateHash = generateHash;
  }

  isRightPassword(password: string): boolean {
    return isValidCode(password, this.password);
  }

  static async findOne(params: Partial<Pick<UserDocument, 'email' | 'name'>>): Promise<UserDocument> {
    const users = await get();
    const found = users.find((u) => {
      let res = false;
      if (params.name) {
        res = u.name === params.name;
      }
      if (params.email) {
        res = u.email === params.email;
      }
      return res;
    });
    return found && (new UserModel(found) as UserDocument);
  }

  static async findById(id: string): Promise<UserDocument> {
    const users = await get();
    const found = users.find((u) => u.id === id);
    return found && (new UserModel(found) as UserDocument);
  }

  async save(): Promise<void> {
    const users = await get();
    const user = {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      signUpDate: this.signUpDate,
      about: this.about,
    };
    const index = users.findIndex((u) => u.id === this.id);
    if (index !== -1) {
      users[index] = user;
      await set(users);
      return;
    }
    users.push(user);
    await set(users);
  }
}
