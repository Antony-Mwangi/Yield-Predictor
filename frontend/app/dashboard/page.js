
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function DashboardPage() {
//   const router = useRouter();
//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   const [user, setUser] = useState(null);
//   const [dashboard, setDashboard] = useState(null);
//   const [predictions, setPredictions] = useState([]);
//   const [selectedPrediction, setSelectedPrediction] = useState(null);
//   const [darkMode, setDarkMode] = useState(
//     typeof window !== "undefined" ? JSON.parse(localStorage.getItem("darkMode")) || false : false
//   );
//   const [loading, setLoading] = useState(true);
//   const [contentVisible, setContentVisible] = useState(false);

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
//       .finally(() => {
//         setLoading(false);
//         setTimeout(() => setContentVisible(true), 100); // fade-in
//       });
//   }, []);

//   function authHeader() {
//     return { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } };
//   }

//   function exportCSV() {
//     const rows = predictions.map(p => ({
//       date: p.created_at,
//       yield: p.yield_prediction,
//       rainfall: p.rainfall,
//       temperature: p.temperature,
//     }));
//     const csv = "Date,Yield,Rainfall,Temperature\n" + rows.map(r => Object.values(r).join(",")).join("\n");
//     const blob = new Blob([csv], { type: "text/csv" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "predictions.csv";
//     link.click();
//   }

//   if (loading) return <div style={styles.loader}>Loading dashboard…</div>;

//   return (
//     <div style={{ ...styles.container, ...(darkMode && styles.dark) }}>
  
//       <header style={styles.topNav}>
//         <div>
//           <h2 style={styles.logo}>YIELD PORTAL</h2>
//         </div>
//         <div style={styles.topNavRight}>
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
//             <li
//               style={styles.sidebarItem}
//               onClick={() => {
//                 const newMode = !darkMode;
//                 setDarkMode(newMode);
//                 localStorage.setItem("darkMode", newMode);
//               }}
//             >
//               ⚙ Settings
//             </li>
//           </ul>
//         </nav>

//         <main
//           style={{
//             ...styles.content,
//             opacity: contentVisible ? 1 : 0,
//             transition: "opacity 0.6s ease-in-out",
//           }}
//         >
         
//           <section style={styles.hero}>
//             <div
//               style={{
//                 ...styles.heroCard,
//                 backgroundColor: darkMode ? "#2C3E1F" : "#F0FFF4",
//                 borderLeft: "5px solid #2F855A",
//                 transition: "background 0.3s",
//               }}
//             >
//               <h4 style={styles.cardTitle}>Latest Yield</h4>
//               <p style={styles.cardValue}>{dashboard?.latest_yield ?? "—"}</p>
//             </div>
//             <div
//               style={{
//                 ...styles.heroCard,
//                 backgroundColor: darkMode ? "#3E2E1F" : "#FEFAF0",
//                 borderLeft: "5px solid #DD6B20",
//                 transition: "background 0.3s",
//               }}
//             >
//               <h4 style={styles.cardTitle}>Total Predictions</h4>
//               <p style={styles.cardValue}>{dashboard?.total_predictions}</p>
//             </div>
//           </section>

          
//           <section
//             style={{
//               ...styles.chartCard,
//               backgroundColor: darkMode ? "#223322" : "#F7FAF3",
//               transition: "background 0.3s",
//             }}
//           >
//             <h3 style={styles.sectionTitle}>Yield Trend</h3>
//             <svg width="100%" height="150">
//               {predictions.map((p, i) => (
//                 <circle
//                   key={i}
//                   cx={25 + i * 60}
//                   cy={120 - p.yield_prediction * 5}
//                   r="6"
//                   fill={darkMode ? "#A0F0A0" : "#2F855A"}
//                 />
//               ))}
//             </svg>
//           </section>

    
//           <section
//             style={{
//               ...styles.tableCard,
//               backgroundColor: darkMode ? "#223322" : "#F7FAF3",
//               transition: "background 0.3s",
//             }}
//           >
//             <div style={styles.historyHeader}>
//               <h3 style={styles.sectionTitle}>Prediction History</h3>
//               <button
//                 onClick={exportCSV}
//                 style={{ ...styles.exportBtn, backgroundColor: "#2F855A" }}
//               >
//                 Export CSV
//               </button>
//             </div>

//             <table style={{ ...styles.table, color: darkMode ? "#E2F5D9" : "#2D3748" }}>
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Yield</th>
//                   <th>View</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {predictions.map(p => (
//                   <tr
//                     key={p.id}
//                     style={{
//                       transition: "background 0.3s",
//                       cursor: "pointer",
//                     }}
//                     onMouseEnter={e => (e.currentTarget.style.backgroundColor = darkMode ? "#2F5530" : "#DCFCE7")}
//                     onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
//                   >
//                     <td>{new Date(p.created_at).toLocaleDateString()}</td>
//                     <td>{p.yield_prediction}</td>
//                     <td>
//                       <button
//                         style={{ ...styles.viewBtn, backgroundColor: darkMode ? "#68D391" : "#38A169" }}
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

//       {selectedPrediction && (
//         <div style={{ ...styles.modalOverlay, animation: "fadeIn 0.3s" }} onClick={() => setSelectedPrediction(null)}>
//           <div
//             style={{
//               ...styles.modal,
//               backgroundColor: darkMode ? "#2C3E1F" : "#F0FFF4",
//               transition: "background 0.3s",
//             }}
//             onClick={e => e.stopPropagation()}
//           >
//             <h3>Prediction Detail</h3>
//             <p>
//               <strong>Yield:</strong> {selectedPrediction.yield_prediction}
//             </p>
//             <p>
//               <strong>Rainfall:</strong> {selectedPrediction.rainfall}
//             </p>
//             <p>
//               <strong>Temperature:</strong> {selectedPrediction.temperature}
//             </p>
//             <button
//               onClick={() => setSelectedPrediction(null)}
//               style={{ ...styles.closeBtn, backgroundColor: "#DD6B20" }}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//       `}</style>
//     </div>
//   );
// }


// const styles = {
//   container: { display: "flex", 
//     flexDirection: "column",
//      fontFamily: "Segoe UI, sans-serif",
//       minHeight: "100vh",
//        background: "#F0F4F0",
//         color: "#2D3748" 
//       },
  
//   dark:
//    { background: "#1B2A1F",
//      color: "#E2F5D9" 
//     },

//   topNav: {
//      display: "flex", 
//     justifyContent: "space-between",
//      padding: "16px 32px",
//       borderBottom: "2px solid #C6DABF" 
//     },
  
//   topNavRight: { display: "flex",
//      gap: "12px", 
//      alignItems: "center"
//      },
  
//   logo: {
//      fontSize: "22px", 
//     fontWeight: "700"
//    },
  
//   userName: { 
//     fontSize: "16px",
//      fontWeight: "600"
//      },
  
//   logoutBtn: { padding: "6px 10px",
//      background: "#E53E3E",
//       color: "#fff",
//        border: "none",
//         borderRadius: "6px",
//          cursor: "pointer",
//           transition: "0.3s"
//          },

//   mainArea: { display: "flex" },

//   sidebar: { width: "220px",
//      padding: "20px",
//       borderRight: "2px solid #C6DABF",
//        background: "#F7FFF0" 
//       },

//   sidebarList: { 
//     listStyle: "none",
//      padding: 0 
//     },

//   sidebarItem: {
//     margin: "16px 0",
//     cursor: "pointer",
//     fontWeight: "600",
//     color: "#276749",
//     transition: "0.3s",
//     padding: "6px",
//     borderRadius: "6px",
//   },

//   content: { flex: 1, 
//     padding: "24px",
//      color: "inherit"
//      },

//   hero: { display: "grid", 
//     gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
//      gap: "20px", 
//      marginBottom: "24px" 
//     },

//   heroCard: { padding: "18px",
//      borderRadius: "8px", 
//      boxShadow: "0 4px 8px rgba(0,0,0,0.06)",
//       textAlign: "center",
//        color: "inherit" 
//       },

//   cardTitle: { 
//     fontSize: "14px", 
//     color: "#718096" 
//   },

//   cardValue: { fontSize: "28px", 
//     fontWeight: "700" 
//   },

//   sectionTitle: { fontSize: "18px", 
//     fontWeight: "700",
//      marginBottom: "12px"
//      },

//   chartCard: { padding: "18px",
//      borderRadius: "8px",
//       boxShadow: "0 4px 8px rgba(0,0,0,0.06)",
//        marginBottom: "24px",
//         color: "inherit" 
//       },

//   tableCard: { padding: "18px",
//      borderRadius: "8px",
//       boxShadow: "0 4px 8px rgba(0,0,0,0.06)",
//        color: "inherit" 
//       },

//   historyHeader: { display: "flex", 
//     justifyContent: "space-between",
//      alignItems: "center" 
//     },

//   exportBtn: { padding: "6px 10px", 
//     color: "#fff",
//      border: "none",
//       borderRadius: "6px",
//        cursor: "pointer",
//         transition: "0.3s" 
//       },

//   table: { width: "100%",
//      borderCollapse: "collapse",
//       color: "inherit" 
//     },

//   viewBtn: { padding: "4px 8px",
//      color: "#fff",
//       border: "none",
//        borderRadius: "4px", 
//        cursor: "pointer",
//         transition: "0.3s"
//        },

//   modalOverlay: { position: "fixed", 
//     inset: 0,
//      background: "rgba(0,0,0,0.6)",
//       display: "flex",
//        justifyContent: "center",
//         alignItems: "center" 
//       },

//   modal: { padding: "22px",
//      borderRadius: "10px",
//       width: "300px", 
//       color: "inherit" 
//     },

//   closeBtn: { marginTop: "12px",
//      padding: "6px 10px",
//       color: "#fff", 
//       border: "none",
//        borderRadius: "5px",
//         cursor: "pointer" 
//       },

//   loader: { textAlign: "center", 
//     marginTop: "60px",
//      fontSize: "18px" 
//     },
// };


"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedMode = JSON.parse(localStorage.getItem("darkMode"));
    
    if (!savedToken) {
      router.push("/login");
      return;
    }
    setToken(savedToken);
    setDarkMode(savedMode || false);

    const authHeader = { 
        headers: { Authorization: `Bearer ${savedToken}`, "Content-Type": "application/json" } 
    };

    Promise.all([
      fetch("http://127.0.0.1:8000/api/auth/me/", authHeader),
      fetch("http://127.0.0.1:8000/api/auth/dashboard/", authHeader),
      fetch("http://127.0.0.1:8000/api/predictions/history/", authHeader),
    ])
      .then(async ([u, d, p]) => {
        setUser(await u.json());
        setDashboard(await d.json());
        setPredictions(await p.json());
      })
      .catch(err => console.error("Fetch error:", err))
      .finally(() => {
        setLoading(false);
        setTimeout(() => setContentVisible(true), 100);
      });
  }, [router]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  function exportCSV() {
    const rows = predictions.map(p => ({
      date: p.created_at,
      yield: p.yield_prediction,
      rainfall: p.rainfall,
      temp: p.temperature,
    }));
    const csv = "Date,Yield,Rainfall,Temp\n" + rows.map(r => Object.values(r).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "yield_data.csv";
    link.click();
  }

  if (loading) return (
    <div style={styles.loaderContainer}>
      <div style={styles.spinner}></div>
      <p>Syncing Field Data...</p>
    </div>
  );

  const theme = darkMode ? styles.darkTheme : styles.lightTheme;

  return (
    <div style={{ ...styles.container, ...theme.bg }}>
      {/* --- TOP NAVIGATION --- */}
      <header style={{ ...styles.topNav, ...theme.card }}>
        <div style={styles.logoGroup}>
          <div style={styles.logoIcon}>🌱</div>
          <h2 style={{ ...styles.logoText, ...theme.text }}>YIELD<span style={{ fontWeight: 300 }}>PORTAL</span></h2>
        </div>
        <div style={styles.topNavRight}>
          <div style={{...styles.userBadge, ...theme.badge}}>
            <span style={theme.textSmall}>{user?.username}</span>
          </div>
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

      <div style={styles.mainArea}>
        {/* --- SIDEBAR --- */}
        <nav style={{ ...styles.sidebar, ...theme.sidebar }}>
          <ul style={styles.sidebarList}>
            <li style={{...styles.sidebarItem, ...styles.activeItem}}>🏠 Dashboard</li>
            <li style={styles.sidebarItem} onClick={() => router.push("/predict")}>📊 Predictor</li>
            <li style={styles.sidebarItem} onClick={() => router.push("/history")}>📁 Archives</li>
            <li style={styles.sidebarItem} onClick={toggleDarkMode}>
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </li>
          </ul>
        </nav>

        {/* --- MAIN CONTENT --- */}
        <main style={{ ...styles.content, opacity: contentVisible ? 1 : 0 }}>
          
          <div style={styles.sectionHeader}>
            <h1 style={{...styles.pageTitle, ...theme.text}}>Field Overview</h1>
            <button onClick={exportCSV} style={styles.exportBtn}>Export Report</button>
          </div>

          <section style={styles.heroGrid}>
            <div style={{ ...styles.heroCard, ...theme.card, borderTop: "4px solid #48BB78" }}>
              <p style={styles.cardLabel}>LATEST PREDICTION</p>
              <h3 style={{...styles.cardValue, ...theme.text}}>{dashboard?.latest_yield ?? "0.0"} <small style={{fontSize: 14}}>tons/ha</small></h3>
            </div>
            <div style={{ ...styles.heroCard, ...theme.card, borderTop: "4px solid #4299E1" }}>
              <p style={styles.cardLabel}>TOTAL ANALYSES</p>
              <h3 style={{...styles.cardValue, ...theme.text}}>{dashboard?.total_predictions}</h3>
            </div>
          </section>

          {/* --- CHART SECTION --- */}
          <section style={{ ...styles.mainCard, ...theme.card }}>
            <h3 style={{...styles.cardTitle, ...theme.text}}>Yield Progression</h3>
            <div style={styles.chartWrapper}>
                <svg width="100%" height="200" viewBox="0 0 500 200" preserveAspectRatio="none">
                {predictions.map((p, i) => (
                    <g key={i}>
                    <line 
                        x1={50 + (i-1) * 80} y1={180 - (predictions[i-1]?.yield_prediction || 0) * 10} 
                        x2={50 + i * 80} y2={180 - p.yield_prediction * 10} 
                        stroke="#48BB78" strokeWidth="3" strokeLinecap="round"
                    />
                    <circle cx={50 + i * 80} cy={180 - p.yield_prediction * 10} r="5" fill="#2F855A" />
                    </g>
                ))}
                </svg>
            </div>
          </section>

          {/* --- TABLE SECTION --- */}
          <section style={{ ...styles.mainCard, ...theme.card }}>
            <h3 style={{...styles.cardTitle, ...theme.text}}>Recent Activity</h3>
            <table style={styles.table}>
              <thead style={theme.tableHead}>
                <tr>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Yield (t/ha)</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {predictions.map(p => (
                  <tr key={p.id} style={styles.tr}>
                    <td style={{...styles.td, ...theme.text}}>{new Date(p.created_at).toLocaleDateString()}</td>
                    <td style={{...styles.td, ...theme.text, fontWeight: 'bold'}}>{p.yield_prediction}</td>
                    <td style={styles.td}>
                      <button style={styles.viewBtn} onClick={() => setSelectedPrediction(p)}>Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>

      {/* --- MODAL --- */}
      {selectedPrediction && (
        <div style={styles.modalOverlay} onClick={() => setSelectedPrediction(null)}>
          <div style={{ ...styles.modal, ...theme.card }} onClick={e => e.stopPropagation()}>
            <h3 style={{...theme.text, marginBottom: 20}}>Prediction Analysis</h3>
            <div style={styles.modalGrid}>
                <div style={styles.modalItem}>
                    <span style={styles.modalLabel}>Predicted Yield</span>
                    <span style={{...styles.modalValue, color: '#48BB78'}}>{selectedPrediction.yield_prediction}</span>
                </div>
                <div style={styles.modalItem}>
                    <span style={styles.modalLabel}>Rainfall</span>
                    <span style={{...styles.modalValue, ...theme.text}}>{selectedPrediction.rainfall} mm</span>
                </div>
                <div style={styles.modalItem}>
                    <span style={styles.modalLabel}>Temperature</span>
                    <span style={{...styles.modalValue, ...theme.text}}>{selectedPrediction.temperature}°C</span>
                </div>
            </div>
            <button onClick={() => setSelectedPrediction(null)} style={styles.closeBtn}>Close window</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { 
    display: "flex", 
    flexDirection: "column", 
    fontFamily: "'Inter', -apple-system, sans-serif", 
    minHeight: "100vh",
    transition: "all 0.4s ease"
  },
  loaderContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f9fafb' },
  spinner: { width: 40, height: 40, border: '4px solid #e2e8f0', borderTop: '4px solid #48BB78', borderRadius: '50%', animation: 'spin 1s linear infinite' },
  
  lightTheme: {
    bg: { background: "#F7FAFC" },
    card: { background: "#ffffff", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)" },
    text: { color: "#1A202C" },
    textSmall: { color: "#4A5568" },
    sidebar: { background: "#ffffff", borderRight: "1px solid #E2E8F0" },
    badge: { background: "#EDF2F7" },
    tableHead: { background: "#F8FAFC" }
  },
  darkTheme: {
    bg: { background: "#111827" },
    card: { background: "#1F2937", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.3)" },
    text: { color: "#F9FAFB" },
    textSmall: { color: "#9CA3AF" },
    sidebar: { background: "#1F2937", borderRight: "1px solid #374151" },
    badge: { background: "#374151" },
    tableHead: { background: "#111827" }
  },

  topNav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 40px", zIndex: 10 },
  logoGroup: { display: "flex", alignItems: "center", gap: "10px" },
  logoIcon: { fontSize: "24px" },
  logoText: { fontSize: "18px", letterSpacing: "1px", fontWeight: "800", margin: 0 },
  topNavRight: { display: "flex", gap: "20px", alignItems: "center" },
  userBadge: { padding: "6px 14px", borderRadius: "20px", fontWeight: "500" },
  
  logoutBtn: { padding: "8px 16px", background: "#FFF5F5", color: "#C53030", border: "1px solid #FEB2B2", borderRadius: "8px", cursor: "pointer", fontWeight: "600" },
  
  mainArea: { display: "flex", flex: 1 },
  sidebar: { width: "240px", padding: "30px 15px" },
  sidebarList: { listStyle: "none", padding: 0, margin: 0 },
  sidebarItem: { padding: "12px 20px", margin: "4px 0", cursor: "pointer", borderRadius: "10px", color: "#718096", fontWeight: "500", transition: "0.2s" },
  activeItem: { background: "#48BB78", color: "#fff" },

  content: { flex: 1, padding: "40px", transition: "opacity 0.5s ease" },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
  pageTitle: { fontSize: '28px', fontWeight: '800', margin: 0 },
  
  heroGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "25px", marginBottom: "30px" },
  heroCard: { padding: "25px", borderRadius: "16px", display: 'flex', flexDirection: 'column', gap: '10px' },
  cardLabel: { fontSize: "12px", color: "#718096", fontWeight: "700", letterSpacing: "0.5px", margin: 0 },
  cardValue: { fontSize: "32px", fontWeight: "800", margin: 0 },

  mainCard: { padding: "25px", borderRadius: "16px", marginBottom: "30px" },
  cardTitle: { fontSize: "18px", fontWeight: "700", marginBottom: "20px", marginTop: 0 },
  
  chartWrapper: { height: "200px", marginTop: "20px" },
  
  exportBtn: { background: "#2D3748", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" },
  
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "12px 15px", fontSize: "13px", color: "#718096", textTransform: "uppercase" },
  td: { padding: "15px", borderBottom: "1px solid rgba(0,0,0,0.05)" },
  viewBtn: { padding: "6px 12px", background: "#EBF8FF", color: "#3182CE", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "600" },

  modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 100 },
  modal: { padding: "40px", borderRadius: "24px", width: "400px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.2)" },
  modalGrid: { display: 'grid', gap: '20px', marginBottom: '30px' },
  modalItem: { display: 'flex', flexDirection: 'column' },
  modalLabel: { fontSize: '12px', color: '#718096', fontWeight: '600' },
  modalValue: { fontSize: '20px', fontWeight: '700' },
  closeBtn: { width: '100%', padding: '12px', background: '#EDF2F7', color: '#4A5568', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' }
};