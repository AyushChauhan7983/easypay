import "./App.css";
import "./index.css";
import Home from "./components/Home";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import About from "./components/About";
import Contact from "./components/Contact";
import EmployeeDashboard from "./components/EmployeeDashboard";
import PayrollDashboard from "./components/PayrollDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Protected from "./components/Protected";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/admin"
          element={<Protected Component={AdminDashboard} />}
        />
        <Route
          path="/employee"
          element={<Protected Component={EmployeeDashboard} />}
        />
        <Route
          path="/payroll"
          element={<Protected Component={PayrollDashboard} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
