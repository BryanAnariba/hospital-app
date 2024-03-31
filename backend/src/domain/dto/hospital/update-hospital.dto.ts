import { regExp } from "../../../config";

export class UpdateHospitalDto {
  constructor (
    public readonly name: string,
    public readonly email: string,
    public readonly user: string,
  ) {}

  public static getObjectFromJson (json: {[key:string]: any}): [string?, UpdateHospitalDto?] {
    const {name, email, img, user} = json;

    if (!name || name.trim().lenght === 0) return ['Hospital Name is required', undefined];

    if (!email || email.trim().lenght === 0) return ['Hospital Email is required', undefined];

    if (!regExp.email.test(email)) return ['Invalid email', undefined];

    if (!user) return ['User is required', undefined];

    return [undefined, new UpdateHospitalDto(name, email, user)];
  }
}