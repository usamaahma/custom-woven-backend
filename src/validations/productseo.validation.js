const Joi = require('joi');
const { objectId } = require('./custom.validation');

// FAQ Schema (Array of Objects)
const faqSchema = Joi.array()
  .items(
    Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
    })
  )
  .optional()
  .allow(null);

// Google Shopping Schema
const googleShoppingSchema = Joi.object()
  .keys({
    gtin: Joi.string().optional().allow(null, ''),
    mpn: Joi.string().optional().allow(null, ''),
    brand: Joi.string().optional().allow(null, ''),
    condition: Joi.string().valid('new', 'used', 'refurbished').default('new'),
    availability: Joi.string().valid('in stock', 'out of stock', 'pre-order').default('in stock'),
    price: Joi.number().optional(),
    currency: Joi.string().default('USD'),
    googleCategory: Joi.string().optional().allow(null, ''),
  })
  .optional()
  .allow(null);

// Validation schema for creating a Product SEO entry
const createProductSeo = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    script: Joi.string().optional(),
    productId: Joi.string().custom(objectId).required(),
    faqs: faqSchema,
    googleShopping: googleShoppingSchema,
  }),
};

// Validation schema for getting Product SEO entries
const getProductSeos = {
  query: Joi.object().keys({
    sortBy: Joi.string().optional(),
    limit: Joi.number().integer().optional(),
    page: Joi.number().integer().optional(),
    productId: Joi.string().custom(objectId).optional(),
  }),
};

// Validation schema for retrieving a single Product SEO entry
const getProductSeo = {
  params: Joi.object().keys({
    productSeoId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for updating a Product SEO entry
const updateProductSeo = {
  params: Joi.object().keys({
    productSeoId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().optional(),
      description: Joi.string().optional(),
      script: Joi.string().optional(),
      productId: Joi.string().custom(objectId).optional(),
      faqs: faqSchema,
      googleShopping: googleShoppingSchema,
    })
    .min(1),
};

// Validation schema for deleting a Product SEO entry
const deleteProductSeo = {
  params: Joi.object().keys({
    productSeoId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createProductSeo,
  getProductSeos,
  getProductSeo,
  updateProductSeo,
  deleteProductSeo,
};
