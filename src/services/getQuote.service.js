const GetQuote = require('../models/getQuote.model');

/**
 * Create a new quote
 * @param {Object} quoteBody - Data for the new quote
 * @returns {Promise<GetQuote>}
 */
const createQuote = async (quoteBody) => {
  const newQuote = await GetQuote.create(quoteBody);
  return newQuote;
};

/**
 * Get all quotes with optional filters
 * @param {Object} filter - Filters for retrieving quotes
 * @param {Object} options - Pagination options, sort, etc.
 * @returns {Promise<Array<GetQuote>>}
 */
const getQuotes = async (filter = {}, options = {}) => {
  const quotes = await GetQuote.find(filter).sort(options.sort).limit(options.limit);
  return quotes;
};

/**
 * Get a quote by ID
 * @param {string} id - Quote ID
 * @returns {Promise<GetQuote>}
 */
const getQuoteById = async (id) => {
  const quote = await GetQuote.findById(id);
  return quote;
};

/**
 * Update a quote by ID
 * @param {string} id - Quote ID
 * @param {Object} updateBody - Updated data for the quote
 * @returns {Promise<GetQuote>}
 */
const updateQuoteById = async (id, updateBody) => {
  const quote = await GetQuote.findByIdAndUpdate(id, updateBody, { new: true });
  return quote;
};

/**
 * Delete a quote by ID
 * @param {string} id - Quote ID
 * @returns {Promise<GetQuote>}
 */
const deleteQuoteById = async (id) => {
  const deletedQuote = await GetQuote.findByIdAndDelete(id);
  return deletedQuote;
};

module.exports = {
  createQuote,
  getQuotes,
  getQuoteById,
  updateQuoteById,
  deleteQuoteById,
};
