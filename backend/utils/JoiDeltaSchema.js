const Joi = require("joi");

exports.deltaSchema = Joi.object({
  ops: Joi.array()
    .items(
      Joi.object({
        insert: Joi.alternatives().try(Joi.string().min(1), Joi.object()),
        attributes: Joi.object()
          .pattern(
            Joi.string(),
            Joi.alternatives().try(Joi.boolean(), Joi.string(), Joi.number())
          )
          .optional(),
      })
    )
    .required(),
});
