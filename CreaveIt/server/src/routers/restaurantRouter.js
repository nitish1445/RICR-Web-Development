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
  RestaurantOrderStatusUpdate,
  RestaurantEarnings,
} from "../controllers/restaurantController.js";
import { ManagerProtect, Protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
const upload = multer();

//Add Menu Item
router.post(
  "/addMenuItem",
  Protect,
  ManagerProtect,
  upload.array("itemImages", 5),
  RestaurantAddMenuItem,
);

//Get Menu Item
router.get("/menuItems", Protect, ManagerProtect, GetRestaurantMenuItem);

//Update Menu Item Photos
router.put(
  "/updateMenuItem/:id",
  Protect,
  ManagerProtect,
  upload.array("itemImages", 5),
  RestaurantEditMenuItem,
);

//Update Restaurant Profile
router.put("/update", Protect, ManagerProtect, RestaurantUpdateProfile);

//Update Restaurant Profile Photo
router.patch(
  "/changePhoto",
  Protect,
  ManagerProtect,
  upload.single("image"),
  RestaurantUpdatePhoto,
);

//Reset Restaurant Password
router.patch(
  "/resetPassword",
  Protect,
  ManagerProtect,
  RestaurantResetPassword,
);

//Get All Placed Orders
router.get("/placedOrders", Protect, ManagerProtect, GetAllPlacedOrder);

//Get Restaurant Earnings
router.get("/earnings", Protect, ManagerProtect, RestaurantEarnings);

//Update Order Status
router.patch(
  "/orders/:id/updateorderstatus",
  Protect,
  ManagerProtect,
  RestaurantOrderStatusUpdate,
);

export default router;
