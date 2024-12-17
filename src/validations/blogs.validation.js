// validations/blogValidation.js
const Joi = require('joi');

// Schema for creating a blog
const createBlogSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().optional().allow(''),
  titledescriptions: Joi.array()
    .items(
      Joi.object({
        descriptionTitle: Joi.string().required(),
        text: Joi.string().required(),
        image: Joi.string().optional(),
      })
    )
    .optional(),
});

module.exports = {
  createBlogSchema,
};
