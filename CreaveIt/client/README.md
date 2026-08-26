CraveIt 🍔
Full-Stack Food Ordering & Delivery Platform

CraveIt is a full-stack food ordering and delivery platform built with the MERN stack. The platform provides separate experiences for Customers, Restaurant Managers, Delivery Partners, and Administrators.

The project currently includes a functional customer ordering flow from browsing restaurants and menu items through cart and checkout. The Admin Dashboard is fully implemented, while the Customer, Restaurant Manager, and Delivery Partner dashboards are still under development.

🚀 Features
👨‍💼 Admin Dashboard — Completed

The Admin Dashboard provides centralized control over the CraveIt platform.

Admins can:

View complete platform statistics.
Monitor total customers.
Monitor registered restaurants.
Monitor delivery partners.
Monitor menu items.
Monitor active orders.
Monitor customer messages.
Manage customer accounts.
Manage restaurant manager accounts.
Manage delivery partner accounts.
Add new users directly from the admin dashboard.
Create users with different roles:
Customer
Restaurant Manager
Delivery Partner
Delete users.
Refresh management data.
Manage contact messages.
Delete contact messages.
Automatically fetch the administrator's current geolocation when creating users.
Configure user details based on their selected role.
Store payment details.
Store identity and business documents.
Manage user account status.
Admin User Creation

The administrator can create users from a single interface.

Supported roles:

Customer
Restaurant Manager
Delivery Partner

Depending on the selected role, different information can be stored.

Common user information includes:

Full Name
Email
Phone Number
Password
Date of Birth
Gender
Address
City
PIN Code
Profile Photo
Geolocation
Account Status

Additional role-specific information can include:

Customer
Basic Profile Details
Payment Information
Location Information
Identity Documents
Restaurant Manager
Restaurant Name
Cuisine
Restaurant Location
Payment Details
GST Details
FSSAI Details
Other Business Information
Delivery Partner
Vehicle Information
Current Location
Bank Details
RC Details
Driving License
Identity Documents

Passwords are securely hashed before storing user accounts in the database.

👤 Customer Features

The customer side of the application allows users to explore and order food.

Currently implemented features include:

🔐 Authentication

Customers can:

Register a new account.
Log in.
Log out.
Access authenticated routes.
Maintain authentication using secure cookies.

Authentication is handled using backend APIs and HTTP-only cookies.

🍽️ Restaurant Browsing

Customers can:

View available restaurants.
Browse restaurant details.
View restaurant information.
Explore available food items.
Browse menu categories.

Restaurant data is dynamically loaded from the backend.

🍕 Food & Menu Items

Customers can:

View food items.
View item details.
Browse items from different restaurants.
Check item prices.
View food images.
Add food items to the cart.
🛒 Shopping Cart

The cart system allows customers to:

Add items to the cart.
Remove items from the cart.
Update item quantities.
View selected items.
View total order value.
Manage their order before checkout.

The cart is integrated with the application's ordering flow.

💳 Checkout Flow

The customer ordering process currently supports the flow up to checkout.

The implemented flow is:

Browse Restaurants
↓
Select Restaurant
↓
Browse Menu
↓
Add Items to Cart
↓
Manage Cart
↓
Proceed to Checkout

During checkout, customers can review:

Selected food items.
Item quantities.
Prices.
Order totals.
Delivery details.
Payment-related information.
🚧 Features After Checkout

The following functionality is planned or still under development:

Final order confirmation.
Payment processing.
Order creation after successful payment.
Restaurant order acceptance.
Order preparation status.
Delivery partner assignment.
Live delivery tracking.
Order status updates.
Order history.
Customer order tracking.
Delivery completion confirmation.
Ratings and reviews.
🏪 Restaurant Manager Dashboard — In Progress

The Restaurant Manager Dashboard is currently under development.

The dashboard is intended to allow restaurant owners or managers to manage their restaurant operations.

Planned functionality includes:

Restaurant profile management.
Restaurant information updates.
Menu item creation.
Menu item editing.
Menu item deletion.
Food image management.
Category management.
Order management.
Accept or reject orders.
Update food preparation status.
View incoming orders.
View completed orders.
View restaurant statistics.
Manage restaurant availability.

Current status:

