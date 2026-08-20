import mongoose, { Schema } from 'mongoose';

const listingSchema = new Schema(
  {
    category: { type: String, required: true },
    subCategory: { type: String },

    fields: {
      type: Object,
      default: {},
    },

    photos: {
      type: [String],
      default: [null, null, null, null, null, null],
    },

    views: {
      type: Number,
      default: 0,
    },

    contact: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
  },
  { timestamps: true, versionKey: false },
);

export const listingCollection = mongoose.model('Listing', listingSchema);
