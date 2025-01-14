Blog Application
A fully functional blog application built with React, Node.js, Firebase, and MongoDB. The app allows users to create, view, and manage blog posts, with role-based access control for admin functionality.

Features
Public Interface:

View all blog posts on the homepage.
Access individual blog posts with detailed content and images.
Authentication:

Users can sign up, log in, and log out.
Role-based access ensures only authenticated users can create or manage posts.
Admin Panel:

Authenticated users can:
Create new posts.
Edit or delete existing posts.
Post Management:

Upload and display images for blog posts.
Categorize posts with tags for better organization.
Responsive Design:

Optimized for desktop and mobile viewing.
Technologies Used
Frontend:

React
TailwindCSS
React Router
Firebase Authentication
Backend:

Node.js
Express
MongoDB (with Mongoose)
Cloudinary (for image hosting)
Installation and Setup
Clone the Repository:

bash
Copy code
git clone https://github.com/your-repo/blog-app.git
cd blog-app
Install Dependencies:

Frontend:

bash
Copy code
cd client
npm install
Backend:

bash
Copy code
cd ../backend
npm install
Environment Variables: Create a .env file in both client and backend directories:

Backend .env:

makefile
Copy code
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
Frontend .env:

makefile
Copy code
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
Run the Application:

Backend:

bash
Copy code
cd backend
npm run start
Frontend:

bash
Copy code
cd client
npm run dev
Access the App:

Frontend: http://localhost:5173
Backend: http://localhost:3001
Deployment
Frontend Deployment:

Use Netlify or Vercel.
Build the frontend:
bash
Copy code
npm run build
Upload the dist folder.
Backend Deployment:

Use Render or Railway.
Connect your backend repository and set up environment variables.
Database:

Use MongoDB Atlas for cloud-hosted MongoDB.
Project Structure
Backend
lua
Copy code
backend/
|-- cloudinary.js
|-- models/
|   |-- post.js
|-- routes/
|   |-- postroutes.js
|-- server.js
|-- uploads/
Frontend
lua
Copy code
client/
|-- src/
|   |-- components/
|   |   |-- navbar.jsx
|   |   |-- postcard.jsx
|   |-- pages/
|   |   |-- home.jsx
|   |   |-- login.jsx
|   |   |-- signup.jsx
|   |   |-- createpost.jsx
|   |   |-- admin.jsx
|-- firebase.js
How to Contribute
Fork the repository.
Create a feature branch:
bash
Copy code
git checkout -b feature-name
Commit your changes:
bash
Copy code
git commit -m "Add feature name"
Push to the branch:
bash
Copy code
git push origin feature-name
Open a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for details.

