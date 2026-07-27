import Joi from 'joi';

export const listingSchemaValidation = Joi.object({
  category: Joi.string().required(),
  subCategory: Joi.string(),
  fields: Joi.object({
    title: Joi.string().min(3).required(),
    location: Joi.string().min(2).required(),
    description: Joi.string().min(5).optional(),
    price: Joi.number().min(0).optional(),
    salary: Joi.number().min(0).optional(), // для jobs
    about: Joi.string().optional(), // для jobs
  }).required(),

  contact: Joi.object({
    name: Joi.string().min(2).required(),
    phone: Joi.string().min(5).required(),
    email: Joi.string().required(),
  }).required(),

  photos: Joi.array().items(Joi.string()).min(1).required(),
});
