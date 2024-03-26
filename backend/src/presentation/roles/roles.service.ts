import { roleModel } from "../../data/models";
import { CreateRoleDto, PaginationDto, UpdateRoleDto } from "../../domain/dto";
import { CustomError } from "../../domain/error/custom.error";

export class RoleService {
  constructor() {}

  public async getRoles (paginationDto: PaginationDto) {
    try {
      const [roles, totalRecordsRoles] = await Promise.all([
        roleModel.find({isActive: true},{})
          .skip((paginationDto.skip - 1) * paginationDto.limit)
          .limit(paginationDto.limit),
        roleModel.countDocuments({isActive: true}),
      ]);
  
      return {
        totalRecordsRoles: totalRecordsRoles,
        roles: roles,
        previusPage: ((paginationDto.skip - 1 > 0)) ? `/api/roles?page=${paginationDto.skip - 1}&limit=${paginationDto.limit}` : null,
        currentPage: `/api/roles?page=${paginationDto.skip}&limit=${paginationDto.limit}`,
        nextPage: `/api/roles?page=${paginationDto.skip + 1}&limit=${paginationDto.limit}`,
        limit: paginationDto.limit,
        skip: paginationDto.skip,
      };
    } catch (error) {
      throw CustomError.internalServerErrorRequest(`Sometime went wrong ${error}`);
    }
  }

  public async getRole (roleId: string) {
    try {
      return await roleModel.findOne({_id: roleId});
    } catch (error) {
      throw CustomError.internalServerErrorRequest(`Sometime went wrong ${error}`);
    }
  }

  public async createRole (createRoleDto: CreateRoleDto) {
    const existRole = await this.getRoleByName(createRoleDto.name);
    if (existRole) throw CustomError.badErrorRequest('Role already exists');
    try {
      const role = await roleModel.create(createRoleDto);
      return role;
    } catch (error) {
      throw CustomError.internalServerErrorRequest(`Sometime went wrong ${error}`);
    }
  }

  public async editRole (updateRoleDto: UpdateRoleDto, roleId: string) {
    const existRole = await this.getRole(roleId);
    if (!existRole) throw CustomError.badErrorRequest('Role does not exists');
    try {
      return await roleModel.findOneAndUpdate({_id: roleId}, {name: updateRoleDto.name, description: updateRoleDto.description}, {new: true});
    } catch (error) {
      throw CustomError.internalServerErrorRequest(`Sometime went wrong ${error}`);
    }
  }

  public async deleteRole (roleId: string) {
    try {
      return await roleModel.findOneAndUpdate({_id: roleId}, {isActive: false}, {new: true});
    } catch (error) {
      throw CustomError.internalServerErrorRequest(`Sometime when wrong ${error}`);
    }
  }

  private async getRoleByName(name: string) {
    return await roleModel.findOne({name: {$regex: name}});
  }
}
