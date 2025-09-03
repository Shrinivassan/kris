// src/routes/dashboard.routes.js
import express from "express";
import dashboardController from "../controller/dashboard.controller.js.js";

const router = express.Router();

router.get("/", dashboardController.getDashboard);

export default router;
