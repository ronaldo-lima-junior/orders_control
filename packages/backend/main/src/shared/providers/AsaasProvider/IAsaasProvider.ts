import GenerateBillingInputData from './dtos/generate/InputData';
import GenerateBillingOutputData from './dtos/generate/OutputData';
import RegisterCustomerInputData from './dtos/registerCustomer/InputData';

interface IAsaasProvider {
  generate(
    inputData: GenerateBillingInputData,
  ): Promise<GenerateBillingOutputData>;
  registerCustomer(inputData: RegisterCustomerInputData): Promise<string>;
}

export default IAsaasProvider;
