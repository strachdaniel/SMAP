import Joi from 'joi';

export const userCreateValidator = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  email: Joi.string().email().required(),
});

export const userUpdateValidator = Joi.object({
  name: Joi.string().min(1).max(255),
  email: Joi.string().email(),
}).min(1); // At least one field should be updated
