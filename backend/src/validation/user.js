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
  email: Joi.string().email(),

  // OAuth
  googleId: Joi.string().allow(null, ''),
  facebookId: Joi.string().allow(null, ''),

  // Status
  isEmailVerified: Joi.boolean(),
  isActive: Joi.boolean(),

  // Account type (NEW)
  accountType: Joi.string().valid('private', 'business').optional(),

  // Business status (NEW)
  businessStatus: Joi.string().valid('active', 'inactive').optional(),

  // Business data (NEW)
  business: Joi.object({
    name: Joi.string().max(100).allow(null, ''),
    description: Joi.string().max(500).allow(null, ''),
    logoUrl: Joi.string().uri().allow(null, ''),
    bannerUrl: Joi.string().uri().allow(null, ''),

    phone: Joi.string().max(20).allow(null, ''),
    email: Joi.string().email().allow(null, ''),
    website: Joi.string().uri().allow(null, ''),

    country: Joi.string().max(50).allow(null, ''),
    city: Joi.string().max(50).allow(null, ''),
    street: Joi.string().max(100).allow(null, ''),

    facebook: Joi.string().uri().allow(null, ''),
    instagram: Joi.string().uri().allow(null, ''),
    telegram: Joi.string().uri().allow(null, ''),

    landingActive: Joi.boolean().optional(),
    views: Joi.number().optional(),
  }).optional(),

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

// export const userInfoValidator = Joi.object({
//   // Basic profile
//   firstName: Joi.string().max(50).allow(null, ''),
//   lastName: Joi.string().max(50).allow(null, ''),

//   // Contact
//   phone: Joi.string().max(20).allow(null, ''),
// });
