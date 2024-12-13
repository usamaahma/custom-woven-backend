const mongoose = require('mongoose');
const validator = require('validator');

// User Schema
const userSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email');
      }
    },
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

// Address Schema
const addressSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  stateOrProvince: {
    type: String,
    required: true,
  },
  zipOrPostalCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

// Quantity Schema
const quantitySchema = new mongoose.Schema({
  quantity: {
    type: String,
    required: true,
  },
  unitPrice: {
    type: String,
    required: true,
  },
  total: {
    type: String,
    required: true,
  },
});

// Checkout Product Schema
const checkoutProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  artworkFile: {
    type: String, // File path or URL
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  style: {
    type: String,
    required: true,
  },
  options: {
    type: [String], // Array of option names
    required: false,
  },
  comments: {
    type: String,
    required: false,
  },
  quantity: {
    type: quantitySchema,
    required: true,
  },
  totalPrice: {
    type: String,
    required: true,
  },
  qty: {
    type: String,
    required: true,
  },
});

// Payment Schema
const paymentSchema = new mongoose.Schema({
  method: {
    type: String,
    required: true,
    enum: ['PayPal'], // Only PayPal
    default: 'PayPal',
  },
  totalAmount: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    default: 'USD',
  },
  transactionId: {
    type: String,
    required: false, // Will be set after PayPal returns the response
  },
  payerEmail: {
    type: String,
    required: false, // Optional, can store the payer's email from PayPal
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending',
  },
});

// Checkout Schema
const checkoutSchema = new mongoose.Schema({
  user: {
    type: userSchema,
    required: true,
  },
  billingAddress: {
    type: addressSchema,
    required: true,
  },
  shippingAddress: {
    type: addressSchema,
    required: true,
  },
  checkoutProducts: {
    type: [checkoutProductSchema],
    required: true,
  },
  payment: {
    type: paymentSchema,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the Checkout Model
const Checkout = mongoose.model('Checkout', checkoutSchema);
module.exports = Checkout;
