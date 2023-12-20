import Joi from 'joi';

export const pairedCategoryCreateValidator = Joi.object({
  categoryId: Joi.number().integer().required(),
  subcategoryId: Joi.number().integer().required(),
});

export const pairedCategoryUpdateValidator = Joi.object({
  categoryId: Joi.number().integer(),
  subcategoryId: Joi.number().integer(),
}).min(1); // At least one field should be updated
