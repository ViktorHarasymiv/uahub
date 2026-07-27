import { categoriesCollection } from '../db/models/category.js';

export async function getAllCategories() {
  return categoriesCollection.find().lean();
}

export async function getCategoryBySlug(slug) {
  return categoriesCollection.findOne({ slug }).lean();
}

export async function getSubcategories(parentSlug) {
  return categoriesCollection.find({ parent: parentSlug }).lean();
}
