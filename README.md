🛒 NeoShop – Full Stack E-Commerce Platform

🔗 Live Project:
👉 https://neo-cart-ecommerce.vercel.app/

NeoShop is a full-stack e-commerce web application built using the MERN stack.
It supports complete user authentication, product browsing, cart management, order processing, and secure online payments using Stripe with webhook verification.

This project follows a monorepo structure containing both backend and frontend.

----------------------------------------------------------------------------------------------------

🚀 Features
👤 Authentication & Authorization

User registration & login (JWT based)

Protected routes

Role-based access (Admin support)

----------------------------------------------------------------------------------------------------

🛍 Products

Product listing

Product details page

Category & search support (backend)

MongoDB powered product storage

----------------------------------------------------------------------------------------------------

🛒 Cart System

Add to cart

Remove from cart

Increase / decrease quantity

Persistent cart (DB based)

----------------------------------------------------------------------------------------------------

📦 Orders

Place order from cart

Order history

Order details page

Admin order management support

----------------------------------------------------------------------------------------------------

💳 Payments (Stripe)

Stripe Checkout integration

Secure hosted payment flow

Stripe webhooks for payment verification

Order is marked paid only after Stripe confirmation

Automatic cart clearing & stock update

----------------------------------------------------------------------------------------------------

🌐 Frontend

React + Vite

Context API (Auth & Cart)

Protected routes

Fully connected with backend REST APIs

----------------------------------------------------------------------------------------------------

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

MongoDB

Mongoose

Stripe API

----------------------------------------------------------------------------------------------------

📁 Project Structure
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

----------------------------------------------------------------------------------------------------

🔐 Environment Variables
Backend (backend/.env)
PORT=5000
MongoURI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
CLIENT_URL=http://localhost:5173

Frontend (neoshop-frontend/.env)


VITE_API_URL=your_backend_url/api


----------------------------------------------------------------------------------------------------


▶️ Run Locally
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


----------------------------------------------------------------------------------------------------

💳 Stripe Payment Flow

User clicks Checkout

Backend creates Stripe Checkout Session

User completes payment on Stripe page

Stripe sends webhook event to backend

Backend verifies event and:

Marks order as paid

Clears cart

Updates product stock

----------------------------------------------------------------------------------------------------

🧠 What I Learned From This Project

Designing scalable REST APIs

JWT authentication & middleware

MongoDB data modeling

Cart & order architecture

Stripe payment integration

Webhooks & real-world payment flow

React Context & protected routing

Full frontend–backend integration

Monorepo project management

Production-style deployment (Render, Vercel, Atlas)

----------------------------------------------------------------------------------------------------

👨‍💻 Author

Rishabh Panwar
Backend-focused Full Stack Developer

Tech: Node.js, Express, MongoDB, React, REST APIs, Stripe, JWT Authentication