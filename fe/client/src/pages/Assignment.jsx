import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function Assignments() {
  const navigate = useNavigate();

  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState({
    base: "",
    equipmentType: "",
    equipmentName: "",
    quantity: 1,
    assignedTo: "",
    assignmentDate: new Date(),
    recordedBy: "",
    assignedBy: "",
  });

  // ✅ Fetch assignments on mount
  useEffect(() => {
    fetch("http://localhost:3000/assignments/assign")
      .then((res) => res.json())
      .then((data) => setAssignments(data))
      .catch((err) => console.error("Error fetching assignments:", err));
  }, []);

  // ✅ Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Submit new assignment
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/assignments/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          assignmentDate: form.assignmentDate.toISOString().split("T")[0], // format yyyy-mm-dd
        }),
      });
      if (!res.ok) throw new Error("Failed to assign asset");

      const newAssignment = await res.json();
      setAssignments([...assignments, newAssignment]);
      setForm({
        base: "",
        equipmentType: "",
        equipmentName: "",
        quantity: 1,
        assignedTo: "",
        assignmentDate: new Date(),
        recordedBy: "",
        assignedBy: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error assigning asset");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 space-y-6">
      {/* ✅ Back to Dashboard */}
      <div className="flex justify-end">
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-sm rounded-lg transition"
        >
          Back to Dashboard
        </button>
      </div>

      {/* Assignment Form */}
      <div className="bg-gray-800/80 p-6 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-xl font-bold mb-4">Assign Asset</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="base"
            placeholder="Base"
            value={form.base}
            onChange={handleChange}
            className="p-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="equipmentType"
            placeholder="Equipment Type"
            value={form.equipmentType}
            onChange={handleChange}
            className="p-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="equipmentName"
            placeholder="Equipment Name"
            value={form.equipmentName}
            onChange={handleChange}
            className="p-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            className="p-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="assignedTo"
            placeholder="Assigned To"
            value={form.assignedTo}
            onChange={handleChange}
            className="p-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* ✅ Date Picker */}
          <div className="p-2 rounded bg-gray-900 border border-gray-700">
            <DatePicker
              selected={form.assignmentDate}
              onChange={(date) => setForm({ ...form, assignmentDate: date })}
              dateFormat="dd-MM-yyyy"
              className="w-full bg-transparent outline-none text-white"
              wrapperClassName="w-full"
            />
          </div>

          <input
            type="text"
            name="recordedBy"
            placeholder="Recorded By"
            value={form.recordedBy}
            onChange={handleChange}
            className="p-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="assignedBy"
            placeholder="Assigned By"
            value={form.assignedBy}
            onChange={handleChange}
            className="p-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Assign Asset
          </button>
        </form>
      </div>

      {/* Assignments List */}
      <div className="bg-gray-800/80 p-6 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-xl font-bold mb-4">Assignments History</h2>
        <table className="w-full border border-gray-700 text-sm">
          <thead className="bg-gray-700 text-gray-300">
            <tr>
              <th className="p-2">Base</th>
              <th className="p-2">Type</th>
              <th className="p-2">Name</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Assigned To</th>
              <th className="p-2">Date</th>
              <th className="p-2">Recorded By</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr
                key={a._id}
                className="border-t border-gray-700 hover:bg-gray-700/50"
              >
                <td className="p-2">{a.base}</td>
                <td className="p-2">{a.equipmentType}</td>
                <td className="p-2">{a.equipmentName}</td>
                <td className="p-2">{a.quantity}</td>
                <td className="p-2">{a.assignedTo}</td>
                <td className="p-2">
                  {new Date(a.assignmentDate).toLocaleDateString()}
                </td>
                <td className="p-2">{a.recordedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
