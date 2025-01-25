const Joi = require('joi');
const { objectId } = require('./custom.validation'); // Assuming this exists to validate ObjectId

// Address Validation Schema
const addressSchema = Joi.object({
  firstName: Joi.string().required(),
  middleName: Joi.string().allow(null, ''),
  lastName: Joi.string().required(),
  companyName: Joi.string().allow(null, ''),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone number must be between 10 to 15 digits.',
    }),
  streetAddress: Joi.string().required(),
  city: Joi.string().required(),
  stateOrProvince: Joi.string().required(),
  zipOrPostalCode: Joi.string().required(),
  country: Joi.string().required(),
});

// Checkout Product Validation Schema
const checkoutProductSchema = Joi.object({
  productName: Joi.string().required(),
  artworkFile: Joi.string().uri().required(),
  size: Joi.string().required(),
  style: Joi.string().required(),
  options: Joi.array().items(Joi.string()).allow(null), // Optional array of options
  comments: Joi.string().allow(null), // Optional comments
  quantity: Joi.number().positive().required(),
  totalPrice: Joi.number().positive().required(),
  qty: Joi.number().integer().min(1).required(),
});

// Payment Validation Schema
const paymentSchema = Joi.object({
  status: Joi.string().valid('Pending', 'Completed', 'Failed').default('Pending'),
});

// Create Completed Order Validation Schema
const createCompletedOrder = {
  body: Joi.object({
    itemName: Joi.string().required(),
    itemId: Joi.string().custom(objectId).required(), // Custom ObjectId validator
    price: Joi.number().required().min(0),

    // User Details
    user: Joi.object({
      id: Joi.string().custom(objectId).required(),
      name: Joi.string().min(2).max(100).required(),
      email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format',
      }),
      phoneNumber: Joi.string()
        .pattern(/^[0-9]{10,15}$/)
        .required()
        .messages({
          'string.pattern.base': 'Phone number must be between 10 to 15 digits.',
        }),
    }).required(),

    // Billing Address
    billingAddress: addressSchema.required(),

    // Shipping Address
    shippingAddress: addressSchema.required(),

    // Checkout Products
    checkoutProducts: Joi.array().items(checkoutProductSchema).required(),

    // Payment
    payment: paymentSchema.required(),
  }),
};

// Get Completed Orders Validation
const getCompletedOrders = {
  query: Joi.object().keys({
    userId: Joi.string().custom(objectId), // Optional filtering by userId
  }),
};

// Get Completed Order by ID Validation
const getCompletedOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId).required(),
  }),
};
const getAllCompletedOrders = {
  query: Joi.object().keys({
    // Optional filters can be added here if you want to filter by userId, etc.
    userId: Joi.string().custom(objectId), // Optional filter by userId
  }),
};
// Update Completed Order Validation
const updateCompletedOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      itemName: Joi.string(),
      itemId: Joi.string().custom(objectId),
      price: Joi.number().min(0),
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
    .min(1), // At least one field should be updated
};

// Delete Completed Order Validation
const deleteCompletedOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createCompletedOrder,
  getCompletedOrders,
  getCompletedOrder,
  getAllCompletedOrders,
  updateCompletedOrder,
  deleteCompletedOrder,
};
