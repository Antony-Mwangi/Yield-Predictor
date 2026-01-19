// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function DashboardPage() {
//   const [dashboard, setDashboard] = useState(null);
//   const [predictions, setPredictions] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   useEffect(() => {
//     if (!token) {
//       router.push("/login");
//       return;
//     }

//     Promise.all([
//       fetch("http://127.0.0.1:8000/api/auth/dashboard/", {
//         headers: { Authorization: `Bearer ${token}` },
//       }).then(r => r.json()),

//       fetch("http://127.0.0.1:8000/api/predictions/history/", {
//         headers: { Authorization: `Bearer ${token}` },
//       }).then(r => r.json()),
//     ]).then(([dash, preds]) => {
//       setDashboard(dash);
//       setPredictions(preds);
//       setLoading(false);
//     });
//   }, []);

//   const exportCSV = () => {
//     const rows = [
//       ["Yield", "Rainfall", "Temperature", "Date"],
//       ...predictions.map(p => [
//         p.yield_prediction,
//         p.rainfall,
//         p.temperature,
//         new Date(p.created_at).toLocaleDateString(),
//       ]),
//     ];

//     const csv = rows.map(r => r.join(",")).join("\n");
//     const blob = new Blob([csv], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "predictions.csv";
//     a.click();
//   };

//   if (loading) return <p style={styles.center}>Loading...</p>;

//   return (
//     <div style={styles.page}>
//       {/* HEADER */}
//       <header style={styles.header}>
//         <div>
//           <h1>AI Maize Dashboard</h1>
//           <p>{dashboard.username} · {dashboard.role}</p>
//         </div>
//         <button onClick={exportCSV} style={styles.btn}>
//           Export CSV
//         </button>
//       </header>

//       {/* ROLE BASED */}
//       {dashboard.role === "admin" ? (
//         <AdminPanel />
//       ) : (
//         <>
//           {/* STATS */}
//           <section style={styles.cards}>
//             <Card title="Total Predictions" value={dashboard.total_predictions} />
//             <Card title="Latest Yield" value={dashboard.latest_yield ?? "N/A"} />
//           </section>

//           {/* CHART */}
//           <section style={styles.section}>
//             <h2>Yield Trend</h2>
//             <YieldChart data={predictions} />
//           </section>

//           {/* TABLE */}
//           <section style={styles.section}>
//             <h2>Prediction History</h2>
//             <table style={styles.table}>
//               <thead>
//                 <tr>
//                   <th>Yield</th>
//                   <th>Date</th>
//                   <th>View</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {predictions.map(p => (
//                   <tr key={p.id}>
//                     <td>{p.yield_prediction}</td>
//                     <td>{new Date(p.created_at).toLocaleDateString()}</td>
//                     <td>
//                       <button onClick={() => setSelected(p)} style={styles.link}>
//                         Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </section>
//         </>
//       )}

//       {/* MODAL */}
//       {selected && (
//         <Modal onClose={() => setSelected(null)}>
//           <h3>Prediction Details</h3>
//           <pre style={styles.pre}>
// {JSON.stringify(selected, null, 2)}
//           </pre>
//         </Modal>
//       )}
//     </div>
//   );
// }

// /* ---------------- COMPONENTS ---------------- */

// function Card({ title, value }) {
//   return (
//     <div style={styles.card}>
//       <h3>{title}</h3>
//       <p style={styles.big}>{value}</p>
//     </div>
//   );
// }

// function YieldChart({ data }) {
//   if (!data.length) return <p>No data</p>;

//   const max = Math.max(...data.map(d => d.yield_prediction));
//   const points = data.map((d, i) => {
//     const x = (i / (data.length - 1)) * 300;
//     const y = 100 - (d.yield_prediction / max) * 90;
//     return `${x},${y}`;
//   }).join(" ");

//   return (
//     <svg width="300" height="120">
//       <polyline
//         points={points}
//         fill="none"
//         stroke="#38A169"
//         strokeWidth="3"
//       />
//     </svg>
//   );
// }

// function Modal({ children, onClose }) {
//   return (
//     <div style={styles.modalBg}>
//       <div style={styles.modal}>
//         {children}
//         <button onClick={onClose} style={styles.btn}>Close</button>
//       </div>
//     </div>
//   );
// }

// function AdminPanel() {
//   return (
//     <section style={styles.section}>
//       <h2>Admin Overview</h2>
//       <p>• View all farmers</p>
//       <p>• System analytics</p>
//       <p>• Model performance monitoring</p>
//     </section>
//   );
// }

// /* ---------------- STYLES ---------------- */

