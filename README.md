# B-Universal - Multi-Vendor SaaS E-Commerce Platform

Welcome to **B-Universal**, a full-stack SaaS e-commerce platform designed to empower vendors to establish their online presence effortlessly. Built with **Angular, Node.js, Express, and MongoDB**, this project integrates **Razorpay in test mode** for simulated payments—offering a seamless shopping experience for users and a secure admin panel for order management.

> Created By: **Viresh Navtake**  
> GitHub: https://github.com/viresh3104/Multi-Vendor-SASS  

---

## 🌐 Overview

**B-Universal** is a multi-vendor SaaS platform where vendors can:

- Set up personalized storefronts
- Manage inventory
- List products

Users can:

- Browse products
- Add items to cart
- Place orders with simulated checkout

The platform includes **role-based panels**—SuperAdmin, Admin, and User—ensuring secure and efficient operations. Developed while balancing placement prep, this project tackles real-world challenges like **payload optimization** and **API security**.

---

## ✨ Features

- **Multi-Vendor Support**  
  Vendors get personalized storefronts to showcase and sell their products.

- **Role-Based Panels**
  - **SuperAdmin Panel:** Manages the platform, admins, and operations.
  - **Admin Panel:** Vendors can create categories, list products, and manage inventory.
  - **User Panel:** Browse, add to cart, manage addresses, and place orders.

- **Shopping Experience**
  - Browse by category
  - Manage cart (add/update/remove)
  - Place orders seamlessly

- **Simulated Payment**
  - Integrated **Razorpay (test mode)** for realistic checkout (no real transactions)

- **Admin Order Tracking**
  - Read-only view: Order ID, user info, items, total amount, status, creation date

- **Responsive UI**
  - Built with **Angular** for smooth cross-device experience

- **Secure APIs**
  - Role-based access control with Express middleware

- **Data Management**
  - Efficient MongoDB schemas for users, carts, and orders

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | Angular, TypeScript, HTML, CSS      |
| Backend    | Node.js, Express                    |
| Database   | MongoDB                             |
| Payments   | Razorpay (Test Mode)                |
| UI Library | Angular Material (Optional)         |

---

## 📦 Installation

### ✅ Prerequisites

- Node.js (v14.x or later)
- npm or yarn
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- Git

---

### 2. Install Dependencies

#### Frontend (Angular)

```bash
cd client
npm install
