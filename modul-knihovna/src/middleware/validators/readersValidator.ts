import Joi from 'joi';

export const readerCreateValidator = Joi.object({
  userId: Joi.number().integer().required(),
});

export const readerUpdateValidator = Joi.object({
  userId: Joi.number().integer(),
}).min(1); // At least one field should be updated
