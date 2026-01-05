import Joi from 'joi';


export const createInternshipSchema = Joi.object({
  companyId: Joi.string().uuid().required(),
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().min(10).required(),
  location: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref('startDate')).required(),
  applicationDeadline: Joi.date().less(Joi.ref('startDate')).required(),
  skillsRequired: Joi.array().items(Joi.string()).optional(),
  companyWebsiteUrl: Joi.string().uri().optional(),
});

export const updateInternshipSchema = Joi.object({
  title: Joi.string().min(3).max(200).optional(),
  description: Joi.string().min(10).optional(),
  location: Joi.string().optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  applicationDeadline: Joi.date().optional(),
  skillsRequired: Joi.array().items(Joi.string()).optional(),
  companyWebsiteUrl: Joi.string().uri().optional(),
});
