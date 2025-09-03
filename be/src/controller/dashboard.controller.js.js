//src/controller/dashboard.controller.js
//src/controller/dashboard.controller.js
import Purchase from "../models/Purchase.js";
import Transfer from "../models/Transfer.js";
import Assignment from "../models/Assignment.js";
import Expenditure from "../models/Expenditure.js";
import AssetInventory from "../models/AssetInventory.js";

/**
 * Calculate key asset metrics
 */
const calculateMetrics = async (filter = {}) => {
  // Fetch data
  const purchases = await Purchase.find(filter);
  const transfersIn = await Transfer.find({ ...filter, direction: "IN" });
  const transfersOut = await Transfer.find({ ...filter, direction: "OUT" });
  const assignments = await Assignment.find(filter);
  const expenditures = await Expenditure.find(filter);

  // Aggregations
  const totalPurchases = purchases.reduce((sum, p) => sum + (p.quantity || 0), 0);
  const totalTransfersIn = transfersIn.reduce((sum, t) => sum + (t.quantity || 0), 0);
  const totalTransfersOut = transfersOut.reduce((sum, t) => sum + (t.quantity || 0), 0);
  const totalAssignments = assignments.reduce((sum, a) => sum + (a.quantity || 0), 0);
  const totalExpenditures = expenditures.reduce((sum, e) => sum + (e.quantity || 0), 0);

  // Opening balance (from inventory)
  const inventory = await AssetInventory.find(filter);
  const openingBalance = inventory.reduce((sum, inv) => sum + (inv.quantity || 0), 0);

  // Closing balance
  const closingBalance =
    openingBalance +
    totalPurchases +
    totalTransfersIn -
    totalTransfersOut -
    totalAssignments -
    totalExpenditures;

  return {
    openingBalance,
    closingBalance,
    netMovement: totalPurchases + totalTransfersIn - totalTransfersOut,
    purchases: totalPurchases,
    transfersIn: totalTransfersIn,
    transfersOut: totalTransfersOut,
    assignments: totalAssignments,
    expenditures: totalExpenditures,
  };
};

/**
 * Dashboard API
 */
export const getDashboard = async (req, res) => {
  try {
    const { base, equipmentType, startDate, endDate } = req.query;

    let filter = {};
    if (base) filter.base = base;
    if (equipmentType) filter.equipmentType = equipmentType;
    if (startDate && endDate) {
      filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const metrics = await calculateMetrics(filter);

    res.json({
      filters: { base, equipmentType, startDate, endDate },
      metrics,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default { getDashboard };
