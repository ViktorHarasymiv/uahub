// src/routers/auth.js

import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema } from '../validation/auth.js';
import {
  checkEmailController,
  deleteAccountController,
  loginUserController,
  logoutUserController,
  meController,
  refreshUserSessionController,
  registerUserController,
  sessionController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

// CHECK

router.get('/check-email', checkEmailController);

// AUTH

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post('/login', loginUserController);
router.post('/logout', ctrlWrapper(logoutUserController));

// SESSION

router.get('/session', sessionController);
router.post('/refresh', refreshUserSessionController);

// DATA

router.get('/me', authMiddleware, meController);
router.delete('/delete', authMiddleware, ctrlWrapper(deleteAccountController));

export default router;
