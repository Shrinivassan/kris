import express from "express";
import Transfer from "../models/transfer.js";

// Create a new transfer
const  gettransfer = async (req, res) => {
  try {

    const transfer = new Transfer(req.body);
    await transfer.save();
    res.status(201).json(transfer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get transfer history with filters
const gettransferhis = async (req, res) => {
  try {
    console.log("get request for transfer history");
    const { fromBase, toBase, equipmentType, startDate, endDate } = req.query;

    let filters = {};
    if (fromBase) filters.fromBase = fromBase;
    if (toBase) filters.toBase = toBase;
    if (equipmentType) filters.equipmentType = equipmentType;
    if (startDate && endDate) {
      filters.transferDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const transfers = await Transfer.find(filters).sort({ transferDate: -1 });
    res.json(transfers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
    gettransfer,
    gettransferhis
}