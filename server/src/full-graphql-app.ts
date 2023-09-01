import * as express from 'express';
import * as cors from 'cors';
import * as passport from 'passport';
import { expressMiddleware } from '@apollo/server/express4';
import * as fileUpload from 'express-fileupload';
import { setRestApiRoutes } from './setRestApiRoutes';
import { setUpload } from './setUpload';
import { runSocket } from './socket';
import { createServer } from 'http';
import { makeStandaloneServer } from './graphql/full-graphql-server';

(async () => {
  const app = express();
  const httpServer = createServer(app);

  app.use(passport.initialize());
  app.use(fileUpload());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));

  const PORT = parseInt(process.env.PORT) || 4042;
  const { server } = await makeStandaloneServer(httpServer, PORT);

  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      credentials: true,
      origin: ['http://localhost:2033/'],
    }),
    express.json(),
    expressMiddleware(server)
  );

  // eslint-disable-next-line no-console
  httpServer.listen(() => console.log(`Server is now running on http://localhost:${PORT}/graphql`));

  setRestApiRoutes(app);
  setUpload(app);
  runSocket();
})();
