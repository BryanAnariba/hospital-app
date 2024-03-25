import jwt from 'jsonwebtoken';

interface JWTOptions {
  jwtSeed: string;
}

interface GenTokenOptions {
  _id: string;
}

export class JWT {

  private readonly jwtSeed: string;
  constructor ({jwtSeed}: JWTOptions) {
    this.jwtSeed = jwtSeed;
  }

  public genToken (genTokenOptions: GenTokenOptions) {
    return new Promise((resolve, reject) => {
      jwt.sign(genTokenOptions, this.jwtSeed, {expiresIn: '1h'}, (error, token) => {
        if (error) return reject(`Token error: ${error}`);
        return resolve(token);
      });
    });
  }

  public verifyToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.jwtSeed, (error, decoded) => {
        if (error) reject(error);
        return resolve(decoded as T);
      });
    });
  }

  /*
      public static validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, envs.JWT_SEED, (err, decoded) => {
        if (err) {
          return resolve(null);
        }
        resolve(decoded as T);
      });
    });
  }
  */
}