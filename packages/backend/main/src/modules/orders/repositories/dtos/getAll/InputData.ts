import { EOrderStatus } from '@shared/entities/orders/Orders';

class GetAllOrdersInputData {
  public readonly description?: string;

  public readonly userId?: number;

  public readonly status?: EOrderStatus;

  public readonly page?: number;

  public readonly rowsPerPage?: number;

  constructor({
    description,
    userId,
    status,
    page,
    rowsPerPage,
  }: {
    description?: string;
    userId?: number;
    status?: EOrderStatus;
    page?: number;
    rowsPerPage?: number;
  }) {
    this.description = description;
    this.userId = userId;
    this.status = status;
    this.page = page;
    this.rowsPerPage = rowsPerPage;
  }
}

export default GetAllOrdersInputData;
