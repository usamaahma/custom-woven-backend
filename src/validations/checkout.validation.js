const Joi = require('joi');
const { objectId } = require('./custom.validation');

// Address Validation Schema
const addressSchema = Joi.object({
  firstName: Joi.string().required(),
  middleName: Joi.string().allow(null, ''),
  lastName: Joi.string().required(),
  companyName: Joi.string().allow(null, ''),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required(),
  streetAddress: Joi.string().required(),
  city: Joi.string().required(),
  stateOrProvince: Joi.string().required(),
  zipOrPostalCode: Joi.string().required(),
  country: Joi.string().required(),
});

// Quantity Validation Schema
const quantitySchema = Joi.object({
  quantity: Joi.number().integer().min(1).required(),
  unitPrice: Joi.number().positive().required(),
  total: Joi.number().positive().required(),
});

// Checkout Product Validation Schema
const checkoutProductSchema = Joi.object({
  productName: Joi.string().required(),
  artworkFile: Joi.string().uri().required(),
  size: Joi.string().required(),
  style: Joi.string().required(),
  options: Joi.array().items(Joi.string()).allow(null, []), // Optional array of options
  comments: Joi.string().allow(null, ''), // Optional comments
  quantity: quantitySchema.required(),
  totalPrice: Joi.number().positive().required(),
  qty: Joi.number().integer().min(1).required(),
});

// Payment Validation Schema
const paymentSchema = Joi.object({
  method: Joi.string().valid('PayPal').required(),
  totalAmount: Joi.number().positive().required(),
  currency: Joi.string().default('USD'),
  transactionId: Joi.string().allow(null, ''),
  payerEmail: Joi.string().email().allow(null, ''),
  status: Joi.string().valid('Pending', 'Completed', 'Failed').default('Pending'),
});

// Create Checkout Validation
const createCheckout = {
  body: Joi.object({
    user: Joi.object({
      id: Joi.string().custom(objectId).required(),
      name: Joi.string().min(2).max(100).required(),
      email: Joi.string().email().required(),
      phoneNumber: Joi.string()
        .pattern(/^[0-9]{10,15}$/)
        .required(),
    }).required(),
    billingAddress: addressSchema.required(),
    shippingAddress: addressSchema.required(),
    checkoutProducts: Joi.array().items(checkoutProductSchema).required(),
    payment: paymentSchema.required(),
  }),
};

// Get Checkouts Validation
const getCheckouts = {
  query: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

// Get Checkout by ID Validation
const getCheckoutById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

// Update Checkout Validation
const updateCheckout = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      user: Joi.object({
        id: Joi.string().custom(objectId),
        name: Joi.string().min(2).max(100),
        email: Joi.string().email(),
        phoneNumber: Joi.string().pattern(/^[0-9]{10,15}$/),
      }),
      billingAddress: addressSchema,
      shippingAddress: addressSchema,
      checkoutProducts: Joi.array().items(checkoutProductSchema),
      payment: paymentSchema,
    })
    .min(1), // Require at least one field to update
};

// Delete Checkout Validation
const deleteCheckout = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createCheckout,
  getCheckouts,
  getCheckoutById,
  updateCheckout,
  deleteCheckout,
};
