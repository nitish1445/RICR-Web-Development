import express from "express";
import { NewContact, GetAllRestaurants , GetRestaurantDisplay} from "../controllers/PublicController.js";

const router = express.Router();

router.post("/new-contact", NewContact);
router.get("allRestaurants", GetAllRestaurants);
router.get("/restaurant/:id", GetRestaurantDisplay)


export default router;
