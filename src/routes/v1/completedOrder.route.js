const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const completedOrderValidation = require('../../validations/completedOrder.validation'); // Assume you have a validation for completed orders
const completedOrderController = require('../../controllers/completedOrder.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(completedOrderValidation.createCompletedOrder), completedOrderController.createCompletedOrder)
  .get(completedOrderController.getAllCompletedProducts);
router.route('/usercompletedorder').get(completedOrderController.getCompletedOrders);
router
  .route('/:orderId')
  .get(
    auth('getCompletedOrder'),
    validate(completedOrderValidation.getCompletedOrder),
    completedOrderController.getCompletedOrder
  )
  .patch(
    auth('manageCompletedOrder'),
    validate(completedOrderValidation.updateCompletedOrder),
    completedOrderController.updateCompletedOrder
  )
  .delete(
    auth('manageCompletedOrder'),
    validate(completedOrderValidation.deleteCompletedOrder),
    completedOrderController.deleteCompletedOrder
  );

module.exports = router;
