const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { productDescriptionService } = require('../services');

const createProductDescription = catchAsync(async (req, res) => {
  const productDescription = await productDescriptionService.createProductDescription(req.body);
  res.status(httpStatus.CREATED).send(productDescription);
});

const getProductDescriptions = catchAsync(async (req, res) => {
  // Filter only specific fields if needed, like product ID, or allow full query flexibility
  const filter = { product: req.query.product }; // Adjust based on requirements
  const options = {
    limit: parseInt(req.query.limit, 10) || 10,
    page: parseInt(req.query.page, 10) || 1,
  };
  const result = await productDescriptionService.queryProductDescription(filter, options);
  res.send(result);
});

const getProductDescription = catchAsync(async (req, res) => {
  const productDescription = await productDescriptionService.getProductDescriptionById(req.params.productDescriptionId);
  res.send(productDescription);
});

const updateProductDescription = catchAsync(async (req, res) => {
  const productDescription = await productDescriptionService.updateProductDescriptionById(
    req.params.productDescriptionId,
    req.body
  );
  res.send(productDescription);
});

const deleteProductDescription = catchAsync(async (req, res) => {
  await productDescriptionService.deleteProductDescriptionById(req.params.productDescriptionId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProductDescription,
  getProductDescriptions,
  getProductDescription,
  updateProductDescription,
  deleteProductDescription,
};
