import { NextFunction, Request, Response } from "express";
import { JWT, environmentVars } from "../../config";
import jwt from 'jsonwebtoken';
import { UserService } from "../users/users.service";

export class AuthMiddleware {
 
  public static async validateJWT (req: Request, res: Response, next: NextFunction) {
    const accessToken = req.header('x-access-token');
    if (!accessToken) return res.status(401).json({error: 'Token not provided'});
    
    if (!accessToken.startsWith('Bearer ')) return res.status(401).json({error: 'Invalid Token'});

    const token = accessToken.split(' ').at(1) || '';
    try {
      const userService = new UserService();
      const jwt = new JWT({jwtSeed: environmentVars.JWT_SEED});
      const payload = await jwt.verifyToken<{_id: string}>(token);
      if (!payload) return res.status(401).json('Invalid Token');
      
      const user = await userService.getUser(payload._id);
      if (!user) return res.status(401).json({error: 'Invalid user or token provided'});

      //console.log(user);
      const { password, createdAt, updatedAt, ...restOfUser } = user.toJSON();
      req.body.user = restOfUser;
      next();
    } catch (error) {
      return res.status(401).json({error: `${error}`});
    }
  }
}