import CountProductsInputData from './dtos/count/InputData';
import CreateProductInputData from './dtos/create/InputData';
import FindProductByIdOutputData from './dtos/findById/OutputData';
import GetAllProductsInputData from './dtos/getAll/InputData';
import GetAllProductsOutputData from './dtos/getAll/OutputData';
import UpdateProductInputData from './dtos/update/InputData';

interface IProductRepository {
  create(inputData: CreateProductInputData): Promise<void>;
  findById(id: number): Promise<FindProductByIdOutputData | undefined>;
  delete(id: number): Promise<void>;
  update(inputData: UpdateProductInputData): Promise<void>;
  getAll(inputData: GetAllProductsInputData): Promise<GetAllProductsOutputData>;
  count(inputData: CountProductsInputData): Promise<number>;
}

export default IProductRepository;
