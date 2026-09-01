import Order from "../models/orderModal.js";
import bcrypt from "bcrypt";
import cloudinary from "../config/cloudinary.js";

export const RiderGetAvailableOrder = async (req, res, next) => {
  try {
    const orders = await Order.find({
      status: "ready",
      riderId: null,
    })
      .populate("restaurantId")
      .populate("userId");

    return res.status(200).json({
      success: true,
      message: "Available orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

export const RiderGetOngoingOrder = async (req, res, next) => {
  try {
    const riderId = req.user._id;
    const ongoingStatuses = ["partnerAssigned", "pickedUp", "onTheWay"];

    const orders = await Order.find({
      riderId: riderId,
      status: { $in: ongoingStatuses },
    })
      .populate("restaurantId")
      .populate("userId")
      .populate("riderId");

    return res.status(200).json({
      success: true,
      message: "Ongoing orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

export const RiderGetCompletedOrder = async (req, res, next) => {
  try {
    const currentUser = req.user;

    if (!currentUser?._id) {
      return res.status(401).json({
        success: false,
        message: "Rider authentication failed",
      });
    }

    const completedOrders = await Order.find({
      riderId: currentUser._id,
      status: {
        $in: ["delivered", "refused", "damaged", "cancelled", "rejected"],
      },
    })
      .populate("userId", "fullName phone address city pin geolocation")
      .populate(
        "restaurantId",
        "restaurantName fullName address city geolocation",
      )
      .sort({ updatedAt: -1 });

    // Only delivered orders generate earnings
    const deliveredOrders = completedOrders.filter(
      (order) => order.status === "delivered",
    );

    // Add earning to every order
    const ordersWithEarnings = completedOrders.map((order) => {
      const orderObject = order.toObject();

      const orderAmount = Number(order?.orderValue?.total || 0);

      const deliveryEarning =
        order.status === "delivered" ? Math.round(orderAmount * 0.15) : 0;

      return {
        ...orderObject,
        deliveryEarning,
      };
    });

    // Total Earnings
    const totalEarnings = deliveredOrders.reduce((total, order) => {
      const amount = Number(order?.orderValue?.total || 0);

      return total + amount * 0.15;
    }, 0);

    const stats = {
      totalOrders: completedOrders.length,

      delivered: completedOrders.filter((order) => order.status === "delivered")
        .length,

      cancelled: completedOrders.filter(
        (order) =>
          order.status === "cancelled" ||
          order.status === "rejected" ||
          order.status === "refused",
      ).length,

      damaged: completedOrders.filter((order) => order.status === "damaged")
        .length,

      totalEarnings: Math.round(totalEarnings),
    };

    return res.status(200).json({
      success: true,
      message: "Completed orders fetched successfully",

      data: {
        orders: ordersWithEarnings,
        stats,
      },
    });
  } catch (error) {
    console.error("Completed orders error:", error);
    next(error);
  }
};

export const RiderOverviewData = async (req, res, next) => {
  try {
    const currentRider = req.user;

    if (!currentRider?._id) {
      return res.status(401).json({
        success: false,
        message: "Rider authentication failed",
      });
    }

    const riderId = currentRider._id;

    // All orders assigned to this rider
    const orders = await Order.find({
      riderId,
    })
      .populate(
        "restaurantId",
        "restaurantName fullName city address geolocation photo images",
      )
      .populate("userId", "fullName email phone address city pin geolocation")
      .sort({ updatedAt: -1 });

    // Orders which are still active
    const activeStatuses = ["partnerAssigned", "pickedUp", "onTheWay"];

    const activeOrders = orders.filter((order) =>
      activeStatuses.includes(order.status),
    );

    // Current delivery
    const currentOrder = activeOrders.length > 0 ? activeOrders[0] : null;

    // Delivered orders
    const deliveredOrders = orders.filter(
      (order) => order.status === "delivered",
    );

    // Today's date range
    const now = new Date();

    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0,
    );

    const endOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999,
    );

    // Delivered today
    const completedTodayOrders = deliveredOrders.filter((order) => {
      const completedDate = new Date(order.deliveredAt || order.updatedAt);

      return completedDate >= startOfToday && completedDate <= endOfToday;
    });

    // Today's earnings (15%)
    const todayEarnings = completedTodayOrders.reduce((total, order) => {
      return total + Number(order?.orderValue?.total || 0) * 0.15;
    }, 0);

    // Total earnings
    const totalEarnings = deliveredOrders.reduce((total, order) => {
      return total + Number(order?.orderValue?.total || 0) * 0.15;
    }, 0);

    // Recent activity
    const recentOrders = orders.slice(0, 5);

    return res.status(200).json({
      success: true,
      message: "Rider overview fetched successfully",

      data: {
        // Stats directly accessible
        pendingOrders: activeOrders.length,

        completedToday: completedTodayOrders.length,

        todayEarnings: Math.round(todayEarnings),

        totalEarnings: Math.round(totalEarnings),

        totalDelivered: deliveredOrders.length,

        // Current active order
        currentOrder,

        // Recent activity
        recentOrders,
      },
    });
  } catch (error) {
    console.error("Rider overview error:", error);
    next(error);
  }
};

export const updateRiderOrderStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const riderId = req.user._id;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Rider accepts available order
    if (status === "partnerAssigned") {
      // Prevent another rider from taking it
      if (order.riderId && order.riderId.toString() !== riderId.toString()) {
        return res.status(403).json({
          success: false,
          message: "This order is already assigned to another rider",
        });
      }

      order.riderId = riderId;
      order.status = "partnerAssigned";
    }

    // Other delivery statuses
    else {
      // Ensure this rider owns the order
      if (!order.riderId || order.riderId.toString() !== riderId.toString()) {
        return res.status(403).json({
          success: false,
          message: "You are not assigned to this order",
        });
      }

      order.status = status;
    }

    await order.save();

    const updatedOrder = await Order.findById(orderId)
      .populate("restaurantId")
      .populate("userId")
      .populate({
        path: "riderId",
        select: "fullName email phone profileImage",
      });

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};

export const GetRiderPaymentStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const riderId = req.user._id;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check rider assigned
    if (!order.riderId) {
      return res.status(403).json({
        success: false,
        message: "No rider assigned to this order",
      });
    }

    // Check current rider owns this order
    if (order.riderId.toString() !== riderId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this payment",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment status fetched successfully",

      data: {
        orderId: order._id,
        orderNumber: order.orderNumber,
        paymentStatus: order.paymentStatus || "pending",
        amount: Number(order.deliveryEarning || 0),
        orderStatus: order.status,
        paidAt: order.paymentStatus === "paid" ? order.updatedAt : null,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const ResetRiderPassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const currentUser = req.user;

    if (!currentPassword || !newPassword) {
      const error = new Error("All feilds required");
      error.statusCode = 400;
      return next(error);
    }

    const isVerified = await bcrypt.compare(
      currentPassword,
      currentUser.password,
    );

    if (!isVerified) {
      const error = new Error("Old Password didn't match");
      error.statusCode = 401;
      return next(error);
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    currentUser.password = hashPassword;

    await currentUser.save();

    res.status(200).json({ message: "Password Reset Successful" });
  } catch (error) {
    next(error);
  }
};

export const RiderChangePhoto = async (req, res, next) => {
  try {
    console.log("body: ", req.body);
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
      folder: "CraveIt/Rider",
      width: 500,
      height: 500,
      crop: "fill",
    });

    console.log("Image Upload Done ", result);
    currentUser.photo.url = result.secure_url;
    currentUser.photo.publicID = result.public_id;

    await currentUser.save();

    res.status(200).json({
      success: true,
      message: "Photo Updated Successfully",
      data: currentUser,
    });
  } catch (error) {
    next(error);
  }
};

// Update Rider Profile
export const RiderUpdateProfile = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      phone,
      gender,
      dob,
      address,
      city,
      pin,
      document,
      paymentDetail,
      geoLocation,
    } = req.body;

    const CurrentUser = req.user;

    if (!fullName || !email || !phone) {
      const error = new Error("Basic details are required");
      error.statusCode = 400;
      return next(error);
    }

    if (!address || !city || !pin) {
      const error = new Error("Address details are required");
      error.statusCode = 400;
      return next(error);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      const error = new Error("Invalid email format");
      error.statusCode = 400;
      return next(error);
    }

    const cleanPhone = phone.replace(/\D/g, "");

    if (!/^\d{10}$/.test(cleanPhone)) {
      const error = new Error("Mobile number must be 10 digits");
      error.statusCode = 400;
      return next(error);
    }

    if (!/^\d{6}$/.test(String(pin))) {
      const error = new Error("PIN code must be 6 digits");
      error.statusCode = 400;
      return next(error);
    }

    if (dob) {
      const dobDate = new Date(dob);

      if (Number.isNaN(dobDate.getTime())) {
        const error = new Error("Invalid date of birth");
        error.statusCode = 400;
        return next(error);
      }

      if (dobDate > new Date()) {
        const error = new Error("Date of birth cannot be in the future");
        error.statusCode = 400;
        return next(error);
      }
    }

    if (
      document?.pan &&
      document.pan !== "N/A" &&
      !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(document.pan)
    ) {
      const error = new Error("Invalid PAN format");
      error.statusCode = 400;
      return next(error);
    }

    if (
      document?.uidai &&
      document.uidai !== "N/A" &&
      !/^\d{12}$/.test(String(document.uidai).replace(/\s/g, ""))
    ) {
      const error = new Error("Aadhaar number must be 12 digits");
      error.statusCode = 400;
      return next(error);
    }

    if (
      paymentDetail?.upi &&
      paymentDetail.upi !== "N/A" &&
      !/^[a-zA-Z0-9._-]+@[a-zA-Z]{2,}$/.test(paymentDetail.upi)
    ) {
      const error = new Error("Invalid UPI ID");
      error.statusCode = 400;
      return next(error);
    }

    if (
      paymentDetail?.IFSC &&
      paymentDetail.IFSC !== "N/A" &&
      !/^[A-Z]{4}0[A-Z0-9]{6}$/i.test(paymentDetail.IFSC)
    ) {
      const error = new Error("Invalid IFSC code");
      error.statusCode = 400;
      return next(error);
    }

    // Update fields

    CurrentUser.fullName = fullName;
    CurrentUser.phone = cleanPhone;
    CurrentUser.gender = gender || CurrentUser.gender;

    if (dob) {
      CurrentUser.dob = new Date(dob);
    }

    CurrentUser.address = address;
    CurrentUser.city = city;
    CurrentUser.pin = pin;

    if (document) {
      CurrentUser.document = {
        dl: document.dl || CurrentUser.document?.dl || "N/A",
        rc: document.rc || CurrentUser.document?.rc || "N/A",
        uidai: document.uidai || CurrentUser.document?.uidai || "N/A",
        pan: document.pan?.toUpperCase() || CurrentUser.document?.pan || "N/A",
        gst: document.gst || CurrentUser.document?.gst || "N/A",
      };
    }

    if (paymentDetail) {
      CurrentUser.paymentDetail = {
        upi: paymentDetail.upi || CurrentUser.paymentDetail?.upi || "N/A",
        account_number:
          paymentDetail.account_number ||
          CurrentUser.paymentDetail?.account_number ||
          "N/A",
        IFSC:
          paymentDetail.IFSC?.toUpperCase() ||
          CurrentUser.paymentDetail?.IFSC ||
          "N/A",
      };
    }

    if (geoLocation) {
      CurrentUser.geoLocation = {
        lat: geoLocation.lat ?? CurrentUser.geoLocation?.lat ?? null,
        lon: geoLocation.lon ?? CurrentUser.geoLocation?.lon ?? null,
      };
    }

    await CurrentUser.save();

    return res.status(200).json({
      success: true,
      message: "Rider profile updated successfully",
      data: CurrentUser,
    });
  } catch (error) {
    next(error);
  }
};
