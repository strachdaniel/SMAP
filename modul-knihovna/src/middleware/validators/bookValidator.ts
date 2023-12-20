import Joi from 'joi';

export const bookCreateValidator = Joi.object({
  isbn: Joi.string().required(),
  title: Joi.string().required(),
  author: Joi.string().required(),
  category_id: Joi.number().integer().required(),
  subcategory_id: Joi.number().integer(),
});

export const bookUpdateValidator = Joi.object({
  isbn: Joi.string(),
  title: Joi.string(),
  author: Joi.string(),
  category_id: Joi.number(),
  subcategory_id: Joi.number(),
});
