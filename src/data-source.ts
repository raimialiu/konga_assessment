import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"
import Database from "./config/database.config"
import { UserRepository } from "./services/repository/user.repository";

console.log({ applicationConfig: Database })

export const AppDataSource = new DataSource(<DataSourceOptions>{
  type: "mysql",
  host: Database.DATABASE_HOST,
  port: Database.DATABASE_PORT,
  username: Database.DATABASE_USER,
  password: Database.DATABASE_PASS,
  database: Database.DATABASE_NAME,
  synchronize: false,
  logging: true,
  logger: "advanced-console",
  supportBigNumbers: true,
  entities: [
    __dirname + "/model/*.ts",
    __dirname + "/entity/*.js",
  ],
  migrations: [
    __dirname + "/migration/*.ts",
    __dirname + "/migration/*.js",
  ],
});

AppDataSource.initialize()
  .then(async () => {
    console.log('Database connection has been established successfully!');
//await UserRepository.createDefaultAdminUser();
    const userRepo = new UserRepository()
    const findTestAdmin = await userRepo.findOneUser({ email: 'test@admin.com' })
    console.log({ findTestAdmin })
    if (!findTestAdmin) {
      const createReuslt = await userRepo.createUserAsync({ email: 'test@admin.com', password: 'test', role: 'admin', first_name: 'test', last_name: 'test' })
      console.log({ createReuslt })
    }

  }).catch((err: Error) => { console.log('Database failed to initialize', err) });
