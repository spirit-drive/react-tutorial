import { GraphQLError, Source } from 'graphql';
import { ASTNode } from 'graphql/language/ast';
import { ErrorCode } from '../types';

export class ApolloError extends Error implements GraphQLError {
  public extensions: Record<string, unknown>;
  readonly name: string;
  readonly message: string;
  public code: ErrorCode;
  readonly locations: { line: number; column: number }[];
  readonly path: string[];
  readonly source?: Source;
  readonly positions: number[];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  readonly nodes?: ASTNode | ASTNode[];
  public originalError: any;

  [key: string]: unknown;

  constructor(message: string, code?: ErrorCode, extensions?: Record<string, any>) {
    super(message);

    // This variable was previously named `properties`, which allowed users to set
    // arbitrary properties on the ApolloError object. This use case is still supported,
    // but deprecated in favor of using the ApolloError.extensions object instead.
    // This change intends to comply with the GraphQL spec on errors. See:
    // https://github.com/graphql/graphql-spec/blob/master/spec/Section%207%20--%20Response.md#response-format
    //
    // Going forward, users should use the ApolloError.extensions object for storing
    // and reading arbitrary data on an error, as arbitrary properties on the ApolloError
    // itself won't be supported in the future.
    //
    // XXX Filter 'message' and 'extensions' specifically so they don't overwrite the class property.
    // We _could_ filter all of the class properties, but have chosen to only do
    // so if it's an issue for other users. Please feel free to open an issue if you
    // find yourself here with this exact problem.
    if (extensions) {
      Object.keys(extensions)
        .filter((keyName) => keyName !== 'message' && keyName !== 'extensions')
        .forEach((key) => {
          this[key] = extensions[key];
        });
    }

    // if no name provided, use the default. defineProperty ensures that it stays non-enumerable
    if (!this.name) {
      Object.defineProperty(this, 'name', { value: 'ApolloError' });
    }

    // Before the mentioned change to extensions, users could previously set the extensions
    // object by providing it as a key on the third argument to the constructor.
    // This step provides backwards compatibility for those hypothetical users.
    const userProvidedExtensions = (extensions && extensions.extensions) || null;

    this.extensions = { ...extensions, ...userProvidedExtensions, code };
  }
}

export class DataBaseError extends ApolloError {
  constructor(message: string, properties?: Record<string, unknown>) {
    super(message, ErrorCode.DATA_BASE_ERROR, properties);

    Object.defineProperty(this, 'name', { value: 'DataBaseError' });
  }
}

export class InvalidNickNameError extends ApolloError {
  constructor(message: string, properties?: Record<string, unknown>) {
    super(message, ErrorCode.INVALID_NICKNAME, properties);

    Object.defineProperty(this, 'name', { value: 'InvalidNickNameError' });
  }
}

export class AuthError extends ApolloError {
  constructor(message: string, properties?: Record<string, unknown>) {
    super(message, ErrorCode.AUTH_ERROR, properties);

    Object.defineProperty(this, 'name', { value: 'AuthError' });
  }
}

export class TokenRequiredError extends ApolloError {
  constructor(message: string, properties?: Record<string, unknown>) {
    super(message, ErrorCode.TOKEN_REQUIRED_ERROR, properties);

    Object.defineProperty(this, 'name', { value: 'TokenRequiredError' });
  }
}

export class IncorrectPasswordOrEmailError extends ApolloError {
  constructor(message: string, properties?: Record<string, unknown>) {
    super(message, ErrorCode.INCORRECT_EMAIL_OR_PASSWORD, properties);

    Object.defineProperty(this, 'name', { value: 'IncorrectPasswordOrEmailError' });
  }
}

export class IncorrectPasswordError extends ApolloError {
  constructor(message: string, properties?: Record<string, unknown>) {
    super(message, ErrorCode.INCORRECT_PASSWORD, properties);

    Object.defineProperty(this, 'name', { value: 'IncorrectPasswordError' });
  }
}

export class AccountAlreadyExistError extends ApolloError {
  constructor(message: string, properties?: Record<string, unknown>) {
    super(message, ErrorCode.ACCOUNT_ALREADY_EXIST, properties);

    Object.defineProperty(this, 'name', { value: 'AccountAlreadyExistError' });
  }
}

export class InvalidPasswordError extends ApolloError {
  constructor(message: string, properties?: Record<string, unknown>) {
    super(message, ErrorCode.INVALID_PASSWORD, properties);

    Object.defineProperty(this, 'name', { value: 'InvalidPasswordError' });
  }
}

export class InvalidEmailError extends ApolloError {
  constructor(message: string, properties?: Record<string, unknown>) {
    super(message, ErrorCode.INVALID_EMAIL, properties);

    Object.defineProperty(this, 'name', { value: 'InvalidEmailError' });
  }
}

export class UserNotFoundError extends ApolloError {
  constructor(message: string, properties?: Record<string, unknown>) {
    super(message, ErrorCode.USER_NOT_FOUND, properties);

    Object.defineProperty(this, 'name', { value: 'UserNotFoundError' });
  }
}

export class NotFoundError extends ApolloError {
  constructor(message: string, properties?: Record<string, unknown>) {
    super(message, ErrorCode.NOT_FOUND, properties);

    Object.defineProperty(this, 'name', { value: 'NotFoundError' });
  }
}
