const joi = require('joi');

const userStatusSchema = joi.object({
  status: Joi.string().valid(['active', 'muted', 'banned', 'deleted']).required(),
  status_duration: Joi.number().default(0).min(1).max(1000000000),
  status_description: Joi.string().default('No reason provided..').required(),
});


