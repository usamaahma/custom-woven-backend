const httpStatus = require('http-status');
const { Product } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a product
 * @param {Object} productBody
 * @returns {Promise<Product>}
 */
const createProduct = async (productBody) => {
  try {
    return await Product.create(productBody);
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Product creation failed');
  }
};

/**
 * Get all products with optional aggregation and pagination
 * @param {Object} filter - MongoDB filter
 * @returns {Promise<Object>}
 */
const getAllProducts = async (filter = {}) => {
  const results = await Product.aggregate([
    {
      $lookup: {
        from: 'products', // Ensure this matches the correct collection name
        localField: '_id',
        foreignField: '_id',
        as: 'productDetails',
      },
    },
    { $match: filter },
  ]);

  const total = results.length;
  const data = {
    totalResults: total,
    results: results || [],
  };
  return data;
};

/**
 * Query for products with pagination
 * @param {Object} filter - MongoDB filter
 * @param {Object} options - Query options
 * @returns {Promise<Object>}
 */
const queryProducts = async (filter, options) => {
  const products = await Product.paginate(filter, options);
  return products;
};

/**
 * Get product by id
 * @param {ObjectId} id
 * @returns {Promise<Product>}
 */
const getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  return product;
};

/**
 * Update product by id
 * @param {ObjectId} productId
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const updateProductById = async (productId, updateBody) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  Object.assign(product, updateBody);
  await product.save();
  return product;
};

/**
 * Delete product by id
 * @param {ObjectId} productId
 * @returns {Promise<Product>}
 */
const deleteProductById = async (productId) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  await product.remove();
  return product;
};

module.exports = {
  createProduct,
  getAllProducts,
  queryProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
