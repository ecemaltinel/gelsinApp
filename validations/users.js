const Joi = require('joi')

const createUserValidation = Joi.object({
    first_name:Joi.string().required().min(2),
    last_name:Joi.string().required().min(2),
    email:Joi.string().email().required(),
    password:Joi.string().required().min(8)
})

const createAdminUserValidation = Joi.object({
    first_name:Joi.string().required().min(2),
    last_name:Joi.string().required().min(2),
    email:Joi.string().email().required(),
    password:Joi.string().required().min(8),
    isAdmin:Joi.boolean().required().disallow(false)
})

const loginUserValidation = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required()
})

module.exports={
    createUserValidation,
    loginUserValidation,
    createAdminUserValidation
}