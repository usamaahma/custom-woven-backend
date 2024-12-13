const httpStatus = require('http-status');
const Checkout = require('../models/checkout.model'); // Import the Checkout model
const ApiError = require('../utils/ApiError');

/**
 * Create a new checkout
 * @param {Object} checkoutBody - Checkout details
 * @returns {Promise<Checkout>}
 */
const createCheckout = async (checkoutBody) => {
  const checkout = new Checkout(checkoutBody);
  return checkout.save();
};

/**
 * Query checkouts with filters and pagination
 * @param {Object} filter - MongoDB filter object
 * @param {Object} options - Query options (limit, skip, sort)
 * @returns {Promise<Checkout[]>}
 */

const queryCheckouts = async () => {
  const checkouts = await Checkout.find({});
  return checkouts;
};
/**
 * Get a checkout by ID
 * @param {ObjectId} id - Checkout ID
 * @returns {Promise<Checkout>}
 */
const getCheckoutById = async (id) => {
  const checkout = await Checkout.findById(id);
  if (!checkout) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Checkout not found');
  }
  return checkout;
};

/**
 * Update a checkout by ID
 * @param {ObjectId} id - Checkout ID
 * @param {Object} updateBody - Updated fields
 * @returns {Promise<Checkout>}
 */
const updateCheckoutById = async (id, updateBody) => {
  const checkout = await Checkout.findById(id);
  if (!checkout) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Checkout not found');
  }
  Object.assign(checkout, updateBody);
  await checkout.save();
  return checkout;
};

/**
 * Delete a checkout by ID
 * @param {ObjectId} id - Checkout ID
 * @returns {Promise<Checkout>}
 */
const deleteCheckoutById = async (id) => {
  const checkout = await Checkout.findById(id);
  if (!checkout) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Checkout not found');
  }
  await checkout.remove();
  return checkout;
};

module.exports = {
  createCheckout,
  queryCheckouts,
  getCheckoutById,
  updateCheckoutById,
  deleteCheckoutById,
};
