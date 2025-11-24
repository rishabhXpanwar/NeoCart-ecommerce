# 🛒 Node.js E-commerce Backend

A fully functional **E-commerce Backend API** built using **Node.js**, **Express**, **MongoDB**, and **JWT Authentication**.
This project includes complete shopping features like authentication, products, cart, and orders — with admin controls.

Perfect for portfolio, interviews, and real-world learning.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* User Registration & Login
* JWT-based authentication
* Role-based access (User / Admin)
* Protected routes

### 🛍️ Product Management

* Admin-only CRUD operations
* Get single product
* Get all products with:

  * Search
  * Pagination
  * Price filtering
  * Category filtering

### 🛒 Cart Management

* Add to cart
* Update quantity
* Remove item
* Clear cart
* Auto calculation of total price

### 📦 Order Management

* Create order from cart
* View logged-in user's orders
* Admin: get all orders
* Admin: update order status
* Auto stock deduction

### ⚙️ Utility

* Global error handler
* Clean folder structure
* Secure route middlewares

---

## 🧱 Tech Stack

| Technology     | Description           |
| -------------- | --------------------- |
| **Node.js**    | JavaScript runtime    |
| **Express.js** | Backend framework     |
| **MongoDB**    | Database              |
| **Mongoose**   | ODM layer             |
| **JWT**        | Auth token            |
| **bcryptjs**   | Password hashing      |
| **dotenv**     | Environment variables |

---

## 📁 Folder Structure

```
ecommerce-backend/
│-- server.js
│-- package.json
│-- .env
│
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   └── orderController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   └── routes/
│       ├── authroutes.js
│       ├── productroutes.js
│       ├── cartroutes.js
│       └── orderroutes.js
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/nodejs-ecommerce-backend.git
cd nodejs-ecommerce-backend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create a `.env` File

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce_db
JWT_SECRET=yourSecretKey
JWT_EXPIRE=30d
NODE_ENV=development
```

### 4️⃣ Start the Server

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

Server runs at:

```
http://localhost:5000
```

---

## 📌 API Routes Overview

### 🔐 Auth Routes

| Method | Endpoint             | Description      |
| ------ | -------------------- | ---------------- |
| POST   | `/api/auth/register` | Register user    |
| POST   | `/api/auth/login`    | Login user       |
| GET    | `/api/auth/profile`  | Get user profile |

---

### 🛍️ Product Routes

| Method | Endpoint            | Access |
| ------ | ------------------- | ------ |
| GET    | `/api/products`     | Public |
| GET    | `/api/products/:id` | Public |
| POST   | `/api/products`     | Admin  |
| PUT    | `/api/products/:id` | Admin  |
| DELETE | `/api/products/:id` | Admin  |

---

### 🛒 Cart Routes (Protected)

| Method | Endpoint                      |
| ------ | ----------------------------- |
| GET    | `/api/cart`                   |
| POST   | `/api/cart/add`               |
| PUT    | `/api/cart/update`            |
| DELETE | `/api/cart/remove/:productId` |
| DELETE | `/api/cart/clear`             |

---

### 📦 Order Routes

| Method | Endpoint                 | Access     |
| ------ | ------------------------ | ---------- |
| POST   | `/api/orders/create`     | User       |
| GET    | `/api/orders`            | User       |
| GET    | `/api/orders/:id`        | User/Admin |
| PUT    | `/api/orders/:id/status` | Admin      |
| GET    | `/api/orders/all`        | Admin      |

---

## 🧪 Testing

Use **Postman** to test APIs.

Protected routes require:

```
Authorization: Bearer <token>
```

---

## ⚡ Future Improvements

* Add payment gateway (Razorpay / Stripe)
* Image upload (Cloudinary)
* Wishlist module
* Product reviews & ratings
* Admin dashboard UI

---

## 👨‍💻 Author

**Rishabh Panwar**
Backend Developer | MERN Stack

⭐ If you like this project, don't forget to **star the repo**!
