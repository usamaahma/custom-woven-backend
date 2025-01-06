const httpStatus = require('http-status');
const NewsLetterService = require('../services/newsletter.service'); // Correctly import the service

// Create a new newsletter
const createNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    // Call the service function to create the newsletter
    const newsletter = await NewsLetterService.createNewsletterService(email);

    // Send success response
    return res.status(httpStatus.CREATED).send(newsletter);
  } catch (error) {
    // Handle any error
    return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};

// Get all newsletters
const getAllNewsletters = async (req, res) => {
  try {
    // Call the service function to get all newsletters
    const newsletters = await NewsLetterService.getAllNewslettersService();

    // Send success response
    return res.status(httpStatus.OK).send(newsletters);
  } catch (error) {
    // Handle errors
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

// Delete a newsletter by ID
const deleteNewsletter = async (req, res) => {
  try {
    const { id } = req.params;

    // Call the service function to delete the newsletter by ID
    await NewsLetterService.deleteNewsletterService(id);

    // Send success response
    return res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    // Handle errors
    return res.status(httpStatus.NOT_FOUND).send({ message: error.message });
  }
};

module.exports = {
  createNewsletter,
  getAllNewsletters,
  deleteNewsletter,
};
