// const paypal = require('@paypal/checkout-server-sdk');

// // Create PayPal environment (you can use sandbox or live)
// const environment = new paypal.core.SandboxEnvironment(
//   //   'YOUR_CLIENT_ID', // Your client ID from PayPal developer dashboard
//   //   'YOUR_CLIENT_SECRET' // Your client secret from PayPal developer dashboard
//   'AQs2RJ8Jx0OnQfZsB4band6gLSPTvSfQkbcDfwmG0n-euKPr_9jozZH4H4Mht7t9uvw5RK7WL7jsnS1x', // Your client ID from PayPal developer dashboard
//   'EOMnm-dG-iTkgOUIM3rMqj-g_0MMvcNhZ654FJE-4i2NDP3ub2DMjRsFb5E_9So_e_L6sABAjkI6r46J'
// );
// const client = new paypal.core.PayPalHttpClient(environment);

// /**
//  * Create PayPal order
//  * @param {Object} paymentDetails - Payment details
//  * @returns {Promise<Object>} PayPal order details
//  */
// const createOrder = async (paymentDetails) => {
//   const request = new paypal.orders.OrdersCreateRequest();
//   request.requestBody({
//     intent: 'CAPTURE',
//     purchase_units: [
//       {
//         amount: {
//           currency_code: 'USD',
//           value: paymentDetails.amount,
//         },
//       },
//     ],
//   });

//   try {
//     const order = await client.execute(request);
//     return order.result;
//   } catch (error) {
//     throw new Error('Error creating PayPal order: ' + error.message);
//   }
// };

// /**
//  * Capture payment for a PayPal order
//  * @param {string} orderId - PayPal order ID
//  * @returns {Promise<Object>} Payment capture result
//  */
// const capturePayment = async (orderId) => {
//   const request = new paypal.orders.OrdersCaptureRequest(orderId);
//   request.requestBody({});

//   try {
//     const capture = await client.execute(request);
//     return capture.result;
//   } catch (error) {
//     throw new Error('Error capturing PayPal payment: ' + error.message);
//   }
// };

// module.exports = {
//   createOrder,
//   capturePayment,
// };
