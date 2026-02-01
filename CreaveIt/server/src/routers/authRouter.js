import express from "express";
import {
  UserLogin,
  UserLogout,
  UserRegister,
  UserGenOtp,
  UserVerifyOtp,
  UserForgetPassword,
} from "../controllers/authController.js";
import { OtpProtect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", UserRegister);
router.post("/login", UserLogin);
router.get("/logout", UserLogout);

router.post("/genOtp", UserGenOtp);
router.post("/verifyOtp", UserVerifyOtp);
router.post("/forgetPassword", OtpProtect, UserForgetPassword);

export default router;
