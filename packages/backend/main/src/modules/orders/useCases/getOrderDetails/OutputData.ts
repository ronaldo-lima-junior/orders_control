import { EOrderStatus } from '@shared/entities/orders/Orders';

class OutputData {
  id: number;
  description: string;
  status: EOrderStatus;
  registeredAt: string;
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

  constructor({
    id,
    description,
    status,
    registeredAt,
    user,
    items,
  }: {
    id: number;
    description: string;
    status: EOrderStatus;
    registeredAt: string;
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
  }) {
    this.id = id;
    this.description = description;
    this.status = status;
    this.registeredAt = registeredAt;
    this.user = user;
    this.items = items;
  }
}

export default OutputData;
