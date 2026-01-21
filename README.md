🛒 NeoShop – Full Stack E-Commerce Platform

NeoShop is a full-stack e-commerce web application built with the MERN stack.
It supports complete user authentication, product browsing, cart management, order system, and secure online payments using Stripe.

This project is structured as a monorepo containing both backend and frontend.


----------------------------------------------------------------------------------------------------------------------------------------------------------


🚀 Features
👤 Authentication & Authorization

User registration & login (JWT based)

Protected routes

Admin role support

🛍 Products

Product listing

Product details page

Category & search support (backend)

MongoDB powered product storage

🛒 Cart System

Add to cart

Remove from cart

Increase / decrease quantity

Persistent cart (DB based)

📦 Orders

Place order from cart

Order history

Order details page

Admin order management support

💳 Payments (Stripe)

Stripe Checkout integration

Secure payment flow

Webhooks to confirm payment

Order is marked paid only after Stripe confirmation

🌐 Frontend

React + Vite

Context API (Auth & Cart)

Protected routes

Fully connected with backend APIs

----------------------------------------------------------------------------------------------------------------------------------------------------------


🧱 Tech Stack
Frontend

React.js

React Router

Context API

Axios

Plain CSS

Backend

Node.js

Express.js

MongoDB + Mongoose

----------------------------------------------------------------------------------------------------------------------------------------------------------

Project Structure : 
NeoCart-ecommerce/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── config/
│   └── server.js
│
└── neoshop-frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── context/
    │   ├── api/
    │   └── styles/
    └── vite.config.js

 ----------------------------------------------------------------------------------------------------------------------------------------------------------

 
Environment Variables : 

  Backend (backend/.env) : 
      PORT=5000
MongoURI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
FRONTEND_URL=http://localhost:5173

Frontend currently uses direct API URLs. Environment variables can be added during deployment.
(only check the baseURL in the /api/api.js)
----------------------------------------------------------------------------------------------------------------------------------------------------------


Run Locally
1️⃣ Clone repository
 git clone https://github.com/rishabhXpanwar/NeoCart-ecommerce.git
cd NeoCart-ecommerce
2️⃣ Backend setup
cd backend
npm install
npm start

3️⃣ Frontend setup
cd neoshop-frontend
npm install
npm run dev


Frontend runs on:
👉 http://localhost:5173


----------------------------------------------------------------------------------------------------------------------------------------------------------


💳 Stripe Payment Flow

-User clicks Checkout

-Backend creates Stripe checkout session

-User completes payment on Stripe page

-Stripe sends webhook to backend

-Backend verifies event and:

-Marks order as paid

-Clears cart

-Updates product stock

----------------------------------------------------------------------------------------------------------------------------------------------------------


🧠 What I Learned From This Project

-Designing scalable REST APIs

-JWT authentication & middleware

-MongoDB data modeling

-Cart & order architecture

-Stripe payment integration

-Webhooks & real-world payment flow

-React context & protected routing

-Full frontend–backend integration

-Monorepo project management

-Stripe API + Webhooks


👨‍💻 Author

Rishabh Panwar
Backend-focused Full Stack Developer
Tech: Node.js, Express, MongoDB, React, REST APIs, StripeWT Authentication

