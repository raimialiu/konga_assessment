

import Application from "../src/config/app.config";
import { AppDataSource } from "../src/data-source";
import { UserRepository } from "../src/services/repository/user.repository";
import { appDetails } from '../src/index';
const userRepo = new UserRepository()
const request = require("supertest");
const App = appDetails



/* Connecting to the database before each test. */
beforeEach(async () => {
    //Application.APP_HOST = Application.TEST_PORT
    await AppDataSource.initialize()
  });

  

  describe("admin should have been created", () => {
    it("should get test admin details", async () => {
     const resp = await userRepo.findOneUser({
       email: 'test@admin.com'
     })

     console.log({findUserResp: resp})
      expect(resp).not.toBeNull();
     //expect(resp.password).toEqual(hashSync('test', 10));
    });
  });

  describe("login admin user", () => {
    it("should be able to login using test admin details", async () => {
      const res = await request(App).post("/user/login").send({
        email: 'test@admin.com',
        password: 'test'
      });
    
      const token = res?.body?.data?.token
      console.log({token, body: res.body})
      expect(res.statusCode).toBe(200);
      expect(token).toBeDefined();
      //expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe("create user", () => {
    it("should be able to createUser", async () => {
      const res = await request(App).post("/user").send({
        email: '4354w553@gmail.com',
        password: 'test4543',
        first_name: 'test544534',
        role: 'user',
        last_name: 'user54534534'
      });
    
      console.log({createResponse: res.body})
      expect(res.statusCode).toBe(200);
    
      //expect(res.body.length).toBeGreaterThan(0);
    });
  });


  
  /* Closing database connection after each test. */
  afterEach(async () => {
    await AppDataSource.destroy()
  });

  

