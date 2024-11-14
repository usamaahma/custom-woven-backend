const express = require('express');
const validate = require('../../middlewares/validate');
const getQuoteValidation = require('../../validations/getQuote.validation');
const getQuoteController = require('../../controllers/getQuote.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(getQuoteValidation.createQuote), getQuoteController.createQuote)
  .get(getQuoteController.getQuotes);

router
  .route('/:id')
  .get(validate(getQuoteValidation.getQuoteById), getQuoteController.getQuoteById)
  .patch(validate(getQuoteValidation.updateQuote), getQuoteController.updateQuoteById)
  .delete(validate(getQuoteValidation.deleteQuote), getQuoteController.deleteQuoteById);

module.exports = router;
