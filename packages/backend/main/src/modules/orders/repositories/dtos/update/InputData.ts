import { EOrderStatus } from '@shared/entities/orders/Orders';

class UpdateOrderInputData {
  public readonly description: string;

  public readonly id: number;

  public readonly status: EOrderStatus;

  constructor({
    description,
    id,
    status,
  }: {
    description: string;
    id: number;
    status: EOrderStatus;
  }) {
    this.description = description;
    this.id = id;
    this.status = status;
  }
}

export default UpdateOrderInputData;
