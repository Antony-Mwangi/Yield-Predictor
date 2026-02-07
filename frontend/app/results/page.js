// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function ResultsPage() {
//   const [data, setData] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const stored = localStorage.getItem("result");
//     if (stored) {
//       setData(JSON.parse(stored));
//     }
//   }, []);

//   if (!data) {
//     return (
//       <div className="loading-state">
//         <div className="spinner"></div>
//         <p>Analyzing soil and climate patterns...</p>
//         <style>{`
//           .loading-state { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 60vh; font-family: 'Inter', sans-serif; }
//           .spinner { width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #16a34a; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 20px; }
//           @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//         `}</style>
//       </div>
//     );
//   }

//   return (
//     <div className="results-container">
//       <style>{`
//         .results-container {
//           max-width: 1000px;
//           margin: 40px auto;
//           padding: 20px;
//           font-family: 'Inter', -apple-system, sans-serif;
//           color: #1f2937;
//         }

//         /* Header Section */
//         .report-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-end;
//           border-bottom: 3px solid #16a34a;
//           padding-bottom: 20px;
//           margin-bottom: 30px;
//         }
//         .report-header h2 { margin: 0; color: #166534; font-size: 2rem; }
//         .report-date { color: #6b7280; font-size: 0.9rem; }

//         /* Summary Cards */
//         .summary-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//           gap: 20px;
//           margin-bottom: 40px;
//         }
//         .prediction-card {
//           background: linear-gradient(135deg, #166534 0%, #15803d 100%);
//           color: white;
//           padding: 30px;
//           border-radius: 20px;
//           text-align: center;
//           box-shadow: 0 10px 25px rgba(22, 101, 52, 0.2);
//         }
//         .prediction-card h3 { margin: 0; font-size: 1.1rem; opacity: 0.9; font-weight: 500; }
//         .yield-value { font-size: 3.5rem; font-weight: 800; margin: 10px 0; }
//         .yield-unit { font-size: 1.2rem; opacity: 0.8; }

//         .metric-card {
//           background: white;
//           padding: 25px;
//           border-radius: 20px;
//           border: 1px solid #e5e7eb;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//         }
//         .status-badge {
//           display: inline-block;
//           padding: 4px 12px;
//           border-radius: 50px;
//           font-size: 0.8rem;
//           font-weight: 700;
//           text-transform: uppercase;
//           margin-bottom: 10px;
//           width: fit-content;
//         }
//         .status-good { background: #dcfce7; color: #166534; }

//         /* Recommendations Section */
//         .details-section {
//           background: white;
//           padding: 35px;
//           border-radius: 24px;
//           border: 1px solid #e5e7eb;
//           margin-bottom: 30px;
//         }
//         .details-section h4 {
//           margin-top: 0;
//           color: #111827;
//           font-size: 1.3rem;
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           margin-bottom: 20px;
//         }
//         .rec-list { list-style: none; padding: 0; }
//         .rec-item {
//           padding: 15px;
//           border-bottom: 1px solid #f3f4f6;
//           display: flex;
//           gap: 15px;
//           align-items: flex-start;
//         }
//         .rec-item:last-child { border-bottom: none; }
//         .rec-icon { font-size: 1.5rem; }
//         .rec-text { font-size: 1rem; color: #4b5563; line-height: 1.5; }

//         /* Actions */
//         .actions { display: flex; gap: 15px; flex-wrap: wrap; }
//         .btn {
//           padding: 12px 25px;
//           border-radius: 10px;
//           font-weight: 600;
//           cursor: pointer;
//           border: none;
//           transition: 0.2s;
//         }
//         .btn-print { background: #111827; color: white; }
//         .btn-new { background: #f3f4f6; color: #111827; }
//         .btn:hover { opacity: 0.9; transform: translateY(-1px); }

//         @media (max-width: 600px) {
//           .report-header { flex-direction: column; align-items: flex-start; gap: 10px; }
//           .yield-value { font-size: 2.5rem; }
//         }
//       `}</style>

//       <div className="report-header">
//         <div>
//           <h2>Maize Yield Analysis</h2>
//           <span className="report-date">Generated on {new Date().toLocaleDateString()}</span>
//         </div>
//         <div className="actions">
//           <button className="btn btn-print" onClick={() => window.print()}>Download PDF</button>
//         </div>
//       </div>

//       <div className="summary-grid">
//         <div className="prediction-card">
//           <h3>Predicted Harvest</h3>
//           <div className="yield-value">
//             {data.yield_prediction}
//             <span className="yield-unit"> T/ha</span>
//           </div>
//           <p>Confidence Level: 92%</p>
//         </div>

//         <div className="metric-card">
//           <span className="status-badge status-good">Optimized Condition</span>
//           <h4>Agronomic Overview</h4>
//           <p style={{ color: '#6b7280', margin: 0 }}>
//             Based on your input parameters, your crop is currently performing above the regional average for this season.
//           </p>
//         </div>
//       </div>

    


//       <div className="details-section">
//         <h4><span>💡</span> AI Smart Recommendations</h4>
//         <div className="rec-list">
//           {data.recommendations.map((rec, index) => (
//             <div key={index} className="rec-item">
//               <span className="rec-icon">{index === 0 ? "🌱" : index === 1 ? "💧" : "🚜"}</span>
//               <div className="rec-text">{rec}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="details-section" style={{ background: '#f9fafb' }}>
//         <h4><span>📊</span> Comparative Insights</h4>
//         <p>Your predicted yield is <strong>1.2 tons higher</strong> than the typical yield for your current soil Nitrogen levels. This suggests your rainfall and temperature inputs are providing an ideal growing window.</p>
        
        
//       </div>

