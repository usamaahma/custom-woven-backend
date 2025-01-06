const Joi = require('joi');

// Validate the request body when creating a newsletter
const createNewsletter = {
  body: Joi.object().keys({
    email: Joi.string().email().required().messages({
      'string.email': 'Email must be a valid email address.',
      'any.required': 'Email is required.',
    }),
  }),
};

// Validate the request parameters (if needed) for deleting a newsletter
const deleteNewsletter = {
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required().messages({
      'string.hex': 'ID must be a valid hexadecimal string.',
      'string.length': 'ID must be 24 characters long.',
      'any.required': 'ID is required.',
    }),
  }),
};

module.exports = {
  createNewsletter,
  deleteNewsletter,
};
