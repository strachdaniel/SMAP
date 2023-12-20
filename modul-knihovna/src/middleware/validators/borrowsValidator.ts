import Joi from 'joi';

export const borrowCreateValidator = Joi.object({
  readerId: Joi.number().integer().required(),
  bookId: Joi.number().integer().required(),
  borrowedAt: Joi.date().required(),
  returnedAt: Joi.date().allow(null),
});

export const borrowUpdateValidator = Joi.object({
  readerId: Joi.number().integer(),
  bookId: Joi.number().integer(),
  borrowedAt: Joi.date(),
  returnedAt: Joi.date().allow(null),
}).min(1); // At least one field should be updated