🚧 Dashboard Under Development
🛵 Delivery Partner Dashboard — In Progress

The Delivery Partner Dashboard is also under development.

The dashboard is intended to provide delivery partners with tools to manage deliveries.

Planned functionality includes:

View assigned orders.
Accept delivery requests.
View pickup location.
View customer delivery location.
Update current location.
Update delivery status.
Mark orders as picked up.
Mark orders as delivered.
View delivery history.
Manage profile information.
Manage payment details.

Current status:

🚧 Dashboard Under Development
🧑 Customer Dashboard — In Progress

The customer dashboard is also being expanded.

Planned features include:

Profile management.
Address management.
Saved locations.
Order history.
Active order tracking.
Account settings.
Payment information.
Favorite restaurants.
Favorite food items.
Reviews and ratings.

Current status:

🚧 Dashboard Under Development
🛠️ Tech Stack
Frontend
React
Vite
React Router DOM
Tailwind CSS
Axios
React Hot Toast
React Icons
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
Cookie Parser
bcrypt / bcryptjs
Cloudinary
CORS
Morgan
dotenv
📂 Project Structure
CraveIt
│
├── client
│ │
│ ├── src
│ │ ├── components
│ │ ├── pages
│ │ ├── layouts
│ │ ├── context
│ │ ├── config
│ │ └── assets
│ │
│ └── package.json
│
├── server
│ │
│ ├── src
│ │ ├── config
│ │ │ ├── db.js
│ │ │ └── cloudinary.js
│ │ │
│ │ ├── controllers
│ │ │ ├── authController.js
│ │ │ ├── adminController.js
│ │ │ ├── userController.js
│ │ │ ├── restaurantController.js
│ │ │ └── riderController.js
│ │ │
│ │ ├── models
│ │ │ ├── User.js
│ │ │ ├── Restaurant.js
│ │ │ ├── MenuItem.js
│ │ │ └── Order.js
│ │ │
│ │ ├── routers
│ │ │ ├── authRouter.js
│ │ │ ├── adminRouter.js
│ │ │ ├── userRouter.js
│ │ │ ├── restaurantRouter.js
│ │ │ └── riderRouter.js
│ │ │
│ │ └── middleware
│ │
│ └── package.json
│
└── README.md
🔐 User Roles

CraveIt currently supports the following user roles:

Role Description
Customer Can browse restaurants, view menu items, add food to cart and proceed to checkout.
Manager Manages restaurant operations. Dashboard is currently under development.
Partner Handles food deliveries. Dashboard is currently under development.
Admin Has complete administrative control over users, restaurants, partners, messages and platform data.
📊 Admin Dashboard Modules
Dashboard Overview

The Admin Dashboard displays important platform statistics such as:

Customers
Restaurants
Delivery Partners
Menu Items
Messages
Active Orders

The dashboard supports manual data refreshing.

Customer Management

Admins can:

View Customers
Add Customers
Delete Customers
Refresh Customer Data
View Customer Information
Restaurant Management

Admins can:

View Restaurants
Add Restaurant Managers
Delete Restaurant Managers
Refresh Restaurant Data
View Restaurant Information
Delivery Partner Management

Admins can:

View Delivery Partners
Add Delivery Partners
Delete Delivery Partners
Refresh Partner Data
View Partner Information
Contact Message Management

Admins can:

View Customer Messages
View Sender Information
View Message Subject
View Message Content
View Received Date
Delete Messages
Refresh Messages
📍 Geolocation Support

When creating a user through the Admin Dashboard, the administrator can fetch the current location.

The application stores:

{
"geolocation": {
"lat": "23.262527",
"lon": "77.465967"
}
}

This can be useful for:

Delivery services.
Restaurant locations.
Customer addresses.
Partner location tracking.
Future map integration.
🖼️ Image Management

The application supports image storage using Cloudinary.

Images can be used for:

User profile images.
Restaurant images.
Food images.

Example structure:

{
"photo": {
"publicID": "",
"url": "https://example.com/image.jpg"
}
}
🔌 API Architecture

The backend is divided into multiple routers.

/auth
/public
/user
/restaurant
/rider
/admin

Example API structure:

GET /admin/overview

GET /admin/customers
GET /admin/managers
GET /admin/riders

POST /admin/add-user

