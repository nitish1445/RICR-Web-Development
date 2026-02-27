import express from "express";
import multer from "multer";

import {
  RestaurantAddMenuItem,
  GetRestaurantMenuItem,
  RestaurantEditMenuItem,
  RestaurantUpdateProfile,
  RestaurantResetPassword,
  RestaurantUpdatePhoto,
  GetAllPlacedOrder,
  RestaurantOrderStatusUpdate
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

router.put("/update", Protect, ManagerProtect, RestaurantUpdateProfile);

router.patch(
  "/changePhoto",
  Protect,
  ManagerProtect,
  upload.single("image"),
  RestaurantUpdatePhoto,
);

router.patch(
  "/resetPassword",
  Protect,
  ManagerProtect,
  upload.array("itemImages", 5),
  RestaurantResetPassword,
);

router.get("/placedOrders", Protect, ManagerProtect, GetAllPlacedOrder);


router.patch(
  "/orders/:id/updateorderstatus",
  Protect,
  ManagerProtect,
  RestaurantOrderStatusUpdate,
);

export default router;
