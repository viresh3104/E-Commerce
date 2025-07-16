B-Universal - Multi-Vendor SaaS E-Commerce Platform
Welcome to B-Universal, a full-stack SaaS e-commerce platform designed to empower vendors to establish their online presence effortlessly. Built with Angular, Node.js, Express, and MongoDB, this project integrates Razorpay in test mode for simulated payments, offering a seamless shopping experience for users and a secure admin panel for order management. Created as part of my placement journey, this project showcases modern web development practices and problem-solving skills.

Created By: [Your Name]
Date: July 16, 2025, 05:46 PM IST
GitHub: github.com/yourusername
Live Demo: B-Universal Demo
Overview
B-Universal is a multi-vendor SaaS platform where vendors can set up personalized storefronts, manage inventory, and list products. Users can browse, add items to their cart, and place orders with a simulated checkout process. The platform includes role-based panels—SuperAdmin, Admin, and User—ensuring secure and efficient operations. This project was developed to balance my placement prep with hands-on development, tackling challenges like payload optimization and API security.

Features
Multi-Vendor Support: Vendors get personalized storefronts to showcase and sell their products.
Role-Based Panels:
SuperAdmin Panel: Oversees the platform, managing admins and ensuring smooth operations.
Admin Panel: Allows vendors to create categories, list products, and manage inventory hassle-free.
User Panel: Enables users to browse products, add to cart, validate addresses, and simulate checkout.
Shopping Experience: Browse products by category, manage cart (add, update, remove), and place orders.
Simulated Payment: Integrates Razorpay in test mode for a realistic checkout without real transactions.
Admin Order Tracking: Read-only panel for admins to view order details (order ID, user info, items, total amount, payment status, and creation date).
Responsive UI: Built with Angular for a smooth experience across devices.
Secure APIs: Implements role-based access control with middleware using Express.
Data Management: Stores user profiles, carts, and orders efficiently in MongoDB.
Tech Stack
Frontend: Angular, HTML, CSS, TypeScript
Backend: Node.js, Express
Database: MongoDB
Payment Gateway: Razorpay (Test Mode)
Other Tools: Angular Material (optional for UI enhancements)
Setup Instructions
Prerequisites
Node.js (v14.x or later)
npm or yarn
MongoDB (local instance or MongoDB Atlas)
Git
Installation
Clone the Repository
bash

Collapse

Wrap

Run

Copy
git clone https://github.com/yourusername/b-universal.git
cd b-universal
Install Dependencies
For the frontend (Angular):
bash

Collapse

Wrap

Run

Copy
cd client
npm install
For the backend (Node.js):
bash

Collapse

Wrap

Run

Copy
cd server
npm install
Configure Environment Variables Create a .env file in the server directory with the following:
text

Collapse

Wrap

Copy
PORT=5000
MONGO_URI=your_mongodb_connection_string
RAZORPAY_KEY_ID=rzp_test_4EaYDRKRmVoz3f
RAZORPAY_KEY_SECRET=IYFybkW9wHp7pFWjxYZDatGY
JWT_SECRET=your_jwt_secret
Replace your_mongodb_connection_string and your_jwt_secret with your actual values.
Run the Application
Start the backend server:
bash

Collapse

Wrap

Run

Copy
cd server
npm start
Start the frontend development server:
bash

Collapse

Wrap

Run

Copy
cd client
ng serve
Open your browser and navigate to http://localhost:4200.
Simulate Payments
Use Razorpay test card details for simulated payments:
Card Number: 4111 1111 1111 1111
Expiry: 12/25
CVV: 123
OTP: 123456
Database Setup
Ensure MongoDB is running locally or connected via MongoDB Atlas.
The application automatically creates collections for users, orders, and carts based on the schemas.
Usage
