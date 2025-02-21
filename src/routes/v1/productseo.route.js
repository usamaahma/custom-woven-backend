const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const productSeoValidation = require('../../validations/productseo.validation');
const ProductSeoController = require('../../controllers/productseo.controller');

const router = express.Router();

// Route for creating and getting Product SEO entries
router
  .route('/')
  .post(auth('manageSEO'), validate(productSeoValidation.createProductSeo), ProductSeoController.createProductSeo)
  .get(validate(productSeoValidation.getProductSeos), ProductSeoController.getProductSeos);

// Routes for handling a single Product SEO entry (get, update, delete)
router
  .route('/:seoId')
  .get(validate(productSeoValidation.getProductSeo), ProductSeoController.getProductSeo)
  .patch(auth('manageSEO'), validate(productSeoValidation.updateProductSeo), ProductSeoController.updateProductSeo)
  .delete(auth('manageSEO'), validate(productSeoValidation.deleteProductSeo), ProductSeoController.deleteProductSeo);

module.exports = router;
