const Hangtag = require('../models/hangtag.model');

/**
 * Create a new hangtag
 */
const createHangtag = async (hangtagData) => {
  const hangtag = await Hangtag.create(hangtagData);
  return hangtag;
};

/**
 * Query hangtags with filters and pagination
 */
const queryHangtags = async (filter, options) => {
  const hangtags = await Hangtag.paginate(filter, options);
  return hangtags;
};

/**
 * Get hangtag by ID
 */
const getHangtagById = async (id) => {
  return Hangtag.findById(id);
};

/**
 * Update hangtag by ID
 */
const updateHangtagById = async (id, updateData) => {
  const hangtag = await Hangtag.findByIdAndUpdate(id, updateData, { new: true });
  return hangtag;
};

/**
 * Delete hangtag by ID
 */
const deleteHangtagById = async (id) => {
  const hangtag = await Hangtag.findByIdAndDelete(id);
  return hangtag;
};

module.exports = {
  createHangtag,
  queryHangtags,
  getHangtagById,
  updateHangtagById,
  deleteHangtagById,
};
