const getQuoteService = require('../services/getQuote.service');

/**
 * Create a new quote
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createQuote = async (req, res) => {
  try {
    const quote = await getQuoteService.createQuote(req.body);
    res.status(201).json(quote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get all quotes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getQuotes = async (req, res) => {
  try {
    const quotes = await getQuoteService.getQuotes(req.query);
    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get a single quote by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getQuoteById = async (req, res) => {
  try {
    const quote = await getQuoteService.getQuoteById(req.params.id);
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    res.status(200).json(quote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update a quote by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateQuoteById = async (req, res) => {
  try {
    const updatedQuote = await getQuoteService.updateQuoteById(req.params.id, req.body);
    if (!updatedQuote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    res.status(200).json(updatedQuote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete a quote by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteQuoteById = async (req, res) => {
  try {
    const deletedQuote = await getQuoteService.deleteQuoteById(req.params.id);
    if (!deletedQuote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    res.status(200).json({ message: 'Quote deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createQuote,
  getQuotes,
  getQuoteById,
  updateQuoteById,
  deleteQuoteById,
};
