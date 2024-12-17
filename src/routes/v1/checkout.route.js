const express = require('express');
const validate = require('../../middlewares/validate');
const checkoutValidation = require('../../validations/checkout.validation');
const checkoutController = require('../../controllers/checkout.controller');

const router = express.Router();

// Route for creating a new checkout and fetching all checkouts
router
  .route('/')
  .post(validate(checkoutValidation.createCheckout), checkoutController.createCheckout) // Create a new checkout
  .get(validate(checkoutValidation.getCheckouts), checkoutController.getCheckouts); // Get all checkouts

// Route for handling a single checkout by ID
router
  .route('/:id')
  .get(validate(checkoutValidation.getCheckoutById), checkoutController.getCheckoutById) // Get a checkout by ID
  .patch(validate(checkoutValidation.updateCheckout), checkoutController.updateCheckout) // Update a checkout by ID
  .delete(validate(checkoutValidation.deleteCheckout), checkoutController.deleteCheckout); // Delete a checkout by ID

module.exports = router;
