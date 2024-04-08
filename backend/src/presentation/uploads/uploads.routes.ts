import { Router } from "express";
import { UploadsService } from "./uploads.service";
import { UploadsController } from "./uploads.controller";
import { AuthMiddleware } from "../middlewares";
import expressFileUpload from 'express-fileupload';

export class UploadsRoutes {
  public static get routes(): Router {

    const router: Router = Router();
    const uploadsService = new UploadsService();
    const uploadsController = new UploadsController(uploadsService);

    /*
      type = es la coleccion a guardar sea usuarios, hospitales o doctores
      id = es el _id del documento de la coleccion a guardar por ejemplo el usuario test one con el id abc123
    */
    router.use(expressFileUpload());
    router.post('/:type/:id', [AuthMiddleware.validateJWT], uploadsController.uploadFile);
    router.get('/:type/:img', [/*AuthMiddleware.validateJWT*/], uploadsController.getUploadFiles);

    return router;
  }
}
