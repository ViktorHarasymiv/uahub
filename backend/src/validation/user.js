import Joi from 'joi';

export const userUpdateValidator = Joi.object({
  // Basic profile
  firstName: Joi.string().max(50).allow(null, ''),
  lastName: Joi.string().max(50).allow(null, ''),
  photoUrl: Joi.string().uri().allow(null, ''),

  // Contact
  phone: Joi.string().max(20).allow(null, ''),
  country: Joi.string().max(50).allow(null, ''),
  city: Joi.string().max(50).allow(null, ''),

  // Auth
  email: Joi.string().email().required(),

  // OAuth
  googleId: Joi.string().allow(null, ''),
  facebookId: Joi.string().allow(null, ''),

  // Status
  isEmailVerified: Joi.boolean(),
  isActive: Joi.boolean(),

  // Localization
  language: Joi.string().valid('uk', 'pl', 'en').allow(null),
  timezone: Joi.string().allow(null),

  // Subscription
  subscription: Joi.object({
    plan: Joi.string().valid('free', 'pro', 'premium').allow(null),
    expiresAt: Joi.string().allow(null),
    isAutoRenew: Joi.boolean().allow(null),
  }).allow(null),
});
