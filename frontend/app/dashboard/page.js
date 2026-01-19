// "use client";

// import { useState, useEffect } from "react";
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

//   if (loading)
//     return <div style={styles.loader}>Loading dashboard…</div>;

//   return (
//     <div style={{ ...styles.container, ...(darkMode && styles.dark) }}>
//       {/* Top Navigation */}
//       <header style={styles.topNav}>
//         <div>
//           <h2 style={styles.logo}>🌽 AI Yield Portal</h2>
//         </div>
//         <div style={styles.topNavRight}>
//           <button
//             style={styles.themeToggle}
//             onClick={() => {
//               setDarkMode(!darkMode);
//               localStorage.setItem("darkMode", !darkMode);
//             }}
//           >
//             {darkMode ? "☀ Light" : "🌙 Dark"}
//           </button>
//           <span style={styles.userName}>{user?.username}</span>
//           <button
//             style={styles.logoutBtn}
//             onClick={() => {
//               localStorage.removeItem("token");
//               router.push("/login");
//             }}
//           >
//             Logout
//           </button>
//         </div>
//       </header>

//       {/* Sidebar + Main */}
//       <div style={styles.mainArea}>
//         <nav style={styles.sidebar}>
//           <ul style={styles.sidebarList}>
//             <li style={styles.sidebarItem}>🏠 Dashboard</li>
//             <li style={styles.sidebarItem} onClick={() => router.push("/predict")}>
//               📊 New Prediction
//             </li>
//             <li style={styles.sidebarItem} onClick={() => router.push("/history")}>
//               📁 Archives
//             </li>
//             <li style={styles.sidebarItem}>⚙ Settings</li>
//           </ul>
//         </nav>

//         <main style={styles.content}>
//           {/* Hero Summary */}
//           <section style={styles.hero}>
//             <div style={{ ...styles.heroCard, backgroundColor: "#F0FFF4", borderLeft: "5px solid #2F855A" }}>
//               <h4 style={styles.cardTitle}>Latest Yield</h4>
//               <p style={styles.cardValue}>{dashboard?.latest_yield ?? "—"}</p>
//             </div>
//             <div style={{ ...styles.heroCard, backgroundColor: "#FEFAF0", borderLeft: "5px solid #DD6B20" }}>
//               <h4 style={styles.cardTitle}>Total Predictions</h4>
//               <p style={styles.cardValue}>{dashboard?.total_predictions}</p>
//             </div>
//           </section>

//           {/* Chart */}
//           <section style={{ ...styles.chartCard, backgroundColor: "#F7FAF3" }}>
//             <h3 style={styles.sectionTitle}>Yield Trend</h3>
//             <svg width="100%" height="150">
//               {predictions.map((p, i) => (
//                 <circle
//                   key={i}
//                   cx={25 + i * 60}
//                   cy={120 - p.yield_prediction * 5}
//                   r="6"
//                   fill="#2F855A"
//                 />
//               ))}
//             </svg>
//           </section>

//           {/* Prediction History */}
//           <section style={{ ...styles.tableCard, backgroundColor: "#F7FAF3" }}>
//             <div style={styles.historyHeader}>
//               <h3 style={styles.sectionTitle}>Prediction History</h3>
//               <button onClick={exportCSV} style={{ ...styles.exportBtn, backgroundColor: "#2F855A" }}>
//                 Export CSV
//               </button>
//             </div>

//             <table style={styles.table}>
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Yield</th>
//                   <th>View</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {predictions.map(p => (
//                   <tr key={p.id}>
//                     <td>{new Date(p.created_at).toLocaleDateString()}</td>
//                     <td>{p.yield_prediction}</td>
//                     <td>
//                       <button
//                         style={{ ...styles.viewBtn, backgroundColor: "#38A169" }}
//                         onClick={() => setSelectedPrediction(p)}
//                       >
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </section>
//         </main>
//       </div>

