import { isValidObjectId } from "mongoose";

export class VerifyId {
  public static isMongoId(id: string): boolean {
    return isValidObjectId(id);
  }
}
