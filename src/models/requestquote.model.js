const mongoose = require('mongoose');

const requestQuoteSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
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
      validate: {
        // Use method shorthand for the validator function
        validator(v) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      validate: {
        // Use method shorthand for the validator function
        validator(v) {
          return /^\+?[0-9\s-]+$/.test(v); // Removed unnecessary escape character
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    width: {
      type: Number,
      required: true,
      min: [1, 'Width must be at least 1.'],
    },
    height: {
      type: Number,
      required: true,
      min: [1, 'Height must be at least 1.'],
    },
    paperWeight: {
      type: String,
      required: true,
    },
    paperFinish: {
      type: String,
      required: true,
    },
    printOption: {
      type: String,
      required: true,
    },
    holePunchPosition: {
      type: String,
      required: true,
    },
    embossOrDeboss: {
      type: String,
      required: true,
    },
    roundCorner: {
      type: String,
      required: true,
    },
    uvSpotGloss: {
      type: String,
      required: true,
    },
    metallicFoilColor: {
      type: String,
      required: true,
    },
    stringColor: {
      type: String,
      required: true,
    },
    safetyColor: {
      type: String,
      required: true,
    },
    holeGrommet: {
      type: String,
      required: true,
    },
    proofOptions: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    comments: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const RequestQuote = mongoose.model('RequestQuote', requestQuoteSchema);

module.exports = RequestQuote;
