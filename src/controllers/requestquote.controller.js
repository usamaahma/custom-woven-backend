const catchAsync = require('../utils/catchAsync'); // Wrapper for async error handling
const quoteService = require('../services/requestquote.service');

/**
 * Create a new request quote
 */
const createQuote = catchAsync(async (req, res) => {
  const quote = await quoteService.createQuote(req.body);
  res.status(201).json(quote); // Respond with the created quote
});

/**
 * Get all request quotes with pagination, sorting, and filtering
 */
const getQuotes = catchAsync(async (req, res) => {
  const quotes = await quoteService.getQuotes(req.query);
  res.status(200).json(quotes); // Respond with the paginated quotes
});

/**
 * Get a single request quote by ID
 */
const getQuoteById = catchAsync(async (req, res) => {
  const quote = await quoteService.getQuoteById(req.params.id);
  res.status(200).json(quote); // Respond with the found quote
});

/**
 * Update a request quote by ID
 */
const updateQuote = catchAsync(async (req, res) => {
  const updatedQuote = await quoteService.updateQuote(req.params.id, req.body);
  res.status(200).json(updatedQuote); // Respond with the updated quote
});

/**
 * Delete a request quote by ID
 */
const deleteQuote = catchAsync(async (req, res) => {
  await quoteService.deleteQuote(req.params.id);
  res.status(204).send(); // Respond with no content for successful deletion
});

module.exports = {
  createQuote,
  getQuotes,
  getQuoteById,
  updateQuote,
  deleteQuote,
};
