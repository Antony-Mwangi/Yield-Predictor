
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ type: "", text: "" }); // Combined error/success state
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus({ type: "", text: "" });
    setLoading(true);

    try {
      const data = await apiRequest("/auth/login/", "POST", {
        username,
        password,
      });

      if (data.access) {
        localStorage.setItem("token", data.access);
        setStatus({ type: "success", text: "Login successful! Opening dashboard..." });
        
        // Small delay to let the user see the success state
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        setStatus({ type: "error", text: "Invalid username or password" });
      }
    } catch (err) {
      setStatus({ type: "error", text: "Server connection failed. Please try again." });
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
          font-family: 'Inter', system-ui, sans-serif;
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
          font-size: 24px;
        }
        .subtitle {
          color: #666;
          margin-bottom: 24px;
          font-size: 14px;
        }

        /* Status Message Styling */
        .status-box {
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 14px;
          font-weight: 500;
          animation: slideDown 0.3s ease;
        }
        .status-box.success {
          background-color: #dcfce7;
          color: #166534;
          border: 1px solid #bbf7d0;
        }
        .status-box.error {
          background-color: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .form-flex {
          display: flex;
          flex-direction: column;
          gap: 16px;
          text-align: left;
        }
        .input-label {
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin-bottom: -10px;
        }
        .form-flex input {
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
          outline: none;
          transition: all 0.2s;
        }
        .form-flex input:focus {
          border-color: #22c55e;
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
        }
        .login-button {
          padding: 12px;
          background-color: #22c55e;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.2s;
          margin-top: 10px;
        }
        .login-button:hover {
          background-color: #16a34a;
        }
        .login-button:disabled {
          background-color: #9ca3af;
          cursor: not-allowed;
        }
        .footer-text {
          margin-top: 24px;
          font-size: 14px;
          color: #4b5563;
        }
        .register-link {
          color: #16a34a;
          cursor: pointer;
          font-weight: bold;
          text-decoration: none;
        }
        .register-link:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to access your farming assistant</p>

        {/* Status Message Display */}
        {status.text && (
          <div className={`status-box ${status.type}`}>
            {status.text}
          </div>
        )}

        <form onSubmit={handleLogin} className="form-flex">
          <label className="input-label">Username</label>
          <input
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label className="input-label">Password</label>
          <input
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="footer-text">
          Don’t have an account?{" "}
          <span className="register-link" onClick={() => router.push("/register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}