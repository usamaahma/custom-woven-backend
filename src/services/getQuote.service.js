const GetQuote = require('../models/getQuote.model');

/**
 * Create a new quote
 * @param {Object} quoteBody - Data for the new quote
 * @returns {Promise<GetQuote>}
 */
const createQuote = async (quoteBody) => {
  try {
    const newQuote = await GetQuote.create(quoteBody);
    return newQuote;
  } catch (error) {
    throw new Error(`Error creating quote: ${error.message}`);
  }
};

/**
 * Get all quotes with optional filters and pagination
 * @param {Object} filter - Filters for retrieving quotes (optional)
 * @param {Object} options - Pagination options (limit, skip, sort, etc.)
 * @returns {Promise<Array<GetQuote>>}
 */
const getQuotes = async (filter = {}, options = {}) => {
  try {
    const quotes = await GetQuote.find(filter)
      .sort(options.sort || {})
      .skip(options.skip || 0) // for pagination (skip items)
      .limit(options.limit || 10); // for pagination (limit items per page)
    return quotes;
  } catch (error) {
    throw new Error(`Error fetching quotes: ${error.message}`);
  }
};

/**
 * Get a quote by ID
 * @param {string} id - Quote ID
 * @returns {Promise<GetQuote>}
 */
const getQuoteById = async (id) => {
  try {
    const quote = await GetQuote.findById(id);
    if (!quote) throw new Error('Quote not found');
    return quote;
  } catch (error) {
    throw new Error(`Error fetching quote: ${error.message}`);
  }
};

/**
 * Update a quote by ID
 * @param {string} id - Quote ID
 * @param {Object} updateBody - Updated data for the quote
 * @returns {Promise<GetQuote>}
 */
const updateQuoteById = async (id, updateBody) => {
  try {
    const quote = await GetQuote.findByIdAndUpdate(id, updateBody, { new: true });
    if (!quote) throw new Error('Quote not found for updating');
    return quote;
  } catch (error) {
    throw new Error(`Error updating quote: ${error.message}`);
  }
};

/**
 * Delete a quote by ID
 * @param {string} id - Quote ID
 * @returns {Promise<GetQuote>}
 */
const deleteQuoteById = async (id) => {
  try {
    const deletedQuote = await GetQuote.findByIdAndDelete(id);
    if (!deletedQuote) throw new Error('Quote not found for deletion');
    return deletedQuote;
  } catch (error) {
    throw new Error(`Error deleting quote: ${error.message}`);
  }
};

module.exports = {
  createQuote,
  getQuotes,
  getQuoteById,
  updateQuoteById,
  deleteQuoteById,
};
