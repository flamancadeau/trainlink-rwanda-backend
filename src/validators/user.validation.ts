import Joi from 'joi';

export const registerUserSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('Trainee', 'Company').required(),
  phoneNumber: Joi.number().optional(),
  address: Joi.string().optional(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(50).optional(),
  phoneNumber: Joi.number().optional(),
  address: Joi.string().optional(),
});
