const mongoose = require('mongoose');
const validator = require('validator');

// User Schema (used in both CompletedOrder and Checkout)
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

// Address Schema (used in both CompletedOrder and Checkout)
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

// Checkout Product Schema (used in both CompletedOrder and Checkout)
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
    type: Number,
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

// Payment Schema (used in both CompletedOrder and Checkout)
const paymentSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending',
  },
});

// Completed Order Schema
const completedOrderSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Item',
    },
    price: {
      type: Number,
      required: true,
    },
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
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('CompletedOrder', completedOrderSchema);
