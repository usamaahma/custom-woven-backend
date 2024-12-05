// controllers/blogController.js
const { createBlog, getAllBlogs, getBlogById, updateBlogById, deleteBlogById } = require('../services/blogs.service');
const { createBlogSchema } = require('../validations/blogs.validation');

// Create a new blog
const createNewBlog = async (req, res) => {
  try {
    const { error } = createBlogSchema.validate(req.body); // Validate input data
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newBlog = await createBlog(req.body);
    return res.status(201).json(newBlog); // Return created blog
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get all blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await getAllBlogs();
    return res.status(200).json(blogs); // Return all blogs
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get blog by ID
const getBlog = async (req, res) => {
  try {
    const blog = await getBlogById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    return res.status(200).json(blog); // Return the found blog
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Update a blog by ID
const updateBlog = async (req, res) => {
  try {
    const blog = await updateBlogById(req.params.id, req.body);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found to update' });
    }
    return res.status(200).json(blog); // Return updated blog
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Delete a blog by ID
const deleteBlog = async (req, res) => {
  try {
    await deleteBlogById(req.params.id);
    return res.status(204).send(); // Return no content on successful deletion
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createNewBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
};
