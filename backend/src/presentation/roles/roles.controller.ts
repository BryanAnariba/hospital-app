import { Request, Response } from "express";
import { RoleService } from "./roles.service";
import { CustomError } from "../../domain/error/custom.error";
import { CreateRoleDto, PaginationDto, UpdateRoleDto } from "../../domain/dto";
import { VerifyId } from "../../config";

export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) return res.status(error.statusCode).json({error: error.message});
    return res.status(500).json({error: error});
  }

  public getItems = (req: Request, res: Response) => {
    const {limit = 10, skip = 1} = req.query;
    const [error, paginationDto] = PaginationDto.getObjectFromJson({limit: +limit, skip: +skip});
    if (error) return res.status(400).json({error: error});

    this.roleService.getRoles(paginationDto!)
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(error => {
        return this.handleError(error, res);
      });
  };

  public getItem = (req: Request, res: Response) => {
    const {roleId} = req.params;
    const isValidId = VerifyId.isMongoId(roleId);
    if (!isValidId) return res.status(400).json({error: 'Invalid role id'});

    this.roleService.getRole(roleId)
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(error => {
        this.handleError(error, res);
      });
  };

  public createItem = (req: Request, res: Response) => {
    const [error, createRoleDto] = CreateRoleDto.getObjectFromJson(req.body);
    if (error) return res.status(400).json({error: error});

    this.roleService.createRole(createRoleDto!)
      .then(data => {
        return res.status(201).json(data);
      })
      .catch(error => {
        this.handleError(error, res);
      });
  };

  public editItem = (req: Request, res: Response) => {
    const {roleId} = req.params;
    const isValidId = VerifyId.isMongoId(roleId);
    if (!isValidId) return res.status(400).json({error: 'Invalid role id'});

    const [error, updateRoleDto] = UpdateRoleDto.getObjectFromJson(req.body);
    if (error) return res.status(400).json({error: error});

    this.roleService.editRole(updateRoleDto!, roleId)
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(error => {
        this.handleError(error, res);
      });
  };

  public deleteItem = (req: Request, res: Response) => {
    const {roleId} = req.params;
    const isValidId = VerifyId.isMongoId(roleId);
    if (!isValidId) return res.status(400).json({error: 'Invalid role id'});

    this.roleService.deleteRole(roleId)
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(error => {
        this.handleError(error, res);
      });
  };
}
