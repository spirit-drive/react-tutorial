import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { Server } from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
export const AUTHENTICATION_TYPE = 'Bearer';
const regexpForRemoveAuthenticationType = new RegExp(`^${AUTHENTICATION_TYPE}\\s`);
const getToken = (authentication: string): string => authentication?.replace(regexpForRemoveAuthenticationType, '');

const schema = makeExecutableSchema({ typeDefs, resolvers });

export const makeStandaloneServer = async (httpServer: Server, port: number) => {
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/subscriptions',
  });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await startStandaloneServer(server, {
    listen: { port },
    context: async ({ req }) => {
      const { authorization, locale } = req.headers as { authorization: string; locale: string };
      const token = getToken(authorization);
      return { token, locale };
    },
  });

  return {
    server,
  };
};
