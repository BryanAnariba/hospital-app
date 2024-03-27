import { Router } from "express";
import { UserRoutes } from "./users/users.routes";
import { RoleRoutes } from "./roles/roles.routes";
import { AuthRoutes } from "./auth/auth.routes";
import { HospitalsRoutes } from "./hospitals/hospitals.routes";
import { DoctorsRoutes } from "./doctors/doctors.routes";
import { SearchRoutes } from "./search/search.routes";
import { UploadsRoutes } from "./uploads/uploads.routes";

export class AppRoutes {

  public static get routes(): Router {
    
    const router: Router = Router();

    router.use('/auth', AuthRoutes.routes);
    router.use('/users', UserRoutes.routes);
    router.use('/roles', RoleRoutes.routes);
    router.use('/hospitals', HospitalsRoutes.routes);
    router.use('/doctors', DoctorsRoutes.routes);
    router.use('/search', SearchRoutes.routes);
    router.use('/uploads', UploadsRoutes.routes);

    return router;
  }
}