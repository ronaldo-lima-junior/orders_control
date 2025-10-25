import CreateSession from '@modules/sessions/useCases/createSession';
import {
  InputData as CreateSessionInputData,
  DatabaseFactory,
} from '@modules/sessions/useCases/createSession';
import EHttpCodes from '@shared/core/HttpCodes';
import { Request, Response } from 'express';

interface ICreateRequestBody {
  email: string;
  password: string;
}

interface ICreateResponse {
  token: string;
}

class SessionsController {
  public async create(
    request: Request<unknown, unknown, ICreateRequestBody>,
    response: Response<ICreateResponse>,
  ): Promise<Response> {
    const databaseFactory = new DatabaseFactory();
    const useCase = new CreateSession(databaseFactory);
    const inputData = new CreateSessionInputData({
      email: request.body.email,
      password: request.body.password,
    });
    const outputData = await useCase.execute(inputData);
    return response.status(EHttpCodes.Created).json({
      token: outputData.token,
    });
  }
}

export default new SessionsController();
