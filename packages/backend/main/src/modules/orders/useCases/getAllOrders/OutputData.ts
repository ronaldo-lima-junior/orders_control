import { EOrderStatus } from '@shared/entities/orders/Orders';

class OutputData {
  public readonly list: {
    id: number;
    description: string;
    status: EOrderStatus;
    registeredAt: string;
    user: {
      id: number;
      name: string;
    };
  }[];

  public readonly pagination: {
    current: number;
    total: number;
    totalRows: number;
  };

  constructor({
    list,
    pagination,
  }: {
    list: {
      id: number;
      description: string;
      status: EOrderStatus;
      registeredAt: string;
      user: {
        id: number;
        name: string;
      };
    }[];
    pagination: {
      current: number;
      total: number;
      totalRows: number;
    };
  }) {
    this.list = list;
    this.pagination = pagination;
  }
}

export default OutputData;
