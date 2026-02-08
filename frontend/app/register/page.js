
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
  const [message, setMessage] = useState({ type: "", text: "" }); // New state for messages
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" }); // Reset message

    try {
      const data = await apiRequest("/auth/register/", "POST", form);

      if (data.username) {
        setMessage({ type: "success", text: "Registration successful! Redirecting to login..." });
        // Delay redirect slightly so user can see the success message
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setMessage({ type: "error", text: "Registration failed. Please check your details." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "A connection error occurred. Try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <style>{`
        .auth-wrapper {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          font-family: 'Inter', sans-serif;
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
        
        /* Message Styling */
        .status-message {
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 14px;
          font-weight: 500;
          animation: fadeIn 0.3s ease;
        }
        .status-message.success {
          background-color: #dcfce7;
          color: #166534;
          border: 1px solid #bbf7d0;
        }
        .status-message.error {
          background-color: #fee2e2;
          color: #991b1b;
          border: 1px solid #fecaca;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
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
          transition: border-color 0.2s;
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
          transition: background 0.2s;
        }
        .reg-button:hover {
          background-color: #16a34a;
        }
        .reg-button:disabled {
          background-color: #86efac;
          cursor: not-allowed;
        }
        .footer-text {
          margin-top: 20px;
          font-size: 14px;
          color: #666;
        }
        .login-link {
          color: #16a34a;
          cursor: pointer;
          font-weight: bold;
          text-decoration: none;
        }
        .login-link:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="auth-card">
        <h2>Create Account</h2>
        <p style={{ color: '#666', marginBottom: '24px', fontSize: '14px' }}>
          Join the AI Smart Farming Assistant
        </p>

        
        {message.text && (
          <div className={`status-message ${message.type}`}>
            {message.text}
          </div>
        )}

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