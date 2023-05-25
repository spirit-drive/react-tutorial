export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date as iso string */
  Date: any;
  JSON: any;
  JSONObject: any;
  /** between 0 and 100 */
  Percent: any;
};

export type AuthResult = {
  __typename?: 'AuthResult';
  token: Scalars['String'];
};

export type ChangePasswordInput = {
  password: Scalars['String'];
  newPassword: Scalars['String'];
};




export type Mutation = {
  __typename?: 'Mutation';
  profile?: Maybe<ProfileMutations>;
};


export type Profile = UserInterface & {
  __typename?: 'Profile';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  signUpDate: Scalars['Date'];
  about?: Maybe<Scalars['String']>;
  email: Scalars['String'];
};

export type ProfileMutations = {
  __typename?: 'ProfileMutations';
  signup: AuthResult;
  signin: AuthResult;
  update: Profile;
  password?: Maybe<ProfilePasswordMutations>;
};


export type ProfileMutationsSignupArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type ProfileMutationsSigninArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type ProfileMutationsUpdateArgs = {
  input: UpdateProfileInput;
};

export type ProfilePasswordMutations = {
  __typename?: 'ProfilePasswordMutations';
  reset: ResetPassword;
  setNew: ResetPassword;
  change: ResetPassword;
};


export type ProfilePasswordMutationsResetArgs = {
  email: Scalars['String'];
};


export type ProfilePasswordMutationsSetNewArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};


export type ProfilePasswordMutationsChangeArgs = {
  input: ChangePasswordInput;
};

export type Query = {
  __typename?: 'Query';
  profile?: Maybe<Profile>;
};

export type ResetPassword = {
  __typename?: 'ResetPassword';
  success: Scalars['Boolean'];
};

export type UpdateProfileInput = {
  name?: Maybe<Scalars['String']>;
  about?: Maybe<Scalars['String']>;
};

export type User = UserInterface & {
  __typename?: 'User';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  signUpDate: Scalars['Date'];
  about?: Maybe<Scalars['String']>;
};

export type UserFilters = {
  id: Scalars['ID'];
};

export type UserInterface = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  about?: Maybe<Scalars['String']>;
  signUpDate: Scalars['Date'];
};
