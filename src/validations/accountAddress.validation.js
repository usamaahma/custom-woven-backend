const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createAccountAddress = {
  body: Joi.object().keys({
    userId: Joi.string().required().custom(objectId), // User ID is mandatory
    shippingAddress: Joi.object()
      .keys({
        firstName: Joi.string().required(),
        middleName: Joi.string().allow(null, ''),
        lastName: Joi.string().required(),
        companyName: Joi.string().allow(null, ''),
        phoneNumber: Joi.string()
          .pattern(/^[0-9]{10,15}$/)
          .required()
          .messages({
            'string.pattern.base': 'Phone number must be between 10 to 15 digits.',
          }),
        streetAddress: Joi.string().required(),
        city: Joi.string().required(),
        stateOrProvince: Joi.string().required(),
        zipOrPostalCode: Joi.string().required(),
        country: Joi.string().required(),
      })
      .required(),
    billingAddress: Joi.object()
      .keys({
        firstName: Joi.string().required(),
        middleName: Joi.string().allow(null, ''),
        lastName: Joi.string().required(),
        companyName: Joi.string().allow(null, ''),
        phoneNumber: Joi.string()
          .pattern(/^[0-9]{10,15}$/)
          .required()
          .messages({
            'string.pattern.base': 'Phone number must be between 10 to 15 digits.',
          }),
        streetAddress: Joi.string().required(),
        city: Joi.string().required(),
        stateOrProvince: Joi.string().required(),
        zipOrPostalCode: Joi.string().required(),
        country: Joi.string().required(),
      })
      .required(),
  }),
};

const getAccountAddressByUserId = {
  params: Joi.object().keys({
    userId: Joi.string().required().custom(objectId), // Validate userId
  }),
};

const updateAccountAddress = {
  params: Joi.object().keys({
    addressId: Joi.string().required().custom(objectId), // Validate addressId for updating
  }),
  body: Joi.object()
    .keys({
      shippingAddress: Joi.object().keys({
        firstName: Joi.string(),
        middleName: Joi.string().allow(null, ''),
        lastName: Joi.string(),
        companyName: Joi.string().allow(null, ''),
        phoneNumber: Joi.string()
          .pattern(/^[0-9]{10,15}$/)
          .messages({
            'string.pattern.base': 'Phone number must be between 10 to 15 digits.',
          }),
        streetAddress: Joi.string(),
        city: Joi.string(),
        stateOrProvince: Joi.string(),
        zipOrPostalCode: Joi.string(),
        country: Joi.string(),
      }),
      billingAddress: Joi.object().keys({
        firstName: Joi.string(),
        middleName: Joi.string().allow(null, ''),
        lastName: Joi.string(),
        companyName: Joi.string().allow(null, ''),
        phoneNumber: Joi.string()
          .pattern(/^[0-9]{10,15}$/)
          .messages({
            'string.pattern.base': 'Phone number must be between 10 to 15 digits.',
          }),
        streetAddress: Joi.string(),
        city: Joi.string(),
        stateOrProvince: Joi.string(),
        zipOrPostalCode: Joi.string(),
        country: Joi.string(),
      }),
    })
    .min(1), // At least one field must be updated
};

const deleteAccountAddress = {
  params: Joi.object().keys({
    addressId: Joi.string().required().custom(objectId), // Validate addressId for deleting
  }),
};

module.exports = {
  createAccountAddress,
  getAccountAddressByUserId,
  updateAccountAddress,
  deleteAccountAddress,
};
