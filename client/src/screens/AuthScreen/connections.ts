import { gql } from '@apollo/client';
import { ProfileMutationsSigninArgs, AuthResult, ProfileMutationsSignupArgs, Mutation } from 'src/server.types';
import { get } from 'src/utils/unchanged';

export type SignInVars = ProfileMutationsSigninArgs;
export type SignInResponse = Pick<Mutation, 'profile'>;
export const SIGN_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    profile {
      signin(email: $email, password: $password) {
        token
      }
    }
  }
`;

export const extractSignIn = (data: SignInResponse): Mutation['profile']['signin']['token'] =>
  get('profile.signin.token', data);

export type SignUpVars = ProfileMutationsSignupArgs;
export type SignUpResponse = AuthResult;
export const SIGN_UP = gql`
  mutation signUp($email: String!, $password: String!) {
    profile {
      signup(email: $email, password: $password) {
        token
      }
    }
  }
`;

export const extractSignUp = (data: SignUpResponse): Mutation['profile']['signup']['token'] =>
  get(`profile.signup.token`, data);
