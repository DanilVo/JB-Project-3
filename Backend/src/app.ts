import cors from 'cors';
import express from 'express';
import expressFileUpload from 'express-fileupload';
import expressRateLimit from 'express-rate-limit';
import helmet from 'helmet';
import path from 'path';
import { fileSaver } from 'uploaded-file-saver';
import appConfig from './2-utils/app-config';
import activities from './4-middleware/activities';
import catchAll from './4-middleware/catch-all';
import routeNotFound from './4-middleware/route-not-found';
import sanitize from './4-middleware/sanitize';
import vocationController from './6-controllers/vocation-controller';
import authController from './6-controllers/auth-controller';

const server = express();

server.use(
  expressRateLimit({
    windowMs: 1000,
    limit: 2,
  })
);

if (appConfig.isDevelopment) {
  server.use(cors({ origin: 'http://localhost:4000' }));
} else {
  server.use(cors({ origin: 'http://www.our-website.com' }));
}

fileSaver.config(path.join(__dirname, '1-assets', 'images'));

server.use(express.json());
server.use(helmet());
server.use(expressFileUpload());
server.use(activities);
server.use(sanitize);
server.use('/api', vocationController,authController); // Add here routes for controller
server.use('*', routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () =>
  console.log(`Listening on https://localhost:${appConfig.port}`)
);
