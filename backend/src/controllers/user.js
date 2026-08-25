import createHttpError from 'http-errors';
import { userUpdateValidator } from '../validation/user.js';
import { updateAccountTypeService, updateUser } from '../services/user.js';
import { UsersCollection } from '../db/models/user.js';

// PATH USER INFO

export const patchUserController = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.session?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // ❗ На цьому етапі req.body вже валідний
    const updateData = req.body;

    const updatedUser = await updateUser(userId, updateData);

    if (!updatedUser) {
      return next(createHttpError(404, 'User not found'));
    }

    res.json({
      status: 200,
      message: 'Successfully patched a user!',
      data: updatedUser,
    });
  } catch (error) {
    console.error('patchUser error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// PATCH PHOTO

export const patchPhotoController = async (req, res) => {
  try {
    // multer додає req.file
    if (!req.file) {
      return res.status(400).json({ error: 'Avatar file is required' });
    }

    // шлях до файлу, який multer зберіг
    const avatarUrl = `/temp/${req.file.filename}`;

    // оновлюємо користувача
    const updatedUser = await UsersCollection.findByIdAndUpdate(
      req.user.id,
      { photoUrl: avatarUrl },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({
      success: true,
      message: 'Avatar updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('patchPhotoController error:', error);
    return res.status(500).json({ error: 'Failed to update avatar' });
  }
};

// BUSSINES ACCOUNT

export const patchAccountTypeController = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.session?.userId;

    if (!userId) {
      return next(createHttpError(401, 'Unauthorized'));
    }

    const { newType } = req.body;

    if (!newType) {
      return next(createHttpError(400, 'Missing newType'));
    }

    const updated = await updateAccountTypeService(userId, newType);

    res.json({
      status: 200,
      message: 'Account type updated',
      data: updated,
    });
  } catch (error) {
    console.error('patchAccountType error:', error);
    next(createHttpError(500, error.message || 'Internal server error'));
  }
};
