import { Bcrypt, JWT, environmentVars } from "../../config";
import { SignInDto, SignUpDto } from "../../domain/dto";
import { CustomError } from "../../domain/error/custom.error";
import { UserService } from "../users/users.service";

export class AuthService {
  constructor () {}

  public async onSignIn (signInDto: SignInDto) {
    const userService = new UserService();

    const existsUser = await userService.getUserByEmail(signInDto.email);
    if (!existsUser) throw CustomError.badErrorRequest(`User ${signInDto.email} does not exists`);

    const isMatchPassword = Bcrypt.comparePasswords(signInDto.password, existsUser.password);
    if (!isMatchPassword) throw CustomError.badErrorRequest(`Invalid Credentials`);

    if (!existsUser.isActive) throw CustomError.badErrorRequest('Inactive user: please contact with system administrator');

    const { password, createdAt, updatedAt, ...restOfUser } = existsUser.toJSON();

    try {
      const jwt = new JWT({jwtSeed: environmentVars.JWT_SEED});
      const token = await jwt.genToken({_id: `${existsUser._id}`});
      return {
        token: token,
        user: restOfUser,
      };
    } catch (error) {
      throw CustomError.internalServerErrorRequest(`Sometime went wrong ${error}`);
    }
  }

  public async onSignUp (signUpDto: SignUpDto) {
    const userService = new UserService();
    const newUser = await userService.createUser(signUpDto);
    try {
      const jwt = new JWT({jwtSeed: environmentVars.JWT_SEED});
      const token = await jwt.genToken({_id: `${newUser._id}`});
      return {
        token: token,
        user: newUser,
      };
    } catch (error) {
      throw CustomError.internalServerErrorRequest(`Sometime went wrong ${error}`);
    }
  }
}