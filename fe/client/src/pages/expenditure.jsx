import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialExpenditure = {
  base: "Base Alpha",
  equipmentType: "Weapon",
  equipmentName: "Rifle AK-47",
  quantity: 1,
  reason: "",
  expendedDate: new Date().toISOString().slice(0, 10),
  remarks: "",
  recordedBy: "",
};

export default function Expenditures() {
  const navigate = useNavigate();
  const [expForm, setExpForm] = useState(initialExpenditure);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [rows, setRows] = useState([]);

  // Fetch expenditures
  const loadExpenditures = async () => {
    try {
      const res = await fetch("http://localhost:3000/expenditures/expend", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch expenditures");
      const data = await res.json();
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadExpenditures();
  }, []);

  const onChange = (e) =>
    setExpForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submitExpenditure = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/expenditures/expend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          base: expForm.base,
          equipmentType: expForm.equipmentType,
          equipmentName: expForm.equipmentName,
          quantity: Number(expForm.quantity),
          reason: expForm.reason,
          expendedDate: expForm.expendedDate,
          remarks: expForm.remarks,
          recordedBy: expForm.recordedBy,
        }),
      });
      if (!res.ok) throw new Error("Failed to save expenditure");
      setMsg({ type: "success", text: "Expenditure recorded ✅" });
      setExpForm(initialExpenditure);
      loadExpenditures();
    } catch (err) {
      setMsg({ type: "error", text: err.message || "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Expenditures</h1>
            <p className="text-gray-400">Track damaged or consumed assets</p>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Expenditure Form */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow">
          <h2 className="text-lg font-semibold mb-1">Log Expenditure</h2>
          <p className="text-sm text-gray-400 mb-4">
            Record assets that are expended or damaged.
          </p>

          <form onSubmit={submitExpenditure} className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm">Base</label>
                <input
                  name="base"
                  value={expForm.base}
                  onChange={onChange}
                  className="mt-1 w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-indigo-600 outline-none"
                />
              </div>
              <div>
                <label className="text-sm">Equipment Type</label>
                <select
                  name="equipmentType"
                  value={expForm.equipmentType}
                  onChange={onChange}
                  className="mt-1 w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-indigo-600 outline-none"
                >
                  <option>Weapon</option>
                  <option>Vehicle</option>
                  <option>Communication</option>
                  <option>Medical</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm">Equipment Name</label>
                <input
                  name="equipmentName"
                  value={expForm.equipmentName}
                  onChange={onChange}
                  className="mt-1 w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-indigo-600 outline-none"
                />
              </div>
              <div>
                <label className="text-sm">Quantity</label>
                <input
                  type="number"
                  min="1"
                  name="quantity"
                  value={expForm.quantity}
                  onChange={onChange}
                  className="mt-1 w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-indigo-600 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm">Reason</label>
                <input
                  name="reason"
                  value={expForm.reason}
                  onChange={onChange}
                  className="mt-1 w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-indigo-600 outline-none"
                  placeholder="Damaged during training"
                />
              </div>
              <div>
                <label className="text-sm">Expended Date</label>
                <input
                  type="date"
                  name="expendedDate"
                  value={expForm.expendedDate}
                  onChange={onChange}
                  className="mt-1 w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-indigo-600 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm">Remarks</label>
                <input
                  name="remarks"
                  value={expForm.remarks}
                  onChange={onChange}
                  className="mt-1 w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-indigo-600 outline-none"
                  placeholder="Batch 2 rifles sent for disposal"
                />
              </div>
              <div>
                <label className="text-sm">Recorded By</label>
                <input
                  name="recordedBy"
                  value={expForm.recordedBy}
                  onChange={onChange}
                  className="mt-1 w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-indigo-600 outline-none"
                  placeholder="Officer123"
                />
              </div>
            </div>

            {msg.text && (
              <p
                className={`text-sm ${
                  msg.type === "error" ? "text-red-500" : "text-green-500"
                }`}
              >
                {msg.text}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Log Expenditure"}
            </button>
          </form>
        </div>

        {/* Expenditure Table */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Expenditures</h3>
            <button
              onClick={loadExpenditures}
              className="px-3 py-2 rounded-lg bg-gray-900 hover:bg-gray-700"
            >
              Refresh
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-900">
                <tr className="text-left">
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Base</th>
                  <th className="px-3 py-2">Type</th>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Qty</th>
                  <th className="px-3 py-2">Reason</th>
                  <th className="px-3 py-2">Remarks</th>
                  <th className="px-3 py-2">By</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-3 py-6 text-center text-gray-400"
                    >
                      No records
                    </td>
                  </tr>
                )}
                {rows.map((r, i) => (
                  <tr key={i} className="border-b border-gray-700/50">
                    <td className="px-3 py-2">
                      {r.expendedDate?.slice(0, 10) || "-"}
                    </td>
                    <td className="px-3 py-2">{r.base}</td>
                    <td className="px-3 py-2">{r.equipmentType}</td>
                    <td className="px-3 py-2">{r.equipmentName}</td>
                    <td className="px-3 py-2">{r.quantity}</td>
                    <td className="px-3 py-2">{r.reason}</td>
                    <td className="px-3 py-2">{r.remarks}</td>
                    <td className="px-3 py-2">{r.recordedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
