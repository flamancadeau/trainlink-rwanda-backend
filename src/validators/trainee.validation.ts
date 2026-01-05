import Joi from 'joi';


export const createTraineeSchema = Joi.object({
  traineeId: Joi.string().required(),
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  dateOfBirth: Joi.date().optional(),
  gender: Joi.string().valid('Male', 'Female', 'Other', 'Prefer not to say').optional(),
  location: Joi.string().optional(),
  educationLevel: Joi.string().valid('High School', 'Bachelor', 'Master', 'PhD', 'Other').optional(),
  skills: Joi.array().items(Joi.string()).optional(),
  interests: Joi.array().items(Joi.string()).optional(),
});

export const updateTraineeSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).optional(),
  lastName: Joi.string().min(2).max(50).optional(),
  dateOfBirth: Joi.date().optional(),
  gender: Joi.string().valid('Male', 'Female', 'Other', 'Prefer not to say').optional(),
  location: Joi.string().optional(),
  educationLevel: Joi.string().valid('High School', 'Bachelor', 'Master', 'PhD', 'Other').optional(),
  skills: Joi.array().items(Joi.string()).optional(),
  interests: Joi.array().items(Joi.string()).optional(),
});