// src/validation/auth.js
import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
