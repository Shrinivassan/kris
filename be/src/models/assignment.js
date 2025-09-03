// src/models/Assignment.js
import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    base: { type: String, required: true },
    equipmentType: { type: String, required: true },
    equipmentName: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    assignedTo: { type: String, required: true }, // Personnel name/ID
    rank: { type: String }, // optional: for military/hierarchy tracking
    assignmentDate: { type: Date, default: Date.now },
    remarks: { type: String },
    recordedBy: { type: String, required: true }
  },
  { timestamps: true }
);

const  Assignment =
  mongoose.models.Assignment || mongoose.model("Assignment", assignmentSchema);

export default Assignment;
