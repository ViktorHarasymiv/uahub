import { listingCollection } from '../db/models/listing.js';

import {
  createListingService,
  getAllListingsService,
  getRobotaService,
} from '../services/listing.js';

// ALL

export const getAllListingsController = async (req, res) => {
  try {
    const listings = await getAllListingsService();
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE

export const createListingController = async (req, res) => {
  try {
    const photos = req.files?.map((file) => `/temp/${file.filename}`) || [];

    const listing = await createListingService({
      category: req.body.category,
      subCategory: req.body.subCategory,
      contact: req.body.contact,
      fields: req.body.fields,
      photos, // ← тепер масив рядків
    });

    console.log(listing);

    return res.status(201).json({
      message: 'Listing created',
      listing,
    });
  } catch (error) {
    console.log('createAd error:', error);
    return res.status(500).json({ error: error.message });
  }
};

// DELETE

export const deleteAdController = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }

    const deleted = await deleteAdService(id);

    if (!deleted) {
      return next(createHttpError(404, 'Ad not found'));
    }

    res.json({
      status: 200,
      message: 'Ad successfully deleted!',
      data: deleted,
    });
  } catch (error) {
    console.error('deleteAd error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// UPDATE

export const updateAdController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const payload = req.body;

    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }

    // Фото з multer
    if (req.files && req.files.length > 0) {
      const photos = Array(6).fill(null);

      req.files.forEach((file, index) => {
        photos[index] = file.path;
      });

      payload.photos = photos;
    }

    const result = await updateAdService(id, payload);

    if (!result) {
      return next(createHttpError(404, 'Ad not found'));
    }

    res.json({
      status: 200,
      message: 'Ad successfully updated!',
      data: result.ad,
    });
  } catch (error) {
    console.error('updateAd error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// BY ID

export async function getListingByIdController(req) {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }

    const ad = await getAdByIdService(id);

    if (!ad) {
      return next(createHttpError(404, 'Ad not found'));
    }

    res.json({
      status: 200,
      data: ad,
    });
  } catch (error) {
    console.error('getAdById error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// CATEGORY

// JOB

export const getRobotaController = async (req, res) => {
  try {
    const {
      city,
      type,
      salaryFrom,
      salaryTo,
      sort = 'latest',
      page = 1,
      limit = 20,
    } = req.query;

    const filters = { category: 'praca' };

    if (city) filters.city = city;
    if (type) filters.type = type;

    if (salaryFrom || salaryTo) {
      filters.salary = {};
      if (salaryFrom) filters.salary.$gte = Number(salaryFrom);
      if (salaryTo) filters.salary.$lte = Number(salaryTo);
    }

    const result = await getRobotaService({
      filters,
      sort,
      page: Number(page),
      limit: Number(limit),
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
