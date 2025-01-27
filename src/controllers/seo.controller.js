const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { SeoService } = require('../services');

/**
 * Create an SEO entry
 */
const createSeo = catchAsync(async (req, res) => {
  const seo = await SeoService.createSeo(req.body);
  res.status(httpStatus.CREATED).send(seo);
});

/**
 * Get all SEO entries
 */
const getSeos = catchAsync(async (req, res) => {
  const result = await SeoService.querySeos(req.query, req.query);
  res.send(result);
});

/**
 * Get an SEO entry by ID
 */
const getSeo = catchAsync(async (req, res) => {
  const seo = await SeoService.getSeoById(req.params.seoId);
  if (!seo) {
    res.status(httpStatus.NOT_FOUND).send({ message: 'SEO entry not found' });
  } else {
    res.send(seo);
  }
});

/**
 * Update an SEO entry by ID
 */
const updateSeo = catchAsync(async (req, res) => {
  const seo = await SeoService.updateSeoById(req.params.seoId, req.body);
  res.send(seo);
});

/**
 * Delete an SEO entry by ID
 */
const deleteSeo = catchAsync(async (req, res) => {
  await SeoService.deleteSeoById(req.params.seoId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createSeo,
  getSeos,
  getSeo,
  updateSeo,
  deleteSeo,
};
