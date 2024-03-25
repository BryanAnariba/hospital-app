import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

export class AuthRoutes {

  public static get routes(): Router {

    const router: Router = Router();
    const authService = new AuthService();
    const authController = new AuthController(authService);

    /*
      @Auth Routes
        http://localhost:3500/api/auth/sign-in 
        http://localhost:3500/api/auth/sign-up
    */

    router
      .post('/sign-in', authController.signIn)
      .post('/sign-up', authController.signUp);

    return router;
  }
}