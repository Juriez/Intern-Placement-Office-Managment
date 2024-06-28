const Joi = require("joi");

const companyManagerValidator = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    companyName: Joi.string().required(),
});

module.exports = { companyManagerValidator };
