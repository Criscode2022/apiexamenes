const Joi = require("joi");

const temaSchema = Joi.object({
  id_tema: Joi.number().min(0),
  tema: Joi.string()
    .pattern(new RegExp("^[\\p{L}0-9]{3,20}$", "u"))
    .when("id_tema", {
      is: Joi.exist(),
      then: Joi.optional(),
      otherwise: Joi.required(),
    }),
});

module.exports = temaSchema;
