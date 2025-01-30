// validations/getQuote.validation.js
const Joi = require('joi');
const { objectId } = require('./custom.validation'); // Import objectId validation if required for IDs

// Validation for creating a new quote
const createQuote = {
  body: Joi.object().keys({
    product: Joi.string().required(),
    artwork: Joi.array().required(),
    size: Joi.string().required(),
    quantity: Joi.number().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phonenumber: Joi.number().required(),
    comments: Joi.string().optional(),
  }),
};

// Validation for getting a single quote by ID
const getQuoteById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

// Validation for updating a quote by ID
const updateQuote = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      product: Joi.string(),
      artwork: Joi.string(),
      size: Joi.string().required(),
      quantity: Joi.string(),
      name: Joi.string(),
      email: Joi.string().email(),
      phonenumber: Joi.string(),
      comments: Joi.string(),
    })
    .min(1),
};

// Validation for deleting a quote by ID
const deleteQuote = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createQuote,
  getQuoteById,
  updateQuote,
  deleteQuote,
};
