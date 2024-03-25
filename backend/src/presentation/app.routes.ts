import { Router } from "express";
import { UserRoutes } from "./users/users.routes";
import { RoleRoutes } from "./roles/roles.routes";
import { AuthRoutes } from "./auth/auth.routes";

export class AppRoutes {

  public static get routes(): Router {
    
    const router: Router = Router();

    router.use('/auth', AuthRoutes.routes);
    router.use('/users', UserRoutes.routes);
    router.use('/roles', RoleRoutes.routes);

    return router;
  }
}