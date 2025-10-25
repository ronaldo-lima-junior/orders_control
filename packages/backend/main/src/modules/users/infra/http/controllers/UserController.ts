import CreateUser, {
  DatabaseFactory as CreateUserDatabaseFactory,
  InputData as CreateUserInputData,
} from '@modules/users/useCases/createUsers';
import EHttpCodes from '@shared/core/HttpCodes';
import { Request, Response } from 'express';

interface ICreateUserRequestBody {
  name: string;
  email: string;
  password: string;
  document: string;
}

class UsersController {
  public async create(
    request: Request<unknown, unknown, ICreateUserRequestBody>,
    response: Response,
  ): Promise<Response> {
    const databaseFactory = new CreateUserDatabaseFactory();
    const inputData = new CreateUserInputData({
      email: request.body.email,
      name: request.body.name,
      password: request.body.password,
      document: request.body.document,
    });
    const useCase = new CreateUser(databaseFactory);
    await useCase.execute(inputData);
    return response.sendStatus(EHttpCodes.Created);
  }
}

export default new UsersController();
