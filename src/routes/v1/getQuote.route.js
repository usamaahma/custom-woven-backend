const express = require('express');
const validate = require('../../middlewares/validate');
const getQuoteValidation = require('../../validations/getQuote.validation');
const getQuoteController = require('../../controllers/getQuote.controller');

const router = express.Router();

// Route for creating a new quote and fetching all quotes
router
  .route('/')
  .post(validate(getQuoteValidation.createQuote), getQuoteController.createQuote) // Create a new quote
  .get(getQuoteController.getQuotes); // Get all quotes (with optional filters, if needed)

// Route for handling single quote by ID
router
  .route('/:id')
  .get(validate(getQuoteValidation.getQuoteById), getQuoteController.getQuoteById) // Get a quote by ID
  .patch(validate(getQuoteValidation.updateQuote), getQuoteController.updateQuoteById) // Update a quote by ID
  .delete(validate(getQuoteValidation.deleteQuote), getQuoteController.deleteQuoteById); // Delete a quote by ID

module.exports = router;
