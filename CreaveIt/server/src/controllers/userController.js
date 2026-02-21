import { User } from "../models/userModel.js";
import cloudinary from "../config/cloudinary.js";
import bcrypt from "bcrypt";

export const UserUpdate = async (req, res, next) => {
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

    const currentUser = req.user;

    //valdiation for user basic details...

    if (!fullName || !email || !phone || !city || !pin) {
      const error = new Error("All field Required.");
      error.statusCode = 400;
      return next(error);
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const error = new Error("Invalid email format");
      error.statusCode = 400;
      return next(error);
    }

    // Validate mobile number (10 digits)
    if (!/^\d{10}$/.test(phone.replace(/\D/g, ""))) {
      const error = new Error("Mobile number must be 10 digits");
      error.statusCode = 400;
      return next(error);
    }

    // Validate PIN code (6 digits)
    if (!/^\d{6}$/.test(pin)) {
      const error = new Error("PIN code must be 6 digits");
      error.statusCode = 400;
      return next(error);
    }

    // Validate PAN format if provided
    if (
      document?.pan &&
      document.pan !== "N/A" &&
      !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(document.pan)
    ) {
      const error = new Error("Invalid PAN format");
      error.statusCode = 400;
      return next(error);
    }

    // Validate UPI format if provided
    if (
      paymentDetail?.upi &&
      paymentDetail.upi !== "N/A" &&
      !/^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/.test(paymentDetail.upi)
    ) {
      const error = new Error("Invalid UPI format");
      error.statusCode = 400;
      return next(error);
    }

    // old & simple way declare
    //user personal information

    currentUser.fullName = fullName;
    currentUser.email = email.toLowerCase();
    currentUser.phone = phone;
    currentUser.gender = gender || currentUser.gender;
    currentUser.dob = dob || currentUser.dob;
    currentUser.address = address || currentUser.address;
    currentUser.city = city;
    currentUser.pin = pin;

    // Update nested documents
    if (document) {
      currentUser.document = {
        gst: document.gst || currentUser.document?.gst || "N/A",
        fssai: document.fssai || currentUser.document?.fssai || "N/A",
        rc: document.rc || currentUser.document?.rc || "N/A",
        dl: document.dl || currentUser.document?.dl || "N/A",
        uidai: document.uidai || currentUser.document?.uidai || "N/A",
        pan: document.pan || currentUser.document?.pan || "N/A",
      };
    }

    // Update payment details
    if (paymentDetail) {
      currentUser.paymentDetail = {
        upi: paymentDetail.upi || currentUser.paymentDetail?.upi || "N/A",
        account_number:
          paymentDetail.account_number ||
          currentUser.paymentDetail?.account_number ||
          "N/A",
        ifs_Code:
          paymentDetail.ifs_Code ||
          currentUser.paymentDetail?.ifs_Code ||
          "N/A",
      };
    }

    // Update geo location
    if (geoLocation) {
      currentUser.geoLocation = {
        lat: geoLocation.lat || currentUser.geoLocation?.lat || "N/A",
        lon: geoLocation.lon || currentUser.geoLocation?.lon || "N/A",
      };
    }

    //Second Way

    // const updatedUser = await User.findByIdAndUpdate(
    //   { _id: currentUser._id },
    //   {
    //     fullName,
    //     email,
    //     phone,
    //   },
    //   { new: true },
    // );

    console.log("OldData: ", req.user);
    await currentUser.save();
    console.log("NewData:", currentUser);

    res
      .status(200)
      .json({ message: "User Updated Successfully", data: currentUser });
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

    const { restaurantId, items, orderValue, status, review } = req.body;

    console.log({ restaurantId, items, orderValue, status, review });

    if (!restaurantId || !items || !orderValue || !status) {
      const error = new Error("All feilds required");
      error.statusCode = 400;
      return next(error);
    }

    const newOrder = await Order.create({
      orderNumber: `ORD-${Date.now()}`,
      restaurantId,
      userId: currentUser._id,
      items,
      orderValue,
      status,
      review: review || "N/A",
    });
    res
      .status(201)
      .json({ message: "Order Placed Successfully", data: newOrder });
  } catch (error) {
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
