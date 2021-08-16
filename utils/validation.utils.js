const Joi = require('joi');

const signUpValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().min(5).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(5).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data);
}

module.exports.signUpValidation = signUpValidation
module.exports.loginValidation = loginValidation

