import 'dotenv/config';
import { env } from './general';

interface IAsaasConfig {
  urlBase: string;
  accessToken: string;
}

const asaasConfig: IAsaasConfig = {
  urlBase: env.URL_ASAAS,
  accessToken: env.TOKEN_ASAAS,
};

export default asaasConfig;
