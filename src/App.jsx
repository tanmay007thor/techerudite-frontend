import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // ✅ Correct import
import CustomerRegister from "./pages/CustomerRegister";
import UserLogin from "./pages/UserLogin";
import AdminRegister from "./pages/AdminRegister";
import Dashboard from "./pages/Dashboard";
import VerifyEmail from "./pages/VerifyEmail";
function App() {
  return (
    <AuthProvider>
      {" "}
      {/* ✅ Wrap the entire app with AuthProvider */}
      <Router>
        <Routes>
          <Route path="/register/customer" element={<CustomerRegister />} />
          <Route path="/register/admin" element={<AdminRegister />} />
          <Route path="/login/user" element={<UserLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/verify-email" element={<VerifyEmail />} />{" "}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
