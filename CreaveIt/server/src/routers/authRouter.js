import express from "express";
import {
  UserLogin,
  UserLogout,
  UserRegister,
  UserGenOtp,
} from "../controllers/authController.js";

const router = express.Router();


router.post("/register", UserRegister);
router.post("/login", UserLogin);
router.get("/logout", UserLogout);
router.post("/genOtp", UserGenOtp);

export default router;
