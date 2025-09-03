// src/pages/Transfers.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialTransfer = {
  fromBase: "",
  toBase: "",
  equipmentType: "Weapon",
  equipmentName: "",
  quantity: 1,
  transferDate: new Date().toISOString().slice(0, 10),
  recordedBy: "",
  remarks: "",
};

export default function Transfers() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialTransfer);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  // Fetch transfers
  const loadTransfers = async () => {
    try {
      const res = await fetch("http://localhost:3000/transfers", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch transfers");
      const data = await res.json();
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadTransfers();
  }, []);

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submitForm = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/transfers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          fromBase: form.fromBase,
          toBase: form.toBase,
          equipmentType: form.equipmentType,
          equipmentName: form.equipmentName,
          quantity: Number(form.quantity),
          transferDate: form.transferDate,
          recordedBy: form.recordedBy,
          remarks: form.remarks,
        }),
      });
      if (!res.ok) throw new Error("Transfer failed");
      setMsg({ type: "success", text: "Transfer recorded ✅" });
      setForm(initialTransfer);
      loadTransfers();
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
            <h1 className="text-2xl font-bold">Transfers</h1>
            <p className="text-gray-400">Move equipment between bases</p>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Form */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow">
          <h2 className="text-lg font-semibold mb-1">New Transfer</h2>
          <p className="text-sm text-gray-400 mb-4">
            Record equipment transfer between bases.
          </p>

          <form onSubmit={submitForm} className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm">From Base</label>
                <input
                  name="fromBase"
                  value={form.fromBase}
                  onChange={onChange}
                  className="mt-1 w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Alpha"
                  required
                />
              </div>
              <div>
                <label className="text-sm">To Base</label>
                <input
                  name="toBase"
                  value={form.toBase}
                  onChange={onChange}
                  className="mt-1 w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Bravo"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm">Equipment Type</label>
                <select
                  name="equipmentType"
                  value={form.equipmentType}
                  onChange={onChange}
                  className="mt-1 w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option>Weapon</option>
                  <option>Vehicle</option>
                  <option>Communication</option>
                  <option>Medical</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm">Equipment Name</label>
                <input
                  name="equipmentName"
                  value={form.equipmentName}
                  onChange={onChange}
                  className="mt-1 w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Rifle"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm">Quantity</label>
                <input
                  type="number"
                  min="1"
                  name="quantity"
                  value={form.quantity}
                  onChange={onChange}
                  className="mt-1 w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="text-sm">Transfer Date</label>
                <input
                  type="date"
                  name="transferDate"
                  value={form.transferDate}
                  onChange={onChange}
                  className="mt-1 w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm">Recorded By</label>
                <input
                  name="recordedBy"
                  value={form.recordedBy}
                  onChange={onChange}
                  className="mt-1 w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="LogisticsOfficer1"
                />
              </div>
              <div>
                <label className="text-sm">Remarks</label>
                <input
                  name="remarks"
                  value={form.remarks}
                  onChange={onChange}
                  className="mt-1 w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Optional notes"
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
              className="mt-1 w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Record Transfer"}
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Transfers</h3>
            <button
              onClick={loadTransfers}
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
                  <th className="px-3 py-2">From</th>
                  <th className="px-3 py-2">To</th>
                  <th className="px-3 py-2">Type</th>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Qty</th>
                  <th className="px-3 py-2">By</th>
                  <th className="px-3 py-2">Remarks</th>
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
                      {r.transferDate?.slice(0, 10) || "-"}
                    </td>
                    <td className="px-3 py-2">{r.fromBase}</td>
                    <td className="px-3 py-2">{r.toBase}</td>
                    <td className="px-3 py-2">{r.equipmentType}</td>
                    <td className="px-3 py-2">{r.equipmentName}</td>
                    <td className="px-3 py-2">{r.quantity}</td>
                    <td className="px-3 py-2">{r.recordedBy}</td>
                    <td className="px-3 py-2">{r.remarks || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs text-gray-400">
            Tip: Update GET/POST URLs if backend paths differ.
          </p>
        </div>
      </div>
    </div>
  );
}
