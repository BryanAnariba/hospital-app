import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { SignInDto, SignUpDto } from "../../domain/dto";
import { CustomError } from "../../domain/error/custom.error";
import { isValidObjectId } from "mongoose";
import { verifyGoogleSignIn } from "../../config";

export class AuthController {

  constructor (
    private readonly authService: AuthService
  ) {}

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) return res.status(error.statusCode).json({error: error.message});
    return res.status(500).json({error: error});
  }

  public signIn = (req: Request, res: Response) => {
    
    const [error, signInDto] = SignInDto.getObjectFromJson(req.body);
    if (error) return res.status(400).json({error: error});

    this.authService.onSignIn(signInDto!)
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(error => {
        this.handleError(error, res);
      });

  }

  public signUp = (req: Request, res: Response) => {
    const [error, signUpDto] = SignUpDto.getObjectFromJson(req.body);
    if (error) return res.status(400).json({error: error});

    const isValidRoleId = isValidObjectId(signUpDto?.role);
    if (!isValidRoleId) return res.status(400).json({error: 'Invalid role code'});

    this.authService.onSignUp(signUpDto!)
      .then(data => {
        return res.status(201).json(data);
      })
      .catch(error => {
        this.handleError(error, res);
      })
  }

  public googleSignIn = (req: Request, res: Response) => { 
    if (!req.body.token) return res.status(401).json({error: 'Token not provided'});

    verifyGoogleSignIn(req.body.token)
      .then(payload => {
        const {email, name, picture} = payload;
        this.authService.saveGoogleSignIn(email, name, picture)
          .then(data => {
            return res.status(201).json(data);
          })
          .catch(error => {
            this.handleError(error, res);
          });
      })
      .catch(error => {
        return res.status(400).json({error: error});
      });
  }

  public verifyAndRefreshToken = (req: Request, res: Response) => { 
    const {user} = req.body;
    if (!user) return res.status(401).json({error: 'Invalid Authentication'});

    this.authService.refreshToken(user._id)
      .then(data => {
        return res.status(200).json({
          token: data,
          user: user,
        });
      })
      .catch(error => {
        this.handleError(error, res);
      })
  }
}