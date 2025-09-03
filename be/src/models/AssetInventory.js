// src/models/AssetInventory.js
import mongoose from "mongoose";

const assetInventorySchema = new mongoose.Schema({
  base: { type: String, required: true },
  equipmentType: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

const AssetInventory = mongoose.model("AssetInventory", assetInventorySchema);

export default AssetInventory;
