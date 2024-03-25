import { Request, Response } from "express";
import { UserService } from "./users.service";
import { CreateUserDto } from "../../domain/dto";
import { isValidObjectId } from "mongoose";
import { CustomError } from "../../domain/error/custom.error";
import { PaginationDto } from "../../domain/dto/pagination/pagination.dto";
import { UpdateUserDto } from "../../domain/dto/users/update-user.dto";

export class UserController {
  constructor(private readonly userService: UserService) {}

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) return res.status(error.statusCode).json({error: error.message});
    return res.status(500).json({error: error});
  }

  public getItems = (req: Request, res: Response) => {

    //console.log('Encontrado usuario logueado en la ejecucion de esta ruta protegida: ', req.body.user);
    
    const {limit = 10, skip = 1} = req.query;

    const [error, paginationDto] = PaginationDto.getObjectFromJson({limit: +limit, skip: +skip});
    if (error) return res.status(400).json(error);

    this.userService.getUsers(paginationDto!)
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(error => {
        this.handleError(error, res);
      });
  }

  public getItem = (req: Request, res: Response) => {
    return res.status(200).json({data: 'User one works'});
  }

  public createItem = (req: Request, res: Response) => {
    const [error, createUserDto] = CreateUserDto.getObjectFromJson(req.body);
    if (error) return res.status(400).json({error: error});

    const isValidIdRole = isValidObjectId(createUserDto?.role);
    if (!isValidIdRole) return res.status(400).json({error: 'Invalid role'});

    this.userService.createUser(createUserDto!)
      .then(data => {
        return res.status(201).json(data);
      })
      .catch(error => {
        this.handleError(error, res);
      });
  }

  public editItem = (req: Request, res: Response) => {
    const {userId} = req.params;
    
    const isValidUserId = isValidObjectId(userId);
    if (!isValidUserId) return res.status(400).json({error: 'Invalid User Code'});

    const [error, updateUserDto] = UpdateUserDto.getObjectFromJson({
      id: userId,
      ...req.body,
    });
    
    if (error) return res.status(400).json({error: error});

    this.userService.editUser(updateUserDto!)
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(error => {
        this.handleError(error, res);
      });
  }

  public deleteItem = (req: Request, res: Response) => {
    const {userId} = req.params;
    const isValidUserId = isValidObjectId(userId);
    if (!isValidUserId) return res.status(400).json({error: 'Invalid user code'});

    this.userService.deleteUser(userId)
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(error => {
        this.handleError(error, res);
      })
  }
}
