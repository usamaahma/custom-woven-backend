const Joi = require('joi');
const { objectId } = require('./custom.validation');

const create = Joi.object({
  user: Joi.array()
    .items(
      Joi.object({
        userId: Joi.string().custom(objectId).required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phonenumber: Joi.number().required(),
      })
    )
    .required(),
  productName: Joi.string().required(),
  image: Joi.string().uri().required(), // Ensures it's a valid URI
  size: Joi.string().required(),
  turnaround: Joi.string().required(),
});

// Validation for getting a DesignQuote by ID
const get = Joi.object({
  id: Joi.string().custom(objectId).required(),
});

// Validation for updating a DesignQuote
const update = Joi.object({
  id: Joi.string().custom(objectId).required(),
  user: Joi.array().items(
    Joi.object({
      userId: Joi.string().custom(objectId),
      name: Joi.string(),
      email: Joi.string().email(),
      phonenumber: Joi.number(),
    })
  ),
  productName: Joi.string(),
  image: Joi.string().uri(),
  size: Joi.string(),
  turnaround: Joi.string(),
});

// Validation for deleting a DesignQuote
const deleteValidation = Joi.object({
  id: Joi.string().custom(objectId).required(),
});

module.exports = {
  create,
  get,
  update,
  delete: deleteValidation,
};
