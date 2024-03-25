import { hospitalModel } from "../../data/models";
import { CreateHospitalDto } from "../../domain/dto";
import { CustomError } from "../../domain/error/custom.error";
import { UserService } from "../users/users.service";

export class HospitalsService {

  public async createHospital (createHospitalDto: CreateHospitalDto) {
    const userService = new UserService();
    const existsUser = await userService.getUser(createHospitalDto.user);
    if (!existsUser) throw CustomError.badErrorRequest('User that create this hospital was not found');
    try {
      const newHospital = await hospitalModel.create(createHospitalDto);
      return newHospital;
    } catch (error) {
      throw CustomError.internalServerErrorRequest(`Sometime went wrong ${error}`);
    }
  }
}