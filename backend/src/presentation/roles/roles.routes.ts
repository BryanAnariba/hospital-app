import { Router } from "express";
import { RoleController } from "./roles.controller";
import { RoleService } from "./roles.service";
import { AuthMiddleware } from "../middlewares";

export class RoleRoutes {
  public static get routes(): Router {

    const router: Router = Router();
    const roleService = new RoleService();
    const roleController = new RoleController(roleService);

    /*
      @Roles Routes
        http://localhost:3500/api/roles
        http://localhost:3500/api/roles/?
        http://localhost:3500/api/roles
        http://localhost:3500/api/roles/?
        http://localhost:3500/api/roles/?
    */

    router
      .get('', [AuthMiddleware.validateJWT], roleController.getItems)
      .get('/:roleId', [AuthMiddleware.validateJWT], roleController.getItem)
      .post('', [AuthMiddleware.validateJWT], roleController.createItem)
      .put('/:roleId', [AuthMiddleware.validateJWT], roleController.editItem)
      .delete('/:roleId', [AuthMiddleware.validateJWT], roleController.deleteItem);

    return router;
  }
}
