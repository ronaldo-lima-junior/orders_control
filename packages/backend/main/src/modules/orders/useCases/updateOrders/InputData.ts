import { EOrderStatus } from '@shared/entities/orders/Orders';

class InputData {
  public readonly id: number;

  public readonly description: string;

  public readonly status: EOrderStatus;

  public readonly userId: number;

  constructor({
    id,
    description,
    status,
    userId,
  }: {
    id: string;
    description: string;
    status: EOrderStatus;
    userId: number;
  }) {
    this.id = Number(id);
    this.description = description;
    this.status = status;
    this.userId = userId;
  }
}

export default InputData;
