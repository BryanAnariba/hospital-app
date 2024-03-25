export class CustomError extends Error {

  constructor(
    public readonly statusCode: number, 
    public readonly message: string,
  ) {
    super(message);
  }

  public static badErrorRequest(message: string): CustomError {
    return new CustomError(400, message);
  }

  public static unauthorizedErrorRequest(message: string): CustomError {
    return new CustomError(401, message);
  }

  public static notFoundErrorRequest(message: string): CustomError {
    return new CustomError(404, message);
  }

  public static internalServerErrorRequest(message: string): CustomError {
    return new CustomError(500, message);
  }

  public static notImplementedErrorRequest(message: string): CustomError {
    return new CustomError(501, message);
  }
}
