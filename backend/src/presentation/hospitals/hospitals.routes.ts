import { Router } from "express";
import { HospitalsController } from "./hospitals.controller";
import { HospitalsService } from "./hospitals.service";
import { AuthMiddleware } from "../middlewares";

export class HospitalsRoutes {

  public static get routes (): Router {
    
    const router: Router = Router();
    const hospitalsService = new HospitalsService();
    const hospitalsController = new HospitalsController(hospitalsService);

    /*
      @Hospitals Routes
      http://localhost:3500/api/hospitals
      http://localhost:3500/api/hospitals/?
      http://localhost:3500/api/hospitals
      http://localhost:3500/api/hospitals/?
      http://localhost:3500/api/hospitals/?
    */

    router
      .get('', [AuthMiddleware.validateJWT], hospitalsController.getItems)
      .get('/:hospitalId', [AuthMiddleware.validateJWT], hospitalsController.getItem)
      .post('', [AuthMiddleware.validateJWT], hospitalsController.createItem)
      .put('/:hospitalId', [AuthMiddleware.validateJWT], hospitalsController.editItem)
      .delete('/:hospitalId', [AuthMiddleware.validateJWT], hospitalsController.deleteItem);

    return router;
  }
}