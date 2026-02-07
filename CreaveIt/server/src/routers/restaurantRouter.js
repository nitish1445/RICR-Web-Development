import express from "express";
import multer from "multer";

import {
  RestaurantAddMenuItem,
  GetRestaurantMenuItem,
  RestaurantEditMenuItem,
  RestaurantUpdateProfile,
  RestaurantResetPassword,
  RestaurantUpdatePhoto,
} from "../controllers/restaurantController.js";
import { ManagerProtect, Protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
const upload = multer();

router.post(
  "/addMenuItem",
  Protect,
  ManagerProtect,
  upload.array("itemImages", 5),
  RestaurantAddMenuItem,
);

router.get("/menuItems", Protect, ManagerProtect, GetRestaurantMenuItem);

router.put(
  "/updateMenuItem/:id",
  Protect,
  ManagerProtect,
  upload.array("itemImages", 5),
  RestaurantEditMenuItem,
);

router.put(
  "/update",
  Protect,
  ManagerProtect,
  upload.array("itemImages", 5),
  RestaurantUpdateProfile,
);

router.patch(
  "/updatePhoto",
  Protect,
  ManagerProtect,
  upload.array("itemImages", 5),
  RestaurantUpdatePhoto,
);

router.patch(
  "/resetPassword",
  Protect,
  ManagerProtect,
  upload.array("itemImages", 5),
  RestaurantResetPassword,
);

export default router;
