import express from "express";
import { PartnerProtect, Protect } from "../middlewares/authMiddleware.js";
import {
  RiderOverviewData,
  RiderGetAvailableOrder,
  RiderGetCompletedOrder,
  RiderGetOngoingOrder,
  updateRiderOrderStatus,
  GetRiderPaymentStatus,
  ResetRiderPassword,
  RiderChangePhoto,
  RiderUpdateProfile,
} from "../controllers/riderController.js";
import multer from "multer";

const router = express.Router();
const Uploads = multer();

router.get("/overview", Protect, PartnerProtect, RiderOverviewData);
router.put("/reset-password", Protect, PartnerProtect, ResetRiderPassword);
router.put("/update-profile", Protect, PartnerProtect, RiderUpdateProfile);
router.patch(
  "/upload-photo",
  Protect,
  PartnerProtect,
  Uploads.single("photo"),
  RiderChangePhoto,
);
router.get("/availableOrder", Protect, PartnerProtect, RiderGetAvailableOrder);
router.get("/ongoingOrder", Protect, PartnerProtect, RiderGetOngoingOrder);
router.get("/completedOrder", Protect, PartnerProtect, RiderGetCompletedOrder);
router.get("/payment/:orderId", Protect, PartnerProtect, GetRiderPaymentStatus);
router.patch(
  "/order/:orderId/status",
  Protect,
  PartnerProtect,
  updateRiderOrderStatus,
);

export default router;
