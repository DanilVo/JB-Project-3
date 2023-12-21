import cors from "cors";
import express from "express";
import expressFileUpload from "express-fileupload";
import expressRateLimit from "express-rate-limit";
import helmet from "helmet";
import path from "path";
import { fileSaver } from "uploaded-file-saver";
import appConfig from "./2-utils/app-config";
import activities from "./4-middleware/activities";
import catchAll from "./4-middleware/catch-all";
import routeNotFound from "./4-middleware/route-not-found";
import sanitize from "./4-middleware/sanitize";
import authController from "./6-controllers/auth-controller";
import vacationController from "./6-controllers/vacation-controller";
import userController from "./6-controllers/user-controller";

const server = express();

server.use(
  expressRateLimit({
    windowMs: 1000,
    limit: 16,
  })
);

if (appConfig.isDevelopment) {
  server.use(cors());
} else {
  server.use(cors({ origin: "http://www.our-website.com" }));
}

fileSaver.config(path.join(__dirname, "1-assets", "vacationImages"));

server.use(express.json());
server.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));
server.use(expressFileUpload());
server.use(activities);
server.use(sanitize);
server.use("/api", vacationController, authController, userController);
server.use("*", routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () =>
  console.log(`Listening on https://localhost:${appConfig.port}`)
);
