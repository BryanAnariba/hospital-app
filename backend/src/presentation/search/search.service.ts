import { doctorModel, hospitalModel, userModel } from "../../data/models";
import { CustomError } from "../../domain/error/custom.error";

export class SearchService {
  public async getAll(searchField: string) {
    try {
      const regex = new RegExp(searchField, "i");
      const [users, hospitals, doctors] = await Promise.all([
        userModel.find({ name: regex }),
        hospitalModel.find({ name: regex }),
        doctorModel.find({ name: regex }),
      ]);
      return {
        users,
        hospitals,
        doctors,
      };
    } catch (error) {
      throw CustomError.internalServerErrorRequest(
        `Sometime went wrong ${error}`
      );
    }
  }

  public async getAllByCollection(searchField: string, collection: string) {
    let data;
    try {
      const regex = new RegExp(searchField, "i");
      switch (collection) {
        case "users":
          data = await userModel.find({ name: regex });
          break;
        case "hospitals":
          data = await hospitalModel.find({ name: regex });
          break;
        case "doctors":
          data = await doctorModel.find({ name: regex });
          break;
        default:
          throw CustomError.badErrorRequest("Collection not found");
      }
      return data;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw CustomError.internalServerErrorRequest(
          `Sometime went wrong ${error}`
        );
      }
    }
  }
}
