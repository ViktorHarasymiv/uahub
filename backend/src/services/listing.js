import { listingCollection } from '../db/models/listing.js';

// ALL

export const getAllListingsService = async () => {
  return listingCollection.find().sort({ createdAt: -1 });
};

// CREATE

export const createListingService = async (payload) => {
  const listing = await listingCollection.create(payload);

  if (!listing) return null;

  return {
    listing,
    isNew: true,
  };
};

// UPDATE

export const updateListingService = async (id, payload, options = {}) => {
  const updatedListing = await listingCollection.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, ...options },
  );

  if (!updatedListing) return null;

  return {
    listing: updatedListing,
    isNew: false,
  };
};

// DELETE

export const deleteListingService = async (id) => {
  const deletedListing = await listingCollection.findByIdAndDelete(id);

  if (!deletedListing) return null;

  return {
    listing: deletedListing,
    deleted: true,
  };
};

// GET BY ID

export const getAdByIdService = async (id) => {
  return listingCollection.findById(id);
};

// GET ALL

export const getAllAdsService = async () => {
  return listingCollection.find().sort({ createdAt: -1 });
};

// GET BY CATEGORY

export const getAdsByCategoryService = async (category) => {
  return listingCollection.find({ category }).sort({ createdAt: -1 });
};

//

// JOB

export const getRobotaService = async ({ filters, sort, page, limit }) => {
  const sortOptions = {};

  switch (sort) {
    case 'latest':
      sortOptions.createdAt = -1;
      break;
    case 'salary_desc':
      sortOptions.salary = -1;
      break;
    case 'salary_asc':
      sortOptions.salary = 1;
      break;
    default:
      sortOptions.createdAt = -1;
  }

  const skip = (page - 1) * limit;

  const items = await listingCollection
    .find(filters)
    .sort(sortOptions)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await listingCollection.countDocuments(filters);

  return {
    page,
    limit,
    total,
    items,
  };
};
