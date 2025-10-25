import CreateUserInputData from './dtos/create/InputData';
import FindUserByDocumentOutputData from './dtos/findByDocument/OutputData';
import FindUserByEmailOutputData from './dtos/findByEmail/OutputData';
import FindUserByIdOutputData from './dtos/findById/OutputData';
import UpdateUserAsaasIdInputData from './dtos/update/InputData';

interface IUserRepository {
  create(inputData: CreateUserInputData): Promise<void>;
  findByEmail(email: string): Promise<FindUserByEmailOutputData | undefined>;
  findById(id: number): Promise<FindUserByIdOutputData | undefined>;
  findByDocument(
    document: string,
  ): Promise<FindUserByDocumentOutputData | undefined>;
  updateAsaasId(inputData: UpdateUserAsaasIdInputData): Promise<void>;
}

export default IUserRepository;
