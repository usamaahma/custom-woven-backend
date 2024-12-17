const httpStatus = require('http-status');
const designQuoteService = require('../services/designQuote.service');

const create = async (req, res) => {
  const designQuote = await designQuoteService.create(req.body);
  res.status(httpStatus.CREATED).send(designQuote);
};

const getAll = async (req, res) => {
  const designQuotes = await designQuoteService.getAll();
  res.send(designQuotes);
};

const getById = async (req, res) => {
  const designQuote = await designQuoteService.getById(req.params.id);
  if (!designQuote) {
    return res.status(httpStatus.NOT_FOUND).send({ message: 'Design quote not found' });
  }
  res.send(designQuote);
};

const update = async (req, res) => {
  const updatedQuote = await designQuoteService.update(req.params.id, req.body);
  if (!updatedQuote) {
    return res.status(httpStatus.NOT_FOUND).send({ message: 'Design quote not found' });
  }
  res.send(updatedQuote);
};

const deleteById = async (req, res) => {
  const deleted = await designQuoteService.deleteById(req.params.id);
  if (!deleted) {
    return res.status(httpStatus.NOT_FOUND).send({ message: 'Design quote not found' });
  }
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  delete: deleteById,
};
