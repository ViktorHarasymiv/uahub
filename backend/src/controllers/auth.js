// src/controllers/auth.js

import { UsersCollection } from '../db/models/user.js';
import {
  checkEmailService,
  loginService,
  registerUser,
} from '../services/auth.js';
import { createToken } from '../utils/createToken.js';

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

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const { user, accessToken, refreshToken } = await loginService(
    email,
    password,
  );

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    maxAge: 1000 * 60 * 15, // 15m
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7d
  });

  return res.json({ user: { id: user._id, email: user.email } });
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
    const result = await checkSessionService(req, res);
    return res.status(200).json(result);
  } catch (err) {
    console.error('SESSION CONTROLLER ERROR:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};
