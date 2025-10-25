import axios, { AxiosInstance, AxiosResponse } from 'axios';
import GenerateBillingInputData from './dtos/generate/InputData';
import GenerateBillingOutputData from './dtos/generate/OutputData';
import IAsaasProvider from './IAsaasProvider';
import asaasConfig from '@config/asaas';
import RegisterCustomerInputData from './dtos/registerCustomer/InputData';
import CustomError from '@shared/errors/Errors';
import EErrorType from '@shared/core/ErrorsType';
import { addDays, format } from 'date-fns';
import { CaughtError } from '@shared/helpers/CaughtError';

interface IRegisterCustomerRequestBody {
  name: string;
  cpfCnpj: string;
}

interface IGenerateBillingRequestBody {
  customer: string;
  billingType: string;
  value: number;
  dueDate: string;
}

interface IRegisterCustomerResponseBody {
  id: string;
}

interface IGenerateBillingResponseBody {
  id: string;
  invoiceUrl: string;
}

class AsaasProvider implements IAsaasProvider {
  private readonly httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: asaasConfig.urlBase,
    });
  }

  public async generate(
    inputData: GenerateBillingInputData,
  ): Promise<GenerateBillingOutputData> {
    try {
      const body: IGenerateBillingRequestBody = {
        billingType: 'UNDEFINED',
        customer: inputData.customer,
        dueDate: format(addDays(new Date(), 3), 'yyyy-MM-dd'),
        value: inputData.value,
      };

      const response: AxiosResponse<IGenerateBillingResponseBody> =
        await this.httpClient.post('/payments', body, {
          headers: {
            access_token: asaasConfig.accessToken,
          },
        });

      const outputData = new GenerateBillingOutputData({
        asaasId: response.data.id,
        invoiceUrl: response.data.invoiceUrl,
      });

      return outputData;
    } catch (err) {
      throw new CustomError({
        message: `Erro ao registrar cobrança na plataforma Asaas: ${CaughtError(err)}`,
        errorType: EErrorType.ThirdParty,
      });
    }
  }

  public async registerCustomer(
    inputData: RegisterCustomerInputData,
  ): Promise<string> {
    try {
      const body: IRegisterCustomerRequestBody = {
        cpfCnpj: inputData.cpfCnpj,
        name: inputData.name,
      };

      const response: AxiosResponse<IRegisterCustomerResponseBody> =
        await this.httpClient.post('/customers', body, {
          headers: {
            access_token: asaasConfig.accessToken,
          },
        });

      return response.data.id;
    } catch (err) {
      throw new CustomError({
        message: `Erro ao registrar usuário na plataforma Asaas: ${CaughtError(err)}`,
        errorType: EErrorType.ThirdParty,
      });
    }
  }
}

export default AsaasProvider;
