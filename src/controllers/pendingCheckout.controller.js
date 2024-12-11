const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const pendingCheckoutService = require('../services/pendingCheckout.service');

/**
 * Create a new pending checkout
 */
const createPendingCheckout = catchAsync(async (req, res) => {
  const pendingCheckout = await pendingCheckoutService.createPendingCheckout(req.body);
  res.status(httpStatus.CREATED).send(pendingCheckout);
});

/**
 * Get all pending checkouts
 */
const getPendingCheckouts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['userId', 'productName', 'size', 'style']); // Filterable fields
  const options = pick(req.query, ['sortBy', 'limit', 'page']); // Pagination and sorting
  const result = await pendingCheckoutService.getPendingCheckouts(filter, options);
  res.send(result);
});

/**
 * Get a pending checkout by ID
 */
const getPendingCheckoutById = catchAsync(async (req, res) => {
  const pendingCheckout = await pendingCheckoutService.getPendingCheckoutById(req.params.pendingCheckoutId);
  if (!pendingCheckout) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Pending checkout not found');
  }
  res.send(pendingCheckout);
});

/**
 * Update a pending checkout by ID
 */
const updatePendingCheckoutById = catchAsync(async (req, res) => {
  const pendingCheckout = await pendingCheckoutService.updatePendingCheckoutById(req.params.pendingCheckoutId, req.body);
  res.send(pendingCheckout);
});

/**
 * Delete a pending checkout by ID
 */
const deletePendingCheckoutById = catchAsync(async (req, res) => {
  await pendingCheckoutService.deletePendingCheckoutById(req.params.pendingCheckoutId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPendingCheckout,
  getPendingCheckouts,
  getPendingCheckoutById,
  updatePendingCheckoutById,
  deletePendingCheckoutById,
};
