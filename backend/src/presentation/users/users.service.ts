import { Bcrypt } from "../../config";
import { userModel } from "../../data/models";
import { CreateUserDto, PaginationDto, UpdateUserDto } from "../../domain/dto";
import { CustomError } from "../../domain/error/custom.error";
import { RoleService } from "../roles/roles.service";

export class UserService {

  constructor() {}

  public async createUser(createUserDto: CreateUserDto) {
    const roleService = new RoleService();

    const existsRole = await roleService.getRole(createUserDto.role);
    if (!existsRole) throw CustomError.notFoundErrorRequest('Role not found');

    const existsUser = await this.getUserByEmail(createUserDto.email);
    if (existsUser) throw CustomError.badErrorRequest(`User with email ${createUserDto.email} already exists`);

    try {
      const user = userModel.create({
        ...createUserDto,
        password: Bcrypt.hashPassword(createUserDto.password),
      });

      const { password, createdAt, updatedAt, ...restOfUser } = (await user).toJSON();
      return restOfUser;
    } catch (error) {
      throw CustomError.internalServerErrorRequest(`Sometime went wrong ${error}`);
    }
  }

  public async getUsers (paginationDto: PaginationDto) {
    const [users, totalUsers] = await Promise.all([
      userModel.find({isActive: true}, {password: false}).skip((paginationDto.skip - 1) * paginationDto.limit).limit(paginationDto.limit),
      userModel.countDocuments({isActive: true}),
    ]);

    return {
      users: users,
      totalUsers: totalUsers,
      previusPage: (paginationDto.skip - 1 > 0) ? `/api/users?skip=${paginationDto.skip - 1}&limit=${paginationDto.limit}` : null,
      currentPage: `/api/users?skip=${paginationDto.skip}&limit=${paginationDto.limit}`,
      nextPage: `/api/users?skip=${paginationDto.skip + 1}&limit=${paginationDto.limit}`,
      limit: paginationDto.limit,
      skip: paginationDto.skip,
    }
  }

  public async editUser(updateUserDto: UpdateUserDto) {
    const existsUser = await this.getUser(updateUserDto.id);
    if (!existsUser) throw CustomError.notFoundErrorRequest(`User ${updateUserDto.email} does not exists!`);

    const roleService = new RoleService();

    const existsRole = await roleService.getRole(updateUserDto.role);
    if (!existsRole) throw CustomError.notFoundErrorRequest('Role not found');

    if (existsUser.email !== updateUserDto.email) {
      const existsEmailInOtherAccount = await this.getUserByEmail(updateUserDto.email);
      if (existsEmailInOtherAccount) throw CustomError.badErrorRequest(`The email ${updateUserDto.email} already exists in Hospital App`);
    }

    if (existsUser.google && existsUser.email !== updateUserDto.email) {
      throw CustomError.badErrorRequest(`Google User cannot updated the email`);
    }

    try {
      let userUpdated;
      if (existsUser.google) {
        userUpdated = await userModel.findOneAndUpdate(
          {_id: updateUserDto.id}, 
          {
            name: updateUserDto.name,
            role: updateUserDto.role
          }, 
          { new: true }
        );
      } else {
        userUpdated = await userModel.findOneAndUpdate(
          {_id: updateUserDto.id}, 
          updateUserDto, 
          { new: true }
        );
      }

      
      const {password, ...restOfUser} = userUpdated!.toJSON();
      return restOfUser;
    } catch (error) {
      throw CustomError.internalServerErrorRequest(`Sometime went wrong ${error}`);
    }
  }

  public async getUser(userId: string) {
    try {
      return await userModel.findOne({_id: userId}, {password: false}).populate('role', 'name description');
    } catch (error) {
      throw CustomError.internalServerErrorRequest(`Sometime when wrong ${error}`);
    }
  }

  public async deleteUser(userId: string) {
    const existsUser = await this.getUser(userId);
    if (!existsUser) throw CustomError.notFoundErrorRequest(`User not found`);
    try {
      return await userModel.findOneAndUpdate({_id: userId}, {isActive: false}, {new: true});
    } catch (error) {
      throw CustomError.internalServerErrorRequest(`Sometime went wrong ${error}`);
    }
  }

  public async getUserByEmail(email: string) {
    try {
      return await userModel.findOne({email: email}).populate('role', 'name');
    } catch (error) {
      throw CustomError.internalServerErrorRequest(`Sometime went wrong ${error}`);
    }
  }
}
