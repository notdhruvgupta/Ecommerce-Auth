import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import CreateAccount from "./components/CreateAccount";
import LoginTab from "./components/LoginTab";
import VerifyEmail from "./components/VerifyEmail";
import SelectCategories from "./components/SelectCategories";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="h-screen">
        <Navbar />
        <Routes>
          <Route path="/register" element={<CreateAccount />} />
          <Route path="/login" element={<LoginTab />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          {/* Protected Route */}
          <Route
            path="/category"
            element={
              <ProtectedRoute>
                <SelectCategories />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
