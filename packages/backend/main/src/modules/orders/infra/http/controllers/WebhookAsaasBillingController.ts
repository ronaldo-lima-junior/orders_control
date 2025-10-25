import EHttpCodes from '@shared/core/HttpCodes';
import { EAsaasEvents } from '@shared/entities/orders/Orders';
import { Request, Response } from 'express';
import WebHookAsaas, {
  DatabaseFactory,
  InputData,
} from '@modules/orders/useCases/webhookAsaas';

interface IUpdateRequestBody {
  id: string;
  event: EAsaasEvents;
  dateCreated: string;
  payment: {
    object: string;
    id: string;
  };
}

class WebhookAsaasBillingController {
  public async update(
    request: Request<unknown, unknown, IUpdateRequestBody>,
    response: Response,
  ): Promise<Response> {
    const databaseFactory = new DatabaseFactory();
    const inputData = new InputData({
      event: request.body.event,
      paymentId: request.body.payment.id,
    });
    const useCase = new WebHookAsaas(databaseFactory);
    await useCase.execute(inputData);
    return response.sendStatus(EHttpCodes.Ok);
  }
}

export default new WebhookAsaasBillingController();
