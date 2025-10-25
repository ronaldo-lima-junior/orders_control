import EErrorType from '@shared/core/ErrorsType';
import EHttpCodes from '@shared/core/HttpCodes';

class CustomError {
  public readonly message: string;
  public readonly errorType: EErrorType;
  public readonly statusCode: number;

  constructor({
    message,
    errorType,
  }: {
    message: string;
    errorType: EErrorType;
  }) {
    this.message = message;
    this.errorType = errorType;
    switch (errorType) {
      case EErrorType.Authenticate:
        this.statusCode = EHttpCodes.Unauthorized;
        break;

      case EErrorType.Conflict:
        this.statusCode = EHttpCodes.Conflict;
        break;

      case EErrorType.Forbidden:
        this.statusCode = EHttpCodes.Forbidden;
        break;

      case EErrorType.Database:
        this.statusCode = EHttpCodes.InternalServerError;
        break;

      case EErrorType.ThirdParty:
        this.statusCode = EHttpCodes.BadRequest;
        break;
      default:
        this.statusCode = EHttpCodes.InternalServerError;
        break;
    }
  }
}

export default CustomError;
