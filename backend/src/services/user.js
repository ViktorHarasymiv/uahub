import { UsersCollection } from '../db/models/user.js';

export const updateUser = async (id, payload, options = {}) => {
  const updatedUser = await UsersCollection.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, ...options },
  );

  if (!updatedUser) return null;

  return {
    user: updatedUser,
    isNew: false,
  };
};

// BUSINESS ACCOUNT

export const updateAccountTypeService = async (userId, newType) => {
  if (!['private', 'business'].includes(newType)) {
    throw new Error('Invalid account type');
  }

  const user = await UsersCollection.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  // Перемикання типу акаунта
  user.accountType = newType;

  // Логіка статусу бізнесу
  if (newType === 'business') {
    user.businessStatus = 'active';
  } else {
    user.businessStatus = 'inactive';

    // Деактивація бізнес-сторінки
    if (user.business) {
      user.business.landingActive = false;
    }
  }

  await user.save();

  return {
    accountType: user.accountType,
    businessStatus: user.businessStatus,
    business: user.business,
  };
};
