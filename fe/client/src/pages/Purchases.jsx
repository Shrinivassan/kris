import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Purchases() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    base: "",
    equipmentType: "",
    equipmentName: "",
    quantity: "",
    recordedBy: "",
    supplier: "",
    purchaseDate: "",
    unitPrice: "",
    remarks: "",
  });

  const [purchases, setPurchases] = useState([]);
  const [filters, setFilters] = useState({
    base: "",
    equipmentType: "",
    startDate: "",
    endDate: "",
  });

  // Fetch Purchases
  const fetchPurchases = async () => {
    try {
      let query = new URLSearchParams(filters).toString();
      const res = await fetch(`http://localhost:3000/register/purchases?${query}`);
      const data = await res.json();
      setPurchases(data);
    } catch (err) {
      console.error("Error fetching purchases:", err);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  // Handle Form Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit Purchase
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/register/purchases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        alert("✅ Purchase recorded successfully");
        setForm({
          base: "",
          equipmentType: "",
          equipmentName: "",
          quantity: "",
          recordedBy: "",
          supplier: "",
          purchaseDate: "",
          unitPrice: "",
          remarks: "",
        });
        fetchPurchases();
      } else {
        const err = await res.json();
        alert(`❌ ${err.error}`);
      }
    } catch (err) {
      alert("⚠️ Server error");
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📦 Purchase Management</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Purchase Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-2xl shadow-md mb-8 grid grid-cols-2 gap-4"
      >
        <input name="base" placeholder="Base" value={form.base} onChange={handleChange} className="p-2 border rounded bg-gray-700 text-white" required />
        <input name="equipmentType" placeholder="Equipment Type" value={form.equipmentType} onChange={handleChange} className="p-2 border rounded bg-gray-700 text-white" required />
        <input name="equipmentName" placeholder="Equipment Name" value={form.equipmentName} onChange={handleChange} className="p-2 border rounded bg-gray-700 text-white" required />
        <input type="number" name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} className="p-2 border rounded bg-gray-700 text-white" required />
        <input name="recordedBy" placeholder="Recorded By" value={form.recordedBy} onChange={handleChange} className="p-2 border rounded bg-gray-700 text-white" required />
        <input name="supplier" placeholder="Supplier" value={form.supplier} onChange={handleChange} className="p-2 border rounded bg-gray-700 text-white" />
        <input type="date" name="purchaseDate" value={form.purchaseDate} onChange={handleChange} className="p-2 border rounded bg-gray-700 text-white" />
        <input type="number" name="unitPrice" placeholder="Unit Price" value={form.unitPrice} onChange={handleChange} className="p-2 border rounded bg-gray-700 text-white" />
        <input name="remarks" placeholder="Remarks" value={form.remarks} onChange={handleChange} className="p-2 border rounded bg-gray-700 text-white col-span-2" />
        <button type="submit" className="col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
          Save Purchase
        </button>
      </form>

      {/* Filters */}
      <div className="bg-gray-800 p-4 rounded shadow-md mb-6 flex gap-4">
        <input placeholder="Filter by Base" value={filters.base} onChange={(e) => setFilters({ ...filters, base: e.target.value })} className="p-2 border rounded bg-gray-700 text-white" />
        <input placeholder="Filter by Type" value={filters.equipmentType} onChange={(e) => setFilters({ ...filters, equipmentType: e.target.value })} className="p-2 border rounded bg-gray-700 text-white" />
        <input type="date" value={filters.startDate} onChange={(e) => setFilters({ ...filters, startDate: e.target.value })} className="p-2 border rounded bg-gray-700 text-white" />
        <input type="date" value={filters.endDate} onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} className="p-2 border rounded bg-gray-700 text-white" />
        <button onClick={fetchPurchases} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Apply Filters
        </button>
      </div>

      {/* Purchases Table */}
      <div className="bg-gray-800 rounded shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">📜 Purchase History</h2>
        <table className="w-full border border-gray-700">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-2 border border-gray-600">Base</th>
              <th className="p-2 border border-gray-600">Type</th>
              <th className="p-2 border border-gray-600">Name</th>
              <th className="p-2 border border-gray-600">Qty</th>
              <th className="p-2 border border-gray-600">Recorded By</th>
              <th className="p-2 border border-gray-600">Supplier</th>
              <th className="p-2 border border-gray-600">Date</th>
              <th className="p-2 border border-gray-600">Unit Price</th>
              <th className="p-2 border border-gray-600">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {purchases.length > 0 ? (
              purchases.map((p) => (
                <tr key={p._id} className="text-center hover:bg-gray-700">
                  <td className="p-2 border border-gray-600">{p.base}</td>
                  <td className="p-2 border border-gray-600">{p.equipmentType}</td>
                  <td className="p-2 border border-gray-600">{p.equipmentName}</td>
                  <td className="p-2 border border-gray-600">{p.quantity}</td>
                  <td className="p-2 border border-gray-600">{p.recordedBy}</td>
                  <td className="p-2 border border-gray-600">{p.supplier}</td>
                  <td className="p-2 border border-gray-600">
                    {p.purchaseDate ? new Date(p.purchaseDate).toLocaleDateString() : "-"}
                  </td>
                  <td className="p-2 border border-gray-600">{p.unitPrice || "-"}</td>
                  <td className="p-2 border border-gray-600">{p.remarks}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="p-4 text-gray-400">
                  No purchases found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
