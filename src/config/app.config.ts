import { cleanEnv, port, str } from "envalid";
import { config } from "dotenv";

config({ path: __dirname + '/./../../.env' });

/**
 * Declare the application interface
*/
interface IApplication {
  TZ: string,
  APP_NAME: string,
  APP_PORT: number,
  NODE_ENV: "development" | "production" | "test",
  APP_HOST?: string,
  TEST_PORT?: number,
  APP_SECRET_KEY: string
}

const Application: Readonly<IApplication> = cleanEnv(process.env, {
  TZ: str({ default: 'Africa/Lagos' }),
  APP_NAME: str({ default: 'SoftAllianceMovies' }),
  APP_PORT: port(),
  NODE_ENV: str({ default: 'development'}),
  APP_HOST: str({default: '0.0.0.0'}),
  APP_SECRET_KEY: str(),
  TEST_PORT: port()
});

export default Application;