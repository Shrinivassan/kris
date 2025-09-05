import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/loginpage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import Transfers from "./pages/Transfers"; // ✅ import Transfers page
import Expenditure from "./pages/expenditure";
import Assignments from "./pages/Assignment"; 
import Purchases from "./pages/Purchases.jsx";  


function App() {
  return (
    <Router>
      <Routes>
        {/* Default route → redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Assignments page */}
        <Route path="/expend" element={<Expenditure />} />
        
        <Route path="/assignments" element={<Assignments />} />

        
        <Route path="/Transfers" element={<Transfers />} />
        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/purchases" element={<Purchases />} />

        {/* Catch-all → redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
