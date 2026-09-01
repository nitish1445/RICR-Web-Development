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
  MarkOrderPaymentPaid,
} from "../controllers/adminController.js";

import { Protect, AdminProtect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/overview", Protect, AdminProtect, getAdminOverview);
router.get("/orders", Protect, AdminProtect, getAllOrdersByAdmin);
router.get("/order/:id", Protect, AdminProtect, getSingleOrderByAdmin);
router.get("/customers", Protect, AdminProtect, getAllCustomers);
router.delete("/customer/:id", Protect, AdminProtect, deleteCustomer);
router.get("/managers", Protect, AdminProtect, getAllMangers);
router.delete("/manager/:id", Protect, AdminProtect, deleteManager);
router.get("/riders", Protect, AdminProtect, getAllPartners);
router.delete("/rider/:id", Protect, AdminProtect, deletePartner);
router.get("/contact-messages", Protect, AdminProtect, getAllContactMessages);
router.delete(
  "/contact-messages/:id",
  Protect,
  AdminProtect,
  deleteContactMessage,
);
router.post("/add-user", Protect, AdminProtect, addUserByAdmin);
router.put("/payment/:orderId", Protect, AdminProtect, MarkOrderPaymentPaid);

export default router;
