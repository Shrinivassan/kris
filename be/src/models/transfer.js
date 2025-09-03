import mongoose from "mongoose";

const transferSchema = new mongoose.Schema({
  fromBase: { type: String, required: true },   // Base sending the asset
  toBase: { type: String, required: true },     // Base receiving the asset
  equipmentType: { type: String, required: true }, // Weapons, Vehicles, etc.
  equipmentName: { type: String, required: true }, // Specific item
  quantity: { type: Number, required: true, min: 1 },
  transferDate: { type: Date, default: Date.now }, // Defaults to current time
  remarks: { type: String },

  // Audit
  recordedBy: { type: String, required: true },  // who logged this transfer
}, 
{ timestamps: true }); // adds createdAt & updatedAt

const Transfer =
  mongoose.models.Transfer || mongoose.model("Transfer", transferSchema);

export default Transfer;
