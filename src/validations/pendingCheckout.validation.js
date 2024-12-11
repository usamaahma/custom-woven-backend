const Joi = require('joi');
const { objectId } = require('./custom.validation');

// Validation for Options Schema
const optionsSchema = Joi.object({
  title: Joi.string().required(), // Title for each option card
  value: Joi.string().required(), // Value or image URL for the option
});
const optionsArraySchema = Joi.array().items(optionsSchema).required(); // Ensure this array is required

// Validation for QuantityPrice Schema
const quantityPriceSchema = Joi.array().items(
  Joi.object({
    quantity: Joi.number().integer().min(1).required(), // Quantity should be a positive integer
    price: Joi.number().positive().required(), // Price should be a positive number
  })
);

// Create PendingCheckout Validation
const createPendingCheckout = {
  body: Joi.object({
    user: Joi.array()
      .items(
        Joi.object({
          userId: Joi.string().custom(objectId).required(), // Must be a valid ObjectId
          name: Joi.string().min(2).max(100).required(), // Name between 2 to 100 chars
          email: Joi.string().email().required(), // Valid email
          phonenumber: Joi.number().integer().min(1000000000).required(), // 10+ digit phone number
        })
      )
      .required(),
    pendingCheckout: Joi.array()
      .items(
        Joi.object({
          productName: Joi.string().min(1).max(255).required(), // Product name required
          artwork: Joi.string().uri().required(), // Valid URI for artwork
          options: optionsArraySchema, // Updated Options validation
          size: Joi.string().min(1).required(), // Required size
          style: Joi.string().min(1).required(), // Required style
          quantityPrice: quantityPriceSchema, // Quantity-Price validation
          comments: Joi.string().max(1000).allow(null, ''), // Optional comments
        })
      )
      .required(),
  }),
};
// Get PendingCheckouts Validation
const getPendingCheckouts = {
  query: Joi.object().keys({
    productName: Joi.string(), // Filter by product name
    userId: Joi.string().custom(objectId), // Filter by userId
    sortBy: Joi.string(), // Sorting options
    limit: Joi.number().integer(), // Limit number of results
    page: Joi.number().integer(), // Page number
  }),
};

// Get PendingCheckout by ID Validation
const getPendingCheckoutById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(), // ID of the PendingCheckout
  }),
};

// Update PendingCheckout Validation
const updatePendingCheckout = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(), // ID of the PendingCheckout to update
  }),
  body: Joi.object()
    .keys({
      user: Joi.array().items(
        Joi.object({
          userId: Joi.string().custom(objectId),
          name: Joi.string().min(2).max(100),
          email: Joi.string().email(),
          phonenumber: Joi.number().integer().min(1000000000),
        })
      ),
      pendingCheckout: Joi.array().items(
        Joi.object({
          productName: Joi.string().min(2).max(255),
          artwork: Joi.string(),
          options: optionsSchema,
          size: Joi.string().min(1),
          style: Joi.string().min(1),
          quantityPrice: quantityPriceSchema,
          comments: Joi.string().max(1000).allow(null, ''),
        })
      ),
    })
    .min(1), // Require at least one field to update
};

// Delete PendingCheckout Validation
const deletePendingCheckout = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(), // ID of the PendingCheckout to delete
  }),
};

module.exports = {
  createPendingCheckout,
  getPendingCheckouts,
  getPendingCheckoutById,
  updatePendingCheckout,
  deletePendingCheckout,
};
