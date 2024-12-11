const httpStatus = require('http-status');
const { PendingCheckout } = require('../models/pendingCheckout.model'); // Import the PendingCheckout model
const ApiError = require('../utils/ApiError'); // Custom API error handler

/**
 * Create a new pending checkout
 * @param {Object} pendingCheckoutBody - Data for the new pending checkout
 * @returns {Promise<PendingCheckout>}
 */
const createPendingCheckout = async (pendingCheckoutBody) => {
  return PendingCheckout.create(pendingCheckoutBody);
};

/**
 * Get all pending checkouts with filtering, pagination, and sorting
 * @param {Object} filter - MongoDB filter
 * @param {Object} options - Query options (pagination, sorting)
 * @returns {Promise<QueryResult>}
 */
const getPendingCheckouts = async (filter, options) => {
  const query = PendingCheckout.find(filter); // Apply filter

  // Apply sorting if provided
  if (options.sortBy) {
    const sort = options.sortBy.split(',').join(' ');
    query.sort(sort);
  }

  // Implement pagination
  const limit = options.limit ? parseInt(options.limit, 10) : 10; // Default limit to 10
  const page = options.page ? parseInt(options.page, 10) : 1; // Default page to 1
  const skip = (page - 1) * limit;

  query.skip(skip).limit(limit);

  // Execute the query and get results
  const data = await query.exec();

  // Get total count of matching documents for pagination metadata
  const totalResults = await PendingCheckout.countDocuments(filter);

  return {
    results: data,
    page,
    limit,
    totalPages: Math.ceil(totalResults / limit),
    totalResults,
  };
};

/**
 * Get a single pending checkout by ID
 * @param {ObjectId} id - Pending checkout ID
 * @returns {Promise<PendingCheckout>}
 */
const getPendingCheckoutById = async (id) => {
  const pendingCheckout = await PendingCheckout.findById(id);
  if (!pendingCheckout) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Pending checkout not found');
  }
  return pendingCheckout;
};

/**
 * Update a pending checkout by ID
 * @param {ObjectId} id - Pending checkout ID
 * @param {Object} updateBody - Data to update
 * @returns {Promise<PendingCheckout>}
 */
const updatePendingCheckoutById = async (id, updateBody) => {
  const pendingCheckout = await PendingCheckout.findById(id);
  if (!pendingCheckout) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Pending checkout not found');
  }
  Object.assign(pendingCheckout, updateBody);
  await pendingCheckout.save();
  return pendingCheckout;
};

/**
 * Delete a pending checkout by ID
 * @param {ObjectId} id - Pending checkout ID
 * @returns {Promise<PendingCheckout>}
 */
const deletePendingCheckoutById = async (id) => {
  const pendingCheckout = await PendingCheckout.findById(id);
  if (!pendingCheckout) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Pending checkout not found');
  }
  await pendingCheckout.remove();
  return pendingCheckout;
};

module.exports = {
  createPendingCheckout,
  getPendingCheckouts,
  getPendingCheckoutById,
  updatePendingCheckoutById,
  deletePendingCheckoutById,
};
