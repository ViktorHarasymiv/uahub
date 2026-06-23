// src/routers/auth.js

import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema } from '../validation/auth.js';
import {
  checkEmailController,
  loginController,
  meController,
  registerUserController,
  sessionController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/check-email', checkEmailController);
router.get('/me', authMiddleware, meController);

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post('/login', loginController);
router.get('/session', sessionController);

export default router;
