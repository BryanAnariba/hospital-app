import { compareSync, genSaltSync, hashSync } from "bcryptjs";

export class Bcrypt {

  public static hashPassword(password: string): string {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  }

  public static comparePasswords(password: string, hashedPassword: string): boolean {
    return compareSync(password, hashedPassword);
  }
}