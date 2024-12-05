// services/blogService.js
const Blog = require('../models/blogs.model');

// Create a new blog
const createBlog = async (blogData) => {
  try {
    const blog = new Blog(blogData);
    await blog.save();
    return blog;
  } catch (error) {
    throw new Error(`Error creating blog: ${error.message}`);
  }
};

// Get all blogs
const getAllBlogs = async () => {
  try {
    return await Blog.find();
  } catch (error) {
    throw new Error(`Error fetching blogs: ${error.message}`);
  }
};

// Get a blog by ID
const getBlogById = async (id) => {
  try {
    return await Blog.findById(id);
  } catch (error) {
    throw new Error(`Error fetching blog: ${error.message}`);
  }
};

// Update a blog by ID
const updateBlogById = async (id, blogData) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blogData, { new: true });
    return updatedBlog;
  } catch (error) {
    throw new Error(`Error updating blog: ${error.message}`);
  }
};

// Delete a blog by ID
const deleteBlogById = async (id) => {
  try {
    await Blog.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(`Error deleting blog: ${error.message}`);
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
};
