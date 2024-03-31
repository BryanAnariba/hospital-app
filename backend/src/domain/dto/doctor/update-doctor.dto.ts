import { regExp } from "../../../config";

export class UpdateDoctorDto {
  constructor (
    public readonly name: string,
    public readonly email: string,
    public readonly user: string,
    public readonly hospital: string,
  ) {}

  public static getObjectFromJson (json: {[key: string]: any}): [string?, UpdateDoctorDto?] {
    const { name, email, user, hospital } = json;

    if (!name || name.trim().length === 0) return ['Name is required', undefined];

    if (!email || email.trim().length === 0) return ['Email is required', undefined];

    if (!regExp.email.test(email)) return ['Invalid Email', undefined];

    if (!user) return ['User id logged is required', undefined];

    if (!hospital) return ['Hospital id is required', undefined];

    return [undefined, new UpdateDoctorDto(name, email, user, hospital)];
  }
}