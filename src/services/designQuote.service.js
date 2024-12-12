const DesignQuote = require('../models/designQuote.model');

const create = async (data) => {
  return DesignQuote.create(data);
};

const getAll = async () => {
  return DesignQuote.find();
};

const getById = async (id) => {
  return DesignQuote.findById(id);
};

const update = async (id, data) => {
  return DesignQuote.findByIdAndUpdate(id, data, { new: true });
};

const deleteById = async (id) => {
  return DesignQuote.findByIdAndDelete(id);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteById,
};
