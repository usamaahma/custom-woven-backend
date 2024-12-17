const getQuoteService = require('../services/getQuote.service');

/**
 * Create a new quote
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createQuote = async (req, res) => {
  try {
    const quote = await getQuoteService.createQuote(req.body);
    res.status(201).json({ message: 'Quote created successfully', quote });
  } catch (error) {
    // console.error('Error creating quote:', error); // Consider removing this in production
    res.status(500).json({ message: `Error creating quote: ${error.message}` });
  }
};

/**
 * Get all quotes with optional filters and pagination
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getQuotes = async (req, res) => {
  try {
    // Handling query parameters for pagination (page, limit, etc.)
    const { page = 1, limit = 10, sort = 'createdAt' } = req.query;
    const options = {
      page: parseInt(page, 10), // Adding radix parameter to parseInt
      limit: parseInt(limit, 10), // Adding radix parameter to parseInt
      sort: { [sort]: -1 }, // Default sorting by creation date in descending order
    };

    const quotes = await getQuoteService.getQuotes({}, options);
    res.status(200).json({ message: 'Quotes retrieved successfully', quotes });
  } catch (error) {
    // console.error('Error fetching quotes:', error); // Consider removing this in production
    res.status(500).json({ message: `Error fetching quotes: ${error.message}` });
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
    res.status(200).json({ message: 'Quote retrieved successfully', quote });
  } catch (error) {
    // console.error('Error fetching quote:', error); // Consider removing this in production
    res.status(500).json({ message: `Error fetching quote: ${error.message}` });
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
      return res.status(404).json({ message: 'Quote not found for updating' });
    }
    res.status(200).json({ message: 'Quote updated successfully', updatedQuote });
  } catch (error) {
    // console.error('Error updating quote:', error); // Consider removing this in production
    res.status(500).json({ message: `Error updating quote: ${error.message}` });
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
      return res.status(404).json({ message: 'Quote not found for deletion' });
    }
    res.status(200).json({ message: 'Quote deleted successfully' });
  } catch (error) {
    // console.error('Error deleting quote:', error); // Consider removing this in production
    res.status(500).json({ message: `Error deleting quote: ${error.message}` });
  }
};

module.exports = {
  createQuote,
  getQuotes,
  getQuoteById,
  updateQuoteById,
  deleteQuoteById,
};
