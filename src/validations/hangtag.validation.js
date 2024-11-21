const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createHangtag = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    image: Joi.string().uri().required(),
    descriptions: Joi.array().items(
      Joi.object().keys({
        descriptionTitle: Joi.string().optional(),
        text: Joi.string().optional(),
        images: Joi.array().items(Joi.string().uri().optional()),
        styles: Joi.array().items(
          Joi.object().keys({
            name: Joi.string().required(),
            image: Joi.string().uri().optional(),
            basePrice: Joi.number().required(),
            sizes: Joi.array().items(
              Joi.object().keys({
                name: Joi.string().required(),
                image: Joi.string().optional(),
                quantityPrice: Joi.array().items(
                  Joi.object().keys({
                    quantity: Joi.number().required(),
                    price: Joi.number().required(),
                  })
                ),
              })
            ),
          })
        ),
        options: Joi.array().items(
          Joi.object().keys({
            type: Joi.string().required(),
            cards: Joi.array().items(
              Joi.object().keys({
                title: Joi.string().required(),
                image: Joi.string().uri().optional(),
              })
            ),
          })
        ),
        comments: Joi.string().optional(),
      })
    ),
  }),
};

const updateHangtag = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    title: Joi.string().optional(),
    image: Joi.string().uri().optional(),
    descriptions: Joi.array().optional(),
  }),
};

const getHangtag = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const deleteHangtag = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createHangtag,
  updateHangtag,
  getHangtag,
  deleteHangtag,
};
