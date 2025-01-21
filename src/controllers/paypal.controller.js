const PaypalService = require('../services/paypal.service');

/**
 * Create a PayPal order
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createOrder = async (req, res) => {
  try {
    const paymentDetails = req.body;
    const order = await PaypalService.createOrder(paymentDetails);
    return res.status(201).json({ message: 'Order created successfully', order }); // Added return to stop further code execution
  } catch (error) {
    return res.status(500).json({ message: `Error creating PayPal order: ${error.message}` });
  }
};

/**
 * Capture PayPal payment
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const capturePayment = async (req, res) => {
  try {
    const { orderId } = req.params;
    const capture = await PaypalService.capturePayment(orderId);
    res.status(200).json({ message: 'Payment captured successfully', capture });
  } catch (error) {
    res.status(500).json({ message: `Error capturing PayPal payment: ${error.message}` });
  }
};

module.exports = {
  createOrder,
  capturePayment,
};
