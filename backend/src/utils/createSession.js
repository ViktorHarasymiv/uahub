import { randomBytes } from 'node:crypto';
import { ONE_DAY, TWO_HOUR } from '../constants/index.js';

export const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + TWO_HOUR),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};
