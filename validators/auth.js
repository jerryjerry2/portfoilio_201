const Joi = require('joi');

const registerUserSchema = Joi.object({
    full_name : Joi.string().min(3).required(),
    phone : Joi.number().min(7).required(),
    email : Joi.string().min(3).required(),
    password : Joi.string().min(3).required(),
});

const loginUserSchema = Joi.object({
    email : Joi.string().min(3).required(),
    password : Joi.string().min(3).required(),
});

module.exports = {
    registerUserSchema,
    loginUserSchema
}