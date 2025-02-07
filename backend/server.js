const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Validate Cloudinary config
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error('Error: Missing Cloudinary credentials in .env file');
  process.exit(1);
}

// CORS Options
const allowedOrigins = [
  'http://localhost:5173', // Local development
  'https://harshils-blog.netlify.app', // Deployed frontend
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., mobile apps, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`CORS error: Origin ${origin} not allowed`);
      callback(new Error(`CORS policy: Origin ${origin} not allowed`));
    }
  },
  methods: 'GET,POST,DELETE,PUT',
  credentials: true, // Allow cookies and credentials
}));

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  });

// Routes
app.use('/api/post', require('./routes/postroutes'));

// Catch-all route for undefined API endpoints
app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/api')) {
    res.status(404).json({ message: 'Endpoint not found' });
  } else {
    next();
  }
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(err.status || 500).json({
    message: 'Internal Server Error',
    error: err.message,
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
