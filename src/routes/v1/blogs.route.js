// routes/blogRoutes.js
const express = require('express');

const router = express.Router();

const { createNewBlog, getBlogs, getBlog, updateBlog, deleteBlog } = require('../../controllers/blogs.controller');

// Create a new blog
router.post('/', createNewBlog);

// Get all blogs
router.get('/', getBlogs);

// Get a specific blog by ID
router.get('/:id', getBlog);

// Update a specific blog by ID
router.put('/:id', updateBlog);

// Delete a specific blog by ID
router.delete('/:id', deleteBlog);

module.exports = router;
