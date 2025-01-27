const httpStatus = require('http-status');
const { Seo } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a new SEO entry
 * @param {Object} seoBody
 * @returns {Promise<Seo>}
 */
const createSeo = async (seoBody) => {
  return Seo.create(seoBody);
};

/**
 * Query SEO entries with pagination
 * @param {Object} filter - MongoDB filter
 * @param {Object} options - Query options (e.g., pagination, sorting)
 * @returns {Promise<QueryResult>}
 */
const querySeos = async (filter, options) => {
  return Seo.paginate(filter, options);
};

/**
 * Get an SEO entry by ID
 * @param {ObjectId} seoId
 * @returns {Promise<Seo>}
 */
const getSeoById = async (seoId) => {
  return Seo.findById(seoId);
};

/**
 * Update an SEO entry by ID
 * @param {ObjectId} seoId
 * @param {Object} updateBody
 * @returns {Promise<Seo>}
 */
const updateSeoById = async (seoId, updateBody) => {
  const seo = await getSeoById(seoId);
  if (!seo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'SEO entry not found');
  }
  Object.assign(seo, updateBody);
  await seo.save();
  return seo;
};

/**
 * Delete an SEO entry by ID
 * @param {ObjectId} seoId
 * @returns {Promise<Seo>}
 */
const deleteSeoById = async (seoId) => {
  const seo = await getSeoById(seoId);
  if (!seo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'SEO entry not found');
  }
  await seo.remove();
  return seo;
};

module.exports = {
  createSeo,
  querySeos,
  getSeoById,
  updateSeoById,
  deleteSeoById,
};