//       {/* Modal */}
//       {selectedPrediction && (
//         <div
//           style={styles.modalOverlay}
//           onClick={() => setSelectedPrediction(null)}
//         >
//           <div style={styles.modal} onClick={e => e.stopPropagation()}>
//             <h3>Prediction Detail</h3>
//             <p><strong>Yield:</strong> {selectedPrediction.yield_prediction}</p>
//             <p><strong>Rainfall:</strong> {selectedPrediction.rainfall}</p>
//             <p><strong>Temperature:</strong> {selectedPrediction.temperature}</p>
//             <button
//               onClick={() => setSelectedPrediction(null)}
//               style={{ ...styles.closeBtn, backgroundColor: "#DD6B20" }}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* ---------- INTERNAL CSS ---------- */
// const styles = {
//   container: { display: "flex", flexDirection: "column", fontFamily: "Segoe UI, sans-serif", minHeight: "100vh", background: "#F0F4F0" },
//   dark: { background: "#1B2A1F", color: "#DFF5E1" },

//   topNav: { display: "flex", justifyContent: "space-between", padding: "16px 32px", borderBottom: "2px solid #C6DABF" },
//   topNavRight: { display: "flex", gap: "12px", alignItems: "center" },
//   logo: { fontSize: "22px", fontWeight: "700" },
//   themeToggle: { padding: "6px 10px", borderRadius: "6px", cursor: "pointer", border: "none", backgroundColor: "#68D391", color: "#fff" },
//   userName: { fontSize: "16px", fontWeight: "600" },
//   logoutBtn: { padding: "6px 10px", background: "#E53E3E", color: "#fff", border: "none", borderRadius: "6px" },

//   mainArea: { display: "flex" },
//   sidebar: { width: "220px", padding: "20px", borderRight: "2px solid #C6DABF", background: "#F7FFF0" },
//   sidebarList: { listStyle: "none", padding: 0 },
//   sidebarItem: { margin: "16px 0", cursor: "pointer", fontWeight: "600", color: "#276749", transition: "0.2s", padding: "6px", borderRadius: "6px" },
//   sidebarItemHover: { backgroundColor: "#C6F6D5" },

//   content: { flex: 1, padding: "24px" },
//   hero: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "20px", marginBottom: "24px" },
//   heroCard: { padding: "18px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.06)", textAlign: "center" },
//   cardTitle: { fontSize: "14px", color: "#718096" },
//   cardValue: { fontSize: "28px", fontWeight: "700" },

//   sectionTitle: { fontSize: "18px", fontWeight: "700", marginBottom: "12px" },
//   chartCard: { padding: "18px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.06)", marginBottom: "24px" },
//   tableCard: { padding: "18px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.06)" },
//   historyHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
//   exportBtn: { padding: "6px 10px", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" },
//   table: { width: "100%", borderCollapse: "collapse" },
//   viewBtn: { padding: "4px 8px", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },

//   modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center" },
//   modal: { background: "#F0FFF4", padding: "22px", borderRadius: "10px", width: "300px" },
//   closeBtn: { marginTop: "12px", padding: "6px 10px", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" },

