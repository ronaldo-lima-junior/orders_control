import { EOrderStatus } from '@shared/entities/orders/Orders';

class CountOrdersInputData {
  public readonly description?: string;

  public readonly userId?: number;

  public readonly status?: EOrderStatus;

  constructor({
    description,
    userId,
    status,
  }: {
    description?: string;
    userId?: number;
    status?: EOrderStatus;
  }) {
    this.description = description;
    this.userId = userId;
    this.status = status;
  }
}

export default CountOrdersInputData;
