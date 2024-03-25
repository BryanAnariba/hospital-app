import { regExp } from "../../../config";

export class SignInDto {

  constructor (
    public readonly email: string,
    public readonly password: string,
  ) {}

  public static getObjectFromJson(json: {[key: string]: any}): [string?, SignInDto?] {
    const {email, password} = json;

    if (!email || email.trim().length === 0) return ['Email is required', undefined];

    if (!regExp.email.test(email)) return ['Invalid email', undefined];

    if (!password || password.trim().length <= 6) return ['Password is required and must be greather than six characters', undefined];

    return [undefined, new SignInDto(email, password)];
  }
}