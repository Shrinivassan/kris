// src/controller/assignment.controller.js
import Assignment from "../models/assignment.js";

export const createAssignment = async (req, res) => {
  try {
    const assignment = new Assignment(req.body);
    await assignment.save();
    res.status(201).json(assignment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find(req.query);
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
