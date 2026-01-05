import Joi from 'joi';

export const createApplicationSchema = Joi.object({
  traineeId: Joi.string().uuid().required(),
  internshipId: Joi.string().uuid().required(),
});

export const updateApplicationStatusSchema = Joi.object({
  status: Joi.string().valid('Pending', 'Accepted', 'Rejected').required(),
});