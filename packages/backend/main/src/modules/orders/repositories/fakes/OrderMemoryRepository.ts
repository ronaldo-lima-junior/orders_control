import CustomError from '@shared/errors/Errors';
import CountOrdersInputData from '../dtos/count/InputData';
import CreateOrderInputData from '../dtos/create/InputData';
import CreateOrderItemInputData from '../dtos/createOrderItems/InputData';
import DeleteOrderItemInputData from '../dtos/deleteOrderItems/InputData';
import FindOrderByIdOutputData from '../dtos/findById/OutputData';
import FindOrderByPaymentIdOutputData from '../dtos/findByPaymentId/OutputData';
import GetAllOrdersInputData from '../dtos/getAll/InputData';
import GetAllOrdersOutputData from '../dtos/getAll/OutputData';
import UpdateOrderInputData from '../dtos/update/InputData';
import UpdateOrderAsaasIdInputData from '../dtos/updateOrderAsaasId/InputData';
import IOrderRepository from '../IOrderRepository';
import { CaughtError } from '@shared/helpers/CaughtError';
import EErrorType from '@shared/core/ErrorsType';
import Order from '@shared/entities/orders/Orders';
import { faker } from '@faker-js/faker';

class OrderMemoryRespository implements IOrderRepository {
  private readonly orders: Order[];

  constructor({ orders }: { orders: Order[] }) {
    this.orders = orders;
  }

  public async count(inputData: CountOrdersInputData): Promise<number> {
    try {
      let orders = this.orders;
      if (inputData.description) {
        orders = orders.filter(
          (orders) =>
            orders.getData().description.toUpperCase() ===
            inputData.description?.toUpperCase(),
        );
      }

      if (inputData.status) {
        orders = orders.filter(
          (orders) =>
            orders.getData().status === inputData.status?.toUpperCase(),
        );
      }

      if (inputData.userId) {
        orders = orders.filter(
          (orders) => orders.getData().user.id === inputData.userId,
        );
      }

      return orders.length;
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.FakeError,
      });
    }
  }

  public async create(inputData: CreateOrderInputData): Promise<void> {
    try {
      const order = Order.createRandom({
        description: inputData.description,
        user: {
          id: inputData.userId,
          name: '',
        },
      });

      this.orders.push(order);
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.FakeError,
      });
    }
  }

  public async createOrderItem(
    inputData: CreateOrderItemInputData,
  ): Promise<void> {
    try {
      const orderItem = Order.createRandom({
        items: [
          {
            id: faker.number.int(),
            orderId: inputData.orderId,
            productId: inputData.product.id,
            productPrice: inputData.product.price,
            productQuantity: inputData.product.quantity,
            deletedAt: null,
          },
        ],
      });

      this.orders.push(orderItem);
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.FakeError,
      });
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      const order = this.orders.find((order) => order.getData().id === id);
      if (order) {
        order.update({ deletedAt: new Date() });
      }
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.FakeError,
      });
    }
  }

  public async deleteOrderItem(
    inputData: DeleteOrderItemInputData,
  ): Promise<void> {
    try {
      const order = this.orders.find((order) =>
        order.getData().items.map((item) => {
          if (item.id === inputData.itemId) {
            item.deletedAt = new Date();
          }
        }),
      );

      if (order) {
        order.update({ items: order.getData().items });
      }
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.FakeError,
      });
    }
  }

  public async findById(
    id: number,
  ): Promise<FindOrderByIdOutputData | undefined> {
    try {
      const order = this.orders.find((order) => order.getData().id === id);
      if (!order) {
        return undefined;
      }

      const response = new FindOrderByIdOutputData({
        description: order.getData().description,
        id: order.getData().id,
        registeredAt: order.getData().registeredAt,
        status: order.getData().status,
        user: order.getData().user,
        items: [],
      });

      return response;
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.FakeError,
      });
    }
  }

  public async findByPaymentId(
    paymentId: string,
  ): Promise<FindOrderByPaymentIdOutputData | undefined> {
    try {
      const order = this.orders.find(
        (order) => order.getData().asaasId === paymentId,
      );
      if (!order) {
        return undefined;
      }

      const response = new FindOrderByPaymentIdOutputData({
        description: order.getData().description,
        id: order.getData().id,
      });

      return response;
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.FakeError,
      });
    }
  }

  public async getAll(
    inputData: GetAllOrdersInputData,
  ): Promise<GetAllOrdersOutputData> {
    try {
      let orders = this.orders;
      if (inputData.description) {
        orders = orders.filter(
          (order) =>
            order.getData().description.toUpperCase() ===
            inputData.description?.toUpperCase(),
        );
      }

      if (inputData.status) {
        orders = orders.filter(
          (order) =>
            order.getData().status.toUpperCase() ===
            inputData.status?.toUpperCase(),
        );
      }

      if (inputData.userId) {
        orders = orders.filter(
          (order) => order.getData().user.id === inputData.userId,
        );
      }

      const response = new GetAllOrdersOutputData({
        list: orders.map((order) => ({
          id: order.getData().id,
          description: order.getData().description,
          status: order.getData().status,
          user: {
            id: order.getData().user.id,
            name: order.getData().user.name,
          },
          registeredAt: order.getData().registeredAt,
        })),
      });

      return response;
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.FakeError,
      });
    }
  }

  public async update(inputData: UpdateOrderInputData): Promise<void> {
    try {
      const order = this.orders.find(
        (order) => order.getData().id === inputData.id,
      );
      if (order) {
        order.update({
          description: inputData.description,
          status: inputData.status,
        });
      }
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.FakeError,
      });
    }
  }

  public async updateAsaasId(
    inputData: UpdateOrderAsaasIdInputData,
  ): Promise<void> {
    try {
      const order = this.orders.find(
        (order) => order.getData().id === inputData.id,
      );
      if (order) {
        order.update({
          asaasId: inputData.asaasId,
          asaasUrl: inputData.asaasUrl,
        });
      }
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.FakeError,
      });
    }
  }
}

export default OrderMemoryRespository;
