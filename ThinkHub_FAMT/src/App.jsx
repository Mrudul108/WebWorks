// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import QuestionForm from "./pages/QuestionForm";
import QuestionDetail from "./pages/QuestionDetail";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import GuestError from "./components/GuestError";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check auth on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Updated logout: simply clear storage and state
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {/* Navbar with auth props */}
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />

      {/* Routes */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* Protected: Ask a Question */}
          <Route
            path="/ask"
            element={
              isAuthenticated ? <QuestionForm /> : <GuestError />
            }
          />

          {/* Question Details (visible to all) */}
          <Route path="/questions/:id" element={<QuestionDetail />} />

          {/* Auth Pages */}
          {/* Pass onAuth callback to update isAuthenticated on login/signup */}
          <Route
            path="/signup"
            element={<Signup onAuth={() => setIsAuthenticated(true)} />}
          />
          <Route
            path="/login"
            element={<Login onAuth={() => setIsAuthenticated(true)} />}
          />
        </Routes>
      </div>
    </Router>
  );
}
