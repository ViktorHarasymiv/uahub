import {
  getAllCategories,
  getCategoryBySlug,
  getSubcategories,
} from '../services/categories.js';

// GET /categories/all
export const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /categories/:slug
export const getCategoryBySlugController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await getCategoryBySlug(slug);
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /categories/:slug/children
export const getSubcategoriesController = async (req, res) => {
  try {
    const { slug } = req.params;
    const subcategories = await getSubcategories(slug);
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
