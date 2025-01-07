const Joi = require('joi');
const { objectId } = require('./custom.validation'); // Assuming custom objectId validation exists

// Reusable address schema for shipping and billing addresses
const addressSchema = Joi.object({
  firstName: Joi.string().required(),
  middleName: Joi.string().optional(),
  lastName: Joi.string().required(),
  companyName: Joi.string().optional(),
  phoneNumber: Joi.string().required(),
  streetAddress: Joi.string().required(),
  city: Joi.string().required(),
  stateOrProvince: Joi.string().required(),
  zipOrPostalCode: Joi.string().required(),
  country: Joi.string().required(),
});

// Validation schema for AccountAddress
const createAccountAddress = {
  body: Joi.object().keys({
    userId: Joi.string().required().custom(objectId), // Assuming objectId validation for user
    shippingAddress: addressSchema.required(),
    billingAddress: addressSchema.required(),
  }),
};

const getAccountAddresses = {
  query: Joi.object().keys({
    userId: Joi.string().custom(objectId), // Optional filtering by userId
  }),
};

const getAccountAddress = {
  params: Joi.object().keys({
    addressId: Joi.string().custom(objectId), // Get by individual addressId
  }),
};

const updateAccountAddress = {
  params: Joi.object().keys({
    addressId: Joi.string().custom(objectId), // Update by individual addressId
  }),
  body: Joi.object()
    .keys({
      shippingAddress: addressSchema,
      billingAddress: addressSchema,
    })
    .min(1), // At least one field should be updated
};

const deleteAccountAddress = {
  params: Joi.object().keys({
    addressId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createAccountAddress,
  getAccountAddresses,
  getAccountAddress,
  updateAccountAddress,
  deleteAccountAddress,
};
