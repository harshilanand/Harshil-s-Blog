import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables

// Configure Cloudinary using the credentials from .env file
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Function to upload image to Cloudinary
export const uploadImage = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.secure_url); // The URL of the uploaded image
      }
    });
  });
};
