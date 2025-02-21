const httpStatus = require('http-status');
const { ProductSeo } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a new Product SEO entry
 * @param {Object} seoBody
 * @returns {Promise<ProductSeo>}
 */
const createProductSeo = async (seoBody) => {
  return ProductSeo.create(seoBody);
};

/**
 * Query Product SEO entries with pagination
 * @param {Object} filter - MongoDB filter
 * @param {Object} options - Query options (e.g., pagination, sorting)
 * @returns {Promise<QueryResult>}
 */
const queryProductSeos = async (filter, options) => {
  return ProductSeo.paginate(filter, options);
};

/**
 * Get a Product SEO entry by ID
 * @param {ObjectId} seoId
 * @returns {Promise<ProductSeo>}
 */
const getProductSeoById = async (seoId) => {
  return ProductSeo.findById(seoId);
};

/**
 * Update a Product SEO entry by ID
 * @param {ObjectId} seoId
 * @param {Object} updateBody
 * @returns {Promise<ProductSeo>}
 */
const updateProductSeoById = async (seoId, updateBody) => {
  const seo = await getProductSeoById(seoId);
  if (!seo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product SEO entry not found');
  }
  Object.assign(seo, updateBody);
  await seo.save();
  return seo;
};

/**
 * Delete a Product SEO entry by ID
 * @param {ObjectId} seoId
 * @returns {Promise<ProductSeo>}
 */
const deleteProductSeoById = async (seoId) => {
  const seo = await getProductSeoById(seoId);
  if (!seo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product SEO entry not found');
  }
  await seo.deleteOne();
  return seo;
};

module.exports = {
  createProductSeo,
  queryProductSeos,
  getProductSeoById,
  updateProductSeoById,
  deleteProductSeoById,
};
