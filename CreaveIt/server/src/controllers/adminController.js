import Contact from "../models/contactModel.js";
import { User } from "../models/userModel.js";
import MenuItem from "../models/menuSchema.js";
import Order from "../models/orderModal.js";
import bcrypt from "bcrypt";

export const getAdminOverview = async (req, res) => {
  try {
    const [
      customers,
      managers,
      riders,
      menuItems,
      messages,
      activeOrders,
      totalOrders,
    ] = await Promise.all([
      User.countDocuments({ role: "customer" }),
      User.countDocuments({
        role: "manager",
      }),
      User.countDocuments({
        role: "partner",
      }),
      MenuItem.countDocuments(),
      Contact.countDocuments(),
      Order.countDocuments({
        status: {
          $in: [
            "pending",
            "accepted",
            "preparing",
            "ready",
            "pickedUp",
            "onTheWay",
            "delivered",
            "rejected",
            "damaged",
            "cancelled",
          ],
        },
      }),

      Order.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      message: "Admin overview fetched successfully",
      data: {
        customers,
        managers,
        riders,
        menuItems,
        messages,
        activeOrders,
        totalOrders,
      },
    });
  } catch (error) {
    console.error("Admin overview error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch admin overview",
    });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const customers = await User.find({
      role: "customer",
    }).select("-password");

    return res.status(200).json({
      success: true,
      message: "Customers fetched successfully",
      data: customers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch customers",
    });
  }
};

export const getAllMangers = async (req, res) => {
  try {
    const managers = await User.find({
      role: "manager",
    }).select("-password");

    return res.status(200).json({
      success: true,
      message: "Managers fetched successfully",
      data: managers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch managers",
    });
  }
};

export const getAllPartners = async (req, res) => {
  try {
    const partners = await User.find({
      role: "partner",
    }).select("-password");

    return res.status(200).json({
      success: true,
      message: "Partners fetched successfully",
      data: partners,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch partners",
    });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await User.findOne({
      _id: id,
      role: "customer",
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    console.error("Delete customer error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete customer",
    });
  }
};

export const deleteManager = async (req, res) => {
  try {
    const { id } = req.params;

    const manager = await User.findOne({
      _id: id,
      role: "manager",
    });

    if (!manager) {
      return res.status(404).json({
        success: false,
        message: "Restaurant Manager not found",
      });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Restaurant Manager deleted successfully",
    });
  } catch (error) {
    console.error("Restaurant Manager customer error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete Restaurant Manager",
    });
  }
};

export const deletePartner = async (req, res) => {
  try {
    const { id } = req.params;

    const rider = await User.findOne({
      _id: id,
      role: "partner",
    });

    if (!rider) {
      return res.status(404).json({
        success: false,
        message: "Delivery Partner not found",
      });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Delivery Partner deleted successfully",
    });
  } catch (error) {
    console.error("Delete Delivery Partner error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete Delivery Partner",
    });
  }
};

export const getAllContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Contact messages fetched successfully",
      data: messages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch contact messages",
    });
  }
};

export const deleteContactMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Contact.findByIdAndDelete(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact message deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete contact message",
    });
  }
};

export const getAllOrdersByAdmin = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("userId", "fullName email phone address city pin photo")
      .populate(
        "restaurantId",
        "fullName restaurantName email phone address city photo",
      )
      .populate("riderId", "fullName email phone photo")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error("Get all orders by admin error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

export const getSingleOrderByAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate(
        "userId",
        "fullName email phone address city pin geolocation photo",
      )
      .populate(
        "restaurantId",
        "fullName restaurantName cuisine email phone address city geolocation photo",
      )
      .populate(
        "riderId",
        "fullName email phone address city geolocation photo",
      );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order,
    });
  } catch (error) {
    console.error("Get single order by admin error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch order details",
      error: error.message,
    });
  }
};

export const addUserByAdmin = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const {
      fullName,
      email,
      phone,
      password,
      role,
      dob,
      gender,
      address,
      city,
      pin,
      restaurantName,
      cuisine,
      lat,
      lon,
      upi,
      account_number,
      IFSC,
      gst,
      fssai,
      rc,
      dl,
      uidai,
      pan,
      isActive,
    } = req.body;

    // Required fields
    if (!fullName || !email || !phone || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Full name, email, phone, password and role are required",
      });
    }

    // Valid roles
    const validRoles = ["customer", "manager", "partner"];

    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    // Manager validation
    if (role === "manager" && !restaurantName) {
      return res.status(400).json({
        success: false,
        message: "Restaurant name is required for manager",
      });
    }

    // Check existing email
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email or phone number",
      });
    }

    // Default photo
    const photoURL = `https://placehold.co/600x400?text=${fullName.charAt(0).toUpperCase()}`;
    const photo = {
      url: photoURL,
    };

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      fullName,
      email,
      phone,
      password: hashPassword,
      role,
      dob: dob || null,
      gender: gender || "",
      address: address || "",
      city: city || "",
      pin: pin || "",
      photo,
      restaurantName: role === "manager" ? restaurantName || "" : null,
      cuisine: role === "manager" ? cuisine || "" : null,
      geolocation: {
        lat,
        lon,
      },
      paymentDetail: {
        upi: upi || "N/A",
        account_number: account_number || "N/A",
        IFSC: IFSC || "N/A",
      },
      document: {
        gst: role === "manager" ? gst || "N/A" : "N/A",
        fssai: role === "manager" ? fssai || "N/A" : "N/A",
        rc: role === "partner" ? rc || "N/A" : "N/A",
        dl: role === "partner" ? dl || "N/A" : "N/A",
        uidai: role === "partner" ? uidai || "N/A" : "N/A",
        pan: role === "partner" ? pan || "N/A" : "N/A",
      },
      isActive: isActive || "active",
    });

    return res.status(201).json({
      success: true,
      message: `${
        role === "manager"
          ? "Restaurant manager"
          : role === "partner"
            ? "Delivery partner"
            : "Customer"
      } added successfully`,
      data: user,
    });
  } catch (error) {
    console.error("Add user by admin error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to add user",
    });
  }
};

export const MarkOrderPaymentPaid = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Already paid check
    if (order.paymentStatus === "paid") {
      return res.status(400).json({
        success: false,
        message: "Payment is already marked as paid",
      });
    }

    // Mark payment as paid
    order.paymentStatus = "paid";

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Payment marked as paid successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};
