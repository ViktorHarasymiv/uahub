// src/services/auth.js

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import createHttpError from 'http-errors';

import { UsersCollection } from '../db/models/user.js';
import { SessionsCollection } from '../db/models/session.js';

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

export const loginService = async (email, password) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  // 1. Створюємо сесію (поки без токенів)
  const session = await SessionsCollection.create({
    userId: user._id,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  // 2. Генеруємо JWT токени
  const accessToken = jwt.sign(
    { id: user._id, sessionId: session._id },
    process.env.JWT_SECRET,
    { expiresIn: '15m' },
  );

  const refreshToken = jwt.sign(
    { sessionId: session._id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' },
  );

  // 3. Оновлюємо сесію токенами
  session.accessToken = accessToken;
  session.refreshToken = refreshToken;
  await session.save();

  return { user, accessToken, refreshToken };
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

  // 1. Немає токенів → немає сесії
  if (!accessToken && !refreshToken) {
    return { user: null };
  }

  // 2. Пробуємо accessToken
  try {
    const payload = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    const user = await getUserById(payload.userId);
    return { user };
  } catch (err) {
    // accessToken протух — йдемо далі
  }

  // 3. Пробуємо refreshToken
  if (!refreshToken) return { user: null };

  let payload;
  try {
    payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    return { user: null };
  }

  // 4. Генеруємо нові токени
  const { accessToken: newAccess, refreshToken: newRefresh } = generateTokens(
    payload.userId,
  );

  // 5. Ставимо нові cookies
  res.cookie('accessToken', newAccess, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
  });

  res.cookie('refreshToken', newRefresh, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
  });

  // 6. Повертаємо user
  const user = await getUserById(payload.userId);

  return { user };
};
