import { Request, Response } from "express";
import { DoctorsService } from "./doctors.service";

export class DoctorsController {
  constructor (
    private readonly doctorsService: DoctorsService
  ) {}

  public getItems= (req: Request, res: Response) => {
    return res.status(200).json({data: 'get items works'});
  }

  public getItem = (req: Request, res: Response) => {
    return res.status(200).json({data: 'get item works'});
  }

  public createItem = (req: Request, res: Response) => {
    return res.status(200).json({data: 'create Item works'});
  }

  public editItem = (req: Request, res: Response) => {
    return res.status(200).json({data: 'edit Item works'});
  }

  public deleteItem = (req: Request, res: Response) => {
    return res.status(200).json({data: 'delete Item works'});
  }
}