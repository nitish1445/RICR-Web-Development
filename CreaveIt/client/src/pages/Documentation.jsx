import React, { useState } from "react";

import {
  FaBookOpen,
  FaUsers,
  FaUser,
  FaStore,
  FaMotorcycle,
  FaUserShield,
  FaUtensils,
  FaCartShopping,
  FaClipboardList,
  FaWallet,
  FaMoneyBillTrendUp,
  FaLock,
  FaCode,
  FaServer,
  FaDatabase,
  FaMobileScreen,
  FaChevronDown,
  FaCircleCheck,
  FaArrowRight,
  FaCreditCard,
  FaChartLine,
  FaGear,
  FaFile,
  FaDownload,
  FaGithub,
  FaClock,
  FaShieldHalved,
  FaRocket,
  FaLightbulb,
} from "react-icons/fa6";

const Documentation = () => {
  const [openSection, setOpenSection] = useState("overview");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const features = [
    {
      id: "overview",
      icon: <FaBookOpen />,
      title: "Platform Overview",
      content: (
        <>
          <p className="mb-4">
            CraveIt is a comprehensive full-stack MERN food delivery platform
            that connects customers, restaurants, delivery riders, and
            administrators in a seamless ecosystem. Built with modern web
            technologies, it provides role-based access control, real-time order
            tracking, and a complete management system for all stakeholders.
          </p>

          <div className="mt-5 bg-[#FBF3E7] p-4">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-[#E8491D]">
              Key Highlights
            </p>

            <ul className="space-y-2 text-sm text-[#8A7C6A]">
              <li className="flex items-center gap-2">
                <FaCircleCheck className="text-[#E8491D]" />
                Role-Based Access Control - 4 distinct user roles
              </li>
              <li className="flex items-center gap-2">
                <FaCircleCheck className="text-[#E8491D]" />
                Responsive Design - Desktop and mobile support
              </li>
              <li className="flex items-center gap-2">
                <FaCircleCheck className="text-[#E8491D]" />
                Real-Time Order Management - Track from placement to delivery
              </li>
              <li className="flex items-center gap-2">
                <FaCircleCheck className="text-[#E8491D]" />
                Restaurant Management - Full menu and order system
              </li>
              <li className="flex items-center gap-2">
                <FaCircleCheck className="text-[#E8491D]" />
                Rider Tracking - Complete delivery workflow
              </li>
              <li className="flex items-center gap-2">
                <FaCircleCheck className="text-[#E8491D]" />
                Admin Dashboard - Comprehensive platform oversight
              </li>
            </ul>
          </div>

          <p className="mt-4 text-sm leading-6 text-[#8A7C6A]">
            This is an educational project built to demonstrate MERN stack
            expertise, role-based architecture, and best practices in web
            development while maintaining production-ready code standards.
          </p>
        </>
      ),
    },
    {
      id: "roles",
      icon: <FaUsers />,
      title: "Four Role-Based System",
      content: (
        <div className="grid gap-4 sm:grid-cols-2">
          <RoleCard
            icon={<FaUser />}
            title="Customer/User"
            description="Browse restaurants, place orders, track deliveries, manage addresses, update profile, and contact support."
          />

          <RoleCard
            icon={<FaStore />}
            title="Restaurant Partner"
            description="Manage restaurant profile, menu items, incoming orders, order status, and view earnings & analytics."
          />

          <RoleCard
            icon={<FaMotorcycle />}
            title="Delivery Rider"
            description="Accept delivery assignments, track ongoing orders, manage profile, view earnings per delivery, and delivery history."
          />

          <RoleCard
            icon={<FaUserShield />}
            title="Administrator"
            description="Manage all users, restaurants, riders, orders, platform activity, analytics, and overall system oversight."
          />
        </div>
      ),
    },
    {
      id: "customer",
      icon: <FaUser />,
      title: "Customer Features",
      content: (
        <>
          <p className="mb-5 text-sm leading-6 text-[#8A7C6A]">
            Customers have access to a comprehensive platform for browsing
            restaurants, ordering food, tracking deliveries, and managing their
            accounts.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <FeatureGroup
              title="Dashboard & Browsing"
              items={[
                "Personalized dashboard with quick stats",
                "Browse all available restaurants",
                "Search restaurants by name or cuisine",
                "View restaurant details and menu",
                "Filter by popularity or distance",
              ]}
            />

            <FeatureGroup
              title="Shopping & Ordering"
              items={[
                "Add items to shopping cart",
                "View cart with item details",
                "Modify quantities or remove items",
                "View order summary with pricing",
                "Select delivery address",
                "Choose payment method (COD)",
                "Place order with confirmation",
              ]}
            />

            <FeatureGroup
              title="Order Management"
              items={[
                "View all placed orders",
                "Track order status in real-time",
                "See order history (active & completed)",
                "Cancel orders before preparation",
                "View order details and delivery address",
              ]}
            />

            <FeatureGroup
              title="Account Management"
              items={[
                "Update personal information",
                "Manage multiple delivery addresses",
                "Upload/change profile picture",
                "Reset password securely via OTP",
                "View account activity",
                "Submit support inquiries",
              ]}
            />
          </div>
        </>
      ),
    },
    {
      id: "restaurant",
      icon: <FaStore />,
      title: "Restaurant Partner Dashboard",
      content: (
        <>
          <p className="mb-5 text-sm leading-6 text-[#8A7C6A]">
            Restaurant partners receive a dedicated dashboard for managing their
            business, menu items, incoming orders, and tracking earnings.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <FeatureGroup
              title="Restaurant Management"
              items={[
                "Setup and manage restaurant profile",
                "Upload restaurant banner and logo",
                "Update contact information",
                "Set operating hours and details",
                "Manage business location",
              ]}
            />

            <FeatureGroup
              title="Menu Management"
              items={[
                "Add new menu items with images",
                "Edit existing menu items",
                "Set prices and descriptions",
                "Categorize items (appetizers, mains, etc.)",
                "Upload high-quality food images",
                "Update availability status",
              ]}
            />

            <FeatureGroup
              title="Order Management"
              items={[
                "View incoming orders in real-time",
                "See order details and customer info",
                "Update order status (pending → ready)",
                "Track order preparation time",
                "View customer address and contact",
                "Manage order acceptance/rejection",
              ]}
            />

            <FeatureGroup
              title="Analytics & Earnings"
              items={[
                "View daily/weekly/monthly earnings",
                "Track total orders and completion rate",
                "Analyze best-selling items",
                "View customer feedback and ratings",
                "Generate performance reports",
              ]}
            />
          </div>
        </>
      ),
    },
    {
      id: "rider",
      icon: <FaMotorcycle />,
      title: "Delivery Rider Dashboard",
      content: (
        <>
          <p className="mb-5 text-sm leading-6 text-[#8A7C6A]">
            Delivery riders have a focused dashboard for managing delivery
            assignments, tracking earnings, and maintaining their profile.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <FeatureGroup
              title="Order Acceptance"
              items={[
                "View available orders for delivery",
                "See order details and locations",
                "View delivery earning per order",
                "Accept delivery assignments",
                "Reject unavailable deliveries",
              ]}
            />

            <FeatureGroup
              title="Delivery Management"
              items={[
                "View ongoing deliveries",
                "Update delivery status in real-time",
                "View customer information",
                "Access delivery address",
                "Navigate using geolocation",
                "Mark order as delivered",
              ]}
            />

            <FeatureGroup
              title="Earnings & Performance"
              items={[
                "View daily earnings",
                "See commission per delivery (15%)",
                "Track total completed deliveries",
                "View completion rate and stats",
                "See payment status for orders",
                "View delivery history",
              ]}
            />

            <FeatureGroup
              title="Account Management"
              items={[
                "Setup rider profile",
                "Add bank account details",
                "Upload profile picture",
                "Reset password securely",
                "Manage payment information",
                "View personal details",
              ]}
            />
          </div>
        </>
      ),
    },
    {
      id: "admin",
      icon: <FaUserShield />,
      title: "Admin Dashboard",
      content: (
        <>
          <p className="mb-5 text-sm leading-6 text-[#8A7C6A]">
            Administrators have platform-level access for managing all aspects
            of the food delivery ecosystem with comprehensive oversight.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <FeatureGroup
              title="Dashboard Overview"
              items={[
                "Real-time platform statistics",
                "Total users, restaurants, riders count",
                "Daily/monthly revenue metrics",
                "Active orders and fulfillment rate",
                "Key performance indicators (KPIs)",
              ]}
            />

            <FeatureGroup
              title="User Management"
              items={[
                "View all registered customers",
                "Delete or block customers",
                "View customer details and activity",
                "Manage restaurant partners",
                "Monitor rider performance",
              ]}
            />

            <FeatureGroup
              title="Restaurant Management"
              items={[
                "View all restaurants",
                "Monitor restaurant performance",
                "Check menu items",
                "View restaurant orders",
                "Delete or suspend restaurants",
              ]}
            />

            <FeatureGroup
              title="Order & Support"
              items={[
                "View all platform orders",
                "Search and filter by status",
                "Mark payments as received",
                "Handle order disputes",
                "View support messages",
                "Manage support tickets",
              ]}
            />
          </div>
        </>
      ),
    },
    {
      id: "ordering",
      icon: <FaCartShopping />,
      title: "Food Ordering Workflow",
      content: (
        <div>
          <p className="mb-5 text-sm leading-6 text-[#8A7C6A]">
            The platform follows a structured food ordering and delivery
            workflow, ensuring smooth coordination between all stakeholders.
          </p>

          <div className="grid gap-3">
            {[
              "Customer browses restaurants and cuisines",
              "Customer views restaurant menu and items",
              "Customer selects food items with preferences",
              "Items are added to the shopping cart",
              "Customer reviews cart details and total price",
              "Customer proceeds to checkout",
              "Customer selects/adds delivery address",
              "Customer chooses payment method (COD)",
              "Order is placed and confirmed",
              "Restaurant receives the order notification",
              "Restaurant processes the order",
              "Restaurant updates order status to ready",
              "Delivery rider sees available order",
              "Rider accepts the delivery assignment",
              "Rider picks up order from restaurant",
              "Rider updates status to on-the-way",
              "Rider delivers order to customer",
              "Order marked as delivered",
              "Earnings distributed to restaurant & rider",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded bg-[#FBF3E7] p-4 transition hover:bg-white"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#E8491D] text-xs font-bold text-white">
                  {index + 1}
                </div>

                <p className="text-sm font-medium text-[#1F1811]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "payment",
      icon: <FaCreditCard />,
      title: "Payment System",
      content: (
        <>
          <div className="bg-[#FFF3E8] p-5 rounded border-l-4 border-[#E8491D]">
            <div className="flex items-center gap-3">
              <FaMoneyBillTrendUp className="text-xl text-[#E8491D]" />

              <div>
                <h4 className="font-bold text-[#1F1811]">
                  Current Payment Method
                </h4>

                <p className="mt-1 text-sm text-[#8A7C6A]">
                  Currently, the platform supports{" "}
                  <strong>Cash on Delivery (COD)</strong> only.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 bg-[#E8F5E9] p-5 rounded border-l-4 border-green-500">
            <div className="flex items-center gap-3">
              <FaRocket className="text-xl text-green-600" />

              <div>
                <h4 className="font-bold text-[#1F1811]">
                  Future Online Payment Integration
                </h4>

                <p className="mt-2 text-sm leading-6 text-[#8A7C6A]">
                  Online payment functionality is planned for future
                  development. Payment gateways will be integrated to support:
                </p>

                <ul className="mt-3 space-y-1 text-sm text-[#8A7C6A]">
                  <li className="flex items-center gap-2">
                    <FaCircleCheck className="text-green-600" />
                    Stripe and PayPal integration
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCircleCheck className="text-green-600" />
                    UPI and mobile wallets
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCircleCheck className="text-green-600" />
                    Credit and debit card payments
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCircleCheck className="text-green-600" />
                    Digital wallet support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "earnings",
      icon: <FaChartLine />,
      title: "Earnings Distribution",
      content: (
        <>
          <p className="mb-5 text-sm leading-6 text-[#8A7C6A]">
            Earnings are calculated and distributed only after an order has been
            successfully delivered. The commission structure is as follows:
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded bg-[#1F1811] p-5 text-center">
              <FaStore className="mx-auto text-xl text-[#E8491D]" />

              <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[#8A7C6A]">
                Restaurant
              </p>

              <h3 className="mt-2 text-3xl font-bold text-[#FBF3E7]">75%</h3>

              <p className="mt-2 text-xs text-[#C9BEB0]">
                Primary stakeholder earning
              </p>
            </div>

            <div className="rounded bg-white p-5 text-center">
              <FaMotorcycle className="mx-auto text-xl text-[#E8491D]" />

              <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[#8A7C6A]">
                Delivery Rider
              </p>

              <h3 className="mt-2 text-3xl font-bold text-[#1F1811]">15%</h3>

              <p className="mt-2 text-xs text-[#8A7C6A]">
                Rider delivery commission
              </p>
            </div>

            <div className="rounded bg-white p-5 text-center">
              <FaChartLine className="mx-auto text-xl text-[#E8491D]" />

              <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[#8A7C6A]">
                Platform
              </p>

              <h3 className="mt-2 text-3xl font-bold text-[#1F1811]">10%</h3>

              <p className="mt-2 text-xs text-[#8A7C6A]">
                Platform revenue & operations
              </p>
            </div>
          </div>

          <div className="mt-5 rounded bg-[#FBF3E7] p-4">
            <p className="mb-2 text-sm font-bold text-[#1F1811]">Example:</p>

            <p className="text-sm leading-6 text-[#8A7C6A]">
              For a delivered order worth <strong>₹1,000</strong>:
            </p>

            <ul className="mt-2 space-y-1 text-sm text-[#8A7C6A]">
              <li>
                <strong>Restaurant:</strong> ₹750 (75%)
              </li>
              <li>
                <strong>Delivery Rider:</strong> ₹150 (15%)
              </li>
              <li>
                <strong>Platform:</strong> ₹100 (10%)
              </li>
            </ul>
          </div>
        </>
      ),
    },
    {
      id: "profile",
      icon: <FaGear />,
      title: "Profile & Account Management",
      content: (
        <>
          <p className="mb-5 text-sm leading-6 text-[#8A7C6A]">
            All users can manage and update their account information securely
            with profile picture upload, address management, and secure password
            reset capabilities.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <FeatureGroup
              title="Personal Information"
              items={[
                "Update full name",
                "Update email address",
                "Update phone number",
                "Update date of birth",
                "Update gender",
                "Update address details",
              ]}
            />

            <FeatureGroup
              title="Profile & Photos"
              items={[
                "Upload profile image",
                "Change profile picture",
                "Cloudinary-powered image storage",
                "Automatic image optimization",
                "Old image cleanup",
              ]}
            />

            <FeatureGroup
              title="Address Management"
              items={[
                "Add multiple delivery addresses",
                "Update existing addresses",
                "Set primary address",
                "Manage city and PIN code",
                "Geolocation support",
              ]}
            />

            <FeatureGroup
              title="Security"
              items={[
                "Secure password reset",
                "OTP-based verification",
                "Current password validation",
                "New password confirmation",
                "Password strength requirements",
              ]}
            />
          </div>
        </>
      ),
    },
    {
      id: "security",
      icon: <FaLock />,
      title: "Authentication & Security",
      content: (
        <>
          <p className="mb-5 text-sm leading-6 text-[#8A7C6A]">
            CraveIt implements comprehensive security measures to protect user
            data, ensure secure authentication, and provide role-based access
            control throughout the platform.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <FeatureGroup
              title="Authentication"
              items={[
                "JWT-based token authentication",
                "Secure cookie storage (httpOnly)",
                "User registration and login",
                "OTP-based password reset",
                "Email verification via Nodemailer",
              ]}
            />

            <FeatureGroup
              title="Password Security"
              items={[
                "Bcrypt password hashing (10 rounds)",
                "Current password verification",
                "Password strength requirements",
                "Confirmation password matching",
                "Secure password reset flow",
              ]}
            />

            <FeatureGroup
              title="Access Control"
              items={[
                "Role-based access control (RBAC)",
                "Protected routes by role",
                "Middleware-based protection",
                "Customer-only routes",
                "Restaurant-only routes",
                "Rider-only routes",
                "Admin-only routes",
              ]}
            />

            <FeatureGroup
              title="Infrastructure Security"
              items={[
                "CORS configuration",
                "Environment variables for secrets",
                "Error handling without data leaks",
                "Input validation on server",
                "Cloudinary for secure CDN",
              ]}
            />
          </div>
        </>
      ),
    },
    {
      id: "documents",
      icon: <FaFile />,
      title: "Document Verification",
      content: (
        <div className="grid gap-3 sm:grid-cols-2">
          <FeatureGroup
            title="Rider Documents"
            items={[
              "Driving License details",
              "Vehicle Registration Certificate",
              "Aadhaar / UIDAI details",
              "PAN card details",
              "GST information",
            ]}
          />

          <FeatureGroup
            title="Restaurant Documents"
            items={[
              "Restaurant business documents",
              "Restaurant GST information",
              "FSSAI details",
              "Bank account verification",
              "Business registration",
            ]}
          />
        </div>
      ),
    },
    {
      id: "orders",
      icon: <FaClipboardList />,
      title: "Order Management",
      content: (
        <>
          <p className="mb-5 text-sm leading-6 text-[#8A7C6A]">
            Complete order lifecycle management from creation to delivery, with
            real-time tracking and earnings calculation.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <FeatureGroup
              title="Order Creation & Tracking"
              items={[
                "Create customer orders",
                "Restaurant order management",
                "Order status updates",
                "Order history",
                "Delivered order tracking",
              ]}
            />

            <FeatureGroup
              title="Order Processing & Earnings"
              items={[
                "Customer information display",
                "Order value calculation",
                "Completed order earnings",
                "Cancelled orders excluded from earnings",
                "Pending orders excluded from earnings",
              ]}
            />
          </div>
        </>
      ),
    },
    {
      id: "tech",
      icon: <FaCode />,
      title: "Technology Stack",
      content: (
        <div className="grid gap-4 sm:grid-cols-2">
          <TechCard
            icon={<FaMobileScreen />}
            title="Frontend"
            items={[
              "React 19",
              "Vite (build tool)",
              "Tailwind CSS 4",
              "React Router v7",
              "Axios (HTTP client)",
              "React Hot Toast",
              "React Icons",
            ]}
          />

          <TechCard
            icon={<FaServer />}
            title="Backend"
            items={[
              "Node.js",
              "Express.js 5",
              "REST APIs",
              "JWT Authentication",
              "Bcrypt hashing",
              "Multer (file upload)",
              "Morgan (logging)",
            ]}
          />

          <TechCard
            icon={<FaDatabase />}
            title="Database"
            items={[
              "MongoDB (NoSQL)",
              "Mongoose (ODM)",
              "Schema validation",
              "Indexing",
              "Data relationships",
            ]}
          />

          <TechCard
            icon={<FaShieldHalved />}
            title="Security & APIs"
            items={[
              "Cloudinary (image storage)",
              "Nodemailer (email)",
              "Cookie Parser",
              "CORS protection",
              "Environment variables",
            ]}
          />
        </div>
      ),
    },
    {
      id: "database",
      icon: <FaDatabase />,
      title: "Database Models",
      content: (
        <>
          <p className="mb-5 text-sm leading-6 text-[#8A7C6A]">
            The platform uses MongoDB with Mongoose ODM to define and manage
            data schemas for users, orders, menu items, and support messages.
          </p>

          <div className="grid gap-4">
            <ModelCard
              name="User Model"
              fields={[
                "fullName, email (unique), phone",
                "password (hashed), role (customer|partner|manager|admin)",
                "dob, gender, address, city, pin",
                "photo (url, publicID), geolocation (lat, lon)",
                "paymentDetail (upi, account, IFSC)",
                "restaurantName, timestamps",
              ]}
            />

            <ModelCard
              name="Order Model"
              fields={[
                "orderNumber (unique), userId, restaurantId, riderId",
                "items array with details and pricing",
                "orderValue (subtotal, delivery, tax, total)",
                "deliveryAddress with geolocation",
                "status (pending→ready→delivered)",
                "paymentStatus, paymentMethod, timestamps",
              ]}
            />

            <ModelCard
              name="Menu Model"
              fields={[
                "restaurantId, name, description, category",
                "price, images (with publicID)",
                "isAvailable, preparationTime",
                "ratings, reviews, timestamps",
              ]}
            />

            <ModelCard
              name="OTP Model"
              fields={["email, otp (hashed), expiresAt, createdAt"]}
            />

            <ModelCard
              name="Contact Model"
              fields={[
                "name, email, phone, subject, message",
                "status (new|in-progress|resolved)",
                "createdAt, updatedAt",
              ]}
            />
          </div>
        </>
      ),
    },
    {
      id: "installation",
      icon: <FaDownload />,
      title: "Installation & Setup",
      content: (
        <>
          <p className="mb-4 text-sm leading-6 text-[#8A7C6A]">
            Follow these step-by-step instructions to set up CraveIt on your
            local machine.
          </p>

          <div className="space-y-5">
            <InstallationStep
              number={1}
              title="Prerequisites"
              description="Ensure you have Node.js (v16+), npm, and MongoDB installed"
            />

            <InstallationStep
              number={2}
              title="Clone Repository"
              description="git clone https://github.com/yourusername/craveit.git && cd craveit"
            />

            <InstallationStep
              number={3}
              title="Backend Setup"
              description="cd server && npm install"
            />

            <InstallationStep
              number={4}
              title="Configure Backend"
              description="Create .env file with MongoDB URI, JWT SECRET, Cloudinary credentials, and email configuration"
            />

            <InstallationStep
              number={5}
              title="Frontend Setup"
              description="cd ../client && npm install"
            />

            <InstallationStep
              number={6}
              title="Run Backend"
              description="cd server && npm run dev (Terminal 1)"
            />

            <InstallationStep
              number={7}
              title="Run Frontend"
              description="cd client && npm run dev (Terminal 2)"
            />

            <InstallationStep
              number={8}
              title="Access Application"
              description="Frontend: http://localhost:5173 | Backend: http://localhost:5000"
            />
          </div>
        </>
      ),
    },
    {
      id: "api",
      icon: <FaCode />,
      title: "API Documentation Summary",
      content: (
        <>
          <p className="mb-5 text-sm leading-6 text-[#8A7C6A]">
            The platform provides a comprehensive RESTful API with endpoints for
            authentication, user management, orders, restaurant operations, and
            admin functions. All protected endpoints require JWT authentication.
          </p>

          <div className="space-y-4">
            <ApiSection
              title="Authentication Routes"
              endpoints={[
                { method: "POST", path: "/auth/register", auth: false },
                { method: "POST", path: "/auth/login", auth: false },
                { method: "GET", path: "/auth/logout", auth: true },
                { method: "POST", path: "/auth/genOtp", auth: false },
                { method: "POST", path: "/auth/verifyOtp", auth: false },
              ]}
            />

            <ApiSection
              title="Customer Routes"
              endpoints={[
                { method: "PATCH", path: "/user/update", auth: true },
                { method: "POST", path: "/user/placeorder", auth: true },
                { method: "GET", path: "/user/placedorders", auth: true },
                { method: "PATCH", path: "/user/resetPassword", auth: true },
              ]}
            />

            <ApiSection
              title="Restaurant Routes"
              endpoints={[
                {
                  method: "POST",
                  path: "/restaurant/addMenuItem",
                  auth: true,
                },
                {
                  method: "GET",
                  path: "/restaurant/menuItems",
                  auth: true,
                },
                {
                  method: "PATCH",
                  path: "/restaurant/order-status/:id",
                  auth: true,
                },
                { method: "GET", path: "/restaurant/earnings", auth: true },
              ]}
            />

            <ApiSection
              title="Rider Routes"
              endpoints={[
                { method: "GET", path: "/rider/available-orders", auth: true },
                { method: "GET", path: "/rider/ongoing-orders", auth: true },
                { method: "GET", path: "/rider/completed-orders", auth: true },
                { method: "PATCH", path: "/rider/order/:id", auth: true },
              ]}
            />

            <ApiSection
              title="Admin Routes"
              endpoints={[
                { method: "GET", path: "/admin/overview", auth: true },
                { method: "GET", path: "/admin/customers", auth: true },
                { method: "GET", path: "/admin/managers", auth: true },
                { method: "DELETE", path: "/admin/customer/:id", auth: true },
                { method: "GET", path: "/admin/orders", auth: true },
              ]}
            />
          </div>
        </>
      ),
    },
    {
      id: "educational",
      icon: <FaLightbulb />,
      title: "Educational Purpose & Learning",
      content: (
        <>
          <p className="mb-5 text-sm leading-6 text-[#8A7C6A]">
            CraveIt is designed as a comprehensive educational platform to
            demonstrate modern web development practices and MERN stack
            expertise.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <FeatureGroup
              title="Backend Concepts"
              items={[
                "RESTful API design and architecture",
                "Express.js middleware and routing",
                "JWT authentication implementation",
                "Password hashing with Bcrypt",
                "MongoDB schema design",
                "Mongoose ODM usage",
                "Error handling and validation",
                "Email service integration",
              ]}
            />

            <FeatureGroup
              title="Frontend Concepts"
              items={[
                "React functional components",
                "React Router navigation",
                "Context API for state management",
                "Axios HTTP requests",
                "Tailwind CSS styling",
                "Responsive design patterns",
                "Form handling and validation",
                "Toast notifications",
              ]}
            />

            <FeatureGroup
              title="Architecture Concepts"
              items={[
                "Role-based access control (RBAC)",
                "Multi-tenant system design",
                "MVC architecture pattern",
                "Scalable folder structure",
                "Separation of concerns",
                "Component reusability",
                "Database relationships",
                "API versioning",
              ]}
            />

            <FeatureGroup
              title="DevOps & Deployment"
              items={[
                "Environment variable management",
                "Cloudinary CDN integration",
                "Vercel deployment configuration",
                "MongoDB Atlas setup",
                "Development vs production builds",
                "Nodemon for development",
                "Build optimization with Vite",
                "CORS and security headers",
              ]}
            />
          </div>
        </>
      ),
    },
    {
      id: "future",
      icon: <FaRocket />,
      title: "Future Improvements",
      content: (
        <>
          <p className="mb-5 text-sm leading-6 text-[#8A7C6A]">
            The platform has a roadmap of exciting features and improvements
            planned for future versions to enhance functionality and user
            experience.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <FeatureGroup
              title="Payment Integration"
              items={[
                "Stripe and PayPal integration",
                "UPI payment support",
                "Digital wallet support",
                "Subscription plans",
                "Discount codes and offers",
              ]}
            />

            <FeatureGroup
              title="Advanced Features"
              items={[
                "Real-time notifications (WebSockets)",
                "Order rating and review system",
                "Push notifications",
                "In-app chat support",
                "Favorite restaurants & items",
              ]}
            />

            <FeatureGroup
              title="Performance & Scale"
              items={[
                "Redis caching",
                "Elasticsearch integration",
                "Database query optimization",
                "Image compression",
                "API rate limiting",
              ]}
            />

            <FeatureGroup
              title="Mobile & Expansion"
              items={[
                "Native mobile apps (React Native)",
                "Multi-language support (i18n)",
                "Multi-currency support",
                "Advanced analytics dashboard",
                "Loyalty program and rewards",
              ]}
            />
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-full bg-[#FBF3E7]">
      {/* Hero Section */}

      <section className="bg-[#1F1811] px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto max-w-5xl">
          <div className="flex size-14 items-center justify-center bg-[#E8491D] text-[#FBF3E7]">
            <FaBookOpen className="text-2xl" />
          </div>

          <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.25em] text-[#E8491D]">
            Complete Platform Documentation
          </p>

          <h1 className="mt-2 font-[Archivo_Black] text-3xl uppercase text-[#FBF3E7] sm:text-5xl">
            CraveIt Documentation
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#C9BEB0] sm:text-base">
            Comprehensive documentation covering the full CraveIt food delivery
            platform - from role-based architecture and ordering workflows to
            technology stack, security features, and future enhancements.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Badge icon={<FaUsers />} text="4 User Roles" />
            <Badge icon={<FaUtensils />} text="MERN Stack" />
            <Badge icon={<FaMoneyBillTrendUp />} text="Full Features" />
            <Badge icon={<FaLock />} text="Secure Auth" />
          </div>
        </div>
      </section>

      {/* Quick Stats */}

      <section className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <OverviewCard icon={<FaUsers />} number="4" label="User Roles" />

          <OverviewCard
            icon={<FaUtensils />}
            number="Responsive"
            label="UI Design"
          />

          <OverviewCard
            icon={<FaChartLine />}
            number="Real-time"
            label="Order Tracking"
          />

          <OverviewCard
            icon={<FaShieldHalved />}
            number="Secure"
            label="Authentication"
          />
        </div>
      </section>

      {/* Main Documentation Content */}

      <section className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="space-y-3">
          {features.map((section) => (
            <DocumentationSection
              key={section.id}
              section={section}
              isOpen={openSection === section.id}
              onToggle={() => toggleSection(section.id)}
            />
          ))}
        </div>
      </section>

      {/* Footer CTA */}

      <section className="mt-12">
        <div className="relative overflow-hidden bg-[#c73c12] px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1F1811]">
                  Open Source Project
                </p>
              </div>

              <h2 className="mt-4 font-[Archivo_Black] text-2xl uppercase leading-tight text-[#FBF3E7] sm:text-3xl">
                Explore The Project
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-[#FBF3E7]/85">
                Explore the source code, understand the project architecture,
                and learn how CraveIt brings customers, restaurants, riders, and
                administrators together in one platform.
              </p>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 flex-wrap gap-3">
              <a
                href="https://github.com/nitish1445/RICR-Web-Development/tree/main/CreaveIt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#1F1811] px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-[#FBF3E7] transition hover:bg-[#2F2620]"
              >
                <FaGithub />
                Source Code
              </a>

              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 border border-[#1F1811]/30 px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-[#1F1811] transition hover:bg-[#1F1811]/10"
              >
                Back to Home
                <FaArrowRight className="text-[10px]" />
              </a>
            </div>
          </div>

          {/* Bottom Project Info */}
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#1F1811]/20 pt-5">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider text-[#1F1811]/60">
                Architecture
              </p>
              <p className="mt-1 text-xs font-bold text-[#FBF3E7]">
                MERN Stack
              </p>
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider text-[#1F1811]/60">
                User Roles
              </p>
              <p className="mt-1 text-xs font-bold text-[#FBF3E7]">
                Customer · Restaurant · Rider · Admin
              </p>
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider text-[#1F1811]/60">
                Payments
              </p>
              <p className="mt-1 text-xs font-bold text-[#FBF3E7]">
                Cash on Delivery
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Component: Documentation Section
const DocumentationSection = ({ section, isOpen, onToggle }) => {
  return (
    <div className="rounded bg-white">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between bg-white p-5 transition hover:bg-[#FBF3E7]"
      >
        <div className="flex items-center gap-4">
          <div className="flex size-10 items-center justify-center rounded bg-[#FBF3E7] text-lg text-[#E8491D]">
            {section.icon}
          </div>

          <h3 className="text-left font-bold text-[#1F1811]">
            {section.title}
          </h3>
        </div>

        <FaChevronDown
          className={`transition ${isOpen ? "rotate-180" : ""} text-[#8A7C6A]`}
        />
      </button>

      {isOpen && (
        <div className="border-t border-[#E8E1D3] px-5 py-5">
          {section.content}
        </div>
      )}
    </div>
  );
};

// Component: Role Card
const RoleCard = ({ icon, title, description }) => {
  return (
    <div className="rounded bg-white p-4">
      <div className="flex size-10 items-center justify-center rounded bg-[#FBF3E7] text-lg text-[#E8491D]">
        {icon}
      </div>

      <h4 className="mt-3 font-bold text-[#1F1811]">{title}</h4>

      <p className="mt-2 text-sm text-[#8A7C6A]">{description}</p>
    </div>
  );
};

// Component: Feature Group
const FeatureGroup = ({ title, items }) => {
  return (
    <div className="rounded bg-white p-4">
      <h4 className="font-bold text-[#1F1811]">{title}</h4>

      <ul className="mt-3 space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-2 text-sm text-[#8A7C6A]"
          >
            <FaCircleCheck className="mt-0.5 shrink-0 text-[#E8491D]" />

            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Component: Tech Card
const TechCard = ({ icon, title, items }) => {
  return (
    <div className="rounded bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="flex size-8 items-center justify-center rounded bg-[#FBF3E7] text-[#E8491D]">
          {icon}
        </div>

        <h4 className="font-bold text-[#1F1811]">{title}</h4>
      </div>

      <ul className="mt-3 space-y-1">
        {items.map((item, index) => (
          <li key={index} className="text-sm text-[#8A7C6A]">
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Component: Model Card
const ModelCard = ({ name, fields }) => {
  return (
    <div className="rounded border border-[#E8E1D3] bg-white p-4">
      <h4 className="font-bold text-[#1F1811]">{name}</h4>

      <ul className="mt-3 space-y-1">
        {fields.map((field, index) => (
          <li key={index} className="text-sm text-[#8A7C6A]">
            • {field}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Component: Installation Step
const InstallationStep = ({ number, title, description }) => {
  return (
    <div className="flex gap-4 rounded bg-white p-4">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#E8491D] text-xs font-bold text-white">
        {number}
      </div>

      <div>
        <h4 className="font-bold text-[#1F1811]">{title}</h4>

        <p className="mt-1 text-sm text-[#8A7C6A]">{description}</p>
      </div>
    </div>
  );
};

// Component: API Section
const ApiSection = ({ title, endpoints }) => {
  return (
    <div className="rounded bg-white p-4">
      <h4 className="mb-3 font-bold text-[#1F1811]">{title}</h4>

      <div className="space-y-2">
        {endpoints.map((endpoint, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded bg-[#FBF3E7] p-3 text-sm"
          >
            <div className="flex items-center gap-3">
              <span className="rounded bg-[#E8491D] px-2 py-1 text-xs font-bold text-white">
                {endpoint.method}
              </span>

              <code className="text-[#1F1811]">{endpoint.path}</code>
            </div>

            <span className="text-xs text-[#8A7C6A]">
              {endpoint.auth === true
                ? "Auth Required"
                : endpoint.auth === false
                  ? "Public"
                  : endpoint.auth}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Component: Overview Card
const OverviewCard = ({ icon, number, label }) => {
  return (
    <div className="rounded bg-white p-4 text-center">
      <div className="flex size-10 items-center justify-center rounded bg-[#FBF3E7] text-xl text-[#E8491D] mx-auto">
        {icon}
      </div>

      <p className="mt-3 text-2xl font-bold text-[#1F1811]">{number}</p>

      <p className="mt-1 text-xs text-[#8A7C6A]">{label}</p>
    </div>
  );
};

// Component: Badge
const Badge = ({ icon, text }) => {
  return (
    <div className="inline-flex items-center gap-2 rounded bg-white/10 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#FBF3E7]">
      {icon} {text}
    </div>
  );
};

export default Documentation;
