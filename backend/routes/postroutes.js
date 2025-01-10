const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const Post = require('../models/post');

// POST Route: Create a new post
router.post('/createPost', async (req, res, next) => {
  try {
    const { title, content, slug, author, image, category } = req.body;

    if (!title || !content || !slug || !author || !image || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newPost = new Post({ title, content, slug, author, image, category });
    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (err) {
    next(err);
  }
});

// GET Route: Get a post by slug
router.get('/getPost/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params;
    const post = await Post.findOne({ slug });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ post });
  } catch (err) {
    next(err);
  }
});

// GET Route: Fetch all posts
router.get('/getPosts', async (req, res, next) => {
  try {
    const posts = await Post.find({}); // Fetch all posts from the database
    res.status(200).json({ posts }); // Send posts in the response
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: 'Failed to fetch posts', error: err.message });
  }
});

// DELETE Route: Delete a post by ID
router.delete('/deletePost/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the post by ID and delete it
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully', post: deletedPost });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ message: 'Failed to delete post', error: err.message });
  }
});

// Export the router
module.exports = router;
