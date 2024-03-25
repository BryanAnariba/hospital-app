import { regExp } from "../../../config";

export class CreateUserDto {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: string,
    public readonly img: string,
    public readonly google: boolean,
  ) {}

  public static getObjectFromJson (json: {[key: string]: any}): [string?, CreateUserDto?] {
    const {name, email, password, role, img = '', google = false} = json;

    if (!name || name.trim().length === 0) return ['Name is required', undefined];

    if (!email || email.trim().length === 0) return ['Email is required', undefined];

    if (!regExp.email.test(email)) return ['Invalid email', undefined];

    if (!password || password.trim().length === 0) return ['Password is required', undefined];

    if (!role || role.trim().length === 0) return ['Role is required', undefined];

    return [undefined, new CreateUserDto(name, email, password, role, img, google)];
  }
}
