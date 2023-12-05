import cors from "cors";
import express from "express";
import expressRateLimit from "express-rate-limit";
import helmet from "helmet";
import appConfig from "./2-utils/app-config";
import catchAll from "./4-middleware/catch-all";
import activities from "./4-middleware/activities";
import routeNotFound from "./4-middleware/route-not-found";
import sanitize from "./4-middleware/sanitize";

const server = express();

server.use(
  expressRateLimit({
    windowMs: 1000, 
    limit: 2,
  })
);

if (appConfig.isDevelopment)
  server.use(cors({origin: "http://localhost:4000"}));
else server.use(cors({ origin: "http://www.our-website.com" })); 

server.use(helmet());

server.use(express.json());
server.use(activities); 
server.use(sanitize);
server.use("/api"); // Add here routes for controller
server.use("*", routeNotFound);
server.use(catchAll);


server.listen(appConfig.port, () =>
  console.log(`Listening on https://localhost:${appConfig.port}`)
);
