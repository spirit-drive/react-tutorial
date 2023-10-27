export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
};

export type Animal = Cat | Dog;

export type AuthResult = {
  __typename?: 'AuthResult';
  profile: Profile;
  token: Scalars['String'];
};

export type Cat = {
  __typename?: 'Cat';
  age?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String'];
  password: Scalars['String'];
};

export type Customer = {
  __typename?: 'Customer';
  id: Scalars['ID'];
  img?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type CustomerMutations = {
  __typename?: 'CustomerMutations';
  add: Customer;
  edit: Customer;
  remove: Scalars['Boolean'];
};


export type CustomerMutationsAddArgs = {
  img?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};


export type CustomerMutationsEditArgs = {
  id: Scalars['ID'];
  img?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};


export type CustomerMutationsRemoveArgs = {
  id: Scalars['ID'];
};

export type Dog = {
  __typename?: 'Dog';
  age?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  customers?: Maybe<CustomerMutations>;
  profile?: Maybe<ProfileMutations>;
};

export type Profile = UserInterface & {
  __typename?: 'Profile';
  about?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  signUpDate: Scalars['String'];
};

export type ProfileMutations = {
  __typename?: 'ProfileMutations';
  password?: Maybe<ProfilePasswordMutations>;
  signin: AuthResult;
  signup: AuthResult;
  update: Profile;
};


export type ProfileMutationsSigninArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type ProfileMutationsSignupArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type ProfileMutationsUpdateArgs = {
  input: UpdateProfileInput;
};

export type ProfilePasswordMutations = {
  __typename?: 'ProfilePasswordMutations';
  change: ResetPassword;
};


export type ProfilePasswordMutationsChangeArgs = {
  input: ChangePasswordInput;
};

export type Query = {
  __typename?: 'Query';
  animals?: Maybe<Array<Maybe<Animal>>>;
  customers?: Maybe<Array<Maybe<Customer>>>;
  profile?: Maybe<Profile>;
};


export type QueryAnimalsArgs = {
  ids?: InputMaybe<Array<Scalars['ID']>>;
};


export type QueryCustomersArgs = {
  ids?: InputMaybe<Array<Scalars['ID']>>;
};

export type ResetPassword = {
  __typename?: 'ResetPassword';
  success: Scalars['Boolean'];
};

export type UpdateProfileInput = {
  about?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type User = UserInterface & {
  __typename?: 'User';
  about?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  signUpDate: Scalars['String'];
};

export type UserFilters = {
  id: Scalars['ID'];
};

export type UserInterface = {
  about?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  signUpDate: Scalars['String'];
};
