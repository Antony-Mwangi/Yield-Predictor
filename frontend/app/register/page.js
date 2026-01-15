"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await apiRequest("/auth/register/", "POST", form);

    if (data.username) {
      alert("Registration successful! Please login.");
      router.push("/login");
    } else {
      alert("Registration failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="auth-wrapper">
      {/* Internal CSS using a standard style tag for 100% compatibility */}
      <style>{`
        .auth-wrapper {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          font-family: sans-serif;
          padding: 20px;
        }
        .auth-card {
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }
        .auth-card h2 {
          color: #166534;
          margin-bottom: 8px;
        }
        .auth-card p {
          color: #666;
          margin-bottom: 24px;
          font-size: 14px;
        }
        .form-flex {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .form-flex input {
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
          outline: none;
        }
        .form-flex input:focus {
          border-color: #22c55e;
        }
        .reg-button {
          padding: 12px;
          background-color: #22c55e;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
        }
        .reg-button:hover {
          background-color: #16a34a;
        }
        .footer-text {
          margin-top: 20px;
          font-size: 14px;
        }
        .login-link {
          color: #16a34a;
          cursor: pointer;
          font-weight: bold;
          text-decoration: underline;
        }
      `}</style>

      <div className="auth-card">
        <h2>Create Account</h2>
        <p>Join the AI Smart Farming Assistant</p>

        <form onSubmit={handleRegister} className="form-flex">
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="reg-button" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="footer-text">
          Already have an account?{" "}
          <span className="login-link" onClick={() => router.push("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}