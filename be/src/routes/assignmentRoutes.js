// src/routes/assignmentRoutes.js
import express from "express";
import {
  createAssignment,
  getAssignments
} from "../controller/assignment.controller.js";

const router = express.Router();

// Assignments
router.post("/assign", createAssignment);
router.get("/assign", getAssignments);

export default router;
