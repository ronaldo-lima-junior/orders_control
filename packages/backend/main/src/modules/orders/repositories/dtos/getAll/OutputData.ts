import { EOrderStatus } from '@shared/entities/orders/Orders';

class GetAllOrdersOutputData {
  public readonly list: {
    id: number;
    description: string;
    status: EOrderStatus;
    user: {
      id: number;
      name: string;
    };
    registeredAt: string;
  }[];

  constructor({
    list,
  }: {
    list: {
      id: number;
      description: string;
      status: EOrderStatus;
      user: {
        id: number;
        name: string;
      };
      registeredAt: string;
    }[];
  }) {
    this.list = list;
  }
}

export default GetAllOrdersOutputData;
