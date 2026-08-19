// src/services/auth.js

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';

import { randomBytes } from 'crypto';

import { UsersCollection } from '../db/models/user.js';
import { SessionsCollection } from '../db/models/session.js';

import { ONE_DAY, TEMPLATES_DIR, TWO_HOUR } from '../constants/index.js';

import { SMTP } from '../constants/index.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { sendEmail } from '../utils/sendMail.js';

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
    throw createHttpError(401, 'User not found');
  }

  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Invalid Email or Password');
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

// DELETE

export const deleteAccountService = async (userId) => {
  const user = await UsersCollection.findById(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  // Видаляємо всі сесії
  await SessionsCollection.deleteMany({ userId });

  // Видаляємо акаунт
  await UsersCollection.findByIdAndDelete(userId);

  return { success: true };
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
    secure: true,
    sameSite: 'none',
    path: '/',
  });

  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
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

// RESET PASSWORD

export const requestResetToken = async (email) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    getEnvVar('JWT_SECRET'),
    {
      expiresIn: '15m',
    },
  );

  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    'reset-password-email.html',
  );

  const templateSource = (
    await fs.readFile(resetPasswordTemplatePath)
  ).toString();

  const template = handlebars.compile(templateSource);
  const html = template({
    name: `${user.firstName} ${user.lastName}`,
    link: `${getEnvVar('APP_DOMAIN')}/reset-password/new-pass?token=${resetToken}`,
  });

  await sendEmail({
    from: getEnvVar(SMTP.SMTP_FROM),
    to: email,
    subject: 'Reset your password',
    html,
  });
};

export const resetPassword = async (payload) => {
  let entries;

  try {
    entries = jwt.verify(payload.token, getEnvVar('JWT_SECRET'));
  } catch (err) {
    if (err instanceof Error) throw createHttpError(401, err.message);
    throw err;
  }

  const user = await UsersCollection.findOne({
    email: entries.email,
    _id: entries.sub,
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  await UsersCollection.updateOne(
    { _id: user._id },
    { password: encryptedPassword },
  );
};

export const changePasswordService = async ({
  userId,
  oldPassword,
  newPassword,
}) => {
  const user = await UsersCollection.findOne({ _id: userId });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);

  if (!isMatch) {
    throw createHttpError(401, 'Incorrect current password');
  }

  const encryptedPassword = await bcrypt.hash(newPassword, 10);

  await UsersCollection.updateOne(
    { _id: user._id },
    { password: encryptedPassword },
  );

  return { updated: true };
};

// CHANGE E-MAIL

export const changeEmailRequestService = async ({ userId, newEmail }) => {
  const user = await UsersCollection.findOne({ _id: userId });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  // Перевірка чи email не зайнятий
  const exists = await UsersCollection.findOne({ email: newEmail });
  if (exists) {
    throw createHttpError(409, 'Email already in use');
  }

  // Створюємо токен
  const token = jwt.sign({ userId, newEmail }, process.env.JWT_SECRET, {
    expiresIn: '30m',
  });

  await UsersCollection.updateOne({ _id: userId }, { pendingEmail: newEmail });

  // Надсилаємо лист
  await sendEmail({
    from: getEnvVar(SMTP.SMTP_FROM),
    to: newEmail,
    subject: 'Potwierdź zmianę adresu e-mail',
    html: `
      <p>Kliknij w link, aby potwierdzić zmianę adresu e-mail:</p>
      <a href="${process.env.APP_DOMAIN}/change-email/confirm?token=${token}">
        Potwierdź zmianę
      </a>
    `,
  });

  return { sent: true };
};

export const changeEmailConfirmService = async ({ token }) => {
  const { userId, newEmail } = jwt.verify(token, process.env.JWT_SECRET);

  const user = await UsersCollection.findOne({ _id: userId });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  if (user.pendingEmail !== newEmail) {
    throw createHttpError(400, 'Invalid email change request');
  }

  await UsersCollection.updateOne(
    { _id: userId },
    { email: newEmail, pendingEmail: null },
  );

  return { updated: true };
};
