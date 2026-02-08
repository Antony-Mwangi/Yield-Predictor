"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  PlusCircle, 
  History, 
  LogOut, 
  Download, 
  ChevronRight, 
  Sun, 
  Moon,
  Sprout,
  BarChart3,
  CloudRain
} from "lucide-react";

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// 1. STYLES DEFINED AT TOP (Fixes ReferenceError)
const styles = {
  container: { display: "flex", flexDirection: "column", minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif" },
  lightTheme: {
    bg: { background: "#F8FAFC" },
    card: { background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" },
    sidebar: { background: "#FFFFFF", borderRight: "1px solid #E2E8F0" },
    text: { color: "#1E293B" },
    textSecondary: { color: "#64748B" },
    tableHeader: { background: "#F8FAFC" },
    viewBtn: { background: "#F1F5F9", color: "#334155" }
  },
  darkTheme: {
    bg: { background: "#0F172A" },
    card: { background: "#1E293B", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.2)" },
    sidebar: { background: "#1E293B", borderRight: "1px solid #334155" },
    text: { color: "#F8FAFC" },
    textSecondary: { color: "#94A3B8" },
    tableHeader: { background: "#111827" },
    viewBtn: { background: "#334155", color: "#F8FAFC" }
  },
  topNav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 40px", height: "70px", zIndex: 10 },
  logoGroup: { display: "flex", alignItems: "center", gap: "12px" },
  logoText: { fontSize: "18px", fontWeight: "800", letterSpacing: "1px", margin: 0 },
  topNavRight: { display: "flex", alignItems: "center", gap: "20px" },
  userName: { fontSize: "14px", fontWeight: "600" },
  logoutBtn: { display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", background: "#fee2e2", color: "#b91c1c", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "600" },
  mainArea: { display: "flex", flex: 1 },
  sidebar: { width: "260px", padding: "30px 16px" },
  sidebarList: { listStyle: "none", padding: 0, margin: 0 },
  sidebarItem: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", marginBottom: "8px", borderRadius: "10px", cursor: "pointer", fontSize: "14px", fontWeight: "500" },
  activeItem: { background: "#2F855A", color: "#FFFFFF" },
  content: { flex: 1, padding: "40px" },
  headerRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" },
  pageTitle: { fontSize: "28px", fontWeight: "800", margin: 0 },
  exportBtn: { display: "flex", alignItems: "center", gap: "8px", padding: "12px 20px", background: "#1E293B", color: "#FFF", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "600" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "40px" },
  statCard: { display: "flex", alignItems: "center", gap: "20px", padding: "28px", borderRadius: "16px" },
  statIconBox: { padding: "12px", background: "rgba(0,0,0,0.03)", borderRadius: "12px" },
  statLabel: { fontSize: "13px", color: "#64748B", fontWeight: "600", margin: 0 },
  statValue: { fontSize: "30px", fontWeight: "800", margin: "4px 0 0 0" },
  graphWrapper: { padding: "30px", borderRadius: "16px", marginBottom: "40px" },
  tableWrapper: { borderRadius: "16px", overflow: "hidden", padding: "20px" },
  tableTitle: { fontSize: "18px", fontWeight: "700", marginBottom: "20px" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "16px", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", color: "#64748B" },
  td: { padding: "18px 16px", borderBottom: "1px solid rgba(0,0,0,0.03)", fontSize: "14px" },
  viewBtn: { display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.7)", backdropFilter: "blur(4px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
  modal: { width: "400px", padding: "32px", borderRadius: "24px" },
  modalGrid: { display: "grid", gap: "20px", marginBottom: "32px" },
  modalIconLabel: { display: "flex", alignItems: "center", gap: "8px", color: "#64748B" },
  modalLabel: { fontSize: "12px", fontWeight: "600" },
  modalValue: { fontSize: "22px", fontWeight: "800", marginLeft: "22px" },
  closeBtn: { width: "100%", padding: "14px", background: "#DD6B20", color: "#FFF", border: "none", borderRadius: "12px", fontWeight: "700", cursor: "pointer" },
  loader: { display: "flex", flexDirection: "column", height: "100vh", alignItems: "center", justifyContent: "center", fontWeight: "600" }
};

export default function DashboardPage() {
  const router = useRouter();
  
  const [user, setUser] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const theme = darkMode ? styles.darkTheme : styles.lightTheme;

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedMode = JSON.parse(localStorage.getItem("darkMode")) || false;
    
    if (!savedToken) {
      router.push("/login");
      return;
    }

    setDarkMode(savedMode);

    const authHeader = { 
      headers: { Authorization: `Bearer ${savedToken}`, "Content-Type": "application/json" } 
    };

    Promise.all([
      fetch("http://127.0.0.1:8000/api/auth/me/", authHeader),
      fetch("http://127.0.0.1:8000/api/auth/dashboard/", authHeader),
      fetch("http://127.0.0.1:8000/api/predictions/history/", authHeader),
    ])
    .then(async ([u, d, p]) => {
      if (u.ok) setUser(await u.json());
      if (d.ok) setDashboard(await d.json());
      if (p.ok) setPredictions(await p.json());
    })
    .catch(err => console.error("Fetch error:", err))
    .finally(() => setLoading(false));
  }, [router]);

  // 2. EXPORT REPORT LOGIC
  const handleExport = () => {
    if (predictions.length === 0) {
      alert("No data available to export.");
      return;
    }
    const headers = ["Date", "Yield (t/ha)", "Rainfall (mm)", "Pesticides", "Temp"];
    const rows = predictions.map(p => [
      new Date(p.created_at).toLocaleDateString(),
      p.yield_prediction,
      p.rainfall,
      p.pesticides,
      p.avg_temp
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `yield_report_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  const chartData = [...predictions].reverse().map(p => ({
    date: new Date(p.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    yield: p.yield_prediction,
  }));

  if (loading) return (
    <div style={{...styles.loader, background: darkMode ? "#0F172A" : "#F8FAFC"}}>
       <Sprout size={40} color="#2F855A" />
       <p style={{marginTop: 15, color: darkMode ? "#94A3B8" : "#64748B"}}>Syncing Data...</p>
    </div>
  );

  return (
    <div style={{ ...styles.container, ...theme.bg }}>
      <header style={{ ...styles.topNav, ...theme.card }}>
        <div style={styles.logoGroup}>
          <Sprout size={28} color="#2F855A" />
          <h2 style={{ ...styles.logoText, ...theme.text }}>YIELD<span style={{ fontWeight: 300 }}>PORTAL</span></h2>
        </div>
        <div style={styles.topNavRight}>
          <span style={{ ...styles.userName, ...theme.text }}>{user?.username}</span>
          <button style={styles.logoutBtn} onClick={() => { localStorage.removeItem("token"); router.push("/login"); }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <div style={styles.mainArea}>
        <nav style={{ ...styles.sidebar, ...theme.sidebar }}>
          <ul style={styles.sidebarList}>
            <li style={{ ...styles.sidebarItem, ...styles.activeItem }}><LayoutDashboard size={18} /> Dashboard</li>
            <li style={{ ...styles.sidebarItem, ...theme.textSecondary }} onClick={() => router.push("/predict")}><PlusCircle size={18} /> New Prediction</li>
            <li style={{ ...styles.sidebarItem, ...theme.textSecondary }} onClick={() => router.push("/history")}><History size={18} /> Archives</li>
            <li style={{ ...styles.sidebarItem, ...theme.textSecondary }} onClick={toggleDarkMode}>
              {darkMode ? <Sun size={18} /> : <Moon size={18} />} {darkMode ? "Light Mode" : "Dark Mode"}
            </li>
          </ul>
        </nav>

        <main style={styles.content}>
          <div style={styles.headerRow}>
            <h1 style={{ ...styles.pageTitle, ...theme.text }}>Insights Overview</h1>
            <button style={styles.exportBtn} onClick={handleExport}>
                <Download size={16} /> Export Report
            </button>
          </div>

          <section style={styles.statsGrid}>
            <div style={{ ...styles.statCard, ...theme.card, borderLeft: "5px solid #2F855A" }}>
              <div style={styles.statIconBox}><BarChart3 size={20} color="#2F855A" /></div>
              <div>
                <p style={styles.statLabel}>Latest Yield</p>
                <h3 style={{ ...styles.statValue, ...theme.text }}>{dashboard?.latest_yield ?? "0"} <small style={{fontSize: 14}}>t/ha</small></h3>
              </div>
            </div>
            <div style={{ ...styles.statCard, ...theme.card, borderLeft: "5px solid #DD6B20" }}>
              <div style={styles.statIconBox}><History size={20} color="#DD6B20" /></div>
              <div>
                <p style={styles.statLabel}>Total Predictions</p>
                <h3 style={{ ...styles.statValue, ...theme.text }}>{dashboard?.total_predictions ?? "0"}</h3>
              </div>
            </div>
          </section>

          <section style={{ ...styles.graphWrapper, ...theme.card }}>
            <h3 style={{ ...styles.tableTitle, ...theme.text }}>Yield Production Trend</h3>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2F855A" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2F855A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#334155" : "#E2E8F0"} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: darkMode ? "#1E293B" : "#FFF", border: "none", borderRadius: "10px" }} />
                  <Area type="monotone" dataKey="yield" stroke="#2F855A" strokeWidth={3} fill="url(#colorYield)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section style={{ ...styles.tableWrapper, ...theme.card }}>
            <h3 style={{ ...styles.tableTitle, ...theme.text }}>Recent History</h3>
            <table style={styles.table}>
              <thead>
                <tr style={theme.tableHeader}>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Yield Output</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {predictions.map(p => (
                  <tr key={p.id}>
                    <td style={{ ...styles.td, ...theme.text }}>{new Date(p.created_at).toLocaleDateString()}</td>
                    <td style={{ ...styles.td, ...theme.text, fontWeight: 600 }}>{p.yield_prediction}</td>
                    <td style={styles.td}>
                      <button style={{...styles.viewBtn, ...theme.viewBtn}} onClick={() => setSelectedPrediction(p)}>
                        View Details <ChevronRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>

      {selectedPrediction && (
        <div style={styles.modalOverlay} onClick={() => setSelectedPrediction(null)}>
          <div style={{ ...styles.modal, ...theme.card }} onClick={e => e.stopPropagation()}>
            <h3 style={{ ...theme.text, marginBottom: '24px' }}>Prediction Detail</h3>
            <div style={styles.modalGrid}>
              <div>
                <div style={styles.modalIconLabel}><BarChart3 size={14} /> <span style={styles.modalLabel}>Yield</span></div>
                <span style={{ ...styles.modalValue, color: '#2F855A' }}>{selectedPrediction.yield_prediction} t/ha</span>
              </div>
              <div>
                <div style={styles.modalIconLabel}><CloudRain size={14} /> <span style={styles.modalLabel}>Rainfall</span></div>
                <span style={{ ...styles.modalValue, ...theme.text }}>{selectedPrediction.rainfall} mm</span>
              </div>
            </div>
            <button onClick={() => setSelectedPrediction(null)} style={styles.closeBtn}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}