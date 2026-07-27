import mongoose, { Schema } from 'mongoose';

const FieldSchema = new Schema({
  name: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, required: true }, // text, number, textarea
  required: { type: Boolean, default: false },
});

const CategorySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  icon: { type: String, default: null }, // /icons/uslugi.svg або CDN URL
  parent: { type: String, default: null }, // slug батьківської категорії
  fields: { type: [FieldSchema], default: [] },
});

export const categoriesCollection = mongoose.model(
  'categories',
  CategorySchema,
);
