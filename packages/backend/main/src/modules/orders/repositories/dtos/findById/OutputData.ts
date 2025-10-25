import { EOrderStatus } from '@shared/entities/orders/Orders';

class FindOrderByIdOutputData {
  public readonly id: number;

  public readonly description: string;

  public readonly user: {
    id: number;
    name: string;
  };

  public readonly status: EOrderStatus;

  public readonly registeredAt: string;

  public readonly items: {
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
    user,
    status,
    registeredAt,
    items,
  }: {
    id: number;
    description: string;
    user: {
      id: number;
      name: string;
    };
    status: EOrderStatus;
    registeredAt: string;
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
    this.user = user;
    this.status = status;
    this.registeredAt = registeredAt;
    this.items = items;
  }
}

export default FindOrderByIdOutputData;