DELETE /admin/customer/:id
DELETE /admin/manager/:id
DELETE /admin/rider/:id

GET /admin/contact-messages
DELETE /admin/contact-messages/:id
🧾 User Data Structure

A user can contain information similar to:

{
"photo": {
"publicID": "",
"url": "https://example.com/profile.jpg"
},
"geolocation": {
"lat": "23.262527",
"lon": "77.465967"
},
"paymentDetail": {
"upi": "user@upi",
"account_number": "123456789",
"IFSC": "BANK0001234"
},
"document": {
"gst": "",
"fssai": "",
"rc": "",
"dl": "",
"uidai": "",
"pan": ""
},
"fullName": "User Name",
"email": "user@example.com",
"phone": "9876543210",
"role": "customer",
"dob": "2005-03-12",
"gender": "male",
"address": "Delhi",
"city": "Delhi",
"pin": "110001",
"restaurantName": null,
"cuisine": null,
"isActive": "active"
}
⚙️ Installation

1. Clone the Repository
   git clone <your-repository-url>
   cd CraveIt
2. Install Frontend Dependencies
   cd client
   npm install
3. Install Backend Dependencies
   cd ../server
   npm install
   🔑 Environment Variables

Create a .env file inside the server directory.

Example:

PORT=4500

MONGODB_URL=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

CLIENT_URL=http://localhost:5173

Do not expose your .env file publicly.

▶️ Running the Application
Start Backend
cd server
npm run dev

The backend runs on:

http://localhost:4500
Start Frontend
cd client
npm run dev

The frontend usually runs on:

http://localhost:5173
🔄 Application Flow
Customer
│
▼
Register / Login
│
▼
Browse Restaurants
│
▼
View Restaurant Menu
│
▼
Select Food Items
│
▼
Add Items to Cart
│
▼
Manage Cart
│
▼
Checkout
│
▼
🚧 Order Processing & Delivery Flow
🗺️ Development Status
Module Status
Authentication ✅ Completed
Public Pages ✅ Available
Restaurant Browsing ✅ Completed
Menu Browsing ✅ Completed
Food Item Selection ✅ Completed
Cart Management ✅ Completed
Checkout Flow ✅ Completed
Admin Dashboard ✅ Completed
Customer Management ✅ Completed
Restaurant Manager Management ✅ Completed
Delivery Partner Management ✅ Completed
Contact Message Management ✅ Completed
Admin User Creation ✅ Completed
Geolocation Fetching ✅ Completed
Password Hashing ✅ Implemented
Customer Dashboard 🚧 In Progress
Restaurant Manager Dashboard 🚧 In Progress
Delivery Partner Dashboard 🚧 In Progress
Order Processing After Checkout 🚧 In Progress
Payment Integration 🚧 In Progress
Live Order Tracking 🚧 Planned
Delivery Assignment 🚧 Planned
🔮 Future Improvements

Future versions of CraveIt may include:

Online payment gateway integration.
Cash on delivery support.
Real-time order updates.
Socket.io integration.
Live delivery tracking.
Google Maps integration.
Automatic delivery partner assignment.
Restaurant analytics.
Revenue reports.
Customer order history.
Restaurant ratings and reviews.
Push notifications.
Email notifications.
SMS notifications.
Advanced search and filtering.
Role-based route protection.
Admin analytics and reports.
👨‍💻 Author

Nitish Kumar

Full Stack Developer

Built using the MERN Stack.

⭐ Project Status

CraveIt is actively under development.

The core customer experience is implemented through the checkout stage, and the Admin Dashboard is currently the most complete management module.

The remaining major development focuses on completing the Customer, Restaurant Manager, and Delivery Partner dashboards, followed by the complete order lifecycle after checkout, including order processing, payment handling, delivery assignment, tracking, and delivery completion.

🎯 Current Development Priority

1. Complete Customer Dashboard
   ↓
2. Complete Restaurant Manager Dashboard
   ↓
3. Complete Delivery Partner Dashboard
   ↓
4. Implement Order Processing
   ↓
5. Integrate Payment System
   ↓
6. Implement Delivery Assignment
   ↓
7. Add Real-Time Order Tracking

CraveIt — From Restaurant Discovery to Food Delivery. 🍔🚀
