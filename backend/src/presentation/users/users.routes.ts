import { Router } from "express";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { AuthMiddleware } from "../middlewares";

export class UserRoutes {
  public static get routes(): Router {

    const router: Router = Router(); 
    const userService = new UserService();
    const userController = new UserController(userService);

     /*
      @Users Routes
        http://localhost:3500/api/users
        http://localhost:3500/api/users/?
        http://localhost:3500/api/users
        http://localhost:3500/api/users/?
        http://localhost:3500/api/users/?
    */
    
    router
      .get('', [AuthMiddleware.validateJWT], userController.getItems)
      .get('/:userId', [AuthMiddleware.validateJWT], userController.getItem)
      .post('', [AuthMiddleware.validateJWT], userController.createItem)
      .put('/:userId', [AuthMiddleware.validateJWT], userController.editItem)
      .delete('/:userId', [AuthMiddleware.validateJWT], userController.deleteItem);

    return router;
  }
}
