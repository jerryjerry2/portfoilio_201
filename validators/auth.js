const Joi = require('joi');

const registerUserSchema = Joi.object({
    full_name : Joi.string().min(3).required(),
    phone : Joi.number().min(7).required(),
    email : Joi.string().min(3).required(),
    password: Joi.string()
    .min(8)
    .max(128)
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .pattern(/[0-9]/)
    .pattern(/[^A-Za-z0-9]/)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters",
      "string.max": "Password must not exceed 128 characters",
      "string.pattern.base":
        "Password must contain uppercase, lowercase, number, and special character",
      "any.required": "Password is required"
    })
});

const loginUserSchema = Joi.object({
    email : Joi.string().email().min(3).required(),
    password : Joi.string().min(3).required(),
});

module.exports = {
    registerUserSchema,
    loginUserSchema
}