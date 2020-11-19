const Joi = require('joi');
const { usernamePattern, dateRegexValidator } = require('./../helper/regex');
const registerValidator = (user) => {
    const scheam = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        family: Joi.string().min(3).max(255).required(),
        username: Joi.string()
            .min(3)
            .max(255)
            .regex(usernamePattern)
            .required(),
        email: Joi.string().email().min(3).max(255).required(),
        password: Joi.string().min(8).max(1024).required(),
        bornDate: Joi.string().regex(dateRegexValidator).required(),
    });

    return scheam.validate(user);
};

module.exports = { registerValidator };
