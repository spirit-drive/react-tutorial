import { ResolverWithoutSource } from '../../../../types';
import { Profile } from '../../../graphql.types';

export const profile: ResolverWithoutSource<never, Profile | Error> = async (_, __, { user }) => user;
