export enum Locale {
  ru = 'ru',
  en = 'en',
}

import { UserDocument } from '../src/models/User';

export enum ErrorCode {
  INCORRECT_EMAIL_OR_PASSWORD = 'ERR_INCORRECT_EMAIL_OR_PASSWORD',
  INCORRECT_PASSWORD = 'ERR_INCORRECT_PASSWORD',
  ACCOUNT_ALREADY_EXIST = 'ERR_ACCOUNT_ALREADY_EXIST',
  INVALID_PASSWORD = 'ERR_INVALID_PASSWORD',
  USER_NOT_FOUND = 'ERR_USER_NOT_FOUND',
  NOT_FOUND = 'ERR_NOT_FOUND',
  TOKEN_REQUIRED_ERROR = 'ERR_TOKEN_REQUIRED_ERROR',
  AUTH_ERROR = 'ERR_AUTH_ERROR',
  DATA_BASE_ERROR = 'ERR_DATA_BASE_ERROR',
  INVALID_NICKNAME = 'ERR_INVALID_NICKNAME',
  INVALID_EMAIL = 'ERR_INVALID_EMAIL',
}

export type CustomError = Error & { code: ErrorCode };

export type AccountResponseRaw = {
  token: string | null;
  user: UserDocument | null;
};

export type AccountResponse = AccountResponseRaw | CustomError;

export type ServerContext = {
  user: UserDocument;
  token: string;
  locale: Locale;
};

export type ResolverWithoutSource<Args extends Record<string, unknown>, Res = AccountResponse> = (
  source: undefined,
  args: Args,
  context: ServerContext
) => Promise<Res>;

export type ApolloResolver<T, Res = AccountResponse, Args extends Record<string, unknown> = Record<string, unknown>> = (
  doc: T,
  args: Args,
  context: ServerContext
) => Promise<Res>;
