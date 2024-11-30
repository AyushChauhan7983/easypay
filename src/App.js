import "./App.css";
import "./index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PayrollDashboard from "./pages/PayrollDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/payroll" element={<PayrollDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
