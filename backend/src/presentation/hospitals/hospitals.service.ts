import { hospitalModel } from "../../data/models";
import { CreateHospitalDto, PaginationDto, UpdateHospitalDto } from "../../domain/dto";
import { CustomError } from "../../domain/error/custom.error";
import { UserService } from "../users/users.service";

export class HospitalsService {

  public async getHospitalByName (name: string) {
    try {
      return await hospitalModel.findOne({name: name.toUpperCase()});
    } catch (error) {
      throw CustomError.internalServerErrorRequest(`Sometime went wrong ${error}`);
    }
  }

  public async getHospitals (paginationDto: PaginationDto) {
    try {
      const [hospitals, totalHospitals] = await Promise.all([
        hospitalModel.find({isActive: true}).skip((paginationDto.skip - 1) * paginationDto.limit).limit(paginationDto.limit).populate('user', 'name'),
        hospitalModel.countDocuments({isActive: true}),
      ]);

      return {
        hospitals: hospitals,
        totalHospitals: totalHospitals,
        previusPage: (paginationDto.skip - 1 > 0) ? `/api/hospitals?skip=${paginationDto.skip - 1}&limit=${paginationDto.limit}` : null,
        currentPage: `/api/hospitals?skip=${paginationDto.skip}&limit=${paginationDto.limit}`,
        nextPage: `/api/hospitals?skip=${paginationDto.skip + 1}&limit=${paginationDto.limit}`,
        skip: paginationDto.skip,
        limit: paginationDto.limit,
      }
    } catch (error) {
      throw CustomError.internalServerErrorRequest(`Sometime went wrong ${error}`);
    }
  }

  public async createHospital (createHospitalDto: CreateHospitalDto) {
    const userService = new UserService();
    
    const existsUser = await userService.getUser(createHospitalDto.user);
    if (!existsUser) throw CustomError.badErrorRequest('User that create this hospital was not found');

    const existsHospital = await this.getHospitalByName(createHospitalDto.name);
    if (existsHospital) throw CustomError.badErrorRequest(`The hospital ${createHospitalDto.name} already exists`);

    try {
      const newHospital = await hospitalModel.create(createHospitalDto);
      return newHospital;
    } catch (error) {
      throw CustomError.internalServerErrorRequest(`Sometime went wrong ${error}`);
    }
  }

  public async updateHospital (hospitalId: string, updateHospitalDto: UpdateHospitalDto) {
    const existsHospital = await this.getHospitalByName(updateHospitalDto.name);
    if (existsHospital) {
      if (`${existsHospital._id}` !== hospitalId) throw CustomError.badErrorRequest(`The name of this hospital already exists in other record`);
    }
    try {
      const updated = await hospitalModel.findOneAndUpdate({_id: hospitalId}, updateHospitalDto, {new: true}) ;
      return updated;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerErrorRequest(`Sometime went wrong ${error}`);
    }
  }

  public async deleteHospital (hospitalId: string) {
    try {
      const updated = await hospitalModel.findOneAndUpdate({_id: hospitalId}, {isActive: false}, {new: true}) ;
      return updated;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerErrorRequest(`Sometime went wrong ${error}`);
    }
  }
}