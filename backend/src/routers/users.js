import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  patchPhotoController,
  patchUserController,
} from '../controllers/user.js';
import { validateBody } from '../middlewares/validateBody.js';
import { upload } from '../utils/multer.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { userUpdateValidator } from '../validation/user.js';

const router = Router();

router.use(authMiddleware);

router.patch(
  '/',
  validateBody(userUpdateValidator),
  ctrlWrapper(patchUserController),
);

router.patch(
  '/photo',
  upload.single('photoUrl'),
  ctrlWrapper(patchPhotoController),
);

export default router;
