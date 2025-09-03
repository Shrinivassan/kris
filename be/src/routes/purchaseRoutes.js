import express from "express";
import Purchase from "../models/purchase.js";
import purchaseController from "../controller/purchase.controller.js";
const router = express.Router();


// Get purchase history with filters
router.get("/", purchaseController.getFilteredPurchases);
router.get("/:id", purchaseController.getPurchase);
router.post("/", purchaseController.addPurchase);

export default router;
