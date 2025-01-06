const Joi = require('joi');
const { objectId } = require('./custom.validation');

// Schema for quantityPrice within a size
const quantityPriceSchema = Joi.object({
  quantity: Joi.number().required(),
  price: Joi.number().required(),
});

// Schema for a size
const sizeSchema = Joi.object({
  _id: Joi.string().custom(objectId).optional(),
  name: Joi.string().required(), // e.g., "S", "M", "L"
  image: Joi.string().uri().optional(),
  quantityPrice: Joi.array().items(quantityPriceSchema).required(),
});

// Schema for a style
const styleSchema = Joi.object({
  _id: Joi.string().custom(objectId).optional(),
  name: Joi.string().required(),
  image: Joi.string().uri().optional(),
  sizes: Joi.array().items(sizeSchema).required(),
});

// Schema for cards inside an option
const cardSchema = Joi.object({
  title: Joi.string().required(),
  image: Joi.string().uri().optional(),
});

// Schema for options
const optionsSchema = Joi.object({
  _id: Joi.string().custom(objectId).optional(),
  type: Joi.string().required(), // e.g., "versions", "proofOptions"
  cards: Joi.array().items(cardSchema).required(),
});

// Schema for a product description
const productDescriptionSchema = Joi.object({
  title: Joi.string().optional(),
  image: Joi.string().uri().optional(),
  descriptions: Joi.string().optional(),
});

// Schema for a single description
const descriptionSchema = Joi.object({
  descriptionTitle: Joi.string().optional(),
  text: Joi.string().optional(),
  images: Joi.array().items(Joi.string().uri()).optional(),
  styles: Joi.array().items(styleSchema).required(),
  options: Joi.array().items(optionsSchema).optional(),
  comments: Joi.string().optional(),
});

// Validation schema for creating a product
const createProduct = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    image: Joi.string().uri().required(),
    descriptions: Joi.array().items(descriptionSchema).required(),
    productDescription: Joi.array().items(productDescriptionSchema).optional(),
  }),
};

// Validation schema for getting products (pagination and sorting)
const getProducts = {
  query: Joi.object().keys({
    sortBy: Joi.string().optional(),
    limit: Joi.number().integer().optional(),
    page: Joi.number().integer().optional(),
  }),
};

// Validation schema for retrieving a single product
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
      title: Joi.string().optional(),
      image: Joi.string().uri().optional(),
      descriptions: Joi.array().items(descriptionSchema).optional(),
      productDescription: Joi.array().items(productDescriptionSchema).optional(),
    })
    .min(1), // Ensures at least one field is updated
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
