const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

exports.reportSchema = Joi.object({
  entity_type: Joi.string().valid(['user', 'post', 'comment']).required(),
  entity_id: Joi.objectId().required(),
  author_id: Joi.objectId().required(),
  date: Joi.date().required().default(new Date()),
  string: Joi.string().required(),
  overwrite: Joi.boolean().default(false).required(),
})