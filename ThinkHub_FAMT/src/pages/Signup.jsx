import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup({ setUser, onAuth }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student", // default
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Student email validation
    if (
      form.role === "student" &&
      !form.email.toLowerCase().endsWith("@famt.ac.in")
    ) {
      return setError(
        "Students must use a valid college email (e.g. TD240000@famt.ac.in)."
      );
    }

    try {
      const res = await axios.post("/api/auth/signup", {
        ...form,
        email: form.email.toLowerCase(),
      });

      if (res.data.token && res.data.user) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        if (setUser) setUser(res.data.user);
        if (onAuth) onAuth();   // ✅ trigger auth state update in App

        navigate("/"); // redirect to homepage
      } else {
        setError("Signup succeeded but login failed. Please login manually.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh] bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
          autoComplete="off"
          autoCapitalize="on"
        />

        <input
          type="email"
          name="email"
          placeholder="Email (college ID for students)"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
          autoComplete="off"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
          autoComplete="off"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

        {/* Link to Login */}
        <p className="text-center text-sm text-gray-500 mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
