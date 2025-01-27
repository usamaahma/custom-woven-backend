const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const SeoValidation = require('../../validations/seo.validation');
const SeoController = require('../../controllers/seo.controller');

const router = express.Router();

// Route for creating and getting SEO entries
router
  .route('/')
  .post(auth('manageSEO'), validate(SeoValidation.createSeo), SeoController.createSeo)
  .get(validate(SeoValidation.getSeos), SeoController.getSeos);

// Routes for handling single SEO entry (get, update, delete)
router
  .route('/:seoId')
  .get(validate(SeoValidation.getSeo), SeoController.getSeo)
  .patch(auth('manageSEO'), validate(SeoValidation.updateSeo), SeoController.updateSeo)
  .delete(auth('manageSEO'), validate(SeoValidation.deleteSeo), SeoController.deleteSeo);

module.exports = router;
