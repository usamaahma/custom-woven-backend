const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');

/**
 * Create a product
 */
const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(req.body);
  res.status(httpStatus.CREATED).send(product);
});

/**
 * Get all products
 */
const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['ProductId', 'status']); // You can add more filters if needed
  const result = await productService.getAllProducts(filter);
  res.send(result);
});

/**
 * Get products by categories or other filters
 */
const getProductsByCategories = catchAsync(async (req, res) => {
  const result = await productService.getAllProducts(req.query); // Pass the query params directly
  res.send(result);
});

/**
 * Get a product by id
 */
const getProduct = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.send(product);
});

/**
 * Update product by id
 */
const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.updateProductById(req.params.productId, req.body);
  res.send(product);
});

/**
 * Delete product by id
 */
const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProductById(req.params.productId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategories,
};
