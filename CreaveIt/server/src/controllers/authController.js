import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import OTP from "../models/otpModel.js";
import { genToken } from "../utils/authToken.js";
import { sendOTPEmail } from "../utils/emailService.js";

//Resgister the new User
export const UserRegister = async (req, res, next) => {
  try {
    // fetch data from frontend
    const { fullName, email, phone, password, role } = req.body;

    // check all the required data
    if (!fullName || !email || !phone || !password || !role) {
      const error = new Error("All fields required");
      error.statusCode = 400;
      return next(error);
    }

    // check for duplicate user before registration
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("Email Already Registered");
      error.statusCode = 409;
      return next(error);
    }

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const photoURL = `https://placehold.co/600x400?text=${fullName.charAt(0).toUpperCase()}`;
    const photo = {
      url: photoURL,
    };

    // save data to database
    const newUser = await User.create({
      fullName,
      email,
      phone,
      password: hashPassword,
      role,
      photo,
    });

    // send respone to frontend
    console.log(newUser);
    res.status(201).json({ message: "Registration Successfull" });
  } catch (error) {
    next(error);
  }
};

//Login the existing user
export const UserLogin = async (req, res, next) => {
  try {
    // fetch data from frontend
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("All fields required");
      error.statusCode = 400;
      return next(error);
    }

    // check if user is register or not?
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const error = new Error("Email not Registered");
      error.statusCode = 401;
      return next(error);
    }

    // verify the password
    const isVerified = await bcrypt.compare(password, existingUser.password);
    if (!isVerified) {
      const error = new Error("Password didn't matched");
      error.statusCode = 401;
      return next(error);
    }

    // Token Generation
    genToken(existingUser, res);

    // send mesage to frontend
    res.status(200).json({ message: "Login Successfull", data: existingUser });
    // end
  } catch (error) {
    next(error);
  }
};

//Logiut the user
export const UserLogout = async (req, res, next) => {
  try {
    // send mesage to frontend
    res.clearCookie("parle");

    res.status(200).json({ message: "Logout Successfull" });
  } catch (error) {
    next(error);
  }
};

// Reset forgotten password of user by generating otp
export const UserGenOtp = async (req, res, next) => {

  try {
    // fetch the data from fe
    const { email } = req.body;
    console.log(email);
    

    //verify data is avuialable or not from fe
    if (!email) {
      const error = new Error("All field reaquired");
      error.statusCode = 400;
      return next(error);
    }

    //checks the existing user is or not from db
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const error = new Error("Email not registered");
      error.satusCode = 401;
      return next(error);
    }

    //if verfied gen Opt
    const otp = Math.floor(Math.random() * 1000000).toString();

    // adding some extra stuff to otp before hashing
    const salt = await bcrypt.genSalt(10);

    //hasing of otp
    const hashOTP = await bcrypt.hash(otp, salt);

    await OTP.create({
      email,
      otp: hashOTP,
      createdAt: new Date(),
    });

    await sendOTPEmail(email, otp);

    res.status(200).json({ message: "OTP sent on the registered email." });
  } catch (error) {
    next(error);
  }
};
