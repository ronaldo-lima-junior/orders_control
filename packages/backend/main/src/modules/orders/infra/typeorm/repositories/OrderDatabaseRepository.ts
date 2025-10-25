import CountOrdersInputData from '@modules/orders/repositories/dtos/count/InputData';
import CreateOrderInputData from '@modules/orders/repositories/dtos/create/InputData';
import CreateOrderItemInputData from '@modules/orders/repositories/dtos/createOrderItems/InputData';
import DeleteOrderItemInputData from '@modules/orders/repositories/dtos/deleteOrderItems/InputData';
import FindOrderByIdOutputData from '@modules/orders/repositories/dtos/findById/OutputData';
import GetAllOrdersInputData from '@modules/orders/repositories/dtos/getAll/InputData';
import GetAllOrdersOutputData from '@modules/orders/repositories/dtos/getAll/OutputData';
import UpdateOrderInputData from '@modules/orders/repositories/dtos/update/InputData';
import IOrderRepository from '@modules/orders/repositories/IOrderRepository';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import OrderMapper from '../mappers/OrderMapper';
import OrderItemMapper from '../mappers/OrderItemMapper';
import ProductMapper from '@modules/products/infra/typeorm/mappers/ProductMapper';
import databaseAdapter from '@shared/adapters/database';
import { CaughtError } from '@shared/helpers/CaughtError';
import CustomError from '@shared/errors/Errors';
import EErrorType from '@shared/core/ErrorsType';
import { EOrderStatus } from '@shared/entities/orders/Orders';
import UpdateOrderAsaasIdInputData from '@modules/orders/repositories/dtos/updateOrderAsaasId/InputData';
import FindOrderByPaymentIdOutputData from '@modules/orders/repositories/dtos/findByPaymentId/OutputData';

class OrderDatabaseRepository implements IOrderRepository {
  private readonly orderRepository: Repository<OrderMapper>;

  private readonly orderItemRepository: Repository<OrderItemMapper>;

  private readonly productRepository: Repository<ProductMapper>;

  constructor() {
    const queryRunner = databaseAdapter.getQueryRunner();
    this.orderRepository = queryRunner.manager.getRepository(OrderMapper);
    this.orderItemRepository =
      queryRunner.manager.getRepository(OrderItemMapper);
    this.productRepository = queryRunner.manager.getRepository(ProductMapper);
  }

  public async count(inputData: CountOrdersInputData): Promise<number> {
    try {
      const where: FindOptionsWhere<OrderMapper> = {};
      if (inputData.description) {
        where.description = ILike(`%${inputData.description}%`);
      }

      if (inputData.userId) {
        where.userId = inputData.userId;
      }

      if (inputData.status) {
        where.status = inputData.status;
      }

      return await this.orderRepository.count({
        where,
      });
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.Database,
      });
    }
  }

  public async create(inputData: CreateOrderInputData): Promise<void> {
    try {
      const order = this.orderRepository.create({
        description: inputData.description,
        userId: inputData.userId,
        status: EOrderStatus.open,
      });

      await this.orderRepository.save(order);
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.Database,
      });
    }
  }

  public async createOrderItem(
    inputData: CreateOrderItemInputData,
  ): Promise<void> {
    try {
      const orderItem = this.orderItemRepository.create({
        orderId: inputData.orderId,
        productId: inputData.product.id,
        productPrice: inputData.product.price,
        productQuantity: inputData.product.quantity,
      });

      await this.orderItemRepository.save(orderItem);
      await this.productRepository.decrement(
        { id: inputData.product.id },
        'quantity',
        inputData.product.quantity,
      );
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.Database,
      });
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await this.orderRepository.softDelete({ id });
      await this.orderRepository.update(
        { id },
        { status: EOrderStatus.canceled },
      );
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.Database,
      });
    }
  }

  public async deleteOrderItem(
    inputData: DeleteOrderItemInputData,
  ): Promise<void> {
    try {
      await this.orderItemRepository.softDelete({
        id: inputData.itemId,
      });

      await this.productRepository.increment(
        { id: inputData.productId },
        'quantity',
        inputData.quantity,
      );
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.Database,
      });
    }
  }

  public async findById(
    id: number,
  ): Promise<FindOrderByIdOutputData | undefined> {
    try {
      const order = await this.orderRepository.findOne({
        where: { id },
        relations: { user: true, orderItems: { product: true } },
      });
      if (!order) {
        return undefined;
      }
      const response = new FindOrderByIdOutputData({
        description: order.description,
        id: order.id,
        registeredAt: order.registeredAt,
        status: order.status,
        user: {
          id: order.user.id,
          name: order.user.name,
        },
        items: order.orderItems.map((orderItem) => ({
          id: orderItem.id,
          product: {
            id: orderItem.productId,
            description: orderItem.product.description,
            price: orderItem.productPrice,
            quantity: orderItem.productQuantity,
          },
        })),
      });

      return response;
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.Database,
      });
    }
  }

  public async getAll(
    inputData: GetAllOrdersInputData,
  ): Promise<GetAllOrdersOutputData> {
    try {
      const skip =
        inputData.page && inputData.rowsPerPage
          ? (inputData.page - 1) * inputData.rowsPerPage
          : 0;
      const take = inputData.rowsPerPage || 0;
      const where: FindOptionsWhere<OrderMapper> = {};
      if (inputData.description) {
        where.description = ILike(`%${inputData.description}%`);
      }

      if (inputData.userId) {
        where.userId = inputData.userId;
      }

      if (inputData.status) {
        where.status = inputData.status;
      }

      const orders = await this.orderRepository.find({
        where,
        skip: !skip ? undefined : skip,
        take: !take ? undefined : take,
        order: {
          registeredAt: 'desc',
        },
        relations: { user: true },
      });

      const response = new GetAllOrdersOutputData({
        list: orders.map((order) => ({
          description: order.description,
          id: order.id,
          registeredAt: order.registeredAt,
          status: order.status,
          user: {
            id: order.user.id,
            name: order.user.name,
          },
        })),
      });

      return response;
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.Database,
      });
    }
  }

  public async update(inputData: UpdateOrderInputData): Promise<void> {
    try {
      await this.orderRepository.update(
        { id: inputData.id },
        {
          description: inputData.description,
          status: inputData.status,
        },
      );
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.Database,
      });
    }
  }

  public async updateAsaasId(
    inputData: UpdateOrderAsaasIdInputData,
  ): Promise<void> {
    try {
      await this.orderRepository.update(
        { id: inputData.id },
        {
          asaasId: inputData.asaasId,
          asaasUrl: inputData.asaasUrl,
        },
      );
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.Database,
      });
    }
  }

  public async findByPaymentId(
    paymentId: string,
  ): Promise<FindOrderByPaymentIdOutputData | undefined> {
    try {
      const order = await this.orderRepository.findOneBy({
        asaasId: paymentId,
      });
      if (!order) {
        return undefined;
      }

      const response = new FindOrderByPaymentIdOutputData({
        id: order.id,
        description: order.description,
      });

      return response;
    } catch (err) {
      throw new CustomError({
        message: CaughtError(err),
        errorType: EErrorType.Database,
      });
    }
  }
}

export default OrderDatabaseRepository;
