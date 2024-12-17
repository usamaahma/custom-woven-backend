const Joi = require('joi');
const { objectId } = require('./custom.validation');

// Schema for size within a style
const sizeSchema = Joi.object({
  _id: Joi.string().custom(objectId).optional(),
  name: Joi.string().required(),
  image: Joi.string().uri().optional(),
  quantityPrice: Joi.array()
    .items(
      Joi.object({
        quantity: Joi.number().required(), // Validate that quantity is a number and required
        price: Joi.number().required(), // Validate that price is a number and required
      })
    )
    .required(),
});

// Schema for a style within a description
const styleSchema = Joi.object({
  _id: Joi.string().custom(objectId).optional(),
  name: Joi.string().required(),
  image: Joi.string().uri().optional(),
  sizes: Joi.array().items(sizeSchema).required(),
});

// Schema for an option (used for all types of options)
const optionSchema = Joi.object({
  _id: Joi.string().custom(objectId).optional(),
  type: Joi.string().required(), // e.g., "versions", "proofOptions", etc.
  cards: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required(), // Title for each card
        image: Joi.string().uri().optional(), // Image URL for each card
      })
    )
    .required(), // Ensure at least one card is provided
});

// Schema for a description with styles and options
const descriptionSchema = Joi.object({
  descriptionTitle: Joi.string().optional(),
  text: Joi.string().optional(),
  images: Joi.array().items(Joi.string().uri()).required(),
  styles: Joi.array().items(styleSchema).required(),
  options: Joi.array().items(optionSchema).optional(), // Unified options array
  comments: Joi.string().optional(), // Optional comments field
});

// Validation schema for creating a product
const createProduct = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    image: Joi.string().uri().required(),
    descriptions: Joi.array().items(descriptionSchema).required(),
  }),
};

// Validation schema for getting multiple products with pagination
const getProducts = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

// Validation schema for getting a single product by ID
const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for updating a product
const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      image: Joi.string().uri(),
      descriptions: Joi.array().items(descriptionSchema),
    })
    .min(1), // Ensures at least one field is being updated
};

// Validation schema for deleting a product
const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
