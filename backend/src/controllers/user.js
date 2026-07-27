import createHttpError from 'http-errors';
import { userUpdateValidator } from '../validation/user.js';
import { updateUser } from '../services/user.js';
import { UsersCollection } from '../db/models/user.js';

// PATH USER INFO

export const patchUserController = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.session?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Валідація тіла запиту
    const { error, value } = userUpdateValidator.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res
        .status(400)
        .json({ error: error.details.map((d) => d.message) });
    }

    const updateData = { ...value };

    // if (photoUrl) updateData.avatar = photoUrl;

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
