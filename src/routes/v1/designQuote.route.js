const express = require('express');
const validate = require('../../middlewares/validate');
const designQuoteValidation = require('../../validations/designQuote.validation');
const designQuoteController = require('../../controllers/designQuote.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(designQuoteValidation.create), designQuoteController.create)
  .get(designQuoteController.getAll);

router
  .route('/:id')
  .get(validate(designQuoteValidation.get), designQuoteController.getById)
  .patch(validate(designQuoteValidation.update), designQuoteController.update)
  .delete(validate(designQuoteValidation.delete), designQuoteController.delete);

module.exports = router;
