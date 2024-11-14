const httpStatus = require('http-status');
const { ProductDescription } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a product description
 * @param {Object} productDescriptionBody
 * @returns {Promise<ProductDescription>}
 */
const createProductDescription = async (productDescriptionBody) => {
  return ProductDescription.create(productDescriptionBody);
};

/**
 * Query for product descriptions
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<QueryResult>}
 */
const queryProductDescription = async (filter, options) => {
  return ProductDescription.find(filter, null, options);
};

/**
 * Get product description by ID with populated product data
 * @param {ObjectId} id
 * @returns {Promise<ProductDescription>}
 */
const getProductDescriptionById = async (id) => {
  const productDescription = await ProductDescription.findById(id).populate('product');
  if (!productDescription) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product Description not found');
  }
  return productDescription;
};

/**
 * Update product description by ID
 * @param {ObjectId} productDescriptionId
 * @param {Object} updateBody
 * @returns {Promise<ProductDescription>}
 */
const updateProductDescriptionById = async (productDescriptionId, updateBody) => {
  const productDescription = await getProductDescriptionById(productDescriptionId);
  if (!productDescription) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product Description not found');
  }
  Object.assign(productDescription, updateBody);
  await productDescription.save();
  return productDescription;
};

/**
 * Delete product description by ID
 * @param {ObjectId} productDescriptionId
 * @returns {Promise<ProductDescription>}
 */
const deleteProductDescriptionById = async (productDescriptionId) => {
  const productDescription = await getProductDescriptionById(productDescriptionId);
  if (!productDescription) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product Description not found');
  }
  await productDescription.remove();
  return productDescription;
};

module.exports = {
  createProductDescription,
  queryProductDescription,
  getProductDescriptionById,
  updateProductDescriptionById,
  deleteProductDescriptionById,
};
