const Joi = require('joi');
const { objectId } = require('./custom.validation'); // Assuming you have a custom objectId validator

// Validation for creating a QuoteRequest
const createQuoteRequest = {
  body: Joi.object().keys({
    image: Joi.string().uri().required().messages({
      'string.uri': 'Image must be a valid URL or URI.',
    }),
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string()
      .pattern(/^[0-9]{10,15}$/)
      .required()
      .messages({
        'string.pattern.base': 'Phone number must be between 10 to 15 digits.',
      }),
    width: Joi.number().greater(0).required(),
    height: Joi.number().greater(0).required(),
    paperWeight: Joi.string().required(),
    paperFinish: Joi.string().required(),
    printOption: Joi.string().required(),
    holePunchPosition: Joi.string().required(),
    embossOrDeboss: Joi.string().required(),
    roundCorner: Joi.string().required(), // Updated to String
    uvSpotGloss: Joi.string().required(), // Updated to String
    metallicFoilColor: Joi.string().max(50).required(),
    stringColor: Joi.string().max(50).required(),
    safetyColor: Joi.string().max(50).required(),
    holeGrommet: Joi.string().required(), // Updated to String
    proofOptions: Joi.string().required(),
    quantity: Joi.number().min(1).required(),
    comments: Joi.string().max(500).optional(),
  }),
};

// Validation for getting all QuoteRequests
const getQuoteRequests = {
  query: Joi.object().keys({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phoneNumber: Joi.string()
      .pattern(/^[0-9]{10,15}$/)
      .messages({
        'string.pattern.base': 'Phone number must be between 10 to 15 digits.',
      })
      .optional(),
    sortBy: Joi.string().optional(),
    limit: Joi.number().integer().optional(),
    page: Joi.number().integer().optional(),
  }),
};

// Validation for getting a single QuoteRequest by ID
const getQuoteRequest = {
  params: Joi.object().keys({
    quoteRequestId: Joi.string().custom(objectId).required(),
  }),
};

// Validation for updating a QuoteRequest by ID
const updateQuoteRequest = {
  params: Joi.object().keys({
    quoteRequestId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      image: Joi.string().uri().messages({
        'string.uri': 'Image must be a valid URL or URI.',
      }),
      name: Joi.string().min(2).max(100),
      email: Joi.string().email(),
      phoneNumber: Joi.string()
        .pattern(/^[0-9]{10,15}$/)
        .messages({
          'string.pattern.base': 'Phone number must be between 10 to 15 digits.',
        }),
      width: Joi.number().greater(0),
      height: Joi.number().greater(0),
      paperWeight: Joi.string(),
      paperFinish: Joi.string(),
      printOption: Joi.string(),
      holePunchPosition: Joi.string(),
      embossOrDeboss: Joi.string(),
      roundCorner: Joi.string(), // Updated to String
      uvSpotGloss: Joi.string(), // Updated to String
      metallicFoilColor: Joi.string().max(50),
      stringColor: Joi.string().max(50),
      safetyColor: Joi.string().max(50),
      holeGrommet: Joi.string(), // Updated to String
      proofOptions: Joi.string(),
      quantity: Joi.number().min(1),
      comments: Joi.string().max(500),
    })
    .min(1), // Ensures at least one field is provided
};

// Validation for deleting a QuoteRequest by ID
const deleteQuoteRequest = {
  params: Joi.object().keys({
    quoteRequestId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createQuoteRequest,
  getQuoteRequests,
  getQuoteRequest,
  updateQuoteRequest,
  deleteQuoteRequest,
};
