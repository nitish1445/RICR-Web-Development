import express from "express";
import {
  getAdminOverview,
  getAllCustomers,
  deleteCustomer,
  getAllContactMessages,
  deleteContactMessage,
  getAllMangers,
  deleteManager,
  getAllPartners,
  deletePartner,
  addUserByAdmin,
  getAllOrdersByAdmin,
  getSingleOrderByAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/overview", getAdminOverview);
router.get("/orders", getAllOrdersByAdmin);
router.get("/order/:id", getSingleOrderByAdmin);
router.get("/customers", getAllCustomers);
router.delete("/customer/:id", deleteCustomer);
router.get("/managers", getAllMangers);
router.delete("/manager/:id", deleteManager);
router.get("/riders", getAllPartners);
router.delete("/rider/:id", deletePartner);
router.get("/contact-messages", getAllContactMessages);
router.delete("/contact-messages/:id", deleteContactMessage);
router.post("/add-user", addUserByAdmin);

export default router;
