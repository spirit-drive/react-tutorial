import { gql } from '@apollo/client';

export const PROFILE = gql`
  fragment Profile on Profile {
    about
    email
    id
    name
    signUpDate
  }
`;
