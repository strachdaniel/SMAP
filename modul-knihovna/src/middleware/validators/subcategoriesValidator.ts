import Joi from 'joi';

export const subcategoryCreateValidator = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  description: Joi.string().min(1).max(255).required(),
});

export const subcategoryUpdateValidator = Joi.object({
  name: Joi.string().min(1).max(255),
  description: Joi.string().min(1).max(255),
}).min(1); // At least one field should be updated
