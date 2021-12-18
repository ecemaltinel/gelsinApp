const Joi = require('joi')

const addCommentValidation = Joi.object({
    comment: Joi.string().min(2).default(""),
    rate: Joi.number().required().min(1).max(5),
  });

const createProductValidation = Joi.object({
    name: Joi.string().required().min(2),
    description: Joi.string().min(2),
    quantity: Joi.number().positive(),
    unit_price: Joi.number().positive(),
    category: Joi.array(),
  });

const updateProductValidation = Joi.object({
    name: Joi.string().min(2),
    description: Joi.string().min(2),
    quantity: Joi.number().positive(),
    unit_price: Joi.number().positive(),
    category: Joi.array(),
    comments: Joi.array(),
    media: Joi.string(),
  });

 const addMediaValidation = Joi.object({
  file: Joi.object({
    name: Joi.string().required(),
    data: Joi.any(),
    size: Joi.number(),
    encoding: Joi.string(),
    tempFilePath: Joi.string().allow(''),
    truncated: Joi.boolean(),
    mimetype : Joi.string().valid('image/png','image/jpg','image/jpeg'),
    md5: Joi.string(),
    mv: Joi.function()
  }).required()
});
   

  module.exports = {
      addCommentValidation,
      createProductValidation,
      updateProductValidation,
      addMediaValidation
  
  }