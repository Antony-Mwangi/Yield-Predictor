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
  const [dashboard, setDashboard] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // -----------------------------
  // Theme
  // -----------------------------
  const light = {
    bg: "#F7FAFC",
    card: "#FFFFFF",
    text: "#1A202C",
    muted: "#718096",
    accent: "#2B6CB0",
  };

  const darkTheme = {
    bg: "#0F172A",
    card: "#1E293B",
    text: "#E5E7EB",
    muted: "#94A3B8",
    accent: "#60A5FA",
  };

  const theme = dark ? darkTheme : light;

  // -----------------------------
  // Effects
  // -----------------------------
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") setDark(true);

    if (!token) {
      router.push("/login");
      return;
    }

    Promise.all([
      fetch("http://127.0.0.1:8000/api/auth/dashboard/", {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => res.json()),

      fetch("http://127.0.0.1:8000/api/predictions/history/", {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => res.json()),
    ])
      .then(([dash, preds]) => {
        setDashboard(dash);
        setPredictions(preds);
      })
      .finally(() => setLoading(false));
  }, []);

  // -----------------------------
  // CSV Export
  // -----------------------------
  const exportCSV = () => {
    let csv = "Date,Yield\n";
    predictions.forEach(p => {
      csv += `${new Date(p.created_at).toLocaleDateString()},${p.yield_prediction}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "yield-history.csv";
    a.click();
  };

  // -----------------------------
  // Chart
  // -----------------------------
  const Chart = () => {
    if (predictions.length === 0) return null;

    const max = Math.max(...predictions.map(p => p.yield_prediction));
    const points = predictions.map((p, i) => {
      const x = (i / (predictions.length - 1)) * 100;
      const y = 100 - (p.yield_prediction / max) * 100;
      return `${x},${y}`;
    });

    return (
      <svg viewBox="0 0 100 100" style={styles.chartSvg}>
        <polyline
          fill="none"
          stroke={theme.accent}
          strokeWidth="3"
          points={points.join(" ")}
        />
      </svg>
    );
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={{ ...styles.page, background: theme.bg, color: theme.text }}>
      {/* Dark Mode Toggle */}
      <button
        onClick={() => {
          const next = !dark;
          setDark(next);
          localStorage.setItem("darkMode", next);
        }}
        style={{ ...styles.toggle, background: theme.card, color: theme.text }}
      >
        {dark ? "☀ Light" : "🌙 Dark"}
      </button>

      <h1 style={styles.title}>Welcome {dashboard?.username} 👋</h1>

      {/* Summary Cards */}
      <div style={styles.grid}>
        <div style={{ ...styles.card, background: theme.card }}>
          <h3>Total Predictions</h3>
          <p style={styles.big}>{dashboard?.total_predictions}</p>
        </div>

        <div style={{ ...styles.card, background: theme.card }}>
          <h3>Latest Yield</h3>
          <p style={styles.big}>
            {dashboard?.latest_yield ?? "—"} t/ha
          </p>
        </div>
      </div>

      {/* Chart */}
      <div style={{ ...styles.card, background: theme.card }}>
        <h3>Yield Trend</h3>
        <Chart />
      </div>

      {/* History */}
      <div style={{ ...styles.card, background: theme.card }}>
        <div style={styles.rowBetween}>
          <h3>Prediction History</h3>
          <button onClick={exportCSV} style={styles.exportBtn}>
            Export CSV
          </button>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Yield (t/ha)</th>
              <th></th>
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
                    onClick={() => setSelected(p)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selected && (
        <div style={styles.modalOverlay} onClick={() => setSelected(null)}>
          <div
            style={{ ...styles.modal, background: theme.card }}
            onClick={e => e.stopPropagation()}
          >
            <h3>Prediction Details</h3>
            <p><b>Yield:</b> {selected.yield_prediction} t/ha</p>
            <p><b>Rainfall:</b> {selected.rainfall} mm</p>
            <p><b>Temperature:</b> {selected.temperature} °C</p>
            <button style={styles.closeBtn} onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx global>{`
        table tr:hover {
          background: rgba(100, 116, 139, 0.1);
        }
      `}</style>
    </div>
  );
}

// -----------------------------
// Internal Styles
// -----------------------------
const styles = {
  page: {
    minHeight: "100vh",
    padding: 24,
    transition: "background 0.3s ease",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
    gap: 20,
    marginBottom: 20,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    boxShadow: "0 12px 28px rgba(0,0,0,0.1)",
    animation: "fadeIn 0.5s ease",
  },
  big: {
    fontSize: 32,
    fontWeight: 700,
  },
  chartSvg: {
    width: "100%",
    height: 200,
    marginTop: 12,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 12,
  },
  viewBtn: {
    padding: "6px 12px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
  },
  exportBtn: {
    padding: "6px 14px",
    borderRadius: 999,
    border: "none",
    cursor: "pointer",
  },
  rowBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toggle: {
    position: "fixed",
    top: 16,
    right: 16,
    borderRadius: 999,
    border: "none",
    padding: "8px 14px",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    padding: 24,
    borderRadius: 16,
    width: "90%",
    maxWidth: 400,
  },
  closeBtn: {
    marginTop: 12,
    width: "100%",
    padding: 10,
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
  },
};