//       <div className="actions" style={{ justifyContent: 'center', marginTop: '40px' }}>
//         <button className="btn btn-new" onClick={() => router.push("/predict")}>
//           Run New Prediction
//         </button>
//         <button className="btn btn-print" style={{ background: '#16a34a' }} onClick={() => router.push("/dashboard")}>
//           Save to Dashboard
//         </button>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResultsPage() {
  const [data, setData] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("result");
    if (stored) setData(JSON.parse(stored));
  }, []);

  async function downloadPDF() {
    try {
      setDownloading(true);
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://127.0.0.1:8000/api/reports/yield-pdf/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            yield_prediction: data.yield_prediction,
            overview:
              "Based on your soil nutrients, rainfall, and temperature inputs, projected yield is above the regional seasonal average.",
            recommendations: data.recommendations,
          }),
        }
      );

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "maize_yield_report.pdf";
      a.click();

      window.URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  }

  if (!data) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner} />
        <p>Analyzing soil and climate patterns…</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Maize Yield Analysis</h2>
          <p style={styles.date}>
            Generated on {new Date().toLocaleDateString()}
          </p>
        </div>

        <button
          onClick={downloadPDF}
          style={styles.downloadBtn}
          disabled={downloading}
        >
          {downloading ? "Preparing PDF…" : "Download PDF"}
        </button>
      </div>

      {/* SUMMARY */}
      <div style={styles.grid}>
        <div style={styles.yieldCard}>
          <h4>Predicted Harvest</h4>
          <div style={styles.yieldValue}>
            {data.yield_prediction} <span style={styles.unit}>T/ha</span>
          </div>
        </div>

        <div style={styles.infoCard}>
          <span style={styles.badge}>Optimized Condition</span>
          <h4>Agronomic Overview</h4>
          <p>
            Based on your soil nutrients, rainfall, and temperature inputs, the
            projected yield is above the regional seasonal average.
          </p>
        </div>
      </div>

      {/* RECOMMENDATIONS */}
      <div style={styles.section}>
        <h4>AI Smart Recommendations</h4>
        <ul style={styles.list}>
          {data.recommendations.map((rec, i) => (
            <li key={i} style={styles.listItem}>
              {rec}
            </li>
          ))}
        </ul>
      </div>

      {/* ACTIONS (NOT PART OF PDF) */}
      <div style={styles.actions}>
        <button style={styles.secondaryBtn} onClick={() => router.push("/predict")}>
          Run New Prediction
        </button>
        <button style={styles.primaryBtn} onClick={() => router.push("/dashboard")}>
          Save to Dashboard
        </button>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    maxWidth: 1000,
    margin: "40px auto",
    padding: 24,
    fontFamily: "Inter, system-ui, sans-serif",
    background: "#f9fafb",
    color: "#1f2937",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderBottom: "3px solid #16a34a",
    paddingBottom: 16,
    marginBottom: 32,
  },

  title: { margin: 0, fontSize: "2rem", color: "#166534" },
  date: { margin: 0, fontSize: "0.9rem", color: "#6b7280" },

  downloadBtn: {
    background: "#111827",
    color: "white",
    padding: "12px 20px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
    gap: 20,
    marginBottom: 40,
  },

  yieldCard: {
    background: "linear-gradient(135deg,#166534,#15803d)",
    color: "white",
    padding: 30,
    borderRadius: 20,
    textAlign: "center",
  },

  yieldValue: {
    fontSize: "3.5rem",
    fontWeight: 800,
    marginTop: 10,
  },

  unit: { fontSize: "1.2rem", opacity: 0.85 },

  infoCard: {
    background: "white",
    borderRadius: 20,
    padding: 28,
    border: "1px solid #e5e7eb",
  },

  badge: {
    display: "inline-block",
    padding: "6px 14px",
    borderRadius: 999,
    background: "#dcfce7",
    color: "#166534",
    fontWeight: 700,
    fontSize: "0.75rem",
    marginBottom: 12,
  },

  section: {
    background: "white",
    borderRadius: 24,
    padding: 32,
    border: "1px solid #e5e7eb",
    marginBottom: 30,
  },

  list: { paddingLeft: 20 },
  listItem: {
    marginBottom: 12,
    color: "#374151",
    lineHeight: 1.6,
  },

  actions: {
    display: "flex",
    justifyContent: "center",
    gap: 14,
    marginTop: 30,
  },

  primaryBtn: {
    background: "#16a34a",
    color: "white",
    padding: "12px 24px",
    borderRadius: 10,
    border: "none",
    fontWeight: 600,
    cursor: "pointer",
  },

  secondaryBtn: {
    background: "#e5e7eb",
    padding: "12px 24px",
    borderRadius: 10,
    border: "none",
    fontWeight: 600,
    cursor: "pointer",
  },

  loading: {
    height: "60vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Inter, sans-serif",
  },

  spinner: {
    width: 42,
    height: 42,
    border: "4px solid #e5e7eb",
    borderTop: "4px solid #16a34a",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: 16,
  },
};
