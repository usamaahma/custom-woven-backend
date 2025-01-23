const Joi = require('joi');
const { objectId } = require('./custom.validation'); // Assuming custom objectId validation exists

// Validation schema for CompletedOrder
const createCompletedOrder = {
  body: Joi.object().keys({
    itemName: Joi.string().required(), // Item name is required
    itemId: Joi.string().required().custom(objectId), // Item ID is required and should be a valid ObjectId
    price: Joi.number().required().min(0), // Price is required and should be a positive number
    userId: Joi.string().required().custom(objectId), // User ID is required and should be a valid ObjectId
  }),
};

const getCompletedOrders = {
  query: Joi.object().keys({
    userId: Joi.string().custom(objectId), // Optional filtering by userId
  }),
};

const getCompletedOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId), // Get by individual orderId
  }),
};

const updateCompletedOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId), // Update by individual orderId
  }),
  body: Joi.object()
    .keys({
      itemName: Joi.string(),
      itemId: Joi.string().custom(objectId),
      price: Joi.number().min(0),
      userId: Joi.string().custom(objectId),
    })
    .min(1), // At least one field should be updated
};

const deleteCompletedOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId), // Delete by individual orderId
  }),
};

module.exports = {
  createCompletedOrder,
  getCompletedOrders,
  getCompletedOrder,
  updateCompletedOrder,
  deleteCompletedOrder,
};
