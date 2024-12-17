const httpStatus = require('http-status'); // HTTP status codes
const RequestQuote = require('../models/requestquote.model'); // Mongoose model
const ApiError = require('../utils/ApiError'); // Custom error handler (optional)

/**
 * Create a new quote
 * @param {Object} quoteBody - The request body containing quote details
 * @returns {Promise<Object>} Created quote
 */
const createQuote = async (quoteBody) => {
  // Create and save a new quote
  const newQuote = await RequestQuote.create(quoteBody);
  return newQuote;
};

/**
 * Get all quotes with pagination, sorting, and optional search
 * @param {Object} query - Query parameters (page, limit, sortBy, order, search)
 * @returns {Promise<Object>} Paginated quotes data
 */
const getQuotes = async (query) => {
  const { page = 1, limit = 10, sortBy = 'product', order = 'asc', search = '' } = query;

  const sortOrder = order === 'asc' ? 1 : -1; // Ascending or descending order
  const filter = search
    ? { $or: [{ name: { $regex: search, $options: 'i' } }, { product: { $regex: search, $options: 'i' } }] }
    : {};

  const quotes = await RequestQuote.find(filter)
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * limit)
    .limit(parseInt(limit, 10));

  const total = await RequestQuote.countDocuments(filter);

  return {
    data: quotes,
    meta: {
      total,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      totalPages: Math.ceil(total / limit),
    },
  };
};

/**
 * Get a single quote by ID
 * @param {string} id - Quote ID
 * @returns {Promise<Object>} Found quote
 * @throws {Error} If quote is not found
 */
const getQuoteById = async (id) => {
  const quote = await RequestQuote.findById(id);
  if (!quote) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Quote not found');
  }
  return quote;
};

/**
 * Update a quote by ID
 * @param {string} id - Quote ID
 * @param {Object} updateBody - Fields to update
 * @returns {Promise<Object>} Updated quote
 * @throws {Error} If quote is not found
 */
const updateQuote = async (id, updateBody) => {
  const quote = await RequestQuote.findByIdAndUpdate(id, updateBody, { new: true, runValidators: true });
  if (!quote) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Quote not found');
  }
  return quote;
};

/**
 * Delete a quote by ID
 * @param {string} id - Quote ID
 * @returns {Promise<Object>} Deleted quote
 * @throws {Error} If quote is not found
 */
const deleteQuote = async (id) => {
  const quote = await RequestQuote.findByIdAndDelete(id);
  if (!quote) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Quote not found');
  }
  return quote;
};

module.exports = {
  createQuote,
  getQuotes,
  getQuoteById,
  updateQuote,
  deleteQuote,
};
