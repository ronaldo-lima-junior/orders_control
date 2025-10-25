import CountOrdersInputData from './dtos/count/InputData';
import CreateOrderInputData from './dtos/create/InputData';
import CreateOrderItemInputData from './dtos/createOrderItems/InputData';
import DeleteOrderItemInputData from './dtos/deleteOrderItems/InputData';
import FindOrderByIdOutputData from './dtos/findById/OutputData';
import FindOrderByPaymentIdOutputData from './dtos/findByPaymentId/OutputData';
import GetAllOrdersInputData from './dtos/getAll/InputData';
import GetAllOrdersOutputData from './dtos/getAll/OutputData';
import UpdateOrderInputData from './dtos/update/InputData';
import UpdateOrderAsaasIdInputData from './dtos/updateOrderAsaasId/InputData';

interface IOrderRepository {
  create(inputData: CreateOrderInputData): Promise<void>;
  createOrderItem(inputData: CreateOrderItemInputData): Promise<void>;
  findById(id: number): Promise<FindOrderByIdOutputData | undefined>;
  deleteOrderItem(inputData: DeleteOrderItemInputData): Promise<void>;
  delete(id: number): Promise<void>;
  getAll(inputData: GetAllOrdersInputData): Promise<GetAllOrdersOutputData>;
  update(inputData: UpdateOrderInputData): Promise<void>;
  count(inputData: CountOrdersInputData): Promise<number>;
  updateAsaasId(inputData: UpdateOrderAsaasIdInputData): Promise<void>;
  findByPaymentId(
    paymentId: string,
  ): Promise<FindOrderByPaymentIdOutputData | undefined>;
}

export default IOrderRepository;
