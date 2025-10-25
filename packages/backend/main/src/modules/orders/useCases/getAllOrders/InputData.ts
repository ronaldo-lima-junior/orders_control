import { EOrderStatus } from '@shared/entities/orders/Orders';

class InputData {
  public readonly filter: {
    description?: string;
    userId?: number;
    status?: EOrderStatus;
  };

  public readonly pagination: {
    page: number;
    rowsPerPage: number;
  };

  constructor({
    description,
    userId,
    status,
    page = '0',
    rowsPerPage = '20',
  }: {
    description?: string;
    userId?: string;
    status?: EOrderStatus;
    page?: string;
    rowsPerPage?: string;
  }) {
    ((this.filter = {
      description,
      userId: Number(userId),
      status,
    }),
      (this.pagination = {
        page: Number(page),
        rowsPerPage: page ? Number(rowsPerPage) : 20,
      }));
  }
}

export default InputData;
