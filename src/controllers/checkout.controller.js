// Import services and validation
const httpStatus = require('http-status');
const checkoutService = require('../services/checkout.service');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');

// Create a new Checkout
const createCheckout = catchAsync(async (req, res) => {
  const checkout = await checkoutService.createCheckout(req.body);
  res.status(httpStatus.CREATED).send({ success: true, data: checkout });
});

// Get all Checkouts
const getCheckouts = catchAsync(async (req, res) => {
  const { page, limit, sortBy, ...filterOptions } = req.query;
  const checkouts = await checkoutService.getCheckouts({ page, limit, sortBy, filterOptions });
  res.status(httpStatus.OK).send({ success: true, data: checkouts });
});

// Get a Checkout by ID
const getCheckoutById = catchAsync(async (req, res) => {
  const checkout = await checkoutService.getCheckoutById(req.params.id);
  if (!checkout) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Checkout not found');
  }
  res.status(httpStatus.OK).send({ success: true, data: checkout });
});

// Update a Checkout by ID
const updateCheckout = catchAsync(async (req, res) => {
  const checkout = await checkoutService.updateCheckout(req.params.id, req.body);
  if (!checkout) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Checkout not found');
  }
  res.status(httpStatus.OK).send({ success: true, data: checkout });
});

// Delete a Checkout by ID
const deleteCheckout = catchAsync(async (req, res) => {
  const checkout = await checkoutService.deleteCheckout(req.params.id);
  if (!checkout) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Checkout not found');
  }
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCheckout,
  getCheckouts,
  getCheckoutById,
  updateCheckout,
  deleteCheckout,
};
