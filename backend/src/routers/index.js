// src/routers/index.js

import { Router } from 'express';
import authRouter from './auth.js';
import userRouter from './users.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);

export default router;
