import { doctorModel } from "../../data/models";
import { CreateDoctorDto, PaginationDto } from "../../domain/dto";
import { CustomError } from "../../domain/error/custom.error";
import { UserService } from "../users/users.service";

export class DoctorsService {

  public async getDoctorByName (name: string) {
    try {
      return await doctorModel.findOne({name: name.toUpperCase()});
    } catch (error) {
      throw CustomError.internalServerErrorRequest(`Sometime went wrong ${error}`);
    }
  }
  
  public async getDoctors (paginationDto: PaginationDto) {
    try {
      const [doctors, totalDoctors] = await Promise.all(
        [
          doctorModel.find({isActive: true}).limit(paginationDto.limit).skip((paginationDto.skip - 1) * paginationDto.limit).populate('user', 'name').populate('hospital', 'name'),
          doctorModel.countDocuments({isActive: true}),
        ]
      );

      return {
        doctors: doctors,
        totalDoctors: totalDoctors,
        previusPage: (paginationDto.skip - 1 >  0) ? `/api/doctors?skip=${paginationDto.skip-1}&limit=${paginationDto.limit}` : null,
        currentPage:  `/api/doctors?skip=${paginationDto.skip}&limit=${paginationDto.limit}`,
        nextPage:  `/api/doctors?skip=${paginationDto.skip+1}&limit=${paginationDto.limit}`,
        limit: paginationDto.limit,
        skip: paginationDto.skip,
      }

    } catch (error) {
      throw CustomError.internalServerErrorRequest(`Sometime went wrong ${error}`);
    }
  }

  public async createDoctor (createDoctorDto: CreateDoctorDto) {
    const userService = new UserService();

    const existsUser = await userService.getUser(createDoctorDto.user);
    if (!existsUser) throw CustomError.badErrorRequest(`The user logged does not exists`);

    const existsDoctor = await this.getDoctorByName(createDoctorDto.name);
    if (existsDoctor) throw CustomError.badErrorRequest(`The doctor ${createDoctorDto.name} already exists`);

    try {
      const newDoctor = await doctorModel.create(createDoctorDto);
      return newDoctor;
    } catch (error) {
      throw CustomError.internalServerErrorRequest(`Sometime went wrong ${error}`);
    }
  }
}