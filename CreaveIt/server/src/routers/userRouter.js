import express from "express";
import {
  UserUpdate,
  UserUpdateAddress,
  UserChangePhoto,
  UserResetPassword,
  UserPlaceOrder,
  UserAllOrders,
  UserCancelOrder,
} from "../controllers/userController.js";
import { Protect } from "../middlewares/authMiddleware.js";
import multer from "multer";

const router = express.Router();
const Uploads = multer();

router.patch("/update", Protect, UserUpdate);
router.patch("/updateAddress", Protect, UserUpdateAddress);
router.patch("/changePhoto", Protect, Uploads.single("image"), UserChangePhoto);
router.patch("/resetPassword", Protect, UserResetPassword);
router.post("/placeorder", Protect, UserPlaceOrder);
router.get("/placedorders", Protect, UserAllOrders);
router.get("/placedorders/:orderId", Protect, UserCancelOrder);

export default router;
