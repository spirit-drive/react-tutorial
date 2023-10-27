export const typeDefs = `#graphql
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

  type Customer {
    id: ID!
    name: String
    img: String
  }

  type AuthResult {
    token: String!
    profile: Profile!
  }

  type Cat {
    id: ID!
    name: String
    age: Float
  }

  type Dog {
    id: ID!
    name: String
    age: Float
  }

  union Animal = Cat | Dog

  type ProfilePasswordMutations {
    change(input: ChangePasswordInput!): ResetPassword!
  }

  type ProfileMutations {
    signup(email: String!, password: String!): AuthResult!
    signin(email: String!, password: String!): AuthResult!
    update(input: UpdateProfileInput!): Profile!
    password: ProfilePasswordMutations
  }

  type CustomerMutations {
    add(name: String!, img: String): Customer!
    edit(id: ID!, name: String!, img: String): Customer!
    remove(id: ID!): Boolean!
  }

  type Query {
    profile: Profile
    customers(ids: [ID!]): [Customer]
    animals(ids: [ID!]): [Animal]
  }

  type Mutation {
    profile: ProfileMutations
    customers: CustomerMutations
  }
`;
