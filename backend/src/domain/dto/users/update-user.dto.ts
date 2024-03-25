import { regExp } from "../../../config";

export class UpdateUserDto {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly role: string,
    public readonly img: string,
  ) {}

  public static getObjectFromJson (json: {[key: string]: any}): [string?, UpdateUserDto?] {
    const {id, name, email, role, img} = json;

    if (!id) return ['User id is required', undefined];

    if (!name || name.trim().length === 0) return ['Name is required', undefined];

    if (!email || email.trim().length === 0) return ['Email is required', undefined];

    if (!regExp.email.test(email)) return ['Invalid email', undefined];

    if (!role || role.trim().lenght === 0) return ['Role is required', undefined];

    return [undefined, new UpdateUserDto(id, name, email, role, img)];
  }
}
