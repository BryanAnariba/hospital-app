import { Router } from "express";
import { SearchService } from "./search.service";
import { SearchController } from "./search.controller";
import { AuthMiddleware } from "../middlewares";

export class SearchRoutes {
  public static get routes(): Router {
    
    const router: Router = Router();
    const searchService = new SearchService();
    const searchController = new SearchController(searchService);

    router.get('/by/:searchField', [AuthMiddleware.validateJWT] ,searchController.getAllItems);
    router.get('/collection/:collection/by/:searchField', [AuthMiddleware.validateJWT] ,searchController.getAllItemsByCollection);
    
    return router;
  }
}
