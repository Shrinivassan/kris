import React, { useState, useEffect } from "react";
import {
  Shield,
  BarChart3,
  Users,
  ArrowRightLeft,
  Plus,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/dashboard/");
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }
      const data = await response.json();
      setDashboardData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Sample data (until backend covers these)
  const recentTransactions = [
    { id: 1, item: "M4 Carbine #MC-2023-041", personnel: "Sgt. Johnson", status: "Deployed", time: "1/15/2024, 8:00:00 PM" },
    { id: 2, item: "HMMWV #VH-2019-012", personnel: "Cpt. Smith", status: "Available", time: "1/15/2024, 7:15:00 PM" },
    { id: 3, item: "Radio Set #RC-2022-089", personnel: "Lt. Williams", status: "Deployed", time: "1/15/2024, 5:45:00 PM" },
    { id: 4, item: "Night Vision #NV-2021-156", personnel: "Sgt. Davis", status: "Maintenance", time: "1/15/2024, 3:00:00 PM" },
  ];

  const systemAlerts = [
    { id: 1, message: "Vehicle HMMWV #VH-2018-003 requires scheduled maintenance", priority: "High Priority", type: "warning" },
    { id: 2, message: "Asset check-in overdue: Radio Set #RC-2021-045 (3 days)", priority: "Critical Priority", type: "error" },
    { id: 3, message: "Low inventory: Night Vision Devices (5 remaining)", priority: "Medium Priority", type: "info" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-red-400">Error: {error}</div>
      </div>
    );
  }

  // API metrics fallback
  const metrics = dashboardData?.metrics || {};
  const {
    openingBalance = 0,
    closingBalance = 0,
    netMovement = 0,
    purchases = 0,
    transfersIn = 0,
    transfersOut = 0,
    assignments = 0,
    expenditures = 0,
  } = metrics;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            {/* Logo + Title */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold">MAMS</h1>
                <p className="text-xs text-gray-400">
                  Military Asset Management System
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex space-x-6">
              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center space-x-2 text-white bg-gray-700 px-3 py-2 rounded"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => navigate("/assign")}
                className="flex items-center space-x-2 text-gray-400 hover:text-white px-3 py-2"
              >
                <Shield className="w-4 h-4" />
                <span>Expenditure</span>
              </button>

              <button
                onClick={() => navigate("/transfers")}
                className="flex items-center space-x-2 text-gray-400 hover:text-white px-3 py-2"
              >
                <Users className="w-4 h-4" />
                <span>Transfers</span>
              </button>

              <button
                onClick={() => navigate("/transactions")}
                className="flex items-center space-x-2 text-gray-400 hover:text-white px-3 py-2"
              >
                <ArrowRightLeft className="w-4 h-4" />
                <span>Transactions</span>
              </button>
            </nav>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <span className="text-sm">John Smith</span>
            <span className="text-xs text-gray-400">Sergeant • Operator</span>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold">JS</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Welcome */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Dashboard</h2>
          <p className="text-gray-400">
            Welcome back, John Smith. Here's your system overview.
          </p>
        </div>

        {/* API Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MetricCard title="Opening Balance" value={openingBalance} icon={<BarChart3 />} color="gray" />
          <MetricCard title="Closing Balance" value={closingBalance} icon={<CheckCircle className="text-blue-400" />} color="blue" />
          <MetricCard title="Net Movement" value={`+${netMovement}`} icon={<ArrowRightLeft className="text-green-400" />} color="green" />
          <MetricCard title="Purchases" value={purchases} icon={<Plus className="text-green-400" />} color="green" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MetricCard title="Transfers In" value={transfersIn} icon={<ArrowRightLeft className="text-green-400 transform rotate-180" />} color="green" />
          <MetricCard title="Transfers Out" value={transfersOut} icon={<ArrowRightLeft className="text-yellow-400" />} color="yellow" />
          <MetricCard title="Assignments" value={assignments} icon={<Users className="text-blue-400" />} color="blue" />
          <MetricCard title="Expenditures" value={expenditures} icon={<AlertTriangle className="text-red-400" />} color="red" />
        </div>

        {/* Recent Transactions + System Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Transactions */}
          <div className="lg:col-span-2">
            <SectionCard title="Recent Transactions" subtitle="Latest asset check-out and check-in activities">
              {recentTransactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
            </SectionCard>
          </div>

          {/* Alerts */}
          <SectionCard title="System Alerts" subtitle="Critical notifications requiring attention">
            {systemAlerts.map((alert) => (
              <AlertItem key={alert.id} alert={alert} />
            ))}
          </SectionCard>
        </div>
      </main>
    </div>
  );
};

/* ----------------- Small Reusable Components ------------------ */
const MetricCard = ({ title, value, icon, color }) => (
  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-gray-400 text-sm">{title}</h3>
      {icon}
    </div>
    <div className={`text-3xl font-bold mb-1 text-${color}-400`}>{value}</div>
  </div>
);

const SectionCard = ({ title, subtitle, children }) => (
  <div className="bg-gray-800 rounded-lg border border-gray-700">
    <div className="p-6 border-b border-gray-700">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-400 text-sm">{subtitle}</p>
    </div>
    <div className="p-6 space-y-4">{children}</div>
  </div>
);

const TransactionItem = ({ transaction }) => (
  <div className="flex items-center justify-between p-4 bg-gray-750 rounded-lg">
    <div className="flex items-center space-x-3">
      <div className="w-2 h-2 rounded-full bg-green-400"></div>
      <div>
        <div className="font-medium">{transaction.item}</div>
        <div className="text-sm text-gray-400">
          Checked out to {transaction.personnel}
        </div>
      </div>
    </div>
    <div className="flex items-center space-x-3">
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${
          transaction.status === "Available"
            ? "bg-green-900 text-green-300"
            : transaction.status === "Deployed"
            ? "bg-yellow-900 text-yellow-300"
            : "bg-red-900 text-red-300"
        }`}
      >
        {transaction.status}
      </span>
      <div className="text-sm text-gray-400">{transaction.time}</div>
    </div>
  </div>
);

const AlertItem = ({ alert }) => (
  <div className="flex items-start space-x-3 p-4 bg-gray-750 rounded-lg">
    {alert.type === "warning" && (
      <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
    )}
    {alert.type === "error" && (
      <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
    )}
    {alert.type === "info" && (
      <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
    )}
    <div className="flex-1">
      <div className="text-sm">{alert.message}</div>
      <div
        className={`text-xs mt-1 ${
          alert.priority === "High Priority"
            ? "text-yellow-400"
            : alert.priority === "Critical Priority"
            ? "text-red-400"
            : "text-blue-400"
        }`}
      >
        {alert.priority}
      </div>
    </div>
  </div>
);

export default Dashboard;
