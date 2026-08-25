export type RegisterRequest = {
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type emailChange = {
  newEmail: string;
};

export type ResetPassword = {
  email?: string;
  password?: string;
};

export type ChangePassword = {
  oldPassword: string;
  newPassword: string;
};

export type User = {
  _id?: string;
  email?: string;

  // Basic profile
  firstName?: string;
  lastName?: string;
  photoUrl?: string;

  // Contact
  phone?: string;
  country?: string;
  city?: string;

  // Account status
  isEmailVerified?: boolean;
  isActive?: boolean;

  // Security
  lastLoginAt?: string;

  // Timestamps
  createdAt?: string;
  updatedAt?: string;

  // Localization
  language?: "uk" | "pl" | "en";
  timezone?: string;

  // Social login
  googleId?: string;
  facebookId?: string;

  // Subscription (optional)
  subscription?: {
    plan?: "free" | "pro" | "premium";
    expiresAt?: string;
    isAutoRenew?: boolean;
  };

  // BISSNES ACCOUNT

  accountType?: string;
};
