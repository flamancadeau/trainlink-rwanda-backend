import Joi from 'joi';


export const createCompanySchema = Joi.object({
  companyName: Joi.string().min(2).max(100).required(),
  companyDescription: Joi.string().max(500).optional(),
  industryType: Joi.string().valid('Tech', 'Finance', 'Health', 'Marketing', 'Education', 'Other').optional(),
  companyWebsiteUrl: Joi.string().uri().optional(),
  companyLocation: Joi.string().optional(),
  contactEmail: Joi.string().email().optional(),
  contactPhone: Joi.string().optional(),
});

export const updateCompanySchema = Joi.object({
  companyName: Joi.string().min(2).max(100).optional(),
  companyDescription: Joi.string().max(500).optional(),
  industryType: Joi.string().valid('Tech', 'Finance', 'Health', 'Marketing', 'Education', 'Other').optional(),
  companyWebsiteUrl: Joi.string().uri().optional(),
  companyLocation: Joi.string().optional(),
  contactEmail: Joi.string().email().optional(),
  contactPhone: Joi.string().optional(),
});
