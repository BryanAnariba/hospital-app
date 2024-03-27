import { Router } from "express";
import { UploadsService } from "./uploads.service";
import { UploadsController } from "./uploads.controller";
import { AuthMiddleware } from "../middlewares";

export class UploadsRoutes {
  public static get routes(): Router {

    const router: Router = Router();
    const uploadsService = new UploadsService();
    const uploadsController = new UploadsController(uploadsService);

    router.post('/:type/:id', [AuthMiddleware.validateJWT], );

    return router;
  }
}
