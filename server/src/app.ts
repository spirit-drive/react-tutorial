import * as express from 'express';
import * as cors from 'cors';
import * as passport from 'passport';
import { server } from './graphql';

(async () => {
  const app = express();

  app.use(passport.initialize());

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(cors());

  await server.start();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4042;
  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log(`Server started on port ${PORT}${server.graphqlPath}`));
})();
