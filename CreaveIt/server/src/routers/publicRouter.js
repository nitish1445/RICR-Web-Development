import express from "express";
import {
  NewContact,
  GetAllRestaurants,
  GetRestaurantDisplay,
} from "../controllers/publicController.js";

const router = express.Router();

router.post("/new-contact", NewContact);
router.get("/allRestaurants", GetAllRestaurants);
router.get("/restaurant/menu/:id", GetRestaurantDisplay);

export default router;
