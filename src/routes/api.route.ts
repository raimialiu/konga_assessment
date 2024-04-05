import { Application } from "express";
import userController from "../controllers/user.controller";
import { validatetoken } from "../middleware/validaterole.middleware";
import { validaterole } from "../middleware/authorize.middleware";


export const Routes = ((Route: Application): void => {

  Route.post('/user', userController.create);

  Route.put('/user', userController.update);

  Route.get('/user/:genreId', userController.fetchSingle);

  Route.get('/user', [validatetoken, validaterole], userController.findAll);

  Route.delete('/user/:genreId', [validatetoken, validaterole], userController.delete);

});