import { EAsaasEvents } from '@shared/entities/orders/Orders';

class InputData {
  public readonly paymentId: string;

  public readonly event: EAsaasEvents;

  constructor({
    paymentId,
    event,
  }: {
    paymentId: string;
    event: EAsaasEvents;
  }) {
    this.paymentId = paymentId;
    this.event = event;
  }
}

export default InputData;
