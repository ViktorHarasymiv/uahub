import express from 'express';

import { authMiddleware } from '../middlewares/authMiddleware.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { upload } from '../utils/multer.js';

import {
  createListingController,
  getAllListingsController,
  getListingByIdController,
  getRobotaController,
  incrementView,
} from '../controllers/listing.js';

const router = express.Router();

router.get('/all', ctrlWrapper(getAllListingsController));
router.get('/robota', ctrlWrapper(getRobotaController));

router.get('/:id', ctrlWrapper(getListingByIdController));
router.patch('/:id/view', ctrlWrapper(incrementView));

router.use(authMiddleware);

router.post(
  '/create',
  upload.array('photos', 6),
  // validateBody(listingSchemaValidation),
  ctrlWrapper(createListingController),
);
// router.patch('/listing/:id', updateAdController);
// router.delete('/listing/:id', deleteAdController);

export default router;
