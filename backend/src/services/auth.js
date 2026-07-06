// src/services/auth.js

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import createHttpError from 'http-errors';

import { UsersCollection } from '../db/models/user.js';
import { SessionsCollection } from '../db/models/session.js';

import { ONE_DAY, TWO_HOUR } from '../constants/index.js';
import { createSession } from '../utils/createSession.js';

// REGISTRATION

export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

// LOGIN

export const loginService = async (payload) => {
  const { rememberMe } = payload;

  const user = await UsersCollection.findOne({ email: payload.email });

  if (!user) {
    throw createHttpError(401, 'Користувача не знайдено');
  }

  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Невірний пароль');
  }

  await SessionsCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  const refreshTokenValidUntil = rememberMe
    ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 днів
    : new Date(Date.now() + 5 * 60 * 1000); // 5 хв

  return await SessionsCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + TWO_HOUR),
    refreshTokenValidUntil: refreshTokenValidUntil,
  });
};

// LOG OUT

export const logoutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};

// CHECK EMAIL

export const checkEmailService = async (email) => {
  const user = await UsersCollection.findOne({ email });
  return Boolean(user);
};

// SESSION

export const checkSessionService = async (req, res) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken && !refreshToken) return { user: null };

  // 1. Пробуємо accessToken
  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);

    const session = await SessionsCollection.findOne({
      userId: decoded.userId,
    });

    if (!session) return { user: null };

    const user = await getUserById(decoded.userId);
    return { user };
  } catch (err) {}

  // 2. Пробуємо refreshToken
  if (!refreshToken) return { user: null };

  let decodedRefresh;
  try {
    decodedRefresh = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    return { user: null };
  }

  const userId = decodedRefresh.userId;

  const session = await SessionsCollection.findOne({
    userId,
    refreshToken,
  });

  if (!session) return { user: null };

  // 3. Генеруємо нові токени
  const newAccessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '15m',
  });

  const newRefreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  });

  res.cookie('accessToken', newAccessToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
  });

  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
  });

  const user = await getUserById(userId);
  return { user };
};

// REFRESH SESSION

export const refreshUsersSession = async ({ refreshToken }) => {
  // refreshToken тут вже raw
  const session = await SessionsCollection.findOne({ refreshToken });

  if (!session) {
    throw createHttpError(401, 'Refresh token not found');
  }

  const isExpired = new Date() > new Date(session.refreshTokenValidUntil);
  if (isExpired) {
    throw createHttpError(401, 'Refresh token expired');
  }

  // Створюємо нову сесію
  const newSessionData = createSession();

  const newSession = await SessionsCollection.create({
    userId: session.userId,
    ...newSessionData,
  });

  // Видаляємо стару сесію
  await SessionsCollection.deleteOne({ refreshToken });

  return newSession;
};
