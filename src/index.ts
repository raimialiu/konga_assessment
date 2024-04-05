import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import express, { Express } from "express";
import { json, urlencoded } from "body-parser";

import Application from "./config/app.config";
import { Routes } from "./routes/api.route";
import { UserRepository } from "./services/repository/user.repository";

/**
 * Initialize an express js server
*/
const App: Express = express();

process.env.TZ = Application.TZ;

/**
 * Add express middlewares
*/
App.use(cors());
App.use(json());

App.use(helmet());
App.set("trust proxy", true);
App.use(morgan("combined"))
App.use(urlencoded({ extended: true }));

/**
 * Initialize the application routes
*/


// createTEstAdmin



Routes(App)


/**
 * Start the express server
*/
App.listen(Application.APP_PORT || 1650, (): void => {
  console.log(`${Application.APP_NAME} is running on ${Application.APP_PORT}`)
});

export const appDetails = App