import Expenditure from "../models/Expenditure.js";

export const createExpenditure = async (req, res) => {
  try {
    const expenditure = new Expenditure(req.body);
    await expenditure.save();
    res.status(201).json(expenditure);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getExpenditures = async (req, res) => {
  try {
    const expenditures = await Expenditure.find(req.query);
    res.json(expenditures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};