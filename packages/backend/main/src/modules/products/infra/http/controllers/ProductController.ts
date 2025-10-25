import { Request, Response } from 'express';
import CreateProduct, {
  DatabaseFactory as CreateProductDatabaseFactory,
  InputData as CreateProductInputData,
} from '@modules/products/useCases/createProducts';
import DeleteProduct, {
  DatabaseFactory as DeleteProductDatabaseFactory,
  InputData as DeleteProductInputData,
} from '@modules/products/useCases/deleteProducts';
import UpdateProduct, {
  DatabaseFactory as UpdateProductDatabaseFactory,
  InputData as UpdateProductInputData,
} from '@modules/products/useCases/updateProducts';
import GetAllProduct, {
  DatabaseFactory as GetAllProductDatabaseFactory,
  InputData as GetAllProductInputData,
} from '@modules/products/useCases/getAllProducts';
import GetProductDetails, {
  DatabaseFactory as GetProductDetailsDatabaseFactory,
  InputData as GetProductDetailsInputData,
} from '@modules/products/useCases/getProductDetails';
import EHttpCodes from '@shared/core/HttpCodes';

interface ICreateProductRequestBody {
  description: string;
  category: string;
  price: number;
  quantity: number;
}

interface IUpdateProductRequestBody {
  description: string;
  category: string;
  price: number;
  quantity: number;
}

interface IDeleteProductRequestParams extends Record<string, string> {
  id: string;
}

type IUpdateProductParams = IDeleteProductRequestParams;

type IShowProductRequestParams = IDeleteProductRequestParams;

interface IIndexProductRequestParams {
  description?: string;
  category?: string;
  page?: string;
  rows_per_page?: string;
}

interface IIndexProductResponseBody {
  list: {
    id: number;
    description: string;
    category: string;
    price: number;
    quantity: number;
  }[];
  pagination: {
    current: number;
    total: number;
    total_rows: number;
  };
}

interface IShowProductResponseBody {
  id: number;
  description: string;
  category: string;
  price: number;
  quantity: number;
}

class ProductsController {
  public async create(
    request: Request<unknown, unknown, ICreateProductRequestBody>,
    response: Response,
  ): Promise<Response> {
    const databaseFactory = new CreateProductDatabaseFactory();
    const inputData = new CreateProductInputData({
      category: request.body.category,
      description: request.body.description,
      price: request.body.price,
      quantity: request.body.quantity,
    });
    const useCase = new CreateProduct(databaseFactory);
    await useCase.execute(inputData);
    return response.sendStatus(EHttpCodes.Created);
  }

  public async delete(
    request: Request<IDeleteProductRequestParams>,
    response: Response,
  ): Promise<Response> {
    const databaseFactory = new DeleteProductDatabaseFactory();
    const inputData = new DeleteProductInputData({ id: request.params.id });
    const useCase = new DeleteProduct(databaseFactory);
    await useCase.execute(inputData);
    return response.sendStatus(EHttpCodes.Ok);
  }

  public async update(
    request: Request<IUpdateProductParams, unknown, IUpdateProductRequestBody>,
    response: Response,
  ): Promise<Response> {
    const databaseFactory = new UpdateProductDatabaseFactory();
    const inputData = new UpdateProductInputData({
      id: request.params.id,
      category: request.body.category,
      description: request.body.description,
      price: request.body.price,
      quantity: request.body.quantity,
    });
    const useCase = new UpdateProduct(databaseFactory);
    await useCase.execute(inputData);
    return response.sendStatus(EHttpCodes.Ok);
  }

  public async index(
    request: Request<unknown, unknown, unknown, IIndexProductRequestParams>,
    response: Response<IIndexProductResponseBody>,
  ): Promise<Response> {
    const databaseFactory = new GetAllProductDatabaseFactory();
    const inputData = new GetAllProductInputData({
      category: request.query.category,
      description: request.query.description,
      page: request.query.page,
      rowsPerPage: request.query.rows_per_page,
    });
    const useCase = new GetAllProduct(databaseFactory);
    const outputData = await useCase.execute(inputData);
    if (!outputData.list.length) {
      return response.sendStatus(EHttpCodes.NoContent);
    }

    return response.status(EHttpCodes.Ok).json({
      list: outputData.list.map((product) => ({
        id: product.id,
        description: product.description,
        category: product.category,
        price: product.price,
        quantity: product.quantity,
      })),
      pagination: {
        current: outputData.pagination.current,
        total: outputData.pagination.total,
        total_rows: outputData.pagination.totalRows,
      },
    });
  }

  public async show(
    request: Request<IShowProductRequestParams>,
    response: Response<IShowProductResponseBody>,
  ): Promise<Response> {
    const databaseFactory = new GetProductDetailsDatabaseFactory();
    const inputData = new GetProductDetailsInputData({ id: request.params.id });
    const useCase = new GetProductDetails(databaseFactory);
    const outputData = await useCase.execute(inputData);
    return response.status(EHttpCodes.Ok).json({
      id: outputData.id,
      description: outputData.description,
      category: outputData.category,
      price: outputData.price,
      quantity: outputData.quantity,
    });
  }
}

export default new ProductsController();
