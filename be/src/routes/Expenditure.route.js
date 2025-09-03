// src/routes/Expenditure.route.js
import express from "express";
import {
  createExpenditure,
  getExpenditures
} from "../controller/Expenditure.controller.js";

const router = express.Router();

// Expenditures
router.post("/expend", createExpenditure);
router.get("/expend", getExpenditures);

export default router;