"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isAuth, setIsAuth] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  // Handle scroll effect for a more modern feel
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
    return () => window.removeEventListener("scroll", handleScroll);
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
    <>
      {/* 1. TOP INFO BAR (New Content) */}
      <div className="top-bar">
        <div className="top-bar-content">
          <span>🌦️ Nairobi: 24°C - Optimal for Maize Growth</span>
          <div className="top-links">
            <span>Support: +254 700 000 000</span>
            <span className="divider">|</span>
            <span>English (UK)</span>
          </div>
        </div>
      </div>

      <header className={`main-header ${scrolled ? "scrolled" : ""}`}>
        <style>{`
          .top-bar {
            background: #14532d;
            color: #dcfce7;
            font-size: 12px;
            padding: 8px 5%;
            font-family: 'Inter', sans-serif;
          }
          .top-bar-content {
            display: flex;
            justify-content: space-between;
            max-width: 1400px;
            margin: 0 auto;
          }
          .top-links { display: flex; gap: 15px; }
          .divider { opacity: 0.3; }

          .main-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 5%;
            background-color: #ffffff;
            border-bottom: 1px solid #e5e7eb;
            position: sticky;
            top: 0;
            z-index: 1000;
            font-family: 'Inter', sans-serif;
            transition: all 0.3s ease;
          }
          
          .main-header.scrolled {
            padding: 10px 5%;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          }

          .logo-area {
            display: flex;
            flex-direction: column;
            cursor: pointer;
          }
          .logo {
            color: #166534;
            font-size: 1.4rem;
            font-weight: 900;
            display: flex;
            align-items: center;
            gap: 8px;
            margin: 0;
          }
          .tagline {
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #16a34a;
            font-weight: 700;
            margin-top: -2px;
          }

          .nav-menu {
            display: flex;
            gap: 30px;
            align-items: center;
          }

          /* Nav Links with Underline Animation */
          .nav-link {
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            color: #374151;
            position: relative;
            padding: 5px 0;
          }
          .nav-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: #22c55e;
            transition: width 0.3s ease;
          }
          .nav-link:hover::after { width: 100%; }
          .nav-link:hover { color: #166534; }

          .auth-buttons {
            display: flex;
            gap: 15px;
            align-items: center;
            border-left: 1px solid #e5e7eb;
            padding-left: 25px;
          }

          .logout-btn {
            background-color: #fef2f2;
            color: #dc2626;
            border: 1px solid #fee2e2;
            padding: 8px 16px;
            border-radius: 6px;
            font-weight: 700;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.2s;
          }
          .logout-btn:hover { background: #dc2626; color: white; }

          .menu-toggle {
            display: none;
            flex-direction: column;
            gap: 5px;
            cursor: pointer;
            background: none;
            border: none;
          }
          .bar { width: 22px; height: 2px; background: #166534; border-radius: 2px; }

          @media (max-width: 1000px) {
            .nav-menu { gap: 15px; }
            .top-bar { display: none; }
          }

          @media (max-width: 850px) {
            .menu-toggle { display: flex; }
            .nav-menu {
              position: absolute;
              top: 100%;
              left: 0;
              right: 0;
              background: white;
              flex-direction: column;
              padding: 30px;
              gap: 20px;
              display: ${menuOpen ? "flex" : "none"};
              box-shadow: 0 10px 15px rgba(0,0,0,0.1);
            }
            .auth-buttons {
              border-left: none;
              padding-left: 0;
              width: 100%;
              flex-direction: column;
            }
            .nav-link { font-size: 18px; width: 100%; text-align: center; }
          }
        `}</style>

        <div className="logo-area" onClick={() => navigateTo("/")}>
          <h2 className="logo">
            <span>🌽</span> MaizeWise AI
          </h2>
          <span className="tagline">Smart Farming Assistant</span>
        </div>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>

        <nav className="nav-menu">
          {/* COMMON LINKS */}
          <span className="nav-link" onClick={() => navigateTo("/")}>Home</span>
          <span className="nav-link" onClick={() => navigateTo("/resources")}>Farming Guide</span>
          {/* <span className="nav-link" onClick={() => navigateTo("/pricing")}>Pro Plans</span> */}

          {!isAuth ? (
            <div className="auth-buttons">
              <span className="nav-link" onClick={() => navigateTo("/login")}>Login</span>
              <button className="logout-btn" 
                      style={{backgroundColor: '#166534', color: 'white', borderColor: '#166534'}} 
                      onClick={() => navigateTo("/register")}>
                Get Started
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <span className="nav-link" onClick={() => navigateTo("/dashboard")}>Dashboard</span>
              <span className="nav-link" onClick={() => navigateTo("/predict")}>New Prediction</span>
              <span className="nav-link" onClick={() => navigateTo("/history")}>Archives</span>
              <button onClick={logout} className="logout-btn">
                Sign Out
              </button>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}