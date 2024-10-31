const httpStatus = require('http-status');
const { Products } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} productBody
 * @returns {Promise<Products>}
 */
const createProducts = async (productBody) => {
  try {
    return await Products.create(productBody);
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Product creation failed');
  }
};

const getProducts = async (req) => {
  const { page = 1, limit = 10 } = req.query;
  const p = parseInt(page, 10);
  const l = parseInt(limit, 10);

  const total = await Products.find().count();

  const results = await Products.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: 'CategoryId',
        foreignField: '_id',
        as: 'category',
      },
    },
  ])
    .skip((p - 1) * l)
    .limit(l);

  const data = { totalResults: total, limit: l, page: p, results: results || [] };
  return data;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryProducts = async (filter, options) => {
  const products = await Products.paginate(filter, options);
  return products;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<Products>}
 */
const getProductById = async (id) => {
  return Products.findById(id);
};

/**
 * Update user by id
 * @param {ObjectId} productId
 * @param {Object} updateBody
 * @returns {Promise<Products>}
 */
const updateProductById = async (productId, updateBody) => {
  const Product = await getProductById(productId);
  if (!Product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  Object.assign(Product, updateBody);
  await Product.save();
  return Product;
};

/**
 * Delete user by id
 * @param {ObjectId} productId
 * @returns {Promise<Products>}
 */
const deleteProductById = async (productId) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await product.remove();
  return product;
};

module.exports = {
  createProducts,
  queryProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  getProducts,
};
