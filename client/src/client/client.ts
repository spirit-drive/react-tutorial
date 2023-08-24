import { ApolloClient, createHttpLink, InMemoryCache, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { errorLink } from 'src/client/errorLink';
import { storage } from 'src/utils/storage';
import { URL } from 'src/client/config';
import possibleTypes from './possibleTypes.json';
import { TOKEN_KEY } from '../store/token';

const httpLink = createHttpLink({
  uri: `${URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = storage.get(TOKEN_KEY);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client: ApolloClient<unknown> = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    possibleTypes,
  }),
});
