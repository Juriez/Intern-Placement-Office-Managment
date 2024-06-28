const Joi = require("joi");

const userValidator = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    userType: Joi.string().valid("admin", "ipoc_head", "ipoc_member").required(),
});

module.exports = { userValidator };
