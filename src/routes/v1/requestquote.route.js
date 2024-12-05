const express = require('express');
const validate = require('../../middlewares/validate'); // Middleware for validation
const quoteValidation = require('../../validations/requestquote.validation'); // Validation schemas
const quoteController = require('../../controllers/requestquote.controller'); // Controller functions

const router = express.Router();

/**
 * Route: /api/requestquotes
 */
router
  .route('/')
  .post(validate(quoteValidation.createQuote), quoteController.createQuote) // Create a new quote
  .get(validate(quoteValidation.getQuotes), quoteController.getQuotes); // Get all quotes

/**
 * Route: /api/requestquotes/:id
 */
router
  .route('/:id')
  .get(validate(quoteValidation.getQuoteById), quoteController.getQuoteById) // Get quote by ID
  .put(validate(quoteValidation.updateQuote), quoteController.updateQuote) // Update quote by ID
  .delete(validate(quoteValidation.deleteQuote), quoteController.deleteQuote); // Delete quote by ID

module.exports = router;