// const styles = {
//   page: { padding: 20, fontFamily: "Segoe UI", background: "#F7FAFC" },
//   header: {
//     background: "#1A202C",
//     color: "#fff",
//     padding: 20,
//     borderRadius: 12,
//     display: "flex",
//     justifyContent: "space-between",
//   },
//   cards: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
//     gap: 20,
//     marginTop: 20,
//   },
//   card: {
//     background: "#fff",
//     padding: 20,
//     borderRadius: 12,
//     textAlign: "center",
//   },
//   big: { fontSize: 28, fontWeight: "bold", color: "#2F855A" },
//   section: {
//     marginTop: 30,
//     background: "#fff",
//     padding: 20,
//     borderRadius: 12,
//   },
//   table: { width: "100%", borderCollapse: "collapse" },
//   link: { color: "#3182CE", background: "none", border: "none", cursor: "pointer" },
//   btn: {
//     background: "#38A169",
//     color: "#fff",
//     border: "none",
//     padding: "8px 14px",
//     borderRadius: 8,
//     cursor: "pointer",
//   },
//   modalBg: {
//     position: "fixed",
//     inset: 0,
//     background: "rgba(0,0,0,.5)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modal: {
//     background: "#fff",
//     padding: 20,
//     borderRadius: 12,
//     width: "90%",
//     maxWidth: 500,
//   },
//   pre: {
//     background: "#EDF2F7",
//     padding: 10,
//     borderRadius: 8,
//     fontSize: 12,
//   },
//   center: { textAlign: "center", marginTop: 100 },
// };




"use client";

import { useEffect, useState } from "react";
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

  /* ---------------- AUTH CHECK ---------------- */
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

  /* ---------------- HELPERS ---------------- */
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

  if (loading) return <div style={styles.loader}>Loading dashboard…</div>;

  return (
    <div style={{ ...styles.page, ...(darkMode && styles.dark) }}>
      {/* ---------- NAVBAR ---------- */}
      <nav style={styles.nav}>
        <h2>🌱 Smart Farming AI</h2>
        <div>
          <button onClick={() => setDarkMode(!darkMode)} style={styles.toggle}>
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/login");
            }}
            style={styles.logout}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* ---------- WELCOME ---------- */}
      <section style={styles.welcome}>
        <h1>Welcome back, {user?.username}</h1>
        <p>Your farm performance at a glance</p>
      </section>

      {/* ---------- METRICS ---------- */}
      <section style={styles.metrics}>
        <Metric title="Latest Yield" value={dashboard.latest_yield ?? "—"} />
        <Metric title="Total Predictions" value={dashboard.total_predictions} />
        <Metric title="Soil Status" value="Good" />
        <Metric title="Yield Trend" value="+ Improving" />
      </section>

      {/* ---------- CHART ---------- */}
      <section style={styles.card}>
        <h3>Yield Trend</h3>
        <svg width="100%" height="120">
          {predictions.map((p, i) => (
            <circle
              key={i}
              cx={20 + i * 40}
              cy={100 - p.yield_prediction * 5}
              r="4"
              fill="#2f855a"
            />
          ))}
        </svg>
      </section>

      {/* ---------- HISTORY ---------- */}
      <section style={styles.card}>
        <div style={styles.historyHeader}>
          <h3>Prediction History</h3>
          <button onClick={exportCSV} style={styles.export}>
            Export CSV
          </button>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Yield</th>
              <th>Action</th>
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

      {/* ---------- MODAL ---------- */}
      {selectedPrediction && (
        <div style={styles.modalOverlay} onClick={() => setSelectedPrediction(null)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <h3>Prediction Detail</h3>
            <p>Yield: {selectedPrediction.yield_prediction}</p>
            <p>Rainfall: {selectedPrediction.rainfall}</p>
            <p>Temperature: {selectedPrediction.temperature}</p>
            <button onClick={() => setSelectedPrediction(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- COMPONENTS ---------- */
const Metric = ({ title, value }) => (
  <div style={styles.metric}>
    <h4>{title}</h4>
    <p>{value}</p>
  </div>
);

/* ---------- INTERNAL CSS ---------- */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f7fafc",
    padding: "20px",
    fontFamily: "Segoe UI",
    transition: "0.3s",
  },
  dark: {
    background: "#1a202c",
    color: "#edf2f7",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  toggle: {
    marginRight: "10px",
  },
  logout: {
    background: "#e53e3e",
    color: "#fff",
    padding: "6px 10px",
  },
  welcome: {
    marginBottom: "20px",
  },
  metrics: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gap: "15px",
  },
  metric: {
    background: "#ffffff",
    padding: "15px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    transition: "0.3s",
  },
  card: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    marginTop: "30px",
  },
  historyHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
  export: {
    background: "#2f855a",
    color: "#fff",
    padding: "6px 10px",
  },
  table: {
    width: "100%",
    marginTop: "15px",
    borderCollapse: "collapse",
  },
  viewBtn: {
    background: "#3182ce",
    color: "#fff",
    padding: "5px 8px",
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
  },
  loader: {
    textAlign: "center",
    padding: "100px",
    fontSize: "20px",
  },
};
