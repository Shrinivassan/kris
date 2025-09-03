import express from "express";
import Purchase from "../models/purchase.js";

const getPurchase =  async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id);
    if (!purchase) return res.status(404).json({ error: "Purchase not found" });
    res.json(purchase);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFilteredPurchases = async (req, res) => {
  try {
    const { base, equipmentType, supplier, startDate, endDate } = req.query;

    let filters = {};
    if (base) filters.base = base;
    if (equipmentType) filters.equipmentType = equipmentType;
    if (supplier) filters.supplier = supplier;
    if (startDate && endDate) {
      filters.purchaseDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const purchases = await Purchase.find(filters).sort({ purchaseDate: -1 });
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addPurchase = async (req, res) => {
  try {
    const purchase = new Purchase(req.body);
    await purchase.save();
    res.status(201).json(purchase);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export default {
  getPurchase,
  getFilteredPurchases,
  addPurchase 
};