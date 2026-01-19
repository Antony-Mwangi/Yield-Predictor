
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function DashboardPage() {
//   const router = useRouter();
//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   const [user, setUser] = useState(null);
//   const [dashboard, setDashboard] = useState(null);
//   const [predictions, setPredictions] = useState([]);
//   const [selectedPrediction, setSelectedPrediction] = useState(null);
//   const [darkMode, setDarkMode] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!token) {
//       router.push("/login");
//       return;
//     }

//     Promise.all([
//       fetch("http://127.0.0.1:8000/api/auth/me/", authHeader()),
//       fetch("http://127.0.0.1:8000/api/auth/dashboard/", authHeader()),
//       fetch("http://127.0.0.1:8000/api/predictions/history/", authHeader()),
//     ])
//       .then(async ([u, d, p]) => {
//         setUser(await u.json());
//         setDashboard(await d.json());
//         setPredictions(await p.json());
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   function authHeader() {
//     return {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     };
//   }

//   function exportCSV() {
//     const rows = predictions.map(p => ({
//       date: p.created_at,
//       yield: p.yield_prediction,
//       rainfall: p.rainfall,
//       temperature: p.temperature,
//     }));
//     const csv =
//       "Date,Yield,Rainfall,Temperature\n" +
//       rows.map(r => Object.values(r).join(",")).join("\n");
//     const blob = new Blob([csv], { type: "text/csv" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "predictions.csv";
//     link.click();
//   }

//   if (loading) return <div style={styles.loader}>Loading dashboard…</div>;

//   return (
//     <div style={{ ...styles.page, ...(darkMode && styles.dark) }}>
//       {/* ---------- NAVBAR ---------- */}
//       <nav style={styles.nav}>
//         <h2 style={styles.logo}>🌱 Smart Farming AI</h2>
//         <div>
//           <button onClick={() => setDarkMode(!darkMode)} style={styles.toggle}>
//             {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
//           </button>
//           <button
//             onClick={() => {
//               localStorage.removeItem("token");
//               router.push("/login");
//             }}
//             style={styles.logout}
//           >
//             Logout
//           </button>
//         </div>
//       </nav>

//       {/* ---------- WELCOME ---------- */}
//       <section style={styles.welcome}>
//         <h1 style={styles.welcomeText}>Welcome back, {user?.username} 👋</h1>
//         <p style={styles.subText}>Here’s a quick overview of your farm performance.</p>
//       </section>

//       {/* ---------- METRICS ---------- */}
//       <section style={styles.metrics}>
//         <Metric title="Latest Yield" value={dashboard.latest_yield ?? "—"} />
//         <Metric title="Total Predictions" value={dashboard.total_predictions} />
//         <Metric title="Soil Status" value="Good" />
//         <Metric title="Yield Trend" value="+ Improving" />
//       </section>

//       {/* ---------- YIELD TREND CHART ---------- */}
//       <section style={styles.card}>
//         <h3 style={styles.cardTitle}>Yield Trend</h3>
//         <div style={styles.chartContainer}>
//           <svg width="100%" height="150">
//             {predictions.map((p, i) => (
//               <circle
//                 key={i}
//                 cx={20 + i * 50}
//                 cy={120 - p.yield_prediction * 5}
//                 r="6"
//                 fill="#2f855a"
//                 style={{ transition: "0.3s" }}
//               />
//             ))}
//             {/* Optional: connect points with lines */}
//             {predictions.map((p, i) =>
//               i > 0 ? (
//                 <line
//                   key={"line" + i}
//                   x1={20 + (i - 1) * 50}
//                   y1={120 - predictions[i - 1].yield_prediction * 5}
//                   x2={20 + i * 50}
//                   y2={120 - p.yield_prediction * 5}
//                   stroke="#2f855a"
//                   strokeWidth="2"
//                   style={{ transition: "0.3s" }}
//                 />
//               ) : null
//             )}
//           </svg>
//         </div>
//       </section>

//       {/* ---------- PREDICTION HISTORY ---------- */}
//       <section style={styles.card}>
//         <div style={styles.historyHeader}>
//           <h3 style={styles.cardTitle}>Prediction History</h3>
//           <button onClick={exportCSV} style={styles.export}>
//             Export CSV
//           </button>
//         </div>

//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Yield</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {predictions.map(p => (
//               <tr key={p.id} style={styles.row}>
//                 <td>{new Date(p.created_at).toLocaleDateString()}</td>
//                 <td>{p.yield_prediction}</td>
//                 <td>
//                   <button
//                     style={styles.viewBtn}
//                     onClick={() => setSelectedPrediction(p)}
//                   >
//                     View
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>

//       {/* ---------- PREDICTION DETAIL MODAL ---------- */}
//       {selectedPrediction && (
//         <div style={styles.modalOverlay} onClick={() => setSelectedPrediction(null)}>
//           <div style={styles.modal} onClick={e => e.stopPropagation()}>
//             <h3 style={{ marginBottom: "10px" }}>Prediction Detail</h3>
//             <p><strong>Yield:</strong> {selectedPrediction.yield_prediction}</p>
//             <p><strong>Rainfall:</strong> {selectedPrediction.rainfall}</p>
//             <p><strong>Temperature:</strong> {selectedPrediction.temperature}</p>
//             <button style={styles.closeBtn} onClick={() => setSelectedPrediction(null)}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* ---------- METRIC COMPONENT ---------- */
// const Metric = ({ title, value }) => (
//   <div style={styles.metric}>
//     <h4 style={styles.metricTitle}>{title}</h4>
//     <p style={styles.metricValue}>{value}</p>
//   </div>
// );

// /* ---------- STYLES ---------- */
// const styles = {
//   page: {
//     minHeight: "100vh",
//     background: "#f0f4f8",
//     padding: "20px",
//     fontFamily: "Inter, Segoe UI, sans-serif",
//     transition: "0.4s",
//   },
//   dark: {
//     background: "#1a202c",
//     color: "#e2e8f0",
//   },
//   nav: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "25px",
//   },
//   logo: {
//     fontWeight: "700",
//     color: "#2f855a",
//   },
//   toggle: {
//     marginRight: "10px",
//     padding: "6px 12px",
//     borderRadius: "6px",
//     cursor: "pointer",
//     border: "none",
//     background: "#edf2f7",
//     transition: "0.3s",
//   },
//   logout: {
//     padding: "6px 12px",
//     borderRadius: "6px",
//     border: "none",
//     background: "#e53e3e",
//     color: "#fff",
//     cursor: "pointer",
//     transition: "0.3s",
//   },
//   welcome: {
//     marginBottom: "30px",
//     textAlign: "center",
//   },
//   welcomeText: {
//     fontSize: "28px",
//     fontWeight: "600",
//     marginBottom: "5px",
//   },
//   subText: {
//     fontSize: "16px",
//     color: "#4a5568",
//   },
//   metrics: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
//     gap: "20px",
//     marginBottom: "30px",
//   },
//   metric: {
//     background: "#ffffff",
//     padding: "20px",
//     borderRadius: "12px",
//     textAlign: "center",
//     boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
//     transition: "0.3s",
//   },
//   metricTitle: {
//     fontSize: "14px",
//     color: "#718096",
//     marginBottom: "8px",
//   },
//   metricValue: {
//     fontSize: "24px",
//     fontWeight: "600",
//     color: "#2f855a",
//   },
//   card: {
//     background: "#ffffff",
//     padding: "25px",
//     borderRadius: "12px",
//     marginBottom: "30px",
//     boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
//   },
//   cardTitle: {
//     fontSize: "20px",
//     fontWeight: "600",
//     marginBottom: "15px",
//   },
//   chartContainer: {
//     paddingTop: "10px",
//   },
//   historyHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   export: {
//     background: "#2f855a",
//     color: "#fff",
//     padding: "8px 12px",
//     borderRadius: "6px",
//     cursor: "pointer",
//     border: "none",
//     transition: "0.3s",
//   },
//   table: {
//     width: "100%",
//     marginTop: "15px",
//     borderCollapse: "collapse",
//   },
//   row: {
//     transition: "0.3s",
//   },
//   viewBtn: {
//     background: "#3182ce",
//     color: "#fff",
//     padding: "5px 10px",
//     borderRadius: "5px",
//     border: "none",
//     cursor: "pointer",
//     transition: "0.3s",
//   },
//   modalOverlay: {
//     position: "fixed",
//     inset: 0,
//     background: "rgba(0,0,0,0.6)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modal: {
//     background: "#fff",
//     padding: "25px",
//     borderRadius: "10px",
//     width: "350px",
//     boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
//   },
//   closeBtn: {
//     marginTop: "15px",
//     padding: "6px 12px",
//     background: "#e53e3e",
//     color: "#fff",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
//   loader: {
//     textAlign: "center",
//     padding: "100px",
//     fontSize: "20px",
//   },
// };

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [user, setUser] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    Promise.all([
      fetch("http://127.0.0.1:8000/api/auth/me/", authHeader()),
      fetch("http://127.0.0.1:8000/api/auth/dashboard/", authHeader()),
      fetch("http://127.0.0.1:8000/api/predictions/history/", authHeader()),
    ])
      .then(async ([u, d, p]) => {
        setUser(await u.json());
        setDashboard(await d.json());
        setPredictions(await p.json());
      })
      .finally(() => setLoading(false));
  }, []);

  function authHeader() {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  }

  function exportCSV() {
    const rows = predictions.map(p => ({
      date: p.created_at,
      yield: p.yield_prediction,
      rainfall: p.rainfall,
      temperature: p.temperature,
    }));
    const csv =
      "Date,Yield,Rainfall,Temperature\n" +
      rows.map(r => Object.values(r).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "predictions.csv";
    link.click();
  }

  if (loading)
    return <div style={styles.loader}>Loading dashboard…</div>;

  return (
    <div style={{ ...styles.container, ...(darkMode && styles.dark) }}>
      {/* Top Navigation Bar */}
      <header style={styles.topNav}>
        <div>
          <h2 style={styles.logo}>🌽 AI Yield Portal</h2>
        </div>
        <div style={styles.topNavRight}>
          <button
            style={styles.themeToggle}
            onClick={() => {
              setDarkMode(!darkMode);
              localStorage.setItem("darkMode", !darkMode);
            }}
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>

          <span style={styles.userName}>{user?.username}</span>

          <button
            style={styles.logoutBtn}
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/login");
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Sidebar + Main Content */}
      <div style={styles.mainArea}>
        {/* Sidebar */}
        <nav style={styles.sidebar}>
          <ul style={styles.sidebarList}>
            <li style={styles.sidebarItem}>🏠 Dashboard</li>
            <li style={styles.sidebarItem} onClick={() => router.push("/predict")}>
              📊 New Prediction
            </li>
              <li style={styles.sidebarItem} onClick={() => router.push("/history")}>
    📁 History
  </li>

            <li style={styles.sidebarItem}>⚙ Settings</li>
          </ul>
        </nav>

        {/* Main Content */}
        <main style={styles.content}>
          {/* Hero Summary */}
          <section style={styles.hero}>
            <div style={styles.heroCard}>
              <h4 style={styles.cardTitle}>Latest Yield</h4>
              <p style={styles.cardValue}>{dashboard?.latest_yield ?? "—"}</p>
            </div>

            <div style={styles.heroCard}>
              <h4 style={styles.cardTitle}>Total Predictions</h4>
              <p style={styles.cardValue}>{dashboard?.total_predictions}</p>
            </div>
          </section>

          {/* Chart */}
          <section style={styles.chartCard}>
            <h3 style={styles.sectionTitle}>Yield Trend</h3>
            <svg width="100%" height="150">
              {predictions.map((p, i) => (
                <circle
                  key={i}
                  cx={25 + i * 60}
                  cy={120 - p.yield_prediction * 5}
                  r="6"
                  fill="#2f855a"
                />
              ))}
            </svg>
          </section>

          {/* Prediction History */}
          <section style={styles.tableCard}>
            <div style={styles.historyHeader}>
              <h3 style={styles.sectionTitle}>Prediction History</h3>
              <button onClick={exportCSV} style={styles.exportBtn}>
                Export CSV
              </button>
            </div>

            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Yield</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {predictions.map(p => (
                  <tr key={p.id}>
                    <td>{new Date(p.created_at).toLocaleDateString()}</td>
                    <td>{p.yield_prediction}</td>
                    <td>
                      <button
                        style={styles.viewBtn}
                        onClick={() => setSelectedPrediction(p)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>

      {/* Modal */}
      {selectedPrediction && (
        <div
          style={styles.modalOverlay}
          onClick={() => setSelectedPrediction(null)}
        >
          <div
            style={styles.modal}
            onClick={e => e.stopPropagation()}
          >
            <h3>Prediction Detail</h3>
            <p><strong>Yield:</strong> {selectedPrediction.yield_prediction}</p>
            <p><strong>Rainfall:</strong> {selectedPrediction.rainfall}</p>
            <p><strong>Temperature:</strong> {selectedPrediction.temperature}</p>
            <button
              onClick={() => setSelectedPrediction(null)}
              style={styles.closeBtn}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- INTERNAL CSS ---------- */
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    fontFamily: "Segoe UI, sans-serif",
    minHeight: "100vh",
    background: "#f7f9fc",
  },
  dark: {
    background: "#1e293b",
    color: "#e2e8f0",
  },

  /* ---- Top navigation ---- */
  topNav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px 32px",
    borderBottom: "2px solid #e2e8f0",
  },
  topNavRight: { display: "flex", gap: "12px", alignItems: "center" },
  logo: { fontSize: "22px", fontWeight: "700" },
  themeToggle: {
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer", border: "none"
  },
  userName: { fontSize: "16px", fontWeight: "600" },
  logoutBtn: { padding: "6px 10px", background: "#e53e3e", color: "#fff", border: "none" },

  /* ---- Sidebar ---- */
  mainArea: { display: "flex" },
  sidebar: {
    width: "220px",
    padding: "20px",
    borderRight: "2px solid #e2e8f0",
    background: "#ffffff",
  },
  sidebarList: { listStyle: "none", padding: 0 },
  sidebarItem: {
    margin: "16px 0",
    cursor: "pointer",
    fontWeight: "600",
    color: "#2d3748",
  },

  /* ---- Main content ---- */
  content: { flex: 1, padding: "24px" },
  hero: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
    gap: "20px",
    marginBottom: "24px",
  },
  heroCard: {
    background: "#fff",
    padding: "18px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.06)",
    textAlign: "center",
  },
  cardTitle: { fontSize: "14px", color: "#718096" },
  cardValue: { fontSize: "28px", fontWeight: "700" },

  sectionTitle: { fontSize: "18px", fontWeight: "700", marginBottom: "12px" },

  chartCard: {
    background: "#fff",
    padding: "18px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.06)",
    marginBottom: "24px",
  },

  tableCard: {
    background: "#fff",
    padding: "18px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.06)",
  },

  historyHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  exportBtn: { padding: "6px 10px", background: "#2f855a", color: "#fff", border: "none", borderRadius: "6px" },

  table: { width: "100%", borderCollapse: "collapse" },
  viewBtn: { padding: "4px 8px", background: "#3182ce", color: "#fff", border: "none", borderRadius: "4px" },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: { background: "#fff", padding: "22px", borderRadius: "10px", width: "300px" },
  closeBtn: { marginTop: "12px", padding: "6px 10px", background: "#e53e3e", color: "#fff", border: "none", borderRadius: "5px" },

  loader: { textAlign: "center", marginTop: "60px", fontSize: "18px" },
};
