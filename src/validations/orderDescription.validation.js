const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProductDescription = {
  body: Joi.object().keys({
    productId: Joi.string().custom(objectId).required(),
    artworkFile: Joi.string(),
    size: Joi.string(),
    style: Joi.string(),
    versions: Joi.string(),
    proofOptions: Joi.string(),
    turnaroundOptions: Joi.string(),
    backingOptions: Joi.string(),
    metallicThreads: Joi.string(),
    satinMaterialColor: Joi.string(),
    printColors: Joi.string(),
    cottonMaterialColor: Joi.string(),
    pricing: Joi.array().items(
      Joi.object({
        quantity: Joi.number(),
        unitPrice: Joi.number(),
        total: Joi.number(),
      })
    ),
  }),
};

const getProductDescriptions = {
  query: Joi.object().keys({
    product: Joi.string().custom(objectId), // Optional filter for specific product
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProductDescription = {
  params: Joi.object().keys({
    productDescriptionId: Joi.string().custom(objectId).required(),
  }),
};

const updateProductDescription = {
  params: Joi.object().keys({
    productDescriptionId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      artworkFile: Joi.string(),
      size: Joi.string(),
      style: Joi.string(),
      versions: Joi.string(),
      proofOptions: Joi.string(),
      turnaroundOptions: Joi.string(),
      backingOptions: Joi.string(),
      metallicThreads: Joi.string(),
      satinMaterialColor: Joi.string(),
      printColors: Joi.string(),
      cottonMaterialColor: Joi.string(),
      pricing: Joi.array().items(
        Joi.object({
          quantity: Joi.number(),
          unitPrice: Joi.number(),
          total: Joi.number(),
        })
      ),
    })
    .min(1),
};

const deleteProductDescription = {
  params: Joi.object().keys({
    productDescriptionId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createProductDescription,
  getProductDescriptions,
  getProductDescription,
  updateProductDescription,
  deleteProductDescription,
};
