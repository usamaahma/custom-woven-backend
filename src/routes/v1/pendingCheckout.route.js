const express = require('express');
const validate = require('../../middlewares/validate');
const pendingCheckoutValidation = require('../../validations/pendingCheckout.validation');
const pendingCheckoutController = require('../../controllers/pendingCheckout.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(pendingCheckoutValidation.createPendingCheckout), pendingCheckoutController.createPendingCheckout)
  .get(pendingCheckoutController.getPendingCheckouts);

router
  .route('/:pendingCheckoutId')
  .get(pendingCheckoutController.getPendingCheckoutById)
  .patch(validate(pendingCheckoutValidation.updatePendingCheckout), pendingCheckoutController.updatePendingCheckoutById)
  .delete(pendingCheckoutController.deletePendingCheckoutById);

module.exports = router;
