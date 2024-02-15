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
import { routeNotFound } from './4-middleware/not-found';
import sanitize from './4-middleware/sanitize';
import authController from './6-controllers/auth-controller';
import vacationController from './6-controllers/vacation-controller';
import mailController from './6-controllers/mail-controller';
import userController from './6-controllers/user-controller';
import gptService from './6-controllers/gpt-controller';

const server = express();

server.use(
  expressRateLimit({
    windowMs: 10000,
    limit: 100,
    message: 'To many requests, please try again later!',
  })
);

if (appConfig.isDevelopment) {
  server.use(cors());
} else {
  server.use(cors({ origin: '' }));
}

fileSaver.config(path.join(__dirname, '1-assets'));

server.use(express.json());
server.use(expressFileUpload());
server.use(activities);
server.use(sanitize);
server.use(
  '/api',
  vacationController,
  authController,
  userController,
  mailController,
  gptService
);
server.use('/api/*', routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () =>
  console.log(`Listening on port: ${appConfig.port}`)
);

export default {
  server,
};
