import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../user/User.entity';

dotenv.config();

interface createdTokens {
  accessToken: string;
  refreshToken: string;
}

export const createTokens = (user: User): createdTokens => {
  const accessToken = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: '24h',
    }
  );

  const refreshToken = jwt.sign(
    {
      userId: user.id,
      sessionId: user.sessionId,
    },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: '10m',
    }
  );

  return { accessToken, refreshToken };
};
