import databaseAdapter from '@shared/adapters/database';
import EErrorType from '@shared/core/ErrorsType';
import EHttpCodes from '@shared/core/HttpCodes';
import IResponseError from '@shared/core/ResponseError';
import CustomError from '@shared/errors/Errors';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

interface IValidationErrors {
  field?: string;
  message: string;
}

class ErrorHandler {
  public async execute(
    err: Error,
    request: Request,
    response: Response<IResponseError | IValidationErrors[]>,
    _: NextFunction,
  ): Promise<Response | undefined> {
    await databaseAdapter.rollbackTransaction();

    if (err instanceof z.ZodError) {
      const validationsErrors: IValidationErrors[] = [];
      for (const error of err.issues) {
        if (!error.path.length) {
          break;
        }
        const key = error.path.join('.');
        validationsErrors.push({
          field: key,
          message: error.message,
        });
      }
      return response
        .status(EHttpCodes.UnprocessableEntity)
        .json(validationsErrors);
    }

    console.log(JSON.stringify(err));
    if (err instanceof CustomError) {
      switch (err.errorType) {
        case EErrorType.Authenticate:
        case EErrorType.Conflict:
        case EErrorType.Forbidden:
        case EErrorType.ThirdParty:
          return response.status(err.statusCode).json({
            error: {
              message: err.message,
            },
          });

        default:
          return response.status(EHttpCodes.InternalServerError).json({
            error: {
              message: 'Erro interno no servidor',
              err: err.message,
            },
          });
      }
    }
  }
}

export default ErrorHandler;