//   loader: { textAlign: "center", marginTop: "60px", fontSize: "18px" },
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

  // Load darkMode from localStorage globally
  useEffect(() => {
    const savedMode = typeof window !== "undefined" ? localStorage.getItem("darkMode") : "false";
    setDarkMode(savedMode === "true");
  }, []);

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
      {/* Top Navigation */}
      <header style={styles.topNav}>
        <div>
          <h2 style={styles.logo}>🌽 AI Yield Portal</h2>
        </div>
        <div style={styles.topNavRight}>
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

      {/* Sidebar + Main */}
      <div style={styles.mainArea}>
        <nav style={styles.sidebar}>
          <ul style={styles.sidebarList}>
            <li style={styles.sidebarItem}>🏠 Dashboard</li>
            <li style={styles.sidebarItem} onClick={() => router.push("/predict")}>
              📊 New Prediction
            </li>
            <li style={styles.sidebarItem} onClick={() => router.push("/history")}>
              📁 Archives
            </li>
            <li
              style={styles.sidebarItem}
              onClick={() => {
                // Toggle dark mode from settings
                const newMode = !darkMode;
                setDarkMode(newMode);
                localStorage.setItem("darkMode", newMode);
              }}
            >
              ⚙ Settings (Toggle Theme)
            </li>
          </ul>
        </nav>

        <main style={styles.content}>
          {/* Hero Summary */}
          <section style={styles.hero}>
            <div style={{ ...styles.heroCard, backgroundColor: "#F0FFF4", borderLeft: "5px solid #2F855A" }}>
              <h4 style={styles.cardTitle}>Latest Yield</h4>
              <p style={styles.cardValue}>{dashboard?.latest_yield ?? "—"}</p>
            </div>
            <div style={{ ...styles.heroCard, backgroundColor: "#FEFAF0", borderLeft: "5px solid #DD6B20" }}>
              <h4 style={styles.cardTitle}>Total Predictions</h4>
              <p style={styles.cardValue}>{dashboard?.total_predictions}</p>
            </div>
          </section>

          {/* Chart */}
          <section style={{ ...styles.chartCard, backgroundColor: "#F7FAF3" }}>
            <h3 style={styles.sectionTitle}>Yield Trend</h3>
            <svg width="100%" height="150">
              {predictions.map((p, i) => (
                <circle
                  key={i}
                  cx={25 + i * 60}
                  cy={120 - p.yield_prediction * 5}
                  r="6"
                  fill="#2F855A"
                />
              ))}
            </svg>
          </section>

          {/* Prediction History */}
          <section style={{ ...styles.tableCard, backgroundColor: "#F7FAF3" }}>
            <div style={styles.historyHeader}>
              <h3 style={styles.sectionTitle}>Prediction History</h3>
              <button onClick={exportCSV} style={{ ...styles.exportBtn, backgroundColor: "#2F855A" }}>
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
                        style={{ ...styles.viewBtn, backgroundColor: "#38A169" }}
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
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <h3>Prediction Detail</h3>
            <p><strong>Yield:</strong> {selectedPrediction.yield_prediction}</p>
            <p><strong>Rainfall:</strong> {selectedPrediction.rainfall}</p>
            <p><strong>Temperature:</strong> {selectedPrediction.temperature}</p>
            <button
              onClick={() => setSelectedPrediction(null)}
              style={{ ...styles.closeBtn, backgroundColor: "#DD6B20" }}
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
  container: { display: "flex", flexDirection: "column", fontFamily: "Segoe UI, sans-serif", minHeight: "100vh", background: "#F0F4F0" },
  dark: { background: "#1B2A1F", color: "#DFF5E1" },

  topNav: { display: "flex", justifyContent: "space-between", padding: "16px 32px", borderBottom: "2px solid #C6DABF" },
  topNavRight: { display: "flex", gap: "12px", alignItems: "center" },
  logo: { fontSize: "22px", fontWeight: "700" },
  userName: { fontSize: "16px", fontWeight: "600" },
  logoutBtn: { padding: "6px 10px", background: "#E53E3E", color: "#fff", border: "none", borderRadius: "6px" },

  mainArea: { display: "flex" },
  sidebar: { width: "220px", padding: "20px", borderRight: "2px solid #C6DABF", background: "#F7FFF0" },
  sidebarList: { listStyle: "none", padding: 0 },
  sidebarItem: { margin: "16px 0", cursor: "pointer", fontWeight: "600", color: "#276749", transition: "0.2s", padding: "6px", borderRadius: "6px" },

  content: { flex: 1, padding: "24px" },
  hero: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "20px", marginBottom: "24px" },
  heroCard: { padding: "18px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.06)", textAlign: "center" },
  cardTitle: { fontSize: "14px", color: "#718096" },
  cardValue: { fontSize: "28px", fontWeight: "700" },

  sectionTitle: { fontSize: "18px", fontWeight: "700", marginBottom: "12px" },
  chartCard: { padding: "18px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.06)", marginBottom: "24px" },
  tableCard: { padding: "18px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.06)" },
  historyHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  exportBtn: { padding: "6px 10px", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" },
  table: { width: "100%", borderCollapse: "collapse" },
  viewBtn: { padding: "4px 8px", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },

  modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center" },
  modal: { background: "#F0FFF4", padding: "22px", borderRadius: "10px", width: "300px" },
  closeBtn: { marginTop: "12px", padding: "6px 10px", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" },

  loader: { textAlign: "center", marginTop: "60px", fontSize: "18px" },
};
