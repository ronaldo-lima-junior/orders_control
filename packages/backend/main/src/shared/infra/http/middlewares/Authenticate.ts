import EErrorType from '@shared/core/ErrorsType';
import CustomError from '@shared/errors/Errors';
import { NextFunction, Request, Response } from 'express';
import JsonWebTokenProvider from '@shared/providers/JsonWebToken/implementations';

class Authenticate {
  public execute(request: Request, _: Response, next: NextFunction): void {
    try {
      if (
        !request.headers.authorization ||
        !request.headers.authorization.startsWith('Bearer ')
      ) {
        throw new CustomError({
          message: 'Autenticação inválida',
          errorType: EErrorType.Authenticate,
        });
      }

      const jwtToken = request.headers.authorization.substring(7);
      if (!jwtToken) {
        throw new CustomError({
          message: 'Token inválido',
          errorType: EErrorType.Authenticate,
        });
      }

      const jwtProvider = new JsonWebTokenProvider();
      const tokenDecoded = jwtProvider.decode(jwtToken);
      request.user = {
        id: tokenDecoded.userId,
        name: tokenDecoded.userName,
      };

      next();
    } catch {
      throw new CustomError({
        message: 'Autenticação inválida',
        errorType: EErrorType.Authenticate,
      });
    }
  }
}

export default Authenticate;
