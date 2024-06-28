const Joi = require("joi");

const temaSchema = Joi.object({
  id_tema: Joi.number().min(0),
  tema: Joi.string().pattern(new RegExp("^[\\p{L}0-9]{3,20}$", "u")).required(),
});

module.exports = temaSchema;