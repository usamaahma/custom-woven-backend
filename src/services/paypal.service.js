const paypal = require('@paypal/checkout-server-sdk');
require('dotenv').config();

// Create PayPal environment (you can use sandbox or live)
const environment = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);
const client = new paypal.core.PayPalHttpClient(environment);

/**
 * Create PayPal order
 * @param {Object} paymentDetails - Payment details
 * @returns {Promise<Object>} PayPal order details
 */
const createOrder = async (paymentDetails) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: paymentDetails.amount,
        },
      },
    ],
  });

  try {
    const order = await client.execute(request);
    return order.result;
  } catch (error) {
    throw new Error(`Error creating PayPal order: ${error.message}`);
  }
};

/**
 * Capture payment for a PayPal order
 * @param {string} orderId - PayPal order ID
 * @returns {Promise<Object>} Payment capture result
 */
const capturePayment = async (orderId) => {
  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const capture = await client.execute(request);
    return capture.result;
  } catch (error) {
    throw new Error(`Error capturing PayPal payment: ${error.message}`);
  }
};

module.exports = {
  createOrder,
  capturePayment,
};
