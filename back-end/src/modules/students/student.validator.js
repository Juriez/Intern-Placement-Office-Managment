const Joi = require("joi");

const studentValidator = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    roll: Joi.string().length(4).required(),
    session: Joi.string().required(),
    cgpa: Joi.number().required(),
});

module.exports = { studentValidator };
