const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const hangtagService = require('../services/hangtag.service');

/**
 * Create a hangtag
 */
const createHangtag = catchAsync(async (req, res) => {
  const hangtag = await hangtagService.createHangtag(req.body);
  res.status(httpStatus.CREATED).send(hangtag);
});

/**
 * Get hangtags with filters
 */
const getHangtags = catchAsync(async (req, res) => {
  const filter = req.query; // Add filter logic if needed
  const options = { limit: req.query.limit, page: req.query.page };
  const result = await hangtagService.queryHangtags(filter, options);
  res.send(result);
});

/**
 * Get hangtag by ID
 */
const getHangtag = catchAsync(async (req, res) => {
  const hangtag = await hangtagService.getHangtagById(req.params.id);
  if (!hangtag) {
    res.status(httpStatus.NOT_FOUND).send({ message: 'Hangtag not found' });
  }
  res.send(hangtag);
});

/**
 * Update hangtag by ID
 */
const updateHangtag = catchAsync(async (req, res) => {
  const hangtag = await hangtagService.updateHangtagById(req.params.id, req.body);
  res.send(hangtag);
});

/**
 * Delete hangtag by ID
 */
const deleteHangtag = catchAsync(async (req, res) => {
  await hangtagService.deleteHangtagById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createHangtag,
  getHangtags,
  getHangtag,
  updateHangtag,
  deleteHangtag,
};
