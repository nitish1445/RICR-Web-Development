import express from "express";
import { NewContact } from "../controllers/PublicController.js";

const router = express.Router();

router.post("/new-contact", NewContact);

export default router;
