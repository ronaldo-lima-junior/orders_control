import { Request, Response } from 'express';

import CreateOrder, {
  DatabaseFactory as CreateOrderDatabaseFactory,
  InputData as CreateOrderInputData,
} from '@modules/orders/useCases/createOrders';
import UpdateOrder, {
  DatabaseFactory as UpdateOrderDatabaseFactory,
  InputData as UpdateOrderInputData,
} from '@modules/orders/useCases/updateOrders';
import GetAllOrders, {
  DatabaseFactory as GetAllOrdersDatabaseFactory,
  InputData as GetAllOrdersInputData,
} from '@modules/orders/useCases/getAllOrders';
import DeleteOrder, {
  DatabaseFactory as DeleteOrderDatabaseFactory,
  InputData as DeleteOrderInputData,
} from '@modules/orders/useCases/deleteOrders';
import GetOrderDetails, {
  DatabaseFactory as GetOrderDetailsDatabaseFactory,
  InputData as GetOrderDetailsInputData,
} from '@modules/orders/useCases/getOrderDetails';
import CreateOrderItem, {
  DatabaseFactory as CreateOrderItemDatabaseFactory,
  InputData as CreateOrderItemInputData,
} from '@modules/orders/useCases/createOrderItems';
import DeleteOrderItem, {
  DatabaseFactory as DeleteOrderItemDatabaseFactory,
  InputData as DeleteOrderItemInputData,
} from '@modules/orders/useCases/deleteOrderItems';
import EHttpCodes from '@shared/core/HttpCodes';
import { EOrderStatus } from '@shared/entities/orders/Orders';

interface ICreateOrderRequestBody {
  description: string;
}

interface IUpdateOrderRequestParams extends Record<string, string> {
  id: string;
}

interface IUpdateOrderRequestBody {
  description: string;
  status: EOrderStatus;
}

interface IIndexOrderRequestParams {
  description?: string;
  userId?: string;
  status?: EOrderStatus;
  page?: string;
  rows_per_page?: string;
}

interface IIndexOrderResponseBody {
  list: {
    id: number;
    description: string;
    status: EOrderStatus;
    registered_at: string;
    user: {
      id: number;
      name: string;
    };
  }[];
  pagination: {
    current: number;
    total: number;
    total_rows: number;
  };
}

type IDeleteOrderRequestParams = IUpdateOrderRequestParams;

type IShowOrderRequestParams = IUpdateOrderRequestParams;

interface IShowOrderResponseBody {
  id: number;
  description: string;
  status: EOrderStatus;
  registered_at: string;
  user: {
    id: number;
    name: string;
  };
  items: {
    id: number;
    product: {
      id: number;
      description: string;
      price: number;
      quantity: number;
    };
  }[];
}

type ICreateOrderItemRequestParams = IUpdateOrderRequestParams;

interface ICreateOrderItemRequestBody {
  product: {
    id: number;
    quantity: number;
    price: number;
  };
}

interface IDeleteOrderItemRequestParams extends IDeleteOrderRequestParams {
  item_id: string;
}

class OrdersController {
  public async create(
    request: Request<unknown, unknown, ICreateOrderRequestBody>,
    response: Response,
  ): Promise<Response> {
    const databaseFactory = new CreateOrderDatabaseFactory();
    const inputData = new CreateOrderInputData({
      description: request.body.description,
      userId: request.user.id,
    });
    const useCase = new CreateOrder(databaseFactory);
    await useCase.execute(inputData);
    return response.sendStatus(EHttpCodes.Created);
  }

  public async createItem(
    request: Request<
      ICreateOrderItemRequestParams,
      unknown,
      ICreateOrderItemRequestBody
    >,
    response: Response,
  ): Promise<Response> {
    const databaseFactory = new CreateOrderItemDatabaseFactory();
    const inputData = new CreateOrderItemInputData({
      orderId: request.params.id,
      product: {
        id: request.body.product.id,
        quantity: request.body.product.quantity,
        price: request.body.product.price,
      },
    });
    const useCase = new CreateOrderItem(databaseFactory);
    await useCase.execute(inputData);
    return response.sendStatus(EHttpCodes.Created);
  }

  public async update(
    request: Request<
      IUpdateOrderRequestParams,
      unknown,
      IUpdateOrderRequestBody
    >,
    response: Response,
  ): Promise<Response> {
    const databaseFactory = new UpdateOrderDatabaseFactory();
    const inputData = new UpdateOrderInputData({
      description: request.body.description,
      id: request.params.id,
      status: request.body.status,
      userId: request.user.id,
    });
    const useCase = new UpdateOrder(databaseFactory);
    await useCase.execute(inputData);
    return response.sendStatus(EHttpCodes.Ok);
  }

  public async index(
    request: Request<unknown, unknown, unknown, IIndexOrderRequestParams>,
    response: Response<IIndexOrderResponseBody>,
  ): Promise<Response> {
    const databaseFactory = new GetAllOrdersDatabaseFactory();
    const inputData = new GetAllOrdersInputData({
      description: request.query.description,
      userId: request.query.userId,
      status: request.query.status,
      page: request.query.page,
      rowsPerPage: request.query.rows_per_page,
    });
    const useCase = new GetAllOrders(databaseFactory);
    const outputData = await useCase.execute(inputData);
    if (!outputData.list.length) {
      return response.sendStatus(EHttpCodes.NoContent);
    }

    return response.status(EHttpCodes.Ok).json({
      list: outputData.list.map((order) => ({
        id: order.id,
        description: order.description,
        status: order.status,
        registered_at: order.registeredAt,
        user: {
          id: order.user.id,
          name: order.user.name,
        },
      })),
      pagination: {
        current: outputData.pagination.current,
        total: outputData.pagination.total,
        total_rows: outputData.pagination.totalRows,
      },
    });
  }

  public async delete(
    request: Request<IDeleteOrderRequestParams>,
    response: Response,
  ): Promise<Response> {
    const databaseFactory = new DeleteOrderDatabaseFactory();
    const inputData = new DeleteOrderInputData({ id: request.params.id });
    const useCase = new DeleteOrder(databaseFactory);
    await useCase.execute(inputData);
    return response.sendStatus(EHttpCodes.Ok);
  }

  public async show(
    request: Request<IShowOrderRequestParams>,
    response: Response<IShowOrderResponseBody>,
  ): Promise<Response> {
    const databaseFactory = new GetOrderDetailsDatabaseFactory();
    const inputData = new GetOrderDetailsInputData({ id: request.params.id });
    const useCase = new GetOrderDetails(databaseFactory);
    const outputData = await useCase.execute(inputData);
    return response.status(EHttpCodes.Ok).json({
      id: outputData.id,
      description: outputData.description,
      status: outputData.status,
      registered_at: outputData.registeredAt,
      user: outputData.user,
      items: outputData.items,
    });
  }

  public async deleteOrderItem(
    request: Request<IDeleteOrderItemRequestParams>,
    response: Response,
  ): Promise<Response> {
    const databaseFactory = new DeleteOrderItemDatabaseFactory();
    const inputData = new DeleteOrderItemInputData({
      itemId: request.params.item_id,
      orderId: request.params.id,
    });
    const useCase = new DeleteOrderItem(databaseFactory);
    await useCase.execute(inputData);
    return response.sendStatus(EHttpCodes.Ok);
  }
}

export default new OrdersController();
