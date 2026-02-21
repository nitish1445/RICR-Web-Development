import Menu from "../models/menuSchema.js";
import { UploadMultipleToCloudinary } from "../utils/imageUploader.js";
import cloudinary from "../config/cloudinary.js";

export const RestaurantAddMenuItem = async (req, res, next) => {
  try {
    const {
      itemName,
      description,
      price,
      cuisine,
      type,
      preparationTime,
      servingSize,
      availability,
    } = req.body;

    const CurrentUser = req.user;

    if (
      !itemName ||
      !description ||
      !price ||
      !cuisine ||
      !type ||
      !preparationTime ||
      !servingSize ||
      !availability
    ) {
      const error = new Error("All field Required.");
      error.statusCode = 400;
      return next(error);
    }

    const images = await UploadMultipleToCloudinary(req.files);
    console.log(images);

    const newMenuItem = await Menu.create({
      itemName,
      description,
      price,
      type,
      preparationTime,
      availability,
      servingSize,
      cuisine,
      images,
      restaurantID: CurrentUser._id,
    });

    res.status(201).json({
      message: "Menu Item Added Successfully",
      data: newMenuItem,
    });
  } catch (error) {
    next(error);
  }
};

export const GetRestaurantMenuItem = async (req, res, next) => {
  try {
    const CurrentUser = req.user;
    const restaurantID = CurrentUser._id;
    const menuItems = await Menu.find({ restaurantID });

    res.status(200).json({
      message: "Menu Items Fetched Successfully",
      data: menuItems,
    });
  } catch (error) {
    next(error);
  }
};

export const RestaurantEditMenuItem = async (req, res, next) => {
  try {
    const {
      itemName,
      description,
      price,
      cuisine,
      type,
      preparationTime,
      servingSize,
      availability,
    } = req.body;

    const { id } = req.params;
    const CurrentUser = req.user;

    if (
      !itemName ||
      !description ||
      !price ||
      !cuisine ||
      !type ||
      !preparationTime ||
      !servingSize ||
      !availability
    ) {
      const error = [new Error("All field Required.")];
      error.statusCode = 400;
      return next(error);
    }

    const images = [];
    if (req.files) {
      images = await UploadMultipleToCloudinary(req.files);
      console.log(images);
    }

    const existingMenuItem = await Menu.findById(id);

    existingMenuItem.itemName = itemName || existingMenuItem.itemName;
    existingMenuItem.description = description || existingMenuItem.description;
    existingMenuItem.price = price || existingMenuItem.price;
    existingMenuItem.cuisine = cuisine || existingMenuItem.cuisine;
    existingMenuItem.type = type || existingMenuItem.type;
    existingMenuItem.preparationTime =
      preparationTime || existingMenuItem.preparationTime;
    existingMenuItem.servingSize = servingSize || existingMenuItem.servingSize;
    existingMenuItem.availability =
      availability || existingMenuItem.availability;
    existingMenuItem.images =
      images.length > 0 ? images : existingMenuItem.images;

    await existingMenuItem.save();

    res.status(201).json({
      message: "Menu Item Added Successfully",
      data: newMenuItem,
    });
  } catch (error) {
    next(error);
  }
};

export const RestaurantUpdateProfile = async (req, res, next) => {
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
      restaurantName,
      cuisine,
      document,
      paymentDetail,
      geoLocation,
    } = req.body;

    const CurrentUser = req.user;

    // Validation for required fields
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

    // Update restaurant profile
    CurrentUser.fullName = fullName || CurrentUser.fullName;
    CurrentUser.email = email.toLowerCase() || CurrentUser.email;
    CurrentUser.phone = phone || CurrentUser.phone;
    CurrentUser.gender = gender || CurrentUser.gender;
    CurrentUser.dob = dob || CurrentUser.dob;
    CurrentUser.address = address || CurrentUser.address;
    CurrentUser.city = city || CurrentUser.city;
    CurrentUser.pin = pin || CurrentUser.pin;

    //Update restaunt information
    CurrentUser.restaurantName = restaurantName || CurrentUser.restaurantName;
    CurrentUser.cuisine = cuisine || CurrentUser.cuisine;

    // Update nested documents
    if (document) {
      CurrentUser.document = {
        gst: document.gst || CurrentUser.document?.gst || "N/A",
        fssai: document.fssai || CurrentUser.document?.fssai || "N/A",
      };
    }

    // Update payment details
    if (paymentDetail) {
      CurrentUser.paymentDetail = {
        upi: paymentDetail.upi || CurrentUser.paymentDetail?.upi || "N/A",
        account_number:
          paymentDetail.account_number ||
          CurrentUser.paymentDetail?.account_number ||
          "N/A",
        IFSC: paymentDetail.IFSC || CurrentUser.paymentDetail?.IFSC || "N/A",
      };
    }

    // Update geo location
    if (geoLocation) {
      CurrentUser.geoLocation = {
        lat: geoLocation.lat || CurrentUser.geoLocation?.lat || "N/A",
        lon: geoLocation.lon || CurrentUser.geoLocation?.lon || "N/A",
      };
    }
    console.log("OldData: ", req.user);

    // if (document) {
    //   Object.assign(CurrentUser.documents, document);
    // }
    // if (paymentDetail) {
    //   Object.assign(CurrentUser.paymentDetails, paymentDetail);
    // }
    await CurrentUser.save();
    console.log("NewData:", CurrentUser);

    res.status(200).json({
      message: "Profile updated successfully",
      data: CurrentUser,
    });
  } catch (error) {
    next(error);
  }
};

export const RestaurantUpdatePhoto = async (req, res, next) => {
  try {
    // console.log("body: ", req.body);
    const currentUser = req.user;
    const dp = req.file;

    console.log(currentUser);
    console.log(dp);

    //console.log("request file: ", req.file);

    if (!dp) {
      const error = new Error("Profile Picture required");
      error.statusCode = 400;
      return next(error);
    }

    console.log("DP:", dp);

    if (currentUser.photo.publicID) {
      await cloudinary.uploader.destroy(currentUser.photo.publicID);
    }

    const b64 = Buffer.from(dp.buffer).toString("base64");
    // console.log(b64.slice(0,100));
    const dataURI = `data:${dp.mimetype};base64,${b64}`;
    console.log("DataURI", dataURI.slice(0, 100));

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "CraveIt/Manager",
      width: 500,
      height: 500,
      crop: "fill",
    });

    console.log("Image Uplaoded successfully: ", result);
    currentUser.photo.url = result.secure_url;
    currentUser.photo.publicID = result.public_id;

    await currentUser.save();

    res.status(200).json({ message: "Photo Updated", data: currentUser });
  } catch (error) {
    next(error);
  }
};

export const RestaurantResetPassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const currentUser = req.user;

    if (!oldPassword || !newPassword) {
      const error = new Error("All feilds required");
      error.statusCode = 400;
      return next(error);
    }

    const isVerified = await bcrypt.compare(oldPassword, currentUser.password);
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

export const GetAllPlacedOrder = async (req, res, next) => {
  try {
    const currentUser = req.user;

    const allOrders = await Order.find({ restaurantId: currentUser._id })
      .populate("userId")
      .populate("riderId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "All Placed Orders Fetched Successfully",
      data: allOrders,
    });
  } catch (error) {
    next(error);
  }
};
