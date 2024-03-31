import { Bcrypt, JWT, environmentVars } from "../../config";
import { userModel } from "../../data/models";
import { SignInDto, SignUpDto } from "../../domain/dto";
import { CustomError } from "../../domain/error/custom.error";
import { RoleService } from "../roles/roles.service";
import { UserService } from "../users/users.service";

export class AuthService {
  constructor() {}

  public async onSignIn(signInDto: SignInDto) {
    const userService = new UserService();

    const existsUser = await userService.getUserByEmail(signInDto.email);
    if (!existsUser)
      throw CustomError.badErrorRequest(
        `User ${signInDto.email} does not exists`
      );

    const isMatchPassword = Bcrypt.comparePasswords(
      signInDto.password,
      existsUser.password
    );
    if (!isMatchPassword)
      throw CustomError.badErrorRequest(`Invalid Credentials`);

    if (!existsUser.isActive)
      throw CustomError.badErrorRequest(
        "Inactive user: please contact with system administrator"
      );

    const { password, createdAt, updatedAt, ...restOfUser } =
      existsUser.toJSON();

    try {
      const jwt = new JWT({ jwtSeed: environmentVars.JWT_SEED });
      const token = await jwt.genToken({ _id: `${existsUser._id}` });
      return {
        token: token,
        user: restOfUser,
      };
    } catch (error) {
      throw CustomError.internalServerErrorRequest(
        `Sometime went wrong ${error}`
      );
    }
  }

  public async saveGoogleSignIn(email: string, name: string, img: string) {
    const userService = new UserService();
    const roleService = new RoleService();
    let user;
    try {
      const existsUser = await userService.getUserByEmail(email);
      if (!existsUser) {
        const role = await roleService.getRoleByName("USER");
        if (!role) throw CustomError.badErrorRequest(`The role USER does not exists`);
        user = new userModel({
          name: name,
          email: email,
          role: role._id,
          img: img,
          password: "******",
          google: true,
        });
      } else {
        user = existsUser;
        user.google = true;
      }

      // Save and send token
      await user.save();
      const {password, ...restOfUser} = user.toJSON();
      const jwt = new JWT({ jwtSeed: environmentVars.JWT_SEED });
      const token = await jwt.genToken({ _id: `${restOfUser._id}` });
      return {
        token: token,
        user: restOfUser,
      };

    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerErrorRequest(`Sometime went wrong ${error}`);
    }
  }

  public async onSignUp(signUpDto: SignUpDto) {
    const userService = new UserService();
    const newUser = await userService.createUser(signUpDto);
    try {
      const jwt = new JWT({ jwtSeed: environmentVars.JWT_SEED });
      const token = await jwt.genToken({ _id: `${newUser._id}` });
      return {
        token: token,
        user: newUser,
      };
    } catch (error) {
      throw CustomError.internalServerErrorRequest(
        `Sometime went wrong ${error}`
      );
    }
  }

  public async refreshToken(id: string) {
    try {
      const jwt = new JWT({ jwtSeed: environmentVars.JWT_SEED });
      const token = await jwt.genToken({ _id: id });
      return token;
    } catch (error) { 
      throw CustomError.internalServerErrorRequest(`Sometime went wrong ${error}`);
    }
  }
}
