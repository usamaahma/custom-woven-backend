const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productsService } = require('../services');

const createProducts = catchAsync(async (req, res) => {
  const product = await productsService.createProducts(req.body);
  res.status(httpStatus.CREATED).send(product);
});

const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['CategoryId', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productsService.queryProducts(filter, options);
  res.send(result);
});

const getProductsByCategories = catchAsync(async (req, res) => {
  const result = await productsService.getProducts(req);
  res.send(result);
});

const getProduct = catchAsync(async (req, res) => {
  const product = await productsService.getProductById(req.params.productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(product);
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await productsService.updateProductById(req.params.productId, req.body);
  res.send(product);
});

const deleteProduct = catchAsync(async (req, res) => {
  await productsService.deleteProductById(req.params.productId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProducts,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategories,
};
