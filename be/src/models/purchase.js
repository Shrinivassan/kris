import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  base: { type: String, required: true },
  equipmentType: { type: String, required: true },
  equipmentName: { type: String, required: true },
  quantity: { type: Number, required: true },
  recordedBy: { type: String, required: true },
  supplier: String,
  purchaseDate: Date,
  unitPrice: Number,
  remarks: String
});


const Purchase =
  mongoose.models.Purchase || mongoose.model("Purchase", purchaseSchema);

export default Purchase;
