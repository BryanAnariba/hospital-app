import { Request, Response } from "express";
import { HospitalsService } from "./hospitals.service";
import { CreateHospitalDto, PaginationDto } from "../../domain/dto";
import { CustomError } from "../../domain/error/custom.error";
import { isValidObjectId } from "mongoose";


export class HospitalsController {

  constructor (
    private readonly hospitalsService: HospitalsService,
  ) {}

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) return res.status(error.statusCode).json({error: error.message});
    return res.status(500).json({error: error});
  }

  public getItems= (req: Request, res: Response) => {
    const {limit = 10, skip = 1} = req.query;
    const [error, paginationDto] = PaginationDto.getObjectFromJson({limit: +limit, skip: +skip});
    if (error) return res.status(400).json({error: error});

    this.hospitalsService.getHospitals(paginationDto!)
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(error => {
        this.handleError(error, res);
      });
  }

  public getItem = (req: Request, res: Response) => {
    return res.status(200).json({data: 'get item works'});
  }

  public createItem = (req: Request, res: Response) => {
    const {user} = req.body;
    if (!user) return res.status(401).json({error: 'User not logged, you can not create this hospital'});

    const isValidUserId = isValidObjectId(user._id);
    if (!isValidUserId) return res.status(400).json({error: 'Invalid user code'});

    const [error, createHospitalDto] = CreateHospitalDto.getObjectFromJson({...req.body, user: user._id});
    if (error) return res.status(400).json({error: error});

    this.hospitalsService.createHospital(createHospitalDto!)
      .then(data => {
        return res.status(201).json(data);
      })
      .catch(error => {
        this.handleError(error, res);
      });
  }

  public editItem = (req: Request, res: Response) => {
    return res.status(200).json({data: 'edit Item works'});
  }

  public deleteItem = (req: Request, res: Response) => {
    return res.status(200).json({data: 'delete Item works'});
  }
}