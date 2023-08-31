import * as bcrypt from 'bcrypt';

export const generateHash = async (string: string): Promise<string> => await bcrypt.hash(string, bcrypt.genSaltSync(8));

export const isValidCode = (string: string, encrypted: string): boolean => bcrypt.compareSync(string, encrypted);

export const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isValidEmail = (email: string): boolean => emailRegexp.test(email);
export const isValidNickname = (name: string): boolean => /^[_a-zа-я0-9]{3,}$/i.test(name);
export const isValidPassword = (password: string): boolean => /^[\w-@{}()#$%^&*+=!~]{8,}$/.test(password);
