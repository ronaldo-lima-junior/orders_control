import TokenOutputData from './OutputData/OutputData';

interface IJWTProvider {
  decode(token: string): TokenOutputData;
  generate(payload: Record<string, unknown>): string;
}

export default IJWTProvider;
