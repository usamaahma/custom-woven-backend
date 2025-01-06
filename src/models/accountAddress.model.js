const mongoose = require('mongoose');

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

// Main Account Address Schema
const accountAddressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    shippingAddress: {
      type: addressSchema,
      required: true,
    },
    billingAddress: {
      type: addressSchema,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Create the AccountAddress model
const AccountAddress = mongoose.model('AccountAddress', accountAddressSchema);

module.exports.AccountAddress = AccountAddress;
