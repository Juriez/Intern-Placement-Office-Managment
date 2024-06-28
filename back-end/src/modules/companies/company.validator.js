const Joi = require("joi");

const companyValidator = Joi.object({
    name: Joi.string().required(),
    details: Joi.string().required(),
    location: Joi.string().required(),
    techStack: Joi.array().items(Joi.string()).min(2).required(),
});

module.exports = { companyValidator };
