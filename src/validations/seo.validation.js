const Joi = require('joi');
const { objectId } = require('./custom.validation');

// Validation schema for creating an SEO entry
const createSeo = {
  body: Joi.object().keys({
    title: Joi.string().required(), // Title for SEO (required)
    description: Joi.string().required(), // Meta description (required)
    script: Joi.string().optional(), // Custom script (optional)
    productId: Joi.string().custom(objectId).required(), // Product ID (required)
  }),
};

// Validation schema for getting SEO entries (pagination and sorting)
const getSeos = {
  query: Joi.object().keys({
    sortBy: Joi.string().optional(), // Sorting field
    limit: Joi.number().integer().optional(), // Number of results per page
    page: Joi.number().integer().optional(), // Page number
    productId: Joi.string().custom(objectId).optional(), // Filter by productId
  }),
};

// Validation schema for retrieving a single SEO entry
const getSeo = {
  params: Joi.object().keys({
    seoId: Joi.string().custom(objectId).required(), // SEO ID (required)
  }),
};

// Validation schema for updating an SEO entry
const updateSeo = {
  params: Joi.object().keys({
    seoId: Joi.string().custom(objectId).required(), // SEO ID (required)
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().optional(), // Title (optional)
      description: Joi.string().optional(), // Meta description (optional)
      script: Joi.string().optional(), // Script (optional)
      productId: Joi.string().custom(objectId).optional(), // Product ID (optional)
    })
    .min(1), // At least one field must be updated
};

// Validation schema for deleting an SEO entry
const deleteSeo = {
  params: Joi.object().keys({
    seoId: Joi.string().custom(objectId).required(), // SEO ID (required)
  }),
};

module.exports = {
  createSeo,
  getSeos,
  getSeo,
  updateSeo,
  deleteSeo,
};
