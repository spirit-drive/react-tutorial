import * as express from 'express';
import * as cors from 'cors';
import * as passport from 'passport';
import * as fileUpload from 'express-fileupload';
import { server } from './graphql';
import { setRestApiRoutes } from './setRestApiRoutes';
import { setUpload } from './setUpload';
import { runSocket } from './socket';

(async () => {
  const app = express();

  app.use(passport.initialize());

  app.use(fileUpload());

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(cors());

  setRestApiRoutes(app);
  setUpload(app);

  await server.start();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4042;
  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log(`Server started on port ${PORT}${server.graphqlPath}`));

  runSocket();
})();
