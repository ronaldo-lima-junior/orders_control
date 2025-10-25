import { faker } from '@faker-js/faker';
import GenerateBillingInputData from '../dtos/generate/InputData';
import GenerateBillingOutputData from '../dtos/generate/OutputData';
import RegisterCustomerInputData from '../dtos/registerCustomer/InputData';
import IAsaasProvider from '../IAsaasProvider';

export default class AsaasProviderMemory implements IAsaasProvider {
  public async generate(): Promise<GenerateBillingOutputData> {
    const response = new GenerateBillingOutputData({
      asaasId: faker.string.uuid(),
      invoiceUrl: faker.internet.url(),
    });

    return response;
  }

  public async registerCustomer(
    inputData: RegisterCustomerInputData,
  ): Promise<string> {
    return faker.string.uuid();
  }
}
