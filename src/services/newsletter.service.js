const NewsLetter = require('../models/newsletter.model'); // Ensure this points to the correct path

// Service to create a new newsletter
const createNewsletterService = async (email) => {
  const existingNewsletter = await NewsLetter.findOne({ email });
  if (existingNewsletter) {
    throw new Error('Email already subscribed');
  }

  const newsletter = await NewsLetter.create({ email });
  return newsletter;
};

// Service to get all newsletters
const getAllNewslettersService = async () => {
  return NewsLetter.find();
};

// Service to delete a newsletter by ID
const deleteNewsletterService = async (id) => {
  const newsletter = await NewsLetter.findByIdAndDelete(id);
  if (!newsletter) {
    throw new Error('Newsletter not found');
  }
  return newsletter;
};

module.exports = {
  createNewsletterService,
  getAllNewslettersService,
  deleteNewsletterService,
};
