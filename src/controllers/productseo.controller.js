const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { ProductSeoService } = require('../services');
const ApiError = require('../utils/ApiError');

/**
 * Create a new Product SEO entry
 */
const createProductSeo = catchAsync(async (req, res) => {
  const productSeo = await ProductSeoService.createProductSeo(req.body);
  res.status(httpStatus.CREATED).send(productSeo);
});

/**
 * Get all Product SEO entries with pagination
 */
const getProductSeos = catchAsync(async (req, res) => {
  const result = await ProductSeoService.queryProductSeos(req.query, req.query);
  res.send(result);
});

/**
 * Get a single Product SEO entry by ID
 */
const getProductSeo = catchAsync(async (req, res) => {
  const productSeo = await ProductSeoService.getProductSeoById(req.params.seoId);
  if (!productSeo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product SEO entry not found');
  }
  res.send(productSeo);
});

/**
 * Update a Product SEO entry by ID
 */
const updateProductSeo = catchAsync(async (req, res) => {
  const updatedProductSeo = await ProductSeoService.updateProductSeoById(req.params.seoId, req.body);
  res.send(updatedProductSeo);
});

/**
 * Delete a Product SEO entry by ID
 */
const deleteProductSeo = catchAsync(async (req, res) => {
  await ProductSeoService.deleteProductSeoById(req.params.seoId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProductSeo,
  getProductSeos,
  getProductSeo,
  updateProductSeo,
  deleteProductSeo,
};
