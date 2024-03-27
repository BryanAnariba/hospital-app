import { Request, Response } from "express";
import { SearchService } from "./search.service";
import { CustomError } from "../../domain/error/custom.error";

export class SearchController {
  constructor(public readonly searchService: SearchService) {}

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message });
    return res.status(500).json({ error: error });
  }
  
  public getAllItems = (req: Request, res: Response) => {
    const { searchField } = req.params;

    if (!searchField)
      return res.status(400).json({ error: "Search Field is required" });

    this.searchService
      .getAll(searchField)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((error) => {
        this.handleError(error, res);
      });
  };

  public getAllItemsByCollection = (req: Request, res: Response) => {
    const { collection, searchField } = req.params;

    if (!searchField || !collection) return res.status(400).json({ error: "Search Field and Collection is required" });

    this.searchService
      .getAllByCollection(searchField, collection)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((error) => {
        this.handleError(error, res);
      });
  };
}
