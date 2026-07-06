// src/controllers/auth.js
import jwt from 'jsonwebtoken';
import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';
import {
  checkEmailService,
  checkSessionService,
  loginService,
  logoutUser,
  refreshUsersSession,
  registerUser,
} from '../services/auth.js';
import { setupSession } from '../utils/setupSession.js';

// REGISTATION

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

// LOGIN

export const loginUserController = async (req, res, next) => {
  try {
    const session = await loginService(req.body);

    setupSession(res, session);

    res.json({
      status: 200,
      message: 'Successfully logged',
      data: {
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
        sessionId: session.userId,
      },
    });
  } catch (error) {
    next(error); // передаємо до глобального error handler
  }
};

// LOG OUT

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.status(204).send();
};

// FETCH ME

export const meController = async (req, res) => {
  const user = await UsersCollection.findById(req.user.id).select('-password');

  return res.json({ user });
};

// CHECK EMAIL

export const checkEmailController = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        exists: false,
        message: 'Email is required',
      });
    }

    const exists = await checkEmailService(email);

    return res.status(200).json({ exists });
  } catch (error) {
    return res.status(500).json({
      exists: false,
      message: 'Server error',
    });
  }
};

// SESSION

// controllers/auth.controller.ts

export const sessionController = async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;

    // Немає токена → просто valid: false
    if (!accessToken) {
      return res.json({ valid: false });
    }

    const session = await SessionsCollection.findOne({ accessToken });

    // Немає сесії → valid: false
    if (!session) {
      return res.json({ valid: false });
    }

    // Токен протух → valid: false
    if (session.accessTokenValidUntil < new Date()) {
      return res.json({ valid: false });
    }

    // Все ок
    return res.json({ valid: true });
  } catch (err) {
    return res.json({ valid: false });
  }
};

// REFRESH SESSION

export const refreshUserSessionController = async (req, res) => {
  const rawToken = decodeURIComponent(req.cookies.refreshToken);

  const session = await refreshUsersSession({
    refreshToken: rawToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      sessionId: session._id,
    },
  });
};
