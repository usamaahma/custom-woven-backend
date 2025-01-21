const express = require('express');
const PaypalController = require('../../controllers/paypal.controller');

const router = express.Router();

// Route for creating a PayPal order
router.post('/create-order', PaypalController.createOrder);

// Route for capturing a PayPal payment
router.get('/capture-payment/:orderId', PaypalController.capturePayment);

module.exports = router;
