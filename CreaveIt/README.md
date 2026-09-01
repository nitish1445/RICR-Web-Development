# CraveIt - Full Stack MERN Food Delivery Platform

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**A modern, full-featured food delivery platform built with the MERN stack**

[Features](#-features) • [Tech Stack](#-technology-stack) • [Installation](#-installation) • [Project Structure](#-project-structure) • [API Documentation](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

1. [Project Overview](#-project-overview)
2. [Features](#-features)
3. [Technology Stack](#-technology-stack)
4. [Role-Based Architecture](#-role-based-architecture)
5. [Project Structure](#-project-structure)
6. [Installation & Setup](#-installation--setup)
7. [Environment Variables](#-environment-variables)
8. [Running the Project](#-running-the-project)
9. [API Documentation](#-api-documentation)
10. [Features by Role](#-features-by-role)
11. [Database Models](#-database-models)
12. [Authentication & Security](#-authentication--security)
13. [Future Improvements](#-future-improvements)
14. [Contributing](#-contributing)
15. [License](#-license)

---

## 🎯 Project Overview

**CraveIt** is a comprehensive food delivery platform that connects customers, restaurants, delivery riders, and administrators in a seamless ecosystem. Built with modern web technologies, it provides role-based access control, real-time order tracking, and a complete management system for all stakeholders.

The platform is designed as an **educational project** while maintaining production-ready code standards and best practices.

### Key Highlights:
- 🔐 **Role-Based Access Control** - 4 distinct user roles with specialized dashboards
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🔄 **Real-Time Order Management** - Track orders from placement to delivery
- 🍽️ **Restaurant Management** - Full menu and order management system
- 🚴 **Rider Tracking** - Complete delivery workflow and earnings management
- 👨‍💼 **Admin Dashboard** - Comprehensive platform oversight and user management
- 🔐 **Secure Authentication** - JWT-based authentication with password reset via OTP
- ☁️ **Cloud Storage** - Cloudinary integration for image management
- 💳 **Payment Integration** - Cash on Delivery (COD) currently supported

---

## ✨ Features

### Core Platform Features

| Feature | Description |
|---------|-------------|
| **User Authentication** | Registration, Login, OTP-based password reset |
| **Role-Based Access** | Customer, Restaurant Partner, Rider, Admin roles |
| **Profile Management** | Complete profile setup with photo upload capability |
| **Address Management** | Multiple address support with geolocation |
| **Food Ordering** | Browse restaurants, add items to cart, place orders |
| **Order Tracking** | Real-time order status updates |
| **Payment** | Cash on Delivery (COD) - Online payment coming soon |
| **Contact Support** | Customer inquiry and feedback system |
| **Image Management** | Cloudinary-powered image upload and storage |

---

## 🛠️ Technology Stack

### Frontend
- **React 19** - UI library for building interactive components
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework for styling
- **React Router v7** - Client-side routing and navigation
- **Axios** - Promise-based HTTP client for API calls
- **React Hot Toast** - Toast notifications for user feedback
- **React Icons** - Comprehensive icon library (Font Awesome, Feather, etc.)
- **ESLint** - Code quality and style checking

### Backend
- **Node.js** - JavaScript runtime for server-side development
- **Express.js 5** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling and validation
- **JWT (jsonwebtoken)** - Secure token-based authentication
- **Bcrypt** - Password hashing and security
- **Cloudinary** - Cloud-based image storage and management
- **Nodemailer** - Email sending for OTP and notifications
- **Multer** - File upload middleware for image handling
- **Morgan** - HTTP request logger for debugging
- **CORS** - Cross-Origin Resource Sharing configuration
- **Cookie Parser** - Cookie parsing and management
- **Nodemon** - Development server auto-restart

### Development Tools
- **ESLint** - Code quality assurance
- **Vite Build Tools** - Optimized production builds

---

## 🏗️ Role-Based Architecture

### 1. **Customer/User**
- Browse restaurants and menu items
- Place food orders
- Track order status in real-time
- Manage delivery addresses
- View order history
- Update profile information
- Reset password securely
- Contact support team

### 2. **Restaurant Partner (Manager)**
- Add and manage menu items with photos
- Set item pricing and descriptions
- View all incoming orders
- Update order status (preparing, ready, etc.)
- View restaurant earnings and analytics
- Manage restaurant profile and information
- Upload restaurant banner and logo
- Track performance metrics

### 3. **Delivery Rider**
- View available orders for delivery
- Accept delivery assignments
- Track ongoing deliveries
- Update delivery status (picked up, on the way, delivered)
- View order details and customer information
- Manage rider profile and payment details
- Track daily earnings
- View delivery history

### 4. **Admin**
- Dashboard with platform overview
- Manage all users (customers, restaurants, riders)
- View all orders and order status
- Add new users to the system
- Manage contact messages and support tickets
- Generate reports and analytics
- Delete or block users if necessary
- Mark order payments as paid
- Platform-wide monitoring

---

## 📁 Project Structure

### Client-Side Structure

```
client/
├── src/
│   ├── components/
│   │   ├── adminDashboard/          # Admin dashboard components
│   │   │   ├── AdminAddData.jsx     # Add new users
│   │   │   ├── AdminHeader.jsx      # Admin header
│   │   │   ├── AdminOrders.jsx      # Order management
│   │   │   ├── AdminOverview.jsx    # Dashboard overview
│   │   │   ├── AdminProfile.jsx     # Admin profile
│   │   │   ├── AdminSidebar.jsx     # Navigation sidebar
│   │   │   ├── ContactMessages.jsx  # Support messages
│   │   │   ├── Customers.jsx        # Customer management
│   │   │   ├── ManagementTable.jsx  # Data table component
│   │   │   ├── Managers.jsx         # Restaurant partners
│   │   │   ├── Riders.jsx           # Delivery riders
│   │   │   └── modal/               # Admin modals
│   │   │
│   │   ├── checkout/                # Checkout flow components
│   │   │   ├── CheckoutHeader.jsx
│   │   │   ├── DeliveryAddress.jsx  # Address selection
│   │   │   ├── OrderSummary.jsx     # Order review
│   │   │   └── PaymentMethod.jsx    # Payment selection
│   │   │
│   │   ├── home/                    # Home page components
│   │   │   ├── Hero.jsx             # Hero section
│   │   │   ├── HowItWorks.jsx       # How it works section
│   │   │   ├── PartnerSection.jsx   # Partner signup
│   │   │   └── PopularRestaurants.jsx # Restaurant listing
│   │   │
│   │   ├── resturantDashboard/      # Restaurant partner dashboard
│   │   │   ├── RestaurantEarnings.jsx
│   │   │   ├── RestaurantHeader.jsx
│   │   │   ├── RestaurantHelp.jsx
│   │   │   ├── RestaurantMenu.jsx   # Menu management
│   │   │   ├── RestaurantOrder.jsx  # Order management
│   │   │   ├── RestaurantOverview.jsx
│   │   │   ├── RestaurantProfile.jsx
│   │   │   ├── RestaurantSidebar.jsx
│   │   │   └── modals/              # Restaurant modals
│   │   │
│   │   ├── riderDashboard/          # Rider dashboard
│   │   │   ├── RiderEarnings.jsx
│   │   │   ├── RiderHeader.jsx
│   │   │   ├── RiderHelp.jsx
│   │   │   ├── RiderOrders.jsx      # Available orders
│   │   │   ├── RiderOverview.jsx
│   │   │   ├── RiderProfile.jsx
│   │   │   ├── RiderSidebar.jsx
│   │   │   └── modals/              # Including ResetPasswordModal
│   │   │
│   │   ├── userDashboard/           # Customer dashboard
│   │   │   ├── UserEarnings.jsx
│   │   │   ├── UserHeader.jsx
│   │   │   ├── UserHelp.jsx
│   │   │   ├── UserOrders.jsx
│   │   │   ├── UserOverview.jsx
│   │   │   ├── UserProfile.jsx
│   │   │   ├── UserSidebar.jsx
│   │   │   └── modals/
│   │   │
│   │   ├── CartSidebar.jsx          # Shopping cart
│   │   ├── Footer.jsx               # Footer component
│   │   ├── Header.jsx               # Main navigation header
│   │   └── Loading.jsx              # Loading spinner
│   │
│   ├── config/
│   │   └── Api.jsx                  # Axios configuration
│   │
│   ├── context/
│   │   ├── AuthContext.jsx          # Authentication state
│   │   └── CartContext.jsx          # Shopping cart state
│   │
│   ├── Layout/
│   │   ├── AppLayout.jsx            # Main app layout
│   │   ├── AuthAdmin.jsx            # Admin auth layout
│   │   ├── AuthCheckout.jsx         # Checkout auth layout
│   │   ├── AuthCustomer.jsx         # Customer auth layout
│   │   ├── AuthManager.jsx          # Restaurant auth layout
│   │   ├── AuthPageLayout.jsx       # Auth page layout
│   │   └── AuthRider.jsx            # Rider auth layout
│   │
│   ├── pages/
│   │   ├── About.jsx                # About page
│   │   ├── CheckoutPage.jsx         # Checkout page
│   │   ├── Contact.jsx              # Contact page
│   │   ├── DummyLogin.jsx           # Demo login options
│   │   ├── Home.jsx                 # Home page
│   │   ├── Login.jsx                # Login page
│   │   ├── NotFound.jsx             # 404 page
│   │   ├── Privacy.jsx              # Privacy policy
│   │   ├── RestaurantMenu.jsx       # Restaurant menu view
│   │   ├── Restaurants.jsx          # Restaurants listing
│   │   ├── SignUp.jsx               # Registration page
│   │   └── dashboards/              # Role-based dashboards
│   │
│   ├── App.jsx                      # Main app component
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Global styles
│
├── public/                          # Static assets
├── index.html                       # HTML entry point
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind CSS config
├── eslint.config.js                 # ESLint configuration
├── package.json                     # Dependencies
└── vercel.json                      # Vercel deployment config
```

### Server-Side Structure

```
server/
├── src/
│   ├── config/
│   │   ├── cloudinary.js            # Cloudinary setup
│   │   ├── db.js                    # MongoDB connection
│   │   └── email.js                 # Email configuration
│   │
│   ├── controllers/
│   │   ├── adminController.js       # Admin operations
│   │   ├── authController.js        # Authentication logic
│   │   ├── publicController.js      # Public endpoints
│   │   ├── restaurantController.js  # Restaurant operations
│   │   ├── riderController.js       # Rider operations
│   │   └── userController.js        # Customer operations
│   │
│   ├── middlewares/
│   │   └── authMiddleware.js        # JWT verification & role checks
│   │
│   ├── models/
│   │   ├── contactModel.js          # Contact messages schema
│   │   ├── menuSchema.js            # Menu items schema
│   │   ├── orderModal.js            # Orders schema
│   │   ├── otpModel.js              # OTP storage schema
│   │   └── userModel.js             # User/Restaurant/Rider schema
│   │
│   ├── routers/
│   │   ├── adminRouter.js           # Admin routes
│   │   ├── authRouter.js            # Authentication routes
│   │   ├── publicRouter.js          # Public routes
│   │   ├── restaurantRouter.js      # Restaurant routes
│   │   ├── riderRouter.js           # Rider routes
│   │   └── userRouter.js            # Customer routes
│   │
│   ├── seeders/
│   │   ├── dummyData.js             # Dummy data constants
│   │   ├── seedAdmin.js             # Seed admin users
│   │   ├── seedMenu.js              # Seed menu items
│   │   └── seedUser.js              # Seed customer data
│   │
│   └── utils/
│       ├── authToken.js             # JWT token generation
│       ├── emailService.js          # Email utility functions
│       └── imageUploader.js         # Image upload helpers
│
├── index.js                         # Server entry point
├── package.json                     # Dependencies
└── .env                             # Environment variables
```

---

## 🚀 Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local or cloud - MongoDB Atlas)
- **Git** for version control

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/craveit.git
cd craveit
```

### Step 2: Setup Backend

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env  # (or manually create .env file)

# Update .env with your configuration (see Environment Variables section)

# Run database migrations/seeders (optional)
npm run seed:admin
npm run seed:user
npm run seed:menu

# Start the development server
npm run dev
```

### Step 3: Setup Frontend

```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Create .env file (if needed)
cp .env.example .env

# Start the development server
npm run dev
```

### Step 4: Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **MongoDB Connection**: Configured in your .env file

---

## 🔐 Environment Variables

### Backend (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/craveit

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Service (Nodemailer)
EMAIL_SERVICE=gmail  # or your email provider
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@craveit.com

# CORS
CORS_ORIGIN=http://localhost:5173,https://craveit-food.vercel.app

# OTP Configuration
OTP_EXPIRY=5m
```

### Frontend (.env)

```env
# API Configuration
VITE_API_URL=http://localhost:5000

# Environment
VITE_ENV=development
```

---

## 📚 Running the Project

### Development Mode

#### Terminal 1 - Backend
```bash
cd server
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd client
npm run dev
```

### Production Build

```bash
# Build frontend
cd client
npm run build
npm run preview

# Build backend (already in index.js)
cd ../server
npm start
```

### Database Seeding

```bash
# Seed admin users
npm run seed:admin

# Seed customer data
npm run seed:user

# Seed menu items
npm run seed:menu
```

---

## 🔌 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/auth/register` | Register new user | ❌ |
| POST | `/auth/login` | User login | ❌ |
| GET | `/auth/logout` | User logout | ✅ |
| POST | `/auth/genOtp` | Generate OTP | ❌ |
| POST | `/auth/verifyOtp` | Verify OTP | ❌ |
| POST | `/auth/forgetPassword` | Reset password | ✅ |

### Customer Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| PATCH | `/user/update` | Update profile | ✅ |
| PATCH | `/user/updateAddress` | Update address | ✅ |
| PATCH | `/user/changePhoto` | Upload profile photo | ✅ |
| PATCH | `/user/resetPassword` | Reset password | ✅ |
| POST | `/user/placeorder` | Place new order | ✅ |
| GET | `/user/placedorders` | Get all orders | ✅ |
| GET | `/user/placedorders/:orderId` | Cancel order | ✅ |

### Restaurant Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/restaurant/addMenuItem` | Add menu item | ✅ Manager |
| GET | `/restaurant/menuItems` | Get restaurant menu | ✅ Manager |
| PUT | `/restaurant/updateMenuItem/:id` | Update menu item | ✅ Manager |
| PUT | `/restaurant/update` | Update restaurant info | ✅ Manager |
| PATCH | `/restaurant/changePhoto` | Update restaurant photo | ✅ Manager |
| GET | `/restaurant/placedorders` | Get incoming orders | ✅ Manager |
| PATCH | `/restaurant/order-status/:id` | Update order status | ✅ Manager |
| GET | `/restaurant/earnings` | View earnings | ✅ Manager |

### Rider Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/rider/available-orders` | Get available orders | ✅ |
| GET | `/rider/ongoing-orders` | Get ongoing deliveries | ✅ |
| GET | `/rider/completed-orders` | Get completed orders | ✅ |
| GET | `/rider/overview` | Get rider dashboard data | ✅ |
| PATCH | `/rider/order/:id` | Update order status | ✅ |
| GET | `/rider/payment/:orderId` | Get payment status | ✅ |
| PATCH | `/rider/reset-password` | Reset password | ✅ |
| PATCH | `/rider/change-photo` | Update profile photo | ✅ |

### Admin Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/admin/overview` | Dashboard overview | ✅ Admin |
| GET | `/admin/customers` | List all customers | ✅ Admin |
| GET | `/admin/managers` | List all restaurants | ✅ Admin |
| GET | `/admin/partners` | List all riders | ✅ Admin |
| DELETE | `/admin/customer/:id` | Delete customer | ✅ Admin |
| DELETE | `/admin/manager/:id` | Delete restaurant | ✅ Admin |
| DELETE | `/admin/partner/:id` | Delete rider | ✅ Admin |
| GET | `/admin/messages` | Get support messages | ✅ Admin |
| DELETE | `/admin/message/:id` | Delete message | ✅ Admin |
| GET | `/admin/orders` | List all orders | ✅ Admin |
| GET | `/admin/order/:id` | Get order details | ✅ Admin |
| POST | `/admin/addUser` | Add new user | ✅ Admin |
| PATCH | `/admin/mark-paid/:id` | Mark payment as paid | ✅ Admin |

### Public Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/public/restaurants` | List all restaurants | ❌ |
| GET | `/public/restaurant/:id` | Get restaurant details | ❌ |
| GET | `/public/restaurant/:id/menu` | Get restaurant menu | ❌ |
| POST | `/public/contact` | Submit contact form | ❌ |

---

## 👥 Features by Role

### 🛒 Customer Features

#### Dashboard Overview
- View personalized dashboard with quick stats
- See recent orders at a glance
- Quick access to popular restaurants

#### Restaurant Browsing
- Browse all available restaurants
- Search restaurants by name or cuisine
- View restaurant details, ratings, and menu
- Filter by popularity or distance

#### Ordering System
- Add items to shopping cart
- View cart with item details and prices
- Modify quantities or remove items
- Apply discount codes (future feature)

#### Checkout Process
- Review order summary
- Select or add delivery address
- Choose payment method (COD only)
- Place order with confirmation

#### Order Management
- View all placed orders (active and history)
- Track order status in real-time
- Cancel orders before preparation
- Rate and review completed orders (future feature)

#### Account Management
- Update personal information
- Manage multiple addresses
- Upload/change profile picture
- Reset password securely via OTP
- View account activity

#### Support
- Submit contact/support messages
- View support ticket status
- Get help and FAQs

---

### 🍽️ Restaurant Partner Features

#### Restaurant Management
- Setup and manage restaurant profile
- Upload restaurant banner and logo
- Update contact information and location
- Set operating hours and details

#### Menu Management
- Add new menu items with multiple images
- Edit existing menu items
- Set prices and descriptions
- Categorize items (appetizers, mains, desserts, etc.)
- Upload high-quality food images
- Update availability status

#### Order Management
- View incoming orders in real-time
- See order details (items, customer info, address)
- Manage order status:
  - **Pending** - Order received
  - **Preparing** - Kitchen is preparing
  - **Ready** - Ready for pickup by rider
  - **Delivered** - Order delivered
  - **Cancelled** - Order cancelled

#### Analytics & Earnings
- View daily/weekly/monthly earnings
- Track total orders and completion rate
- Analyze best-selling items
- View customer feedback and ratings

#### Profile & Security
- Update restaurant information
- Change profile picture
- Reset password securely
- Manage bank details for payouts

---

### 🚴 Rider Features

#### Order Acceptance
- View available orders for delivery
- See order details, pickup location, and destination
- Accept delivery assignments
- Track earnings per order

#### Delivery Management
- View ongoing deliveries
- Update delivery status:
  - **Assigned** - Order assigned to rider
  - **Picked Up** - Order picked up from restaurant
  - **On The Way** - Delivering to customer
  - **Delivered** - Order delivered successfully
- View customer information and delivery address
- Navigate using geolocation

#### Earnings & Performance
- View daily earnings
- See commission per delivery (15% of order value)
- Track total completed deliveries
- View completion rate and stats
- See payment status for orders

#### Account Management
- Setup rider profile with documents
- Add bank account for payouts
- Upload profile picture
- Reset password securely
- View personal delivery history

#### Help & Support
- Access rider guidelines
- View FAQ and support resources
- Contact support for issues

---

### 👨‍💼 Admin Features

#### Dashboard Overview
- Real-time platform statistics
- Total users, restaurants, riders count
- Daily/monthly revenue metrics
- Active orders and fulfillment rate
- Key performance indicators (KPIs)

#### User Management
- **Customers**
  - View all registered customers
  - Delete or block customers if needed
  - View customer details and activity

- **Restaurants (Managers)**
  - View all registered restaurants
  - Monitor restaurant performance
  - Delete or suspend restaurants
  - Check menu and order details

- **Riders (Delivery Partners)**
  - View all active riders
  - Monitor delivery performance
  - Delete or suspend riders
  - Check earnings and payment status

#### Order Management
- View all platform orders
- Search and filter orders by status
- View detailed order information
- Mark payments as received
- Handle order disputes

#### Support & Communication
- View all customer contact messages
- Manage support tickets
- Delete or archive messages
- Respond to inquiries

#### User Creation
- Add new customers, restaurants, or riders
- Bulk user import (future feature)
- Set initial passwords

#### Analytics
- Generate platform reports
- View revenue breakdowns
- Track KPIs and trends
- Export data for analysis

---

## 💾 Database Models

### User Model
```javascript
{
  fullName: String,
  email: String (unique),
  phone: String,
  password: String (hashed),
  role: "customer" | "partner" | "manager" | "admin",
  dob: String,
  gender: "male" | "female" | "other",
  address: String,
  city: String,
  pin: String,
  photo: {
    url: String,
    publicID: String
  },
  geolocation: {
    lat: String,
    lon: String
  },
  paymentDetail: {
    upi: String,
    account_number: String,
    IFSC: String
  },
  restaurantName: String, // For managers only
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Order Model
```javascript
{
  orderNumber: String (unique),
  userId: ObjectId (ref: User),
  restaurantId: ObjectId (ref: User),
  riderId: ObjectId (ref: User),
  items: [
    {
      menuItemId: ObjectId,
      name: String,
      quantity: Number,
      price: Number,
      images: [String]
    }
  ],
  orderValue: {
    subtotal: Number,
    deliveryFee: Number,
    tax: Number,
    discount: Number,
    total: Number
  },
  deliveryAddress: {
    fullAddress: String,
    city: String,
    pin: String,
    geolocation: { lat, lon }
  },
  status: "pending" | "preparing" | "ready" | "partnerAssigned" | "pickedUp" | "onTheWay" | "delivered" | "cancelled",
  paymentStatus: "pending" | "paid" | "failed",
  paymentMethod: "cod" | "online",
  specialInstructions: String,
  deliveredAt: Timestamp,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Menu Model
```javascript
{
  restaurantId: ObjectId (ref: User),
  name: String,
  description: String,
  category: String,
  price: Number,
  images: [
    {
      url: String,
      publicID: String
    }
  ],
  isAvailable: Boolean,
  preparationTime: Number, // in minutes
  ratings: Number,
  reviews: Number,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### OTP Model
```javascript
{
  email: String,
  otp: String,
  expiresAt: Timestamp,
  createdAt: Timestamp
}
```

### Contact Model
```javascript
{
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  status: "new" | "in-progress" | "resolved",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

## 🔐 Authentication & Security

### Authentication Flow

1. **User Registration**
   - User provides email, password, and basic info
   - Password is hashed using bcrypt (salt rounds: 10)
   - User account is created with "customer" role

2. **User Login**
   - User enters email and password
   - System verifies credentials against hashed password
   - JWT token is generated and sent to client
   - Token is stored in cookies (httpOnly for security)

3. **Password Reset**
   - User requests password reset
   - OTP is generated and sent to email via Nodemailer
   - OTP is valid for 5 minutes
   - User verifies OTP and sets new password
   - Password is hashed and stored

4. **Protected Routes**
   - All protected endpoints require valid JWT token
   - Token is verified in `Protect` middleware
   - Role-based access control via `ManagerProtect`, `AdminProtect` middlewares

### Security Features

✅ **Password Hashing** - bcrypt with 10 salt rounds
✅ **JWT Authentication** - Secure token-based auth
✅ **OTP Verification** - For password resets
✅ **Role-Based Access Control** - Endpoint protection
✅ **CORS** - Restricted to approved origins
✅ **Cookie Security** - httpOnly, Secure flags
✅ **Input Validation** - Server-side validation
✅ **Error Handling** - No sensitive data in errors
✅ **Environment Variables** - Secrets not in code
✅ **Image Storage** - Cloudinary for secure CDN

---

## 🎓 Educational Purpose

This project is built as an **educational platform** to demonstrate:

1. **MERN Stack Architecture** - Building full-stack applications
2. **Role-Based Access Control** - Implementing multi-tenant systems
3. **RESTful API Design** - Best practices for API development
4. **Database Design** - Schema design for food delivery systems
5. **Authentication & Security** - Implementing secure auth flows
6. **Real-time Updates** - Order tracking and status management
7. **File Upload** - Handling image uploads with Cloudinary
8. **Error Handling** - Comprehensive error management
9. **Code Organization** - Scalable project structure
10. **DevOps & Deployment** - Production-ready setup

Perfect for learning:
- Backend development with Node.js/Express
- Frontend development with React
- Database design with MongoDB
- Authentication systems
- API integration
- State management with React Context
- Responsive UI with Tailwind CSS

---

## 🚀 Future Improvements

### Payment Integration
- [ ] Online payment gateway (Stripe, PayPal)
- [ ] Wallet system for prepaid orders
- [ ] Discount codes and promotional offers
- [ ] Subscription plans

### Features Enhancement
- [ ] Real-time notifications (WebSockets)
- [ ] Order rating and review system
- [ ] Push notifications for order updates
- [ ] In-app chat support between customer and rider
- [ ] Favorite restaurants and items
- [ ] Loyalty program and rewards
- [ ] Advanced analytics dashboard

### Performance & Optimization
- [ ] Caching with Redis
- [ ] Search optimization with Elasticsearch
- [ ] Image optimization and compression
- [ ] Database query optimization
- [ ] API rate limiting

### Mobile & Expansion
- [ ] Native mobile apps (React Native)
- [ ] Multi-language support (i18n)
- [ ] Multi-currency support
- [ ] Subscription model for restaurants
- [ ] API marketplace for third-party integrations

### Scalability
- [ ] Microservices architecture
- [ ] Message queue (RabbitMQ, Kafka)
- [ ] Load balancing
- [ ] Database replication
- [ ] CDN integration

### Security Enhancements
- [ ] Two-factor authentication (2FA)
- [ ] Advanced fraud detection
- [ ] PCI compliance for payments
- [ ] Data encryption at rest
- [ ] API security best practices

---

## 📝 Contributing

We welcome contributions from the community! Please follow these guidelines:

### How to Contribute

1. **Fork the Repository**
   ```bash
   git clone https://github.com/yourusername/craveit.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Write clean, well-documented code
   - Follow the existing code style
   - Add comments for complex logic

4. **Commit Your Changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```

5. **Push to Branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Describe your changes clearly
   - Link any related issues
   - Provide screenshots for UI changes

### Code Standards

- **Backend**: Use meaningful variable names, add JSDoc comments
- **Frontend**: Follow React best practices, use functional components
- **Styling**: Use Tailwind CSS utilities, maintain consistency
- **Testing**: Test your changes thoroughly before submitting PR

### Issues & Bugs

Found a bug? Please open an issue with:
- Bug description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/logs if applicable

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Nitish Kumar** - Full Stack Developer

---

## 🙏 Acknowledgments

- React documentation and community
- MongoDB and Mongoose documentation
- Tailwind CSS framework
- Cloudinary for image storage
- All contributors and testers

---

## 📞 Support

For support, please:
- Open an issue on GitHub
- Contact via email
- Check documentation in `/docs` folder
- Review existing issues for solutions

---

## 🎉 Thank You

Thank you for using CraveIt! If you find this project helpful, please consider:
- ⭐ Starring the repository
- 🍴 Forking for your own use
- 💬 Providing feedback and suggestions
- 🤝 Contributing improvements

---

<div align="center">

**Made with ❤️ for the Web Development Community**

[⬆ Back to Top](#craveit---full-stack-mern-food-delivery-platform)

</div>
