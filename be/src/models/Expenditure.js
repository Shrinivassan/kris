// src/models/Expenditure.js
import mongoose from "mongoose";

const expenditureSchema = new mongoose.Schema(
  {
    base: { type: String, required: true },
    equipmentType: { type: String, required: true },
    equipmentName: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    reason: { type: String, required: true }, // e.g., "damaged", "consumed"
    expendedDate: { type: Date, default: Date.now },
    remarks: { type: String },
    recordedBy: { type: String, required: true }
  },
  { timestamps: true }
);

const Expenditure = mongoose.model("Expenditure", expenditureSchema);

export default Expenditure;