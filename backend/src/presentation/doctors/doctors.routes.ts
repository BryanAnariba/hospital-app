import { Router } from "express";
import { AuthMiddleware } from "../middlewares";
import { DoctorsController } from "./doctors.controller";
import { DoctorsService } from "./doctors.service";

export class DoctorsRoutes {

  public static get routes (): Router {
    
    const router: Router = Router();
    const doctorsService = new DoctorsService();
    const doctorsController = new DoctorsController(doctorsService);
    
    /*
      @Doctors Routes
        http://localhost:3500/api/doctors
        http://localhost:3500/api/doctors/?
        http://localhost:3500/api/doctors
        http://localhost:3500/api/doctors/?
        http://localhost:3500/api/doctors/?
    */

    router
      .get('', [AuthMiddleware.validateJWT], doctorsController.getItems)
      .get('/:hospitalId', [AuthMiddleware.validateJWT], doctorsController.getItem)
      .post('', [AuthMiddleware.validateJWT], doctorsController.createItem)
      .put('/:hospitalId', [AuthMiddleware.validateJWT], doctorsController.editItem)
      .delete('/:hospitalId', [AuthMiddleware.validateJWT], doctorsController.deleteItem);

    return router;
  }
}