import { User } from "../models/userModel.js";
import cloudinary from "../config/cloudinary.js";
import bcrypt from "bcrypt";
import Order from "../models/orderModal.js";
import Menu from "../models/menuSchema.js";

export const UserUpdate = async (req, res, next) => {
  try {
    const { fullName, phone, dob, gender, paymentDetail } = req.body;
    const currentUser = req.user;

    // Update basic profile details
    if (fullName !== undefined) {
      currentUser.fullName = fullName;
    }

    if (phone !== undefined) {
      currentUser.phone = phone;
    }

    if (dob !== undefined) {
      currentUser.dob = dob;
    }

    if (gender !== undefined) {
      currentUser.gender = gender;
    }

    // Update payment details
    if (paymentDetail) {
      currentUser.paymentDetail = {
        ...currentUser.paymentDetail.toObject(),

        ...(paymentDetail.upi !== undefined && {
          upi: paymentDetail.upi,
        }),

        ...(paymentDetail.account_number !== undefined && {
          account_number: paymentDetail.account_number,
        }),

        ...(paymentDetail.IFSC !== undefined && {
          IFSC: paymentDetail.IFSC,
        }),
      };
    }

    await currentUser.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: currentUser,
    });
  } catch (error) {
    next(error);
  }
};

export const UserUpdateAddress = async (req, res, next) => {
  try {
    const { address, city, pin, geolocation } = req.body;

    const currentUser = req.user;

    // Validation
    if (!address || !city || !pin) {
      const error = new Error("Address, city and PIN code are required.");
      error.statusCode = 400;
      return next(error);
    }

    // PIN validation
    if (!/^\d{6}$/.test(pin)) {
      const error = new Error("PIN code must be exactly 6 digits.");
      error.statusCode = 400;
      return next(error);
    }

    // Update address details
    currentUser.address = address;
    currentUser.city = city;
    currentUser.pin = pin;

    // Update geolocation
    if (geolocation) {
      currentUser.geolocation = {
        lat: geolocation.lat || "N/A",
        lon: geolocation.lon || "N/A",
      };
    }

    await currentUser.save();

    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: currentUser,
    });
  } catch (error) {
    next(error);
  }
};

export const UserChangePhoto = async (req, res, next) => {
  try {
    // console.log("body: ", req.body);
    const currentUser = req.user;
    const dp = req.file;

    if (!dp) {
      const error = new Error("Profile picture required");
      error.statusCode = 400;
      return next(error);
    }

    if (currentUser.photo.publicID) {
      await cloudinary.uploader.destroy(currentUser.photo.publicID);
    }

    const b64 = Buffer.from(dp.buffer).toString("base64");
    const dataURI = `data:${dp.mimetype};base64,${b64}`;
    console.log("Data URI : ", dataURI.slice(0, 100));

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "CraveIt/Customer",
      width: 500,
      height: 500,
      crop: "fill",
    });

    console.log("Image Upload Done ", result);
    currentUser.photo.url = result.secure_url;
    currentUser.photo.publicID = result.publicID;

    await currentUser.save();

    res.status(200).json({ message: "Photo Updated", data: currentUser });
  } catch (error) {
    next(error);
  }
};

export const UserResetPassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const currentUser = req.user;

    if (!oldPassword || !newPassword) {
      const error = new Error("All fields required.");
      error.statusCode = 400;
      return next(error);
    }
    const isVerified = await bcrypt.compare(oldPassword, currentUser.password);
    if (!isVerified) {
      const error = new Error("Old Password didn't matched");
      error.statusCode = 401;
      return next(error);
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    currentUser.password = hashPassword;

    await currentUser.save();

    res.status(200).json({ message: "Password reset succeful." });
  } catch (error) {
    next(error);
  }
};

export const UserPlaceOrder = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const {
      restaurantID,
      orderItems,
      paymentMethod,
      subtotal,
      deliveryFee,
      totalAmount,
    } = req.body;

    if (!currentUser) {
      const error = new Error("User not authenticated");
      error.statusCode = 401;
      return next(error);
    }

    if (
      !restaurantID ||
      !orderItems?.length ||
      !paymentMethod ||
      subtotal === undefined ||
      totalAmount === undefined
    ) {
      const error = new Error("Required fields are missing");
      error.statusCode = 400;
      return next(error);
    }

    // Fetch menu items
    const menuItemIds = orderItems.map((item) => item.menuItemID);

    const menuItems = await Menu.find({
      _id: { $in: menuItemIds },
    });

    console.log(
      "Database IDs:",
      menuItems.map((item) => String(item._id)),
    );

    // Validate all menu items exist
    if (menuItems.length !== orderItems.length) {
      const error = new Error("One or more menu items were not found");
      error.statusCode = 404;
      return next(error);
    }

    // Create order items
    const items = orderItems.map((orderItem) => {
      const menuItem = menuItems.find(
        (item) => String(item._id) === String(orderItem.menuItemID),
      );

      if (!menuItem) {
        throw new Error(`Menu item not found: ${orderItem.menuItemID}`);
      }

      return {
        menuItemID: menuItem._id,
        name: menuItem.itemName,
        price: Number(menuItem.price),
        quantity: Number(orderItem.quantity || 1),
        image: menuItem.images?.[0]?.url || "",
      };
    });

    const newOrder = await Order.create({
      orderNumber: `ORD-${Date.now()}`,
      restaurantId: restaurantID,
      userId: currentUser._id,
      items,

      orderValue: {
        subtotal: Number(subtotal),
        tax: 0,
        deliveryFee: Number(deliveryFee || 0),
        discountType: "none",
        discountPercentage: 0,
        total: Number(totalAmount),
        paymentMethod,
      },

      status: "pending",
      paymentStatus: paymentMethod === "COD" ? "pending" : "pending",
    });

    console.log("Order Created:", newOrder);
    return res.status(201).json({
      message: "Order Placed Successfully",
      data: newOrder,
    });
  } catch (error) {
    console.log("ORDER ERROR:", error);
    next(error);
  }
};

export const UserAllOrders = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const orders = await Order.find({ userId: currentUser._id })
      .populate("restaurantId")
      .populate("riderId")
      .sort({ createdAt: -1 });
    res
      .status(200)
      .json({ message: "All Orders Fetched Successfully", data: orders });
  } catch (error) {
    next(error);
  }
};

export const UserCancelOrder = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const { orderId } = req.params;

    if (!orderId) {
      const error = new Error("Order ID is required.");
      error.statusCode = 400;
      return next(error);
    }

    const order = await Order.findOne({
      _id: orderId,
      userId: currentUser._id,
    });

    if (!order) {
      const error = new Error("Order not found.");
      error.statusCode = 404;
      return next(error);
    }

    const nonCancellableStatuses = [
      "ready",
      "pickedUp",
      "onTheWay",
      "delivered",
      "rejected",
      "damaged",
      "cancelled",
    ];

    if (nonCancellableStatuses.includes(order.status)) {
      const error = new Error(
        `Order cannot be cancelled at ${order.status} stage.`,
      );
      error.statusCode = 400;
      return next(error);
    }

    order.status = "cancelled";
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully.",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};
