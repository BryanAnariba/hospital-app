import fs from "node:fs";
import { doctorModel, hospitalModel, userModel } from "../../data/models";
import { CustomError } from "../../domain/error/custom.error";

export class UploadsService {
  public async saveImage(type: string, id: string, fileName: string) {
    try {
      switch (type) {
        case "doctors":
          const existsDoctor = await doctorModel.findOne({ _id: id });
          if (!existsDoctor) throw CustomError.badErrorRequest(`Doctor Not found`);
          this.verifyIfImageExistsAndDelete(type, existsDoctor.img);
          // TODO: Save
          return await doctorModel.findOneAndUpdate(
            { _id: id },
            { img: fileName },
            { new: true }
          );

        case "users":
          const existsUser = await userModel.findOne({ _id: id });
          if (!existsUser) throw CustomError.badErrorRequest(`User Not found`);
          this.verifyIfImageExistsAndDelete(type, existsUser.img);
          // TODO: Save
          const user = await userModel.findOneAndUpdate(
            { _id: id },
            { img: fileName },
            { new: true }
          );
          const {password, ...restOfUser} = user!.toJSON();
          return restOfUser;

        case "hospitals":
          const existsHospital = await hospitalModel.findOne({ _id: id });
          if (!existsHospital) throw CustomError.badErrorRequest(`Hospital Not found`);
          this.verifyIfImageExistsAndDelete(type, existsHospital.img);
          // TODO: Save
          return await hospitalModel.findOneAndUpdate(
            { _id: id },
            { img: fileName },
            { new: true }
          );
      }
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerErrorRequest(
        `Sometime went wrong ${error}`
      );
    }
  }

  private verifyIfImageExistsAndDelete(type: string, img: string) {
    if (img && img.trim().length > 0) {
      const imgPath = `./uploads/${type}/${img}`;
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }
  }
}
