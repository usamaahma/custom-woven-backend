const httpStatus = require('http-status');
const CompletedOrder = require('../models/completedorder.model'); // Correct model path
const ApiError = require('../utils/ApiError');

/**
 * Create a completed order
 * @param {Object} orderBody
 * @returns {Promise<CompletedOrder>}
 */
const createCompletedOrder = async (orderBody) => {
  try {
    const completedOrder = new CompletedOrder(orderBody);
    await completedOrder.save();
    return completedOrder;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Error creating order: ${error.message}`);
  }
};

/**
 * Query for completed orders by userId
 * @param {ObjectId} userId
 * @returns {Promise<CompletedOrder[]>}
 */
const getCompletedOrdersByUserId = async (userId) => {
  const orders = await CompletedOrder.find({ 'user.id': userId }); // Adjusting to find orders by user id in the 'user' object
  return orders;
};

/**
 * Get a completed order by orderId
 * @param {ObjectId} orderId
 * @returns {Promise<CompletedOrder>}
 */
const getCompletedOrderById = async (orderId) => {
  const order = await CompletedOrder.findById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  return order;
};

/**
 * Update a completed order by orderId
 * @param {ObjectId} orderId
 * @param {Object} updateBody
 * @returns {Promise<CompletedOrder>}
 */
const updateCompletedOrderById = async (orderId, updateBody) => {
  const order = await CompletedOrder.findById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  Object.assign(order, updateBody);
  await order.save();
  return order;
};

/**
 * Delete a completed order by orderId
 * @param {ObjectId} orderId
 * @returns {Promise<CompletedOrder>}
 */
const deleteCompletedOrderById = async (orderId) => {
  const order = await CompletedOrder.findById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  await order.remove();
  return order;
};

module.exports = {
  createCompletedOrder,
  getCompletedOrdersByUserId,
  getCompletedOrderById,
  updateCompletedOrderById,
  deleteCompletedOrderById,
};
