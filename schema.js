const Joi = require('joi');
const joy = require('joy');

const userValidationSchema = Joi.object({
    username: Joi.string().min(1).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(1).required(),
});

const noteValidationSchema = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    content: Joi.string().min(1).required(),
    createdAt: Joi.date().default(Date.now)
});

const passwordValidationSchema = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    site:Joi.string().min(1).max(100).required(),
    username: Joi.string().min(1).required(),
    password: Joi.string().min(1).required(),
    createdAt: Joi.date().default(Date.now)
});

module.exports = {userValidationSchema,noteValidationSchema,passwordValidationSchema};