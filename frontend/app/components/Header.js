"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isAuth, setIsAuth] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    setMenuOpen(false);
    router.push("/login");
  };

  const navigateTo = (path) => {
    router.push(path);
    setMenuOpen(false);
  };

  return (
    <header className="main-header">
      <style>{`
        .main-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 5%;
          background-color: #ffffff;
          border-bottom: 2px solid #f0fdf4;
          position: sticky;
          top: 0;
          z-index: 1000;
          font-family: 'Inter', sans-serif;
        }

        .logo {
          cursor: pointer;
          color: #166534;
          font-size: 1.25rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0;
        }

        /* Desktop Nav */
        .nav-menu {
          display: flex;
          gap: 25px;
          align-items: center;
        }

        .nav-link {
          cursor: pointer;
          font-size: 15px;
          font-weight: 600;
          color: #4b5563;
          transition: color 0.2s;
        }

        .nav-link:hover {
          color: #22c55e;
        }

        .logout-btn {
          background-color: #dc2626;
          color: white;
          border: none;
          padding: 8px 18px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .logout-btn:hover {
          opacity: 0.9;
        }

        /* Mobile Menu Toggle */
        .menu-toggle {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
        }

        .bar {
          width: 25px;
          height: 3px;
          background-color: #166534;
          border-radius: 2px;
        }

        /* Tablet & Mobile Breakpoint */
        @media (max-width: 850px) {
          .menu-toggle {
            display: flex;
          }

          .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: white;
            flex-direction: column;
            padding: 20px;
            gap: 15px;
            border-bottom: 1px solid #ddd;
            display: ${menuOpen ? "flex" : "none"};
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
          }

          .nav-link {
            width: 100%;
            text-align: center;
            padding: 10px 0;
          }

          .logout-btn {
            width: 100%;
          }
        }
      `}</style>

      <h2 className="logo" onClick={() => navigateTo("/")}>
        <span>🌽</span> Maize AI
      </h2>

      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </button>

      <nav className="nav-menu">
        {!isAuth ? (
          <>
            <span className="nav-link" onClick={() => navigateTo("/")}>Home</span>
            <span className="nav-link" onClick={() => navigateTo("/login")}>Login</span>
            <span className="nav-link" onClick={() => navigateTo("/register")}>Register</span>
          </>
        ) : (
          <>
            <span className="nav-link" onClick={() => navigateTo("/dashboard")}>Dashboard</span>
            <span className="nav-link" onClick={() => navigateTo("/predict")}>Predict</span>
            <span className="nav-link" onClick={() => navigateTo("/history")}>History</span>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}