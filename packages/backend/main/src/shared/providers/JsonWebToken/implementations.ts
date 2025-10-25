import { JwtPayload, sign, verify } from 'jsonwebtoken';
import TokenOutputData from './OutputData/OutputData';
import { env } from '@config/general';
import IJWTProvider from './IJWTProvider';

interface ITokenResponse extends JwtPayload {
  userId: number;
  userName: string;
}

class JsonWebTokenProvider implements IJWTProvider {
  public decode(token: string): TokenOutputData {
    const decode = verify(token, env.JWT_SECRET) as ITokenResponse;

    const { userId, userName } = decode.payload;
    const response = new TokenOutputData({
      userId,
      userName,
    });

    return response;
  }

  public generate(payload: Record<string, unknown>): string {
    const token = sign(payload, env.JWT_SECRET, {
      expiresIn: '3H',
    });
    return token;
  }
}

export default JsonWebTokenProvider;
