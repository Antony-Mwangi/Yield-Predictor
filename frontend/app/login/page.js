"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const data = await apiRequest("/auth/login/", "POST", {
      username,
      password,
    });

    if (data.access) {
      localStorage.setItem("token", data.access);
      router.push("/dashboard");
    } else {
      setError("Invalid username or password");
    }
    setLoading(false);
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
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
        .auth-card p.subtitle {
          color: #666;
          margin-bottom: 24px;
          font-size: 14px;
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
          transition: border-color 0.2s;
        }
        .form-flex input:focus {
          border-color: #22c55e;
        }
        .error-msg {
          color: #dc2626;
          background: #fef2f2;
          padding: 10px;
          border-radius: 6px;
          font-size: 13px;
          margin-top: 5px;
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
        }
        .login-button:hover {
          background-color: #16a34a;
        }
        .login-button:disabled {
          background-color: #9ca3af;
          cursor: not-allowed;
        }
        .footer-text {
          margin-top: 20px;
          font-size: 14px;
          color: #4b5563;
        }
        .register-link {
          color: #16a34a;
          cursor: pointer;
          font-weight: bold;
          text-decoration: underline;
        }
      `}</style>

      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to access your farming assistant</p>

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

          {error && <div className="error-msg">{error}</div>}

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