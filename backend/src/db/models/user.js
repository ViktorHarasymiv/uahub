import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    // Basic profile
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    photoUrl: { type: String, required: false },

    // Contact
    phone: { type: String, required: false },
    country: { type: String, required: false },
    city: { type: String, required: false },

    // Auth
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false }, // optional if OAuth

    // OAuth
    googleId: { type: String, required: false },
    facebookId: { type: String, required: false },

    // Status
    isEmailVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    // Localization
    language: { type: String, default: 'uk' },
    timezone: { type: String, default: 'Europe/Warsaw' },

    // Security
    lastLoginAt: { type: Date, required: false },

    // Subscription (optional)
    subscription: {
      plan: { type: String, enum: ['free', 'pro', 'premium'], default: 'free' },
      expiresAt: { type: Date, required: false },
      isAutoRenew: { type: Boolean, default: false },
    },
  },
  { timestamps: true, versionKey: false },
);

// Remove sensitive fields from JSON
usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', usersSchema);
