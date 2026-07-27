import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getAllCategoriesController,
  getCategoryBySlugController,
  getSubcategoriesController,
} from '../controllers/categories.js';

const router = express.Router();

// GET /categories/all
router.get('/all', ctrlWrapper(getAllCategoriesController));

// GET /categories/:slug
router.get('/:slug', ctrlWrapper(getCategoryBySlugController));

// GET /categories/:slug/children
router.get('/:slug/children', ctrlWrapper(getSubcategoriesController));

export default router;
