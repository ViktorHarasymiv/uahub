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
    pendingEmail: { type: String, required: false, unique: true },
    password: { type: String, required: false },

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

    // BISSNES ACCOUNT

    accountType: {
      type: String,
      enum: ['private', 'business'],
      default: 'private',
    },

    businessStatus: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive',
    },

    business: {
      name: { type: String, required: false },
      description: { type: String, required: false },
      logoUrl: { type: String, required: false },
      bannerUrl: { type: String, required: false },

      // Contact
      phone: { type: String, required: false },
      email: { type: String, required: false },
      website: { type: String, required: false },

      // Address
      country: { type: String, required: false },
      city: { type: String, required: false },
      street: { type: String, required: false },

      // Socials
      facebook: { type: String, required: false },
      instagram: { type: String, required: false },
      telegram: { type: String, required: false },
      viber: { type: String, required: false },

      // Landing page activation
      landingActive: { type: Boolean, default: false },

      // Future: stats, views, etc.
      views: { type: Number, default: 0 },
    },

    // ============================================================
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
