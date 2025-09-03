// src/components/StatCard.jsx
const StatCard = ({ title, value, description, icon, type = 'default', valueSize = 'text-3xl' }) => {
  const typeStyles = {
    default: 'text-white',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    danger: 'text-red-500',
    info: 'text-blue-500'
  }

  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-title">{title}</span>
        <span className="text-xl opacity-60">{icon}</span>
      </div>
      <div className={`${valueSize} font-bold mb-1 ${typeStyles[type]}`}>{value}</div>
      <div className="stat-description">{description}</div>
    </div>
  )
}

// src/components/RecentTransactions.jsx
const RecentTransactions = ({ transactions }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          📋 Recent Transactions
        </h2>
      </div>
      <div className="text-sm text-gray-400 mb-4">Latest asset check-out and check-in activities</div>

      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <span className={transaction.iconColor}>{transaction.icon}</span>
              <div>
                <div className="font-medium">{transaction.asset}</div>
                <div className="text-xs text-gray-400">{transaction.action} {transaction.personnel}</div>
              </div>
            </div>
            <div className="text-right">
              <span className={`status-badge ${
                transaction.status === 'Available' ? 'status-available' :
                transaction.status === 'Deployed' ? 'status-deployed' :
                transaction.status === 'Maintenance' ? 'status-maintenance' : 'status-active'
              }`}>
                {transaction.status}
              </span>
              <div className="text-xs text-gray-400 mt-1">{transaction.timestamp}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// src/components/SystemAlerts.jsx
const SystemAlerts = ({ alerts }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          🚨 System Alerts
        </h2>
      </div>
      <div className="text-sm text-gray-400 mb-4">Critical notifications requiring attention</div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className={`alert alert-${alert.type}`}>
            <span>{alert.icon}</span>
            <div>
              <div className="font-medium">{alert.title}</div>
              <div className="text-xs opacity-80">{alert.priority}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// src/components/SearchFilter.jsx
const SearchFilter = ({ searchPlaceholder, filters, onSearch, onFilter, onApplyFilters, children }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
      {children}
    </div>
  )};