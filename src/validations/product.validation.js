const Joi = require('joi');
const { objectId } = require('./custom.validation'); // Assuming objectId validation is available

// Validation schema for creating a request quote
const createRequestQuote = {
  body: Joi.object().keys({
    image: Joi.string().uri().required().messages({
      'string.uri': 'Image must be a valid URL.',
      'any.required': 'Image is required.',
    }),
    name: Joi.string().trim().required().messages({
      'any.required': 'Name is required.',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Email must be valid.',
      'any.required': 'Email is required.',
    }),
    phoneNumber: Joi.string()
      .pattern(/^\+?[0-9\s-]+$/)
      .required()
      .messages({
        'string.pattern.base': 'Phone number is not valid.',
        'any.required': 'Phone number is required.',
      }),
    width: Joi.number().min(1).required().messages({
      'number.min': 'Width must be at least 1.',
      'any.required': 'Width is required.',
    }),
    height: Joi.number().min(1).required().messages({
      'number.min': 'Height must be at least 1.',
      'any.required': 'Height is required.',
    }),
    paperWeight: Joi.string().valid('80gsm', '120gsm', '160gsm').required().messages({
      'any.only': 'Paper weight must be 80gsm, 120gsm, or 160gsm.',
      'any.required': 'Paper weight is required.',
    }),
    paperFinish: Joi.string().valid('Glossy', 'Matte', 'Textured').required().messages({
      'any.only': 'Paper finish must be Glossy, Matte, or Textured.',
      'any.required': 'Paper finish is required.',
    }),
    printOption: Joi.string().valid('Full Color', 'Black & White').required().messages({
      'any.only': 'Print option must be Full Color or Black & White.',
      'any.required': 'Print option is required.',
    }),
    holePunchPosition: Joi.string().valid('Top Center', 'Left Side', 'Right Side').required().messages({
      'any.only': 'Hole punch position must be Top Center, Left Side, or Right Side.',
      'any.required': 'Hole punch position is required.',
    }),
    embossOrDeboss: Joi.string().valid('Emboss', 'Deboss').required().messages({
      'any.only': 'Value must be Emboss or Deboss.',
      'any.required': 'This field is required.',
    }),
    roundCorner: Joi.boolean().required(),
    uvSpotGloss: Joi.boolean().required(),
    metallicFoilColor: Joi.string().trim().required(),
    stringColor: Joi.string().trim().required(),
    safetyColor: Joi.string().trim().required(),
    holeGrommet: Joi.boolean().required(),
    proofOptions: Joi.string().valid('Digital', 'Physical', 'None').required().messages({
      'any.only': 'Proof option must be Digital, Physical, or None.',
      'any.required': 'Proof option is required.',
    }),
    quantity: Joi.number().min(1).required().messages({
      'number.min': 'Quantity must be at least 1.',
      'any.required': 'Quantity is required.',
    }),
    comments: Joi.string().trim().optional(),
  }),
};

// Validation schema for getting a request quote by ID
const getRequestQuote = {
  params: Joi.object().keys({
    requestQuoteId: Joi.string().custom(objectId).required(),
  }),
};

const getRequestQuotes = {
  query: Joi.object().keys({
    sortBy: Joi.string()
      .valid('name', 'email', 'createdAt', 'updatedAt') // Allow sorting by specific fields
      .optional()
      .messages({
        'any.only': 'Sort by must be name, email, createdAt, or updatedAt.',
      }),
    limit: Joi.number().integer().min(1).optional().messages({
      'number.base': 'Limit must be a number.',
      'number.min': 'Limit must be at least 1.',
    }),
    page: Joi.number().integer().min(1).optional().messages({
      'number.base': 'Page must be a number.',
      'number.min': 'Page must be at least 1.',
    }),
  }),
};

// Validation schema for updating a request quote
const updateRequestQuote = {
  params: Joi.object().keys({
    requestQuoteId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      image: Joi.string().uri(),
      name: Joi.string().trim(),
      email: Joi.string().email(),
      phoneNumber: Joi.string().pattern(/^\+?[0-9\s-]+$/), // Fixed: Removed unnecessary escape character for '-'
      width: Joi.number().min(1),
      height: Joi.number().min(1),
      paperWeight: Joi.string().valid('80gsm', '120gsm', '160gsm'),
      paperFinish: Joi.string().valid('Glossy', 'Matte', 'Textured'),
      printOption: Joi.string().valid('Full Color', 'Black & White'),
      holePunchPosition: Joi.string().valid('Top Center', 'Left Side', 'Right Side'),
      embossOrDeboss: Joi.string().valid('Emboss', 'Deboss'),
      roundCorner: Joi.boolean(),
      uvSpotGloss: Joi.boolean(),
      metallicFoilColor: Joi.string().trim(),
      stringColor: Joi.string().trim(),
      safetyColor: Joi.string().trim(),
      holeGrommet: Joi.boolean(),
      proofOptions: Joi.string().valid('Digital', 'Physical', 'None'),
      quantity: Joi.number().min(1),
      comments: Joi.string().trim(),
    })
    .min(1), // Ensure at least one field is being updated
};

// Validation schema for deleting a request quote
const deleteRequestQuote = {
  params: Joi.object().keys({
    requestQuoteId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createRequestQuote,
  getRequestQuotes,
  getRequestQuote,
  updateRequestQuote,
  deleteRequestQuote,
};
