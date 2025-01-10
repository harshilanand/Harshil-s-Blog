const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  slug: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true }, // Add category field
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
