import { Request, Response } from "express";
import { DoctorsService } from "./doctors.service";
import { CreateDoctorDto, PaginationDto } from "../../domain/dto";
import { CustomError } from "../../domain/error/custom.error";
import { isValidObjectId } from "mongoose";

export class DoctorsController {

  constructor (
    private readonly doctorsService: DoctorsService
  ) {}

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) return res.status(error.statusCode).json({error: error.message});
    return res.status(500).json({error: error});
  }

  public getItems= (req: Request, res: Response) => {
    
    const {limit=10, skip=1} = req.query;
    const [error, paginationDto] = PaginationDto.getObjectFromJson({limit: +limit, skip: +skip});
    if (error) return res.status(400).json({error: error});

    this.doctorsService.getDoctors(paginationDto!)
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
    const {user, hospital} = req.body;

    const isValidUserId = isValidObjectId(user._id);
    const isValidHospitalId = isValidObjectId(hospital);

    if (!isValidUserId) return res.status(400).json({error: 'User logged is not valid'});
    if (!isValidHospitalId) return res.status(400).json({error: 'Hospital is not valid'});

    const [error, createDoctorDto] = CreateDoctorDto.getObjectFromJson({...req.body, user: user._id, hospital: hospital});
    if (error) return res.status(400).json({error: error});

    this.doctorsService.createDoctor(createDoctorDto!)
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