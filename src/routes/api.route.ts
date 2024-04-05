import { Application } from "express";
import { validatetoken } from "../middleware/validaterole.middleware";
import { validaterole } from "../middleware/authorize.middleware";
import { UserController } from "../controllers/user.controller";

const userController = new UserController()

export const Routes = ((Route: Application): void => {

  Route.post('/user', userController.create);

  Route.put('/user', [validatetoken()], userController.update);
  Route.post('/user/login', userController.login);

  Route.get('/user/:user_id', userController.fetchSingle);

  Route.get('/user', [validatetoken(), validaterole(['admin'])], userController.findAll);

  Route.delete('/user/:user_id', [validatetoken(), validaterole(['admin'])], userController.delete);

});