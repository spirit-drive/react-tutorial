import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  input UserFilters {
    id: ID!
  }

  input UpdateProfileInput {
    name: String
    about: String
  }

  input ChangePasswordInput {
    password: String!
    newPassword: String!
  }

  interface UserInterface {
    id: ID!
    name: String
    about: String
    signUpDate: String!
  }

  type User implements UserInterface {
    id: ID!
    name: String
    signUpDate: String!
    about: String
  }

  type Profile implements UserInterface {
    id: ID!
    name: String
    signUpDate: String!
    about: String

    # private
    email: String!
  }

  type ResetPassword {
    success: Boolean!
  }

  type AuthResult {
    token: String!
  }

  type ProfilePasswordMutations {
    change(input: ChangePasswordInput!): ResetPassword!
  }

  type ProfileMutations {
    signup(email: String!, password: String!): AuthResult!
    signin(email: String!, password: String!): AuthResult!
    update(input: UpdateProfileInput!): Profile!
    password: ProfilePasswordMutations
  }

  type Query {
    profile: Profile
  }

  type Mutation {
    profile: ProfileMutations
  }
`;
