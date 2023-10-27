export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Animal = Cat | Dog;

export type AuthResult = {
  __typename?: 'AuthResult';
  profile: Profile;
  token: Scalars['String']['output'];
};

export type Cat = {
  __typename?: 'Cat';
  age?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Customer = {
  __typename?: 'Customer';
  id: Scalars['ID']['output'];
  img?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type CustomerMutations = {
  __typename?: 'CustomerMutations';
  add: Customer;
  edit: Customer;
  remove: Scalars['Boolean']['output'];
};

export type CustomerMutationsAddArgs = {
  img?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CustomerMutationsEditArgs = {
  id: Scalars['ID']['input'];
  img?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CustomerMutationsRemoveArgs = {
  id: Scalars['ID']['input'];
};

export type Dog = {
  __typename?: 'Dog';
  age?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  customers?: Maybe<CustomerMutations>;
  profile?: Maybe<ProfileMutations>;
};

export type Profile = UserInterface & {
  __typename?: 'Profile';
  about?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  signUpDate: Scalars['String']['output'];
};

export type ProfileMutations = {
  __typename?: 'ProfileMutations';
  password?: Maybe<ProfilePasswordMutations>;
  signin: AuthResult;
  signup: AuthResult;
  update: Profile;
};

export type ProfileMutationsSigninArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type ProfileMutationsSignupArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
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
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type QueryCustomersArgs = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type ResetPassword = {
  __typename?: 'ResetPassword';
  success: Scalars['Boolean']['output'];
};

export type UpdateProfileInput = {
  about?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = UserInterface & {
  __typename?: 'User';
  about?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  signUpDate: Scalars['String']['output'];
};

export type UserFilters = {
  id: Scalars['ID']['input'];
};

export type UserInterface = {
  about?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  signUpDate: Scalars['String']['output'];
};
