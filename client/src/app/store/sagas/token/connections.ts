import { gql } from '@apollo/client';
import { Query } from 'src/server.types';
import { get } from 'src/utils/unchanged';

export type GetProfileResponse = Pick<Query, 'profile'>;
export const GET_PROFILE = gql`
  query getProfile {
    profile {
      about
      email
      id
      name
      signUpDate
    }
  }
`;

export const extractGetProfile = (data: GetProfileResponse): Query['profile'] => get('profile', data);
